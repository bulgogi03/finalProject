import React, {useState} from 'react';
import '../Game.css';

function Game({channel}) {
  const [activePlayers, setActive] = useState(
    channel.state.watcher_count ===2
  );

  channel.on("user.watching.start", (event) => {
    setActive(event.watcher_count ===2);
  });//will call function when another user joins 
  if(!activePlayers){
    return <div className = "container4">
      <div className="text"> Waiting for other player to join...</div>
    </div>
  }
  return (
    <div className = "container4">
      <div className="text">Tic-Tac-Toe S.E.</div>
    </div>
  )
}

export default Game