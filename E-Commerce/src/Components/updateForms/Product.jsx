import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import newRequest from "../../utils/newRequest";
import { colorAccentDarkTransparent, colorAccentMain, colorAccentMedium, colorAccentMediumTransparent, colorAccentMoreTransparent, colorAccentSoft, colorElementBackgroundGray, colorErrorDark, colorErrorSoft, colorPrimaryBlack, darkRed, elementGrayBackground, lightMain, main, primaryTextColor, secondText, softRed, transparentMain, whiteTextColor } from "../../Colors";
import AddPhotoAlternateTwoToneIcon from '@mui/icons-material/AddPhotoAlternateTwoTone';
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Flex, Upload } from "antd";
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import ReportProblemTwoToneIcon from '@mui/icons-material/ReportProblemTwoTone';
import AlertMessage from "../Alert";
import CloseIcon from '@mui/icons-material/Close';

const BlackBackground = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: brightness(30%);
  z-index: 99;
`;

const Container = styled.div`

  height: 80%;
  width: 80%;
  border-radius: 8px;
  background-color: ${({theme}) => theme == "light" ? whiteTextColor : colorPrimaryBlack };
  color: ${({theme}) => theme == "light" ? primaryTextColor : whiteTextColor };
  display: flex;
  @media (max-width: 768px) {
   flex-direction: column;
  }
`;

const Left = styled.div`
position: relative;
  width: 45%;
  padding: 40px;
  border: 1px ${secondText} solid;
  border-radius: 8px;
  margin: 32px;
  @media (max-width: 768px) {
width: 100%;
margin: 0;
border: none;
border-bottom: 1px ${secondText} solid;
border-radius: 0;
}
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const Right = styled.div`
  width: 55%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow: hidden;
  overflow-y: auto;
  padding: 32px 32px 32px 0;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(147, 147, 147);
    border-radius: 20px;
  }
  @media (max-width: 768px) {
width: 100%;
padding:20px;


}
`;
const HelperText = styled.span`
display: none;
@media (max-width: 768px) {
display: block;
font-size: 12px;
padding:8px 0 0  20px;
color: ${secondText};
}
`;


const Title = styled.span`
  font-weight: bold;
  font-size: 18px;
`;

const InputContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 24px;
  column-gap: 12px;
`;
const Button = styled.button`
position: absolute;
width: 100%;
height: 100%;
top: 0;
left: 0;
 opacity: 0;
background-color: ${primaryTextColor};
color: ${whiteTextColor};
padding: 0;
 &:hover{
  opacity: 0.8;
 }
`;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
  console.log(reader.result);
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

const SaveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({theme , status , loading}) => theme === "light" ? status == "" ? loading ? transparentMain : main : status == "success" ? transparentMain : softRed : status == "" ? loading ? colorAccentDarkTransparent : main : status == "success" ? colorAccentDarkTransparent : `${colorErrorSoft}4f`};
  color: ${({theme , status , loading}) => theme === "light" ? status == "" ? whiteTextColor : status == "success" ? main : darkRed : status == "" ? whiteTextColor : status == "success" ? colorAccentMain : colorErrorDark};

  
`;
const Span = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: ${main};
`;

const Product = ({ product , setEdited , theme}) => {
  const [cat, setCat] = useState(product.id_Category);
  const [sub, setSub] = useState(product.id_SubCategory);
  const [type, setType] = useState(product.id_Type);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const [newProduct, setNewProduct] = useState(product);
  const [newProductImage, setNewProductImage] = useState(product?.productimage);
  const [newAtt, setNewAtt] = useState(() => {
    try {
      return JSON.parse(product.attributes);
    } catch {
      return {};
    }
  });

  const [cats, setCats] = useState([]);
  const [subs, setSubs] = useState([]);
  const [types, setTypes] = useState([]);

  // Handle updates to product fields
  const handleUpdate = (e) => {
    setNewProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(newProduct)
  };

  // Handle updates to product attributes
  const handleAtt = (e) => {
    setNewAtt((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(newAtt)
  };


  // Fetch category data
  useEffect(() => {
    const getCats = async () => {
      try {
        const res = await newRequest.get(`/category/cat`);
        setCats(res.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    const getSubs = async () => {
      try {
        const res = await newRequest.get(`/category/sub/${cat}`);
        setSubs(res.data);
      } catch (err) {
        console.error("Error fetching subcategories:", err);
      }
    };

    const getTypes = async () => {
      try {
        const res = await newRequest.get(`/category/type/${sub}`);
        setTypes(res.data);
      } catch (err) {
        console.error("Error fetching types:", err);
      }
    };

    getCats();
    getSubs();
    getTypes();
  }, [cat, sub]);


  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async () => {
    setLoading(true)
    const updatedProduct = {
      ...newProduct,
      attributes: JSON.stringify(newAtt), // Convert object to a JSON string
      productimage: newProductImage,
    };
  
    console.log("Final payload being sent:", updatedProduct); // Debug payload
    try {
      await newRequest.put(`/products/update/${product.idPRODUCT}`, updatedProduct).then((res) => {
        
        if (res.status == 200) {
          setMessage("Produt updated successfully!");
          setStatus("success");
          setOpen(true);
          setTimeout(() => {
            setEdited(false)
          }, 3000); // Removed brackets around delay
        }
      })
      .catch((err) => {
        // Handle server-side errors
        if (err.response?.status === 404) {
          setMessage("Product Doesn't Exist!!");
          setStatus("error");
          setOpen(true);
        } else {
          setMessage("An error occurred. Please try again later. Or contact us.");
          setStatus("error");
          setOpen(true);
        }
      });
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setTimeout(() => {
       
        
        setLoading(false)
      }, 1000);
    }
  };
  

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setNewProductImage(url);
      });

      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);

        setNewProductImage(url);
      });
    }
  };


 
 const uploadButton = (
    <button
      style={{
        background: 'none',
        color: theme == "light" ? primaryTextColor : elementGrayBackground,
        padding:20
      }}
      type="button"
    >
      {loading ? <LoadingOutlined style={{fontSize:40}} /> : <AddPhotoAlternateTwoToneIcon style={{fontSize:40}}  />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload a Photo 
      </div>
    </button>
  );

  const customTextField = {
    flex: 1,
      minWidth:'40%', borderRadius:1 , bgcolor:theme == "light" ? whiteTextColor : colorAccentMoreTransparent ,  ".css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input":{color: theme == "light" ? primaryTextColor : elementGrayBackground},
                  "& .MuiOutlinedInput-root": {
                    
                    "&:hover fieldset": {
                      borderColor: theme == "light" ? lightMain : colorAccentSoft, // Hover border color
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: theme == "light" ? main : colorAccentMedium, // Focused border color
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: secondText, // Default label color
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: theme == "light" ? main : colorAccentMain, // Focused label color
                  },
                  "& .MuiInputLabel-root.Mui-error": {
                    color: "orange", // Error label color
                  },
              ".css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input" : { color:theme == "light" ? primaryTextColor : elementGrayBackground}
    };
  return (
    <BlackBackground>
       <AlertMessage
        open={open}
        setOpen={setOpen}
        message={message}
        type={status}
      />
      <Container theme={theme}>
        {/* Left Section */}
        <Left>
          <Image src={newProductImage == "" ? product?.productimage : newProductImage} alt="Product Image" />
          <Button variant="contained" color="primary" onClick={handleButtonClick}>
              <Flex
  gap="middle"
  
>
 
    <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
      beforeUpload={beforeUpload}
      onChange={handleChange}
     
    >
      {newProductImage ? (
        <img
          src={newProductImage}
          alt="avatar"
          style={{
            width: '70%',
            height: 300,
            objectFit: 'contain',
          }}
        />
      ) : (
        uploadButton
      )}
    </Upload>
  
</Flex>
      </Button>
          
        </Left>
      <HelperText>Click on the image tp change</HelperText>

        {/* Right Section */}
        <Right>
          <IconButton onClick={() => setEdited(false)} sx={{width:50 , height:50 , "@media (max-width: 768px)" : {top:8 , right:8}, bgcolor:theme == "light" ? elementGrayBackground : colorElementBackgroundGray, position:"fixed" , top: 32 , right:64}} color="error">
            <CloseIcon  color="error"/>
          </IconButton>
          <Title>Product Information</Title>
          <InputContainer>
            <TextField
              name="productname"
              label="Name"
              defaultValue={product.productname}
              onChange={handleUpdate}
              sx={customTextField}
            />
            <TextField
              name="productprice"
              label="Price"
              defaultValue={product.productprice}
              type="number"
              onChange={handleUpdate}
               sx={customTextField}
            />
            <TextField
              name="discount"
              label="Discount"
              defaultValue={product.discount}
              type="number"
              onChange={handleUpdate}
               sx={customTextField}
            />
            <TextField
              name="quantity"
              label="Quantity"
              defaultValue={product.quantity}
              type="number"
              onChange={handleUpdate}
               sx={customTextField}
            />
          </InputContainer>

          {/* Product Attributes */}
          <Title>Product Attributes</Title>
          <InputContainer>
            {Object.entries(newAtt).map(([key, value], index) => (
             
              <TextField
                key={index}
                name={key}
                label={key}
                defaultValue={value}
                onChange={handleAtt}
                sx={customTextField}
              /> 
            ))}
          </InputContainer>

          {/* Product Category */}
          <Title>Product Category</Title>
          <InputContainer >
            <FormControl sx={customTextField}>
              <InputLabel>Category</InputLabel>
              <Select
                value={cat}
                label="Category"
                onChange={(e) => setCat(e.target.value)}
                sx={{color: theme === "light" ? primaryTextColor : elementGrayBackground}}
              >
                {cats.map((c) => (
                  <MenuItem key={c.id} value={c.id}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={customTextField}>
              <InputLabel>Subcategory</InputLabel>
              <Select
                value={sub}
                label="Subcategory"
                onChange={(e) => setSub(e.target.value)}
                sx={{color: theme === "light" ? primaryTextColor : elementGrayBackground}}
              >
                {subs.map((s) => (
                  <MenuItem key={s.id} value={s.id}>
                    {s.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={customTextField}>
              <InputLabel>Type</InputLabel>
              <Select
                value={type}
                label="Type"
                onChange={(e) => setType(e.target.value)}
                sx={{color: theme === "light" ? primaryTextColor : elementGrayBackground}}
              >
                {types.map((t) => (
                  <MenuItem key={t.id} value={t.id}>
                    {t.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </InputContainer>

          {/* Submit Button */}
          <SaveButton status={status} loading={loading} theme={theme} onClick={handleSubmit} disabled={loading}> {loading ? 
          <LoadingOutlined /> : status == '' ? 'Save Changes' : status == "success" ? <CheckCircleTwoToneIcon /> : <ReportProblemTwoToneIcon color="red" />
          
        }
        </SaveButton>
        </Right>
      </Container>
    </BlackBackground>
  );
};

export default Product;
