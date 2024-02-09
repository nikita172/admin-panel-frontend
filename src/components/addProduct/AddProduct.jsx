import React from 'react'
import "./addProduct.css"
import axios from "axios";
import { useState } from "react"
import ClearIcon from '@mui/icons-material/Clear';
import { useToast } from '@chakra-ui/react'
export default function AddProduct({ setToggleModal, toggleModal, isProductAdd, setIsProductAdd }) {

  const toast = useToast();
  const [pic, setPic] = useState();
  const [brandName, setBrandName] = useState();
  const [productType, setProductType] = useState();
  const [desc, setDesc] = useState();
  const [mrp, setMrp] = useState();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsProductAdd(!isProductAdd);
    const data = {
      brandName: brandName,
      productType: productType,
      aboutProductShort: desc,
      mrp: mrp,
      img: pic
    }
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/products/add`, data);
      e.target.reset();
      setToggleModal(false);
    } catch (err) {
      e.target = "";
      console.log(err)
    }
  }

  const postDetails = (pics) => {
    if (pics === undefined) {
      toast({
        title: "Please Select an image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom"
      });
      return;
    }
    console.log(pics)

    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", "chat-app");
    data.append("cloud_name", "duqzhkepf");
    fetch("https://api.cloudinary.com/v1_1/duqzhkepf/image/upload", {
      method: "post",
      body: data
    }).then(res => res.json())
      .then(data => {
        setPic(data.url.toString());
        console.log(data.url.toString());
      })
      .catch(err => {
        console.log(err);
      })
  };
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
                <select name="productType" id="productType" className="userDetail " required
                  onChange={(e) => setProductType(e.target.value)}>
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
              <input className='productInputs' type="text" name="brandName" placeholder="Brand Name"
                onChange={(e) => setBrandName(e.target.value)} required />
            </div>
            <div className="prodDesc">
              <h5>About Product*</h5>
              <input className='productInputs' type="text" name="aboutProductShort" placeholder="Desc"
                onChange={(e) => setDesc(e.target.value)} required />
            </div>
            <div className="actualPrice">
              <h5>MRP*</h5>
              <input className='productInputs' type="number" name="mrp" placeholder="Price"
                onChange={(e) => setMrp(e.target.value)} required />
            </div>
            <div className="addPhotos" >
              <h5>Add Photos of Product*</h5>
              <input type="file" name="file" required accept=".jpeg, .png, .jpg ,.avif , .webp, .jfif"
                onChange={(e) => postDetails(e.target.files[0])}
              />
            </div>
            <button id="addButton" type="submit">Add product</button>
          </div>
        </form>
      </div>
    </div >
  )
}
