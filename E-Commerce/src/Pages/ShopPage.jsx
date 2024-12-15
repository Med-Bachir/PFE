import React, { useEffect, useState } from "react";

import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { Avatar, Divider } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import newRequest from "../utils/newRequest";

import me from "./../assets/Lotties/Animation - 1716145973359.json";
import Lottie from "lottie-react";
import { useSelector } from "react-redux";
import ShopProduct from "../Components/ShopProduct";
import {
  colorAccentDark,
  colorBackgroundBlack,
  colorElementBackgroundGray,
  colorPrimaryBlack,
  elementGrayBackground,
  grayBackground,
  lightMain,
  lightSoftMain,
  main,
  primaryTextColor,
  secondaryTextColor,
  whiteTextColor,
} from "../Colors";

const items = [
  {
    img: "https://img.icons8.com/clouds/100/apple-contacts.png",
    title: "Contact",
  },
  {
    img: "https://img.icons8.com/arcade/64/domain.png",
    title: "Web",
  },
  {
    img: "https://img.icons8.com/arcade/64/faq.png",
    title: "FAQs",
  },
];

const Container = styled.div`
  height: 100vh;

  height: calc(100vh - 80px);
  @media (max-width: 768px) {
  height: auto;
  
}

`;

const ShopProfile = styled.div`
    background-color: ${props => props.theme == "light" ? grayBackground : colorBackgroundBlack};
    color: ${props => props.theme == "light" ? primaryTextColor : whiteTextColor};
  height: 100%;
  display: flex;
  padding: 0 0 0 32px;
  gap: 32px;
  @media (max-width: 768px) {
    padding: 0;
    gap: 0;
  
  flex-direction: column;
  
}
`;
const InfoContainer = styled.div`
  padding: 32px 0 8px;
  flex: 4;
 
`;
const ProductContainer = styled.div`
  flex: 13;
  padding: 32px 32px 32px 0;
  contain: paint;
  overflow-y: scroll;
  @media (max-width: 768px) {
    padding: 32px 32px 0 32px;
    
  

  
}
  
`;
const ShopInfo = styled.div`
  
  overflow-y: auto;

  background-color: ${props => props.theme == "light" ? whiteTextColor : colorPrimaryBlack};
  color: ${props => props.theme == "light" ? primaryTextColor : whiteTextColor};
  border-radius: 4px;
  height: 100%;

  &::-webkit-scrollbar {
    width: 2px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(147, 147, 147, 0.543);
    border-radius: 20px;
  }
  
`;
const Cover = styled.div`
  background-size: cover;
  background-color: ${props => props.theme == "light" ? whiteTextColor : colorPrimaryBlack};

  margin-bottom: 32px;
  width: 100%;
  height: 330px;

 
  border-radius: 4px;
`;
const ShopProducts = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  @media (max-width: 768px) {
    
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  
}
@media (max-width: 683px) {
    
    grid-template-columns: repeat(1, 1fr);
    gap: 20px;
  
}
 
  cursor: ${(props) =>
    props.role === "admin" || props.role == "seller" ? "not-allowed" : ""};
  filter: ${(props) =>
    props.role === "admin" || props.role == "seller" ? "brightness(70%)" : ""};
`;

const Top = styled.div`
  padding: 28px 24px;
`;

const Profile = styled.div`
  gap: 12px;
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;
const Date = styled.span`
  font-size: 13px;
  color: ${secondaryTextColor};
  font-weight: 300;
`;
const ShopName = styled.span`
  font-weight: 500;
`;
const Stock = styled.div``;
const Desc = styled.div`
  font-size: 13px;
  color: ${secondaryTextColor};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  box-orient: vertical;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${(props) => (props.open ? "" : 2)};
  margin-bottom: 8px;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const Button = styled.button`
  background-color: transparent;
  font-size: 14px;
  padding-left: 0;
  color: ${main};
  font-weight: 600;
  margin: 0;
`;
const Center = styled.div`
  display: flex;
  padding: 20px;
  gap: 12px;
`;
const Item = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  background-color: ${props => props.theme == "light" ? lightSoftMain : colorAccentDark};
  flex: 1;
  padding: 8px;
  align-items: center;
  gap: 4px;
`;
const ItemIcon = styled.img`
  width: 40px;
  height: 40px;
`;
const ItemTitle = styled.span`
  font-size: 14px;
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  gap: 8px;
`;
const Title = styled.span`
  font-size: 14px;
  font-weight: 500;
`;
const BottomInfo = styled.span`
  font-size: 12px;
  margin-bottom: 12px;
  color: ${secondaryTextColor};
`;

const LottieContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: ${props => props.theme == "light" ? whiteTextColor : colorPrimaryBlack};

  border-radius: 8px;
  width: 100%;
`;

const ShopPage = () => {
  const user = useSelector((state) => state.user?.currentUser);
  const theme = useSelector((state) => state.theme.mode);

  const Location = useLocation().pathname.split("/")[2];
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  const notAllowed = {
    cursor: "not-allowed",
  };

  const [shop, setShop] = useState([]);

  useEffect(() => {
    const getShop = async () => {
      try {
        const res = await newRequest.get(`/shop/shops/${Location}`);
        setShop(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    getShop();
  }, [Location]);
  console.log(shop);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await newRequest.get(`/products/shop-products/${Location}`);
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    getProducts();
  }, [Location]);

  console.log(products);

  return (
    <Container >
      <ShopProfile theme={theme}>
        <InfoContainer >
          <ShopInfo theme={theme}>
            <Top>
              <Profile>
                <Avatar src={shop.ShopImage} sx={{ width: 85, height: 85 }} />
                <Info>
                  <Date>Since {shop.CreatedAt}</Date>
                  <ShopName>{shop.ShopName} </ShopName>
                  <Stock>
                    {shop.TotalProducts} <Date>products</Date>{" "}
                  </Stock>
                </Info>
              </Profile>
              <Desc open={open}>{shop.ShopDesc} </Desc>
              <Button onClick={handleOpen}>
                {open ? "less" : "Read more"}
              </Button>
            </Top>

            <Divider sx={{bgcolor:theme == "light" ? elementGrayBackground : colorElementBackgroundGray}}/>
            <Center>
              {items.map((item) => (
                <Item theme={theme}>
                  <ItemIcon src={item.img} />
                  <ItemTitle>{item.title}</ItemTitle>
                </Item>
              ))}
            </Center>
            <Divider sx={{bgcolor:theme == "light" ? elementGrayBackground : colorElementBackgroundGray}}/>
            <Bottom>
              <Title>Address</Title>
              <BottomInfo>
                {shop.Country + " , " + shop.State + " , " + shop.Street}
              </BottomInfo>
              <Title>Phone</Title>
              <BottomInfo>+213{shop.ShopPhoneNumber}</BottomInfo>
              <Title>Follow Us</Title>
              <BottomInfo>
                <InstagramIcon fontSize="small" />
              </BottomInfo>
            </Bottom>
          </ShopInfo>
        </InfoContainer>
        <ProductContainer>
          <Cover theme={theme}>

            <img src={shop.ShopCover} style={{width:'100%', height:'100%' , objectFit:'contain'}} />
          </Cover>
          {products != "" ? (
            <ShopProducts role={user?.userRole}>
              {products.map((item) => (
                <Link
                  key={item.idPRODUCT}
                  style={
                    user?.userRole === "admin" || user?.userRole === "seller"
                      ? notAllowed
                      : { cursor: "" }
                  }
                  to={
                    user?.userRole === "client"
                      ? `/cardproduct/${item.idPRODUCT}`
                      : undefined
                  }
                >
                  <ShopProduct
                    name={item?.productname}
                    id={item?.idPRODUCT}
                    price={item?.productprice}
                    discount={item?.discount}
                    image={item?.productimage}
                    rate={item.rate}
                    theme={theme}
                  />
                </Link>
              ))}
            </ShopProducts>
          ) : (
            <LottieContainer theme={theme}>
              <Lottie animationData={me} style={{ width: "40%" }} />
              <span>No Product in Shop</span>
            </LottieContainer>
          )}
        </ProductContainer>
      </ShopProfile>
    </Container>
  );
};

export default ShopPage;
