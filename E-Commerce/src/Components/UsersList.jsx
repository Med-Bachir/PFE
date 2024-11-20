import { Avatar, Divider, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import { Container } from "./Shipping";
import { StaticContainer, StaticTitle } from "../Pages/Profiles/admin/AdminPf";
import newRequest from "../utils/newRequest";





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
  justify-content: center;
  background-color: ${(props) =>
  props.type === "tag" ? `#cbfef42a` : `#f8f8f85a`};
  
`;
const ColumnTag = styled.td`
text-align: center;
  flex: 2;
  color: #0e0037;
  font-weight: 300;
  padding-left: 10px;
  border-right: 1px solid #c4c4c4;
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
const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await newRequest.get("/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    getUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      const response = await newRequest.delete(`/users/delete/${userId}`);
      console.log(response.data.message);
      setUsers((prevUsers) => prevUsers.filter((user) => user.idUSER !== userId));
    } catch (error) {
      console.error("Error deleting user:", error.response?.data?.error || error.message);
    }
  };
  return (
    <Container>
    <StaticContainer style={{padding:0}}>
  <StaticTitle>All Users</StaticTitle>
    </StaticContainer>
    <StaticContainer style={{padding:0}}>
  
  
  
      
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
                    <DeleteIcon  sx={{ color: "#E92F4A" }} />
                  </IconButton>
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

export default UsersList
