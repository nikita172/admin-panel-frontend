import React, { useEffect, useState } from 'react'
import "./home.css";
import Header from "../../components/header/Header"
import MainView from '../../components/mainView/MainView';
import Categories from '../../components/categories/Categories';
import AddProduct from '../../components/addProduct/AddProduct';
import { Alert, AlertDescription, AlertIcon, AlertTitle, ChakraProvider, Container, Box, Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import ReactLoading from "react-loading"
import { ChatState } from '../../context/ChatProvider';
const Home = () => {

  const [toggleModal, setToggleModal] = useState(false);
  const [isProductAdd, setIsProductAdd] = useState(false);
  const [loading, setLoading] = useState(true)
  const { userResponded, setUserResponded } = ChatState();
  const navigate = useNavigate();
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userInfo'));
    if (!userData) {
      setLoading(true);
      navigate("/login")
    }
    setLoading(false);
  }, [])

  const enableNotifsAndClose = () => {
    setUserResponded(true);
  }
  return (
    <div className='homeContainer'>
      {!userResponded &&
        <div className='alertBox'>
          <ChakraProvider>
            <Container>
              <Alert status="success" display={"flex"}
                justifyContent={'space-between'}>
                <Box display={"flex"}>
                  <AlertIcon />
                  <Box>
                    <AlertTitle>Notifications</AlertTitle>
                    <AlertDescription>
                      Please enable notifications.
                    </AlertDescription>
                  </Box>
                </Box>
                <Button colorSchema="teal" size="sm"
                  onClick={enableNotifsAndClose}>Sure!</Button>
              </Alert>
            </Container>
          </ChakraProvider>
        </div>
      }
      <Header type="logout" />
      {loading ?
        <div className="loadingComponent">
          <ReactLoading type="bubbles" color='blue' height={100} width={100} />
        </div>
        :
        <div className="mainView">
          <Categories
            setToggleModal={setToggleModal}
            toggleModal={toggleModal} />
          <MainView isProductAdd={isProductAdd} type="allCategory" />
          <AddProduct
            toggleModal={toggleModal} setToggleModal={setToggleModal}
            setIsProductAdd={setIsProductAdd}
            isProductAdd={isProductAdd} />
        </div>
      }
    </div>
  )
}

export default Home