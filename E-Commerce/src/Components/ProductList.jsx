import { IconButton, Rating } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { useSelector } from 'react-redux';
import newRequest from '../utils/newRequest';
import { Link } from 'react-router-dom';


const Container = styled.div`

`
const Tags = styled.div`
display: flex;
background-color:#cbfef42a;
padding: 12px;
border-top-right-radius: 4px;
border-top-left-radius: 4px;

`
const TagRow = styled.div`
text-align: center;

`
const Row = styled.div`
display: flex;
align-items: center;
padding: 12px;

border-top: 1px solid #eee;

`
const ProductInfo = styled.div`
display: flex;
align-items: center;
gap:20px;
flex: 2;


`
const ShopList = styled.div`
flex: 1;
display: flex;
align-items: center;
justify-content: center;
`
const Shops = styled.img`
width: 40px;
height: 40px;
border-radius: 4px;
text-align: center;
`
const Image = styled.img`
width: 45px;
border: 1px solid #eee;
padding: 6px;
border-radius: 4px;
`
const Name = styled.span`

`
const Category = styled.div`
text-align: center;
flex: 1;
`
const ProductDet = styled.div` 
display: flex;
text-align:center;
flex: 3;


`
const Qte = styled.div`
text-align:center;
flex: 1;
`
const Rate = styled.div`
text-align:center;
flex: 1;
`
const Size = styled.div`
text-align:center;
flex: 1;
`

const Color = styled.div`

flex: 1;
display: flex;
align-content: center;
justify-content: center;
gap: 4px;


`

const Shop = styled.div`
flex: 1;
`

const Price = styled.div`
text-align:center;
flex: 1;
`
const Circl = styled.div`
background-color: ${props => props.color != null ? `${props.color}` :'green'};

width: 24px;
border-radius:8px;
height:8px;
opacity: 0.6;

`
const Action = styled.div`

display: flex;

flex: 1;
justify-content: center;
`

const ProductList = ({productData}) => {
  const user = useSelector((state) => state.user?.currentUser);


  const handleDelete = async (id) => {
    


   
    try {
      const response = await newRequest.delete(`/products/delete-product/${id}`);
      console.log(response.status);

      if (response.status === 200) {
        message.success('Product added successfully.');
      } else {
        message.error('Failed to add product.');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      message.error('Failed to add product.');
    }
  };
  
const tableTagsOwner = [
  {
    title : 'Product',
    flex : 2,
    position:'center',
  },
  {
    title : 'Category',
    flex : 1,
    position:'',
  },
  {
    title : 'Quantity',
    flex : 1,
    position:'center',
  },
  {
    title : 'Rate',
    flex : 1,
    position:'center',
  },
  {
    title : 'Sizes',
    flex : 1,
    position:'center',
  },
  {
    title : 'Color',
    flex : 1,
    position:'center',
  },
  {
    title : 'Price',
    flex : 1,
    position:'center',
  },
  {
    title : 'Action',
   flex:1,
   position:'center',


  },
  

];
const tableTagsAdmin = [
  {
    title : 'Product',
    flex : 2,
    position:'center',
  },
  {
    title : 'Category',
    flex : 1,
    position:'center',
  },
  {
    title : 'Shops',
    flex : 1,
    position:'center',
  },
 
  {
    title : 'rate',
    flex : 1,
    position:'center',
  },

  
  {
    title : 'Price',
    flex : 1,
    position:'center',
  },
  {
    title : 'Action',
    flex : 1,
    position:'center',

  },

];





  return (
    <Container >
      <Tags>

      {user?.userRole == 'admin' ? tableTagsAdmin.map((item) => (
        
        <TagRow style={{flex : `${item.flex}` , textAlign:`${item.position}` }}>{item.title}</TagRow>
      )) : tableTagsOwner.map((item) => (
        
        <TagRow style={{flex : `${item.flex}` , textAlign:`${item.position}`}}>{item.title}</TagRow>
      ))}

      </Tags>
{productData.map((product) => (


  <Row>
    <ProductInfo >
      <Image src={product.productimage} />
      <Name>{product.productname}</Name>
    </ProductInfo>
    <Category style={{flex : 1}}>{product.categoryName}</Category>

    {user?.userRole == 'admin' ? 
    
      <ShopList>
        <Link to={`/Shops/${product.isshop}`}>
        <Shops src={product.shopName} />
        </Link>
      </ShopList>
      
   
    : <ProductDet>
      
    <Qte style={{flex : 1 ,textAlign:'center'}}>{product.quantity}</Qte>
    
    <Size style={{flex : 1, textAlign:'center' }}>{product.productsize}</Size>
    <Color style={{flex : 1, textAlign:'center' }}>
      {product.productcolor.split(',').map((item) => (
        <Circl color={item} />
        
      ))

    }</Color>
    
    
    </ProductDet>
    }
    
    <Rate style={{flex:1 ,textAlign:'center'}}><Rating name="read-only" style={{ textAlign:'center'}} value={product?.avgRate} readOnly /></Rate>
    <Price style={{flex : 1, textAlign:'center' }}>${product.productprice}</Price>
    <Action >
    <>
    <IconButton>
    <EditTwoToneIcon style={{color:"#02C3D1"}} />
    </IconButton>
    <IconButton onClick={() => handleDelete(product.idPRODUCT)}>
    <DeleteForeverOutlinedIcon style={{color:"#E60000"}} />
    </IconButton>
    </>
    </Action>
  </Row>
      
))}
    </Container>
  )
}

export default ProductList
