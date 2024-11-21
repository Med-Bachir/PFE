import { IconButton, Rating } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import { useSelector } from "react-redux";
import newRequest from "../utils/newRequest";
import { Link } from "react-router-dom";
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

const ProductList = ({ productData }) => {
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [edited, setEdited] = useState(null);
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
      <Tags>
        {user?.userRole == "admin"
          ? tableTagsAdmin.map((item) => (
              <TagRow
                style={{ flex: `${item.flex}`, textAlign: `${item.position}` }}
              >
                {item.title}
              </TagRow>
            ))
          : tableTagsOwner.map((item) => (
              <TagRow
                style={{ flex: `${item.flex}`, textAlign: `${item.position}` }}
              >
                {item.title}
              </TagRow>
            ))}
      </Tags>
      {productData != "" ? (
        productData.map((product) => (
          <>
            <Row>
              <ProductInfo>
                <Image src={product.productimage} />
                <Name>{product.productname}</Name>
              </ProductInfo>
              <Detail>{product.categoryName}</Detail>

              {user?.userRole == "admin" ? (
                <ShopList>
                  <Link to={`/Shops/${product.isshop}`}>
                    <Shops src={product.shopName} />
                  </Link>
                </ShopList>
              ) : (
                <ProductDet>
                  <Detail>{product.quantity}</Detail>
                </ProductDet>
              )}

              <Detail>
                <Rating
                  name="read-only"
                  style={{ textAlign: "center" }}
                  value={product?.avgRate}
                  readOnly
                />
              </Detail>
              <Detail>${product.productprice}</Detail>
              <Action>
                <IconButton>
                  <EditTwoToneIcon style={{ color: "#02C3D1" }} />
                </IconButton>
                <IconButton onClick={() => handleDelete(product.idPRODUCT)}>
                  <DeleteForeverOutlinedIcon style={{ color: "#E60000" }} />
                </IconButton>
                <IconButton
                  onClick={() => handleToggleOrderDetails(product?.idPRODUCT)}
                  sx={{
                    rotate:
                      selectedOrderId === product?.idPRODUCT ? "90deg" : "0",
                    transition: "200ms",
                  }}
                >
                  <MoreHorizTwoToneIcon color="secondary" />
                </IconButton>
              </Action>
            </Row>
            <OrderDetails show={selectedOrderId === product?.idPRODUCT}>
              <Tags>
                {(product.categoryName == "Cloths"
                  ? ["Size", "Color"]
                  : []
                ).map((tag, index) => (
                  <TagRow key={index} tag={tag}>
                    {tag}
                  </TagRow>
                ))}
              </Tags>

              <Details>
                <Size style={{ flex: 1, textAlign: "center" }}>
                  {product?.attributes
                    ? // Parse the JSON string from attributes to an object
                      JSON.parse(product?.attributes).size
                    : null}
                </Size>
                <Color style={{ flex: 1, textAlign: "center" }}>
                  {JSON.parse(product?.attributes)
                    ?.color.split(",")
                    .map((item) => (
                      <Circl color={item} />
                    ))}
                </Color>
              </Details>
            </OrderDetails>
          </>
        ))
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
