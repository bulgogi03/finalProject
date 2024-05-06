import '../login.css';
import React, { useState } from 'react';
import Axios from "axios";
import Cookies from "universal-cookie";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function Login({setIsAuth}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const cookies = new Cookies();
  const login = () => {
    Axios.post("http://localhost:3001/login", {username, password}).then(res => {//sets the cookies for user when they login
      const { firstName, lastName, username, token, userId } = res.data;
      console.log("Received Data:", res.data);
      cookies.set("token", token, { path: "/" });
      cookies.set("userId", userId, { path: "/" });
      cookies.set("firstName", firstName, { path: "/" });
      cookies.set("lastName", lastName, { path: "/" });
      cookies.set("username", username, { path: "/" });
      console.log("Cookies:", cookies.getAll());
      setIsAuth(true);
    }).catch(error => {
      if (error.response.status === 401) {
          console.error("Incorrect username or password"); // Updated error message
      } else {
          console.error("An error occurred:", error.message);
      }
    });
  };

  return (
    <div className = "container">
        <div className = "title">       {/*title top of container */}
            <div className = "text">Login</div>
        </div>
        <div className = "middle">      {/*middle where the inputs go */}
            <div className = "input">
                {/* <input type="text" class="userinput1" placeholder="Username"></input> */}
                <TextField onChange={(event) => {setUsername(event.target.value);}} id="outlined-basic" label="Username" variant="outlined" style={{width: 300}} />
            </div>
            <div className = "input">
                {/* <input type="text" class="userinput" placeholder="Password"></input> */}
                <TextField onChange={(event) => {setPassword(event.target.value);}} id="outlined-basic" label="Password" variant="outlined" style={{width: 300}} />
            </div>
            <div className = "inputButton">
              <Button variant="container" onClick={login} >Login</Button>
            </div>
        </div>
    </div>
  );
}


export default Login;