import React, {useState} from 'react';
import {useChatContext} from 'stream-chat-react';

function JoinGame() {
  const [opponent, setOpponent] =useState("");
  const {client} = useChatContext();
  const [channel, setChannel] = useState(null);
  const createChannel = async () => {//creates a room for the users
    const response = await client.queryUsers({name: {$eq: opponent}});//queries for a username equal to the one player entered

    if (response.users.length === 0 ){
      alert("User not found");
      return;
    }
    const newChannel = await client.channel("messaging", {
      members: [client.userID, response.users[0].id],//adds the two people to a channel
    });
    await newChannel.watch();//to listen to events and allows server to get events
    setChannel(newChannel);
  };
  return (
    <>
    {channel ? (<h1>Start</h1>)//condition of if channel is not null it shows start
    :(//if channel is null it shows this
    <div className="joinGame">
      <h4>Create Game</h4>
      <input placeholder = "Enter Opponent" //lets user type in a random players name to send a request to them
      onChange={(event) => {
        setOpponent(event.target.value);
        }} 
      />
      <button onClick={createChannel}> Start Game </button>
    </div>
    )}
    </>
  );
}

export default JoinGame
