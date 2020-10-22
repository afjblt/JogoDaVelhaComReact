import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.getInitialState();
  }

  handleClick(i) {
    const squares = this.state.squares
    const currentInfo = squares[i]

    if (currentInfo || calculateWinner(squares)) {
      return 
    }

    const currentMove = this.state.nextMove

    squares[i] = currentMove;

    const nextMove = currentMove === 'X'? 'O' : 'X';

    this.setState(
      {
        squares: squares,
        nextMove: nextMove
      }
    )

   }


   getInitialState() {
    return {
      squares: Array(9).fill(null),
      nextMove: "X",
    };
   }

   restartGame() {
     this.setState(this.getInitialState())
   }

  render() {
    const winner = calculateWinner(this.state.squares)

    const nextMove = this.state.nextMove;
    const winMove = nextMove === 'X' ? 'O' : 'X'

    const status = winner ? 'Winner: ' + winMove : 'Next player: ' + nextMove;

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={this.state.squares} onClick={(i) => this.handleClick(i)} />
        </div>

        <div className="game-info">
          <div>{status}</div>
          <button onClick={() => this.restartGame()}>Restart Game</button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  //Componente
  <Game />,
  ///Em um elemento
  document.getElementById("root")
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for (let line of lines) {
    const [a, b, c] = line

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return true
    } 
  }
  return false
}
