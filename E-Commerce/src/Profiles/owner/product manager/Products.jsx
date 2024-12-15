import React, { useEffect, useState } from "react";
import ProductList from "./ProductList";
import { Fab, Tooltip } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import newRequest from "../../../utils/newRequest";
import { main, primaryTextColor, whiteTextColor } from "../../../Colors";

const Container = styled.div`
  display: flex;
  align-items: start;
  justify-content: center;
  padding: 32px;
  height: calc(100vh - 80px);
`;
const StaticContainer = styled.div`
  background-color: ${whiteTextColor};
  width: 100%;
  max-height: calc(100vh - 144px);
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 5px; /* width of the entire scrollbar */
  }
  &::-webkit-scrollbar-track {
    background: transparent; /* color of the tracking area */
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(
      147,
      147,
      147,
      0.543
    ); /* color of the scroll thumb */
    border-radius: 20px; /* roundness of the scroll thumb */
    /* creates padding around scroll thumb */
  }
`;

const Products = () => {
  const user = useSelector((state) => state.user?.currentUser);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(null);



  const getProducts = async () => {
    let res ;
    try {
      if (user?.userRole == "admin") {
         res = await newRequest.get(`/products/all-products`);
        
        
      } else {
         res = await newRequest.get(
          `/products/seller-products/${user?.idUSER}`
        );

      }
      setProducts(res.data);
      setLoading(true)

    } catch (err) {
      console.error("Error fetching users:", err);
    }finally {
      setTimeout(() => {
        setLoading(false)
              },[1000])
    }
  };
  useEffect(() => {
    
    getProducts();
  }, []);
  const handleDelete = async (id) => {
    try {
      const response = await newRequest.delete(
        `/products/delete-product/${id}`
      );
      console.log(response.status);
setLoading(true)
      if (response.status === 200) {
        message.success("Product added successfully.");
      } else {
        message.error("Failed to add product.");
      }
      getProducts()

    } catch (error) {
      console.error("Error adding product:", error);
      message.error("Failed to add product.");
    }finally{
      setTimeout(() => {
        setLoading(false)
              },[1000])
    }
  };

  return (
    <>
      <Container>
        <StaticContainer style={{ borderRadius: 4 }}>
          <ProductList productData={products} loading={loading} handle={handleDelete}/>
        </StaticContainer>
        <Link to="Add">
        <Tooltip title='Add Product'>

          <Fab
            sx={{bgcolor:main}}
            aria-label="add"
            style={{ position: "absolute", bottom: 120, right: 50 }}
            >
            <AddShoppingCartIcon sx={{color:whiteTextColor , "&:hover" : {color : primaryTextColor}}} />
          </Fab>
            </Tooltip>
        </Link>
      </Container>
    </>
  );
};

export default Products;
