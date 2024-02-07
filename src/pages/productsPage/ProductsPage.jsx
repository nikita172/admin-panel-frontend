import React, { useEffect, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "./productsPage.css";
import Header from '../../components/header/Header';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import MainView from '../../components/mainView/MainView';
const ProductsPage = () => {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <div className='productsPage'>
      <Header type="Logout" />
      <div className="allProducts">
        <div className="backBtn">
          <ArrowBackIcon onClick={() => navigate("/")} />
        </div>
        <div className="productsWrapper">
          <MainView type="singleCategory" category={params.id} />
        </div>
      </div>
    </div>
  )
}

export default ProductsPage