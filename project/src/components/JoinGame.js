import React, {useState} from 'react';
import {useChatContext, Channel} from 'stream-chat-react';
import Game from './Game';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import '../JoinGame.css';

function JoinGame() {
  const [opponent, setOpponent] =useState("");
  const {client} = useChatContext();
  const [channel, setChannel] = useState(null);
  const createChannel = async () => {//creates a room for the users
    const response = await client.queryUsers({name: {$eq: opponent}});//queries for a username equal to the one player entered

    if (response.users.length === 0) {
      alert("User not found");
      return;
    }
  
    const newChannel = await client.channel("messaging", {
      members: [client.userID, response.users[0].id],
    });
  
    await newChannel.watch();
    setChannel(newChannel);
  };
  return (
    <>
    {channel ? (//we need direct access to the channel for the Game so that we can see if both users are present
      <Channel channel={channel}>
        <Game channel={channel}/>
      </Channel>
      )//condition of if channel is not null it shows start
    :(//if channel is null it shows this
    <div className = "container3">
      <div className = "title">
        <div className = "text">Enter Opponent</div>
      </div>
      <div className = "middle">
        <div className = "input">
          <TextField onChange={(event) => {setOpponent(event.target.value);}} id="outlined-basic" label="Enter Opponent" variant="outlined" style={{width: 300}} />
        </div>
        <div className = "inputButton">
          <Button onClick={createChannel} variant="contained">Start Game</Button>
        </div>
      </div>
    </div>
    )}
    </>
  );
}

export default JoinGame

