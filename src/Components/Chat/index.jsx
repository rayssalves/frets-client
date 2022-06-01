import { io } from "socket.io-client"
import { useEffect, useState } from "react";

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
const [message, setMessage] = useState("");
const [visualized,  setMessageReceived] = useState("");
  
const joinRoom = () => {
  if (room !== "") {
    socket.emit("join_room", room);
    }
  };

const sendMessage = () => {
  socket.emit("send_message", { message, room });
  };
  
useEffect(() => {
  socket.on("receive_message", (data) => {
    setMessageReceived(data.message);
    });
    }, [socket]);


  return (
    <div className="chat">
     <input
        placeholder="Room Number..."
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}> Join Room</button>
      <input
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}> Send Message</button>
      <h1> Message:</h1>
      {visualized}
    </div>
  )
};



{/* <button onClick={() => socket.emit("message", "Hey server I`m here!")}>Hello server</button> */}