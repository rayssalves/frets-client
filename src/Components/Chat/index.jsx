import { io } from "socket.io-client"
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ScrollToBottom from "react-scroll-to-bottom";
import { selectRoom, selectReceiver, selectMessages} from "../../store/chat/selectors";
import { selectUser } from "../../store/user/selectors";
import { sendChatMessage } from "../../store/chat/actions";
import { fetchMessages } from "../../store/chat/thunk";
import SendIcon from '@mui/icons-material/Send';
import MinimizeIcon from '@mui/icons-material/Minimize';
import "./style.scss";

//connection
const socket = io.connect("http://localhost:4000", {
  withCredentials: true,
  extraHeaders: {
    "instant-chat-header": "abcd"
  }
});

export default function Chat (userId) {
    // Messages States
const [currentMessage, setCurrentMessage] = useState("");
const [messageList, setMessageList] = useState([]);
const dispatch = useDispatch();

const room = useSelector(selectRoom);
const receiver = useSelector(selectReceiver);
const user = useSelector(selectUser);
const messages = useSelector(selectMessages);

if (room !== null) {
  console.log(room)
  socket.emit("join_room", room);
}

const setReceiver = () => {
  if (receiver) {
    return receiver;
  } else {
    return messages[messages.length-1].receiver === user.id ? messages[messages.length-1].author : messages[messages.length-1].receiver
  }
};

const sendMessage = async () => {
  if (sendMessage !==""){
    const messageData = {
      room: room,
      author: user.id,
      receiver: setReceiver(),
      message: currentMessage,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    } 
    console.log(messageData)
  // socket.emit("send_message", { currentMessage, room });
    await socket.emit("send_message", messageData);
    dispatch(sendChatMessage(messageData.room, messageData.author, messageData.receiver, messageData.message, messageData.time));
    setMessageList((list) => [...list, messageData]);
    setCurrentMessage("");

    // setMessageList([...messageList, messageData]);
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

  

// useEffect(() => {
//   socket.on("receive_message", (data) => {
//     setMessageList((list) => [...list, data]);
//     });
//     }, [socket]);
  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log("HIT")
      setMessageList((list) => [...list, data]);
      });
    dispatch(fetchMessages());
    }, [dispatch]);

  return (
   <div>
    <button className="open-button pixel-borders pixel-borders--2-inset" onClick={() => openForm()}>Frets Chat</button>
    <div className="chat-popup"  id="myForm">
      <form className="form-container">
        <h1 className="chat-title">Chat  <MinimizeIcon style={{ color: "#FF9B49",fontSize:35, float: "right"}} onClick={() => closeForm()}/></h1>
        <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messages && messages.map((messageContent) => {
            return (
              <div
                className="message"
                id={messageContent.receiver !== user.id ? "you" : "other"}
              >
                <div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                  </div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                </div>
              </div>
            );
          })}
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={messageContent.receiver !== user.id ? "you" : "other"}
              >
                <div>
                <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                  </div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
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
            if (event.key === "Enter") {
              event.preventDefault();
              sendMessage();
            }
          }}
          className="chat-input"
        />

      <SendIcon style={{ color: "#FF9B49",fontSize:40}} onClick={() => sendMessage()}/>
      <br/>
      </div>
        </form>
      </div>
      </div>


  )

};

