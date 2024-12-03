import React, { useEffect, useState } from "react";
import ProductList from "./ProductList";
import { Fab } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import newRequest from "../../../utils/newRequest";

const Container = styled.div`
  display: flex;
  align-items: start;
  justify-content: center;
  padding: 32px;
  height: calc(100vh - 80px);
`;
const StaticContainer = styled.div`
  background-color: white;
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

  useEffect(() => {
    const getProducts = async () => {
      try {
        if (user?.userRole == "admin") {
          const res = await newRequest.get(`/products/all-products`);
          setProducts(res.data);
        } else {
          const res = await newRequest.get(
            `/products/seller-products/${user?.idUSER}`
          );
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
      <Container>
        <StaticContainer style={{ borderRadius: 4 }}>
          <ProductList productData={products} />
        </StaticContainer>
        <Link to="Add">
          <Fab
            color="success"
            aria-label="add"
            style={{ position: "absolute", bottom: 120, right: 50 }}
          >
            <AddShoppingCartIcon />
          </Fab>
        </Link>
      </Container>
    </>
  );
};

export default Products;
