import React, { useEffect, useState } from 'react'
import ReactLoading from "react-loading"
import { Link } from 'react-router-dom'
import HomeProduct from '../homeProduct/HomeProduct'
import ClearIcon from '@mui/icons-material/Clear';
import axios from "axios"
import "./mainView.css"
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 150 },
  {
    field: 'brandName',
    headerName: 'Brand Name',
    width: 150,
    editable: false,
  },
  {
    field: 'category',
    headerName: 'Category',
    width: 150,
    editable: false,
  },
  {
    field: 'price',
    headerName: 'Price',
    width: 150,
  },
  {
    field: 'image',
    headerName: 'Image',
    width: 150,
    renderCell: (params) => {
      return <img src={params.row.image} />
    }
  },
  {
    field: 'desc',
    headerName: 'Description',
    width: 200,
    editable: false,
  },
];

const MainView = ({ isProductAdd, type, category }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [loading, setLoading] = useState(true)
  const [productRows, setProductRows] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null)
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const res = [];
      if (type == "allCategory") {
        const allProducts = await axios.get(`${apiUrl}/products/get/category/all`);
        if (allProducts.status) {
          allProducts.data.products.map(prod => {
            const obj = {
              id: prod._id,
              brandName: prod.brandName, category: prod.productType, price: prod.mrp, image: `${apiUrl}/public/images/${prod.img[0]}`, desc: prod.aboutProductShort
            }
            res.push(obj)
          })
        }

      } else {

        const allProducts = await axios.get(`${apiUrl}/products/get/` + category);
        if (allProducts.status) {
          allProducts.data.products.map(prod => {
            const obj = {
              id: prod._id,
              brandName: prod.brandName, category: prod.productType, price: prod.mrp, image: `${apiUrl}/public/images/${prod.img[0]}`, desc: prod.aboutProductShort
            }
            res.push(obj)
          })
        }
      }
      setLoading(false);
      setProductRows(res);
    }
    fetchProducts()
  }, [isProductAdd])
  const openModalHandler = (data) => {
    setOpenModal(true);
    setSelectedData(data.row)
  }

  return (
    <div>
      <div className='mainBarContainer'>
        {loading ?
          <div className="loadingComponent">
            <ReactLoading type="bubbles" color='blue' height={100} width={100} />
          </div>
          :
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={productRows && productRows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              onRowClick={openModalHandler}
            />
          </Box>
        }
      </div>
      {openModal &&
        <div className="productModal">
          <div className="productModalWrapper">
            <button onClick={() => setOpenModal(false)}><ClearIcon /></button>
            <div
              className="modal">
              <img className='modalImg' src={selectedData && selectedData.image} />
              <span>Brand: {selectedData && selectedData.brandName}</span>
              <span>Price: {selectedData && selectedData.price} $</span>
              <span>t{selectedData && selectedData.desc}</span>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default MainView;