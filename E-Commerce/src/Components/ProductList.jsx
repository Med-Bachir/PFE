import { IconButton, Rating } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import { useSelector } from "react-redux";
import newRequest from "../utils/newRequest";
import { Link, useLocation } from "react-router-dom";
import me from "./../Animation - 1716145973359.json";
import Lottie from "lottie-react";
import MoreHorizTwoToneIcon from "@mui/icons-material/MoreHorizTwoTone";

const Container = styled.div``;
const Tags = styled.div`
  display: flex;
  background-color: #cbfef48d;
  padding: 12px;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
`;
const TagRow = styled.div`
  text-align: center;
  flex: 1;
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;

  border-top: 1px solid #eee;
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
  border: 1px solid #eee;
  padding: 6px;
  border-radius: 4px;
`;
const Name = styled.span``;

const ProductDet = styled.div`
  display: flex;
  text-align: center;
  flex: 1;
`;

const Size = styled.div`
  text-align: center;
  flex: 1;
`;

const Color = styled.div`
  flex: 1;
  display: flex;
  align-content: center;
  justify-content: center;
  gap: 4px;
`;

const Shop = styled.div`
  flex: 1;
`;

const Circl = styled.div`
  background-color: ${(props) =>
    props.color != null ? `${props.color}` : "green"};

  width: 24px;
  border-radius: 8px;
  height: 8px;
  opacity: 0.6;
`;
const Action = styled.div`
  display: flex;

  flex: 1;
  justify-content: center;
`;
const OrderDetails = styled.div`
  background-color: #ffffffb8;
  margin: 0 20px;
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
  background-color: #dcfff729;
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
    case "Dicors":
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




const ProductList = ({ productData }) => {
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [edited, setEdited] = useState(null);
  const Location = useLocation().pathname.split("/")[1]
  const user = useSelector((state) => state.user?.currentUser);

  const handleToggleOrderDetails = (orderId) => {
    setSelectedOrderId(selectedOrderId === orderId ? null : orderId);
  };

  const handleDelete = async (id) => {
    try {
      const response = await newRequest.delete(
        `/products/delete-product/${id}`
      );
      console.log(response.status);

      if (response.status === 200) {
        message.success("Product added successfully.");
      } else {
        message.error("Failed to add product.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      message.error("Failed to add product.");
    }
  };
  return (
    <Container>
    {/* Render table headers based on user role */}
    <Tags>
      {(user?.userRole === "admin" && Location == "products" ? tableTagsAdmin : tableTagsOwner).map((item, index) => (
        <TagRow key={index} style={{ flex: item.flex, textAlign: item.position }}>
          {item.title}
        </TagRow>
      ))}
    </Tags>

    {/* Render product rows */}
    {productData.length > 0 ? (
      productData.map((product) => {
        const tags = getTagsForCategory(product);
        const parsedAttributes = product?.attributes ? JSON.parse(product.attributes) : null;

        return (
          < >
            <Row>
              <ProductInfo>
                <Image src={product.productimage} />
                <Name>{product.productname}</Name>
              </ProductInfo>
              <Detail>{product.categoryName}</Detail>

              {user?.userRole === "admin" && Location == "products" ? (
                <ShopList>
                  <Link to={`/Shops/${product.isshop}`}>
                    <Shops src={product.shopimage} />
                  </Link>
                </ShopList>
              ) : (
                <Detail>{product.quantity}</Detail>
              )}

              <Detail>
                <Rating value={product.avgRate} readOnly />
              </Detail>
              <Detail>${product.productprice}</Detail>
              <Detail>{product.discount}%</Detail>

              <Detail>
                <IconButton>
                  <EditTwoToneIcon style={{ color: "#02C3D1" }} />
                </IconButton>
                <IconButton onClick={() => handleDelete(product.idPRODUCT)}>
                  <DeleteForeverOutlinedIcon style={{ color: "#E60000" }} />
                </IconButton>
                {user?.userRole == "admin" && Location != "stock" ? ''
                :
                <IconButton
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
            <OrderDetails show={selectedOrderId === product?.idPRODUCT}>
              <Tags>
                {tags.map((tag, index) => (
                  <TagRow key={index}>{tag}</TagRow>
                ))}
              </Tags>
              <Details>
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
              : product?.categoryName == "Dicors" ?
              <>
              <Detail>{parsedAttributes?.material}</Detail>
                <Detail>{parsedAttributes?.dimension}</Detail>
                <Detail>{parsedAttributes?.weight} KG</Detail>
                <Detail>{parsedAttributes?.colors}</Detail>
                <Detail>{parsedAttributes?.shape}</Detail>
                <Detail>{parsedAttributes?.finish}</Detail>
                
                </> 
              : ''}
              </Details>
            </OrderDetails>
        }
          </>
        );
      })
    ) : (
      <LottieContainer>
        <Lottie animationData={me} style={{ width: "33%" }} />
        No Product Found
      </LottieContainer>
    )}
  </Container>
  );
};

export default ProductList;
