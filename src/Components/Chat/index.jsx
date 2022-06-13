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
import { selectShowChat } from "../../store/appState/selectors";
import { toggleChat } from "../../store/appState/slice";
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
const showChat = useSelector(selectShowChat);

if (room !== null) {
  console.log(room)
  socket.emit("join_room", room);
}


const setReceiverId = () => {
  if (receiver.id) {
    console.log("RECEIVER: ", receiver)
    return receiver.id;
  } else {
    return messages[messages.length-1].receiverId === user.id ? messages[messages.length-1].authorId : messages[messages.length-1].receiverId
  }
};
//showing name
const setReceiverName = () => {
  if (receiver.name) {
    console.log("RECEIVER: ", receiver)
    return receiver.name;
  } else {
    return messages[messages.length-1].receiverId === user.id ? messages[messages.length-1].authorName : messages[messages.length-1].receiverName
  }
};

const sendMessage = async () => {
  if (sendMessage !==""){
    const messageData = {
      room: room,
      authorId: user.id,
      authorName: user.name,
      receiverId: setReceiverId(),
      receiverName: setReceiverName(),
      message: currentMessage,
      authorImage: user.imageUrl,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    }
    console.log(messageData)

    await socket.emit("send_message", messageData);
    dispatch(sendChatMessage(
      messageData.room,
      messageData.authorId,
      messageData.authorName,
      messageData.receiverId,
      messageData.receiverName,
      messageData.message,
      messageData.time));
    setMessageList((list) => [...list, messageData]);
    setCurrentMessage("");

  }
  };
if (showChat) {
  if (document.getElementById("myForm")){
    document.getElementById("myForm").style.display = "block";
  }
}  else {
  if (document.getElementById("myForm")) {
    document.getElementById("myForm").style.display = "none";
  }
}

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log("HIT")
      setMessageList((list) => [...list, data]);
      });
    dispatch(fetchMessages());
    }, [dispatch]);

  return (
   <div>
    <button className="open-button pixel-borders pixel-borders--2-inset" onClick={() => dispatch(toggleChat())}>Frets Chat</button>
    <div className="chat-popup"  id="myForm">
      <form className="form-container">
        <h1 className="chat-title">Chat <MinimizeIcon style={{ color: "#FF9B49",fontSize:35, float: "right"}} onClick={() => dispatch(toggleChat())}/></h1>
        <div className="chat-body">
        <ScrollToBottom className="message-container">

          {messages && messages.map((messageContent) => {
            return (
              <div className='message-row'>
                {messageContent.authorImage && messageContent.authorId !== user.id ?
                <img src={messageContent.authorImage} width={"80px"} alt={messageContent.authorName}/> : ""}
              <p>{messageContent.authorId !== user.id ? "" : user.name}</p>
              <div className="message" id={messageContent.receiverId !== user.id ? "you" : "other"}>
                <div>
                  <div className="message-meta">
                    <p className= "message-time" id="time">{messageContent.time}</p>
                  </div>

                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                </div>
              </div>
                <p>{messageContent.authorId !== user.id ? messageContent.authorName : ""}</p>
                  {messageContent.authorImage && messageContent.authorId !== user.id ?
                  <img src={messageContent.authorImage} width={"80px"} alt={messageContent.authorName}/> : ""}
              </div>
            );
          })}
          {messageList.map((messageContent) => {

           return (
             <div className='message-row'>
                {messageContent.authorImage && messageContent.authorId === user.id ?
                <img src={messageContent.authorImage} width={"80px"} alt={messageContent.authorName}/> : ""}
              <p>{messageContent.authorId !== user.id ? "" : user.name}</p>

              <div className="message" id={messageContent.receiverId !== user.id ? "you" : "other"} >
                <div>
                <div className="message-meta">
                    <p className= "message-time"id="time">{messageContent.time}</p>
                  </div>

                  <div className="message-content">
                  <p>{messageContent.message}</p>
                  </div>

                </div>
              </div>
                <p>{messageContent.authorId !== user.id ? messageContent.authorName : ""}</p>
                {messageContent.authorImage && messageContent.authorId !== user.id ?
                <img src={messageContent.authorImage} width={"80px"} alt={messageContent.authorName}/> : ""}
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
          setCurrentMessage(event.target.value);}}
          onKeyPress={(event) => { if (event.key === "Enter") { event.preventDefault(); sendMessage(); }}}
          className="chat-input"/>

      <SendIcon style={{ color: "#FF9B49",fontSize:40}} onClick={() => sendMessage()}/>
          <br/>
      </div>
        </form>
      </div>
      </div>
  )

};