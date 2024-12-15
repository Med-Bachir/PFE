import { Avatar, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../../Components/Header";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

import LocationOnTwoToneIcon from "@mui/icons-material/LocationOnTwoTone";
import LocalShippingTwoToneIcon from "@mui/icons-material/LocalShippingTwoTone";
import ApartmentTwoToneIcon from "@mui/icons-material/ApartmentTwoTone";
import WhereToVoteTwoToneIcon from "@mui/icons-material/WhereToVoteTwoTone";
import LockTwoToneIcon from "@mui/icons-material/LockTwoTone";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/apiCalls";
import newRequest from "../../utils/newRequest";
import { colorAccentDarkTransparent, colorAccentMoreTransparent, colorAccentSub, colorAccentTransparent, colorBackgroundBlack, colorBackgroundGray, colorPrimaryBlack, elementGrayBackground, grayBackground, lightMain, main, primaryTextColor, secondaryTextColor, transparentMain, whiteTextColor } from "../../Colors";

const Container = styled.div`
 height: calc(100vh - 80px);
`;
const OrderContainer = styled.div`
  height: calc(100vh - 80px);

  

  background-color: ${({theme}) => theme == "light" ? grayBackground : colorBackgroundGray};
  display: flex;
  padding: 32px 32px 0px;
  gap: 32px;
  
  overflow-y: auto;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    height: auto;
padding-bottom: 32px ;
  }
`;

const Left = styled.div`
  width: 26%;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 768px) {
    width: 100%;
   

  }
  
`;

const Total = styled.div`
  padding: 20px;
  background-color: ${({theme}) => theme == "light" ? whiteTextColor : colorPrimaryBlack};
  color: ${({theme}) => theme == "light" ? primaryTextColor : elementGrayBackground};
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
  padding-top: 8px;
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
   background-color: ${({theme}) => theme == "light" ? whiteTextColor : colorPrimaryBlack};
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
  color: ${({theme}) => theme == "light" ? primaryTextColor : elementGrayBackground};

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
  color: ${secondaryTextColor};
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
      background-color: ${props => props.theme == "light" ? "#f8f8f8 ": colorAccentDarkTransparent };
      color: ${props => props.theme == "light" ? main : colorAccentSub};
  &:hover {
          background-color: ${props => props.theme == "light" ? "#e0e0e0":  colorBackgroundBlack};
      transform: translateY(2px);
    }
`;

const OptionLink = styled.span`
   color: ${({theme}) => theme == "light" ? primaryTextColor : elementGrayBackground};
`;

const Right = styled.div`
  width: 71%;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 130px);
  overflow: auto;
  @media (max-width: 768px) {
    width: 100%;
   

  }
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background-color: ${({theme}) => theme == "light" ? lightMain : colorAccentMoreTransparent};
    border-radius: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(147, 147, 147, 0.543);
    border-radius: 20px;
  }
 
`;

const ClientPf = () => {
  const user = useSelector((state) => state.user?.currentUser);
  const theme = useSelector((state) => state.theme.mode);

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
    <Container theme={theme}>
      <OrderContainer theme={theme}>
        <Left theme={theme}>
          <Total theme={theme}>
            <Text>Orders</Text>
            <Statics>
              <TotalOrder>
                {" "}
                {orders.Waiting == null ? 0 : orders.Waiting } <Type>Waiting</Type>
              </TotalOrder>
              <TotalOrder position="center">
                {" "}
                {orders.Arrived} <Type>Arrived</Type>
              </TotalOrder>
              <TotalOrder>
                {" "}
                {orders["On Way"] == null ? 0 : orders["On Way"]} <Type>On Way</Type>
              </TotalOrder>
            </Statics>
          </Total>
          <Options theme={theme} >
            <Link to='/Client'>
              <OptionLink theme={theme}>My Profile</OptionLink>
            </Link>
            <Link to='wishlist'>
              <OptionLink theme={theme}>My WishList</OptionLink>
            </Link>
            <Link to='Orders'>
              <OptionLink theme={theme}>My Orders</OptionLink>
            </Link>
            <Button style={{padding:0, color:primaryTextColor ,background:'transparent'}} onClick={handleLogOut}>
              <OptionLink theme={theme} >Log Out</OptionLink>
            </Button>
          </Options>
          <Options theme={theme}>
            <ProfileContainer theme={theme}>
              <Avatar
                src={user?.userimg == null ? "e" : user?.userimg }
                alt={user?.username}
                sx={{ width: 70, height: 70, bgcolor: theme == "light" ?  main : colorAccentDarkTransparent }}
              />
              <ProfileInfoContainer theme={theme}>
                <Name>{user?.username}</Name>
                <Email>{user?.email}</Email>
              </ProfileInfoContainer>
            </ProfileContainer>
            <Option>
              <Button theme={theme}>
                <LockTwoToneIcon />
                Change Password
              </Button>
            </Option>
          </Options>
        </Left>

        <Right theme={theme}>
          <Outlet />
        </Right>
      </OrderContainer>
    </Container>
  );
};

export default ClientPf;
