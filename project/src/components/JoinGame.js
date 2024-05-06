import React, { useState } from 'react';
import { useChatContext, Channel } from 'stream-chat-react';
import Game from './Game';

function JoinGame() {
  const [opponent, setOpponent] = useState('');
  const { client } = useChatContext();
  const [channel, setChannel] = useState(null);

  const createChannel = async () => {
    const response = await client.queryUsers({ name: { $eq: opponent } });

    if (response.users.length === 0) {
      alert('User not found');
      return;
    }

    const newChannel = await client.channel('messaging', {
      members: [client.userID, response.users[0].id],
    });

    await newChannel.watch();
    setChannel(newChannel);
    sendGameRequest(response.users[0]);
  };

  const sendGameRequest = async (opponentUser) => {
    const opponentChannel = client.channel('messaging', {
      members: [opponentUser.id, client.userID],
    });

    await opponentChannel.sendMessage({
      text: `Hey ${opponentUser.name}, do you want to play a game?`,
      metadata: {
        type: 'game_request',
        sender: client.userID,
      },
    });
  };

  const handleGameResponse = async (message) => {
    if (message.metadata && message.metadata.type === 'game_request') {
      const acceptGame = window.confirm(`Hey ${message.user.name}, ${opponent} wants to play a game with you. Do you accept?`);
      
      if (acceptGame) {
        setChannel(message.cid);
        await client.channel('messaging', message.cid).addMembers([client.userID]);
      } else {
        await message.channel.sendMessage({
          text: `Sorry, ${message.user.name} declined the game request.`,
          metadata: {
            type: 'game_response',
            response: 'decline',
          },
        });
      }
    }
  };

  return (
    <>
      {channel ? (
        <Channel channel={channel}>
          <Game channel={channel} />
        </Channel>
      ) : (
        <div className="joinGame">
          <h4>Create Game</h4>
          <input
            placeholder="Enter Opponent"
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

export default JoinGame;
