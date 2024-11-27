import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import newRequest from "../utils/newRequest";



const Container = styled.div`
height: calc(100vh - 80px);
@media (max-width: 768px) {
  height: calc(100vh - 190px);


}

`;
const ShopsContainer = styled.div`
display: flex;
flex-direction: column;
background-color: #f8f8f8;
contain: paint;
height: 100%;
overflow-y: auto;
@media (max-width: 768px) {
 padding: 0 32px;
}

`;
const Title = styled.span`
font-size:24px;
font-weight: 600;
padding: 0 80px;
margin: 24px 0;

@media (max-width: 768px) {
 padding: 0px;

}
`;
const AllShops = styled.div`

display: flex;
flex-wrap: wrap;
flex-direction: row;
justify-content: start;
gap:20px;
padding: 0 80px 32px 80px;


@media (max-width: 768px) {
  flex-direction: column;
  padding: 0 0 32px 0;

}

`;
const Shop = styled.div`


background-color: white;
padding: 32px;
display: flex;
border-radius: 8px;
gap: 20px;
flex:1;
min-width: 32%;



`;
const ShopInfo = styled.div`
display: flex;
flex-direction: column;
gap: 8px;
@media (max-width: 440px) {
  justify-content: center;
  align-items: center;
}
`;
const ShopName = styled.span`

font-weight: 500;
`;
const Location = styled.div`
display: flex;
align-items: start;
color: #636363;
gap: 8px;
font-size: 12px;
font-weight: 300;
@media (max-width: 440px) {
  justify-content: center;
  align-items: center;
}

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

 
  const [isMobile, setIsMobile] = useState(false);

  // Hook to track window size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 440);
    };

    handleResize(); // Check initial window size
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    <Container>
    
    <ShopsContainer>
        
      <Title>All Shops</Title>
      <AllShops>
        {shops.map((item) => (
            
          
          <Shop key={item.idShop}>
          <Link style={{  width:'100%', display: 'flex' , alignItems:'center' , gap:20 , flexDirection : isMobile ? 'column' : 'row'}}
          to={`/Shops/${item.idShop}`}
        >
          <Avatar sx={{width:64,height:64 , border:'1px solid' }} src={item.ShopImage} />
          <ShopInfo>
            <ShopName>{item.ShopName}</ShopName>
            <Location><LocationOnOutlinedIcon sx={{fontSize:16}} /><>{item.Street + ' , ' + item.State + ' , ' + item.City + ' , ' + item.Country}</></Location>
          </ShopInfo>
        </Link>
        </Shop>
        ))}
      </AllShops>
    </ShopsContainer>
        </Container>
  );
};

export default Shops;
