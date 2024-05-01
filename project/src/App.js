import './App.css';
import CreateAcc from './components/createAcc.js';
import Login from './components/login.js';
import {StreamChat} from "stream-chat";
import Cookies from "universal-cookie";

function App() {
  const api_key = "qud777xuvfy9";//got from the backend
  const cookies = new Cookies();
  const token = cookies.get("token");//if we can get it it means user logged in
  const client = StreamChat.getInstance(api_key);

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
      console.log(user);
    })//connects user with their account
  }
  return (
    <div className="App">
      <CreateAcc />
      <Login />
    </div>
  );
}

export default App;
