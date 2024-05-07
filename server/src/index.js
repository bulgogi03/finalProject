import express from "express";
import cors from "cors";
import {v4 as uuidv4} from "uuid"; //importing version 4 this helps to give users unique id
import bcrypt from "bcrypt";
import {StreamChat} from "stream-chat";
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());//be able to accept json from frontend
const api_key = process.env.API_KEY;
const api_secret = process.env.API_SECRET;
const serverClient = StreamChat.getInstance(api_key, api_secret);//connects a user and creates an account in our stream server

app.post("/createAccount", async (req, res) => {//a route in express
    try{//in case errors occur
        const {firstName, lastName, username, password} = req.body //requesting those pieces of info
        const userId = uuidv4(); //gives users unique ids that are completely random
        const hashedPassword = await bcrypt.hash(password, 10); //adds salt into the password then hashes it
        const token = serverClient.createToken(userId);//creates a token that will identify the user
        console.log("Response Data:", {token, userId, firstName, lastName, username, hashedPassword});

        res.json({token, userId, firstName, lastName, username, hashedPassword});
    }
    catch (error){
        res.json(error);
    }
});//this creates an account in stream
app.post("/login", async (req, res) => {
    try{
        const {username, password} = req.body;
        const {users} = await serverClient.queryUsers({name: username});
        if(users.length ===0) return res.json({message: "User not found"});
        const token = serverClient.createToken(users[0].id);
        const passwordMatch = await bcrypt.compare(password, users[0].hashedPassword);
        if(passwordMatch){//checks if they match and if they do create the cookies
            res.json({
                token,
                firstName: users[0].firstName,
                lastName: users[0].lastName,
                username,
                userId: users[0].id,
            });
        }
        else {
            res.status(401).json({ message: "Incorrect password" }); // Password does not match
        }
    }
    catch (error) {
        res.json(error);
    }
});

app.listen(3001, ()=> {
    console.log("server is running on 3001");
});
