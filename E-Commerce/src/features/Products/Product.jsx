import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import RadioGroupRating from "../../Components/rating";
import LazyAvatar from "../../Components/Pending/LazyAvatar";
import {
  primaryTextColor,
  whiteTextColor,
  secondaryTextColor,
  main,
  grayBackground,
  colorPrimaryBlack,
  colorBackgroundBlack,
  colorAccentLight,
  colorWarningDark,
  softOrange,
  colorAccentMain,
} from "../../Colors";

const Container = styled.div`
  display: flex;
  width: calc(33.33% - 15px);
  min-width: 200px;
  max-height: 500px;
  
  flex-direction: column;
  transition: all 0.2s ease-in-out;
  @media (max-width: 1000px) {
    width: calc(50% - 15px);
    min-width: 200px;
    height: 45vh;
  }
  @media (max-width: 445px) {
    width: calc(50% - 7px);
    height: 40vh;
    min-width: 150px;
    padding: 12px;
  }
  @media (max-width: 320px) {
    width: calc(50% - 12px);
    height: 40vh;
    min-width: 100px;
    padding: 12px;
  }
`;
const ImageContainer = styled.div`
  border-radius: 4px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;

  overflow:hidden;
  @media (max-width: 600px) {
    height: 60%;
  }
  background-color: ${(props) =>
    props.theme == "light" ? whiteTextColor : colorPrimaryBlack};
  
    
    img {
      
   height: 100%;
      width: 100%;
    }
`;

const InfoContainer = styled.div`
  height: fit-content;
  display: flex;
  flex-direction: column;
  padding-top: 12px ;
  gap: 8px;
 
`;
const Title = styled.p`
  color: ${(props) =>
    props.theme == "light" ? primaryTextColor : grayBackground};
  font-size: 20px;
  max-width: 350px;
  white-space: nowrap; /* Prevents text from wrapping to a new line */
  overflow: hidden; /* Hides overflowed text */
  text-overflow: ellipsis;
  /* Adds ellipsis (...) to indicate overflow */
  @media (max-width: 600px) {
    font-size: 16px;
  }
  @media (max-width: 445px) {
    font-size: 16px;
    margin: 12px 0 20px;
  }
`;

const PriceContainer = styled.p`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
`;

const Price = styled.p`
  font-size: 20px;

  color: ${({ discount, theme }) =>
    discount > 0
      ? secondaryTextColor
      : theme == "light"
      ? main
      : grayBackground};
  font-size: ${({ discount }) => (discount > 0 ? "15px" : "")};
  text-decoration: ${({ discount }) =>
    discount > 0 ? "line-through" : "none"};
  @media (max-width: 600px) {
    font-size: 14px;
  }
  @media (max-width: 425px) {
    font-size: 10px;
  }
  @media (max-width: 320px) {
    font-size: 8px;
  }
`;

const NewPrice = styled.p`
  color: ${(props) =>
    props.theme == "light" ? softOrange : colorWarningDark};
  font-size: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  @media (max-width: 600px) {
    font-size: 16px;
  }
  @media (max-width: 425px) {
    font-size: 14px;
  }
  @media (max-width: 320px) {
    font-size: 10px;
  }
  
  
  color: ${({ discount }) => (discount > 0 ? "" : primaryTextColor)};
`;

const Discount = styled.span`
  display: ${({ discount }) => (discount > 0 ? "inline-block" : "none")};
 color: ${(props) =>
    props.theme == "light" ? main : colorAccentMain};
  text-align: center;
  font-size: 10px;
  font-weight: 200;
`;

const AddToCart = styled.span`
  background-color: ${(props) =>
    props.theme == "light" ? whiteTextColor : colorBackgroundBlack};

  padding: 5px 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid;
  border-color: ${(props) =>
    props.theme == "light" ? grayBackground : colorPrimaryBlack};
  border-radius: 5px;
  color: ${(props) =>
    props.theme == "light" ? primaryTextColor : whiteTextColor};

  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: ${(props) =>
      props.theme == "light" ? main : colorAccentLight};

    color: ${whiteTextColor};
  }
`;

const RateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;
const Product = ({
  id,
  productname,
  productprice,
  productimage,
  discount,
  rate,
  theme,
}) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const price = Number(productprice) || 0;
  const discountedPrice = price * (1 - Number(discount || 0) / 100);

  return (
    <Container theme={theme}>
      {loading ? (
        // Render skeleton when loading is true
        <>
          <ImageContainer theme={theme}>
            <Skeleton
              active
              variant="rectangular"
              width={"100%"}
              height={350}
            />
          </ImageContainer>
          <InfoContainer>
            <Title>
              <Skeleton active variant="rectangular" width={150} height={20} />
            </Title>
            <PriceContainer>
              <Price>
                <Skeleton active variant="rectangular" width={80} height={20} />
              </Price>
              <Skeleton active variant="rectangular" width={30} height={30} />
            </PriceContainer>
          </InfoContainer>
        </>
      ) : (
        // Render product content when loading is false
        <>
          <ImageContainer theme={theme} >
          
            <LazyAvatar
              src={productimage}
              sx={{

                borderRadius: 2,
                height: 300,
                width: '100%', // Changed from 'fit-content'
                bgcolor: 'transparent',
                
              }}
            />
          </ImageContainer>

          <InfoContainer>
            <RateContainer>
              <Title theme={theme}>{productname}</Title>
              <RadioGroupRating theme={theme} rate={rate} />
            </RateContainer>

            <PriceContainer>
              <Price theme={theme} discount={discount}>
                $ {price.toFixed(2)}
              </Price>
              {discount > 0 && (
                <NewPrice discount={discount}>
                  {discountedPrice.toFixed(2)}$
                  {discount > 0 && (
              <Discount theme={theme} discount={discount}>
                (Save {discount}%)
              </Discount>
            )}
                </NewPrice>
              )}
              <Link to={`cardproduct/${id}`}>
                <AddToCart theme={theme}>
                  <AddIcon />
                </AddToCart>
              </Link>
            </PriceContainer>
          </InfoContainer>
        </>
      )}
    </Container>
  );
};

export default Product;
