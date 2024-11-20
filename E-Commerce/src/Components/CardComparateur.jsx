import styled from "styled-components";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
//Styled Component part
const Container = styled.div`
  height: 100%;
  border-right: 2px solid;
  border-color: #80808043;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  
`;

const RemoveContainer = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  
  
  background-color: #eee;
`;

const ProductContainer = styled.div`
  
  display: flex;
  flex-direction: column;
  align-items: center;
  
`;

const ImageContainer = styled.div`

`;

const InfoContainer = styled.div`
  width: 100%;

height:190px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Price = styled.div`
  
  
  width: 100%;
  text-align: center;
`;

const Review = styled.div`
 
  width: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
`;

const Desc = styled.p`
  
  width: 178px;
  text-align: center;
  font-size: 10px;
  padding: 5px 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: #989696f5;
`;

const Image = styled.img`
  width: 100%;
`;


const AddToCardContainer = styled.div`
  display: flex;

  width: 100%;
  
  padding: 8px 20px;
  align-items: center;
  justify-content: center;
  background-color: #009f7f;
  color: white;
  margin-bottom: 30px;
`;

const Title = styled.p`
  color: #009f7f;
  font-weight: 600;
  border: 1px solid;
  border-color: #80808033;
  width: 100%;
  text-align: center;
`;

const Stock = styled.div`
  
  width: 100%;
  text-align: center;
`;

// Component
const CardComparateur = ({ img, price, Reviews, desc, title, IsStock }) => {
  const [count, setCount] = useState(0);

  const handleAdd = () => {
    setCount(count + 1);
  };

  const handleRemove = () => {
    setCount(count - 1);
  };

  return (
    <Container>
      <RemoveContainer>
        <CloseIcon
          style={{
            borderRadius: 20,
            color: "grey",
            width: 15,
            height: 15,
            cursor: "pointer",
          }}
        />
      </RemoveContainer>
      <ProductContainer>
        <ImageContainer>
          <Image src={img} />
        </ImageContainer>

        <InfoContainer>
          <Title>{title}</Title>
          <Price>{price}$</Price>
          <Review>
            <Stack spacing={1}>
              <Rating
                name="half-rating-read"
                defaultValue={Reviews}
                precision={0.5}
                readOnly
              />
            </Stack>
          </Review>
          <Stock>{IsStock ? "yes" : "no"}</Stock>
          <Desc>{desc}</Desc>
        </InfoContainer>
      </ProductContainer>
     
           <AddToCardContainer>
go to product
            
           </AddToCardContainer>

   
      
    </Container>
  );
};

export default CardComparateur;
