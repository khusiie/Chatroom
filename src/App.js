import React, { useState, useRef} from "react";
import Auth  from '../../client/src/components/Auth/Auth'; 
import Chat from '../../client/src/components/Chat/Chat'; 
import './App.css'
import Cookies from "universal-cookie";
import { signOut } from "firebase/auth";
import {auth} from "./firebase-config";
const cookies = new Cookies();

function App () {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);

  const signUserOut =async()=>{
   await signOut(auth)
   cookies.remove("auth-token")
   setIsAuth(false);
   setRoom(null);
  };
  
  const roomInputRef = useRef(null);
  if (!isAuth) {
    return (
      <div>
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
 }

  return (
    <>
      {room ? (
        <div><Chat room ={room}/></div>
      ) : (
        <div className="room">
          <label> Enter Room Name:</label>
          <input ref={roomInputRef}/>
          <button onClick={() => setRoom(roomInputRef.current.value)}>Enter chat</button>
        </div>
      )}

      <div className="sign-out"> 
        <button onClick ={ signUserOut }> Sign out </button>
      </div>
    </>
  );
}

export default App;
