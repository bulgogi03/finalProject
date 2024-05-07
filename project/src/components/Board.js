import React, { useState, useEffect } from 'react';
import {useChannelStateContext, useChatContext} from 'stream-chat-react'
import Square from './Square'
import { Patterns } from './WinningComponents'
import "../Board.css";

function Board({result, setResult}){ 
    const [board, setBoard] = useState(["","","","","","","","",""]);
    const [player, setPlayer] = useState("X");
    const [turn, setTurn] = useState("X");
    const [gameEnded, setGameEnded] = useState(false); //checks if game ended

    const { channel } = useChannelStateContext();
    const { client } = useChatContext();

    useEffect(() => {
        if (!gameEnded) {
            checkWin();
            checkTie();
        }
    }, [board, gameEnded]);
    
    
    const chooseSquare = async (square) => {
        if (gameEnded || turn !== player || board[square] !== "") {
            // Return early if the game has ended, it's not the player's turn, or the square is already filled
            return;
        }
    
        setTurn(player === "X" ? "O" : "X");
    
        await channel.sendEvent({
            type: "game-move",
            data: { square: square, player },
        });
    
        setBoard((prevBoard) =>
            prevBoard.map((val, idx) => (idx === square && val === "" ? player : val))
        );
    };
    
    const checkWin = () => {
        Patterns.forEach((currPattern) => {
          ["X", "O"].forEach((player) => {
            const a = board[currPattern[0]];
            const b = board[currPattern[1]];
            const c = board[currPattern[2]];
            
            // Check if all three positions in currPattern contain the same player's mark
            if (a === player && b === player && c === player) {
              alert("Winner: " + player);
              setResult({ winner: player, state: "won" });
              setGameEnded(true); // Game ended, prevent further moves
            }
          });
        });
      };
      
    
    

    const checkTie = () => {
        let filled = true;
        board.forEach((square) => {
            if (square === ""){
                filled = false;
            }
        });
        if (filled) {
            alert("Tie")
            setResult({winner: "none", state: "tie"});
            setGameEnded(true);
        }
    }

    channel.on((event) => { 
        if(event.type === "game-move" && event.user.id !== client.userID) {
            const currentPlayer = event.data.player === "X" ? "O" : "X"; //If current player grabbed by event is "X", makes them "O", otherwise "X"
            setPlayer(currentPlayer);
            setTurn(currentPlayer);
            setBoard(board.map((val, idx) => { 
                if (idx === event.data.square && val === "") {
                    return event.data.player;
                }
                return val;
            })) 
        }
    })

    return(
        <div className = "board">
            <div className = "row">
                <Square 
                    chooseSquare={() => {
                        chooseSquare(0);
                    }}
                val={board[0]}
                />
                <Square 
                    chooseSquare={() => {
                        chooseSquare(1);
                    }}
                val={board[1]}
                />
                <Square 
                    chooseSquare={() => {
                        chooseSquare(2);
                    }}
                val={board[2]}
                />
            </div>
            <div className = "row">
            <Square 
                    chooseSquare={() => {
                        chooseSquare(3);
                    }}
                val={board[3]}
                />
                <Square 
                    chooseSquare={() => {
                        chooseSquare(4);
                    }}
                val={board[4]}
                />
                <Square 
                    chooseSquare={() => {
                        chooseSquare(5);
                    }}
                val={board[5]}
                />
            </div>
            <div className = "row">
            <Square 
                    chooseSquare={() => {
                        chooseSquare(6);
                    }}
                val={board[6]}
                />
                <Square 
                    chooseSquare={() => {
                        chooseSquare(7);
                    }}
                val={board[7]}
                />
                <Square 
                    chooseSquare={() => {
                        chooseSquare(8);
                    }}
                val={board[8]}
                />
            </div>
        </div>
    )
}

export default Board
