import { IconButton, Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import { useSelector } from "react-redux";
import newRequest from "../../../utils/newRequest";
import { Link, useLocation } from "react-router-dom";
import me from "../../../assets/Lotties/Animation - 1716145973359.json"
import Lottie from "lottie-react";
import MoreHorizTwoToneIcon from "@mui/icons-material/MoreHorizTwoTone";
import Loading from "../../../Components/Pending/Loading";
import Product from "../../../Components/updateForms/Product";
import { colorAccentDark, colorAccentDarkTransparent, colorAccentLight, colorAccentMedium, colorAccentMediumTransparent, colorAccentSoft, colorAccentSoftTransparent, colorAccentSub, colorAccentSubDark, colorBackgroundBlack, colorBackgroundGray, colorPrimaryBlack, grayBackground, lightSoftMain, main, primaryTextColor, subColumnMain, whiteTextColor } from "../../../Colors";
import LazyAvatar from "../../../Components/Pending/LazyAvatar";




const Container = styled.div`
  background-color: ${props => props.theme == "light" ? whiteTextColor : colorPrimaryBlack};
  

`;
const Table = styled.div`
  background-color: ${props => props.theme == "light" ? whiteTextColor : colorPrimaryBlack};
  @media (max-width: 768px) {
  min-width: 200vh;
}

`;
const Tags = styled.div`
  display: flex;
  background-color: ${props => props.theme == "light" ? main : colorAccentDark};
  padding: 12px;
  @media (max-width: 768px) {
  min-width: 200vh;
}
`;
const TagRow = styled.div`
  text-align: center;
  flex: 1;
  color: ${whiteTextColor};

`;
const Row = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  background-color: ${props => props.theme == "light" ? whiteTextColor : colorAccentDarkTransparent};
  color: ${props => props.theme == "light" ? primaryTextColor : whiteTextColor};

  border-top: 1px solid ${props => props.theme == "light" ? grayBackground : colorBackgroundGray};
  
`;
const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex: 2;
`;
const ShopList = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Shops = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 4px;
  text-align: center;
`;
const Image = styled.img`
  width: 45px;
  height: 45px;
  object-fit: contain;
  border: 1px solid ${props => props.theme == "light" ? grayBackground : colorBackgroundGray};
  border-radius: 4px;
`;
const Name = styled.span``;


const OrderDetails = styled.div`

  border-radius: 4px;
  max-height: ${(props) =>
    props.show
      ? "1200px"
      : "0"}; /* Adjust max-height based on your content size */
  overflow: hidden;
  transition: max-height 200ms ease-in-out; /* Smooth transition */
  display: flex;
  flex-direction: column;
  width: auto;
  min-width: 600px;
`;

const Details = styled.div`
  padding: 20px;
  background-color: ${props => props.theme == "light" ? lightSoftMain : colorAccentSoftTransparent};
  color: ${props => props.theme == "light" ? primaryTextColor : whiteTextColor};
  border-radius: 4px;
  display: flex;
  align-items: center;
`;

const Detail = styled.div`
  flex: 1;
  font-size: 18px;
  align-items: center;
  justify-content: ${(props) =>
    props.type === "Product" ? "start" : "center"};
  display: flex;
  gap: 4px;
`;

const LottieContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const tableTagsOwner = [
  {
    title: "Product",
    flex: 2,
    position: "center",
  },
  {
    title: "Category",
    flex: 1,
    position: "center",
  },
  {
    title: "Quantity",
    flex: 1,
    position: "center",
  },

  {
    title: "Rate",
    flex: 1,
    position: "center",
  },
  {
    title: "Price",
    flex: 1,
    position: "center",
  },
  {
    title: "discount",
    flex: 1,
    position: "center",
  },
  {
    title: "Action",
    flex: 1,
    position: "center",
  },
];
const tableTagsAdmin = [
  {
    title: "Product",
    flex: 2,
    position: "center",
  },
  {
    title: "Category",
    flex: 1,
    position: "center",
  },
  {
    title: "Shops",
    flex: 1,
    position: "center",
  },

  {
    title: "rate",
    flex: 1,
    position: "center",
  },

  {
    title: "Price",
    flex: 1,
    position: "center",
  },
  {
    title: "Discount",
    flex: 1,
    position: "center",
  },
  {
    title: "Action",
    flex: 1,
    position: "center",
  },
];

// Helper functions
const getTagsForCategory = (product) => {
  switch (product.categoryName) {
    case "Cloths":
      return ["Size", "Color"];
    case "Food":
      return ["Calories (100g)", "Protein (100g)", "Carbs (100g)", "Sugar (100g)", "Expiration Date"];
    case "Fitness":
      return product?.subname === "Tools" ? ["Craft Material", "Weight", "Height"] : [];
    case "Electronics":
      return [
        "RAM",
        "CPU",
        "GPU",
        ...(product?.subname === "Mobile" || product?.subname === "Tablet" ? ["Camera"] : []),
        "Battery",
        "Storage",
        "Screen Size",
      ];
    case "Decors":
      return [
        "Craft Material",
        "Dimensions",
        "Weight",
        "Colors",
        ...(product?.subname === "Furniture\n" ? ["Shape", "Finish"] : ["Power Rating"]),
        
        ...(product?.typename === "Laundry" ? ["Capacity" ,"Function","Smart Features"] : product?.typename == 'Fridge' ? ["Temp Range", "Function" ,"Smart Features"] : ''),
      ];
    case "Book":
      return ["Auteur", "Publication Year", "Genre", "Language"];
    default:
      return [];
  }
};




const ProductList = ({ productData , loading , handle }) => {
  const theme = useSelector((state) => state.theme.mode);

  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [edited, setEdited] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();
 
  
  const Location = useLocation().pathname.split("/")[1]
  const user = useSelector((state) => state.user?.currentUser);

  const handleToggleOrderDetails = (orderId) => {
    setSelectedOrderId(selectedOrderId === orderId ? null : orderId);
  };

 
 
 
  return (
    <Container theme={theme}>
    {/* Render table headers based on user role */}
    <Tags theme={theme}>
      {(user?.userRole === "admin" && Location == "products" ? tableTagsAdmin : tableTagsOwner).map((item, index) => (
        <TagRow key={index} style={{ flex: item.flex, textAlign: item.position }}>
          {item.title}
        </TagRow>
      ))}
    </Tags>

    {/* Render product rows */}
    {productData != '' && !loading ? (
      productData.map((product , index) => {
        const tags = getTagsForCategory(product);
        const parsedAttributes = product?.attributes ? JSON.parse(product.attributes) : null;
        
          
          console.log(productData[index])
           
        return (
          <Table theme={theme} >
            <Row theme={theme}>
              <ProductInfo theme={theme}>
             
                <LazyAvatar
  src={product?.productimage}
  sx={{
    bgcolor: theme === "light" ? whiteTextColor: colorPrimaryBlack ,
    borderRadius: '4px',
    padding:'4px',
    border: `1px solid ${theme == "light" ? grayBackground : colorBackgroundBlack}`,
    width: '45px' ,
    height: 45,
    objectFit: 'contain',
     }}
/>
                <Name>{product.productname}</Name>
              </ProductInfo>
              <Detail theme={theme}>{product.categoryName}</Detail>

              {user?.userRole === "admin" && Location == "products" ? (
                <ShopList>
                  <Link to={`/Shops/${product.isshop}`}>
              
                    <LazyAvatar
  src={product?.shopimage}
  sx={{
    bgcolor: theme === "light" ? whiteTextColor: colorPrimaryBlack ,
    borderRadius: '4px',
    width: '40px' ,
    height: 40,
    textAlign:'center',
   
     }}
/>
                  </Link>
                </ShopList>
              ) : (
                <Detail>{product.quantity}</Detail>
              )}

              <Detail>
                <Rating sx={{borderColor:'white'}} value={product.avgRate} readOnly />
              </Detail>
              <Detail>${product.productprice}</Detail>
              <Detail>{product.discount}%</Detail>

              <Detail>
                {user?.userRole == "admin" && Location != "products" ?
                
                <IconButton color="success" onClick={() => {setEdited(product?.idPRODUCT) , setSelectedProduct(product)}}>
                  <EditTwoToneIcon  style={{ color: main }} />
                </IconButton> : ''
                }
                <IconButton color="error" onClick={() => handle(product.idPRODUCT)}>
                  <DeleteForeverOutlinedIcon color="error" />
                </IconButton>
                {user?.userRole == "admin" && Location != "stock" ? ''
                :
                <IconButton
                color="secondary"
                onClick={() => handleToggleOrderDetails(product?.idPRODUCT)}
                style={{
                  rotate: selectedOrderId === product.idPRODUCT ? "90deg" : "0deg",
                  transition: "200ms",
                }}
                >
                  <MoreHorizTwoToneIcon color="secondary" />
                </IconButton>
                }
              </Detail>
            </Row>
            {/* Order Details */}
{user?.userRole == "admin" && Location != "stock" ? '' :
            <OrderDetails theme={theme} show={selectedOrderId === product?.idPRODUCT}>
              <Tags style={{backgroundColor: theme == "light" ? subColumnMain : colorAccentMedium}}>
                {tags.map((tag, index) => (
                  <TagRow key={index}>{tag}</TagRow>
                ))}
              </Tags>
              <Details theme={theme}>
                {product?.categoryName == "Cloths" ? 
                <>
                <Detail>{parsedAttributes?.size}</Detail>
                <Detail>
                  {parsedAttributes?.color?.split(",").map((color, index) => (
                    <div key={index} style={{ backgroundColor: color, width: 24, height: 24, borderRadius: "50%" }} />
                  ))}
                </Detail>
                  </>
                : product?.categoryName == "Food" ?
<>
                <Detail>{parsedAttributes?.Cal} g</Detail>
                <Detail>{parsedAttributes?.protein} g</Detail>
                <Detail>{parsedAttributes?.carbs} g</Detail>
                <Detail>{parsedAttributes?.sugar} g</Detail>
                <Detail>{parsedAttributes?.expiration}</Detail>
                
                  </>
              :  product?.categoryName == "Fitness" ?
              product?.subname == "Tools" ? 
              <>
              <Detail>{parsedAttributes?.material}</Detail>
              <Detail>{parsedAttributes?.weight} KG</Detail>
              <Detail>{parsedAttributes?.height} cm</Detail>
              
              
                </>
              :''
              : product?.categoryName == "Electronics" ?
              <>
                <Detail>{parsedAttributes?.RAM}GB</Detail>
                <Detail>{parsedAttributes?.CPU}</Detail>
                <Detail>{parsedAttributes?.GPU}</Detail>
                <Detail>{parsedAttributes?.battery} MAH</Detail>
                <Detail>{parsedAttributes?.storage} GB</Detail>
                {product?.subname == "Mobile" || "Tablet" ? 
                <Detail>{parsedAttributes?.camera} PX</Detail>
                : ''}
                
                  </>
              : product?.categoryName == "Decors" ?
              <>
              <Detail>{parsedAttributes?.material}</Detail>
                <Detail>{parsedAttributes?.dimension}</Detail>
                <Detail>{parsedAttributes?.weight} KG</Detail>
                <Detail><Detail>
                  {parsedAttributes?.colors?.split(",").map((color, index) => (
                    <div key={index} style={{ backgroundColor: color, width: 34, height: 12, borderRadius: "8px" , border:'1px solid' }} />
                  ))}
                </Detail></Detail>
                <Detail>{parsedAttributes?.shape}</Detail>
                <Detail>{parsedAttributes?.finish}</Detail>
                
                </> 
              : ''}
              </Details>
            </OrderDetails>
        }
          </Table>
        );
      })
    ) : loading ? <Loading /> : (
      <LottieContainer>
        <Lottie animationData={me} style={{ width: "33%" }} />
        No Product Found
      </LottieContainer>
    )}

    {edited && selectedProduct != "" ? <Product product={selectedProduct} setEdited={setEdited} theme={theme} /> : ""}
  </Container>
  );
};

export default ProductList;
