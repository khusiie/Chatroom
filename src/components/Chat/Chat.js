import React, { useState, useEffect } from "react";
import './Chat.css';

import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db, auth } from "../../firebase-config";
import { useAuthState } from 'react-firebase-hooks/auth';

const Chat = ({ room }) => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [user] = useAuthState(auth); 
  const [hasReadMessages, setHasReadMessages] = useState(false); 
  const messageRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(
      messageRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
      setHasReadMessages(true); 
    });

   
    return () => unsubscribe();
  }, [room]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user && hasReadMessages) {
   
        messages.forEach(async (message) => {
          await deleteDoc(doc(db, "messages", message.id));
        });
      }
    });


    return () => unsubscribe();
  }, [hasReadMessages, messages]);

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

  
    if (!user) {
      console.error("User is not authenticated");
      return;
    }

    try {
      await addDoc(messageRef, {
        text: newMessage,
        createdAt: serverTimestamp(),
        user: user.displayName, 
        room,
      });
      setNewMessage("");
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  };

  return (
    <div className="chat-app">
      <div className="header">
        <h1>Welcome To Room : {room}</h1>
      </div>
      <div className="messages">
        {messages.map((message) => (
          <div className="message" key={message.id}>
            <span className="user">{message.user}:</span> {message.text}
          </div>
        ))}
      </div> 
      
      <form onSubmit={handleSubmit} className="new-message-form">
        <input
          className="new-message-input"
          placeholder="Type your message here..."
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    

    </div>
  );
};

export default Chat;
