import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text, useToast, Button } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
// import GroupChatModal from "./miscellaneous/GroupChatModal";
import { ChatState } from "../../context/ChatProvider";
import { getSender } from "../../config/ChatLogic";
import io from "socket.io-client";
const ENDPOINT = "https://chatbot-backend-xk8b.onrender.com/"
// const ENDPOINT = "http://localhost:8000/";

var socket, selectedChatCompare;

const MyChats = ({ fetchAgain, setFetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  var userId;

  userId = JSON.parse(localStorage.getItem("userInfo"));

  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const toast = useToast();
  const fetchChats = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/chat/${userId}`);
      // console.log(data)
      setChats(data);
    } catch (error) {
      console.log(error)
      toast({
        title: "Error occurred!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("adminInfo")));
    fetchChats();
  }, [fetchAgain]);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.on("connected", () => {
      console.log("connected")
    })
  }, []);


  useEffect(() => {
    socket.on("new chat received", (chat) => {
      console.log("new chat received emitter")
      setFetchAgain(!fetchAgain)
    })
  })
  console.log(chats)
  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
      </Box>
      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Text>
                  {getSender(userId, chat.users)}
                </Text>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;