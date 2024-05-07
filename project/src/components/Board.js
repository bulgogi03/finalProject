import React, {useState} from 'react'
import Box from './Box'

function Board() {
    const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""])
  return (
    <div className="board">
      <div className="row">
        <Box picked={} sign={board[0]}/>
        <Box picked={} sign={board[1]}/>
        <Box picked={} sign={board[2]}/>
        <Box picked={} sign={board[3]}/>
        <Box picked={} sign={board[4]}/>
      </div>
      <div className="row">
        <Box picked={} sign={board[5]}/>
        <Box picked={} sign={board[6]}/>
        <Box picked={} sign={board[7]}/>
        <Box picked={} sign={board[8]}/>
        <Box picked={} sign={board[9]}/>
      </div>
      <div className="row">
        <Box picked={} sign={board[10]}/>
        <Box picked={} sign={board[11]}/>
        <Box picked={} sign={board[12]}/>
        <Box picked={} sign={board[13]}/>
        <Box picked={} sign={board[14]}/>
      </div>
      <div className="row">
        <Box picked={} sign={board[15]}/>
        <Box picked={} sign={board[16]}/>
        <Box picked={} sign={board[17]}/>
        <Box picked={} sign={board[18]}/>
        <Box picked={} sign={board[19]}/>
      </div>
      <div className="row">
        <Box picked={} sign={board[20]}/>
        <Box picked={} sign={board[21]}/>
        <Box picked={} sign={board[22]}/>
        <Box picked={} sign={board[23]}/>
        <Box picked={} sign={board[24]}/>
      </div>
    </div>
  )
}

export default Board