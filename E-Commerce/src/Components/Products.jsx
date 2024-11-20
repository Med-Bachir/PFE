import React, { useEffect, useState } from 'react'
import { StaticContainer } from '../Pages/Profiles/admin/AdminPf'
import ProductList from './ProductList'
import { Container } from './Shipping'
import { Fab } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import newRequest from '../utils/newRequest'





const Products = () => {
  const user = useSelector((state) => state.user?.currentUser);

  

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        if(user?.userRole == 'admin'){
          const res = await newRequest.get(`/products/all-products`);
          setProducts(res.data);
        }else{

          const res = await newRequest.get(`/products/seller-products/${user?.idUSER}`);
          setProducts(res.data);
        }
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    getProducts();
  }, []);



  return (
<>
    <Container  >

    <StaticContainer style={{borderRadius:4 , padding:0}}>
        <ProductList productData={products} />
        
    </StaticContainer>
    <Link to='Add'>
    <Fab color="success" aria-label="add" style={{position:'absolute' , bottom:120 , right:50}}>
  <AddShoppingCartIcon  />
</Fab>
    </Link>


    </Container>
    
    </>
  )
}

export default Products
