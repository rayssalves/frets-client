import { io } from "socket.io-client"
import { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import "./style.scss";

//connection
const socket = io.connect("http://localhost:4000", {
  withCredentials: true,
  extraHeaders: {
    "instant-chat-header": "abcd"
  }
});


export default function Chat () {
  //Room State
const [room, setRoom] = useState("");
    // Messages States
const [currentMessage, setCurrentMessage] = useState("");
const [messageList, setMessageList] = useState([]);
  
const joinRoom = () => {
  if (room !== "") {
    socket.emit("join_room", room);
    }
  };

const sendMessage = async () => {
  if (sendMessage !==""){
    const messageData = {
      room: room,
      author: "user",
      message: currentMessage,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
  }
  // socket.emit("send_message", { currentMessage, room });
  await socket.emit("send_message", messageData);
  setMessageList((list) => [...list, messageData]);
  setCurrentMessage("");
}
  };
  
const openForm = () => {
    if (document.getElementById("myForm")){
      document.getElementById("myForm").style.display = "block";
    }
  }

  
const closeForm = () => {
    if (document.getElementById("myForm")) {
      document.getElementById("myForm").style.display = "none";
    }
  }

useEffect(() => {
  socket.on("receive_message", (data) => {
    setMessageList((list) => [...list, data]);
    });
    }, [socket]);

  return (
   <div>
    <button className="open-button pixel-borders pixel-borders--2-inset" onClick={() => openForm()}>Frets Chat</button>
    <div className="chat-popup"  id="myForm">
      <form className="form-container">
        <h1>Chat</h1>
        <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                // id={username === messageContent.author ? "you" : "other"}
                id="you"
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <input
            placeholder="Room Number..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button type="button" onClick={joinRoom()}> Join Room</button>
        <button type="button"className=" send pixel-borders pixel-box--success" onClick={() => sendMessage()}> Send Message</button>
        <button type="button" class="close pixel-borders pixel-box--error" onClick={() => closeForm()}>Close</button>
      </div>
        {/* <input
            placeholder="Room Number..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button type="button" onClick={joinRoom()}> Join Room</button>
          {visualized}
          <textarea
            placeholder="Message..."
            onChange={(event) => {
              setMessage(event.target.value);
            }}
          /> */}
          
          {/* <button type="button"className=" send pixel-borders pixel-box--success" onClick={() => sendMessage()}> Send Message</button>
          <button type="button" class="close pixel-borders pixel-box--error" onClick={() => closeForm()}>Close</button> */}
      
        </form>
      </div>
      </div>


  )

};

{/* <button onClick={() => socket.emit("message", "Hey server I`m here!")}>Hello server</button> */}