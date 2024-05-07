import React, { useState } from 'react';
import Axios from 'axios';
import Cookies from "universal-cookie";
import '../createAcc.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import PasswordVis from './PasswordVis.js';

function CreateAcc({setIsAuth}) {
  const cookies = new Cookies();
  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const createAcc = () => {
    Axios.post("http://localhost:3001/createAccount", user).then(res =>{ //change the route based on server/src/index.js route
      const {token, userId, firstName, lastName, username, hashedPassword} = res.data;//set cookies for them
      cookies.set("token", token);
      cookies.set("userId", userId);
      cookies.set("firstName", firstName);
      cookies.set("lastName", lastName);
      cookies.set("username", username);
      cookies.set("hashedPassword", hashedPassword);//sets the cookies only if the user has account
      setIsAuth(true);
    });//change link depending on what we use
  };
  return (
  <div className = "container2">
    <div className = "title">       {/*title top of container */}
      <div className = "text">Create Account</div>
    </div>
    <div className = "middle1">      {/*middle where the inputs go */}
      <div className = "input">
          {/* <input type="text" class="userinput1" placeholder="Username"></input> */}
          <TextField onChange={(event) =>{setUser({...user, firstName: event.target.value})}} id="outlined-basic" label="First Name" variant="outlined" style={{width: 300}} />
      </div>
      <div className = "input">
          {/* <input type="text" class="userinput" placeholder="Password"></input> */}
          <TextField onChange={(event) =>{setUser({...user, lastName: event.target.value})}} id="outlined-basic" label="Last Name" variant="outlined" style={{width: 300}} />
      </div>
      <div className = "input">
          {/* <input type="text" class="userinput" placeholder="Password"></input> */}
          <TextField onChange={(event) =>{setUser({...user, username: event.target.value})}} id="outlined-basic" label="Userame" variant="outlined" style={{width: 300}} />
      </div>
      <div className = "input">
          {/* <input type="text" class="userinput" placeholder="Password"></input> */}
          <TextField 
            onChange={(event) =>{setUser({...user, password: event.target.value})}} 
            id="outlined-basic" 
            label="Password" 
            type={showPassword ? 'text' : 'password'} 
            variant="outlined" 
            style={{width: 300}} 
            InputProps={{
              endAdornment: (
                <PasswordVis
                  showPassword={showPassword}
                  handleClickShowPassword={handleClickShowPassword}
                  handleMouseDownPassword={handleMouseDownPassword}
                />
              )
            }}/>
      </div>
      <div className = "inputButton">
          <Button onClick={createAcc} variant="contained">Create</Button>
      </div>
    </div>
  </div>
  )
}

export default CreateAcc;