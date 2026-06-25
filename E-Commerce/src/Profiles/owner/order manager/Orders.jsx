import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { colorAccentDark, colorAccentDarkTransparent, colorAccentLight, colorAccentMain, colorAccentMedium, colorAccentMediumTransparent, colorAccentSoft, colorAccentSoftTransparent, colorAccentSub, colorAccentSubDark, colorAccentTransparent, colorElementBackgroundGray, colorErrorDark, colorErrorSoft, colorHighlightDarkYellow, colorHighlightSoftYellow, colorPrimaryBlack, colorWarningDark, colorWarningSoft, darkOrange, darkYellow, elementGrayBackground, gradientBackground, grayBackground, lightMain, lightSoftMain, main, primaryTextColor, secondText, softOrange, softRed, softYellow, subColumnMain, whiteTextColor } from "../../../Colors";
import newRequest from "../../../utils/newRequest";
import { Avatar, Divider, FormControl, FormControlLabel, FormLabel, IconButton, InputLabel, MenuItem, Radio, RadioGroup, Select, Switch, Tooltip } from "@mui/material";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import MoreHorizTwoToneIcon from "@mui/icons-material/MoreHorizTwoTone";
import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone';
import AlertMessage from "../../../Components/Alert";
import Lottie from "lottie-react";
import me from "../../../assets/Lotties/Animation - 1716145973359.json"
import { useSelector } from "react-redux";
import EmptyData from "../../../Components/Pending/EmptyData";
import Loading from "../../../Components/Pending/Loading";
import LazyAvatar from "../../../Components/Pending/LazyAvatar";
const Container = styled.div`
 
  padding: 32px;
  overflow-y: auto;
  height: calc(100vh - 80px);

`;

const FilterContainer = styled.div`
  background-color: ${props => props.theme == "light" ? whiteTextColor : colorPrimaryBlack};
  color: ${props => props.theme == "light" ? colorPrimaryBlack :  whiteTextColor};
  border-radius: 4px;
  padding: 20px;
  width: 50%;
  margin-bottom: 20px;
  width: auto;
min-width: 200px;
overflow-x: auto;
&::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(147, 147, 147, 1);
    border-radius: 20px;
  }
`;

const Title = styled.span`
  font-size: 20px;
  font-weight: 500;
`;

const FilterList = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  
`;

const ListContainer = styled.div`
  background-color: ${props => props.theme == "light" ? whiteTextColor : colorAccentDarkTransparent};
  color: ${props => props.theme == "light" ? primaryTextColor : whiteTextColor};
  border-radius: 4px;
  contain: paint;
  padding-bottom: 32px;
  overflow: auto;
  
`;

const Tags = styled.div`
  display: flex;
  padding: 20px;
  background-color: ${props => props.theme == "light" ? main : colorAccentLight};
  color: ${whiteTextColor};
  text-align: center;
  width: auto;
min-width: 600px;
@media (max-width: 768px) {
  min-width: 200vh;
}
`;

const Tag = styled.div`
  flex: ${(props) => (props.tag === "ID" ? 1 : 3)};
  border-left: ${(props) => (props.tag === "ID" ? "" : "1px solid")};
 
`;

const Order = styled.div`
  display: flex;
  padding: 20px;
  width:auto;
min-width: 600px;
@media (max-width: 768px) {
  min-width: 200vh;
}
`;

const OrderTag = styled.div`
  flex: ${(props) => (props.tag === "Product" ? 3 : 2)};
  border-left: ${(props) => (props.tag === "Product" ? "" : "1px solid")};
`;

const Informations = styled.div`
  flex: ${(props) => (props.type === "ID" ? 1 : 3)};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 200ms;
 
`;

const OrderDetails = styled.div`
  background-color: ${props => props.theme == "light" ? whiteTextColor : primaryTextColor};
  margin: 0 20px;
  border-radius: 4px;
  max-height: ${(props) =>
    props.show ? "1200px" : "0"}; /* Adjust max-height based on your content size */
  overflow: hidden;
  transition: max-height 200ms ease-in-out; /* Smooth transition */
  display: flex;
  flex-direction: column;
  width: auto;
min-width: 600px;
@media (max-width: 768px) {
  min-width: 200vh;
}

`;

const Details = styled.div`
  padding: 20px;
  background-color: ${props => props.theme == "light" ? grayBackground : colorAccentSoftTransparent};
  border-radius: 4px;
  display: flex;
  align-items: center;
`;

const Detail = styled.div`
  flex: ${(props) => (props.type === "Product" ? 3 : 2)};
  font-size: 18px;
  align-items: center;
  justify-content: ${(props) => (props.type === "Product" ? "start" : "center")};
  display: flex;
  gap: 4px;
`;

const Circle = styled.div`
  
  
  background-color: ${(props) => props.color};
  height: 8px;
  width: 24px;
 border-radius: 8px;
 opacity: 0.6;
  
`;

const Status = styled.span`
  background-color: ${(props) => (props.status === 'Arrived' ? props.theme == "light" ? lightSoftMain : colorAccentLight : props.status === 'Waiting' ? props.theme == "light" ? softOrange : colorWarningSoft : props.theme == "light" ? softYellow : colorHighlightSoftYellow)};
  color: ${(props) => (props.status === 'Arrived' ? props.theme == "light" ? main : colorAccentMain : props.status === 'Waiting' ? props.theme == "light" ? darkOrange : colorWarningDark : props.theme == "light" ? darkYellow : colorHighlightDarkYellow)};
  padding: 8px 20px;
  border-radius: 4px;
`;
const LottieContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;

`

const rowTag = [
  "ID",
  "Phone Number",
  "Place" ,
  "Status",
  "State",
  "City",
  "Type",
  "Date",
  "Action",
];

const rowTagProduct = ["Product", "Color", "Size","Status","Current Place" ,"Quantity", "Price" , "Actions"];



const Orders = () => {
  const user = useSelector((state) => state.user?.currentUser);
  const theme = useSelector((state) => state.theme.mode);

  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [open, setOpen] = useState(false);

  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [edited, setEdited] = useState(null);
  const [status, setStatus] = useState("");
  const [place, setPlace] = useState("");
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    Waiting: false,
    "On Way": false,
    Arrived: false,
  });

  const [rows , setRows] = useState([]);



  
  const getOrders = async () => {
    try {
      let endpoint = `/orders/client/orders/${user?.idUSER}`;
      const activeStates = Object.keys(state).filter((key) => state[key]);
      if (activeStates.length > 0) {
        endpoint += `?progress=${activeStates.join(",")}`;
      }
      const res = await newRequest.get(endpoint);
      setOrders(res.data);
      setRows(res.data)
      setLoading(true)
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setTimeout(() => {
        
        setLoading(false)
      }, [1000])
    }
  };
  
  
  
  const requestSearch = (searchedVal) => {
    
    const filteredRows = orders?.filter((row) => {
      return (row.status?.toLowerCase()).includes(searchedVal == "All" ? "" : searchedVal?.toLowerCase());
    });
    setRows(filteredRows);
  };
  
  const handleToggleOrderDetails = (orderId) => {
    setSelectedOrderId(selectedOrderId === orderId ? null : orderId);
  };
  
  useEffect(() => {
    
    getOrders();
    requestSearch("All")

  },[]);
  const handleChange = (event) => {
    setState((prev) => ({ ...prev, [event.target.name]: event.target.checked }));
  };
  

  const handleUpdate = async (index, type, id, userId , owner) => {
    if (type === "submit") {
      try {
        await newRequest.put(`/orders/seller/update-orderitem-stats/${id}`, {
          status,
          currentplace: place,
          userId,
          owner
        });
        setMessage("Order updated successfully");
        setType("success");
        setOpen(true);
        setTimeout(() => getOrders(), 2000);
      } catch (err) {
        setMessage("Error updating order. Please try again.");
        setType("error");
        setOpen(true);
      }
    }
    setEdited((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleDelete = async (id) => {
    try {
      await newRequest.delete(`/order/client/delete-order/${id}`);
      setMessage("Order deleted successfully");
      setType("success");
      setOpen(true);
      setTimeout(() => getOrders(), 2000);
    } catch (err) {
      setMessage("Error deleting order. Please try again.");
      setType("error");
      setOpen(true);
    }
  };

  
const customTextField = {
  minWidth: 80, width: "80%"  , bgcolor:theme == "light" ? whiteTextColor : colorAccentMediumTransparent , borderRadius:1,
  

                "& .MuiOutlinedInput-root": {
                  
                  "&:hover fieldset": {
                    borderColor: theme == "light" ? lightMain : colorAccentSoft, // Hover border color
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: theme == "light" ? main : colorAccentMedium, // Focused border color
                  },
                },
                "& .MuiInputLabel-root": {
                  color: secondText, // Default label color
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: theme == "light" ? main : colorAccentMain, // Focused label color
                },
                "& .MuiInputLabel-root.Mui-error": {
                  color: "orange", // Error label color
                },
            ".css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input" : { color : theme == "light" ? primaryTextColor : elementGrayBackground}
              
  };
  return (
    <Container>
      <AlertMessage open={open} setOpen={setOpen} message={message} type={type} />
      <FilterContainer theme={theme}>
        <Title>Filter Orders</Title>
        <FilterList>
            <FormControl
              sx={{width:"100%" }}
            >
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="All"
              name="radio-buttons-group"
              row
              sx={{display:'flex' , justifyContent:'space-between' }}
              >
              {[ "All" , "Waiting", "On Way", "Arrived" ].map((status) => (
                
              <FormControlLabel value={status} onChange={() => requestSearch(status)} control={<Radio   sx={{
                color:main ,
                
                '&.Mui-checked': {
                  color: main,
                 
                },
              }} />} label={status} />

                
            ))}
            </RadioGroup>
          </FormControl>
           
        </FilterList>
      </FilterContainer>
      <ListContainer theme={theme}>
        <Tags theme={theme}>
          {rowTag.map((tag, index) => (
            <Tag key={index} tag={tag}>
              {tag}
            </Tag>
          ))}
        </Tags>
        {orders && !loading && orders.length > 0 ? (
          (rows == [] ? orders : rows).map((order, index) => (
            <div theme={theme} key={index}>
              <Order theme={theme}>
                <Informations type="ID">#{order?.orderId}</Informations>
                <Informations>0{order?.phone}</Informations>
                <Informations >
                {edited === index ? (
                    <FormControl  sx={customTextField} size="small">
                      <InputLabel sx={{color : theme == "light" ?  primaryTextColor : whiteTextColor}} >Places</InputLabel>
                      <Select
                      sx={{color : theme == "light" ?  primaryTextColor : whiteTextColor }}
                      label='Places'
                        value={place}
                        onChange={(e) => setPlace(e.target.value)}
                      >
                        <MenuItem  value="Mall Storage">Mall Storage</MenuItem>
                        <MenuItem value="Out For Delivery">Out For Delivery</MenuItem>
                        <MenuItem value={order?.state}>{order?.state}</MenuItem>
                        <MenuItem value={order?.city}>{order?.city}</MenuItem>
                      </Select>
                    </FormControl>
                  ) :(
                    <>
                    {order?.currentPlace}
                    </>
                  )
                  }
                </Informations>
                <Informations>
                {edited === index ? (
                      <FormControl  sx={customTextField}  size="small">
                      <InputLabel sx={{color : theme == "light" ?  primaryTextColor : whiteTextColor}}>Status</InputLabel>
                      <Select
                      sx={{color : theme == "light" ?  primaryTextColor : whiteTextColor }}
                        value={status}
                      label='Status'

                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <MenuItem value="Waiting">Waiting</MenuItem>
                        <MenuItem value="On Way">On Way</MenuItem>
                        <MenuItem value="Arrived">Arrived</MenuItem>
                      </Select>
                    </FormControl>
                  ) :(
                  
                    <Status theme={theme} status={order?.status}>{order?.status}</Status>
          )}
                </Informations>
                <Informations>{order?.state}</Informations>
                <Informations>{order?.city}</Informations>
                <Informations>{order?.type}</Informations>
                <Informations>{order?.dateOrder}</Informations>
                <Informations type="Action">
                  
                {edited === index ? (
                    <Tooltip title="Save">
                      <IconButton
                      color="success"
                        onClick={() => handleUpdate(index, "submit", order?.orderId, order?.clientId , user?.idUSER)}
                      >
                        <SaveTwoToneIcon sx={{color:main}} />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Edit">
                      <IconButton
                      color="success"
                        onClick={() => setEdited(index)}
                      >
                        <EditTwoToneIcon sx={{color:main}} />
                      </IconButton>
                    </Tooltip>
                  )}
                  <IconButton
                  color="secondary"
                    onClick={() => handleToggleOrderDetails(order?.orderId)}
                    sx={{ rotate: selectedOrderId === order?.orderId ? "90deg" : "0deg", transition: "200ms" }}
                  >
                    <MoreHorizTwoToneIcon color="secondary" />
                  </IconButton>
                  
                </Informations>
              </Order>
              <OrderDetails theme={theme} show={selectedOrderId === order?.orderId}>
                <Tags style={{backgroundColor: theme == "light" ? subColumnMain : colorAccentMedium}}>
                  {rowTagProduct.map((tag, index) => (
                    <OrderTag key={index} tag={tag}>
                      {tag}
                    </OrderTag>
                  ))}
                </Tags>
                {order?.products.map((product, index) => (
                  <Details theme={theme} key={index}>
                    <Detail type="Product">
                    <LazyAvatar
  src={product.image}
  sx={{ borderRadius: 2, width: 50, height: 50, mr: 4 , backgroundColor:'transparent' , border : '1px solid' , borderColor : theme === "light" ? elementGrayBackground : colorElementBackgroundGray}}
/>
                      {product.name}
                    </Detail>
                    <Detail>
                      {product.attributes?.color ? product.attributes?.color &&
                        product.attributes.color.split(",").map((c, i) => (
                          <Circle key={i} color={c} />
                        ))
                      
                      :
                       "/"} 
                    </Detail>
                    <Detail>{product.attributes?.size || "N/A"}</Detail>
                    <Detail>

                     
                    <Status theme={theme} status={product?.status}>{product?.status}</Status>
                  
                  </Detail>
                  <Detail>
                   
                    {product?.place}
                  
                  </Detail>
                    <Detail>{product.quantity}</Detail>
                    <Detail>${product.price.toFixed(2)}</Detail>
                    <Detail type="Action">
                  
                  <IconButton color="error" onClick={() => handleDelete(order?.orderId)}>
                    <DeleteTwoToneIcon color="error"  />
                  </IconButton>
                  
                </Detail>
                  </Details>
                ))}
              </OrderDetails>
            </div>
          ))
        ) : loading ? <Loading /> : <LottieContainer>
          <Lottie animationData={me} />
        </LottieContainer>
          
        }
      </ListContainer>
    </Container>
  );
};

export default Orders;
