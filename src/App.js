import './App.css';
import { useState } from 'react';

const initBoard = ['', '', '', '', '', '', '', '', '']
function App() {
  const [board, setBoard] = useState(initBoard)
  const [xTurn, setXTurn] = useState(true)

  const checkWin = () => {
    console.log('board', board)
  }
  const handleClick = (index) => {
    console.log(`clicked item: ${index}`)
    // check game piece = ""
    if (board[index] !== "") {
      // stops the function here
      return
    }
    // set game piece
    // RULE: with react state, you can't directly mutate state
    // you need to go through setstate to change state
    // board[index] = xTurn ? "X" : "O"       BAD
    let boardClone = [...board]
    boardClone[index] = xTurn ? "X" : "O"     // This doesn't mutate state
    setBoard(boardClone)
    setXTurn(!xTurn)
    // check win
    checkWin()
  }
  const renderBoard = () => {
    return board.map((piece, index) => {
      return <div key={index} onClick={() => handleClick(index)} className="box">{piece}</div>
    })
  }

  const reset = () => {
    setBoard(initBoard)
  }
  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <button onClick={reset}>Reset</button>
      <div className="game-board">
        {renderBoard()}
      </div>
    </div>
  );
}

export default App;
