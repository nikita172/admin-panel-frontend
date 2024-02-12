import React from 'react'
import "./header.css"
import { Link } from "react-router-dom"
import { ChatIcon } from "@chakra-ui/icons";
import { Box, ChakraProvider, MenuItem } from "@chakra-ui/react";
import { ChatState } from '../../context/ChatProvider';
import { Menu, MenuButton, MenuList } from '@chakra-ui/react'
import { BellIcon } from "@chakra-ui/icons"
import NotificationBadge from "react-notification-badge";
import { Effect, } from "react-notification-badge"
import { getSender } from '../../config/ChatLogic';
export default function Header({ type }) {
  const userData = JSON.parse(localStorage.getItem('userInfo'));
  const { selectedChat, setSelectedChat, notification, setNotification } = ChatState();

  const logoutHandler = () => {
    localStorage.clear();
  }


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
                <MenuButton p={1} marginRight={5}>
                  <NotificationBadge
                    count={notification.length}
                    effect={Effect.SCALE}
                  />
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
