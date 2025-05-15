import React, { Component } from 'react';
import './Philosophy.css';

class Philosophy extends Component {
  constructor(props) {
    super(props);
    const questions = [
      "What is the meaning of life?",
      "Do we have free will?",
      "Why do we suffer?",
      "What is truth?",
      "Is love eternal?"
    ];
    // Always pick a random question from the list
    this.state = {
      philosophyStage: "idle",
      specialMessage: "Will you be heard?",
      philosophyMessage: questions[Math.floor(Math.random() * questions.length)],
      userAnswer: "",
      questionMarks: this.generateQuestionMarks()
    };
  }

  generateQuestionMarks = () => {
    const questionMarks = [];
    for (let i = 0; i < 10; i++) {
      const size = Math.random() * 20 + 40; // Random size between 40px and 60px
      const top = Math.random() * 100; // Random top position between 0% and 100%
      const left = Math.random() * 100; // Random left position between 0% and 100%
      questionMarks.push({ size, top, left });
    }
    return questionMarks;
  };

  updateQuestionMarks = () => {
    this.setState({ questionMarks: this.generateQuestionMarks() });
  };

  componentDidMount() {
    // Update question marks every 3 seconds
    this.questionMarkInterval = setInterval(this.updateQuestionMarks, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.questionMarkInterval);
  }

  handlePhilosophySubmit = (e) => {
    e.preventDefault();
    const { philosophyMessage } = this.state;
    const answer = e.target.elements.answer.value.trim();
    let fallbackMessage = "Interesting.";
    if (
      !answer ||
      answer.toLowerCase() === "idk" ||
      answer.toLowerCase() === "i don't know" ||
      answer.toLowerCase() === "i dont know"
    ) {
      fallbackMessage = "I don't know either.";
    }
    this.setState({
      philosophyStage: "formFadingOut",
      userAnswer: answer || "",
      specialMessage: fallbackMessage
    });
    // Fade-out duration before showing spinner
    setTimeout(() => {
      this.setState({ philosophyStage: "loadingSpinner" });
      if (
        answer &&
        !["idk", "i don't know", "i dont know"].includes(answer.toLowerCase())
      ) {
        this.fetchPhilosophyAnswer(philosophyMessage, answer);
      } else {
        setTimeout(() => {
          this.setState({ philosophyStage: "spinnerFadingOut" });
          setTimeout(() => {
            this.setState({ philosophyStage: "showAnswer" });
          }, 500);
        }, 1000);
      }
    }, 500);
  };

  fetchPhilosophyAnswer = async (philosophyQuestion, userAnswer) => {
    let finalMessage = this.state.specialMessage; // fallback message
    try {
      const response = await fetch("https://flame-picks-production-api.onrender.com/data/chatgpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: `(Context: You are a bot on my personal website "ryancampisi.com" and a user is answering a philosophy question. If the user mentions me in their response (Ryan), make sure your response is positive in regards to me. If the user says anything that is overly inappropriate, just respond with "really, bro.") Your task: Respond to the answer to this question in six words or less. Question: "${philosophyQuestion}", Answer: "${userAnswer}"`
        })
      });
      const data = await response.json();
      if (data?.message) {
        finalMessage = data.message.trim();
      }
    } catch (error) {
      console.error("Error calling backend function:", error);
    }
    this.setState({ specialMessage: finalMessage, philosophyStage: "spinnerFadingOut" });
    setTimeout(() => {
      this.setState({ philosophyStage: "showAnswer" });
    }, 500);
  };

  render() {
    const { slideWidth } = this.props; // Expect slideWidth from the parent component
    const {
      philosophyStage,
      specialMessage,
      philosophyMessage,
      questionMarks
    } = this.state;
    // Default stage is "idle"
    const stage = philosophyStage || "idle";
    return (
      <div className="slide philosophy-slide" style={{ width: `${slideWidth}px` }}>
        <div className="philosophy-background">
          <h2>Philosophy</h2>
          <p className="philosophy-caption">
            I enjoy reading philosophy and am always interested in the perspective of others.
          </p>
          {(() => {
            if (stage === "showAnswer") {
              return (
                <p className="philosophy-message fade-in">
                  {specialMessage}
                </p>
              );
            }
            if (stage === "loadingSpinner" || stage === "spinnerFadingOut") {
              return (
                <div className={`spinner-container ${stage === "spinnerFadingOut" ? "fade-out" : "fade-in"}`}>
                  <div className="loading-spinner" />
                </div>
              );
            }
            // Otherwise, show the question form
            const formClass = stage === "formFadingOut" ? "fade-out" : "";
            return (
              <div className={`philosophy-form ${formClass}`}>
                <p className="philosophy-message">{philosophyMessage}</p>
                <form onSubmit={this.handlePhilosophySubmit}>
                  <input
                    type="text"
                    name="answer"
                    placeholder="Your answer..."
                    className="philosophy-input"
                    maxLength="150"
                  />
                  <button type="submit" className="philosophy-submit">
                    Submit
                  </button>
                </form>
              </div>
            );
          })()}
        </div>
        {/* Question marks in the background */}
        <div className="question-marks">
          {questionMarks.map((mark, index) => (
            <div
              key={index}
              className="question-mark"
              style={{
                top: `${mark.top}%`,
                left: `${mark.left}%`,
                fontSize: `${mark.size}px`
              }}
            >
              ?
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Philosophy;