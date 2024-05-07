import React, {useState} from 'react';
import Board from "./Board";
import "../Game.css";
import Button from '@mui/material/Button';

function Game({channel}) {
  const [activePlayers, setActive] = useState(
    channel.state.watcher_count ===2
  );
  const [result, setResult] = useState({winner: "none", state: "none"});
  const [diceResult, setDiceResult] = useState(null);

  channel.on("user.watching.start", (event) => {
    setActive(event.watcher_count ===2);
  });//will call function when another user joins 

  const rollDice = () => {
    const randnum = Math.floor(Math.random() * 6) + 1;
    setDiceResult(randnum);
  };

  if(!activePlayers){
    return <div> Waiting for other player to join...</div>
  }
  return (
    <div className = "gameContainer">
      <div className = "boardContainer">
        <Board result={result} setResult={setResult}/>
      </div>
      <div className = "diceContainer">
        {diceResult && <div>{diceResult}</div>}
      </div>
      <div className = "diceRollButton">
        <Button onClick={rollDice} variant="container">Roll</Button>
      </div>
      { /* Leave Game Button */}
    </div>
  )
}

export default Game