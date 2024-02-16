
import axios from "axios";
import { createContext, useContext, useMemo, useState, useEffect } from "react";
import io from "socket.io-client";
const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const [notification, setNotification] = useState([]);
  const [userResponded, setUserResponded] = useState(false);
  const ENDPOINT = "https://chatbot-backend-xk8b.onrender.com/"
  // const ENDPOINT = "http://localhost:8000/";
  const apiUrl = process.env.REACT_APP_API_URL;
  const socket = useMemo(() => {
    console.log("socket connected")
    return io(ENDPOINT)
  }, []);

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("userInfo"));
    const fetchNotification = async () => {
      if (admin) {
        const { data } = await axios.get(`${apiUrl}/api/notification/65cb4811a76b838a8c9ccfd0`);
        const notif = data[0].notification;
        setNotification(notif)
      }
    }
    fetchNotification()
  }, [])
  return (
    <ChatContext.Provider value={{
      user, setUser, selectedChat, setSelectedChat,
      chats, setChats, notification, setNotification, setUserResponded, userResponded, socket
    }}>
      {children}
    </ChatContext.Provider>
  )
}

export const ChatState = () => {
  return useContext(ChatContext);
}
export default ChatProvider;