import React, { useEffect, useState } from "react";
import styled from "styled-components";
import newRequest from "../../../utils/newRequest";
import { Avatar, Divider, Fab, FormControl, FormControlLabel, IconButton, InputLabel, MenuItem, Select, Switch, Tooltip } from "@mui/material";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import MoreHorizTwoToneIcon from "@mui/icons-material/MoreHorizTwoTone";
import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone';
import AlertMessage from "../../../Components/Alert";
import Lottie from "lottie-react";
import me from "../../../assets/Lotties/Animation - 1716145973359.json"
import { useSelector } from "react-redux";
import ControlPointTwoToneIcon from '@mui/icons-material/ControlPointTwoTone';
import { Link } from "react-router-dom";
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import Loading from "../../../Components/Pending/Loading";
import EmptyData from "../../../Components/Pending/EmptyData";
import { colorAccentDark, colorAccentDarkTransparent, colorAccentLight, colorAccentMedium, colorAccentMediumTransparent, colorAccentSoft, colorAccentSoftTransparent, colorPrimaryBlack, main, primaryTextColor, subColumnMain, subSubColumnMain, whiteTextColor } from "../../../Colors";
import LazyAvatar from "../../../Components/Pending/LazyAvatar";
const Container = styled.div`
 
  padding: 32px;
  overflow-y: auto;
  height: calc(100vh - 80px);
 
`;




const ListContainer = styled.div`
  background-color: ${props => props.theme == "light" ? whiteTextColor : colorAccentDarkTransparent};
  color: ${props => props.theme == "light" ? primaryTextColor : whiteTextColor};
  border-radius: 4px;
  contain: paint;
  padding-bottom: 32px;
  overflow: auto;
  height: calc(100vh - 150px);
  &::-webkit-scrollbar {
    width: 6px; /* width of the entire scrollbar */
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

const Tags = styled.div`
position: sticky;
top: 0;
  display: flex;
  padding: 20px;
  background-color: ${props => props.type == "Container" ? props.theme == "light" ? main : colorAccentDark : props.type == "Sub" ? props.theme == "light" ? subColumnMain : colorAccentSoft : props.type == "Type"  ? props.theme == "light" ? subSubColumnMain : colorAccentMedium: ''} ;
  color: ${whiteTextColor};
  text-align: center;
  width: auto;
min-width: 600px;
z-index: ${props => props.type == "Container" ? 2 : 1};
`;

const Tag = styled.div`
  flex: ${(props) => (props.tag === "ID" || props.tag === "Action" || props.tag === "Icon" ? 1 : 3)};
  border-left: ${(props) => (props.tag === "ID" ? "" : "1px solid")};
`;

const Order = styled.div`
  display: flex;
  padding: 20px;
  width:auto;
min-width: 600px;
`;
const Informations = styled.div`
  flex: ${(props) => (props.type === "ID" || props.type === "Action" || props.type === "Icon" ? 1 : 3)};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 200ms;
`;

const OrderDetails = styled.div`
  background-color: ${props => props.type == "sub" ? props.theme == "light" ? "#f9f9f950" : colorAccentSoftTransparent : props.theme == "light" ? "#f9f9f9" : colorAccentMediumTransparent} ;
  margin: 0 20px;
  border-radius: 4px;
  max-height: ${(props) =>
    props.show ? "2000px" : "0"}; /* Adjust max-height based on your content size */
  overflow: hidden;
  transition: max-height 200ms ease-in-out; /* Smooth transition */
  display: flex;
  flex-direction: column;
  width: auto;
min-width: 600px;
`;






const LottieContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;

`
const Icon = styled.img`
width: 30px;
height:30px;
filter: ${props => props.theme === "light" ? "brightness(1) invert(0)" : "brightness(0) invert(1)"};

`


const rowTagCat = [
  "ID",
  "Icon",
  "name",
  "Products",
  "Action",
  
];

const rowTagSub = [ "ID",
  "Icon",
  "name",
  "Products",
  "Action",];
  
const rowTagType = [ "ID",
  "Icon",
  "name",
  "Products",
  "Action"
  ];

  const CategoryList = () => {
    const theme = useSelector(state => state.theme.mode)
    const [categories, setCategories] = useState([]);

  const [message, setMessage] = useState('');
  const [type, setType] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedSub, setSelectedSub] = useState(null);
  const [loding , setLoading] = useState(false)
  
  const getCategories = async () => {
    try {
      const res = await newRequest.get(`/category/getallcat`);
      console.log("Fetched categories:", res.data);
      setCategories(res.data);
     setLoading(true)
    } catch (err) {
      console.error("Error fetching categories:", err);
    }finally{
      setTimeout(() => {
        setLoading(false)
      } , [1000])
    }
  };
  
  useEffect(() => {
    getCategories();
    
  }, []);

  

  const handleToggleOrderDetails = (orderId , type) => {
    type === "Cat" ? setSelectedOrderId(selectedOrderId === orderId ? null : orderId) : type === "Sub" ? setSelectedSub(selectedSub === orderId ? null : orderId) : console.log('error')
  };


  const handleDelete = async (id , type) => {
    try {
    switch (type){
      case 'cat':
        try{

          await newRequest.delete(`/category/delete-cat/${id}`);
          setMessage("Category deleted successfully");
          setType("success");
          setOpen(true);
         
            getCategories()
          
        }catch{
          setMessage("You can't delete a category that have subs and types");
          setType("error");
          setOpen(true);
        }
        break;
        case 'sub' :
          try{
          await newRequest.delete(`/category/delete-sub/${id}`);
          setMessage("Sub Category deleted successfully");
          setType("success");
          setOpen(true);
          
            getCategories()
          
        }catch{
          setMessage("You can't delete a sub that have types");
          setType("error");
          setOpen(true);
        }
        break;
        case 'type' :
          await newRequest.delete(`/category/delete-type/${id}`);
          setMessage("type deleted successfully");
          setType("success");
          setOpen(true);
          
            getCategories()
          

          break;
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong, please contact us.");
      setType("error");
      setOpen(true);
    }
  };

 
  

  return (
    <Container>
      <AlertMessage open={open} setOpen={setOpen} message={message} type={type} />
      <ListContainer theme={theme}>
        <Tags theme={theme} type="Container">
          {rowTagCat.map((tag, index) => (
            <Tag key={index} tag={tag} >{tag}</Tag>
          ))}
        </Tags>
        {categories != "" && !loding ? categories.length > 0 ? categories.map((cat, index) => (
          <div key={index}>
            <Order theme={theme}>
              <Informations type="ID">#{cat?.id}</Informations>
              <Informations type="Icon">
              <LazyAvatar
  src={cat?.icon}
  sx={{
    width: 30,
    height:30,
    bgcolor:'transparent',
    borderRadius:'4px' ,
    filter: theme === "light" ? "brightness(1) invert(0)" : "brightness(0) invert(1)" 
    }}
/>
    
               </Informations>
              <Informations>
                
                  {cat?.name}
                
              </Informations>
              <Informations>{cat?.productCount}</Informations>
              <Informations type="Action">
              <Tooltip title='Delete' arrow>

                <IconButton color="error" onClick={() => handleDelete(cat?.id , 'cat')}>
                  <DeleteTwoToneIcon color="error" />
                </IconButton>
              </Tooltip>
                <IconButton
                color="secondary"
                  onClick={() => handleToggleOrderDetails(cat?.id , 'Cat')}
                  sx={{ rotate: selectedOrderId === cat?.id ? "90deg" : "0", transition: "200ms" }}
                >
                  <MoreHorizTwoToneIcon color="secondary" />
                </IconButton>
              </Informations>
            </Order>
            <OrderDetails theme={theme} type="sub" show={selectedOrderId === cat?.id}>
              <Tags type="Sub" theme={theme}>
                {rowTagSub.map((tag, index) => (
                  <Tag key={index} tag ={tag}>{tag}</Tag>
                ))}
              </Tags>
              {cat?.subcategories && cat.subcategories.map((subcategory, idx) => (
                <div key={idx}>
                  <Order theme={theme}>
                    <Informations type="ID">#{subcategory?.id}</Informations>
                    <Informations type="Icon">
                     
                      <LazyAvatar
  src={subcategory?.subIcon}
  sx={{
    width: 30,
    height:30,
    bgcolor:'transparent',
    borderRadius:'4px' ,
    filter: theme === "light" ? "brightness(1) invert(0)" : "brightness(0) invert(1)" 
    }}
/>
                      </Informations>
                    <Informations>
                      
                        {subcategory?.subname}
                      
                    </Informations>
                    <Informations>{subcategory?.productCount}</Informations>
                    <Informations type="Action">
                    <Tooltip title='Delete' arrow>

                      <IconButton onClick={() => handleDelete(subcategory?.id , 'sub')}>
                        <DeleteTwoToneIcon color="error" />
                      </IconButton>
                      </Tooltip>
                      <IconButton
                        onClick={() => handleToggleOrderDetails(subcategory?.id , 'Sub')}
                        sx={{ rotate: selectedSub === subcategory?.id ? "90deg" : "0", transition: "200ms" }}
                      >
                        <MoreHorizTwoToneIcon color="secondary" />
                      </IconButton>
                    </Informations>
                    
                  </Order>
                  <OrderDetails theme={theme}  show={selectedSub === subcategory?.id}>
              <Tags theme={theme} type="Type">
                {rowTagType.map((tag, index) => (
                  <Tag key={index} tag={tag}>{tag}</Tag>
                ))}
              </Tags>

              
              {subcategory?.types && subcategory?.types.map((type, idx) => (
                <div key={idx}>
                  <Order>
                    <Informations type="ID">#{type?.id}</Informations>
                    <Informations type="Icon">
                    <LazyAvatar
  src={type?.icon}
  sx={{
    width: 30,
    height:30,
    bgcolor:'transparent',
    borderRadius:'4px' ,
    filter: theme === "light" ? "brightness(1) invert(0)" : "brightness(0) invert(1)" 
    }}
/>
                    </Informations>
                    <Informations>
                      
                        {type?.name}
                      
                    </Informations>
                    <Informations>{type?.productCount}</Informations>
                    <Informations type="Action">
                    <Tooltip title='Delete' arrow>

                      <IconButton onClick={() => handleDelete(type?.id , 'type')}>
                        <DeleteTwoToneIcon color="error" />
                      </IconButton>
                    </Tooltip>
                      
                    </Informations>
                  </Order>
                  
                </div>
              ))}
            </OrderDetails>
                  
                </div>
              ))}
            </OrderDetails>
          </div>
        )) : (
          <LottieContainer>
            <Lottie animationData={me} style={{ width: "40%" }} />
            No Orders Found
          </LottieContainer>
        ) : loding ? 
      <Loading />
    : <EmptyData />}
      </ListContainer>

      <Link to={'/add-cat'}>
      <Tooltip title='add category' arrow>
      <Fab color="success"  aria-label="add" sx={{position:'absolute' , right : 32 , bottom:'108px' , bgcolor:main}}>
        <ControlPointTwoToneIcon sx={{color : whiteTextColor}} />
 
</Fab>
      </Tooltip>
      </Link>
    </Container>
  );
};
  
  
  export default CategoryList;
