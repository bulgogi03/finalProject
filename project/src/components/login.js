import React, { useState } from 'react';
import Axios from "axios";
import Cookies from "universal-cookie";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const cookies = new Cookies();
  const login = () => {
    Axios.post("http://localhost:3001/login", {username, password,}).then(res =>{ //change the route based on server/src/index.js route
      const {firstName, lastName, username, token, userId} = res.data;//set cookies for them
      cookies.set("token", token);
      cookies.set("userId", userId);
      cookies.set("firstName", firstName);
      cookies.set("lastName", lastName);
      cookies.set("username", username);
    });
  };

  return (
    <div className="login">
      <div>Login:</div>
      <input
        placeholder="Username"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <button onClick={login}>Login</button>
    </div>
  );
}


export default Login;
