import React, { useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Header from '../../components/header/Header'
import { useNavigate } from 'react-router-dom';
import ChatBox from '../../components/chatBox/ChatBox';
import MyChats from '../../components/myChats/MyChats';
import { ChakraProvider, Menu, MenuButton, MenuList } from '@chakra-ui/react'
import { ChatState } from '../../context/ChatProvider';

const Chat = () => {
  const navigate = useNavigate();
  const [fetchAgain, setFetchAgain] = useState(false);
  const { setSelectedChat, notification, setNotification } =
    ChatState();
  return (
    <ChakraProvider>
      <div className='chatUi'>
        <Header type="logout" />
        <div className="chatBackBtn" style={{ paddingTop: "100px", marginLeft: "20px" }}>
          <ArrowBackIcon onClick={() => navigate("/")} />
        </div>


        <div
          style={{
            display: "flex", justifyContent: "space-between",
            height: "82.5vh",
            padding: "10p"
          }}
        >
          <MyChats fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        </div>
      </div >
    </ChakraProvider>
  )
}

export default Chat