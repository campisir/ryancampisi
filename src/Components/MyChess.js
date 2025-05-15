import React, { Component } from 'react';
import { Chessboard } from "react-chessboard";
import { Chess } from 'chess.js';
import './MyChess.css';

class MyChess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chessGame: new Chess(),
      dialogue: "",
      moves: "0 0 1 1 0",
      disableSwipe: false
    };
    this.wasmWorker = null;
  }

  generateRandomWhiteMove = () => {
    const possibleMoves = this.state.chessGame.moves({ verbose: true });
    const whiteMoves = possibleMoves.filter(move => move.color === 'w');
    const randomMove = whiteMoves[Math.floor(Math.random() * whiteMoves.length)];
    return randomMove;
  };

  appendDialogue = (msg) => {
    this.setState({ dialogue: msg.replace(/[\r\n]+/g, ' ') });
  };

  componentDidMount() {
    // Initialize the WASM worker for chess logic
    this.wasmWorker = new Worker('wasmWorker.js');
    this.wasmWorker.onmessage = (e) => {
      const { type, result, message } = e.data;
      if (type === 'wasmLoaded') {
        this.appendDialogue('Let\'s play. ');
      } else if (type === 'result') {
        this.handleWasmResult(result);
      } else if (type === 'error') {
        this.appendDialogue(`Uh... I can't play right now, sorry.: ${message} `);
      }
    };

    // Execute an initial random white move
    const randomMove = this.generateRandomWhiteMove();
    if(randomMove) {
      this.state.chessGame.move(randomMove);
      this.setState(prevState => ({
        moves: `${prevState.moves} ${randomMove.from}${randomMove.to}`
      }));
    }
  }

  componentWillUnmount() {
    if (this.wasmWorker) {
      this.wasmWorker.terminate();
    }
  }

  runWasmFunction = () => {
    if (!this.wasmWorker) {
      console.error('Error: wasm worker not initialized.');
      return;
    }
    const { moves } = this.state;
    console.log("moves: ", moves);
    // Send the moves to the worker for processing
    this.wasmWorker.postMessage({ type: 'runWasm', moves });
  };

  handleWasmResult = (result) => {
    if (typeof result !== 'string' || !result.trim()) {
      this.appendDialogue('Error: Invalid result from WASM worker.');
      return;
    }
    const lines = result.trim().split('\n');
    if (lines.length < 2) {
      console.log('Incomplete result:', result);
      this.appendDialogue('Error: Incomplete result from WASM worker.');
      return;
    }
    const lastLine = lines.pop();
    const secondToLastLine = lines.pop();
    this.appendDialogue(lines.join(' ') + ' ');
    const officialMove = lastLine ? lastLine.replace('OFFICIAL MOVE: ', '').trim() : '';
    try {
      if (officialMove) {
        const move = this.state.chessGame.move({
          from: officialMove.slice(0, 2),
          to: officialMove.slice(2, 4),
          promotion: 'q'
        });
        if (move !== null) {
          this.setState(prevState => ({
            chessGame: prevState.chessGame,
            moves: `${prevState.moves} ${officialMove}`
          }));
        } else {
          this.appendDialogue('Invalid move.');
        }
      } else {
        this.appendDialogue('No official move found.');
      }
    } catch (error) {
      this.appendDialogue(`Error making move: ${error.message}`);
    }
    console.log('Program executed. Result:', result);
  };

  onPieceDrop = (sourceSquare, targetSquare) => {
    try {
      const move = this.state.chessGame.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q'
      });
      if (move === null) return;
      const userMove = `${sourceSquare}${targetSquare}`;
      let { moves } = this.state;
      // Check for pawn two-square push
      if (move.piece === 'p' && Math.abs(sourceSquare.charCodeAt(1) - targetSquare.charCodeAt(1)) === 2) {
        const columnIndex = sourceSquare.charCodeAt(0) - 'a'.charCodeAt(0);
        moves = `1 ${columnIndex} ${moves.split(' ').slice(2).join(' ')}`;
      }
      this.setState(prevState => ({
        chessGame: prevState.chessGame,
        moves: `${moves} ${userMove}`
      }), () => {
        // Temporarily disable swipe (if used in the parent slider)
        this.setState({ disableSwipe: true });
        setTimeout(() => {
          this.setState({ disableSwipe: false });
        }, 500);
        setTimeout(() => {
          this.runWasmFunction();
        }, 100); // Adjust delay as needed
      });
    } catch (error) {
      console.warn("Caught invalid move:", error);
    }
  };

  render() {
    const { slideWidth } = this.props; // Parent should pass slideWidth
    const chessboardWidth = Math.min(slideWidth * 0.8, 400);
    return (
      <div className="slide mychess-slide" style={{ width: `${slideWidth}px` }}>
        <h2>Chess</h2>
        <div className="robot-dialogue-container">
          <img 
            src="images/robot.png" 
            alt="Robot" 
            className="robot-image" 
          />
          <div className="dialogue-box">
            {this.state.dialogue}
          </div>
        </div>
        <div 
          className="chessboard-container"
          onTouchStart={e => e.stopPropagation()}
          onTouchMove={e => e.stopPropagation()}
          onTouchEnd={e => e.stopPropagation()}
        >
          <Chessboard
            position={this.state.chessGame.fen()}
            onPieceDrop={this.onPieceDrop}
            boardWidth={chessboardWidth}
            boardOrientation="black"
          />
        </div>
        <p className="caption"></p>
        <p>
          I picked up chess a few years ago and it is now one of my favorite hobbies. As of recently, I have been playing a lot of the 2v2 variant called "Bughouse." I have never played in an official over-the-board tournament, but I plan to one day.
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
    );
  }
}

export default MyChess;