import React, {useState} from 'react'
import Box from './Box'

function Board() {
    const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""])
  return (
    <div className="board">
      {/* <div className="row">
        <Box picked={} sign={board[0]}/>
        <Box picked={} sign={board[1]}/>
        <Box picked={} sign={board[2]}/>
      </div>
      <div className="row">
        <Box picked={} sign={board[3]}/>
        <Box picked={} sign={board[4]}/>
        <Box picked={} sign={board[5]}/>
      </div>
      <div className="row">
        <Box picked={} sign={board[6]}/>
        <Box picked={} sign={board[7]}/>
        <Box picked={} sign={board[8]}/>
      </div> */}
    </div>
  )
}

export default Board
