import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import RadioGroupRating from './rating'
import { colorPrimaryBlack, primaryTextColor, whiteTextColor } from '../Colors'
import LazyAvatar from './Pending/LazyAvatar'






const Product = styled.div`

margin-bottom:16px;
    background-color: ${props => props.theme == "light" ? whiteTextColor : colorPrimaryBlack};
    color: ${props => props.theme == "light" ? primaryTextColor : whiteTextColor};
display: flex;
flex-direction: column;
align-items: center;
border-radius:4px;
padding: 16px;
contain: paint;



`

const Name = styled.span`
margin-top: 20px;
font-size: 15px;
font-weight: 500;
`
const Price = styled.span`
font-size: 15px;
font-weight: 300;
`
const OldPrice = styled.span`
font-size: 13px;
font-weight: 300;
text-decoration: line-through;
color: #c1c1c1;
`
const CurrentPrice = styled.span`
font-size: 20px;
font-weight: 400;
`

const Discount = styled.div`
background-color:#EAB12D;
position: absolute;
color: white;
font-size: 12px;
padding: 2px 10px;
border-radius: 8px;
right: 20px;
`
const Button = styled.button`
background-color: transparent;
font-size: 14px;
padding-left: 0;
color: #00C8A0;
font-weight: 600;
margin: 0;

`
const RateContainer = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
flex-direction: column;
gap: 20px;

`
const Bottom = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
margin-top: 12px;
gap: 20px;


`

const ShopProduct = ({name , price , discount , id , image , rate , theme}) => {
  return (
    <Product theme={theme}>
        {discount == 0 ? '' : <Discount>{discount}%</Discount>}
    
    <LazyAvatar src={image} sx={{ width:'100%', height:300  , borderRadius:0 , objectFit:'fill' , bgcolor:'transparent' , "@media (max-width: 768px)" : {height:200}}} />

    <RateContainer>
    <Name>{name}</Name>
    <RadioGroupRating rate={rate}/>
    </RateContainer>
    <Bottom>

    <Price> <CurrentPrice> ${price - price * discount / 100} </CurrentPrice>{discount == 0 ? '' : <OldPrice>${price}</OldPrice>} </Price>
<Link to={`/cardproduct/${id}`}>
    <Button style={{padding:'8px 16px' , marginTop:8 , backgroundColor:'#009f7f' ,color:'white' , fontWeight:500  , bottom:16, right:20}}>+</Button>
</Link>
    </Bottom>

</Product>
  )
}

export default ShopProduct
