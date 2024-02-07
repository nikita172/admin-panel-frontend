import React, { useRef, useState } from 'react'
import ReactLoading from "react-loading";
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import "./login.css"
import ErrorMsg from '../../components/errorMsg/ErrorMsg';
import Header from '../../components/header/Header';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
export default function Login() {
  const username = useRef();
  const password = useRef();
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const handleClick = async (e) => {
    setIsFetching(true)
    e.preventDefault()
    const user = {
      username: username.current.value,
      password: password.current.value
    }
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/admin/login`, user)
      if (!res.data.status) {
        setIsError(true)
        setTimeout(() => {
          setIsError(false)
        }, 2000)
      }
      else {
        localStorage.setItem('userInfo', JSON.stringify(res.data.user._id))
        navigate("/")
      }
      setError(res.data.message)
    }
    catch (err) {
      console.log(err)
    }
    setIsFetching(false)
  }
  return (
    <div className='loginSection'>
      <Header type="Wanna Register" />
      <section id="loginContainer">
        <div className="loginContainerLeft">
          <form id="loginForm" onSubmit={handleClick}>
            <h2 className='loginHeading'>Login</h2>
            <div className="inputGroup inputEmail">
              <PersonIcon className='icons' />
              <input type="text" name="username" required placeholder="Username" ref={username} />
            </div>
            <div className="inputGroup inputPassword">
              <LockIcon className='icons' />
              <input type="password" required name="password" placeholder="Password" ref={password} />
            </div>
            <div className="buttonGroup">
              <button type="submit" className="primary" id="loginBtn" disabled={isFetching}>
                {isFetching ? <ReactLoading type="bubbles" color="#fff" className='reactloading'
                  height={20} width={50} /> : "LogIn"}
              </button>
            </div>
          </form>
        </div>
        <div className="loginContainerRight">
          <img className='rightImg' src="https://prgc.edu.in/admin/assets/images/error/login-img.jpg" />
        </div>
        {isError ? <ErrorMsg error={error} /> : null}
      </section>
    </div>
  )
}
