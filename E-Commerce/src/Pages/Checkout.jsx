import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { colorAccentDark, colorAccentDarkTransparent, colorAccentLight, colorAccentMain, colorAccentMedium, colorAccentMediumTransparent, colorAccentMoreTransparent, colorAccentSoft, colorAccentSoftTransparent, colorAccentSub, colorAccentSubDark, colorBackgroundBlack, colorBackgroundGray, colorElementBackgroundGray, darkMain, elementGrayBackground, gradientBackground, hovredText, lightMain, lightMedMain, lightSoftMain, main, medMain, primaryTextColor, secondText, softMain, softMainTransparent, transparentMain, whiteTextColor } from "../Colors";
import {
  Avatar,
  Divider,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import { useDispatch, useSelector } from "react-redux";
import newRequest from "../utils/newRequest";
import AlertMessage from "../Components/Alert";
import EmptyData from "../Components/Pending/EmptyData";
import { useNavigate } from "react-router-dom";
import MoreHorizTwoToneIcon from "@mui/icons-material/MoreHorizTwoTone";


import { createTheme, ThemeProvider } from "@mui/material/styles";
import LazyAvatar from "../Components/Pending/LazyAvatar";




const Container = styled.div`
  height: auto;
  display: flex;
  height: calc(100vh - 80px);
  overflow-y: auto;
  background-color: ${props => props.theme == "light" ? whiteTextColor : colorBackgroundGray};
  color: ${props => props.theme == "light" ? primaryTextColor : elementGrayBackground};

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    gap: 32px;
  }
`;

const Left = styled.div`
  flex: 3;
  
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

const LeftTitle = styled.span`
  font-size: 24px;
  font-weight: 500;
  padding: 0 32px;
  margin: 20px 0;
  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 32px;
 
  gap: 20px;
  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

const Label = styled.label`
  font-size: 18px;
  font-weight: 500;
`;

const Required = styled.span`
  color: red;
`;

const ItemContainerTitles = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 0 20px 32px;
  background-color: ${props => props.theme == "light" ? medMain : colorAccentMedium};
  @media (max-width: 768px) {
    padding: 10px 0 10px 16px;
  }
  min-width: 600px;
`;
const Products = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme == "light" ? softMainTransparent : colorAccentSoftTransparent};

  @media (max-width: 768px) {
    overflow: auto;
  }
  max-height: 500px;
`;

const Title = styled.div`
  color: ${whiteTextColor};
  margin: ${(props) => (props.type === "Action" ? "0 8px" : "")};
  flex: ${(props) =>
    props.type === "product" ? 2 : 1};
  font-size: 18px;
  border-right: ${(props) => (props.type === "Action" ? "" : "1px solid #eee")};
  text-align: center;
`;

const Type = styled.span`
  font-size: 12px;
  color: ${hovredText};
`;

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  padding: 12px 0 12px 32px;
  @media (max-width: 768px) {
    padding: 8px 0 0 16px;
  }
  min-width: 600px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  flex: 2;
`;

const Detail = styled.div`
  flex: 1;
  font-size: 18px;
  border-right: 1px solid ${main};
  text-align: ${(props) => (props.type === "name" ? "" : "center")};
`;
const CartProduct= styled.div`
min-width: 600px;

`;
const Attributs = styled.div`
height : ${({selected}) => selected ? '130px' : '0px'};
overflow: hidden;
display: flex;
flex-direction: column;
margin: 0 20px;
transition: height 200ms ease-in-out;
`;
const Attribute = styled.div`
flex: 1;
text-align: center;
`;
const Values = styled.div`
display: flex;
padding: 20px 0 20px 32px;
background-color: ${props => props.theme == "light" ? softMainTransparent : colorAccentMoreTransparent};
  
  @media (max-width: 768px) {
    padding: 10px 0 10px 16px;
  }
`;
const Value = styled.div`
flex: 1;
text-align: center;
display: flex;
align-items: center;
justify-content: center;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 32px 32px;

  background-color: ${props => props.theme == "light" ? transparentMain : colorAccentDarkTransparent};

  top: 0;
  position: sticky;
  overflow: hidden;
  height: calc(100vh - 80px);

  @media (max-width: 768px) {
    height: 600px;
    padding: 16px;
  }
`;
const Order = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  width: calc(100%);
  @media (max-width: 768px) {
    position: relative;
    width: calc(100%);
  }
`;
const OrderDetail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Color = styled.div`
padding: 4px 12px;
max-width: 25px;
border-radius: 8px;
background-color: ${props => props.color};
opacity: 0.8;
`;
const Info = styled.div``;

const Button = styled.button`
  background-color: ${props => props.theme == "light" ? main : colorAccentMedium};
  color: ${whiteTextColor};
`;
//const Container = styled.div``
//const Container = styled.div``
//const Container = styled.div``

const CheckOut = () => {
  const user = useSelector((state) => state.user.currentUser);
  const theme = useSelector((state) => state.theme.mode);
  const [cart, setCart] = useState();
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [open, setOpen] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
  
  const [order, setOrder] = useState({
    state: "",
    city: "",
    phonenumber: "",
    type: "",
  });
  const navigate = useNavigate();
  const [typeOrder, setTypeOrder] = useState("");

  // Handle Functions
  const handleDelete = async (id) => {

    const res = newRequest.delete(`/cards/delete/${id}`)
 
    try{

      if((await res).request.status == 200){
        setMessage("Product Deleted Successfully From Cart");
        setType("success");
        setOpen(true);
        getCart();
      }else{
        setMessage("Faild to delete product from the cart");
        setType("error");
        setOpen(true);
      }
    }catch(err){
console.log(err)
    }
    
  };

  const handleType = (e) => {
    e.preventDefault();
    setTypeOrder(e.target.value);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setOrder((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(order);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(order);

    const setMessageWithTimeout = (
      message,
      type,
      setMessage,
      setType,
      setOpen
    ) => {
      setMessage(message);
      setType(type);
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 2000);
    };

    if (order.state === "") {
      setMessageWithTimeout(
        "Please Add Your State !!",
        "error",
        setMessage,
        setType,
        setOpen
      );
      return;
    }
    if (order.city === "") {
      setMessageWithTimeout(
        "Please Add Your City !!",
        "error",
        setMessage,
        setType,
        setOpen
      );
      return;
    }
    if (order.phonenumber === "") {
      setMessageWithTimeout(
        "Please Add Your Phone Number !!",
        "error",
        setMessage,
        setType,
        setOpen
      );
      return;
    }
    if (order.type === "") {
      setMessageWithTimeout(
        "Please Add Shipping Type !!",
        "error",
        setMessage,
        setType,
        setOpen
      );
      return;
    }

    newRequest
      .post(`/orders/checkout/${user?.idUSER}`, {
        cartItems: cart.products,
        orderDetails: order,
      })
      .then((res) => {
        if (res.status === 200) {
          setMessage("Your order has sent successfully! Please Wait Our Call");
          setType("success");
          setOpen(true);
          setTimeout(() => {
            navigate(`/`);
          }, 2000);
        }
      })
      .catch((err) => {
        if (err.response.status === 409) {
          setMessage("Something wrong please contact us and try again later");
          setType("error");
          setOpen(true);
        }
      });
  };
  const getCart = async () => {
    try {
      const res = await newRequest.get(`/cards/cart/${user?.idUSER}`);

      setCart(res.data);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };
  useEffect(() => {
    getCart();
    
  }, []);

 

  const customTextField = {
    minWidth:'40%', borderRadius:1 , bgcolor:theme == "light" ? whiteTextColor : colorAccentMoreTransparent ,  ".css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input":{color: theme == "light" ? primaryTextColor : elementGrayBackground},
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
                  color: theme == "light" ? main : colorAccentMedium, // Focused label color
                },
                "& .MuiInputLabel-root.Mui-error": {
                  color: "orange", // Error label color
                },
              
  };

  return (
    <Container theme={theme}>
      <AlertMessage
        open={open}
        setOpen={setOpen}
        message={message}
        type={type}
      />

      <Left theme={theme}>
        <LeftTitle>Pales To Order</LeftTitle>
        <InputContainer>
          <Label>
            State <Required>*</Required>
          </Label>

          <TextField
 sx={customTextField}
            size="large"
            id="outlined-basic"
            label="State"
            name="state"
            variant="outlined"
            onChange={handleChange}
          />
          <Label>
            City <Required>*</Required>
          </Label>
          <TextField
sx={customTextField}
            size="large"
            id="outlined-basic"
            label="City"
            name="city"
            variant="outlined"
            onChange={handleChange}
          />
          <Label>
            Postal Code <Required>*</Required>
          </Label>
          <TextField
sx={customTextField}
            size="large"
            id="outlined-basic"
            label="Postal Code"
            name="postalcode"
            variant="outlined"
            onChange={handleChange}
            type="number"
            color="success"
          />
          <Label >
            Phone Number <Required>*</Required>
          </Label>
          <TextField
        sx={customTextField}
            size="large"
            id="outlined-basic"
            label="Phone Number"
           
            name="phonenumber"
            variant="outlined"
            onChange={handleChange}
            type="number"
          />
          <Label>
            Shipping Type<Required>*</Required>
          </Label>
          <FormControl
             sx={customTextField}
             >
            <InputLabel id="demo-simple-select-helper-label">
              Shipping Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              name="type"
              value={typeOrder}
              label="Shipping Type"
              onChange={(e) => [handleChange(e), handleType(e)]}
              sx={{color:theme == "light" ? primaryTextColor : whiteTextColor}}
            >
              <MenuItem value={"To Home"}>Deliver To Home</MenuItem>
              <MenuItem value={"To Postal"}>Deliver To The Postal</MenuItem>
            </Select>
            <FormHelperText sx={{bgcolor:'transparent' , color:secondText}}>
              Please ensure that if you choose deliver to home you will pay more
            </FormHelperText>
          </FormControl>
        </InputContainer>

        <LeftTitle>Products </LeftTitle>



        <Products theme={theme}>
          <ItemContainerTitles theme={theme}>
            <Title type="product">Product</Title>
           
            <Title>
              Price <Type>($)</Type>
            </Title>
            <Title>Quantity</Title>
            <Title type="Action">Action</Title>
          </ItemContainerTitles>
          {cart?.products == [] ? (
            <EmptyData text="No Pales To the Cart" />
          ) : (
            cart?.products.map((item, index) => (
              <CartProduct>

              <ItemContainer key={index}>
                <Item>
                 
                      <LazyAvatar src={item.image} sx={{
  borderRadius: 2,
  mr: 3,
  border:`1px solid ${ theme === "light" ? elementGrayBackground : colorElementBackgroundGray}` ,
  paddingTop: "2px",
bgcolor:'transparent'

              }} />
                           
                  <Detail type="name">{item.name}</Detail>
                </Item>
                
                <Detail> $ {item.price - item.price * item.discount / 100} </Detail>
                <Detail>{item.quantity}</Detail>
                <div style={{flex:1 , padding:'0 8px' , display:'flex' , alignItems:'center' , justifyContent:'center'}}>

                <IconButton
                  color="error"
                  sx={{ outline: "none" }}
                  onClick={() => handleDelete(item.cart)}
                  >
                  <DeleteOutlineTwoToneIcon />
                </IconButton>
                <IconButton
                  color="secondary"
                  onClick={() => setSelectedOrderId(selectedOrderId === item?.cart ? null : item?.cart)}
                  sx={{ rotate: selectedOrderId === item?.cart ? "90deg" : "0deg", transition: "200ms" , outline: "none" }}
                  >
                    <MoreHorizTwoToneIcon color="secondary" />
                  </IconButton>
              </div>
              
              </ItemContainer>
                
        <Attributs selected ={selectedOrderId === item?.cart}>
             
                

          <ItemContainerTitles style={{ color: whiteTextColor,backgroundColor: theme == "light" ? main : colorAccentSubDark , padding:'12px 0 12px 32px'}}>

          {item.attributes &&
            Object.entries(item.attributes).map(([key, value]) => (
              <Attribute key={key}>
                {key} 
              </Attribute>
            ))}
            </ItemContainerTitles>
        
                  <Values>
                  {item.attributes &&
    Object.entries(item.attributes).map(([key, value]) => {
      if (key === "color" || key === "colors") {
        return (
          <Value key={key}>
            <Color color={value} />
          </Value>
        );
      }

      return (
        <Attribute key={key}>
          {value}
        </Attribute>
      );
    })}

                
               
                  </Values>
              </Attributs>
              
      
               
          </CartProduct>
            ))
          )}
        </Products>
      </Left>
      <Right theme={theme}>
        <Order>
          <OrderDetail>
            <Label>Estimated Time</Label> <Info>1-2 Days</Info>
          </OrderDetail>
          <OrderDetail>
            <Label>Payment Type</Label> <Info>Pay On Deliver</Info>
          </OrderDetail>
          <OrderDetail>
            <Label>Shipping Price</Label> <Info>Free</Info>
          </OrderDetail>
          <OrderDetail>
            <Label>Price</Label> <Info>$ {cart?.totalPrice}</Info>
          </OrderDetail>
          <Divider />
          <OrderDetail>
            <Label>Total</Label> <Info>$ {cart?.totalPrice}</Info>
          </OrderDetail>
          <Button theme={theme} onClick={handleSubmit}>Order Now</Button>
        </Order>
      </Right>
    </Container>
  );
};

export default CheckOut;
