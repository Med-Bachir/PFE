import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import { Avatar, Divider } from '@mui/material'
import InstagramIcon from '@mui/icons-material/Instagram';
import newRequest from '../utils/newRequest'

import me from "./../Animation - 1716145973359.json";
import Lottie from 'lottie-react'
import { useSelector } from 'react-redux'





const items = [
    {
        img:'https://img.icons8.com/clouds/100/apple-contacts.png',
        title : 'Contact'
    },
    {
        img:'https://img.icons8.com/arcade/64/domain.png',
        title : 'Web'
    },
    {
        img:'https://img.icons8.com/arcade/64/faq.png',
        title : 'FAQs'
    },
]

const Container = styled.div`
height: 100vh;

height: calc(100vh - 80px);

`

const ShopProfile = styled.div`
background-color: #f3f3f3;
height: 100%;
display: flex;
padding: 0 0 0 32px;
gap: 32px;


`
const InfoContainer = styled.div`
padding: 32px 0 8px;
flex: 4;


`
const ProductContainer = styled.div`

flex: 13;
padding: 32px 32px 32px 0;
contain: paint;
overflow-y: scroll;



`
const ShopInfo = styled.div`

contain: paint;
overflow-y:auto;

background-color: white;
border-radius: 4px;
height: 100%;

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
const Cover = styled.div`
background-size: cover;


margin-bottom: 32px;
width: 100%;
height: 330px;

background-color: white;
border-radius: 4px;
`
const ShopProducts = styled.div`
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 20px;
cursor: ${props => props.role == 'admin' ? 'not-allowed' : ""};
filter: brightness(70%);
`


const Product = styled.div`

margin-bottom:16px;
background-color: white;
display: flex;
flex-direction: column;
align-items: center;
border-radius:4px;
padding: 16px;
contain: paint;
height: 450px;

`
const ProductImage = styled.img`
height: 350px;
width: 100%;

`
const Name = styled.span`
margin-top: auto;
font-size: 15px;
font-weight: 500;
`
const Price = styled.span`
margin-top: 16px;
font-size: 15px;
font-weight: 300;
`
const OldPrice = styled.span`
margin-top: 16px;
font-size: 13px;
font-weight: 300;
text-decoration: line-through;
color: #c1c1c1;
`
const CurrentPrice = styled.span`
margin-top: 16px;
font-size: 15px;
font-weight: 300;
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


const Top = styled.div`
padding: 28px 24px;


`


const Profile = styled.div`
gap:12px;
display: flex;
align-items: center;
margin-bottom:24px;

`
const Date = styled.span`
font-size: 13px;
color: #828282;
font-weight: 300;
`
const ShopName = styled.span`

font-weight: 500;
`
const Stock = styled.div``
const Desc = styled.div`
font-size: 13px;
color: #828282;
overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    box-orient: vertical;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: ${props => props.open ? '' : 2};
    margin-bottom:8px;


`
const Info = styled.div`
display: flex;
flex-direction: column;
gap:4px;

`
const Button = styled.button`
background-color: transparent;
font-size: 14px;
padding-left: 0;
color: #00C8A0;
font-weight: 600;
margin: 0;

`
const Center = styled.div`
display: flex;
padding: 20px;
gap: 12px;
`
const Item = styled.div`
display: flex;
flex-direction: column;

border-radius: 4px;
background-color:#e5fef9ab;
flex:1;
padding: 8px;
align-items: center;
gap: 4px;
`
const ItemIcon = styled.img`
width: 40px;
height: 40px;
`
const ItemTitle = styled.span`
font-size: 14px;
`


const Bottom = styled.div`
display: flex;
flex-direction: column;
padding: 24px;
gap: 8px;
`
const Title = styled.span`
font-size: 14px;
font-weight: 500;


`
const BottomInfo = styled.span`
font-size: 12px;
margin-bottom: 12px;
color: #a3a3a3;
`


const LottieContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
background-color: white;
border-radius: 8px;
width: 100%;
`;


const ShopPage = () => {
  const user = useSelector((state) => state.user?.currentUser);

    const Location = useLocation().pathname.split('/')[2]
    const [open ,setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(!open)
    }
    const notAllowed = {
      cursor : 'not-allowed',
      
      }

    const [shop ,setShop] = useState([]);



    useEffect(() => {
        const getShop = async () => {
          try {
            
              const res = await newRequest.get(`/shop/shops/${Location}`);
              setShop(res.data);
           
          } catch (err) {
            console.error("Error fetching users:", err);
          }
        };
        getShop();
      }, [Location]);
      console.log(shop)
      
      const [products ,setProducts] = useState([]);

      useEffect(() => {
        const getProducts = async () => {
          try {
            
              const res = await newRequest.get(`/products/shop-products/${Location}`);
              setProducts(res.data);
           
          } catch (err) {
            console.error("Error fetching users:", err);
          }
        };
        getProducts();
      }, [Location]);

      console.log(products)

      
      
      

  return (
    <Container>
       
                    
        <ShopProfile>
            <InfoContainer>

            <ShopInfo>
                <Top>

                        <Profile>
                        <Avatar src={shop.ShopImage} sx={{width:85,height:85  }} />
                        <Info>
                            <Date>Since {shop.CreatedAt}</Date>
                            <ShopName>{shop.ShopName} </ShopName>
                            <Stock>{shop.TotalProducts} <Date>products</Date> </Stock>
                        </Info>
                        

                    </Profile>
<Desc open={open} >{shop.ShopDesc} </Desc>
<Button onClick={handleOpen}>{open ? 'less' : 'Read more'}</Button>
                </Top>
                 
                <Divider />
                <Center>
                    {items.map((item) => (
                        
                        <Item>
                        <ItemIcon src={item.img}/>
                        <ItemTitle>{item.title}</ItemTitle>

                    </Item>

                    ))}
                </Center>
                <Divider />
                <Bottom>
                    <Title>Address</Title>
                    <BottomInfo>{shop.Country + ' , ' + shop.State + ' , ' +shop.Street}</BottomInfo>
                    <Title>Phone</Title>
                    <BottomInfo>+213{shop.ShopPhoneNumber}</BottomInfo>
                    <Title>Follow Us</Title>
                    <BottomInfo><InstagramIcon fontSize='small' /></BottomInfo>

                </Bottom>


            </ShopInfo>
            </InfoContainer>
        <ProductContainer>
<Cover style={{backgroundImage:`url(${shop.ShopCover})`}}>

</Cover>
{products != '' ?
<ShopProducts >
 {products.map((item) => (
    
<Link 
  style={user?.userRole === 'admin' || user?.userRole === 'seller' ? notAllowed : {}} 
  to={user?.userRole === 'client' ? `/cardproduct/${item.idPRODUCT}` : undefined}
>
 


    <Product>
        {item.discount == 0 ? '' : <Discount>{item.discount}%</Discount>}
    <ProductImage src={item.productimage} />
    <Name>{item.productname}</Name>
    <Price> <CurrentPrice> ${item.productprice - item.productprice * item.discount / 100} </CurrentPrice>{item.discount == 0 ? '' : <OldPrice>${item.productprice}</OldPrice>} </Price>

    <Button style={{padding:'8px 16px' , marginTop:8 , backgroundColor:'#009f7f' ,color:'white' , fontWeight:500 , position:'absolute' , bottom:16, right:20}}>+</Button>

</Product>
    </Link>
))}
</ShopProducts>
:
<LottieContainer>
          <Lottie animationData={me} style={{ width: '40%' }} />
          <span>No Product in Shop</span>
        </LottieContainer>


}

</ProductContainer>    
      </ShopProfile>  
   
        
    </Container>
  )
}

export default ShopPage
