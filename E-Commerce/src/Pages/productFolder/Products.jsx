import Product from "../../Components/Product.jsx";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Lottie from "lottie-react"
import me from "../.././Animation - 1716145973359.json"
import newRequest from "../../utils/newRequest.js";
import { useQuery, useQueryClient } from "@tanstack/react-query";
// Styled components
const Container = styled.div`
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 32px;
`;
const LottieContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
width: calc(100vw - 402px);
height: calc(100vh - 80px);


`;


const Products = () => {
  const { categoryName, subName, typeName} = useSelector((state) => state.caty);
  const [allProducts, setAllProducts] = useState([]);
  const queryClinet = useQueryClient()

  const getFilter = async () => {
    try {
      let res;
      if (categoryName && subName && typeName) {
        res = await newRequest.get(`/products/${categoryName}/${subName}/${typeName}`);
      } else if (categoryName && subName) {
        res = await newRequest.get(`/products/${categoryName}/${subName}`);
      } else if (categoryName) {
        res = await newRequest.get(`/products/${categoryName}`);
      } else {
        res = await newRequest.get(`/products`);
      }

      return res.data; // Ensure this is returned
    } catch (error) {
      console.error("Error fetching filtered products:", error);
    }
  };
  const { isPending, error, data } = useQuery({
    queryKey: ['filter', categoryName, subName, typeName],
    queryFn: getFilter,
    retry: 3,
  });
  
  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message


  return (
    <Container>
      {data && data.length > 0 ? (
        data?.map((item) => (
          <Product
           key={item.idPRODUCT}
            id={item.idPRODUCT}
            productimage={item.productimage}
            productname={item.productname}
            productprice={item.productprice}
            discount={item.discount}
          />
        ))
      ) : (
        <LottieContainer>
          <Lottie  animationData={me} style={{ width:"40%"}} /> 
          no Product in Category
          </LottieContainer>
      )}
    </Container>
  );
};

export default Products;
