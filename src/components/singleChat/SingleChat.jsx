// import "./styles.css";
import { IconButton, Spinner, useToast, Box, Text, FormControl, Input } from "@chakra-ui/react";
import { getSender, getSenderFull } from "../../config/ChatLogic";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowBackIcon } from "@chakra-ui/icons";
import ProfileModal from "../profileModal/ProfileModal";
import { ChatState } from "../../context/ChatProvider";
import ScrollableChat from "../scrollableChat/ScrollableChat";
import io from "socket.io-client";
const apiUrl = process.env.REACT_APP_API_URL;
const ENDPOINT = "https://chatbot-backend-xk8b.onrender.com/"
// const ENDPOINT = "http://localhost:8000/";

var socket, selectedChatCompare;
import sound from "../../assets/sound.wav";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  const { selectedChat, setSelectedChat, notification, setNotification } =
    ChatState();
  const userData = JSON.parse(localStorage.getItem('userInfo'));
  function play() {
    new Audio(sound).play();
  }
  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/message/${selectedChat._id}`
      );
      setMessages(data);
      setLoading(false);
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      try {
        setNewMessage("");
        const { data } = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/message`,
          {
            content: newMessage,
            chatId: selectedChat,
            userId: userData
          }
        );
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        console.log(error)
      }
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.on("connected", () => setSocketConnected(true));
  }, []);


  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message received", (newMessageRecieved) => {
      console.log(newMessageRecieved);
      setFetchAgain(!fetchAgain)
      if (!selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notification.includes(newMessageRecieved)) {
          play();
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
        }

      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  };
  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {
              <>
                {getSender(userData, selectedChat.users)}
                <ProfileModal
                  user={getSenderFull(userData, selectedChat.users)}
                />
              </>
            }
          </Text>
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}
            <FormControl
              onKeyDown={sendMessage}
              id="first-name"
              isRequired
              mt={3}
            >
              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message.."
                value={newMessage}
                onChange={typingHandler}
                autoComplete="off"
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box display="flex" alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;