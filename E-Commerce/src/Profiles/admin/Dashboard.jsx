import React, { useEffect, useState } from "react";

import styled from "styled-components";

import { Avatar, Divider, Rating } from "@mui/material";
import ItemContainer from "../../Components/ItemContainer";
import LineChart from "../../Components/charts/LineChart";
import { useSelector } from "react-redux";
import ShopRequest from "./shops manager/ShopeRequest";

import newRequest from "../../utils/newRequest";
import me from "../../assets/Lotties/Animation - 1716145973359.json";

import BarChart from "../../Components/charts/BarChart";
import Lottie from "lottie-react";
import Loading from "../../Components/Pending/Loading";
import { colorAccentMain, colorAccentMediumTransparent, colorAccentSoftTransparent, colorBackgroundBlack, colorErrorDark, colorErrorSoft, colorHighlightDarkYellow, colorPrimaryBlack, colorWarningDark, darkMain, darkOrange, darkRed, darkYellow, grayBackground, lightMain, lightSoftMain, main, medMain, primaryTextColor, secondaryTextColor, secondText, softMain, softRed, transparentMain, whiteTextColor } from "../../Colors";
import DoughnutChart from "../../Components/charts/DoughnutChart";
import LazyAvatar from "../../Components/Pending/LazyAvatar";




const Container = styled.div`
  padding: 0 32px;
  contain: paint;
  margin-top: 3px;
  overflow-y: scroll;
  height: calc(100vh - 80px);
  @media (max-width: 768px) {
    padding: 0 16px;
}
`;
 const StaticContainer = styled.div`
  margin: 16px 0;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  background-color: ${props => props.theme == 'light' ? whiteTextColor : colorPrimaryBlack};
  padding: 32px 0;
`;
const StaticTitle = styled.h3`
  margin-bottom: 32px;
  font-weight: 500;
  padding-left: 32px;
  border-left: 4px solid ${props => props.theme =='light' ? main : colorAccentMain};
  display: inline-block;
  color: ${props => props.theme =='light' ?  primaryTextColor : whiteTextColor};
  @media (max-width: 768px) {
   margin-bottom: 20px;
}
`;
const Statics = styled.div`
  display: flex;
  gap: 24px;
  padding: 0 32px;
  color: ${props => props.theme =='light' ?  primaryTextColor : whiteTextColor};
  
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 16px;
}
`;
const ItemIcon = styled.img`
  width: 60px;
  padding: 4px;
  border-radius: 4px;
`;
const StaticButContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 32px;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
    padding-right: 0;
    width: 100%;
    align-items: start;
    justify-content: center;
}
`;
const ButtonGroup = styled.div`
  border-radius: 40px;
  overflow:hidden;
  display: flex;
  
  gap: 2px;
  background-color: ${grayBackground};
  padding: 4px;
  background-color: ${props => props.theme == 'light' ? grayBackground : colorBackgroundBlack};
  @media (max-width: 768px) {
    justify-content: center;
}
`;
const Button = styled.button`
  background-color: transparent;
  border-radius: 40px;
  font-size: 12px;
  font-weight: 400;
  &:focus {
    outline: none;
  }
  @media (max-width: 768px) {
   font-size: 11.5px;
}
`;
const PopularContainer = styled.div`
  width: 50%;
  background-color:${props => props.theme == "light" ? whiteTextColor : colorPrimaryBlack};
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  padding: 40px 0 24px;
  height: auto;
  @media (max-width: 768px) {
   width: 100%;
}
  
`;
const PopularInfo = styled.div`
  display: flex;
 overflow: hidden;
  width: 100%;
  color: ${props => props.theme == "light" ? primaryTextColor: whiteTextColor};
`;
const Product = styled.div`
  min-width: 100%;
  transform: ${(props) => `translateX(${props.index * -100}%)`};
  transition: 500ms;
 
`;

const ProductImage = styled.div`
  transition: 500ms;
  width: calc(100% - 128px);
  margin: 12px 64px;
  background-color: ${props => props.theme === "light" ? "white" : colorPrimaryBlack}; /* Container's background color */
  border-radius: 8px;
  overflow: hidden; /* Prevent image overflow during transition */
height: 300px;
border: 1px ${props => props.theme === "light" ? grayBackground : colorBackgroundBlack} solid;
  & img {
    width: 100%;
    height: 300px;
    object-fit: contain;
    border-radius: 8px;
    transition: all 0.3s ease; /* Smooth transition */
    background-color: transparent; /* Transparent background */
    @media (max-width: 768px) {
   width: 100%;
   
}

  }
  @media (max-width: 768px) {
   margin: 0 20px;
   width: calc(100% - 40px);
}
`;


const ProductInfo = styled.div`
  padding: 16px 64px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  @media (max-width: 768px) {
   padding: 16px 20px;
}
`;
const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
`;
const ProductName = styled.span`
  font-weight: 500;
`;
const ProductShops = styled.span`
  color: ${secondaryTextColor};
  font-size: 13px;
  margin-bottom: 8px;
  
`;

const ProductPrice = styled.span`
  font-weight: 500;
`;
const SliderSpan = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  
`;
const Span = styled.span`
  background-color: ${transparentMain};
  padding: 4px;
  border-radius: 40px;
  transition: 500ms;
  cursor: pointer;
`;
const PopularProductList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
  transition: 200ms;
  height: auto;
  max-height: 640px;
  
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
const ListItemConatiner = styled.div`
  padding: 0 32px;
  display: flex;
  align-items: center;
  color: ${props => props.theme == "light" ? primaryTextColor : whiteTextColor};
  @media (max-width: 768px) {
   padding: 4px;
   font-size: 14px;
   
   
}
`;

const ItemDesc = styled.div`
  flex: 7;
  display: flex;
  flex-direction: column;
  margin-left: 16px;
  @media (max-width: 768px) {
   
  margin-left: 4px;
   
   
}
`;
const ItemName = styled.span``;
const ItemType = styled.span`
  color: ${secondaryTextColor};
  font-weight: 400;
  font-size: 14px;
`;
const ItemPrice = styled.span`
  flex: 2;
  text-align: center;
`;

const Charts = styled.div`
  display: flex;
  gap: 20px;
  @media (max-width: 768px) {
   flex-direction: column;
}
`;

const LottieContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;


const ImageContainer = styled.div`
  

  display: flex;
  align-items: center;
  justify-content: center;

 height: 54px;
 

    
    img {

      
   height: 48px;
    width: 48px;
    }
`;
const AdminPf = () => {
  const user = useSelector((state) => state.user?.currentUser);
  const theme = useSelector((state) => state.theme.mode);
 
  const [prod, setProd] = useState([]);
  const [prodS, setProdS] = useState([]);

  const open = useSelector((state) => state.drawer.open);
  const [activeButton, setActiveButton] = useState("Today");
  const [loading, setLoading] = useState(false);
  let [index, setIndex] = useState(0);
  let [myIndex, setMyIndex] = useState(0);
  const [stats, setStats] = useState([]);

  const [shop, setShop] = useState([]);

  const [myprod, mySetProd] = useState([]);

  const [myProdS, mySetProdS] = useState([]);
     const [isMobile, setIsMobile] = useState(false);
    
  
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
  const [incomData, setIncomData] = useState({
    labels: [],
    datasets: [
      {
        label: "Incom",
        data: [],
        backgroundColor: "#74b9ff",
      },
    ],
  });
  const [userData, setUserData] = useState({
    labels: [],
    datasets: [
      {
        label: "New Users",
        data: [],
        backgroundColor: "#74b9ff",
      },
    ],
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await newRequest.get("/stats/stats");
        const stats = res.data;

        const labels = stats.map((stat) => `${stat.month}`);
        const clientData = stats.map((stat) => stat.totalClients);
        const ownerData = stats.map((stat) => stat.totalSellers);

        setUserData({
          labels,
          datasets: [
            {
              label: "New Users",
              data: clientData,
              borderColor: theme == "light" ? main : colorAccentMain,
              backgroundColor: theme == "light" ? `${main}6e` : `${colorAccentMain}6e`,
              borderRadius: 5,
              borderWidth:2
            },
            {
              label: "New Owners",
              data: ownerData,
              borderColor: theme == "light" ? darkRed : colorErrorDark,
              backgroundColor: theme == "light" ? softRed : colorErrorSoft,
              borderRadius: 5,
              borderWidth:2
            },
          ],
        });
      } catch (err) {
        console.error("Failed to fetch statistics", err);
      } finally {
        setLoading(false);
      }
    };

 
  
    const fetchIncomeStats = async () => {
      try {
        const res = await newRequest.get(`/seller/seller/${user?.idUSER}/monthly-revenue`);
        const resTaxes = await newRequest.get(`/stats/monthly-revenue`);
        const topRatedRes = await newRequest.get("/stats/top-rated-products");
        const topSold = await newRequest.get("/stats/top-sold-products-admin");
        const allStats = await newRequest.get("/stats/all-stats");
        const shops = await newRequest.get("/shop/shops-requests");
        const myTopRated = await newRequest.get(`/stats/top-rated-products/${user?.idUSER}`);
        const myTopSold = await newRequest.get(
          `/stats/top-sold-products/${user?.idUSER}`
        );
        mySetProdS(myTopSold.data);
        mySetProd(myTopRated.data);
        setShop(shops.data);
        setStats(allStats.data);
        setLoading(true);
        setProdS(topSold.data);
        setProd(topRatedRes.data);
       
        const stats = res.data;
        const taxesStats = resTaxes.data;

        const labels = stats.map((stat) => `${stat.month}`);
        const incomData = stats.map((stat) => stat.monthlyRevenue);
        const taxesData = taxesStats.map((stat) => stat.monthlyRevenue);

        setIncomData({
          labels,
          datasets: [
            {
              label: "Orders Incom",
              data : incomData,
              backgroundColor: theme === "light" ? `${main}6e` : `${colorAccentMain}6e` ,
              fill: true ,
              tension: 0.3,
              order:2
            },
            {
              label: "Tax Incom",
              data : taxesData,
              borderColor: theme === "light" ? `${darkRed}` : `${colorErrorDark}` ,
              backgroundColor: theme === "light" ? `${darkRed}6e` : `${colorErrorDark}9b` ,
              fill: true ,
              tension: 0.3,
              order:1
            },
          ],
        });
        setLoading(true)
      } catch (err) {
        console.error("Failed to fetch statistics", err);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, [1000]);
    };
    
   
   
    };
   
   
 
    

    fetchStats();
    fetchIncomeStats();
   
  }, []);
  const orderStats = {
    labels: ["Total Orders","Waiting Orders", "On Way Orders", "Arrived Orders"], // Inner circle labels
    datasets: [
      {
        
        data: [stats.totalOrdersFromOwner ,0 ,0 ,0], // Total orders only
        backgroundColor:  theme === "light" ? [ "#b20dbb6e",`${darkOrange}6e`, `${darkYellow}6e`, `${main}6e`] : [ "#5e05636e",`${colorWarningDark}6e`, `${colorHighlightDarkYellow}6e`, `${colorAccentMain}6e`], // Single color for the total orders
        borderColor:  theme === "light" ? [ "#b20dbb",`${darkOrange}`, `${darkYellow}`, `${main}`] : [ "#5e0563",`${colorWarningDark}`, `${colorHighlightDarkYellow}`, `${colorAccentMain}`], // Single color for the total orders
        hoverBackgroundColor:theme === "light" ? [ "#b20dbb",`${darkOrange}`, `${darkYellow}`, `${main}`] : [ "#5e0563",`${colorWarningDark}`, `${colorHighlightDarkYellow}`, `${colorAccentMain}`], // Hover color
         // Leave space for the inner circle
        // Full size for the outer circle
      },
      {
      
        data: [0,stats.WaitingOrders, stats.OnWayOrders, stats.ArrivedOrders], // Waiting, On Way, Arrived
        borderColor:  theme === "light" ? ["#b20dbb",`${darkOrange}`, `${darkYellow}`, `${main}`] : ["#5e0563",`${colorWarningDark}`, `${colorHighlightDarkYellow}`, `${colorAccentMain}`], // Single color for the total orders
        backgroundColor: theme === "light" ? ["#b20dbb6e",`${darkOrange}6e`, `${darkYellow}6e`, `${main}6e`] : ["#5e05636e",`${colorWarningDark}6e`, `${colorHighlightDarkYellow}6e`, `${colorAccentMain}6e`], // Different colors for each category
        hoverBackgroundColor:theme === "light" ? ["#b20dbb",`${darkOrange}`, `${darkYellow}`, `${main}`] : ["#5e0563",`${colorWarningDark}`, `${colorHighlightDarkYellow}`, `${colorAccentMain}`], // Hover colors
         // Smaller size for the inner circle
         // Ensures it stays inside the outer circle
         radius: "90%", 
      },
    ],
  };
  
  
  
  const handleClick = (buttonName) => {
    setActiveButton(buttonName);
  };
  return (
    <Container>
      <StaticContainer theme={theme}>
        <StaticTitle theme={theme} >SUMMARY</StaticTitle>
        <Statics theme={theme}>
          <ItemContainer
            color="red"
            title="Owners"
            icon="https://img.icons8.com/external-flaticons-flat-flat-icons/64/external-seller-auction-house-flaticons-flat-flat-icons-4.png"
            value={stats.totalOwners}
            loading={loading}
          />
          <ItemContainer
            color="green"
            title="Clients"
            icon="https://img.icons8.com/color/48/user.png"
            value={stats.totalClients}
            loading={loading}
          />
          <ItemContainer
            color="blue"
            title="Total Users"
            icon="https://img.icons8.com/color/48/group.png"
            value={stats.totalUsers}
            loading={loading}
          />
          <ItemContainer
            color="teal"
            title="Total Shops"
            icon="https://img.icons8.com/color/48/shopping-cart--v1.png"
            value={stats.totalShops}
            loading={loading}
          />
        </Statics>
      </StaticContainer>

      <StaticContainer theme={theme}>
      <StaticTitle>Incoms</StaticTitle>
        <Statics theme={theme}>
          <ItemContainer
            color="red"
            title="My Shops"
            icon="https://img.icons8.com/arcade/50/shop.png"
            value={stats.myshop}
            loading={loading}
          />
          <ItemContainer
            color="green"
            title="Order Incom"
            icon="https://img.icons8.com/dusk/64/purchase-order.png"
            value={`$ ${
              stats?.TotalArrivedOrderValue == null
                ? 0
                : stats?.TotalArrivedOrderValue.toFixed(2)
            }`}
            loading={loading}
          />
          <ItemContainer
            color="blue"
            title="Tax Income"
            icon="https://img.icons8.com/arcade/50/money-transfer.png"
            value={`$ ${
              stats?.totalMonthSubs * 40 + stats?.totalAnnualSubs * 400 == 0
                ? 0
                : (
                    stats?.totalMonthSubs * 40 +
                    stats?.totalAnnualSubs * 400
                  ).toFixed(2)
            }`}
            loading={loading}
          />
          <ItemContainer
            color="teal"
            title="Total Income"
            icon="https://img.icons8.com/color/48/man-holding-bags-with-money-skin-type-3.png"
            value={`$ ${(
              stats?.TotalArrivedOrderValue +
              stats?.totalMonthSubs * 40 +
              stats?.totalAnnualSubs * 400
            ).toFixed(2)}`}
            loading={loading}
          />
        </Statics>
      </StaticContainer>

      <StaticContainer theme={theme}>
        <StaticButContainer>
          <StaticTitle theme={theme}>Orders</StaticTitle>
          <ButtonGroup theme={theme}>
            <Button
              onClick={() => handleClick("Today")}
              style={{
                color: activeButton === "Today" ? theme == "light" ? main : colorAccentMain : theme == "light" ? primaryTextColor : whiteTextColor,
                backgroundColor: activeButton === "Today" ? theme == 'light' ? lightSoftMain : colorAccentSoftTransparent : "",
              }}
            >
              Today
            </Button>
            <Button
              onClick={() => handleClick("Weakly")}
              style={{
                color: activeButton === "Weakly" ? theme == "light" ? main : colorAccentMain : theme == "light" ? primaryTextColor : whiteTextColor,
                backgroundColor: activeButton === "Weakly" ? theme == 'light' ? lightSoftMain : colorAccentSoftTransparent : "",
              }}
            >
              Weekly
            </Button>
            <Button
              onClick={() => handleClick("Monthly")}
              style={{
                color: activeButton === "Monthly" ? theme == "light" ? main : colorAccentMain : theme == "light" ? primaryTextColor : whiteTextColor,
                backgroundColor: activeButton === "Monthly" ? theme == 'light' ? lightSoftMain : colorAccentSoftTransparent : "",
              }}
            >
              Monthly
            </Button>
            <Button
              onClick={() => handleClick("Yearly")}
              style={{
                color: activeButton === "Yearly" ? theme == "light" ? main : colorAccentMain : theme == "light" ? primaryTextColor : whiteTextColor,
                backgroundColor: activeButton === "Yearly" ? theme == 'light' ? lightSoftMain : colorAccentSoftTransparent : "",
                
              }}
            >
              Yearly
            </Button>
          </ButtonGroup>
        </StaticButContainer>
        <Statics theme={theme}>
          <ItemContainer
            color="red"
            title="Waiting"
            icon="https://img.icons8.com/color/48/data-pending.png"
            value={stats.WaitingOrders}
            loading={loading}
          />
          <ItemContainer
            color="green"
            title="OnWay"
            icon="https://img.icons8.com/color/48/delivery.png"
            value={stats.OnWayOrders}
            loading={loading}
          />
          <ItemContainer
            color="blue"
            title="Arrived"
            icon="https://img.icons8.com/color/48/data-arrived.png"
            value={stats.ArrivedOrders}
            loading={loading}
          />
          <ItemContainer
            color="teal"
            title="Total"
            icon="https://img.icons8.com/color/48/product.png"
            value={
              stats.WaitingOrders + stats.OnWayOrders + stats.ArrivedOrders
            }
            loading={loading}
          />
        </Statics>
      </StaticContainer>
<Charts >

      <StaticContainer theme={theme} style={{margin: isMobile ? 0 : "16px 0" , paddingBottom: 0 ,width: isMobile ? '100%' : "70%"  }}>
        <StaticButContainer>
          <StaticTitle theme={theme}>RECENT SHOPS REQUEST</StaticTitle>
          <ItemIcon
            style={{ backgroundColor: "transparent", width: 80 , display: isMobile ? 'none' : ""  }}
            src="../shop.png"
            />
        </StaticButContainer>
        <ShopRequest shop={shop} loading={loading} />
      </StaticContainer>
      <StaticContainer theme={theme} style={{margin: isMobile ? 0 : "16px 0",width: isMobile ? '100%' : "30%" }}>
      <DoughnutChart chartData={orderStats} loading={loading} />
      </StaticContainer>
            </Charts>
      <Charts>
        <StaticContainer theme={theme} style={{ margin:0 ,width: !isMobile ? "50%" : "100%" }}>
          <StaticTitle theme={theme}>Users</StaticTitle>
          <BarChart chartData={userData} loading={loading} />
        </StaticContainer>
        <StaticContainer theme={theme} style={{ margin:0 ,width: !isMobile ? "50%" : "100%"   }}>
          <StaticTitle theme={theme}>INCOM HISTORY</StaticTitle>
          <LineChart chartData={incomData} loading={loading} />
        </StaticContainer>
      </Charts>

      <StaticContainer theme={theme}
        style={{
          backgroundColor: "transparent",
          gap: 32,
          flexDirection: !isMobile ? "row" : "column"
        }}
      >
        <PopularContainer theme={theme}>
          <StaticTitle theme={theme}>TOP 10 RATED PRODUCT</StaticTitle>
          <PopularInfo theme={theme}>
            {prod != '' && !loading ? (
              prod.map((item) => (
                <Product open={open} index={index}>
                  <ProductImage theme={theme} open={open}>
                    
                  <LazyAvatar 
  src={item?.productimage}
  sx={{
    bgcolor: theme === "light" ? whiteTextColor: colorPrimaryBlack ,
    borderRadius: '8px',
    padding:'4px',
    width: '100%' ,
    height: 300,
    objectFit:'contain'
     }}
/>
                      </ProductImage>
                    <ProductInfo>
                      <Title>
                        <ProductName>{item.productname}</ProductName>
                        <Rating
                          name="read-only"
                          value={item.avg_rating}
                          readOnly
                          size="medium"
                          />
                      </Title>
                      <ProductShops>Bingo Shop | Niggas Shop</ProductShops>
                      <ProductPrice>${item.productprice}</ProductPrice>
                    </ProductInfo>
                          </Product>
              ))
            ) : loading ?<LottieContainer style={{ width:'100%'}}>

             <Loading />
            </LottieContainer>
              : (
              <LottieContainer>
                <Lottie animationData={me} style={{ width: "40%" }} />
                No Product Found
              </LottieContainer>
            )}
          </PopularInfo>
          <SliderSpan>
            {prod.map((item, idx) => (
              <Span
                key={item.idPRODUCT}
                style={{
                  width: `${idx === index ? "20px" : "0px"}`,
                  backgroundColor: `${idx === index ? colorAccentMain : colorAccentMediumTransparent}`,
                }}
                onClick={() => {
                  const newIndex = prod.findIndex(
                    (product) => product.idPRODUCT === item.idPRODUCT
                  );
                  setIndex(newIndex !== -1 ? newIndex : 0);
                }}
              />
            )) }
          </SliderSpan>
        </PopularContainer>

        <PopularContainer theme={theme}>
          <StaticTitle theme={theme}>TOP 10 SELLED PRODUCT</StaticTitle>
          <PopularProductList theme={theme} open={open}>
            {prodS != '' && !loading ? (
              prodS.map((item) => (
                <ListItemConatiner theme={theme} key={item?.idPRODUCT}>
                  <ImageContainer>

                        <LazyAvatar 
  src={item?.productimage}
  sx={{
    bgcolor: theme === "light" ? whiteTextColor: colorPrimaryBlack ,
    borderRadius: '8px',
    border: `1px solid ${theme == "light" ? grayBackground : colorBackgroundBlack}`,
    padding:'4px',
    width: '48px' ,
    height: 48,
    objectFit: 'contain',
  }}
/>
  </ImageContainer>

                  <ItemDesc>
                    <ItemName>{item?.productname}</ItemName>
                    <ItemType>{item?.type}</ItemType>
                  </ItemDesc>
                  <ItemPrice>Solds : {item.totalSold}</ItemPrice>
                  <ItemPrice>$ {item.productprice}</ItemPrice>
                </ListItemConatiner>
              ))
            ) : loading ? 
              <Loading />
            
               : (
                <LottieContainer
 
                >
                <Lottie animationData={me} style={{ width: "40%" }} />
                No Product Found
              </LottieContainer>
            )}
          </PopularProductList>
        </PopularContainer>
      </StaticContainer>
      <div
        style={{
          fontSize: isMobile ? 24 : 32,
          display: "flex",
          flexDirection: "column",
          gap: 20,
          color: theme == 'light' ? primaryTextColor : whiteTextColor
        }}
      >
        My Products :
        <Divider />
      </div>
      <StaticContainer
        style={{
          backgroundColor: "transparent",
          gap: 32,
          flexDirection: !isMobile ? "row" : "column"
        }}
      >
        <PopularContainer theme={theme}>
          <StaticTitle theme={theme} >TOP 10 RATED PRODUCT</StaticTitle>
          <PopularInfo theme={theme}>
            {myprod != '' && !loading ? (
              myprod.map((item) => (
                <Product open={open} index={myIndex}>
                  <ProductImage theme={theme} open={open}>
                  <LazyAvatar 
  src={item?.productimage}
  sx={{
    bgcolor: theme === "light" ? whiteTextColor: colorPrimaryBlack ,
    borderRadius: '8px',

    padding:'4px',
    width: '100%' ,
    height: '100%',
    objectFit: 'contain',
     }}
/>
                      </ProductImage>
                    <ProductInfo>
                      <Title>
                        <ProductName>{item.productname}</ProductName>
                        <Rating
                          name="read-only"
                          value={item.avgrate}
                          readOnly
                          size="medium"
                        />
                      </Title>
                      <ProductShops>Bingo Shop | Niggas Shop</ProductShops>
                      <ProductPrice>${item.productprice}</ProductPrice>
                    </ProductInfo>
                </Product>
              ))
            ) : loading ? 
            <LottieContainer style={{ width:'100%'}}>

            <Loading /> 
            </LottieContainer>
            :(
              <LottieContainer>
                <Lottie animationData={me} style={{ width: "40%" }} />
                No Product Found
              </LottieContainer>
            )}
          </PopularInfo>
          <SliderSpan>
            {myprod.map((item, idx) => (
              <Span
                key={item.idPRODUCT}
                style={{
                  width: `${idx === myIndex ? "20px" : "0px"}`,
                  backgroundColor: `${idx === myIndex ? "#5AB8A8" : ""}`,
                }}
                onClick={() => {
                  const newIndex = myprod.findIndex(
                    (product) => product.idPRODUCT === item.idPRODUCT
                  );
                  setMyIndex(newIndex !== -1 ? newIndex : 0);
                }}
              />
            )) }
          </SliderSpan>
        </PopularContainer>

        <PopularContainer theme={theme}>
          <StaticTitle theme={theme} >
            TOP 10 SELLED PRODUCT
          </StaticTitle>
          <PopularProductList theme={theme} open={open}>
            {myProdS != "" && !loading ? (
              myProdS.map((item) => (
                <ListItemConatiner  theme={theme} key={item.idPRODUCT}>
                  <ImageContainer>

                                     <LazyAvatar 
  src={item?.productimage}
  sx={{
    bgcolor: theme === "light" ? whiteTextColor: colorPrimaryBlack ,
    borderRadius: '8px',
    border: `1px solid ${theme == "light" ? grayBackground : colorBackgroundBlack}`,
    padding:'4px',
    width: 48 ,
    height: 48,
    objectFit: 'contain',
  }}
/>
  </ImageContainer>
                  <ItemDesc>
                    <ItemName>{item.productname}</ItemName>
                    <ItemType>Solds : {item.totalSold}</ItemType>
                  </ItemDesc>
                  <ItemPrice>$ {item.productprice}</ItemPrice>
                </ListItemConatiner>
              ))
            ) : loading ? <Loading /> : (
              <LottieContainer>
                <Lottie animationData={me} style={{ width: "40%" }} />
                No Product Found
              </LottieContainer>
            )}
          </PopularProductList>
        </PopularContainer>
      </StaticContainer>
    </Container>
  );
};

export default AdminPf;
