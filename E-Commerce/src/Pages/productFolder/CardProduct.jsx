import { useState, useEffect } from "react";
import { styled } from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import newRequest from "../../utils/newRequest.js";
import { Link, useLocation } from "react-router-dom";
import FilterProduct from "./FilterProduct.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart} from "../../redux/cartRedux.js";
import { Rating } from "@mui/material";
import { Avatar } from "antd";
import AlertMessage from "../../Components/Alert";
import { useMutation, useQueryClient } from "@tanstack/react-query";


const Container = styled.div``;
const Wrapper = styled.div`
  padding: 30px;
  border-bottom: 1px solid #2e2e2e21;
  display: flex;

  &::-webkit-scrollbar {
    height: 5px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(147, 147, 147, 0.543);
  }
`;
const HartContainer = styled.div`
  border: 2px solid #009f7f;
  border-radius: 50%;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  padding: 20px;
`;
const ProductConatainer = styled.div`
  display: flex;

  width: 100%;
`;
const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;
const InfoContainer = styled.div`
  flex: 1;
`;
const Image = styled.img`
  width: 80%;
`;
const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 600;
  flex: 4;
`;
const Desc = styled.p`
  margin-bottom: 20px;
  font-size: 13px;
  color: #2e2e2eb1;
`;
const Price = styled.span`
  margin-bottom: 30px;
  color: #009f7f;
  font-size: 35px;
`;
const ColorContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  height: 50px;
  align-items: center;

  margin-top: 20px;
`;
const ColorT = styled.span`
  font-weight: 500;
  margin-right: 20px;
`;
const ColorDot = styled.span`
  padding: 2px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: ${({ isSelected }) => (isSelected ? "1px solid #009f7f" : "none")};
  transition: border 200ms ease-in-out;


`;
const Color = styled.div`
  background-color: ${(props) => props.color};
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  opacity: ${({ isSelected }) => (isSelected ? "1" : "0.7")}; 
  &:hover{

    opacity: 1;
  }
  transition: 200ms ease-in-out;
`;
const SizeContainer = styled.div`
  margin-bottom: 20px;
  width: 18%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
`;
const SizeT = styled.span`
  margin-right: 30px;
`;
const Size = styled.span`
  border: 2px solid teal;
  padding: 7px 15px;
  border-radius: 20px;
  margin-right: 10px;
  cursor: pointer;
  color: ${(props) => (props.isSelected ? "white" : "black")};
  background-color: ${(props) => (props.isSelected ? "teal" : "")};
  transition: 200ms ease-in-out;

`;
const AmountContainer = styled.div`
  display: flex;
  border: solid;
  width: 40%;
  border-radius: 10px;
  padding: 10px;
  justify-content: space-between;
  background-color: #009f7f;
  color: white;
  margin-bottom: 30px;
`;
const AddToCardContainer = styled.div`
  display: flex;

  width: 30%;
  border-radius: 10px;
  padding: 10px;
  align-items: center;
  justify-content: center;
  background-color: #009f7f;
  color: white;
  cursor: pointer;
  margin-bottom: 30px;
`;
const Amount = styled.span``;
const RelatedProduct = styled.div`
 display: grid;
  gap: 20px;

  // Conditionally set the number of columns based on props
  grid-template-columns: repeat(5, 5fr);
`;

const CategorieContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  align-items: center;
`;
const CategorieT = styled.span`
  margin-right: 50px;
`;

const SellerContainer = styled.div`
  display: flex;
`;
const SellerT = styled.div`
  margin-right: 50px;
`;
const Seller = styled.div`
  color: #009f7f;
  text-decoration: underline;
  cursor: pointer;
  &:hover {
    text-decoration: none;
  }
`;
const CompareBtn = styled.button`
  padding: 15px 10px;
  background-color: #009f7f;
  color: white;
  cursor: pointer;
  width: 10%;
`;
const Button = styled.button`
  background-color: #009f7f;
  width: 225px;
  color: white;
  margin-bottom: 32px;
`;

const Input = styled.input`
  padding: 6px;
  width: 60%;
  height: 45px;
  border-radius: 4px;
  border: 1px solid #c9c9c9;
`;
const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 8px;
  padding: 10px 20px;
  border: 1px dashed #eee;
  border-radius: 4px;
  background-color: white;
`;
const Fog = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const Name = styled.span`
  font-size: 18px;
`;
const Text = styled.span`
  font-size: 14px;
  color: #5c5c5c;
`;

const CardProduct = () => {
  const user = useSelector((state) => state.user?.currentUser);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [open, setOpen] = useState(false);
  const Location = useLocation().pathname.split("/")[2];

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [qte, setQte] = useState(0);
  const queryClinet = useQueryClient()

  //const [isReadyToAdd, setIsReadyToAdd] = useState(false);
  const [product, setProduct] = useState({});
  const [value, setValue] = useState(2);
  ///////////////////////

  const handleColorClick = (color) => {
    setSelectedColor((prevColor) => (prevColor === color ? null : color));
  };

  const handleSizeClick = (size) => {
    setSelectedSize((prevSize) => (prevSize === size ? null : size));
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await newRequest.get(`/products/product/${Location}`);
        setProduct(res.data);
      } catch (error) {
        console.log("error", error);
      }
    };

    getProduct();
  }, [Location]);

  const c = product.productcolor ? product.productcolor.split(",") : [];
  const s = product.productsize ? product.productsize.split(",") : [];

  ////reactredux
  const quantity = useSelector((state) => state.cartProduct?.quantity);
  console.log("State:", quantity);

  const handleQte = (option) => {
    {
      option == "add" ? setQte(qte + 1) : qte > 1 && setQte(qte - 1);
    }
  };

 

  
  const [price, setPrice] = useState(0);


  

const handlAction = () => {
  mutation.mutate()
}
  const handleSubmitCart = async () => {
    const productDetails = {
      ...product,
      size: selectedSize,
      color: selectedColor,
      quantity:qte
    };


    try {
      if(user?.idUSER != null){

        const response = await newRequest.post(
          `cards/cart/${user?.idUSER}/add/${Location}`,
          productDetails
        );
        if (response.status === 200) {
        
        

        setMessage("Product Added Successfully to the cart");
        setType("success");
        setOpen(true);
      } else {
        setMessage("Product Added Failed to the cart");
        setType("error");
        setOpen(true);
      }
      }else{
        setMessage("You need to LOGIN first");
            setType("error");
            setOpen(true);
      }

      
    } catch (error) {
      console.error("Error adding product:", error);
      message.error("Failed to add product.");
    }
  };
  const mutation = useMutation({
    mutationFn:handleSubmitCart,
    onSuccess: () => {
      queryClinet.invalidateQueries(['cart'])
    }
  })
  const handleWish = async () => {
    try {
      const response = await newRequest.post(
        `wish/${user?.idUSER}/add/${Location}`
      );

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

  const [text, setText] = useState("");

  const handlChange = (e) => {
    setText((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  
  const handleSubmit = async () => {
    const reviewDetails = {
      rate: value,
      text: text.text,
    };

    try {
      const response = await newRequest.post(
        `review/submit-review/${user?.idUSER}/${Location}`,
        reviewDetails
      );
      

      if (response.status === 200) {
        message.success("Review added successfully.");
      } else {
        message.error("Review to add product.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      message.error("Failed to add Review.");
    }
  };

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const res = await newRequest.get(`review/product-reviews/${Location}`);
        setReviews(res.data);
      } catch (error) {
        console.log("error", error);
      }
    };

    getReviews();
  }, []);

  const [total, setTotal] = useState([]);

  useEffect(() => {
    const getTotal = async () => {
      try {
        const res = await newRequest.get(`review/total-review/${Location}`);
        setTotal(res.data);
      } catch (error) {
        console.log("error", error);
      }
    };

    getTotal();
  }, []);

  return (
    <Container>
        <AlertMessage open={open} setOpen={setOpen} message={message} type={type} />

      <Wrapper>
        <ProductConatainer>
          <ImageContainer>
            <Image src={product.productimage} />
          </ImageContainer>
          <InfoContainer>
            <Title>{product.productname}</Title>

            <Desc>{product.productdesc}</Desc>
            <Price> $ {product.productprice}</Price>
            <ColorContainer>
              <ColorT>Color</ColorT>
              {c &&
                c.length > 0 &&
                c?.map((color, index) => (
                  <ColorDot
                    key={index}
                    isSelected={color === selectedColor}
                    onClick={() => handleColorClick(color)}
                  >
                    <Color color={color} isSelected={color === selectedColor}></Color>
                  </ColorDot>
                ))}
            </ColorContainer>
            <hr style={{ marginBottom: 30 }}></hr>
            <SizeContainer>
              <SizeT>Size</SizeT>
              {s &&
                s.length > 0 &&
                s?.map((size, index) => (
                  <Size
                    key={index}
                    isSelected={size === selectedSize}
                    onClick={() => handleSizeClick(size)}
                  >
                    {size}
                  </Size>
                ))}
            </SizeContainer>

            {qte == 0 ? (
              <AddToCardContainer onClick={() => handleQte("add")}>
                ADD TO CARD
              </AddToCardContainer>
            ) : (
              <>
                <AmountContainer>
                  <AddIcon
                    className="cursor-pointer"
                    onClick={() => handleQte("add")}
                    sx={{cursor:'pointer'}}
                  />
                  <Amount>{qte}</Amount>
                  <RemoveIcon
                    className="cursor-pointer"
                    onClick={() => handleQte("remove")}
                    sx={{cursor:'pointer'}}
                  />
                </AmountContainer>
                <Button
                  onClick={() => {
                    
                    setPrice(product.productprice);
                    handlAction();
                  }}
                >
                  ADD TO CARD
                </Button>
              </>
            )}

            <hr style={{ marginBottom: 60 }}></hr>
            <CategorieContainer>
              <CategorieT>Categories</CategorieT>
            </CategorieContainer>
            <SellerContainer>
              <SellerT>Owner</SellerT>
              <Seller>Clothing Shop</Seller>
            </SellerContainer>
          </InfoContainer>
          <HartContainer onClick={handleWish}>
            <FavoriteBorderIcon sx={{ color: "#009f7f", cursor: "pointer" }} />
          </HartContainer>
        </ProductConatainer>
      </Wrapper>

      <Wrapper
        style={{
          alignItems: "center",
          padding: 0,
          height: 100,
          margin: 0,
        }}
      >
        <Title
          style={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            borderRight: "1px solid #2e2e2e21",
            marginBottom: "0px",
            padding: 20,
          }}
        >
          Product Reviews ({total[0]?.total})
        </Title>
      </Wrapper>
      {reviews == null ? (
        <Wrapper style={{ padding: "0", height: 100 }}>
          <Title
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#2e2e2e71",
            }}
          >
            No reviews found
          </Title>
        </Wrapper>
      ) : (
        <Wrapper
          style={{
            padding: "20px 20px",
            gap: 20,
            backgroundColor: "#eee",
            height: 140,
            contain: "paint",
            width: "100%",
            overflow: "auto",
          }}
        >
          {reviews?.map((item) => (
            <ReviewContainer>
              <Fog>
                <Avatar src={item.userimage} />
                <Name>{item.reviewer}</Name>
                <Rating
                  name="simple-controlled"
                  value={item.rate}
                  readOnly
                  style={{ marginLeft: "auto" }}
                />
              </Fog>
              <Text>{item.text}</Text>
            </ReviewContainer>
          ))}
        </Wrapper>
      )}

      <Wrapper>
        <Title
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#2e2e2e71",
            gap: "32px",
          }}
        >
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
          <Input name="text" placeholder="Add Review" onChange={handlChange} />
          <Button onClick={handleSubmit} style={{ fontSize: 16, margin: 0 }}>
            Add Review
          </Button>
        </Title>
      </Wrapper>
      <Wrapper style={{ display: "flex", flexDirection: "column" }}>
        <Title>Compare Between Product</Title>
        <Link to={`/compare/${Location}`}>
          <CompareBtn>Compare</CompareBtn>
        </Link>
      </Wrapper>
      <Wrapper style={{ display: "flex", flexDirection: "column" }}>
          <Title>Similar Product</Title>
        <RelatedProduct>
        </RelatedProduct>
      </Wrapper>
    </Container>
  );
};

export default CardProduct;
