import { Box } from "@chakra-ui/react";
import SingleChat from "../singleChat/SingleChat";
import { ChatState } from "../../context/ChatProvider";
import { useState } from "react";

const Chatbox = () => {
  const { selectedChat } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);
  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default Chatbox;