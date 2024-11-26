import { Avatar, Divider, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import newRequest from "../utils/newRequest";
import AlertMessage from "./Alert";


const Container = styled.div`
padding: 32px;
`
const StaticContainer = styled.div`
background-color: white;
contain: paint;
border-radius: 8px;
padding: 20px 0;
display: flex;
flex-direction: column;
`
const StaticTitle = styled.span`
font-size: 20px;
border-left: 4px teal solid;
padding: 0 20px;
display: flex;
align-items: center;
justify-items: center;
`

const Table = styled.table`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 8px;
  margin-top: 20px;
  background-color: white;
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
  align-items: center;
  color: #0e0037;
  font-weight: 300;
  padding: 0 8px;
  gap: 8px;
  overflow: auto;
text-overflow: ellipsis;
&::-webkit-scrollbar {
    height:3px; /* width of the entire scrollbar */
  }
  &::-webkit-scrollbar-track {
    background: transparent; /* color of the tracking area */
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(
      147,
      147,
      147,
      0.543
    ); /* color of the scroll thumb */
    border-radius: 20px; /* roundness of the scroll thumb */
    /* creates padding around scroll thumb */
  }

  
`;
const ColumnInfo = styled.th`
  color: #000000;
  font-weight: 300;
 width: 100%;
  padding: 4px 12px;
 
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
  
`;

const Text = styled.span`

   
flex: 1;

`;
const OwnersList = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [open, setOpen] = useState(false);
  const getUsers = async () => {
    try {
      const res = await newRequest.get("/seller");
      setUsers(res.data);
    } catch (err) {}
  };
  useEffect(() => {
    
    getUsers();
  }, []);
  console.log(users)
  const handleDelete = async (userId) => {
    try {
      const response = await newRequest.delete(`/seller/delete/${userId}`);
      console.log(response.data.message);
      setMessage("User Deleted Successfully");
          setType("success");
          setOpen(true);
      setUsers((prevUsers) => prevUsers.filter((user) => user.idUSER !== userId));
    } catch (error) {
      setMessage("Somthing is wrong!! Please try again later");
          setType("error");
          setOpen(true);
      console.error("Error deleting user:", error.response?.data?.error || error.message);
    }
  };
  return (
    <Container>
      <AlertMessage open={open} setOpen={setOpen} message={message} type={type} />

    <StaticContainer >
  <StaticTitle>All Owners</StaticTitle>
    </StaticContainer>
  
  
  
      
      <Table>
        <Row type={"tag"}>
          <ColumnTag style={{flex:1}} >Category ID</ColumnTag>
          <ColumnTag>User Name</ColumnTag>
          <ColumnTag>Email</ColumnTag>
          <ColumnTag style={{flex:1}}>User Role</ColumnTag>
          <ColumnTag style={{flex:1}}>Creation Date</ColumnTag>
  
          <ColumnTag style={{ border: "none", flex: 1 }}>Action</ColumnTag>
        </Row>
        {users.map((item) => (
          <>
            <Row key={item.idUSER} type={"normal"}>
              <Column   style={{flex:1}}>
                <ColumnInfo
                  style={{
                    display: "flex",
                    backgroundColor: "transparent",
                    width: "100%",
                    alignItems: "center",
                    gap: 8,
                    color: "#0e0037",
                  
                  }}
                  >
                  #ID :{item.idUSER}
                </ColumnInfo>
              </Column>
              
              <Column><Avatar src={item.userimg == null ? 'e' : item.userimg} alt={item.username} sx={{bgcolor:'teal'}} />{item.username}</Column>
              <Column style={{ textAlign:'left' }}><Text>{item.email}</Text></Column>
              <Column style={{alignItems: "center" ,flex:1}}>
                {" "}
                <ColumnInfo style={{backgroundColor:`${item.userRole == 'seller' ? '#64E98632' : '#02dae91b'}` , color:`${item.userRole == 'seller' ? '#50BA6A' : '#02ADBA'}` }}>
                {item.userRole}
                </ColumnInfo>
              </Column>
              <Column style={{ alignItems: "center" , flex:1 }}>
                <ColumnInfo>{item.createdAt}</ColumnInfo>
              </Column>
  
              <Column style={{ border: "none", flex: 1 }} key={item.key}>
                <ColumnInfo
                  style={{
                    display: "flex",
                    backgroundColor: "transparent",
                    width: "100%",
                    justifyContent: "center",
                  }}
                  >
                  <IconButton onClick={() => handleDelete(item.idUSER)}>
                    <DeleteIcon sx={{ color: "#E92F4A" }} />
                  </IconButton>
                </ColumnInfo>
              </Column>
            </Row>
            <Divider />
          </>
        ))}
      </Table>
        </Container>
  )
}

export default OwnersList
