import { Avatar, Divider, IconButton } from "@mui/material";
import React from "react";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";

import PersonSearchIcon from '@mui/icons-material/PersonSearch';


const data = [
  {
    key: "1",
    ShopName: "Burger Bomb",
    ShopeImage: "vite.svg",
    Product: 72,
    Order:10,
    StoreOwner: "Jotaro",
    Status: "Active",
  },

];


import { StaticContainer, StaticTitle } from "../Pages/Profiles/admin/AdminPf";


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
  font-weight: 300;
  padding-left: 10px;
  border-right: 1px solid #0e0037;
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
    props.status === "Active"
      ? "#E0FAF6"
      : props.status === "Closed"
      ? "#FFE6EC"
      : "#FFF2E6"};
  color: ${(props) =>
    props.status === "Active"
      ? "#65CFBD"
      : props.status === "Closed"
      ? "#FF003F"
      : "#FF7F00"};
`;


const RefundsRepport = () => {
    const ColumnsTag = ['ID' , 'Shop Name' , 'Products' , 'Order' ,'Owner Name' ,'Status'];
  return (
    <Container>
    <StaticContainer style={{padding:'0 32px 0 0', display:'flex',alignItems:'center' , flexDirection:'row' , justifyContent:'space-between'}}>
      <StaticTitle>Shops </StaticTitle>
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
    {data.map((item) => (
        <>
        <Row key={item.key} type={"normal"}>
        <Column style={{ flex: 1 }}>ID:{item.key}</Column>
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
              <Avatar src={item.ShippingImage}  sx={{ width: 35, height: 35 , borderRadius:'4px'}} />
              {item.ShippingType}
            </ColumnInfo>
          </Column>
          
          <Column  style={{alignItems: "center" , flex: 1 }}>{item.Order}</Column>
          <Column style={{ alignItems: "center" ,flex: 2 }}>{item.ShippingPrice == 0 ? 'free' : '$' + item.ShippingPrice}</Column>
          <Column style={{ alignItems: "center" ,flex:2  }}>
            <ColumnInfo status={item.Availability}>{item.Availability}</ColumnInfo>
          </Column>

          <Column style={{  flex: 1 }} key={item.key}>
            <ColumnInfo
              style={{
                display: "flex",
                backgroundColor: "transparent",
                width: "100%",
                justifyContent: "center",
              }}
              >
            
                <>
                  <IconButton>
                    <VisibilityTwoToneIcon sx={{ color: "#007FFF" }} />
                  </IconButton>
                  <IconButton>
                    <DeleteIcon sx={{ color: "#E92F4A" }} />
                  </IconButton>
                </>
             
            </ColumnInfo>
          </Column>
        </Row>
        <Divider />
      </>
    ))}
  </Table>
    </StaticContainer>
    </Container>
  )
}

export default RefundsRepport
