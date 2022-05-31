import { io } from "socket.io-client"

export default function Chat  () {

const socket = io("http://localhost:4000", {
  withCredentials: true,
  extraHeaders: {
    "instant-chat-header": "abcd"
  }
});

  socket.on("connect", () => {
    console.log(socket.id); 
  });

  return <div>Hello world</div>;
};


