


import Product from "./Product.jsx";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Lottie from "lottie-react"
import me from "../../assets/Lotties/Animation - 1716145973359.json"
import newRequest from "../../utils/newRequest.js";
import { useQuery, useQueryClient } from "@tanstack/react-query";// Styled components
import { primaryTextColor, secondText } from "../../Colors.jsx";
const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  gap: 20px;
  padding: 32px;
  flex-wrap: wrap; /* Responsive grid */
  @media (max-width: 768px) {
  padding: 12px;
  gap: 12px;
  }
  @media (max-width: 320px) {
  padding: 8px;
  
 
  }
`;

const LottieContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: calc(100vw - 402px);
  height: calc(100vh - 80px);
  text-align: center;


  @media (max-width: 768px) {
    width: 100%; /* Adjust for smaller screens */
  }
`;

const Message = styled.div`
  font-size: 1.2rem;
  color: ${secondText};
  margin-top: 16px;
`;

const Products = ({theme}) => {
  const { categoryName, subName, typeName } = useSelector((state) => state.caty);

  const getFilter = async () => {
    try {
      let res;
      if (categoryName && subName && typeName) {
        res = await newRequest.get(`/products/${categoryName}/${subName}/${typeName}`);
        console.log(typeName)
      } else if (categoryName && subName) {
        res = await newRequest.get(`/products/${categoryName}/${subName}`);
        console.log(subName)

      } else if (categoryName) {
        res = await newRequest.get(`/products/${categoryName}`);
        console.log(categoryName)

      } else {
        res = await newRequest.get(`/products`);
      }


console.log(res.data)
      return res.data;
    } catch (error) {
      console.error("Error fetching filtered products:", error);
    }
  };

  const { isPending, error, data } = useQuery({
    queryKey: ['filter', categoryName, subName, typeName],
    queryFn: getFilter,
    
  });

  if (isPending) {
    return (
      <LottieContainer>
        <Lottie animationData={me} style={{ width: "40%" }} />
        <Message>Loading Products...</Message>
      </LottieContainer>
    );
  }

  if (error) {
    return (
      <LottieContainer>
        <Message>An error has occurred: {error.message}</Message>
      </LottieContainer>
    );
  }

  return (
    <Container>
      {data && data.length > 0 ? (
        data.map((item) => (
          <Product
            key={item.idPRODUCT}
            id={item.idPRODUCT}
            productimage={item.productimage}
            productname={item.productname}
            productprice={item.productprice}
            discount={item.discount}
            rate={item.rate}
            theme={theme}
          />
        ))
      ) : (
        <LottieContainer>
          <Lottie animationData={me} style={{ width: "40%" }} />
          <Message>No Products in this Category</Message>
        </LottieContainer>
      )}
    </Container>
  );
};

export default Products;
