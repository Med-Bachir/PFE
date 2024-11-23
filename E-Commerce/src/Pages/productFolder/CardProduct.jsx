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
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';

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
const HeartContainer = styled.div`
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
  display: flex;
  height: 50px;
  align-items: center;
  gap: 8px;
`;
const ColorT = styled.span`
  font-weight: 500;
  margin-right: 20px;
`;
const ColorDot = styled.span`
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: ${({ isSelected }) => (isSelected ? "1px solid #009f7f" : "none")};
  transition: border 200ms ease-in-out;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;

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
  
  width: fit-content;
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
  margin-top: 20px;
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
const Categorie = styled.span`
  margin-right: 50px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
`;

const SellerContainer = styled.div`
  display: flex;
`;
const Seller = styled.div`
  margin-right: 50px;
`;
const Shope = styled.div`
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
const AttributeContainer = styled.div`
display: flex;
flex-direction: column;
padding: 20px 0;
gap: 8px;
`;
const Attribute = styled.div`
display: flex;
gap: 8px;
align-items: center;
margin: 10px 0;


`;
const AttributeName = styled.span`
  font-size: 18px;
  color: #4e4e4e;
`;
const AttributeValue = styled.span`
  font-size: 16px;
  color: #959595;
`;

const CardProduct = () => {
  const user = useSelector((state) => state.user?.currentUser);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [open, setOpen] = useState(false);
  const [isWish, setIsWish] = useState(false);
  const Location = useLocation().pathname.split("/")[2];
  const [selectedAttributes, setSelectedAttributes] = useState(null);

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [qte, setQte] = useState(0);
  const queryClinet = useQueryClient()

  //const [isReadyToAdd, setIsReadyToAdd] = useState(false);
  const [product, setProduct] = useState({});
  const [value, setValue] = useState(2);
  ///////////////////////
  const handleAttributes = (name, value) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [name]: value,
    }));
  
    console.log(selectedAttributes);
  };
  
 
  const handleColorClick = (color) => {
    setSelectedColor((prevColor) => (prevColor === color ? null : color));
  };

  const handleSizeClick = (size) => {
    setSelectedSize((prevSize) => (prevSize === size ? null : size));
  };


  const Wish = async () => {
    try {
      const res = await newRequest.get(`/wish/${Location}/${user?.idUSER}`);
      setIsWish(res.data);
    } catch (error) {
      console.log("error", error);
    }
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

  useEffect(() => {
    

    Wish();
  }, [Location]);

  

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
      attributes:selectedAttributes,
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
        setMessage("Product add to wish list");
        setType("success");
        setOpen(true);
      } else {
        setMessage("Please login first !!");
        setType("error");
        setOpen(true);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      setMessage("Something is wrong try again later !!");
      setType("error");
      setOpen(true);
    }
    Wish();
  };
  const removeWish = async () => {
    try {
      const response = await newRequest.delete(
        `wish/${user?.idUSER}/delete/${Location}`
      );
      
      if (response.status === 200) {
        setMessage("Product removed successfully");
        setType("success");
        setOpen(true);
        Wish()
      } else {
        setMessage("Failed to remove product!! Contact Us");
        setType("error");
        setOpen(true);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const [text, setText] = useState("");

  const handlChange = (e) => {
    setText((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const getReviews = async () => {
    try {
      const res = await newRequest.get(`review/product-reviews/${Location}`);
      setReviews(res.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  
  const handleSubmit = async () => {
   
    const reviewDetails = {
      rate: value,
      text: text.text,
    };
    if(user){

      try {
        const response = await newRequest.post(
          `review/submit-review/${user?.idUSER}/${Location}`,
          reviewDetails
        );
      
      
      if (response.status === 200) {
        message.success("Review added successfully.");
        getReviews()
      } else {
        message.error("Review to add product.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      message.error("Failed to add Review.");
    }
  } else {
    setMessage("Please Login First!!");
        setType("error");
        setOpen(true);
  }
    
  };
  
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
   

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



  const categoryAttributesConfig = {
    Cloths: {
      fields: [
        { key: "color", label: "Color", type: "color", split: true },
        { key: "size", label: "Size", type: "size", split: true },
      ],
    },
    Food: {
      fields: [
        { key: "calories", label: "Calories", suffix: " Cal" },
        { key: "carbs", label: "Carbohydrates", suffix: " g" },
        { key: "sugar", label: "Sugar", suffix: " g" },
        { key: "protein", label: "Protein", suffix: " g" },
        { key: "expiration", label: "Expiration Date" },
      ],
    },
    Electronics: {
      fields: [
        { key: "RAM", label: "RAM", suffix: " GB" },
        { key: "CPU", label: "CPU" },
        { key: "GPU", label: "GPU" },
        { key: "battery", label: "Battery Capacity", suffix: " MAH" },
        { key: "storage", label: "Storage", suffix: " GB" },
        { key: "camera", label: "Camera", suffix: " PX", condition: (p) => ["Tablet", "Mobile"].includes(p.subname) },
      ],
    },
    Fitness: {
      fields: [
        { key: "height", label: "Height", suffix: " cm" },
        { key: "weight", label: "Weight", type: "size", split: true, suffix: " KG" },
        { key: "material", label: "Craft Material" },
      ],
    },
    Dicors: {
      fields: [
        { key: "dimension", label: "Dimension" },
        { key: "colors", label: "Colors", type: "color", split: true },
        { key: "weight", label: "Weight", suffix: " KG" },
        { key: "material", label: "Craft Material" },
        { key: "finish", label: "Finish" },
        { key: "shape", label: "Shape" },
      ],
    },
  };
  
  const categoryConfig = categoryAttributesConfig[product.categoryname];
  if (!categoryConfig) return null;

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
            <Price>{product?.discount == 0 ? '': <Price  style={{fontSize:24 , textDecoration: 'line-through' , color:'#b9b9b9' , marginRight:20}}>$ {product.productprice} </Price>}  $ {product.productprice - ((product.productprice * product.discount) / 100)} </Price>
            <AttributeContainer>
      {categoryConfig.fields.map((field) => {
        const value = product?.attributes?.[field.key];
        if (!value || (field.condition && !field.condition(product))) return null;

        if (field.type === "color") {
          const colors = field.split ? value.split(",") : [value];
          return (
            <ColorContainer key={field.key}>
              <ColorT>{field.label}</ColorT>
              {colors.map((color, index) => (
               <ColorDot
               key={index}
               
               isSelected={color === selectedColor}
               onClick={() => handleAttributes("color", color)}
             >
               <Color color={color} isSelected={color === selectedAttributes?.color} />
             </ColorDot>
             
              ))}
            </ColorContainer>
          );
        }

        if (field.type === "size") {
          const sizes = field.split ? value.split(",") : [value];
          return (
            <SizeContainer key={field.key}>
              <SizeT>{field.label}</SizeT>
              {sizes.map((size, index) => (
                <Size
                  key={index}
                  isSelected={size === selectedAttributes?.size}
                  onClick={() => handleAttributes("size", size)}

                >
                  {size} {field.suffix || ""}
                </Size>
              ))}
            </SizeContainer>
          );
        }

        return (
          <Attribute key={field.key}>
            <AttributeName>{field.label}:</AttributeName>
            <AttributeValue>
              {value} {field.suffix || ""}
            </AttributeValue>
          </Attribute>
        );
      })}
    </AttributeContainer>
           
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
              <Categorie>Categories : <p style={{fontSize:16 , color:'teal'}}>{product?.categoryname}</p> </Categorie>
              <Categorie>Sub category : <p style={{fontSize:16 , color:'teal'}}>{product?.subname}</p> </Categorie>
              <Categorie>Type : <p style={{fontSize:16 , color:'teal'}}>{product?.typename}</p> </Categorie>
            </CategorieContainer>
            <SellerContainer>
              <Seller>Owner</Seller>
              <Link to={`/Shops/${product?.idSHOP}`}>
              <Shope>{product?.shopname}</Shope>
              </Link>
            </SellerContainer>
          </InfoContainer>
          <HeartContainer onClick={ !isWish ? handleWish : removeWish}>
            {isWish ? 
            <FavoriteRoundedIcon sx={{ color: "#009f7f" , cursor: "pointer" }}  />
            :
            <FavoriteBorderIcon sx={{ color: "#009f7f" , cursor: "pointer" }} />
            }
          </HeartContainer>
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
