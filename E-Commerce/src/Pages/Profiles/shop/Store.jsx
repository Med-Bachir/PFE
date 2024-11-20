import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import newRequest from '../../../utils/newRequest';
import { Avatar } from 'antd';
import { IconButton } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from 'react-router-dom';
import Lottie from "lottie-react";
import me from "../../../Animation - 1716145973359.json";

const Container = styled.div`
  height: calc(100vh - 80px);
  padding: 32px;
  display: flex;
  justify-content: space-evenly;
`;

const StoreProfile = styled.div`
  padding: 20px;
  border-radius: 12px;
  background-color: white;
  height: 200px;
`;

const Shop = styled.div`
  display: flex;
  border-bottom: 1px solid #eee;
  padding: 0 0 8px;
  gap: 8px;
  align-items: center;
`;

const Circle = styled.div`
  width: 80px;
  height: 80px;
  border: 1.5px dashed #46A25D;
  border-radius: 50%;
  padding: 8px;
`;

const StorInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
`;

const Name = styled.span``;

const Products = styled.span``;

const StaticContainer = styled.span`
  display: flex;
  padding: 8px 0;
  justify-content: space-between;
`;

const Stats = styled.span`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 12px;
  gap: 8px;
`;

const Title = styled.span`
  display: flex;
`;

const Value = styled.span`
  display: flex;
  font-weight: 600;
  font-size: 18px;
`;

const Status = styled.span`
  padding: 4px 20px;
  border-radius: 4px;
  background-color: ${(props) => (props.status === 'Close' ? '#FFE6EC' : '#E0FAF6')};
  color: ${(props) => (props.status === 'Close' ? '#FF003F' : '#65CFBD')};
`;

const LottieContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Store = () => {
  const user = useSelector((state) => state.user?.currentUser);
  const [shops, setShops] = useState([]);
  
 

  useEffect(() => {
    const getShops = async () => {
      try {
        const res = await newRequest.get(`/shop/shops-seller-view/${user?.idUSER}`);
        console.log(user?.idUSER)
        console.log("Fetched shops:", res.data); // Debug log
        setShops(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    getShops();
  }, [user?.idUSER]);



  const handleDelete = async (id, status) => {
    try {
      if (status === 'Open') {
        const response = await newRequest.delete(`/shop/delete/${id}`);
        if (response.status === 200) {
          alert('Shop Deleted successfully.');
        }
      } else {
        const response = await newRequest.delete(`/shop/refuse-shop/${id}`);
        if (response.status === 200) {
          alert('Shop refused successfully.');
        }
      }
    } catch (error) {
      console.error('Failed to refuse shop:', error);
      alert('Failed to refuse shop. Please try again later.');
    }
  };

  console.log(shops)
  return (
    <Container>
      {shops.length > 0 ? (
        shops.map((shop) => (
          <Link to={`/Shops/${shop.ShopID}`} style={{ width: '35%', height: '200px' }} key={shop.ShopID}>
            <StoreProfile>
              <Shop>
                <Circle>
                  <Avatar src={shop.ShopImage} style={{ width: '100%', height: '100%' }} />
                </Circle>
                <StorInfo>
                  <Name>{shop.ShopName}</Name>
                  <Products>Total Products: {shop.TotalProducts}</Products>
                </StorInfo>
                <IconButton sx={{ float: 'right', marginLeft: 'auto', height: '40px' }} onClick={() => handleDelete(shop.ShopID, shop.ShopStatus)}>
                  <DeleteIcon sx={{ color: "#E92F4A" }} />
                </IconButton>
              </Shop>
              <StaticContainer>
                <Stats>
                  <Title>Orders:</Title>
                  <Value>{shop.TotalOrders}</Value>
                </Stats>
                <Stats style={{ alignItems: 'center', justifyContent: 'center', borderLeft: '1px dashed #eee' }}>
                  <Status status={shop.ShopStatus}>{shop.ShopStatus}</Status>
                </Stats>
              </StaticContainer>
            </StoreProfile>
          </Link>
        ))
      ) : (
        <LottieContainer>
          <Lottie animationData={me} style={{ width: '40%' }} />
        </LottieContainer>
      )}
    </Container>
  );
};

export default Store;
