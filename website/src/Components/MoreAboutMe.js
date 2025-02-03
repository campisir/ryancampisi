import React, { Component, forwardRef } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { useSwipeable } from 'react-swipeable';
import Chessboard from 'chessboardjsx';
import { Chess } from 'chess.js'; // Correct import statement
import './MoreAboutMe.css'; // Import the CSS file

const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

// Data structure to hold country details
const countryDetails = {
  "United States of America": {
    name: "United States of America",
    description: "I was born here.",
    dateVisited: "December 3, 2001",
    photo: "images/usa_photo.png",
    caption: "My hometown of St. Petersburg, Florida."
  },
  "Israel": {
    name: "Israel",
    description: "This is the first country I visited internationally. I recall there being a lot of olives.",
    dateVisited: "July 21, 2019",
    photo: "images/israel_photo.png",
    caption: "The best independent chicken establishment in Nazareth."
  },
  "Japan": {
    name: "Japan",
    description: "I studied abroad here during the Summer 2023 semester. Don't ask me to speak Japanese, though.",
    dateVisited: "May 31, 2023",
    photo: "images/japan_photo.jpg",
    caption: "A funny souvenir image I got from a maid cafe in Kyoto."
  },
  "Italy": {
    name: "Italy",
    description: "I visited here as part of a cruise I took in 2024. Surprisingly, this trip was unrelated from my Italian heritage (you may have thought from my last name).",
    dateVisited: "June 21, 2024",
    photo: "images/italy_photo.png",
    caption: "By pure coincidence, I got to see the Tour De France come through Bologna the day I was staying there. Just imagine me in the crowd."
  },
  "Greece": {
    name: "Greece",
    description: "I visited here as part of a cruise I took in 2024.",
    dateVisited: "June 24, 2024",
    photo: "images/greece_photo.png",
    caption: "I walked up all of these stairs in Santorini. Where's my medal?"
  },
  "Montenegro": {
    name: "Montenegro",
    description: "I visited here as part of a cruise I took in 2024. It was raining.",
    dateVisited: "June 27 2024",
    photo: "images/montenegro_photo.jpg",
    caption: "A rainy day in Montenegro."
  },
  "Norway": {
    name: "Norway",
    description: "I went here with my brother for New Years 2023 and it was very cold.",
    dateVisited: "December 29, 2022",
    photo: "images/norway_photo.jpg",
    caption: "Me with a goat at the top of a mountain in Bergen."
  },
  "Croatia": {
    name: "Croatia",
    description: "I visited here as part of a cruise I took in 2024.",
    dateVisited: "June 28, 2024",
    photo: "images/croatia_photo.png",
    caption: "A submarine tour in Croatia."
  }
  // Add more countries and their details here
};

const philosophyMessages = [
  "Why are we here?",
  "Is this real life?",
  "What is the meaning of life?",
  "Do we have free will?",
  "What is consciousness?",
  "Is there life after death?",
  "What is the nature of reality?",
  "Are we alone in the universe?",
  "What is truth?",
  "Is there a point to all this?"
];

class MoreAboutMe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      slideWidth: window.innerWidth,
      isBlurred: true,
      showPopup: false,
      selectedCountry: null,
      chessGame: new Chess(),
      philosophyMessage: this.getRandomPhilosophyMessage(),
      questionMarks: this.generateQuestionMarks(),
      isSubmitting: false,
      showPhilosophyMessage: false,
      specialMessage: "Will you be heard?"
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    setTimeout(this.updateSlideWidth, 300); // Delay the call to updateSlideWidth by 300 milliseconds

    // Preload images
    this.preloadImages();

    // Update question marks positions periodically
    this.questionMarkInterval = setInterval(this.updateQuestionMarks, 3000);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    clearInterval(this.questionMarkInterval); // Clear the interval when the component unmounts
  }

  preloadImages = () => {
    Object.values(countryDetails).forEach(country => {
      const img = new Image();
      img.src = country.photo;
    });
  };

  handleResize = () => {
    setTimeout(this.updateSlideWidth, 100); // Delay the call to updateSlideWidth by 100 milliseconds
  };

  updateSlideWidth = () => {
    console.log("Updating slide width");
    const slider = document.querySelector('.slider');
    const slideWidth = slider ? slider.clientWidth : window.innerWidth;
    this.setState({ slideWidth }, () => {
      // Ensure the slides are centered after setting the slide width
      this.forceUpdate();
    });
  };

  goToPreviousSlide = () => {
    const { currentIndex } = this.state;
    const lastIndex = 2; // Update to reflect the number of prebuilt slides
    const shouldResetIndex = currentIndex === 0;
    const index = shouldResetIndex ? lastIndex : currentIndex - 1;

    this.setState({
      currentIndex: index
    });
    this.handleResize();
  };

  goToNextSlide = () => {
    const { currentIndex } = this.state;
    const lastIndex = 2; // Update to reflect the number of prebuilt slides
    const shouldResetIndex = currentIndex === lastIndex;
    const index = shouldResetIndex ? 0 : currentIndex + 1;

    this.setState({
      currentIndex: index
    });
    this.handleResize();
  };

  handleCountryClick = (geo) => {
    const countryName = geo.properties.name;
    const details = countryDetails[countryName];
    if (details) {
      this.setState({ showPopup: true, selectedCountry: details });
    }
  };

  closePopup = () => {
    this.setState({ showPopup: false, selectedCountry: null });
  };

  getCountryColor = (geo) => {
    const countryName = geo.properties.name;
    // Define custom colors for specific countries
    const countryColors = {
      "United States of America": "#90EE90", // Light green
      "Israel": "#90EE90", // Light green
      "Japan": "#90EE90", // Light green
      "Italy": "#90EE90", // Light green
      "Greece": "#90EE90", // Light green
      "Montenegro": "#90EE90", // Light green
      "Norway": "#90EE90", // Light green
      "Croatia": "#90EE90", // Light green
      // Add more countries and their colors here
    };
    return countryColors[countryName] || "#D6D6DA"; // Default color
  };

  removeBlur = () => {
    this.setState({ isBlurred: false });
  };

  onDrop = ({ sourceSquare, targetSquare }) => {
    try {
      const move = this.state.chessGame.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q'
      });
  
      // If chess.js returns 'null', it's invalid, so just exit.
      // Chessboard will snap the piece back automatically.
      if (move === null) return;
  
      // Otherwise, move is valid: update state to reflect the new position.
      this.setState({ chessGame: this.state.chessGame });
    } catch (error) {
      // If chess.js threw an error, ignore it and let the piece snap back.
      console.warn("Caught invalid move:", error);
    }
  };
  

  getRandomPhilosophyMessage = () => {
    const randomIndex = Math.floor(Math.random() * philosophyMessages.length);
    return philosophyMessages[randomIndex];
  };

  handlePhilosophySubmit = (event) => {
    event.preventDefault();
    const answer = event.target.elements.answer.value;
    console.log("User's answer:", answer);
    // Call a function to handle the answer (for now, just log it)
  };

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

  handlePhilosophySubmit = (event) => {
    event.preventDefault();
    const answer = event.target.elements.answer.value.trim().toLowerCase();
    console.log("User's answer:", answer);
  
    let specialMessage = "Interesting.";
    if (!answer || answer === "idk" || answer === "i don't know" || answer === "i dont know") {
      specialMessage = "I don't know either.";
    }
  
    // Trigger fade-out effect
    this.setState({ isSubmitting: true, specialMessage });
  
    // After the fade-out effect, update the state to show the new message
    setTimeout(() => {
      this.setState({ showPhilosophyMessage: true });
    }, 500); // Match the duration of the fade-out effect
  };

  render() {
    const { handlers } = this.props;
    const { currentIndex, slideWidth, isBlurred, showPopup, selectedCountry, chessGame, philosophyMessage, questionMarks, isSubmitting, showPhilosophyMessage, specialMessage } = this.state;
  
    const translateX = -currentIndex * slideWidth;
  
    const chessboardWidth = Math.min(slideWidth * 0.8, 400); // 80% of slide width or max 400px
  
    // List of clickable countries
    const clickableCountries = [
      "United States of America",
      "Israel",
      "Japan",
      "Italy",
      "Greece",
      "Montenegro",
      "Norway",
      "Croatia"
      // Add more countries here
    ];
  
    return (
      <section id="more-about-me" {...handlers}> {/* Ensure the ID matches */}
        <h1 className="section-title">More About Me</h1>
        <div className="slider">
          <button className="arrow left-arrow" onClick={this.goToPreviousSlide}>
            &#10094;
          </button>
          <div className="slides-container" style={{ transform: `translateX(${translateX}px)` }}>
            <div className="slide" style={{ width: `${slideWidth}px` }}>
              <h2>My Travels</h2>
              {isBlurred && (
                <div className="blur-overlay">
                  <p className="blur-message">
                    I love to travel. Currently, I have only traveled internationally a handful of times. My life goal is to visit at least fifty countries. Click to see my interactive travel map.
                  </p>
                  <button className="unblur-button" onClick={this.removeBlur}>See Map</button>
                </div>
              )}
              <div className={`map-container ${isBlurred ? 'blurred' : ''}`}>
                <ComposableMap projection="geoMercator">
                  <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                      geographies.map(geo => (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          onClick={clickableCountries.includes(geo.properties.name) ? () => this.handleCountryClick(geo) : null}
                          style={{
                            default: { fill: this.getCountryColor(geo), outline: "none" },
                            hover: { fill: clickableCountries.includes(geo.properties.name) ? "#F53" : this.getCountryColor(geo), outline: "none" },
                            pressed: { fill: clickableCountries.includes(geo.properties.name) ? "#E42" : this.getCountryColor(geo), outline: "none" }
                          }}
                        />
                      ))
                    }
                  </Geographies>
                </ComposableMap>
              </div>
            </div>
  
            {/* New Chess Slide */}
            <div className="slide" style={{ width: `${slideWidth}px` }}>
              <h2>Chess</h2>
              <Chessboard
                position={chessGame.fen()}
                onDrop={this.onDrop}
                width={chessboardWidth}
              />
              <p className="caption"></p>
              <p>
                I picked up chess a few years ago and it is now one of my favorite hobbies. As of recently, I have been playing a lot of the 2v2 variant called "Bughouse." I have never played in an offical over-the-board tournament, but I plan to one day.
              </p>
              <p>
                <strong>Goal:</strong> Reach an online rating of 2000 in any chess format.
              </p>
              <p>
                <a href="https://www.chess.com/member/GrowHome" target="_blank" rel="noopener noreferrer">
                  Visit my Chess.com profile
                </a>
              </p>
            </div>
  
            {/* New Philosophy Slide */}
            <div className="slide philosophy-slide" style={{ width: `${slideWidth}px` }}>
              <div className="philosophy-background">
                <h2>Philosophy</h2>
                <p className="philosophy-caption">I enjoy reading philosophy and am always interested in the perspective of others.</p>
                <p></p>
                <p></p>
                {showPhilosophyMessage ? (
                  <p className="philosophy-message fade-in">{specialMessage}</p>
                ) : (
                  <div className={`philosophy-form ${isSubmitting ? 'fade-out' : ''}`}>
                    <p className="philosophy-message">{philosophyMessage}</p>
                    <form onSubmit={this.handlePhilosophySubmit}>
                      <input type="text" name="answer" placeholder="Your answer..." className="philosophy-input" />
                      <button type="submit" className="philosophy-submit">Submit</button>
                    </form>
                  </div>
                )}
              </div>
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
          </div>
          <button className="arrow right-arrow" onClick={this.goToNextSlide}>
            &#10095;
          </button>
        </div>
        {showPopup && selectedCountry && (
          <div className="popup">
            <div className="popup-content">
              <span className="close" onClick={this.closePopup}>&times;</span>
              <h2>{selectedCountry.name}</h2>
              <p>{selectedCountry.description}</p>
              <p><strong>Date first visited:</strong> {selectedCountry.dateVisited}</p>
              <img src={selectedCountry.photo} alt={selectedCountry.name} />
              <p className="caption">{selectedCountry.caption}</p>
            </div>
          </div>
        )}
      </section>
    );
  }
}

const MoreAboutMeWithSwipe = forwardRef((props, ref) => {
  const handlers = useSwipeable({
    onSwipedLeft: props.goToNextSlide,
    onSwipedRight: props.goToPreviousSlide,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  return <MoreAboutMe {...props} handlers={handlers} ref={ref} />;
});

const MoreAboutMeContainer = (props) => {
  const moreAboutMeRef = React.createRef();

  const goToPreviousSlide = () => {
    if (moreAboutMeRef.current) {
      moreAboutMeRef.current.goToPreviousSlide();
    }
  };

  const goToNextSlide = () => {
    if (moreAboutMeRef.current) {
      moreAboutMeRef.current.goToNextSlide();
    }
  };

  return (
    <MoreAboutMeWithSwipe
      {...props}
      goToPreviousSlide={goToPreviousSlide}
      goToNextSlide={goToNextSlide}
      ref={moreAboutMeRef}
    />
  );
};

export default MoreAboutMeContainer;