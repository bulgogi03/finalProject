import React, {useState} from 'react';

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
    <div>
      Tic-Tac-Toe S.E.
    </div>
  )
}

export default Game
