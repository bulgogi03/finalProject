import React, { useState } from 'react';
import Axios from 'axios';
import Cookies from "universal-cookie";

function CreateAcc() {
  const cookies = new Cookies();
  const [user, setUser] = useState(null);
  const createAcc = () => {
    Axios.post("http://localhost:3001/createAccount", user).then(res =>{ //change the route based on server/src/index.js route
      const {token, userId, firstName, lastName, username, hashedPassword} = res.data;//set cookies for them
      cookies.set("token", token);
      cookies.set("userId", userId);
      cookies.set("firstName", firstName);
      cookies.set("lastName", lastName);
      cookies.set("username", username);
      cookies.set("hashedPassword", hashedPassword);//sets the cookies only if the user has account
    });//change link depending on what we use
  };
  return (
    <div className="createAcc">
      <div>Create Account:</div>
        <input placeholder="First Name" 
        onChange={(event) =>{
          setUser({...user, firstName: event.target.value})  //...user --> keeps everything else the same but the firstname
          //its going to constantly update the first name in the user object to whatever is typed
        }}/>
        <input placeholder="Last Name" 
        onChange={(event) =>{
          setUser({...user, lastName: event.target.value})
        }}/>
        <input placeholder="Username" 
        onChange={(event) =>{
          setUser({...user, username: event.target.value})
        }}/>
        <input placeholder="Password" 
        type = "password"
        onChange={(event) =>{
          setUser({...user, password: event.target.value})
        }}/>
        <button onClick={createAcc}> Create Account</button>
    </div>
  )
}

export default CreateAcc;
