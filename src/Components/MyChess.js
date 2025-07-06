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
      disableSwipe: false,
      robotEmotion: "neutral"
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
    
    // Extract emotion from the first line
    const firstLine = lines[0] || '';
    let emotion = "neutral";
    if (firstLine.startsWith('!')) {
      const emotionMatch = firstLine.match(/^!(happy|veryhappy|neutral|sad|verysad|mated)/);
      if (emotionMatch) {
        emotion = emotionMatch[1];
      }
    }
    
    // Determine if this is a normal move response or a game-ending response
    const hasOfficialMove = lines.some(line => line.includes('OFFICIAL MOVE:'));
    
    let updatedState = '';
    let officialMove = '';
    let dialogueLines = [];
    
    if (hasOfficialMove && lines.length >= 2) {
      // Normal move response: emotion, dialogue, state, official move
      const lastLine = lines[lines.length - 1];
      const secondToLastLine = lines[lines.length - 2];
      
      updatedState = secondToLastLine.trim();
      officialMove = lastLine.replace('OFFICIAL MOVE: ', '').trim();
      
      // Get dialogue lines (everything except emotion, state, and official move)
      dialogueLines = lines.slice(0, -2).filter(line => !line.startsWith('!'));
    } else {
      // Game-ending response: just emotion and dialogue
      dialogueLines = lines.filter(line => !line.startsWith('!'));
    }
    
    let dialogueText = dialogueLines.join(' ').trim();
    
    // Check for game-ending scenarios and clean up dialogue
    if (dialogueText.includes('You win by checkmate!')) {
      emotion = 'loss'; // Robot loses, player wins
      dialogueText = 'You win by checkmate!';
    } else if (dialogueText.includes('I win by checkmate!')) {
      emotion = 'win'; // Robot wins
      // Extract only the move and checkmate message
      const checkmateIndex = dialogueText.indexOf('I win by checkmate!');
      const textBeforeCheckmate = dialogueText.substring(0, checkmateIndex).trim();
      
      // Find the last move (text ending with '!')
      const sentences = textBeforeCheckmate.split(/[.!]/);
      let lastMove = '';
      for (let i = sentences.length - 1; i >= 0; i--) {
        const sentence = sentences[i].trim();
        if (sentence && (sentence.includes(' to ') || sentence.includes('castles') || sentence.includes('takes'))) {
          lastMove = sentence + '!';
          break;
        }
      }
      
      dialogueText = lastMove ? `${lastMove} I win by checkmate!` : 'I win by checkmate!';
    } else if (dialogueText.includes('It\'s a draw by')) {
      emotion = 'draw'; // Game is a draw
      // Extract only the draw message
      const drawIndex = dialogueText.indexOf('It\'s a draw by');
      const drawMessage = dialogueText.substring(drawIndex);
      const drawEnd = drawMessage.indexOf('!') + 1;
      dialogueText = drawMessage.substring(0, drawEnd);
    }
    
    try {
      if (officialMove) {
        const move = this.state.chessGame.move({
          from: officialMove.slice(0, 2),
          to: officialMove.slice(2, 4),
          promotion: 'q'
        });
        if (move !== null) {
          // Update the moves string with the new state and the official move
          const currentMoves = this.state.moves;
          const moveHistory = currentMoves.split(' ').slice(5); // Get all moves after the state
          const newMovesString = `${updatedState} ${moveHistory.join(' ')} ${officialMove}`;
          
          this.setState(prevState => ({
            chessGame: prevState.chessGame,
            moves: newMovesString,
            robotEmotion: emotion
          }));
        } else {
          this.appendDialogue('Invalid move.');
          return;
        }
      } else {
        // No official move - this happens in checkmate/draw scenarios
        this.setState(prevState => ({
          robotEmotion: emotion
        }));
      }
      
      // Update dialogue
      this.appendDialogue(dialogueText);
      
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
    
    // Map emotion to robot image
    const getRobotImage = () => {
      switch (this.state.robotEmotion) {
        case 'win':
          return 'images/robot_win.png';
        case 'loss':
          return 'images/robot_loss.png';
        case 'draw':
          return 'images/robot_draw.png';
        case 'happy':
          return 'images/robot_happy.png';
        case 'veryhappy':
          return 'images/robot_veryhappy.png';
        case 'sad':
          return 'images/robot_sad.png';
        case 'verysad':
          return 'images/robot_verysad.png';
        case 'mated':
          return 'images/robot_mated.png';
        case 'neutral':
        default:
          return 'images/robot_neutral.png';
      }
    };
    
    return (
      <div className="slide mychess-slide" style={{ width: `${slideWidth}px` }}>
        <h2>Chess</h2>
        <div className="robot-dialogue-container">
          <img 
            src={getRobotImage()} 
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