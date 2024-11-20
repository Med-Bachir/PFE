import { Avatar, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../Components/Header";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

import LocationOnTwoToneIcon from "@mui/icons-material/LocationOnTwoTone";
import LocalShippingTwoToneIcon from "@mui/icons-material/LocalShippingTwoTone";
import ApartmentTwoToneIcon from "@mui/icons-material/ApartmentTwoTone";
import WhereToVoteTwoToneIcon from "@mui/icons-material/WhereToVoteTwoTone";
import LockTwoToneIcon from "@mui/icons-material/LockTwoTone";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/apiCalls";
import newRequest from "../utils/newRequest";

const Container = styled.div`
 height: calc(100vh - 80px);
 
`;
const OrderContainer = styled.div`
  height: calc(100vh - 80px);

  contain: paint;

  background-color: #f3f3f3;
  display: flex;
  padding: 32px 32px 32px;

  gap: 32px;
  contain: paint;
  overflow-y: auto;
`;

const Left = styled.div`
  width: 26%;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  
  
`;

const Total = styled.div`
  padding: 32px 44px;
  background-color: white;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const Text = styled.span`
  font-weight: 600;
`;
const Statics = styled.div`
  display: flex;
  padding: 16px 0;
  border-top: 1px dashed #dbdbdb;
`;
const TotalOrder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  font-size: 14px;

  padding: 8px 4px;
  gap: 8px;
  border-left: ${(props) =>
    props.position == "center" ? "1px dashed #dbdbdb" : ""};
  border-right: ${(props) =>
    props.position == "center" ? "1px dashed #dbdbdb" : ""};
`;
const Type = styled.span``;
const Options = styled.div`
  background-color: white;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 20px;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const ProfileInfoContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
`;

const Name = styled.span`
  font-weight: 500;
`;
const Email = styled.span`
  font-size: 12px;
  color: #b5b5b5;
`;

const Option = styled.div`
  display: flex;

  justify-content: center;
`;
const Button = styled.button`
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #50ba6a;
`;

const OptionLink = styled.span``;

const Right = styled.div`
  width: 71%;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 80px);
 
 
`;

const ClientPf = () => {
  const user = useSelector((state) => state.user?.currentUser);

const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleLogOut = () => {
    logout(dispatch);
    navigate("/login");
  };



  const [orders ,setOrders] = useState([]);



    useEffect(() => {
        const getOrders = async () => {
          try {
            
              const res = await newRequest.get(`/users/orders/status-count/${user?.idUSER}`);
              setOrders(res.data);
           
          } catch (err) {
            console.error("Error fetching users:", err);
          }
        };
        getOrders();
      }, [user?.idUSER]);
     
  return (
    <Container>
      <OrderContainer>
        <Left>
          <Total>
            <Text>Orders</Text>
            <Statics>
              <TotalOrder>
                {" "}
                {orders.Waiting} <Type>Wiating</Type>
              </TotalOrder>
              <TotalOrder position="center">
                {" "}
                {orders.Arrived} <Type>Arrived</Type>
              </TotalOrder>
              <TotalOrder>
                {" "}
                {orders["On Way"]} <Type>On Way</Type>
              </TotalOrder>
            </Statics>
          </Total>
          <Options>
            <Link to='/Client'>
              <OptionLink>My Profile</OptionLink>
            </Link>
            <Link to='wishlist'>
              <OptionLink>My WishList</OptionLink>
            </Link>
            <Link to='Orders'>
              <OptionLink>My Orders</OptionLink>
            </Link>
            <Button style={{padding:0, color:'black',background:'transparent'}} onClick={handleLogOut}>
              <OptionLink >Log Out</OptionLink>
            </Button>
          </Options>
          <Options>
            <ProfileContainer>
              <Avatar
                src="e"
                alt={user?.username}
                sx={{ width: 80, height: 80, bgcolor: "green" }}
              />
              <ProfileInfoContainer>
                <Name>{user?.username}</Name>
                <Email>{user?.email}</Email>
              </ProfileInfoContainer>
            </ProfileContainer>
            <Option>
              <Button>
                <LockTwoToneIcon />
                Change Password
              </Button>
            </Option>
          </Options>
        </Left>

        <Right>
          <Outlet />
        </Right>
      </OrderContainer>
    </Container>
  );
};

export default ClientPf;
