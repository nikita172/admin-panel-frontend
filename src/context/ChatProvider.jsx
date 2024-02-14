
import { createContext, useContext, useMemo, useState } from "react";
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
  const socket = useMemo(() => {
    console.log("socket connected")
    return io(ENDPOINT)
  }, []);
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