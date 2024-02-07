import React from 'react'
import "./homeProduct.css"
import { Link } from 'react-router-dom'
export default function HomeProduct({ product }) {
  return (
    <Link className="links">
      <div className="headerBottomDetails">
        <img className="prodImg" src={`${process.env.REACT_APP_API_URL}/public/images/${product.img[0]}`} />
        <div className='productDesc'>
          <h5>{product.aboutProductShort}</h5>
          <p>Just for ₹ {product.mrp}</p>
          <p>{product.brandName}</p>
        </div>
      </div>
    </Link>
  )
}
