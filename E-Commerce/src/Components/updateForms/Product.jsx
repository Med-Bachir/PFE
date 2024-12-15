import { FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import {useEffect, useState} from 'react'
import styled from 'styled-components'
import newRequest from '../../utils/newRequest'



const BlackBackground = styled.div`
position: fixed;

width: 100%;
height: 100%;
top: 0;
right: 0;
display: flex;
align-items: center;
justify-content: center;
backdrop-filter: brightness(30%);
`
const Container = styled.div`
height: 80%;
width: 80%;
border-radius: 8px;
background-color: #ffffff;
display: flex;

`
const Left = styled.div`
width:45%;
padding: 40px;
border: 1px #eeeeee solid;
border-radius: 8px;
margin: 32px;
`
const Image = styled.img`
width: 100%;
height: 100%;
object-fit: contain;
`
const Right = styled.div`
width: 55%;
display: flex;
flex-direction: column;
gap: 20px;
overflow: hidden;
overflow-y: auto;
padding: 32px 32px 32px 0; 
&::-webkit-scrollbar {
    width: 5px; /* width of the entire scrollbar */
  }
  &::-webkit-scrollbar-track {
    background: transparent; /* color of the tracking area */
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(
      147,
      147,
      147
      
    ); /* color of the scroll thumb */
    border-radius: 20px; /* roundness of the scroll thumb */
    /* creates padding around scroll thumb */
  }

`
const Title = styled.span`

`
const InputContainer = styled.div`
display: grid;
grid-template-columns: repeat(2 , 1fr);
row-gap: 24px;
column-gap: 12px;
`



const Product = ({product}) => {

  const [cat, setCat] = useState(product.id_Category);
  const [sub, setSub] = useState(product.id_SubCategory);
  const [type, setType] = useState(product.id_Type);
const [newAtt , setNewAtt] = useState(product.attributes)
  const [cats, setCats] = useState([]);
  const [subs, setSubs] = useState([]);
  const [types, setTypes] = useState([]);
  const [newProduct, setNewProduct] = useState(product);

  const handleChange = (event, field, name) => {
    const value = event.target.value;

    switch (field) {
      case "cat":
        setCat(value); // Only update the ID here
        setCatName(cats.find((cat) => cat.idCATEGORIES === value).categoryname);

        break;
      case "sub":
        setSub(value);
        setSubName(subs.find((sub) => sub.id === value).name);

        break;
      case "type":
        setType(value);
        setTypeName(types.find((type) => type.id === value).name);
        break;
      default:
        console.warn(`Unhandled field: ${field}`);
    }

    // You can now directly access the category name from the 'cats' array
  };

  

  console.log(product)
    const handleUpdate = (e) => {

        setNewProduct((prev) => ({...prev , [e.target.name] : e.target.value}))
        console.log(newProduct)
       
          }
          const handleAtt = (e) => {
            setNewAtt((prev) => ({...prev , [e.target.name] : e.target.value}))
        
        console.log(newAtt)
          }

          useEffect(()=>{
            setNewAtt(newAtt)
          },[newAtt])

    let attributes 
// Step 1: Parse the JSON string into an object
let parsedObject;
try {
  parsedObject = JSON.parse(product.attributes); // Converts JSON string into an object
} catch (error) {
  console.error("Invalid JSON string:", error);
}
let formattedString 
// Step 2: Transform the object into the desired string format
if (parsedObject) {
  formattedString = Object.entries(parsedObject)
    .map(([key, value]) => `${key}:${value}`)
    .join(" "); // Joins key-value pairs with a space

    attributes = formattedString.split(' '); // Output: size: XS,S,L color: blue
}

useEffect(() => {

  const getCats = async () => {
    try {
      const res = await newRequest.get(`/category/cat`);
      setCats(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };
    const getSubs = async () => {
      try {
        const res = await newRequest.get(`/category/sub/${cat}`);
        setSubs(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    const getTypes = async () => {
      try {
        const res = await newRequest.get(`/category/type/${sub}`);
        setTypes(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    getCats();
    getSubs();
    getTypes()
  } , [cat , sub , type])
  return (
    <BlackBackground>

    <Container>
      <Left>
        <Image src={product?.productimage} />
      </Left>
      <Right>
      <Title>Product Information</Title>

        <InputContainer>
        
        <TextField
        name='productname'
          required
          id="outlined-required"
          label="Name"
          defaultValue={product.productname}
          onChange={handleUpdate}
        />
        <TextField
        name='productprice'
          required
          id="outlined-required"
          label="Price"
          defaultValue={product.productprice}
          type='number'
          onChange={handleUpdate}
        />
        <TextField
        name='discount'
          required
          id="outlined-required"
          label="Discount"
          defaultValue={product.discount}
          type='number'
          onChange={handleUpdate}
        />
        <TextField
        name='quantity'
          required
          id="outlined-required"
          label="Quantity"
          defaultValue={product.quantity}
          type='number'
          onChange={handleUpdate}
        />
    
        </InputContainer>
        <Title>Product Attributes</Title>
        <InputContainer>
        {attributes?.map((item, index) => {
  let title = item.split(":")[0]; 
  let value = item.split(":")[1]; 
  
  // Define variables inside the function body
if(value != ""){

  return (
      
    <TextField
    name={title}
    key={index} // Always provide a unique key for list items in React
    required
    id={`outlined-required-${index}`} // Unique ID for each TextField
    label={title} // Example label
    defaultValue={value}
    
    onChange={handleAtt}
     // Handle item structure appropriately
    />
  );

}
   
})}

        </InputContainer>
      Product Category
        <InputContainer>
        <FormControl sx={{ minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={cat}
          label="Category"
          onChange={(e) =>
            handleChange(
              e,
              "cat",
              cats?.find((cat) => cat.idCATEGORIES === e.target.value)
              ?.categoryname
            )
          }
          defaultValue={product.categorName}
          >
          {cats != [] ? cats?.map((cat) => (
            <MenuItem value={cat.idCATEGORIES} >{cat.categoryname}</MenuItem>
            
          )) : ""}
          
        </Select>
        <FormHelperText>Update Category Here</FormHelperText>
      </FormControl>
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={sub}
          label="Category"
          onChange={(e) =>
            handleChange(
              e,
              "cat",
              subs?.find((sub) => sub.id === e.target.value)
              ?.categoryname
            )
          }
          defaultValue={product.categorName}
          >
          {subs != [] ? subs?.map((sub) => (
            <MenuItem value={sub.id} >{sub.name}</MenuItem>
            
          )) : ""}
          
        </Select>
        <FormHelperText>Update Category Here</FormHelperText>
      </FormControl>
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={type}
          label="Category"
          onChange={(e) =>
            handleChange(
              e,
              "cat",
              types?.find((type) => type.id === e.target.value)
              ?.categoryname
            )
          }
          defaultValue={product.categorName}
          >
          {types != [] ? types?.map((type) => (
            <MenuItem value={type.id} >{type.name}</MenuItem>
            
          )) : ""}
          
        </Select>
        <FormHelperText>Update Category Here</FormHelperText>
      </FormControl>
      </InputContainer>

      </Right>
    </Container>
    </BlackBackground>
  )
}

export default Product
