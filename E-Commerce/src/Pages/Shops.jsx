import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import newRequest from "../utils/newRequest";



const Container = styled.div``;
const ShopsContainer = styled.div`
display: flex;
flex-direction: column;
background-color: #f8f8f8;
height: calc(100vh - 80px);
`;
const Title = styled.span`
font-size:24px;
font-weight: 600;
padding: 0 80px;
margin: 24px 0;
`;
const AllShops = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: start;
gap:20px;
padding: 0 80px;
`;
const Shop = styled.div`


background-color: white;
padding: 32px;
display: flex;
border-radius: 8px;
gap: 20px;

`;
const ShopInfo = styled.div`
display: flex;
flex-direction: column;
gap: 8px;
`;
const ShopName = styled.span`

font-weight: 500;
`;
const Location = styled.div`
display: flex;
color: #636363;
font-size: 12px;
font-weight: 300;
`;

const Shops = () => {

  const [shops, setShops] = useState([]);
  
 

  useEffect(() => {
    const getShops = async () => {
      try {
        const res = await newRequest.get(`/shop/shops-client`);
        
        console.log("Fetched shops:", res.data); // Debug log
        setShops(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    getShops();
  }, []);

  console.log(shops)


  return (
    <Container>
    
    <ShopsContainer>
        
      <Title>All Shops</Title>
      <AllShops>
        {shops.map((item) => (
            
            <Link to={`/Shops/${item.idShop}`} style={{width:'32%'}} >

        <Shop key={item.idShop}>
          <Avatar sx={{width:64,height:64}} src={item.ShopImage} />
          <ShopInfo>
            <ShopName>{item.ShopName}</ShopName>
            <Location><LocationOnOutlinedIcon sx={{fontSize:16}} /><>{item.Street + ' , ' + item.State + ' , ' + item.City + ' , ' + item.Country}</></Location>
          </ShopInfo>
        </Shop>
        </Link>
        ))}
      </AllShops>
    </ShopsContainer>
        </Container>
  );
};

export default Shops;
