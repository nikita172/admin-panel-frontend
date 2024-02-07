import React from 'react'
import "./categories.css";
import { useNavigate } from 'react-router-dom';
const Categories = ({ setToggleModal }) => {
  const navigate = useNavigate();
  return (
    <div className='categoryContainer'>
      <div className="categoryLeft">
        <span onClick={() => { navigate("/products/Shoes") }}>Shoes</span>
        <span onClick={() => { navigate("/products/Shirts") }}>Shirts</span>
        <span onClick={() => { navigate("/products/Jeans") }}>Jeans</span>
        <span onClick={() => { navigate("/products/Jackets") }}>Jackets</span>
        <span onClick={() => { navigate("/products/Sweaters") }}>Sweaters</span>
      </div>
      <div className="categoryRight">
        <button onClick={() => setToggleModal(true)}>
          Manage Categories
        </button>
      </div>

    </div>
  )
}

export default Categories