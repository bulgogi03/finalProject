import React from 'react'
import './Login.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


const SignUp = () => {
    return (
        <div className = "container">
            <div className = "title">       {/*title top of container */}
                <div className = "text">Login</div>
            </div>
            <div className = "middle">      {/*middle where the inputs go */}
                <div className = "input">
                    {/* <input type="text" class="userinput1" placeholder="Username"></input> */}
                    <TextField id="outlined-basic" label="Username" variant="outlined" style={{width: 300}} />
                </div>
                <div className = "input">
                    {/* <input type="text" class="userinput" placeholder="Password"></input> */}
                    <TextField id="outlined-basic" label="Password" variant="outlined" style={{width: 300}} />
                </div>
                <div className = "inputButton">
                    <Button variant="container" href="Login.js">Sign Up</Button>
                    <Button variant="container" href="Login.js">Login</Button>
                </div>
            </div>
        </div>
    )
}

export default SignUp