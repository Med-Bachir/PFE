
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from "styled-components";



import CardComparateur from "../Components/CardComparateur";

import CloseIcon from "@mui/icons-material/Close";

import newRequest from '../utils/newRequest';



const Container = styled.div`
  height: calc(100vh - 80px);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color:#eee;
`;

const Wrapper = styled.div`
  background-color: white;
  width: 85%;
  
  display: flex;
  flex-direction: row;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const PTCompare = styled.div`
  
  border-right: 1px solid;
  border-color: #80808043;
  flex: 1;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  
`;

const RemoveContainer = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-right: 1px solid;
  border-color: #80808043;
  background-color: #eee;
`;

const ProductContainer = styled.div`
  flex: 15;
  display: flex;
  flex-direction: column;
  align-items: center;
  
`;

const NumberContainer = styled.div`
  height: 230px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
`;

const InfoContainer = styled.div`
  color: #009f7f;
  width: 100%;
  height: 190px;
  display: flex;
  flex-direction: column;

  justify-content: space-between;
  font-weight: 600;
 
`;

const NumberCard = styled.h2`
  text-align: center;
`;

const Price = styled.div`
  width: 100%;
  display: flex;
  text-align: start;
`;

const Title = styled.div`
  width: 100%;
  text-align: start;
  
`;

const Stock = styled.div`
  text-align: start;
  width: 100%;
  
`;

const ReviewTitle = styled.div`
  width: 100%;
  
  display: flex;
  
  width: 100%;
  text-align: start;
`;

const Desc = styled.p`
  width: 100%;
  text-align: start;
`;

const Empty = styled.div`
  flex: 1;
`;

const Compare = () => {
  const Location = useLocation().pathname.split("/")[2]
  const navigate = useNavigate();
const [products , setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await newRequest.get(`/products/similar-products/${Location}`)
        setProducts(res.data);
      } catch (error) {
        console.log("error", error);
      }
    };

    getProducts();
  }, [Location]);

  console.log(products)

  const handleCompare = async (idproduct) => {
    try {
      // Make the HTTP request here
      const response = await newRequest.get(`/products/similar-products/${idproduct}`);
      console.log(response+"hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
      // Assuming the request is successful, navigate to the compare page with idproduct
      navigate(`/compare/${idproduct}`);
    } catch (error) {
      console.log(error)
      console.error('Error comparing product:', error);
    }
  };


  const Comparateur = products;

  const sortedComparateur = Comparateur.sort((a, b) => a.Price - b.Price);

  return (
    <>
      
      <Container>
        <Wrapper>
          <PTCompare>
            <RemoveContainer>
              <CloseIcon
                style={{
                  borderRadius: 20,
                  color: "grey",
                  width: 15,
                  height: 15,
                  cursor: "pointer",
                }}
              />
            </RemoveContainer>

            <ProductContainer>
              <NumberContainer>
                <span
                  style={{ color: "#009f7f", fontSize: 60, fontWeight: 600 }}
                >
                  6
                </span>
                <NumberCard>card to compare</NumberCard>
              </NumberContainer>

              <InfoContainer>
                <Title>Title</Title>
                <Price>price:</Price>
                <ReviewTitle>Reviews:</ReviewTitle>
                <Stock>availability</Stock>
                <Desc>Description:</Desc>
              </InfoContainer>
            </ProductContainer>

            <Empty />
          </PTCompare>
          {sortedComparateur.map((items) => (
            <CardComparateur
              items={items}
              key={items.idPRODUCT}
              img={items.productimage}
              title={items.productname}
              IsStock={true}
              price={items.productprice}
              Reviews={items.discount}
              desc={items.productdesc}
            />
          ))}
        </Wrapper>
      </Container>
      
     
      
    </>
  );
};

export default Compare;