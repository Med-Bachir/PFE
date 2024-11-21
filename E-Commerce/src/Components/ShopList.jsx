import { Avatar, Divider, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import CloseIcon from '@mui/icons-material/Close';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import Lottie from "lottie-react"
import me from "../Animation - 1716145973359.json"



import { StaticContainer, StaticTitle } from "../Pages/Profiles/admin/AdminPf";
import newRequest from "../utils/newRequest";
import DoneIcon from '@mui/icons-material/Done';
import { useNavigate } from "react-router-dom";
import AlertMessage from "./Alert";


const Container = styled.div`
padding: 0 32px;
overflow-y: scroll;
height: 500px;
`

const Search = styled.div`
width: 50%;
display: flex;
justify-content: space-between;
height: 40px;
border-radius: 4px;
border: 1px solid #eee;
background-color:#0e0037;

`
const Input = styled.input`
border: none;
outline: none;
width: 90%;
padding: 0 16px;
font-size: 16px;
`
  


const Table = styled.table`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  contain: paint;
`;
const Row = styled.tr`
  display: flex;
  justify-content: space-between;
  height: 50px;
  margin: 0 0 10px;
  align-items: center;
  background-color: ${(props) =>
  props.type === "tag" ? `#cbfef42a` : `#f8f8f85a`};
  
`;
const ColumnTag = styled.td`
  flex: 2;
  color: #0e0037;
  text-align: center;
  font-weight: 300;
  border-right: 1px solid #cfcfcf;
`
const Column = styled.th`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: start;
  color: #0e0037;
  font-weight: 300;
  padding: 0 8px;
  text-align: left;
`;
const ColumnInfo = styled.th`
  color: #000000;
  font-weight: 300;
  width: 80px;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
  background-color: ${(props) =>
    props.status === "Open"
      ? "#E0FAF6"
      : props.status === "Close"
      ? "#FFE6EC"
      : "#FFF2E6"};
  color: ${(props) =>
    props.status === "Open"
      ? "#65CFBD"
      : props.status === "Close"
      ? "#FF003F"
      : "#FF7F00"};
`;
const LottieContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
`;

const ShopeList = () => {
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [open, setOpen] = useState(false);
  const ColumnsTag = ['ID' , 'Shop Name' , 'Products' , 'Order' ,'Owner Name' ,'Status'];

const navigate = useNavigate();
  const [shops, setShops] = useState([]);

  const getShops = async () => {
    try {
      const res = await newRequest.get("/shop/shops-admin");
      setShops(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
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

      <StaticContainer style={{padding:'0 32px 0 0', display:'flex',alignItems:'center' , flexDirection:'row' , justifyContent:'space-between'}}>
        <StaticTitle>Active Shops </StaticTitle>
        <Search><IconButton sx={{width:"10%"}}><PersonSearchIcon style={{color:"white"}} /></IconButton><Input placeholder="Enter Shop Name" /></Search>
        
      </StaticContainer>

    <StaticContainer style={{padding:'0',contain:'paint'}}>

    <Table>
      <Row type={"tag"}>
        {ColumnsTag.map((item) => (


          <ColumnTag style={{flex : `${item == 'ID' || item == 'Products' || item == 'Order'? '1' : '2'}`}}>{item}</ColumnTag>
        

        ))}
        <ColumnTag style={{ border: "none", flex: 1}}>Action</ColumnTag>
      </Row>
      {shops.length == 0 
      ? 
      (

        <LottieContainer>
          <Lottie  animationData={me} style={{ width:"40%"}} /> 
          </LottieContainer> 
      )
      :
      (
        shops.map((item) => (
        <>
        <Row key={item.ShopID} type={"normal"}>
        <Column style={{ flex: 1 }}>#{item.ShopID}</Column>
        <Column>
        <ColumnInfo
        style={{
          display: "flex",
          backgroundColor: "transparent",
          width: "100%",
          alignItems: "center",
          gap: 8,
          color: "#0e0037",
          
          flex: 2 
        }}
        >
        <Avatar src={item.ShopImage}  sx={{ width: 35, height: 35 , borderRadius:'4px'}} />
        {item.ShopName}
        </ColumnInfo>
        </Column>
        <Column  style={{alignItems: "center" , flex: 1 }}>{item.TotalProducts}</Column>
        <Column  style={{alignItems: "center" , flex: 1 }}>{item.TotalOrders}</Column>
        <Column style={{ flex: 2 , alignItems: "center" }}>{item.OwnerName}</Column>
        <Column style={{ alignItems: "center" ,flex:2  }}>
        <ColumnInfo status={item.ShopStatus}>{item.ShopStatus}</ColumnInfo>
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
        
        <>
        <IconButton onClick={() => handlClick(item.ShopID,item.ShopStatus)}>
        {item.ShopStatus == 'Open' 
        ?
        <VisibilityTwoToneIcon sx={{ color: "#007FFF" }} />
        : <DoneIcon sx={{ color: "#007FFF" }} />}
        </IconButton>
        <IconButton onClick={() => handleDelete(item.ShopID , item.ShopStatus)}>
        {item.ShopStatus == 'Open' 
        ?
        <DeleteIcon sx={{ color: "#E92F4A" }} />
        
        : <CloseIcon sx={{ color: "#E92F4A" }} />}
        
        </IconButton>
        </>
        
        </ColumnInfo>
        </Column>
        </Row>
        <Divider />
        </>
      
      )))}
    </Table>
      </StaticContainer>
      </Container>
  );
};

export default ShopeList;

