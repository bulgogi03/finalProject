import React, { useState } from 'react';
import Axios from "axios";
import Cookies from "universal-cookie"

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    console.log('Username:', username);
    console.log('Password:', password);
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
