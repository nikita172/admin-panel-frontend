import React from 'react'
import "./header.css"
import { Link } from "react-router-dom"
import { BellIcon } from "@chakra-ui/icons";
import { Box, ChakraProvider } from "@chakra-ui/react";
export default function Header({ type, notification }) {
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
                <BellIcon fontSize="4xl" marginRight={10} />
              </Link>
              <Link to="/login" >
                <button onClick={logoutHandler} className='registerBtn' > {type} ?</button>
              </Link>
            </Box>
        }
      </div>
    </ChakraProvider>
  )
}
