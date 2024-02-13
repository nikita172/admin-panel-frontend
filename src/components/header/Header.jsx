import React, { useEffect, useState } from 'react'
import "./header.css"
import { Link, useNavigate } from "react-router-dom"
import { ChatIcon } from "@chakra-ui/icons";
import { Box, ChakraProvider, MenuItem } from "@chakra-ui/react";
import { ChatState } from '../../context/ChatProvider';
import { Menu, MenuButton, MenuList } from '@chakra-ui/react'
import { BellIcon } from "@chakra-ui/icons"
import { getSender } from '../../config/ChatLogic';
import io from "socket.io-client";
import sound from "../../assets/sound.wav";
import { useToast } from '@chakra-ui/react'
import { notifyUser } from '../../notifyUser';
const ENDPOINT = "https://chatbot-backend-xk8b.onrender.com/"
// const ENDPOINT = "http://localhost:8000/";
var socket;

export default function Header({ type }) {
  const userData = JSON.parse(localStorage.getItem('userInfo'));
  const { selectedChat, setSelectedChat, notification, setNotification } = ChatState();
  const toast = useToast();
  const navigate = useNavigate();
  const [notifMsg, setNotifMsg] = useState("");
  const [msgId, setMsgId] = useState("");

  function play() {
    new Audio(sound).play();
  }



  const logoutHandler = () => {
    localStorage.clear();
  }


  useEffect(() => {
    socket = io(ENDPOINT);
    socket.on("connected", () => console.log("Connected"));
  }, []);

  useEffect(() => {
    socket.on("notification received", (newMsg) => {
      setMsgId(newMsg._id);
      const msg = "new message from " + newMsg.sender.username;
      setNotifMsg(msg)

      if (!notification.includes(newMsg)) {
        // notifyUser(notifMsg)
        play();

        setNotification([newMsg, ...notification]);
      }
    })
  })
  console.log(notification)


  useEffect(() => {
    if (notifMsg) {
      toast({
        title: notifMsg,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top right"
      });
    }
  }, [msgId])

  return (
    <ChakraProvider>
      <div className="header">
        <img className="headerLogo" src="https://static.vecteezy.com/system/resources/previews/005/076/592/original/hacker-mascot-for-sports-and-esports-logo-free-vector.jpg" />
        {type == "Wanna Login" ?
          <Link to="/login" >
            <button className='registerBtn' > {type} ?</button>
          </Link>
          : type == "Wanna Register" ?
            // <Link to="/register" >
            <button className='registerBtn' > {type} ?</button>
            // </Link>
            :
            <Box>
              <Link to="/chats">
                <ChatIcon fontSize="2xl" marginRight={5} />
              </Link>
              <Menu >
                <MenuButton p={1} marginRight={5} position={"relative"}>
                  <div style={{
                    position: "absolute", color: "white", right: "5px", fontWeight: "bold", top: "0px", fontSize: "15px", backgroundColor: "red", borderRadius: "50%", padding: "0px 4px",
                    display: "flex", alignItems: "center", justifyContent: "center"
                  }}>{notification.length > 0 && notification.length}</div>
                  {/* <NotificationBadge
                    count={notification.length}
                    effect={Effect.SCALE}
                  /> */}
                  <BellIcon fontSize="3xl" m={1} />
                </MenuButton>
                <MenuList pl={2}>
                  {!notification.length && "No New Messages"}
                  {notification.map((notif) => (
                    <MenuItem
                      key={notif._id}
                      onClick={() => {
                        setSelectedChat(notif.chat);
                        setNotification(notification.filter((n) => n !== notif));
                        navigate("/chats")
                      }}
                    >
                      {notif.chat.isGroupChat
                        ? `New Message in ${notif.chat.chatName}`
                        : `New Message from ${getSender(userData, notif.chat.users)}`}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
              <Link to="/login" >
                <button onClick={logoutHandler} className='registerBtn' > {type} ?</button>
              </Link>
            </Box>
        }
      </div>
    </ChakraProvider>
  )
}
