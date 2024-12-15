import { Avatar, Divider, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import newRequest from "../../../utils/newRequest";
import AlertMessage from "../../../Components/Alert";
import HowToRegTwoToneIcon from '@mui/icons-material/HowToRegTwoTone';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import Loading from "../../../Components/Pending/Loading";
import EmptyData from "../../../Components/Pending/EmptyData";
import { colorAccentDarkTransparent, colorAccentLight, colorAccentMain, colorAccentMediumTransparent, colorErrorDark, colorErrorSoft, colorPrimaryBlack, darkRed, hovredImage, lightMain, lightSoftMain, main, primaryTextColor, softRed, whiteTextColor } from "../../../Colors";
import { useSelector } from "react-redux";


const Container = styled.div`
padding: 32px;
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
  background-color: ${props => props.theme == "light" ? whiteTextColor  : colorPrimaryBlack};
`;
const Row = styled.tr`
  display: flex;
  justify-content: space-between;
  padding: 4px;
  align-items: center;
color: ${props => props.theme == "light" ? colorPrimaryBlack : whiteTextColor };

background-color: ${(props) => props.type === "tag" ? props.theme == "light" ? main : colorAccentLight : props.theme == "light" ? whiteTextColor : colorAccentDarkTransparent};
@media (max-width: 768px) {
  min-width: 200vh;
}
`;
const ColumnTag = styled.td`
  flex: 2;
  color: ${whiteTextColor};
  font-weight: 300;
  border-right: 1px solid ${props => props.theme == "light" ? whiteTextColor : colorAccentMediumTransparent };
  text-align: center;
  padding: 8px 0;
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
const SeeButton = styled.button`
position: fixed;
width: 40px;
height: 40px;
border-radius: 8px;
background-color: ${hovredImage};
padding: 0;
z-index: 2;
opacity: 0;
color: ${whiteTextColor};
display: flex;
align-items: center;
justify-content: center;
&:hover{
  opacity: 1;
}

`
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
const DisabledBackground = styled.div`
width: 100%;
height:calc(100vh - 80px);
left: 0;
top: 0;
position: absolute;
backdrop-filter: brightness(40%);
-webkit-backdrop-filter: brightness(20%);
display: flex;
align-items: center;
justify-content: center;
z-index: 99;


`
const OwnersList = () => {
  const theme = useSelector(state => state.theme.mode)
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState("");
  const [loading, setLoading] = useState(false);
  const getUsers = async () => {
    try {
      const res = await newRequest.get("/seller");
      setUsers(res.data);
      setLoading(true)
    } catch (err) {}finally{
      setTimeout(() => {

        setLoading(false)
      } , [1000])
    }
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
          getUsers();
    } catch (error) {
      setMessage("Somthing is wrong!! Please try again later");
          setType("error");
          setOpen(true);
      console.error("Error deleting user:", error.response?.data?.error || error.message);
    }
  };
  const handleApprove = async (id) => {
    try {
      const response = await newRequest.put(`/seller/approve-seller/${id}`);
      console.log(response.data.message);
      setMessage("User Updated Successfully");
          setType("success");
          setOpen(true);
      getUsers();
    } catch (error) {
      setMessage("Somthing is wrong!! Please try again later");
          setType("error");
          setOpen(true);
      console.error("Error deleting user:", error.response?.data?.error || error.message);
    }

  }


  const handlShow = (img) => {
setShow(img)
  }
  return (
    <Container>
      <AlertMessage open={open} setOpen={setOpen} message={message} type={type} />

    <StaticContainer theme={theme}>
  <StaticTitle theme={theme}>All Owners</StaticTitle>
    </StaticContainer>
  
  
  
      
      <Table theme={theme}>
        <Row theme={theme} type={"tag"}>
          
          <ColumnTag>User Name</ColumnTag>
          <ColumnTag>Email</ColumnTag>
          <ColumnTag>User Role</ColumnTag>
          <ColumnTag>Creation Date</ColumnTag>
          <ColumnTag>Subscription</ColumnTag>
          <ColumnTag>Status</ColumnTag>
          <ColumnTag style={{flex:1}}>Recipt</ColumnTag>
  
          <ColumnTag style={{ border: "none", flex: 1 }}>Action</ColumnTag>
        </Row>
        {users != "" && !loading ? users.map((item) => (
          <>
            <Row theme={theme} key={item.idUSER} type={"normal"}>
              
              
              
              <Column><Avatar src={item.userimg == null ? 'e' : item.userimg} alt={item.username} sx={{bgcolor:'teal'}} />{item.username}</Column>
              <Column style={{ textAlign:'left' }}><Text>{item.email}</Text></Column>
              <Column style={{alignItems: "center" }}>
                {" "}
                <ColumnInfo style={{backgroundColor:`${theme == 'light' ? lightSoftMain : colorAccentLight}` , color:`${theme == 'light' ? main : colorAccentMain}` }}>
                {item.userRole}
                </ColumnInfo>
              </Column>
              <Column style={{ alignItems: "center" }}>
                <ColumnInfo>{item.createdAt}</ColumnInfo>
              </Column>
              <Column style={{ alignItems: "center" }}>
                <ColumnInfo>{item.subscription}</ColumnInfo>
              </Column>
              
              <Column style={{alignItems: "center" }}>
                {" "}
                <ColumnInfo style={{backgroundColor:`${item.approved == '1' ? theme == "light" ? lightSoftMain : colorAccentLight : theme == "light" ? softRed : colorErrorSoft}` , color:`${item.approved == '1' ? theme == "light" ? main : colorAccentMain : theme == "light" ? darkRed : 'red'}` }}>
                {item.approved == 0 ? "not Approved" : "Approved"}
                </ColumnInfo>
              </Column>
              <Column style={{ alignItems: "center" , justifyContent:'center' , flex:1 }}>
              <SeeButton onClick={() => handlShow(item.prof)}>
<VisibilityTwoToneIcon  />
              </SeeButton>
                <Avatar sx={{borderRadius:'8px' , objectFit:'contain'}} src={item.prof} />
              </Column>
              
  
              <Column style={{ border: "none", flex: 1 }} key={item.key}>
                <ColumnInfo
                  style={{
                    display: "flex",
                    backgroundColor: "transparent",
                    width: "100%",
                    justifyContent: "center",
                  }}
                  >{item.approved == 1 ? 
                    <></>
                    :
                    <IconButton onClick={() => handleApprove(item.idUSER)}>
                      <HowToRegTwoToneIcon sx={{color:main}}/>
                    </IconButton>
                    }
                  <IconButton onClick={() => handleDelete(item.idUSER)}>
                    <DeleteIcon sx={{ color: darkRed }} />
                  </IconButton>
                </ColumnInfo>
              </Column>
            </Row>
            <Divider />
          </>
        )) : loading ? <Loading /> : <EmptyData /> }
      </Table>
      {show == "" ? '' :
           <DisabledBackground  onClick={() => setShow('')}>
            <img style={{height:'65%' , objectFit:'contain'}} src={show} />
          </DisabledBackground> }
        </Container>
  )
}

export default OwnersList
