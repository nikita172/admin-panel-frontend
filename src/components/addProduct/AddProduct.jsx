import React from 'react'
import "./addProduct.css"
import axios from "axios";
import { useState } from "react"
import ClearIcon from '@mui/icons-material/Clear';
export default function AddProduct({ setToggleModal, toggleModal, isProductAdd, setIsProductAdd }) {
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsProductAdd(!isProductAdd);
    const formData = new FormData(e.target);
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/products/add`, formData);
      e.target.reset();
      setToggleModal(false);
    } catch (err) {
      e.target = "";
      console.log(err)
    }
  }
  return (
    <div className={`rightBarFeedContainer ${toggleModal ? "toggle" : ""}`}>
      <div className='productDetail'>
        <form id="productDetailform" encType="multipart/form-data" onSubmit={handleFormSubmit}>
          <div className="addProductHeader">
            <h3 className='productDetailheading'>Enter Product Details</h3>
            <button type="button" onClick={() => setToggleModal(false)} className="crossButton"><ClearIcon /></button>
          </div>
          <div className='productDetailsAdd'>
            <div className="productType">
              <h5>Select Category*</h5>
              <div className="details">
                <select name="productType" id="productType" className="userDetail " required>
                  <option value="" disabled selected hidden>Select Product Type</option>
                  <option value="Shoes">Shoes</option>
                  <option value="Shirts">Shirts</option>
                  <option value="Jeans">Jeans</option>
                  <option value="Jackets">Jackets</option>
                  <option value="Sweaters">Sweaters</option>
                </select>
              </div>
            </div>
            <div className="prodTitle">
              <h5>Brand Name*</h5>
              <input className='productInputs' type="text" name="brandName" placeholder="Brand Name" required />
            </div>
            <div className="prodDesc">
              <h5>About Product*</h5>
              <input className='productInputs' type="text" name="aboutProductShort" placeholder="Desc" required />
            </div>
            <div className="actualPrice">
              <h5>MRP*</h5>
              <input className='productInputs' type="number" name="mrp" placeholder="Price" required />
            </div>
            <div className="addPhotos" >
              <h5>Add Photos of Product*</h5>
              <input type="file" name="file[]" required accept=".jpeg, .png, .jpg ,.avif , .webp, .jfif"
              />
            </div>
            <button id="addButton" type="submit">Add product</button>
          </div>
        </form>
      </div>
    </div >
  )
}
