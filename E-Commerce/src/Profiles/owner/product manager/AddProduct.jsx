import styled from "styled-components";
import AddBusinessTwoToneIcon from "@mui/icons-material/AddBusinessTwoTone";
import CloudUploadTwoTone from "@mui/icons-material/CloudUploadTwoTone";
import {
  CircularProgress,
  Fab,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Checkbox, Divider, message, Upload , Input , Tag , theme} from "antd";
import { useEffect, useRef, useState } from "react";
import newRequest from "../../../utils/newRequest";
import { useSelector } from "react-redux";
import { colorAccentDarkTransparent, colorAccentLight, colorAccentMain, colorAccentMedium, colorAccentMoreTransparent, colorAccentSoft, colorPrimaryBlack, darkRed, elementGrayBackground, grayBackground, lightMain, main, primaryTextColor, secondText, whiteTextColor } from "../../../Colors";
import InputField from "../../../Components/productAttributes/InputField";
import ClothsAttirbutes from "../../../Components/productAttributes/ClothsAttirbutes";
import FoodAttributes from "../../../Components/productAttributes/FoodAttributes";
import FitnessAttribute from "../../../Components/productAttributes/FitnessAttribute";
import ElectronicsAttributes from "../../../Components/productAttributes/ElectronicsAttributes";
import DecorsAttributes from "../../../Components/productAttributes/DecorsAttributes";
import BooksAttribute from "../../../Components/productAttributes/BooksAttribute";
import DishesAttributes from "../../../Components/productAttributes/DishesAttributes";
import CleaningTools from "../../../Components/productAttributes/CleaningTools";

const Container = styled.div`
  height: calc(100vh - 80px);
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
  color: ${({theme}) => theme == "light" ? primaryTextColor : elementGrayBackground};
  @media (max-width: 768px) {
 padding:32px 12px;
}
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px dashed #bebebe;
  padding: 32px 0;
  gap: 32px;
  @media (max-width: 768px) {
  flex-direction: column;
}
`;

const FormTitle = styled.h3`
  font-weight: 500;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 32px 0;
  gap: 12px;
`;

const Title = styled.span`
  font-size: 18px;
  font-weight: 500;
`;

const Desc = styled.span`
  font-size: 13px;
  color: ${secondText};
`;

const Right = styled.div`
  flex: 2;
  background-color: ${({theme}) => theme == "light" ? whiteTextColor : colorPrimaryBlack};
  padding: 32px;
  border-radius: 4px;
`;

const Required = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: ${secondText};

`;

const Span = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: ${({theme}) => theme == "light" ? main : colorAccentMain};
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`;

const Label = styled.label``;

const InputText = styled.input`
  padding: 14px 16px;
  outline: none;
  border-radius: 4px;
  background-color: ${({theme}) => theme == "light" ? whiteTextColor : colorAccentDarkTransparent};
  border: 1px solid ;
  border-color: ${({theme}) => theme == "light" ? elementGrayBackground : colorAccentLight};

  &:focus , &:hover {
    border: 1px solid ;
    border-color: ${({theme}) => theme == "light" ? main : colorAccentMain};
  }
  transition: 200ms ease-in-out ;
`;

const Area = styled.textarea`
  padding: 14px 16px;
  outline: none;
  border-radius: 4px;
  border: 1px solid ;
  background-color: ${({theme}) => theme == "light" ? whiteTextColor : colorAccentDarkTransparent};
  border-color: ${({theme}) => theme == "light" ? elementGrayBackground : colorAccentLight};

  &:focus , &:hover {
    border: 1px solid ;
    border-color: ${({theme}) => theme == "light" ? main : colorAccentMain};
  }
  transition: 200ms;
`;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
 
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png" || file.type === 'image/webp';
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const AddProduct = () => {
  const user = useSelector((state) => state.user?.currentUser);
  const mode = useSelector((state) => state.theme.mode);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const [tags, setTags] = useState([]);
 
  const [checkedList, setCheckedList] = useState("");
  const [logoImageUrl, setLogoImageUrl] = useState(null);
  const [shops, setShops] = useState("");


  const [cats, setCats] = useState(null);
  const [cat, setCat] = useState(null);
  
  const [subs, setSubs] = useState(null);
  const [sub, setSub] = useState(null);
  
  const [types, setTypes] = useState(null);
  const [type, setType] = useState(null);
  const [catname, setCatName] = useState(null);
  const [subname, setSubName] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [typename, setTypesName] = useState(null);
  const [att, setAtt] = useState({});

 

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setLogoImageUrl(url);
      });

      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);

        setLogoImageUrl(url);
      });
    }
  };

  const handleAtt = (e) => {
    e.preventDefault();
    setAtt((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handlNameChange = (e) => {
    e.preventDefault();
  
    // Update product state
    setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  
    // Use the functional updater to ensure att is up-to-date
    setAtt((prevAtt) => {
      const currentCheckedList = [...checkedList]; // Access the latest checkedList
      const currentTags = [...tags]; // Access the latest tags
  
      const updatedAtt = {
        ...prevAtt,
        ...(currentCheckedList.length > 0 && { size: currentCheckedList.join(",") }),
        ...(currentTags.length > 0 && { color: currentTags.join(",") }),
      };
  
     
  
      // Build product details using the most recent states
      const productDetails = {
        ...product,
        productimage: logoImageUrl,
        shopname: shops,
        catID: cat,
        subID: sub,
        typeID: type,
        attribute: updatedAtt,
      };
  
      
  
      return updatedAtt; // Return the updated attributes
    });
  };
  
  
  const handleSubmit = async () => {
    setIsLoading(true);

    

    const productDetails = {
      ...product,
      productimage: logoImageUrl,
      shopname: shops,
      catID: cat,
      subID: sub,
      typeID: type,
      attribute: att,
    };

    try {
      if(user?.approved == 1){

        const response = await newRequest.post(
          `products/add-product/${productDetails.shopname}`,
          productDetails
        );
        
        
        if (response.status === 200) {
          message.success("Product added successfully.");
          
          
        } else {
          message.error("Failed to add product.");
          
        }
      } else {
        message.error("You are not approved !! , Wait for admin approve");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      message.error("Failed to add product.");
      
    } finally{
      setIsLoading(false);
    }
  };

  const [myShops, setMyShops] = useState([]);

  useEffect(() => {
    const getShops = async () => {
      try {
        const res = await newRequest.get(`/shop/seller-shops/${user?.idUSER}`);
        setMyShops(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    getShops();
  }, []);

  // get cat
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
    getTypes();
    getSubs();
    getCats();
  }, [cat , sub , type]);

  const handleChangeShop = (event) => {
    setShops(event.target.value);
  };

  const handleChangeField = (event, field) => {
    const value = event.target.value;

    switch (field) {
      case "cat":
        setCat(value); // Only update the ID here
        setCatName(cats.find((cat) => cat.id === value).name);
        setSub(null);
        setType(null);
        break;
      case "sub":
        setSub(value);
        setSubName(subs.find((sub) => sub.id === value).name);
        setType(null);
        break;
      case "type":
        setType(value);
        setTypesName(types.find((type) => type.id === value).name);
        break;
      default:
        console.warn(`Unhandled field: ${field}`);
    }

    // You can now directly access the category name from the 'cats' array
  };



 


  const customTextField = {
    flex: 1,
      minWidth:'40%', borderRadius:1 , bgcolor:mode == "light" ? whiteTextColor : colorAccentMoreTransparent ,  ".css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input":{color: theme == "light" ? primaryTextColor : elementGrayBackground},
                  "& .MuiOutlinedInput-root": {
                    
                    "&:hover fieldset": {
                      borderColor: mode == "light" ? lightMain : colorAccentSoft, // Hover border color
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: mode == "light" ? main : colorAccentMedium, // Focused border color
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: secondText, // Default label color
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: mode == "light" ? main : colorAccentMain, // Focused label color
                  },
                  "& .MuiInputLabel-root.Mui-error": {
                    color: "orange", // Error label color
                  },
              ".css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input" : { color:theme == "light" ? primaryTextColor : elementGrayBackground}
                
    };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      {loading ? (
        <LoadingOutlined style={{ fontSize: 50, color: mode == "light" ? main : colorAccentMain }} />
      ) : (
        <CloudUploadTwoTone style={{ color: mode == "light" ? main : colorAccentMain , fontSize: 50 }} />
      )}
      <div
        style={{
          marginTop: 8,
        }}
      >
        <Required theme={mode}>
          <Span>Upload an image</Span> Or drag and drop. png,jpg
        </Required>
      </div>
    </button>
  );

  const form = [
    {
      title: "Product Image",
      desc: (
        <>
          Upload your product image from here <Span>300 x 300px</Span>
        </>
      ),
      body: (
        <Upload
          name="productimage"
          listType="picture-card"
          showUploadList={true}
          beforeUpload={beforeUpload}
          onChange={(info) => handleChange(info, "logo")}
        >
          {logoImageUrl ? (
            <img
              src={logoImageUrl}
              alt="avatar"
              style={{
                width: "100%",
              }}
            />
          ) : (
            uploadButton
          )}
        </Upload>
      ),
    },
    {
      title: "Product Information",
      desc: <>Add some basic information about your product here</>,
      body: (
        <>
        <InputField mode={mode} type={'text'} name={"Name"} inputName={"productname"} handlNameChange={handlNameChange} />
        <InputField mode={mode} type={'select'} name={"Category"} handleChangeField={handleChangeField} itemList={cats} style={customTextField} selectLabel="Categories" selectValue={cat} selectType="cat"/>
          {cat != null ? (
        <InputField mode={mode} type={'select'} name={"Sub Category"} handleChangeField={handleChangeField} itemList={subs} style={customTextField} selectLabel="Sub Categories" selectValue={sub} selectType="sub"/>
          ) : (
            ""
          )}
          {sub != null ? (
                    <InputField mode={mode} type={'select'} name={"Types"} handleChangeField={handleChangeField} itemList={types} style={customTextField} selectLabel="Types" selectValue={type} selectType="type"/>
            
          ) : (
            ""
          )}
          {catname == "Cloths" ? 
           (
            <>

<ClothsAttirbutes mode={mode} handlNameChange={handlNameChange} tags={tags} setTags={setTags} sizeValue={checkedList} setCheckedList={setCheckedList} handlAtt={handleAtt} type={typename}/>
             
            </>
          ) :  catname === "Electronics" ? (
            <ElectronicsAttributes   mode={mode} handlNameChange={handlNameChange} handlAtt={handleAtt} type={subname} />
          ) : catname == "Fitness" ? (
            
            <FitnessAttribute  mode={mode} handlNameChange={handlNameChange} sizeValue={checkedList} setCheckedList={setCheckedList} handlAtt={handleAtt} type={subname} />
              
          ) : catname === "Food" ? (
            <FoodAttributes mode={mode} handlNameChange={handlNameChange} handlAtt={handleAtt} />
          ) : catname === "Decors" ? (
            <DecorsAttributes mode={mode} handlNameChange={handlNameChange} tags={tags} setTags={setTags} handlAtt={handleAtt} type={subname} />
          ) : catname === "Book" ? (
            <BooksAttribute mode={mode} handlNameChange={handlNameChange} handlAtt={handleAtt} />
          ) : catname == "Cleaning Tools" ? 
          ( 
            <CleaningTools mode={mode} handlNameChange={handlNameChange} tags={tags} setTags={setTags} handlAtt={handleAtt} type={subname} />
          
        ) : catname == "Dishes" ?
        (
          <DishesAttributes mode={mode} handlNameChange={handlNameChange} tags={tags} setTags={setTags} handlAtt={handleAtt} type={subname} />
        ) : ('')
         }

          <InputContainer theme={mode}>
            <Label>Description</Label>
            <Area
            theme={mode}
              type="textarea"
              name="productdesc"
              onChange={handlNameChange}
            />
          </InputContainer>
          <InputContainer theme={mode}>
            <Label>
              Price <Span style={{ color: "red" }}>*</Span>
            </Label>
            <InputText
              name="productprice"
              type="number"
              theme={mode}
              onChange={handlNameChange}
            ></InputText>
          </InputContainer>
          
          <InputContainer theme={mode}>
            <Label>
              Discount <Span style={{ color: "red" }}></Span>
            </Label>
            <InputText
              name="discount"
              type="number"
              theme={mode}
              onChange={handlNameChange}
            ></InputText>
          </InputContainer>

          <InputContainer >
            <Label>Shops</Label>
            <FormControl sx={customTextField}>
              <InputLabel id="demo-simple-select-helper-label">
                Shops
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={shops}
                label="Shops"
                onChange={handleChangeShop}
              >
                {myShops.map((shop) => (
                  <MenuItem value={shop?.idSHOP}>{shop.shopname}</MenuItem>
                ))}
              </Select>
              <FormHelperText sx={{color: mode == "light" ? primaryTextColor : elementGrayBackground}}>Select Your Shop</FormHelperText>
            </FormControl>
          </InputContainer>
          <InputContainer theme={mode}>
            <Label>
              Quantity <Span style={{ color: "red" }}>*</Span>
            </Label>
            <InputText
              name="qte"
              type="number"
              theme={mode}
              onChange={handlNameChange}
            ></InputText>
          </InputContainer>
        </>
      ),
    },
  ];

  return (
    <Container theme={mode}>
      <FormTitle>Add Product</FormTitle>
      {form.map((item) => (
        <FormContainer key={item.title}>
          <Left theme={mode}>
            <Title>{item.title}</Title>
            <Desc>{item.desc}</Desc>
          </Left>
          <Right theme={mode}>{item.body}</Right>
        </FormContainer>
      ))}

      <Tooltip title="Send Request">
        <Fab
        color="success"
          sx={{bgcolor:main}}
          style={{ position: "absolute", bottom: 96, right: 32 }}
          aria-label="add"
          onClick={handleSubmit}
          disabled={isLoading ? true : false}
        >
          {isLoading ? (
            <CircularProgress size="30px" color="inherit" />
          ) : (
            <AddBusinessTwoToneIcon />
          )}
        </Fab>
      </Tooltip>
    </Container>
  );
};

export default AddProduct;
