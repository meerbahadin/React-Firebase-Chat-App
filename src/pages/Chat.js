import React, { Component, useState, useEffect, Fragment } from "react";
import { auth } from "../services/firebase";
import { db } from "../services/firebase";

const Chat = () => {
  const [state, setState] = useState({
    user: auth().currentUser,
    chats: [],
    body: "",
    readError: null,
    writeError: null,
  });
  useEffect(() => {
    console.log(process.env.REACT_APP_KEY)
    setState({ ...state , readError: null });
    try {
      db.ref("chats").on("value", (snapshot) => {
        let chats = [];
        snapshot.forEach((snap) => {
          chats.push(snap.val());
        });
        setState({  ...state , chats : chats });
      });
    } catch (error) {
      setState({  ...state , readError: error.message });
    }
  }, []);

  const handleChange = (e) => {
    setState({ ...state, body: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ ...state , writeError: null });
    try {
      await db.ref("chats").push({
        body: state.body,
        timestamp: Date.now(),
        uid: state.user.uid
      });
    } catch (error) {
      setState({ ...state ,  writeError: error.message });
    }
  }

  const formatTime = (timestamp) => {
    const d = new Date(timestamp);
    const time = `${d.getDate()}/${(d.getMonth()+1)}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
    return time;
  }
  return (
    <div>
      <div className="chats" style={{
            'margin':'5px',
            'padding':'5px',
            'backgroundColor': 'white',
            'width': '100%',
            'maxHeight': '400px',
            'overflow': 'auto',
            'textAlign':'justify' 
      }}>
        {state.chats.map((chat) => {
          return (
              <div className={"card w-50 mb-3 chat-area rounded " + (state.user.uid === chat.uid ? "bg-success text-white ml-auto" : "")} key={chat.timestamp}>
              <div className='card-body p-2'>
              {chat.body}
              </div>
             <small className='p-2'> {formatTime(chat.timestamp)}</small>
              </div>
          );
        })}
      </div>
      <form onSubmit={handleSubmit} className='form'>
        <div className='form-group'>
        <textarea onChange={handleChange}  value={state.body} type="text" class="form-control" placeholder='Enter Your Message'></textarea>
        </div>
        <button type="submit" className='btn btn-primary btn-block'>Send</button>
      </form>
    </div>
  );
};

export default Chat;
