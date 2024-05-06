import React, {useState} from 'react';
import Board from './Board';
function Game({channel}) {
  const [activePlayers, setActive] = useState(
    channel.state.watcher_count ===2
  );

  channel.on("user.watching.start", (event) => {
    setActive(event.watcher_count ===2);
  });//will call function when another user joins 
  if(!activePlayers){
    return <div> Waiting for other player to join...</div>
  }
  return (
    <div className ="gameBoard">
      <Board/>
      {/* Leave game */}
    </div>
  )
}

export default Game
