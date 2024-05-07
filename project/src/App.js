import './App.css';
import React, { useState } from 'react';
import CreateAcc from './components/createAcc.js';
import Login from './components/login.js';
import {StreamChat} from "stream-chat";
import Cookies from "universal-cookie";
import JoinGame from './components/JoinGame';
import {Chat} from "stream-chat-react";
import Button from '@mui/material/Button';

function App() {
  const api_key = "qud777xuvfy9";//got from the backend
  const cookies = new Cookies();
  const token = cookies.get("token");//if we can get it it means user logged in
  const client = StreamChat.getInstance(api_key);
  const [isAuth, setIsAuth] = useState(false);

  const logOut = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("hashedPassword");
    cookies.remove("channelName");
    cookies.remove("username");
    client.disconnectUser();//this would fully guarantee the user is logged out
    setIsAuth(false);
  }; //for logout we can just remove the cookies as we define the user is logged in if the cookies are there

  if(token){//checks if user is logged in
    client.connectUser({
      id: cookies.get("userId"),
      name: cookies.get("username"),
      firstName: cookies.get("firstName"),
      lastName: cookies.get("lastName"),
      hashedPassword: cookies.get("hashedPassword")
    },
    token
    ).then((user)=>{
      setIsAuth(true);//sets auth to true to show user is logged in
    })//connects user with their account
  }
  return (
    <div>
      <div className="App">
        {isAuth ? (//checks the user if they are logged in
          <Chat client={client}> 
            <JoinGame />
            <Button onClick={logOut} variant="contained">Log Out</Button>
          </Chat> 
        ) :  (//if false then it runs these two things login and createAcc
          <>
            <CreateAcc setIsAuth={setIsAuth}/>
            <Login setIsAuth={setIsAuth}/>
         </>
        )}
      </div>
    </div>
  );
}

export default App;
