import express from "express";
import cors from "cors";
import {v4 as uuidv4} from "uuid"; //importing version 4 this helps to give users unique id
import bcrypt from "bcrypt";
import {StreamChat} from "stream-chat";
const app = express();

app.use(cors());
app.use(express.json());//be able to accept json from frontend
const api_key = "qud777xuvfy9";//you get it from getstream.io
const api_secret = "7kkpxfep64gfwxwy9qg4nj9gtqxyagzkytjq7v3zhu4pbumxxjxq8rjduc8hem3x"; //dont have this publicly on github
const serverClient = StreamChat.getInstance(api_key, api_secret);//connects a user and creates an account in our stream server

app.post("/createAccount", async (req, res) => {//a route in express
    try{//in case errors occur
        const {firstName, lastName, username, password} = req.body //requesting those pieces of info
        const userId = uuidv4(); //gives users unique ids that are completely random
        const hashedPassword = await bcrypt.hash(password, 10); //adds salt into the password then hashes it
        const token = serverClient.createToken(userId);//creates a token that will identify the user
        res.json({token, userId, firstName, lastName, username, hashedPassword});
    }
    catch (error){
        res.json(error);
    }
});//this creates an account in stream
app.post("/login");

app.listen(3001, ()=> {
    console.log("server is running on 3001");
});
