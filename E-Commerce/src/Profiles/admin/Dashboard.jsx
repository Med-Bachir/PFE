import React, { useEffect, useState } from "react";

import styled from "styled-components";

import { Divider, Rating } from "@mui/material";
import ItemContainer from "../../Components/ItemContainer" 
import LineChart from "../../Components/charts/LineChart";
import { useSelector } from "react-redux";
import ShopRequest from "./shops manager/ShopeRequest";

import newRequest from "../../utils/newRequest";
import me from "../../assets/Lotties/Animation - 1716145973359.json"

import BarChart from "../../Components/charts/BarChart";
import Lottie from "lottie-react";

const Container = styled.div`
  padding: 0 32px;
  contain: paint;
  margin-top: 3px;
  overflow-y: scroll;
  height: calc(100vh - 80px);
`;
export const StaticContainer = styled.div`
  margin: 16px 0;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  background-color: white;
  padding: 32px 0;
`;
export const StaticTitle = styled.h3`
  margin-bottom: 32px;
  font-weight: 500;
  padding-left: 32px;
  border-left: 4px solid teal;
  display: inline-block;
`;
const Statics = styled.div`
  display: flex;
  gap: 24px;
  padding: 0 32px;
`;
const Item = styled.div`
  flex: 1;
  border: 1px solid #33333331;
  border-bottom: 4px solid
    ${(props) =>
      props.color === "red"
        ? "#ff8383"
        : props.color === "green"
        ? "#ff80d5"
        : props.color === "blue"
        ? "#c06dff"
        : "#745eff"};

  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32px 24px;
`;
const ItemIcon = styled.img`
  width: 60px;
  padding: 4px;
  border-radius: 4px;
  
`;
const ItemInfo = styled.div`
  display: flex;
  text-align: end;
  flex-direction: column;
  justify-content: space-between;
  align-items: end;
  gap: 8px;
`;

const ItemTitle = styled.span`
  color: gray;
`;
const ItemStatic = styled.span`
  font-weight: 600;
  font-size: 20px;
`;

const StaticButContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 32px;
  margin-bottom: 20px;
`;

const ButtonGroup = styled.div`
  border-radius: 40px;
  contain: paint;
  display: flex;
  gap: 2px;
  background-color: #eeeeee6e;
  padding: 4px;
`;
const Button = styled.button`
  background-color: transparent;
  border-radius: 40px;
  font-size: 12px;
  font-weight: 400;
  &:focus {
    outline: none;
  }
`;

const PopularContainer = styled.div`
  width: 50%;
  background-color: white;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  padding: 40px 0 24px;
  height: min-content;
  
  
`;
const PopularInfo = styled.div`
  display: flex;
  contain: paint;
  
  width: 100%;
  
`;
const Product = styled.div`
min-width: 100%;
  transform: ${(props) => `translateX(${props.index * -100}%)`};
  transition: 500ms;
`;

const ProductImage = styled.div`
  transition: 500ms;
  width: 100%;
  padding: 12px 64px;


  & img {
    width: 100%;
    border: 1px #eee solid;
    border-radius: 8px;
    object-fit: contain;
  }
`;
const ProductInfo = styled.div`
  padding: 16px 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
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
  color: #c9c9c9;
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
  background-color: #0080805d;
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
    background-color: rgba(
      147,
      147,
      147,
      0.543
    ); 
    border-radius: 20px; 
  }
`;
const ListItemConatiner = styled.div`
  padding: 0 32px;
  display: flex;
  align-items: center;
`;
const ItemImage = styled.img`
  border: 1px solid #eee;
  padding: 8px;
  width: 48px;
  height: 48px;
  object-fit: contain;
  border-radius: 8px;
`;
const ItemDesc = styled.div`
  flex: 7;
  display: flex;
  flex-direction: column;
  margin-left: 16px;
`;
const ItemName = styled.span``;
const ItemType = styled.span`
  color: #5f5f5f;
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
`


const LottieContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;

`

const AdminPf = () => {
  const user = useSelector((state) => state.user?.currentUser);

  const open = useSelector((state) => state.cart.open);
  const [activeButton, setActiveButton] = useState("Today");
  let [index, setIndex] = useState(0);
  const [incomData , setIncomData] = useState({
    labels: [],
    datasets: [
      {
        label: "Incom",
        data: [],
        backgroundColor: "#74b9ff",
      },
    ],
  })
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
        const data = stats.map((stat) => stat.total == 0 ? stat.total : stat.total-1);
        
        setUserData({
          labels,
          datasets: [
            {
              label: "New Users",
              data,
              backgroundColor: "#00e1b4b4",
            },
          ],
        });
      } catch (err) {
        
        console.error("Failed to fetch statistics", err);
      }
    };
  
    fetchStats();
  }, []);
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await newRequest.get(`/seller/seller/${user?.idUSER}/monthly-revenue`);
        const stats = res.data;
        
        const labels = stats.map((stat) => `${stat.month}`);
        const data = stats.map((stat) => stat.monthlyRevenue );
      
        
        setIncomData({
          labels,
          datasets: [
            {
              label: "Incom",
              data,
              backgroundColor: "#00e1b4b4",
            },
          ],
        });
      } catch (err) {
        
        console.error("Failed to fetch statistics", err);
      }
    };
  
    fetchStats();
  }, []);

  const [prod, setProd] = useState([]);

  useEffect(() => {
    const getProd = async () => {
      try {
        const res = await newRequest.get("/stats/top-rated-products");
        setProd(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    getProd();
  }, []);

  const [prodS, setProdS] = useState([]);

  useEffect(() => {
    const getProdS = async () => {
      try {
        const res = await newRequest.get("/stats/top-sold-products-admin");
        setProdS(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    getProdS();
  }, []);

  
  

  const [stats, setStats] = useState([]);

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await newRequest.get("/stats/all-stats");
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    getStats();
  }, []);


  const [shop, setShop] = useState([]);

  useEffect(() => {
    const getShop = async () => {
      try {
        const res = await newRequest.get("/shop/shops-requests");
        setShop(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    getShop();
  }, []);
 


  const [myprod, mySetProd] = useState([]);

  useEffect(() => {
    const getMyProd = async () => {
      try {
        const res = await newRequest.get(`/stats/top-rated-products/${user?.idUSER}`);
        mySetProd(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    getMyProd();
  }, []);
 
  const [myProdS, mySetProdS] = useState([]);

  useEffect(() => {
    const getProdS = async () => {
      try {
        const res = await newRequest.get(`/stats/top-sold-products/${user?.idUSER}`);
        mySetProdS(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    getProdS();
  }, []);

  
  

  const handleClick = (buttonName) => {
    setActiveButton(buttonName);
  };
  return (
    <Container>
      <StaticContainer>
        <StaticTitle className="bg-red-700">SUMMARY</StaticTitle>
        <Statics>
          <ItemContainer color='red' title='Owners' icon="https://img.icons8.com/external-flaticons-flat-flat-icons/64/external-seller-auction-house-flaticons-flat-flat-icons-4.png" value={stats.totalOwners} />
          <ItemContainer color='green' title='Clients' icon="https://img.icons8.com/color/48/user.png" value={stats.totalClients} />
          <ItemContainer color='blue' title='Total Users' icon="https://img.icons8.com/color/48/group.png" value={stats.totalUsers} />
          <ItemContainer color='teal' title='Total Shops' icon="https://img.icons8.com/color/48/shopping-cart--v1.png" value={stats.totalShops} />
        </Statics>
      </StaticContainer>

      <StaticContainer>
        <StaticButContainer>
          <StaticTitle>Incom</StaticTitle>
          <ButtonGroup>
            <Button
              onClick={() => handleClick("Today")}
              style={{
                color: activeButton === "Today" ? "green" : "black",
                backgroundColor: activeButton === "Today" ? "#EEFDF2" : "",
                border: activeButton === "Today" ? "1px solid green" : "",
              }}
            >
              Today
            </Button>
            <Button
              onClick={() => handleClick("Weakly")}
              style={{
                color: activeButton === "Weakly" ? "green" : "black",
                backgroundColor: activeButton === "Weakly" ? "#EEFDF2" : "",
                border: activeButton === "Weakly" ? "1px solid green" : "",
              }}
            >
              Weekly
            </Button>
            <Button
              onClick={() => handleClick("Monthly")}
              style={{
                color: activeButton === "Monthly" ? "green" : "black",
                backgroundColor: activeButton === "Monthly" ? "#EEFDF2" : "",
                border: activeButton === "Monthly" ? "1px solid green" : "",
              }}
            >
              Monthly
            </Button>
            <Button
              onClick={() => handleClick("Yearly")}
              style={{
                color: activeButton === "Yearly" ? "green" : "black",
                backgroundColor: activeButton === "Yearly" ? "#EEFDF2" : "",
                border: activeButton === "Yearly" ? "1px solid green" : "",
              }}
            >
              Yearly
            </Button>
          </ButtonGroup>
        </StaticButContainer>

        
        <Statics>
          <ItemContainer color='red' title='My Shops' icon="https://img.icons8.com/arcade/50/shop.png" value={stats.myshop} />
          <ItemContainer color='green' title='Order Incom' icon="https://img.icons8.com/dusk/64/purchase-order.png" value={`$ ${stats?.TotalArrivedOrderValue == null ? 0 : stats?.TotalArrivedOrderValue.toFixed(2) }`} />
          <ItemContainer color='blue' title='Tax Income' icon="https://img.icons8.com/arcade/50/money-transfer.png" value={`$ ${stats?.totalMonthSubs * 40 + stats?.totalAnnualSubs * 400 == 0 ? 0 : (stats?.totalMonthSubs * 40 + stats?.totalAnnualSubs * 400 ).toFixed(2) }`} />
          <ItemContainer color='teal' title='Total Income' icon="https://img.icons8.com/color/48/man-holding-bags-with-money-skin-type-3.png" value={`$ ${(stats?.TotalArrivedOrderValue + stats?.totalMonthSubs * 40 + stats?.totalAnnualSubs * 400 ).toFixed(2)  }`} />
        </Statics> 
      </StaticContainer>


      <StaticContainer>
        <StaticButContainer>
          <StaticTitle>Orders</StaticTitle>
          <ButtonGroup>
            <Button
              onClick={() => handleClick("Today")}
              style={{
                color: activeButton === "Today" ? "green" : "black",
                backgroundColor: activeButton === "Today" ? "#EEFDF2" : "",
                border: activeButton === "Today" ? "1px solid green" : "",
              }}
            >
              Today
            </Button>
            <Button
              onClick={() => handleClick("Weakly")}
              style={{
                color: activeButton === "Weakly" ? "green" : "black",
                backgroundColor: activeButton === "Weakly" ? "#EEFDF2" : "",
                border: activeButton === "Weakly" ? "1px solid green" : "",
              }}
            >
              Weekly
            </Button>
            <Button
              onClick={() => handleClick("Monthly")}
              style={{
                color: activeButton === "Monthly" ? "green" : "black",
                backgroundColor: activeButton === "Monthly" ? "#EEFDF2" : "",
                border: activeButton === "Monthly" ? "1px solid green" : "",
              }}
            >
              Monthly
            </Button>
            <Button
              onClick={() => handleClick("Yearly")}
              style={{
                color: activeButton === "Yearly" ? "green" : "black",
                backgroundColor: activeButton === "Yearly" ? "#EEFDF2" : "",
                border: activeButton === "Yearly" ? "1px solid green" : "",
              }}
            >
              Yearly
            </Button>
          </ButtonGroup>
        </StaticButContainer>
        <Statics>
          <ItemContainer color='red' title='Waiting' icon="https://img.icons8.com/color/48/data-pending.png" value={stats.WaitingOrders} />
          <ItemContainer color='green' title='OnWay' icon="https://img.icons8.com/color/48/delivery.png" value={stats.OnWayOrders} />
          <ItemContainer color='blue' title='Arrived' icon="https://img.icons8.com/color/48/data-arrived.png" value={stats.ArrivedOrders} />
          <ItemContainer color='teal' title='Total' icon="https://img.icons8.com/color/48/product.png" value={stats.WaitingOrders + stats.OnWayOrders + stats.ArrivedOrders} />
        </Statics>
      </StaticContainer>

      <StaticContainer style={{ paddingBottom: 0 }}>
        <StaticButContainer>
          <StaticTitle>RECENT SHOPS REQUEST</StaticTitle>
          <ItemIcon
            style={{ backgroundColor: "transparent", width: 80 }}
            src="../shop.png"
          />
        </StaticButContainer>
        <ShopRequest shop={shop} />
      </StaticContainer>
<Charts>

      <StaticContainer style={{width:'50%'}}>
        <StaticTitle>Users</StaticTitle>
        <BarChart chartData={userData} />
      </StaticContainer>
      <StaticContainer style={{width:'50%'}}>
        <StaticTitle>INCOM HISTORY</StaticTitle>
        <LineChart chartData={incomData} />
      </StaticContainer>
</Charts>

      <StaticContainer
        style={{
          backgroundColor: "transparent",
          flexDirection: "row",
          gap: 32,
        }}
      >
        <PopularContainer>
          <StaticTitle >TOP 10 RATED PRODUCT</StaticTitle>
          <PopularInfo>
            {prod != "" ? prod.map((item) => (
              <Product open={open} index={index}>
                <ProductImage open={open}>
                  <img
                    style={{ height:400 }}
                    src={item.productimage}
                    alt=""
                  />
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
                </ProductImage>
              </Product>
            )) : 
            <LottieContainer>
        <Lottie  animationData={me} style={{ width:"40%"}} /> 
        No Product Found
        </LottieContainer> 
            }
          </PopularInfo>
          <SliderSpan>
          {prod.map((item, idx) => (
    <Span
        key={item.idPRODUCT}
        style={{
            width: `${idx === index ? "20px" : "0px"}`,
            backgroundColor: `${idx === index ? "#5AB8A8" : ""}`,
        }}
        onClick={() => {
            const newIndex = prod.findIndex(product => product.idPRODUCT === item.idPRODUCT);
            setIndex(newIndex !== -1 ? newIndex : 0);
        }}
    />
))}
          </SliderSpan>
        </PopularContainer>

        <PopularContainer>
          <StaticTitle>
            TOP 10 SELLED PRODUCT
          </StaticTitle>
          <PopularProductList open={open}>
            {prodS != "" ? prodS.map((item) => (
              <ListItemConatiner key={item?.idPRODUCT}>
                <ItemImage src={item?.productimage} />
                <ItemDesc>
                  <ItemName>{item?.productname}</ItemName>
                  <ItemType>{item?.type}</ItemType>
                </ItemDesc>
                <ItemPrice>Solds : {item.totalSold}</ItemPrice>
                <ItemPrice>$ {item.productprice}</ItemPrice>
              </ListItemConatiner>
            )) : 
            <LottieContainer>
            <Lottie  animationData={me} style={{ width:"40%"}} /> 
            No Product Found
            </LottieContainer> 
            }
          </PopularProductList>
        </PopularContainer>
      </StaticContainer>
      <div style={{fontSize:32 , display:"flex" , flexDirection:"column" , gap:20 }}>
      My Products : 
      <Divider />
      </div>
      <StaticContainer
        style={{
          backgroundColor: "transparent",
          flexDirection: "row",
          gap: 32,
        }}
      >
        <PopularContainer>
          <StaticTitle className="bg-red-700">TOP 10 RATED PRODUCT</StaticTitle>
          <PopularInfo>
          {myprod != "" ? myprod.map((item) => (
              <Product open={open} index={index}>
                <ProductImage open={open}>
                  <img
                    style={{ width: "100%" }}
                    src={item.productimage}
                    alt=""
                  />
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
                </ProductImage>
              </Product>
            )) : 
            <LottieContainer>
            <Lottie  animationData={me} style={{ width:"40%"}} /> 
            No Product Found
            </LottieContainer> 
            }
          </PopularInfo>
          <SliderSpan>
          { myprod.map((item, idx) => (
    <Span
        key={item.idPRODUCT}
        style={{
            width: `${idx === index ? "20px" : "0px"}`,
            backgroundColor: `${idx === index ? "#5AB8A8" : ""}`,
        }}
        onClick={() => {
            const newIndex = prod.findIndex(product => product.idPRODUCT === item.idPRODUCT);
            setIndex(newIndex !== -1 ? newIndex : 0);
        }}
    />
)) }
          </SliderSpan>
        </PopularContainer>

        <PopularContainer>
          <StaticTitle className="bg-red-700">
            TOP 10 SELLED PRODUCT
          </StaticTitle>
          <PopularProductList open={open}>
            {myProdS != "" ? myProdS.map((item) => (
              <ListItemConatiner key={item.idPRODUCT}>
                <ItemImage src={item.productimage} />
                <ItemDesc>
                  <ItemName>{item.productname}</ItemName>
                  <ItemType>Solds : {item.totalSold}</ItemType>
                </ItemDesc>
                <ItemPrice>$ {item.productprice}</ItemPrice>
              </ListItemConatiner>
            )) : 
            <LottieContainer>
            <Lottie  animationData={me} style={{ width:"40%"}} /> 
            No Product Found
            </LottieContainer> 
            }
          </PopularProductList>
        </PopularContainer>
      </StaticContainer>

      
    </Container>
  );
};

export default AdminPf;
