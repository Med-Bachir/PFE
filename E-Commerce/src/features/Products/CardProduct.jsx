import { useState, useEffect } from "react";
import { styled } from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import newRequest from "../../utils/newRequest.js";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { Rating } from "@mui/material";
import { Avatar } from "antd";
import AlertMessage from "../../Components/Alert.jsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import {
  colorAccentDark,
  colorAccentDarkTransparent,
  colorAccentMain,
  colorAccentMedium,
  colorAccentMediumTransparent,
  colorAccentSoft,
  colorAccentSoftTransparent,
  colorAccentSub,
  colorAccentSubDark,
  colorAccentTransparent,
  colorBackgroundBlack,
  colorBackgroundGray,
  colorElementBackgroundGray,
  colorPrimaryBlack,
  darkMain,
  elementGrayBackground,
  grayBackground,
  lightMain,
  main,
  primaryTextColor,
  secondaryTextColor,
  softMain,
  whiteTextColor,
} from "../../Colors.jsx";
import LazyAvatar from "../../Components/Pending/LazyAvatar.jsx";
import AttributeContainer from "../../Components/productAttributes/AttributeContainer.jsx";

const Container = styled.div`
  background-color: ${props => props.theme == "light" ? whiteTextColor : colorBackgroundBlack};
  color: ${props => props.theme == "light" ? colorPrimaryBlack : elementGrayBackground};
`;
const Wrapper = styled.div`
  padding: 30px;
  border-bottom: 2px solid ${props => props.theme == "light" ? elementGrayBackground :colorElementBackgroundGray};
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
  transition: 200ms ease-in-out;
`;
const ProductConatainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  gap: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
    
  }
  `;
  const HeartContainer = styled.div`
    border: 2px solid ${props => props.theme == "light" ? main : colorAccentMain};
    border-radius: 50%;
    width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    padding: 20px;
    
   @media (max-width: 768px) {
    position: fixed;
   right: 8px;
   top: 188px;
  }
  `;
const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;
const InfoContainer = styled.div`
  flex: 1;
  
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
  color: ${secondaryTextColor};
`;
const Price = styled.span`
  margin-bottom: 30px;
  color: ${props => props.theme == "light" ? main : colorAccentMain};
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

  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
`;
const Color = styled.div`
  background-color: ${(props) => props.color};
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  border: ${({ isSelected , theme }) =>
    isSelected ? `2px solid ${theme == "light" ? softMain : colorAccentMain}` : "none"};
  opacity: ${({ isSelected }) => (isSelected ? "1" : "0.7")};
  &:hover {
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
  border: 1px solid ${lightMain};
  padding: 7px 15px;
  border-radius: 20px;
  margin-right: 10px;
  cursor: pointer;
  color: ${(props) => (props.isSelected ? props.theme == "light" ? main : colorAccentMain: props.theme == "light" ? primaryTextColor : elementGrayBackground)};
  background-color: ${(props) => (props.isSelected ? lightMain : "")};
  transition: 200ms ease-in-out;
`;
const AmountContainer = styled.div`
  display: flex;
  width: 40%;
  border-radius: 10px;
  padding: 10px;
  justify-content: space-between;
  background-color: ${lightMain};
  color: ${props => props.theme == "light" ? main : colorAccentMain};
  margin-bottom: 30px;
  min-width: 200px;
  @media (max-width: 768px) {
width: 100%;
}

`;
const AddToCardContainer = styled.div`
  display: flex;
  margin-top: 20px;
  width: 40%;
  border-radius: 10px;
  padding: 10px;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme == "light" ? main : lightMain};
  color: ${whiteTextColor};
  cursor: pointer;
  margin-bottom: 30px;
  min-width: 200px;
  &:hover{
  background-color: ${props => props.theme == "light" ? colorAccentMedium : colorAccentDark};

  }
  @media (max-width: 768px) {
width: 100%;
}
`;
const Amount = styled.span``;
const RelatedProduct = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(5, 5fr);
`;

const CategorieContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  align-items: center;
  @media (max-width: 768px) {
flex-wrap: wrap;
gap: 20px;
}
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
  color: ${main};
  text-decoration: underline;
  cursor: pointer;
  &:hover {
    text-decoration: none;
  }
`;
const CompareBtn = styled.button`
  padding: 15px 10px;
  background-color: ${main};
  color: ${whiteTextColor};
  cursor: pointer;
  width: 10%;
`;
const Button = styled.button`
  background-color: ${props => props.theme == "light" ? main : colorAccentMedium};
  width: 40%;
  min-width: 200px;
  color: ${whiteTextColor};
  margin-bottom: 32px;
  &:hover{
  background-color: ${props => props.theme == "light" ? colorAccentMedium : colorAccentDark};
}
@media (max-width: 768px) {
width: 100%;
}
`;

const Input = styled.input`
  padding: 6px;
  width: 60%;
  height: 45px;
  border-radius: 4px;
  background-color: ${props => props.theme == "light" ? whiteTextColor : lightMain};
  border: 1px solid ${props => props.theme == "light" ? grayBackground : colorElementBackgroundGray};
  color: ${props => props.theme == "light" ? primaryTextColor : elementGrayBackground};
  transition: 200ms ease-in-out;
`;
const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 8px;
  padding: 10px 20px;
  border: 1px dashed ${lightMain};
  border-radius: 4px;
  background-color: ${props => props.theme == "light" ? whiteTextColor : lightMain};
  
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
  color: ${secondaryTextColor};
`;
/*const AttributeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  gap: 8px;
`;*/
const Attribute = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin: 10px 0;
`;
const AttributeName = styled.span`
  font-size: 18px;
  color: ${props => props.theme == "light" ? primaryTextColor : elementGrayBackground};

`;
const AttributeValue = styled.span`
  font-size: 16px;
  color: ${secondaryTextColor};
`;

const CardProduct = () => {
  const user = useSelector((state) => state.user?.currentUser);
  const theme = useSelector((state) => state.theme.mode);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [open, setOpen] = useState(false);
  const [isWish, setIsWish] = useState(false);
  const Location = useLocation().pathname.split("/")[2];
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [qte, setQte] = useState(0); // Initialize to 1 instead of 0
  const [product, setProduct] = useState({});
  const [value, setValue] = useState(2);
  const [reviews, setReviews] = useState([]);
  const [total, setTotal] = useState([]);
  const queryClient = useQueryClient();


  ///////////////////////
  const handleAttributes = (name, value) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [name]: value,
    }));

    console.log(selectedAttributes);
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

        setProduct(res.data)

       
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    getProduct();
   
    Wish();
    getReviews();
  }, [Location]);



  ////reactredux
  const quantity = useSelector((state) => state.cartProduct?.quantity);
  console.log("State:", quantity);
  console.log(selectedAttributes)

  const handleQte = (option) => {
    if (option === "add") {
      setQte(prev => prev + 1);
    } else if (option === "remove" && qte > 1) {
      setQte(prev => prev - 1);
    }
  };

  const handlAction = () => {
    mutation.mutate();
  };
  const handleSubmitCart = async () => {
    const productDetails = {
      ...product,
      attributes: selectedAttributes,
      quantity: qte,
    };
    
    if ((product.name === "Cloths" || product.name === "Decors") && 
        Object.keys(selectedAttributes).length === 0) {
      setMessage("Please Select item attributes");
      setType("error");
      setOpen(true);
      return;
    }

    try {
      if (!user?.idUSER) {
        setMessage("You need to LOGIN first");
        setType("error");
        setOpen(true);
        return;
      }

      const response = await newRequest.post(
        `cards/cart/${user.idUSER}/add/${Location}`,
        productDetails
      );

      if (response.status === 200) {
        setMessage("Product Added Successfully to the cart");
        setType("success");
      } else {
        setMessage("Product Already exists in the Cart!");
        setType("error");
      }
      setOpen(true);
      
    } catch (error) {
      console.error("Error adding product:", error);
      setMessage("Failed to add product");
      setType("error");
      setOpen(true);
    }
  };
  const mutation = useMutation({
    mutationFn: handleSubmitCart,
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
  });
  const handleWish = async () => {
    try {
      if (!user) {
        setMessage("Please login first !!");
        setType("error");
        setOpen(true);
        return;
      }

      const response = await newRequest.post(
        `wish/${user?.idUSER}/add/${Location}`
      );

      if (response.status === 200) {
        setMessage("Product add to wish list");
        setType("success");
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
        Wish();
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
    if (user) {
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
      } finally {
        getReviews();
      }
    } else {
      setMessage("Please Login First!!");
      setType("error");
      setOpen(true);
    }
  };



 

  

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
        {
          key: "camera",
          label: "Camera",
          suffix: " PX",
          condition: (p) => ["Tablet", "Mobile"].includes(p.subname),
        },
      ],
    },
    Fitness: {
      fields: [
        { key: "height", label: "Height", suffix: " cm" },
        { key: "weight", label: "Weight", type: "size", split: true, suffix: " KG" },
        { key: "material", label: "Craft Material" },
      ],
    },
    Decors: {
      fields: [
        { key: "dimension", label: "Dimension" },
        { key: "colors", label: "Colors", type: "color", split: true },
        { key: "weight", label: "Weight", suffix: " KG" },
        { key: "material", label: "Craft Material" },
        { key: "finish", label: "Finish" },
        { key: "shape", label: "Shape" },
      ],
    },
    Books: {
      fields: [
        { key: "attribute", label: "Title"},
        { key: "attribute", label: "Author"},
        { key: "attribute", label: "Publication Date"},
        { key: "attribute", label: "ISBN"},
        { key: "attribute", label: "Number of Pages"},
      ],
    },
    CleaningTools: {
      fields: {
        'Hand Tools': [
          { name: 'Material'},
          { name: 'Type' },
          { name: 'Handle Length'},
          { name: 'Weight'},
          { name: 'Color' },
          { name: 'Use Case'},
        ],
        'Electronic Tools': [
          { name: 'Brand' },
          { name: 'Power'},
          { name: 'Voltage'},
          { name: 'Cord Length'},
          { name: 'Battery Life'},
          { name: 'Weight'},
          { name: 'Noise Level'},
        ],
        'Chemical Tools': [
          { name: 'Type' },
          { name: 'Volume'},
          { name: 'Active Ingredients'},
          { name: 'Application' },
          { name: 'Scent' },
          { name: 'Safety Warnings' },
        ],
      },
    },
  };
  

  const categoryConfig = categoryAttributesConfig[product.name];

  // Convert attributes to an array for mapping
let att = product?.attributes
const productPrice = Number(product?.productprice || 0);
const productDiscount = Number(product?.discount || 0);
const finalPrice = productPrice - (productPrice * productDiscount) / 100;
  console.log()
  return (
    <Container theme={theme}>
      <AlertMessage
        open={open}
        setOpen={setOpen}
        message={message}
        type={type}
      />

      <Wrapper theme={theme} >
        <ProductConatainer theme={theme}>
          <ImageContainer>
            
            <LazyAvatar src={product.productimage} sx={{
  height: "calc(100vh - 144px)",
  width: "100%",
  bgcolor:'transparent',
  borderRadius:4
  }} />
          </ImageContainer>
          <InfoContainer theme={theme}>
            <Title>{product.productname}</Title>

            <Desc theme={theme}>{product.productdesc}</Desc>
            <Price theme={theme}>
              {product?.discount == 0 ? (
                ""
              ) : (
                <Price
                  style={{
                    fontSize: 24,
                    textDecoration: "line-through",
                    color:secondaryTextColor ,
                    marginRight: 20,
                  }}
                >
                  $ {productPrice.toFixed(2)}{" "}
                </Price>
              )}{" "}
              ${" "}
              {finalPrice.toFixed(2)}{" "}
            </Price>

<AttributeContainer theme={theme} product={product} selectedAttributes={selectedAttributes} handleAttributes={handleAttributes} Location={Location}/>
            {/*<AttributeContainer theme={theme}>

            
                        
              {categoryConfig?.fields?.map((field) => {
                const value = product?.attributes?.[field.key];
                if (!value || (field.condition && !field.condition(product)))
                  return null;

                if (field.type === "color") {
                  const colors = field.split ? value.split(",") : [value];
                  return (
                    <ColorContainer key={field.key}>
                      <ColorT>{field.label}</ColorT>
                      {colors.map((color, index) => (
                        <ColorDot
                          key={index}
                          onClick={() => handleAttributes("color", color)}
                        >
                          <Color
                          theme={theme}
                            color={color}
                            isSelected={color === selectedAttributes?.color}
                          />
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
                          theme={theme}
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
                  <Attribute theme={theme} key={field.key}>
                    <AttributeName theme={theme}>{field.label}:</AttributeName>
                    <AttributeValue theme={theme}>
                      {value} {field.suffix || ""}
                    </AttributeValue>
                  </Attribute>
                );
              })}
            </AttributeContainer>*/}

            {qte == 0 ? (
              <Button theme={theme} onClick={() => handleQte("add")}>
                ADD TO CARD
              </Button>
            ) : (
              <>
                <AmountContainer theme={theme}>
                  <AddIcon
                    className="cursor-pointer"
                    onClick={() => handleQte("add")}
                    sx={{ cursor: "pointer" , color: theme == "light" ? main : colorAccentMain }}
                  />
                  <Amount style={{color: theme == "light" ? main : colorAccentMain}}>{qte}</Amount>
                  <RemoveIcon
                    className="cursor-pointer"
                    onClick={() => handleQte("remove")}
                    sx={{ cursor: "pointer" , color: theme == "light" ? main : colorAccentMain }}
                  />
                </AmountContainer>
                <Button
                  onClick={() => {
                    handlAction();
                  }}
                  theme={theme}
                >
                  ADD TO CARD
                </Button>
              </>
            )}

            <hr style={{ marginBottom: 60 , borderColor: theme == "light" ? "" : colorElementBackgroundGray }}></hr>
            <CategorieContainer theme={theme}>
              <Categorie>
                Categories :{" "}
                <p style={{ fontSize: 16, color: theme == "light" ? main : colorAccentMain }}>
                  {product?.name}
                </p>{" "}
              </Categorie>
              <Categorie>
                Sub category :{" "}
                <p style={{ fontSize: 16, color: theme == "light" ? main : colorAccentMain}}>{product?.subname}</p>{" "}
              </Categorie>
              <Categorie>
                Type :{" "}
                <p style={{ fontSize: 16, color: theme == "light" ? main : colorAccentMain }}>{product?.typename}</p>{" "}
              </Categorie>
            </CategorieContainer>
            <SellerContainer>
              <Seller>Owner</Seller>
              <Link to={`/Shops/${product?.idSHOP}`}>
                <Shope theme={theme}>{product?.shopname}</Shope>
              </Link>
            </SellerContainer>
          </InfoContainer>
          <HeartContainer theme={theme} onClick={!isWish ? handleWish : removeWish}>
            {isWish ? (
              <FavoriteRoundedIcon sx={{ color: theme == "light" ? main : colorAccentMain, cursor: "pointer" }} />
            ) : (
              <FavoriteBorderIcon sx={{ color: theme == "light" ? main : colorAccentMain, cursor: "pointer" }} />
            )}
          </HeartContainer>
        </ProductConatainer>
      </Wrapper>

      <Wrapper
      theme={theme}
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
        <Wrapper theme={theme} style={{ padding: "0", height: 100 }}>
          <Title
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: primaryTextColor,
            }}
          >
            No reviews found
          </Title>
        </Wrapper>
      ) : (
        <Wrapper
        theme={theme}
          style={{
            padding: "20px 20px",
            gap: 20,
            backgroundColor: theme == "light" ? grayBackground : colorBackgroundGray,
            height: 140,
            contain: "paint",
            width: "100%",
            overflow: "auto",
          }}
        >
          {reviews?.map((item) => (
            <ReviewContainer theme={theme}>
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

      <Wrapper  theme={theme}>
    
        <Title
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: primaryTextColor,
            gap: "32px",
            flexWrap:'wrap'
          }}
        >
          <Rating
            name="simple-controlled"
            value={value}
            sx={{bgcolor: theme == "light" ? '' : colorElementBackgroundGray , padding:'2px 8px' , borderRadius:8}}
            onChange={(event , newValue) => {
              setValue(newValue);
            }}
          />
          <Input theme={theme} name="text" placeholder="Add Review" onChange={handlChange} />
          <Button theme={theme} onClick={handleSubmit} style={{ fontSize: 16, margin: 0 , width:200 }}>
            Add Review
          </Button>
        </Title>
      </Wrapper>
      <Wrapper theme={theme} style={{ display: "flex", flexDirection: "column" }}>
        <Title>Compare Between Product</Title>
        <Link to={`/compare/${Location}`}>
          <CompareBtn>Compare</CompareBtn>
        </Link>
      </Wrapper>
      <Wrapper theme={theme} style={{ display: "flex", flexDirection: "column" }}>
        <Title>Similar Product</Title>
        <RelatedProduct></RelatedProduct>
      </Wrapper>
    </Container>
  );
};

export default CardProduct;
