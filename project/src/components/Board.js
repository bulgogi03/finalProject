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
    const [restartX, setRestartX] = useState(false);
    const [restartO, setRestartO] = useState(false);

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
        ["X", "O"].forEach((player) => { // Iterate over both players "X" and "O"
            Patterns.forEach((currPattern) => {
                const firstPlayer = board[currPattern[0]];
                if (firstPlayer === "") return;
                let foundWinningPattern = true;
                currPattern.forEach((idx) => {
                    if (board[idx] !== firstPlayer) {
                        foundWinningPattern = false;
                    }
                });
                if (foundWinningPattern && firstPlayer === player) { // Check if the winning pattern belongs to the current player
                    alert("Winner: " + player);
                    setResult({ winner: player, state: "won" });
                    setGameEnded(true); // Game ended, prevent further moves
                }
            });
        });
    }


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
    
    const handleRestart = () => {
        setBoard(["", "", "", "", "", "", "", "", ""]);
        setPlayer(turn);
        setGameEnded(false);
        setRestartX(false);
        setRestartO(false);
        if (player === 'X') {
            window.alert('Player O needs to click restart to play again.');
        } else {
            window.alert('Player X needs to click restart to play again.');
        }
    };
    

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
            {player === 'X' && !gameEnded && (
                <button onClick={handleRestart} disabled={restartX}>
                    Restart (X)
                </button>
            )}
            {player === 'O' && !gameEnded && (
                <button onClick={handleRestart} disabled={restartO}>
                    Restart (O)
                </button>
            )}
        </div>
    )
}

export default Board
