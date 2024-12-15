import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Divider from "@mui/material/Divider";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from 'react-redux';
import newRequest from '../../utils/newRequest';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import EmptyData from '../../Components/Pending/EmptyData';
import { colorAccentDarkTransparent, colorAccentLight, colorAccentMain, colorAccentMedium, colorAccentTransparent, colorBackgroundBlack, colorElementBackgroundGray, colorPrimaryBlack, elementGrayBackground, grayBackground, main, primaryTextColor, secondaryTextColor, whiteTextColor } from '../../Colors';



// CART CONTAINER
const Container = styled.div`
display: flex;
align-items: center;
justify-content: center;
position:fixed;
z-index: 99;
right: 0;
top: 0;

transform: ${(props) => (props.open ? "translateX(0)" : "translateX(560px)")};
transition: all 0.5s ease-in-out;
pointer-events: ${(props) => (props.open ? "auto" : "none")};
@media (max-width: 768px) {
  transform: ${(props) => (props.open ? "translateX(0)" : "translateX(100vw)")};
}  
`
//Cube
const Cube = styled.div`
  width: 95px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  height: 107px;
  background-color: ${props => props.theme == "light" ? main : colorAccentMedium};
  
  padding: 13px 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  color: ${whiteTextColor};
  pointer-events: all;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    opacity: 0.9;
  }
  @media (max-width: 768px) {
    
    width: 80px;
    height: 80px;
  
}
`;
const CubeItemContainer = styled.div`
  display: flex;
  font-size: 13px;
  font-weight: 600;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 768px) {
  font-size: 10px;
}
`;
const CubeItem = styled.div``;
const CubeLogo = styled.div`
  margin-right: 5px;
  
`;

const CubeAmount = styled.div``;
const CubeItemNumber = styled.span`
  background-color: ${whiteTextColor};
  color: ${main};
  padding: 3px 10px;
  border-radius: 7px;
  font-size: 15px;
  @media (max-width: 768px) {
  font-size: 12px;
}
`;

//CART BODY
const Wrapper = styled.div`
  height: 100vh;
  width: 560px;
  background-color: ${props => props.theme == "light" ? whiteTextColor : colorBackgroundBlack};
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
  width: calc(100vw);
}
`;
const Top = styled.div`
  background-color: ${props => props.theme == "light" ? whiteTextColor : colorAccentDarkTransparent};

  padding: 3px 10px;
  padding-top: 10px;
  display: flex;
  border-bottom: 1px solid #00000013;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;
const Item = styled.div`
  color: ${main};
  margin-left: 10px;
  font-weight: 400;
  
`;
const LogoItem = styled.div`
  color: ${main};
`;
const ItemContainer = styled.div`
  display: flex;
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  padding: 7px 15px;
  contain: paint;
  &::-webkit-scrollbar {
    width: 6px; /* width of the entire scrollbar */
  }
  &::-webkit-scrollbar-track {
    background: ${elementGrayBackground}; /* color of the tracking area */
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
  overflow-y: auto;
  height: 600px;
`;
const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  width: 560px;
  padding: 8px 12px;
  background-color: ${props => props.theme == "light" ? whiteTextColor : colorAccentDarkTransparent};
  @media (max-width: 768px) {
  width: calc(100vw);
}
`;

const Checkout = styled.div`
  background-color: ${props => props.theme == "light" ? main : colorAccentMedium};
  
  display: flex;
  bottom: 10px;
  width: 100%;
  justify-content: space-between;
  padding: 10px 20px;
  border-radius: 30px;
  align-items: center;
  cursor: pointer;
  transition: all 0.1s ease-in;
  &:hover {
    opacity: 0.9;
  }
  
`;
const Button = styled.span`
  color: ${whiteTextColor};
  font-weight: 600;
`;
const TotalPrice = styled.span`
  background-color: ${whiteTextColor};
  color: ${main};
  padding: 5px 10px;
  border-radius: 30px;
`;
// Items Container
const Products = styled.div`
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;
  align-items: center;

`;
const Update = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${props => props.theme == "light" ? grayBackground : colorAccentLight};
  color: ${props => props.theme == "light" ? primaryTextColor : colorAccentMain};

  border-radius: 10px;
  margin-right: 20px;
  @media (max-width: 768px) {
  font-size: 14px;
  margin-right: 8px;
}
`;

const Image = styled.img`
  height: 70px;
  width: 70px;
  object-fit: contain;
  margin-right: 20px;
  @media (max-width: 768px) {
  width: 50px;
  height: 50px;
  margin-right: 8px;
}
`;
const Information = styled.div`
  color: ${props => props.theme == "light" ? primaryTextColor : elementGrayBackground};

  display: flex;
  flex-direction: column;
  height: auto;
  width: fit-content;
  justify-content: space-between;
  gap: 12px;
  @media (max-width: 768px) {
 
 font-size: 12px;
 gap: 1px;
}
`;
const Name = styled.span`

font-weight: 500;
`;
const Price = styled.div`
  color: ${main};
  display: flex;
  align-items: center;
  gap: 12px;
  @media (max-width: 768px) {
  gap: 4px;
}
`;
const Attributes = styled.div`
  color: ${props => props.theme == "light" ? primaryTextColor : elementGrayBackground};

  display: flex;
  align-items: center;
  gap: 20px;
  @media (max-width: 768px) {
 gap: 4px;
 flex-direction: column;
 margin-left: 12px;
 align-items: start;
}
`;
const Attribute = styled.span`
display: flex;
align-items: center;
gap: 8px;
@media (max-width: 768px) {
 
}
`;
const Color = styled.div`
padding: 4px 12px;
max-width: 25px;
border-radius: 8px;
background-color: ${props => props.color};
opacity: 0.8;
`;
const Quantity = styled.div`
  color: ${secondaryTextColor};
  font-size: 12px;
  
`;

const Total = styled.div`
margin-left: auto;
color: ${props => props.theme == "light" ? primaryTextColor : elementGrayBackground};

`;
const Amount = styled.span`
`;




const Cart = ({theme}) => {
  const [open, setOpen] = useState(false);
  const user = useSelector(state => state.user.currentUser);
  const queryClinet = useQueryClient()



  const getCart = async () => {
    try {
      const res = await newRequest.get(`/cards/cart/${user?.idUSER}`);
      return res.data;
    } catch (err) {
      console.error("Error fetching cart data:", err);
    }
  };
  

 const { data : cart } = useQuery({

  queryKey:["cart"],
  queryFn : getCart,
  
  onError:(error) => {
    message.error(error.message)
  }
 }) 

 // Fetch cart when user ID changes

  const handleClick = () => {
    setOpen(!open);
  };

 const handleChange = async (type, id, item) => {
  try {
    const updatedCart = { ...cart };
    const productIndex = updatedCart.products.findIndex((product) => product.cart === item);

    if (productIndex !== -1) {
      const updatedProduct = { ...updatedCart.products[productIndex] };
      let newQuantity = type === "inc" ? updatedProduct.quantity + 1 : updatedProduct.quantity - 1;

      // Ensure the quantity doesn't go below 1 or above 5
      if (newQuantity <= 0) {
        console.warn("Quantity must be at least 1.");
        return;
      }
      if (newQuantity > 5) {
        console.warn("Max quantity is 5.");
        return;
      }

      

      // Now send the update to the server
      await newRequest.put(`/cards/update/${user?.idUSER}/${id}/${item}`, { quantity: newQuantity });
      queryClinet.invalidateQueries(['cart'])
    }
  } catch (err) {
    console.error("Error updating product quantity:", err);
    // Optionally revert the optimistic update here
  }
};


  return (
    <Container  open={open}>
      <Cube theme={theme} onClick={handleClick}>
        <CubeItemContainer theme={theme}>
          <CubeLogo>
            <ShoppingBagIcon sx={{ fontSize: "20px" }} />
          </CubeLogo>
          <CubeItem>{cart?.totalProductCount == null ? 0 : cart?.totalProductCount} Item</CubeItem>
        </CubeItemContainer>
        <CubeAmount>
          <CubeItemNumber>$ {cart?.totalPrice == null ? 0 : cart?.totalPrice.toFixed(2) }</CubeItemNumber>
        </CubeAmount>
      </Cube>

      <Wrapper theme={theme}>
        <Top theme={theme}>
          <ItemContainer>
            <LogoItem>
              <ShoppingBagIcon />
            </LogoItem>
            <Item>{cart?.totalProductCount == null ? 0 : cart?.totalProductCount} Item</Item>
          </ItemContainer>
          <LogoItem
            style={{
              marginRight: "20px",
              cursor: "pointer",
              backgroundColor: main,
              borderRadius: "50%",
              color: whiteTextColor,
              width: "30px",
              display: "flex",
              justifyContent: "center",
              height: "30px",
              alignItems: "center",
            }}
          >
            <CloseIcon onClick={handleClick} sx={{ width: "17px" }} />
          </LogoItem>
        </Top>

        <Center>
          {cart?.products == null ? 
          <div style={{height:'100%' , display:'flex' , alignItems:'center'}}>

          <EmptyData text={'Cart Is Empty'} />
          </div>
          :
          
          cart?.products?.map((item) => (
            <Products key={item.id}>
              <Update theme={theme}>
                <IconButton sx={{color: theme == "light" ? "" : colorAccentMain }} onClick={() => handleChange('inc', item?.id, item.cart)}>
                  <AddIcon sx={{ "@media (max-width: 768px)" : {fontSize:20}}} />
                </IconButton>
                <Amount>{item.quantity}</Amount>
                <IconButton sx={{color: theme == "light" ? "" : colorAccentMain}} onClick={() => handleChange('dec', item?.id,  item.cart)}>
                  <RemoveIcon sx={{ "@media (max-width: 768px)" : {fontSize:20}}} />
                </IconButton>
              </Update>

              <Image src={item.image} />
              <Information theme={theme}>
                <Name>{item.name}</Name>
                <Price> {item.discount == 0 ? '' : <p style={{fontSize:14 , color:secondaryTextColor , textDecoration: 'line-through'}} >${item.price} </p>}  ${(item.price - item.price * (item.discount / 100 )).toFixed(2) }
                
                <Attributes theme={theme}>
                  {item.attributes?.color ? 
                  <Attribute>color : <Color color={item.attributes?.color} />  </Attribute>
                  : ''}
                  {item.attributes?.size ? 
                  <Attribute>size : {item.attributes?.size}</Attribute>
                  : ''}
                </Attributes>
                </Price>
                <Quantity>1 * {item.quantity}pc</Quantity>
              </Information>
              <Total theme={theme}>$ {((item.price - item.price * (item.discount / 100 )) * item.quantity).toFixed(2)}</Total>
            </Products>
          ))}
          <Divider />
        </Center>

        <Bottom theme={theme}>
          <Link style={{ width: '100%' }} to={`/checkout/${user?.idUSER}`}>
            <Checkout theme={theme}>
              <Button>Checkout</Button>
              <TotalPrice>$ {cart?.totalPrice == null ? 0 : cart?.totalPrice.toFixed(2) }</TotalPrice>
            </Checkout>
          </Link>
        </Bottom>
      </Wrapper>
    </Container>
  );
};

export default Cart;
