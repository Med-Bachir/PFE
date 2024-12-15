import { Avatar, Divider, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import CloseIcon from '@mui/icons-material/Close';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import Lottie from "lottie-react"
import me from "../../../assets/Lotties/Animation - 1716145973359.json"





import newRequest from "../../../utils/newRequest";

import DoneIcon from '@mui/icons-material/Done';
import { useNavigate } from "react-router-dom";
import AlertMessage from "../../../Components/Alert";
import Loading from "../../../Components/Pending/Loading";

import { colorAccentDark, colorAccentDarkTransparent, colorAccentLight, colorAccentMain, colorAccentMediumTransparent, colorAccentSoft, colorAccentSoftTransparent, colorAccentTransparent, colorBackgroundBlack, colorErrorDark, colorErrorSoft, colorPrimaryBlack, colorWarningDark, colorWarningSoft, darkOrange, darkRed, grayBackground, lightSoftMain, main, primaryTextColor, softOrange, softRed, whiteTextColor } from "../../../Colors";
import { useSelector } from "react-redux";


const Container = styled.div`
padding: 20px 32px;
overflow-y: auto;
display: flex;
flex-direction: column;
gap: 20px;
`


const StaticContainer = styled.div`
background-color: ${props => props.theme == "light" ? whiteTextColor : colorPrimaryBlack};
border-radius:8px;

`
const StaticTitle = styled.span`
margin: 20px 0;
padding-left: 20px;
border-left: 4px solid ${props => props.theme == "light" ? main : colorAccentMain};
color: ${props => props.theme == "light" ? primaryTextColor : whiteTextColor};
`

const Search = styled.div`
width: 50%;
display: flex;
justify-content: space-between;
height: 40px;
border-radius: 4px;
border: 1px solid ${props => props.theme == "light" ? grayBackground : colorBackgroundBlack};
background-color:${props => props.theme == "light" ? whiteTextColor : colorPrimaryBlack};

`
const Input = styled.input`
border: none;
outline: none;
width: 90%;
padding: 0 16px;
font-size: 16px;

background-color:${props => props.theme == "light" ? whiteTextColor : colorAccentDarkTransparent};
color:${props => props.theme == "light" ?primaryTextColor : whiteTextColor};

`
  


const Table = styled.table`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  contain: paint;
  height: calc(100vh - 230px);
  position: relative;
  overflow: auto;
  z-index:99;
  &::-webkit-scrollbar {
    width: 6px; 
    height:6px/* width of the entire scrollbar */
  }
  &::-webkit-scrollbar-track {
    background: transparent; /* color of the tracking area */
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(147, 147, 147, 0.7); /* color of the scroll thumb */
    border-radius: 20px; /* roundness of the scroll thumb */
    /* creates padding around scroll thumb */
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: rgba(147, 147, 147, 1); /* color of the scroll thumb */
    width: 8px;
    border-radius: 20px; /* roundness of the scroll thumb */
    /* creates padding around scroll thumb */
  }
  
`;
const Row = styled.tr`
  display: flex;
  justify-content: space-between;
  height: 50px;
  align-items: center;
  position: ${(props) =>
  props.type === "tag" ? "sticky" : ""};
  z-index: ${(props) =>
  props.type === "tag" ? 2 : 1};
  padding: ${(props) =>
  props.type === "tag" ? `24px 0` : `32px 0`};
  width:100%;
  top:0;
    background-color: ${(props) =>
  props.type === "tag" ? props.theme == "light" ? main : colorAccentDark : props.theme == "light" ? whiteTextColor : colorAccentDarkTransparent};
  
  @media (max-width: 768px) {
  min-width: 200vh;
}

  
`;
const ColumnTag = styled.td`
  flex: 2;
  color: ${whiteTextColor};
  text-align: center;
  font-weight: 300;
  border-right: 1px solid #cfcfcf;
`
const Column = styled.th`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: start;
  color: ${(props) =>
  props.theme == "light" ? colorPrimaryBlack : whiteTextColor};
  font-weight: 300;
  padding: 0 8px;
  text-align: left;
`;
const ColumnInfo = styled.th`
  color: ${(props) =>
  props.theme == "light" ? colorPrimaryBlack : whiteTextColor};
  font-weight: 300;
  width: 80px;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
  background-color: ${(props) =>
    props.status === "Open"
      ? props.theme == "light" ? lightSoftMain : colorAccentSoftTransparent :
       props.status === "Close" 
      ? props.theme == "light" ? softRed : colorErrorSoft
      : props.theme == "light" ? softOrange : colorWarningSoft};
  color: ${(props) =>
    props.status === "Open"
      ? props.theme == "light" ? main : colorAccentMain
      : props.status === "Close"
      ? props.theme == "light" ? darkRed :colorErrorDark
      : props.theme == "light" ? darkOrange : colorWarningDark};
`;
const LottieContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
`;

const ShopeList = () => {
  const theme = useSelector(state => state.theme.mode)
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const ColumnsTag = ['Image' , 'Shop Name' , 'Products' , 'Order' ,'Owner Name' ,'Status'];

const navigate = useNavigate();
  const [shops, setShops] = useState(null);

  const getShops = async () => {
    try {
      const res = await newRequest.get("/shop/shops-admin");
      setShops(res.data);
      setLoading(true)
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally{
      setTimeout(() => {
setLoading(false)
      }, [1000])
    }
  };
  useEffect(() => {
   
    getShops();
  }, []);

  console.log(shops)
  const handlClick = async (id,status) => {

    if(status == 'Open'){
navigate(`/Shops/${id}`);
    }else{
      try {
        const response = await newRequest.put(`/shop/approve-seller/${id}`);
        if (response.status === 200) {
          setMessage("Shop Accepted");
          setType("success");
          setOpen(true);
            // Optionally, you can add logic to refresh the list of shops or update the UI accordingly
        }
    getShops();

    } catch (error) {
        console.error('Failed to accept shop:', error);
        setMessage("Something is wrong!! Please try again later ");
        setType("error");
        setOpen(true);
    }
    }

  }
  const handleDelete = async (id , status) => {

   
      try {
        if(status == 'Open'){
          const response = await newRequest.delete(`/shop/delete/${id}`);
          if (response.status === 200) {
            setMessage("Shop Deleted Successfully");
            setType("success");
            setOpen(true);
    getShops();

              // Optionally, you can add logic to refresh the list of shops or update the UI accordingly
          }
        }else{
          const response = await newRequest.delete(`/shop/refuse-shop/${id}`);
        if (response.status === 200) {
          setMessage("Shop Refused");
          setType("error");
          setOpen(true);
    getShops();

            // Optionally, you can add logic to refresh the list of shops or update the UI accordingly
        }
        }
        
        
    } catch (error) {
        console.error('Failed to refuse shop:', error);
        setMessage("Something is wrong!! Please try again later");
        setType("error");
        setOpen(true);
    }
    

  }

  return (
    <Container>
      <AlertMessage open={open} setOpen={setOpen} message={message} type={type} />

      <StaticContainer theme={theme} style={{padding:'0 32px 0 0', display:'flex',alignItems:'center' , flexDirection:'row' , justifyContent:'space-between'}}>
        <StaticTitle theme={theme}>Active Shops </StaticTitle>
        <Search theme={theme} ><IconButton sx={{backgroundColor : theme == "light" ? main : colorAccentDark ,width:"10%" , height:"100%", borderRadius:'4px 0 0 4px'}}><PersonSearchIcon style={{color:whiteTextColor}} /></IconButton><Input theme={theme} placeholder="Enter Shop Name" /></Search>
        
      </StaticContainer>

    <StaticContainer theme={theme} style={{padding:'0',contain:'paint'}}>

    <Table theme={theme}>
      <Row theme={theme} type={"tag"}>
        {ColumnsTag.map((item) => (


          <ColumnTag style={{flex : `${item == 'Image' || item == 'Products' || item == 'Order'? '1' : '2'}`}}>{item}</ColumnTag>
        

        ))}
        <ColumnTag style={{ border: "none", flex: 1}}>Action</ColumnTag>
      </Row>
      {shops != "" && !loading ? 
      
      
      
        shops?.map((item) => (
        <>
        <Row theme={theme} key={item.ShopID} type={"normal"}>
        <Column theme={theme} style={{ flex: 1 , display:'flex' , alignItems:'center' }}>
        <Avatar src={item.ShopImage}  sx={{ width: 50, height: 50 , borderRadius:'4px' , border:`1px solid ${theme == "light" ? grayBackground : colorBackgroundBlack }` , objectFit:'contain'}} />
        </Column>
        <Column theme={theme}>
        <ColumnInfo
        style={{
          backgroundColor: "transparent",
          width: "100%",
         
          color: theme == "light" ? primaryTextColor : whiteTextColor,
          flex: 2 ,
          textAlign:'start',
          padding:'0 0 0 27%',
          fontSize:16
          
        }}
        >
        {item.ShopName}
        </ColumnInfo>
        </Column>
        <Column theme={theme} style={{alignItems: "center" , flex: 1 }}>{item.TotalProducts}</Column>
        <Column theme={theme}  style={{alignItems: "center" , flex: 1 }}>{item.TotalOrders}</Column>
        <Column theme={theme} style={{ flex: 2 , alignItems: "center" }}>{item.OwnerName}</Column>
        <Column theme={theme} style={{ alignItems: "center" ,flex:2  }}>
        <ColumnInfo theme={theme} status={item.ShopStatus}>{item.ShopStatus}</ColumnInfo>
        </Column>
        
        <Column style={{  flex: 1 }} key={item.ShopId}>
        <ColumnInfo
        style={{
          display: "flex",
          backgroundColor: "transparent",
          width: "100%",
          justifyContent: "center",
        }}
        >
        
        <div>
        <IconButton onClick={() => handlClick(item.ShopID,item.ShopStatus)}>
        {item.ShopStatus == 'Open' 
        ?
        <VisibilityTwoToneIcon sx={{ color: main }} />
        : <DoneIcon sx={{ color: main }} />}
        </IconButton>
        <IconButton onClick={() => handleDelete(item.ShopID , item.ShopStatus)}>
        {item.ShopStatus == 'Open' 
        ?
        <DeleteIcon sx={{ color: darkRed }} />
        
        : <CloseIcon sx={{ color: darkRed }} />}
        
        </IconButton>
        </div>
        
        </ColumnInfo>
        </Column>
        </Row>
        <Divider sx={{backgroundColor: theme == "light" ? grayBackground : colorBackgroundBlack}} />
        </>
      
      )) : loading ? <Loading /> : <LottieContainer style={{backgroundColor: theme == "light" ? whiteTextColor : colorBackgroundBlack}}>
      <Lottie  animationData={me} style={{ width:"40%"}} /> 
      </LottieContainer> }
    </Table>
      </StaticContainer>
      </Container>
  );
};

export default ShopeList;

