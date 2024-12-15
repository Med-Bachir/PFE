import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import RadioGroupRating from "../../Components/rating";
import { primaryTextColor, whiteTextColor , secondaryTextColor , main, grayBackground, colorElementBackgroundGray, colorBackgroundGray, colorPrimaryBlack, colorAccentDarkTransparent, colorBackgroundBlack, colorAccentLight, colorAccentMedium, colorAccentMediumTransparent } from "../../Colors";

const Container = styled.div`
  display: flex;
  width: 100%;
  max-height: 500px;
  padding: 20px;
  flex-direction: column;
  border-radius: 4px;
  background-color: ${props => props.theme == 'light' ? whiteTextColor : colorPrimaryBlack };
  color: ${props => props.theme == 'light' ? primaryTextColor : whiteTextColor };
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    box-shadow:${props => props.theme == 'light' ? 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px , rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;': 'rgba(56, 56, 56, 0.1) 0px 4px 6px -1px , rgba(56, 56, 56, 0.06) 0px 2px 4px -1px;'};
  }
  

`;
const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  position: relative;
  contain: paint;
`
const Image = styled.img`
height: 300px;
width: 100%;
  object-fit: contain;

`;

const InfoContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
 
 
  

`;
const Title = styled.p`

color: ${props => props.theme == 'light' ? primaryTextColor : grayBackground };
  
  font-size: 20px;
  margin: 20px 0;
  max-width: 350px;
  contain: paint;
  

  white-space: nowrap;        /* Prevents text from wrapping to a new line */
  overflow: hidden;           /* Hides overflowed text */
  text-overflow: ellipsis;    /* Adds ellipsis (...) to indicate overflow */
`;

const PriceContainer = styled.p`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  
`;

const Price = styled.p`
  font-size: 20px;

  color: ${({ discount , theme}) => (discount > 0 ? secondaryTextColor : theme == 'light' ? primaryTextColor : grayBackground)};
  font-size: ${({ discount }) => (discount > 0 ? "15px" : "")};
  text-decoration: ${({ discount }) =>
    discount > 0 ? "line-through" : "none"};
`;

const NewPrice = styled.p`
  font-size: 20px;

  color: ${({ discount }) => (discount > 0 ? "" : primaryTextColor)};
`;

const Discount = styled.span`
  display: ${({ discount }) => (discount > 0 ? "inline-block" : "none")};
  background-color: ${props => props.theme == 'light' ? main : colorAccentMediumTransparent };
  padding: 5px 7px;
  border-radius: 4px;
  color: ${whiteTextColor};
  font-weight: 500;
  font-size: 14px;
  position: absolute;
  right: 0;
  top: 0;
`;

const AddToCart = styled.span`
  background-color: ${props => props.theme == 'light' ? whiteTextColor : colorBackgroundBlack };

  padding: 5px 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid;
  border-color: ${props => props.theme == 'light' ? grayBackground : colorPrimaryBlack };
  border-radius: 5px;
  color: ${props => props.theme == 'light' ? primaryTextColor : whiteTextColor };

  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: ${props => props.theme == 'light' ? main : colorAccentLight };

    color: ${whiteTextColor};
  }
`;

const RateContainer = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
`


const Product = ({ id, productname, productprice, productimage, discount , rate , theme}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const discountedPrice = productprice * (1 - discount / 100);

  return (
    <Container theme={theme}>
      {loading ? (
        // Render skeleton when loading is true
        <>
        <ImageContainer>

        <Skeleton
          active
          variant="rectangular"
          width={"100%"}
          height={350}
          />
          </ImageContainer>
          <InfoContainer>
            <Title>

          <Skeleton
          active
          variant="rectangular"
          width={150}
          height={20}
          />
          </Title>
          <PriceContainer>
            <Price>
            <Skeleton
          active
          variant="rectangular"
          width={80}
          height={20}
          />
            </Price>
            <Skeleton
          active
          variant="rectangular"
          width={30}
          height={30}
          />
          </PriceContainer>
          </InfoContainer>
          </>
      ) : (
        // Render product content when loading is false
        <>
          <ImageContainer style={{ cursor: "pointer" }}>
            {discount > 0 && (
              <Discount theme={theme}  discount={discount}>{discount}%</Discount>
            )}
            <Image src={productimage} />
          </ImageContainer>

          <InfoContainer>
            <RateContainer>

            <Title theme={theme}>{productname}</Title>
            <RadioGroupRating theme={theme} rate={rate} />
            </RateContainer>
            

            <PriceContainer>
              <Price theme={theme} discount={discount}>$ {productprice.toFixed(2)}</Price>
              {discount > 0 && (
                <NewPrice discount={discount}>
                  {discountedPrice.toFixed(2)}$
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
