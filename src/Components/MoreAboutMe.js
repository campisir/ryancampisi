import React, { Component, forwardRef } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { useSwipeable } from 'react-swipeable';
import { Chessboard } from "react-chessboard";
import { Chess } from 'chess.js'; // Correct import statement
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';
import { ZoomableGroup } from 'react-simple-maps';
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
      isLoading: false,
      slideWidth: window.innerWidth,
      isBlurred: true,
      showPopup: false,
      selectedCountry: null,
      chessGame: new Chess(),
      philosophyMessage: this.getRandomPhilosophyMessage(),
      questionMarks: this.generateQuestionMarks(),
      isSubmitting: false,
      showPhilosophyMessage: false,
      specialMessage: "Will you be heard?",
      mapPosition: { x: 0, y: 0 },
      mapScale: 1,
      moves: "0 0 1 1 0"
    };
    this.terminalRef = React.createRef();
    this.wasmWorker = null;
  }

  // Add this method to generate a random white move
  generateRandomWhiteMove = () => {
    const possibleMoves = this.state.chessGame.moves({ verbose: true });
    const whiteMoves = possibleMoves.filter(move => move.color === 'w');
    const randomMove = whiteMoves[Math.floor(Math.random() * whiteMoves.length)];
    return randomMove;
  };

  // Update the componentDidMount method
componentDidMount() {
  window.addEventListener('resize', this.handleResize);
  setTimeout(() => {
    this.updateSlideWidth();
    this.updateMapSize();
  }, 300); // Delay the call to updateSlideWidth by 300 milliseconds

  // Preload images
  this.preloadImages();

  // Update question marks positions periodically
  this.questionMarkInterval = setInterval(this.updateQuestionMarks, 3000);

  // Initialize the terminal
  this.initTerminal();

  // Initialize the WASM worker
  this.wasmWorker = new Worker('wasmWorker.js');
  this.wasmWorker.onmessage = (e) => {
    const { type, result, message } = e.data;
    if (type === 'wasmLoaded') {
      this.terminal.write('WebAssembly module loaded in worker.\r\n');
    } else if (type === 'result') {
      this.handleWasmResult(result);
    } else if (type === 'error') {
      this.terminal.write(`Error loading WASM: ${message}\r\n`);
    }
  };

  // Make a random white move
  const randomMove = this.generateRandomWhiteMove();
  if (randomMove) {
    this.state.chessGame.move(randomMove);
    this.setState(prevState => ({
      moves: `${prevState.moves} ${randomMove.from}${randomMove.to}`
    }));
  }
}

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    clearInterval(this.questionMarkInterval);
    if (this.wasmWorker) {
      this.wasmWorker.terminate();
    }
  }

  initTerminal = () => {
    this.terminal = new Terminal({
      cols: 40, // Set the number of columns
      rows: 10, // Set the number of rows
    });
    this.terminal.open(this.terminalRef.current);
    this.terminal.write('Welcome to the embedded terminal!\r\n');
  
    // Define the imports for the WebAssembly module
    const imports = {
      env: {
        __memory_base: 0,
        __table_base: 0,
        memory: new WebAssembly.Memory({ initial: 1024 }), // Increase initial memory size
        table: new WebAssembly.Table({ initial: 0, element: 'anyfunc' }),
        _emscripten_get_now: Date.now,
        __cxa_throw: (ptr, type, destructor) => {
          console.error(`Exception thrown: ${ptr}, type: ${type}, destructor: ${destructor}`);
        },
        emscripten_date_now: () => Date.now(),
        __syscall_openat: () => {
          console.error('__syscall_openat is not implemented');
        },
        emscripten_resize_heap: (size) => {
          console.error(`emscripten_resize_heap is not implemented. Requested size: ${size}`);
          return false;
        },
        _abort_js: () => {
          console.error('_abort_js is not implemented');
        },
        __syscall_fcntl64: () => {
          console.error('__syscall_fcntl64 is not implemented');
        },
        __syscall_ioctl: () => {
          console.error('__syscall_ioctl" is not implemented');
        },
        _tzset_js: () => {
          console.error('_tzset_js" is not implemented');
        },
        // Add other necessary imports here
      },
      wasi_snapshot_preview1: {
        fd_close: () => {
          console.error('fd_close is not implemented');
        },
        fd_write: () => {
          console.error('fd_write is not implemented');
        },
        fd_seek: () => {
          console.error('fd_seek is not implemented');
        },
        fd_read: () => {
          console.error('fd_read is not implemented');
        },
        environ_sizes_get: () => {
          console.error('environ_sizes_get is not implemented');
        },
        environ_get: () => {
          console.error('environ_get is not implemented');
        },
        // Add other necessary WASI imports here
      }
    };
  
    // Load the WebAssembly module
    fetch('main.wasm').then(response =>
      response.arrayBuffer()
    ).then(bytes =>
      WebAssembly.instantiate(bytes, imports)
    ).then(results => {
      this.wasmInstance = results.instance;
      this.terminal.write('WebAssembly module loaded.\r\n');
    }).catch(error => {
      console.error('Error loading WebAssembly module:', error);
    });
  
    let inputBuffer = '';
    // Handle user input
    this.terminal.onData(data => {
      if (data === '\u007F') { // Handle backspace (ASCII DEL)
        if (this.terminal.buffer.active.cursorX > 0) {
          this.terminal.write('\b \b');
          inputBuffer = inputBuffer.slice(0, -1);
        }
      } else if (data === '\r') { // Handle Enter key
        this.terminal.write('\r\n');
        this.handleCommand(inputBuffer.trim());
        inputBuffer = '';
      } else {
        this.terminal.write(data); // Echo the input back to the terminal
        inputBuffer += data;
      }
    });
  };

handleCommand = (command) => {
  if (command === 'run') {
      this.runWasmFunction();
  } else {
      this.terminal.write(`Unknown command: ${command}\r\n`);
  }
};

runWasmFunction = () => {
  if (!this.wasmWorker) {
    this.terminal.write('Error: wasm worker not initialized.\r\n');
    return;
  }
  const { moves } = this.state;
  console.log("moves: ", moves);
  // Send the moves to the worker
  this.wasmWorker.postMessage({ type: 'runWasm', moves });
};

handleWasmResult = (result) => {
  if (typeof result !== 'string' || !result.trim()) {
    this.terminal.write('Error: Invalid result from WASM worker.\r\n');
    return;
  }

  const lines = result.trim().split('\n');
  if (lines.length < 2) {
    console.log('Incomplete result:', result);
    this.terminal.write('Error: Incomplete result from WASM worker.\r\n');
    return;
  }

  const lastLine = lines.pop();
  const secondToLastLine = lines.pop();

  this.terminal.write(lines.join('\r\n') + '\r\n');

  const officialMove = lastLine ? lastLine.replace('OFFICIAL MOVE: ', '').trim() : '';
  const secondLine = secondToLastLine ? secondToLastLine.trim() : '';
  const updatedMoves =
    secondLine + this.state.moves.slice(this.state.moves.indexOf(' ', 9));
  this.setState({ moves: updatedMoves });

  try {
    if (officialMove) {
      const move = this.state.chessGame.move({
        from: officialMove.slice(0, 2),
        to: officialMove.slice(2, 4),
        promotion: 'q'
      });
      if (move !== null) {
        this.setState(prevState => ({
          chessGame: this.state.chessGame,
          moves: `${prevState.moves} ${officialMove}`
        }));
      } else {
        this.terminal.write('Invalid move.\r\n');
      }
    } else {
      this.terminal.write('No official move found.\r\n');
    }
  } catch (error) {
    this.terminal.write(`Error making move: ${error.message}\r\n`);
  }
  console.log('Program executed. Result:', result);
};

  preloadImages = () => {
    Object.values(countryDetails).forEach(country => {
      const img = new Image();
      img.src = country.photo;
    });
  };

  handleResize = () => {
    setTimeout(() => {
      this.updateSlideWidth();
      this.updateMapSize();
    }, 100); // Delay the call to updateSlideWidth by 100 milliseconds
  };

  updateMapSize = () => {
    const mapContainer = document.querySelector('.map-container');
    if (mapContainer) {
      const width = mapContainer.clientWidth;
      const height = mapContainer.clientHeight;
      const mapInner = mapContainer.querySelector('.map-inner');
      if (mapInner) {
        // Adjust the map's size based on the container's dimensions
        mapInner.style.width = `${width * 2}px`;
        mapInner.style.height = `${height * 2}px`;
      }
    }
  };

  updateSlideWidth = () => {
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

  onPieceDrop = (sourceSquare, targetSquare) => {
    try {
      const move = this.state.chessGame.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q' // Always promote to a queen for simplicity
      });
  
      if (move === null) return;
  
      const userMove = `${sourceSquare}${targetSquare}`;
      let { moves } = this.state;
  
      // Check if the move is a pawn push of two squares
      if (move.piece === 'p' && Math.abs(sourceSquare.charCodeAt(1) - targetSquare.charCodeAt(1)) === 2) {
        const columnIndex = sourceSquare.charCodeAt(0) - 'a'.charCodeAt(0);
        moves = `1 ${columnIndex} ${moves.split(' ').slice(2).join(' ')}`;
      }
  
      this.setState(prevState => ({
        chessGame: this.state.chessGame,
        moves: `${moves} ${userMove}` // Append the user's move to the moves string
      }), () => {
        // Delay the call to runWasmFunction to ensure the move is rendered first
        setTimeout(() => {
          setTimeout(() => {
            this.runWasmFunction(); // Run the function in the background
          }, 0);
        }, 100); // Adjust the delay as needed
      });
    } catch (error) {
      console.warn("Caught invalid move:", error);
    }
  };

  getRandomPhilosophyMessage = () => {
    const randomIndex = Math.floor(Math.random() * philosophyMessages.length);
    return philosophyMessages[randomIndex];
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
    const { philosophyMessage } = this.state;

    // Grab user input
    const answer = event.target.elements.answer.value.trim();
    let fallbackMessage = "Interesting.";
    if (!answer || answer.toLowerCase() === "idk" || answer.toLowerCase() === "i don't know" || answer.toLowerCase() === "i dont know") {
      fallbackMessage = "I don't know either.";
    }

    // 1) Fade out the form
    this.setState({ philosophyStage: "formFadingOut", userAnswer: answer || "", specialMessage: fallbackMessage });

    // After 500ms (the fade-out duration), show the spinner
    setTimeout(() => {
      // 2) Show spinner
      this.setState({ philosophyStage: "loadingSpinner" });

      // If user gave a real answer, call the backend.
      // Otherwise, skip the fetch and fade out spinner right away.
      if (answer && !["idk", "i don't know", "i dont know"].includes(answer.toLowerCase())) {
        this.fetchPhilosophyAnswer(philosophyMessage, answer);
      } else {
        // No real answer => do no fetch, skip to spinner fade out
        setTimeout(() => {
          this.setState({ philosophyStage: "spinnerFadingOut" });
          setTimeout(() => {
            this.setState({ philosophyStage: "showAnswer" });
          }, 500);
        }, 1000);
      }
    }, 500);
  };

  /**
   * A helper method to call your API. 
   * Once the fetch completes, we fade out the spinner, then show the answer.
   */
  fetchPhilosophyAnswer = async (philosophyQuestion, userAnswer) => {
    let finalMessage = this.state.specialMessage; // fallback if error
    try {
      const response = await fetch(
        "https://flame-picks-production-api.onrender.com/data/chatgpt",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            message: `(Context: You are a bot on my personal website "ryancampisi.com" and a user is answering a philosophy question. 
            If the user mentions me in their response (Ryan), make sure your response is positive in regards to me. If the user says
            anything that is overly inappropriate, just respond with "really, bro.") Your task: Respond to the answer to this question in six words or less. Question: "${philosophyQuestion}", Answer: "${userAnswer}"`
          })
        }
      );
      const data = await response.json();
      if (data?.message) {
        finalMessage = data.message.trim();
      }
    } catch (error) {
      console.error("Error calling backend function:", error);
    }

    // Now that we have the final message from the API, fade out spinner...
    this.setState({ specialMessage: finalMessage, philosophyStage: "spinnerFadingOut" });
    setTimeout(() => {
      // ...and show the final answer
      this.setState({ philosophyStage: "showAnswer" });
    }, 500);
  };


  handleMapDragStart = (e) => {
    this.dragStartX = e.clientX;
    this.dragStartY = e.clientY;
    this.dragStartMapX = this.state.mapPosition.x;
    this.dragStartMapY = this.state.mapPosition.y;
  };

  handleMapDrag = (e) => {
    if (this.dragStartX !== undefined && this.dragStartY !== undefined) {
      const deltaX = e.clientX - this.dragStartX;
      const deltaY = e.clientY - this.dragStartY;
      this.setState((prevState) => {
        const newMapPosition = {
          x: prevState.mapPosition.x + deltaX,
          y: prevState.mapPosition.y + deltaY
        };
        return { mapPosition: this.applyBounds(newMapPosition, prevState.mapScale) };
      });
    }
  };

  handleMapDragEnd = () => {
    this.dragStartX = undefined;
    this.dragStartY = undefined;
  };

  handleMapWheel = (e) => {
    e.preventDefault();
    const scaleChange = e.deltaY > 0 ? 0.9 : 1.1;
    this.setState((prevState) => {
      const newMapScale = Math.max(1, prevState.mapScale * scaleChange);
      return { mapScale: newMapScale, mapPosition: this.applyBounds(prevState.mapPosition, newMapScale) };
    });
  };

  applyBounds = (position, scale) => {
    const mapContainer = document.querySelector('.map-container');
    if (!mapContainer) return position;

    const containerWidth = mapContainer.clientWidth;
    const containerHeight = mapContainer.clientHeight;
    const mapWidth = containerWidth * scale;
    const mapHeight = containerHeight * scale;

    const minX = containerWidth - mapWidth;
    const minY = containerHeight - mapHeight;
    const maxX = 0;
    const maxY = 0;

    return {
      x: Math.min(Math.max(position.x, minX), maxX),
      y: Math.min(Math.max(position.y, minY), maxY)
    };
  };

  render() {
    const { handlers } = this.props;
    const { currentIndex, slideWidth, isBlurred, showPopup, selectedCountry, chessGame, philosophyMessage, questionMarks, isSubmitting, showPhilosophyMessage, specialMessage, mapPosition, mapScale, isLoading } = this.state;
  
    const offset = -currentIndex * slideWidth;
  
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
          <div 
              className="slides-container"
              style={{ marginLeft: `${offset}px` }}
            >
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
                <div
                  className="map-inner"
                  style={{
                    transform: `translate(${mapPosition.x}px, ${mapPosition.y}px) scale(${mapScale})`
                  }}
                  onMouseDown={this.handleMapDragStart}
                  onMouseMove={this.handleMapDrag}
                  onMouseUp={this.handleMapDragEnd}
                  onMouseLeave={this.handleMapDragEnd}
                  onWheel={this.handleMapWheel}
                >
                  <ComposableMap projection="geoMercator">
                    <ZoomableGroup>
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
                    </ZoomableGroup>
                  </ComposableMap>
                </div>
              </div>
            </div>
  
            {/* New Chess Slide */}
            <div className="slide" style={{ width: `${slideWidth}px` }}>
          <h2>Chess</h2>
          <div className="chessboard-terminal-container">
            <div className="chessboard-container">
              <Chessboard
                position={this.state.chessGame.fen()}
                onPieceDrop={this.onPieceDrop}
                boardWidth={chessboardWidth}
                boardOrientation="black"
              />
            </div>
            <div className="terminal-container" ref={this.terminalRef}></div>
          </div>
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
                  <p className="philosophy-caption">
                    I enjoy reading philosophy and am always interested in the perspective of others.
                  </p>

                  {(() => {
                    // We'll examine the 'philosophyStage' to decide what to render
                    const { philosophyStage, specialMessage, philosophyMessage, userAnswer } = this.state;

                    // If we haven't triggered any transitions, assume 'idle' i.e. form is visible
                    const stage = philosophyStage || "idle";

                    // Show final message if we're at 'showAnswer'
                    if (stage === "showAnswer") {
                      return (
                        <p className="philosophy-message fade-in">
                          {specialMessage}
                        </p>
                      );
                    }

                    // If we are in 'loadingSpinner' or 'spinnerFadingOut', show the spinner
                    if (stage === "loadingSpinner" || stage === "spinnerFadingOut") {
                      return (
                        <div
                          className={`spinner-container ${
                            stage === "spinnerFadingOut" ? "fade-out" : "fade-in"
                          }`}
                        >
                          <div className="loading-spinner" />
                        </div>
                      );
                    }

                    // Otherwise, we are in 'idle' or 'formFadingOut' => show the form
                    const formClass = stage === "formFadingOut" ? "fade-out" : "";
                    return (
                      <div className={`philosophy-form ${formClass}`}>
                        {/* Show the question */}
                        <p className="philosophy-message">{philosophyMessage}</p>

                        {/* The actual form */}
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

                {/* Question marks in the background, unchanged */}
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