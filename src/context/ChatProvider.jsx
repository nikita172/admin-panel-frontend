
import { createContext, useContext, useEffect, useState } from "react";
const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const [notification, setNotification] = useState([]);
  const [userResponded, setUserResponded] = useState(false)
  return (
    <ChatContext.Provider value={{
      user, setUser, selectedChat, setSelectedChat,
      chats, setChats, notification, setNotification, setUserResponded, userResponded
    }}>
      {children}
    </ChatContext.Provider>
  )

}

export const ChatState = () => {
  return useContext(ChatContext);
}
export default ChatProvider;