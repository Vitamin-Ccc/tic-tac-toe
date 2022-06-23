import './App.css';
import { useState } from 'react';

const initBoard = ['', '', '', '', '', '', '', '', '']
function App() {
  const [board, setBoard] = useState(initBoard)
  const [xTurn, setXTurn] = useState(true)
  const [winner, setWinner] = useState(null)

  const checkWin = (currentBoard) => {
    let winner = null
    // board is not updated yet
    // console.log('board', currentBoard)
    let winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [2, 4, 6],
      [0, 4, 8],
    ];
    for(let i = 0; i < winningCombos.length; i++) {
      let [first, second, third] = winningCombos[i]
      if (currentBoard[first] !== "" && currentBoard[first] === currentBoard[second] && currentBoard[first] === currentBoard[third]){
        winner = currentBoard[first]
        break
      }
    }
    return winner
  }
  const handleClick = (index) => {
    // console.log(`clicked item: ${index}`)
    // check game piece = ""
    if (board[index] !== "" || winner) {
      // stops the function here
      return
    }
    // set game piece
    // RULE: with react state, you can't directly mutate state
    // you need to go through setstate to change state
    // board[index] = xTurn ? "X" : "O"       BAD
    let boardClone = [...board]
    boardClone[index] = xTurn ? "X" : "O"     // This doesn't mutate state


    // console.log('about to setBoard with boardClone', boardClone)
    // async, board is not set yet, it will be by the time it renders
    setBoard(boardClone)
    // check win
    if(checkWin(boardClone)){
      let winner = xTurn ? "X" : "O"
      setWinner(winner)
    } else{
      setXTurn(!xTurn)
    }
  }
  const renderBoard = () => {
    return board.map((piece, index) => {
      return <div key={index} onClick={() => handleClick(index)} className="box">{piece}</div>
    })
  }

  const reset = () => {
    setBoard(initBoard)
    setWinner(null)
    setXTurn(false)
  }
  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <button onClick={reset}>Reset</button>
      <div className="game-board">
        {renderBoard()}
      </div>
      {winner && <h1>{winner} won!</h1>}
    </div>
  );
}

export default App;
