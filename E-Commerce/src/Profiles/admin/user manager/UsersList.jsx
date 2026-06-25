import { Avatar, Box, Divider, IconButton, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";

import newRequest from "../../../utils/newRequest";

import AlertMessage from "../../../Components/Alert";
import Loading from "../../../Components/Pending/Loading";
import EmptyData from "../../../Components/Pending/EmptyData";
import { colorAccentDark, colorAccentDarkTransparent, colorAccentLight, colorAccentMain, colorAccentMedium, colorAccentMediumTransparent, colorAccentSoft, colorAccentSub, colorAccentSubDark, colorAccentTransparent, colorBackgroundBlack, colorPrimaryBlack, darkRed, grayBackground, lightMain, main, primaryTextColor, whiteTextColor } from "../../../Colors";
import { useSelector } from "react-redux";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import SearchComponent from "../../../features/Search";




const Container = styled.div`
padding: 32px;
height: calc(100vh - 80px);
overflow-y: auto;
`
const StaticContainer = styled.div`
background-color: ${props => props.theme == "light" ? whiteTextColor : colorPrimaryBlack};
color: ${props => props.theme == "light" ? colorPrimaryBlack : whiteTextColor };
contain: paint;
border-radius: 8px;
padding: 20px 0;
display: flex;
flex-direction: column;

`
const StaticTitle = styled.span`
font-size: 20px;
border-left: 4px ${main} solid;
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
  background-color: ${props => props.theme == "light" ? whiteTextColor  : colorPrimaryBlack};
  
overflow: auto;
&::-webkit-scrollbar {
    width: 6px;
    height:6px; /* width of the entire scrollbar */
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
 padding: 4px 0;
  align-items: center;
  justify-content: center;
color: ${props => props.theme == "light" ? colorPrimaryBlack : whiteTextColor };

  background-color: ${(props) =>
  props.type === "tag" ? props.theme == "light" ? main : colorAccentLight : props.theme == "light" ? whiteTextColor : colorAccentDarkTransparent};
   @media (max-width: 768px) {
  min-width: 200vh;
}
`;
const ColumnTag = styled.td`
text-align: center;
  flex: 2;
  color: ${whiteTextColor};
  font-weight: 300;
 
 padding: 8px 0;

  border-right: 1px solid ${props => props.theme == "light" ? whiteTextColor : colorAccentMediumTransparent };
`
const Column = styled.th`
  flex: 2;
  display: flex;
  align-items: center;
  
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
  
const UsersList = () => {
  const theme = useSelector(state => state.theme.mode)
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of shops per page

  const getUsers = async () => {
    try {
      const res = await newRequest.get("/users");
      setUsers(res.data);
      setFilteredRows(res.data)
      setLoading(true)
    } catch (err) {
      console.error("Error fetching users:", err);
    }finally {
      setTimeout(() => {

        setLoading(false)
      }, [1000])
    }
  };

  useEffect(() => {
    
    getUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      const response = await newRequest.delete(`/users/delete/${userId}`);
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


   const [filteredRows, setFilteredRows] = useState([]);
  
  
    const handleSearchResults = (rows) => {
      setFilteredRows(rows); // Update filtered rows in parent
      setCurrentPage(1)
    };

    const paginatedRows = filteredRows.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  
    const handlePageChange = (event, value) => {
      setCurrentPage(value);
    };
  
  return (
    <Container>
      <AlertMessage open={open} setOpen={setOpen} message={message} type={type} />

      <StaticContainer theme={theme} style={{padding:'20px 20px 20px 0', display:'flex',alignItems:'center' , flexDirection:'row' , justifyContent:'space-between'}}>
<SearchComponent data={users} onSearch={handleSearchResults} type={'Users'} />
        
      </StaticContainer>
  
  

      
      <Table theme={theme}>
        <Row theme={theme} type={"tag"}>
          <ColumnTag style={{flex:1}} >Category ID</ColumnTag>
          <ColumnTag>User Name</ColumnTag>
          <ColumnTag>Email</ColumnTag>
          <ColumnTag style={{flex:1}}>User Role</ColumnTag>
          <ColumnTag style={{flex:1}}>Creation Date</ColumnTag>
  
          <ColumnTag style={{ border: "none", flex: 1 }}>Action</ColumnTag>
        </Row>
        {paginatedRows.length > 0 && !loading ? 
          paginatedRows.map((item) => (
          <>
          <Row theme={theme} key={item.idUSER} type={"normal"}>
          <Column   style={{flex:1}}>
          <ColumnInfo
                  style={{
                    display: "flex",
                    backgroundColor: "transparent",
                    width: "100%",
                    alignItems: "center",
                    gap: 8,
                    color: theme == "light" ? primaryTextColor : whiteTextColor,
                    
                  }}
                  >
                  #ID :{item.idUSER}
                </ColumnInfo>
              </Column>
              
              <Column>
              <Avatar src={item.userimg == null ? 'e' : item.userimg} alt={item.username} sx={{bgcolor:theme == "light" ? main : colorAccentTransparent}} />{item.username}</Column>
              <Column style={{ textAlign:'left' }}><Text>{item.email}</Text></Column>
              <Column style={{alignItems: "center" ,flex:1}}>
                {" "}
                <ColumnInfo style={{backgroundColor:`${theme == 'light' ? lightMain : colorAccentLight}` , color:`${theme == 'light' ? main : colorAccentMain}` }}>
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
                    <DeleteIcon  sx={{ color: darkRed }} />
                  </IconButton>
                </ColumnInfo>
              </Column>
            </Row>
            <Divider />
          </>
        ))
        : loading ? 
        <Loading />
        : 
        <EmptyData />
      }
      </Table>
      <Box sx={{display:'flex' , alignContent:'center' , justifyContent:'center' , mt:2}}>

<Pagination
  count={Math.ceil((filteredRows?.length > 0 ? filteredRows?.length : users?.length) / itemsPerPage)}
  page={currentPage}
  onChange={handlePageChange}
  sx={{
    ".css-yuzg60-MuiButtonBase-root-MuiPaginationItem-root": {
      backgroundColor: theme === 'light' ? lightMain : colorAccentDarkTransparent,
      color: theme === "light" ? main : colorAccentMain
    },
    ".css-yuzg60-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected" : {
      backgroundColor: theme === 'light' ? main : colorAccentMain,
      color: whiteTextColor 
    }
  }}
  />
  </Box>
        </Container>
  )
}

export default UsersList
