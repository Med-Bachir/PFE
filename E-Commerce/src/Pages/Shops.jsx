import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import newRequest from "../utils/newRequest";
import {colorAccentDarkTransparent, colorBackgroundBlack, colorPrimaryBlack, grayBackground, primaryTextColor, secondaryTextColor, secondText, whiteTextColor } from "../Colors";
import { useSelector } from "react-redux";



const Container = styled.div`
height: calc(100vh - 80px);
@media (max-width: 768px) {
  height: calc(100vh - 190px);


}

`;
const ShopsContainer = styled.div`
display: flex;
flex-direction: column;
background-color: ${props => props.theme == "light" ? grayBackground : colorBackgroundBlack};
color: ${props => props.theme == "light" ? primaryTextColor : whiteTextColor};

contain: paint;
height: 100%;
overflow-y: auto;
@media (max-width: 768px) {
 padding: 0 32px;
}

`;
const Title = styled.span`
font-size:24px;
font-weight: 500;
padding: 0 32px;
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
padding: 0 32px 32px 32px;
@media (max-width: 768px) {
  padding: 0;
}
@media (max-width: 524px) {
  flex-direction: column;
  padding: 0 0 32px 0;

}
`;
const Shop = styled.div`


background-color: ${props => props.theme == "light" ? whiteTextColor : colorPrimaryBlack};

padding: 20px;
display: flex;
border-radius: 8px;
gap: 20px;
flex:1;
min-width: 32%;
max-width: 32%;

@media (max-width: 1153px) {
 max-width: 100%;
}



`;
const ShopInfo = styled.div`
display: flex;
flex-direction: column;
gap: 8px;

@media (max-width: 768px) {
  justify-content: center;
  align-items: center;
}
`;
const ShopName = styled.span`
font-weight: 500;
color: ${props => props.theme == "light" ? primaryTextColor : whiteTextColor};

`;
const Location = styled.div`
display: flex;
align-items: start;
color: ${secondaryTextColor};
gap: 8px;
font-size: 12px;
font-weight: 300;
@media (max-width: 768px) {
  justify-content: center;
  align-items: center;
}
`;

const Shops = () => {
const theme = useSelector(state => state.theme.mode)
  const [shops, setShops] = useState([]);
  
 

  useEffect(() => {
    const getShops = async () => {
      try {
        const res = await newRequest.get(`/shop/shops-client`);
        
      
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
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Check initial window size
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    <Container>
    
    <ShopsContainer theme={theme}>
        
      <Title>All Shops</Title>
      <AllShops>
        {shops.map((item) => (
            
          
          <Shop theme={theme} key={item.idShop}>
          <Link style={{  width:'100%', display: 'flex' , alignItems:'center' , gap:20 , flexDirection : isMobile ? 'column' : 'row'}}
          to={`/Shops/${item.idShop}`}
        >
          <Avatar sx={{width:64,height:64 , border:'1px solid' }} src={item.ShopImage} />
          <ShopInfo>
            <ShopName theme={theme}>{item.ShopName}</ShopName>
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
