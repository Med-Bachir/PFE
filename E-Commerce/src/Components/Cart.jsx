import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Divider from "@mui/material/Divider";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from 'react-redux';
import newRequest from '../utils/newRequest';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import EmptyData from './EmptyData';




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
pointer-events: ${(props) => (props.open ? "auto" : "none")};  // Disable interaction when closed
`




//Cube

const Cube = styled.div`
  width: 95px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  height: 107px;
  background-color: #009f7f;
  padding: 13px 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  color: white;
  pointer-events: all;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    opacity: 0.9;
  }
`;

const CubeItemContainer = styled.div`
  display: flex;
  font-size: 13px;
  font-weight: 600;
  align-items: center;
  justify-content: space-between;
`;
const CubeItem = styled.div``;
const CubeLogo = styled.div`
  margin-right: 5px;
`;

const CubeAmount = styled.div``;
const CubeItemNumber = styled.span`
  background-color: white;
  color: #009f7f;
  padding: 3px 10px;
  border-radius: 7px;
  font-size: 15px;
`;

//Panier

const Wrapper = styled.div`
  height: 100vh;
width: 560px;

  background-color: white;
  display: flex;
  flex-direction: column;
`;
const Top = styled.div`
  padding: 3px 10px;
  margin-top: 10px;
  display: flex;
  border-bottom: 1px solid #00000013;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;
const Item = styled.div`
  color: #009f7f;
  margin-left: 10px;
  font-weight: 400;
  
`;
const LogoItem = styled.div`
  color: #009f7f;
`;
const ItemContainer = styled.div`
  display: flex;
`;

const Center = styled.div`
  display: flex;

  flex-direction: column;
  padding: 7px 15px;

  contain: paint;
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
  
`;

const Checkout = styled.div`
  background-color: #009f7f;
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
  color: white;
  font-weight: 600;
`;
const TotalPrice = styled.span`
  background-color: white;
  color: #009f7f;
  padding: 5px 10px;
  border-radius: 30px;
`;
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
  background-color: #eee;
  border-radius: 10px;
  margin-right: 20px;
`;

const Image = styled.img`
  width: 70px;
  margin-right: 20px;
`;
const Information = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  width: fit-content;
  justify-content: space-between;
  gap: 12px;
`;
const Name = styled.span`
  font-weight: bold;
  
`;
const Price = styled.div`
  color: #009f7f;
  display: flex;
  align-items: center;
  gap: 12px;
  
`;
const Attributes = styled.div`
  color: black;
  display: flex;
  align-items: center;
  gap: 20px;
`;
const Attribute = styled.span`
display: flex;
align-items: center;
gap: 8px;
`;
const Color = styled.div`
padding: 4px 12px;
max-width: 25px;
border-radius: 8px;
background-color: ${props => props.color};
opacity: 0.8;
`;
const Quantity = styled.div`
  color: #3c3c3c75;
  font-size: 12px;
  
`;

const Total = styled.div`
margin-left: auto;
`;
const Amount = styled.span`

`;




const Cart = () => {
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

 const handleChange = async (type, id, qte) => {
  try {
    const updatedCart = { ...cart };
    const productIndex = updatedCart.products.findIndex((product) => product.id === id);

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
      await newRequest.put(`/cards/update/${user?.idUSER}/${id}`, { quantity: newQuantity });
      queryClinet.invalidateQueries(['cart'])
    }
  } catch (err) {
    console.error("Error updating product quantity:", err);
    // Optionally revert the optimistic update here
  }
};


  return (
    <Container open={open}>
      <Cube onClick={handleClick}>
        <CubeItemContainer>
          <CubeLogo>
            <ShoppingBagIcon sx={{ fontSize: "20px" }} />
          </CubeLogo>
          <CubeItem>{cart?.totalProductCount == null ? 0 : cart?.totalProductCount} Item</CubeItem>
        </CubeItemContainer>
        <CubeAmount>
          <CubeItemNumber>$ {cart?.totalPrice == null ? 0 : cart?.totalPrice }</CubeItemNumber>
        </CubeAmount>
      </Cube>

      <Wrapper>
        <Top>
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
              backgroundColor: "#009f7f",
              borderRadius: "50%",
              color: "white",
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
              <Update>
                <IconButton onClick={() => handleChange('inc', item?.id, item.quantity)}>
                  <AddIcon />
                </IconButton>
                <Amount>{item.quantity}</Amount>
                <IconButton onClick={() => handleChange('dec', item?.id, item.quantity)}>
                  <RemoveIcon />
                </IconButton>
              </Update>

              <Image src={item.image} />
              <Information>
                <Name>{item.name}</Name>
                <Price> {item.discount == 0 ? '' : <p style={{fontSize:14 , color:'#a5a5a5' , textDecoration: 'line-through'}} >${item.price} </p>}  ${item.price - item.price * (item.discount / 100 ) }
                
                <Attributes>
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
              <Total>$ {(item.price - item.price * (item.discount / 100 )) * item.quantity}</Total>
            </Products>
          ))}
          <Divider />
        </Center>

        <Bottom>
          <Link style={{ width: '100%' }} to={`/checkout/${user?.idUSER}`}>
            <Checkout>
              <Button>Checkout</Button>
              <TotalPrice>$ {cart?.totalPrice == null ? 0 : cart?.totalPrice }</TotalPrice>
            </Checkout>
          </Link>
        </Bottom>
      </Wrapper>
    </Container>
  );
};

export default Cart;
