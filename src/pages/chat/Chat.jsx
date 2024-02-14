import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Header from '../../components/header/Header'
import { useNavigate } from 'react-router-dom';
import ChatBox from '../../components/chatBox/ChatBox';
import MyChats from '../../components/myChats/MyChats';
import { ChakraProvider } from '@chakra-ui/react'

const Chat = () => {
  const navigate = useNavigate();
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
          <MyChats />
          <ChatBox />
        </div>
      </div >
    </ChakraProvider>
  )
}

export default Chat