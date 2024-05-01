import React, { useState } from 'react';
import Axios from "axios";
import Cookies from "universal-cookie";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const cookies = new Cookies();
  const login = () => {
    Axios.post("http://localhost:3001/login", {username, password}).then(res => {
      const { firstName, lastName, username, token, userId } = res.data;
      console.log("Received Data:", res.data);
      cookies.set("token", token, { path: "/" });
      cookies.set("userId", userId, { path: "/" });
      cookies.set("firstName", firstName, { path: "/" });
      cookies.set("lastName", lastName, { path: "/" });
      cookies.set("username", username, { path: "/" });
      console.log("Cookies:", cookies.getAll());
    }).catch(error => {
      if (error.response.status === 401) {
          console.error("Incorrect username or password"); // Updated error message
      } else {
          console.error("An error occurred:", error.message);
      }
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
