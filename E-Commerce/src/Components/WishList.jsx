import { Divider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import newRequest from '../utils/newRequest'



const Container = styled.div`
width: 100%;

display: flex;
flex-direction: column;
background-color: white;
padding: 24px 32px;
gap: 32px;

contain: paint;
overflow-y:auto;
&::-webkit-scrollbar {
    width: 2px; 
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(
      147,
      147,
      147,
      0.543
    ); 
    border-radius: 20px; 
  }
`
const Title = styled.span`
text-align: center;
font-size: 20px;
font-weight: 500;
`
const List = styled.div`
display: flex;
flex-direction: column;
gap:20px;
`
const Product = styled.div`
display: flex;
gap: 20px;
align-items: center;

`
const ProductImage = styled.img`
border: 1px solid #eee;
border-radius: 4px;
width: 60px;
height: 60px;
`
const Info = styled.div`
display: flex;
gap: 4px;
flex-direction: column;
`
const Name = styled.span``
const Shops = styled.span`
font-size: 14px;
color: #a3a3a3;
`
const Rate = styled.div``
const Price = styled.div``
const Old = styled.span`
color:#a3a3a3;
font-size: 14px;
`
const Current = styled.span`
font-weight: 500;
`
const ButtonGroup = styled.div``
const Button = styled.button`
background-color: transparent;
color: ${props => props.work == 'add' ? 'green': 'red'};
padding: 0 0 0 16px;
font-size: 14px;
border-radius: 0;
`


const WishList = () => {
  const user = useSelector((state) => state.user?.currentUser);



  const [wishes ,setWishes] = useState([]);



    useEffect(() => {
        const getWishes = async () => {
          try {
            
              const res = await newRequest.get(`/wish/${user?.idUSER}`);
              setWishes(res.data);
           
          } catch (err) {
            console.error("Error fetching users:", err);
          }
        };
        getWishes();
      }, [user?.idUSER]);
      console.log(wishes)
  return (
    <Container>
        <Title>My WishList</Title>
        <List>
          {wishes.map((item) => (

<>
            <Product>
                <ProductImage src={item.productimage}/>
                <Info>
                    <Name>{item.productname}</Name>
                    <Shops>{item.shopName}</Shops>
                    <Rate></Rate>
                </Info>
                <Info style={{marginLeft:'auto' , alignItems:'end'}}>
                    <Price><Current>${item.productprice - item.productprice * item.discount / 100},00 </Current><Old>${item.productprice},00</Old></Price>
                    <ButtonGroup>
                        <Button style={{paddingRight:16 }} work='add'>Add to cart</Button>
                        <Button style={{borderLeft:'1px dashed #a3a3a3' }} work='remove'>Remove</Button>
                    </ButtonGroup>
                </Info>
            </Product>
            <Divider />
</>
        ))}
            
        </List>
      
    </Container>
  )
}

export default WishList
