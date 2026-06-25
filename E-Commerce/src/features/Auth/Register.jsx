import styled from "styled-components";
import '../../../src/index.css'
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import newRequest from "../../utils/newRequest";
import { useEffect, useState } from "react";
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import {
  Divider,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Lottie from "lottie-react";
import { Link, useNavigate } from "react-router-dom";


import me from "../../Home.json";
import AlertMessage from "../../Components/Alert";
import { ShootingStars } from "./Paiment";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Flex, message, Upload } from 'antd';
import { colorAccentDark, colorAccentDarkTransparent, colorAccentMain, colorAccentMedium, colorAccentMediumTransparent, colorAccentMoreTransparent, colorAccentSoft, colorBackgroundBlack, colorElementBackgroundGray, colorPrimaryBlack, elementGrayBackground, gradientBackground, grayBackground, lightMain, lightSoftMain, main, medMain, primaryTextColor, secondaryTextColor, secondText, whiteTextColor } from "../../Colors";
import { useSelector } from "react-redux";
const Container = styled.div`
  width: 100%;
  height: 100vh;
  /* background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)


    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;*/
background-color: ${props => props.theme == "light" ? whiteTextColor :  colorBackgroundBlack};
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  color: ${props => props.theme == "light" ? primaryTextColor :  elementGrayBackground};
  @media (max-width: 768px) and (max-height: 923px) {
 flex-direction: column;
 height:auto;
}
@media (max-width: 768px) and (min-height: 923px) {
  flex-direction: column;
}

`;

const Wrapper = styled.div`
  padding: 20px;
  width: 40%;
  @media (max-width: 768px) {
    padding: 0;
width: 100%;
}


`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
  @media (max-width: 768px) {
    padding-left: 20px;
}
`;
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  background-color: ${({theme}) => theme == "light" ? whiteTextColor : colorBackgroundBlack};
  @media (max-width: 768px) {
    padding: 20px;
}
`;
const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0 10px;
  width: 100%;
`;

const CreatButton = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: ${({theme}) => theme == "light" ? main : colorAccentMedium};
  color: ${whiteTextColor};
  cursor: pointer;
  transition: 200ms ease-in-out;

  &:hover {
    background-color: ${({theme}) => theme == "light" ? lightSoftMain : colorAccentMoreTransparent};
    color: ${({theme}) => theme == "light" ? main : colorAccentMain};
  }
  @media (max-width: 768px) {
 width: 50%;
}
`;
const Paiment = styled.button`
  box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
  position: relative;
  width: 48%;
  height: 200px;
  padding: 0;
  border-radius: 8px;
  text-align: start;
  cursor: pointer;
  display: flex;
  background-color:${({theme}) => theme=="light" ? whiteTextColor : colorPrimaryBlack};
  color:${({theme}) => theme=="light" ? primaryTextColor : elementGrayBackground};
  
  
  &:hover {
    background: rgb(0, 0, 0);
    background: ${({theme}) => theme == "light" ? 
    ` linear-gradient(
       33deg,
       ${main} 68%,
       ${lightMain} 100%
      );`

      :  ` linear-gradient(
       33deg,
       ${colorAccentMedium} 68%,
       ${colorAccentMoreTransparent} 100%
      );`
    } ;

    color: ${whiteTextColor};
    transform: translateY(8px);
   
    
    
  }
  transition: all 200ms ease-in-out;
  @media (max-width: 768px) {
  width:100%;
  gap:20px;
}
    
`;
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
`;
const Detail = styled.span`
  display: flex;
  font-size: 28px;
  align-items: center;
`;
const Duration = styled.span`
  font-size: 18px;
  
  
`;
const Benifits = styled.ul`
  margin-top: 20px;
  padding: 0 0 0 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;

`;
const Benifit = styled.li`
  list-style: circle;
`;
const DisabledBackground = styled.div`
width: 100%;
height:100%;
left: 0;
top: 0;
position: fixed;
backdrop-filter: brightness(40%);
-webkit-backdrop-filter: brightness(20%);
display: flex;
align-items: center;
justify-content: center;
z-index: 99;

`
const PayContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
padding: 32px;
background-color:${({theme}) => theme=="light" ? whiteTextColor : colorPrimaryBlack};

width: 50%;
height: auto;
gap: 20px;
transform: ${props => props.selected == null ? "translateY(-200%)" : "translateY(0)"} ;
border-radius:8px;
transition: 500ms ease-in-out;
@media (max-width: 768px) {
    width: 90%;
}

`
const PayInformation = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
background-color:${({theme}) => theme=="light" ? colorPrimaryBlack : colorAccentMediumTransparent};

border-radius: 8px;
color: ${whiteTextColor};
padding: 20px;


`
const Information = styled.div``
const PaymentType = styled.div`
display: flex;
align-items: center;
gap: 8px;
@media (max-width: 768px) {
    flex-direction: column;
    
}
`
const CardsContainer = styled.div`
display: flex;
flex-wrap: wrap;
align-items: center;
gap: 8px;
width: 100%;

`
const Cards = styled.img`
width: 95px;
`



const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const Register = () => {
  const [user, setUser] = useState({});
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pending, setPending] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [finished, setFinished] = useState(false);
  const theme = useSelector(state => state.theme.mode);
    const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
      };
  
      handleResize(); // Check initial window size
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  const handleChange2 = (e) => {
    e.preventDefault();
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value , subscription : selected , prof : imageUrl }));
   
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate user input
    if (!user || !user.username || !user.email || !user.password || !user.firstname || !user.lastname) {
      setMessage("Please fill in all the required fields.");
      setType("error");
      setOpen(true);
      return;
    }
  
    // Additional validation for email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      setMessage("Invalid email format.");
      setType("error");
      setOpen(true);
      return;
    }
  
    // Validate password strength (e.g., minimum 6 characters)
    if (user.password.length < 6) {
      setMessage("Password must be at least 6 characters long.");
      setType("error");
      setOpen(true);
      return;
    }
  
    // Proceed with the API call
    newRequest
      .post("/auth/register", user)
      .then((res) => {
        console.log(user);
        if (res.status === 201) {
          setMessage("User created successfully! Please login again.");
          setType("success");
          setOpen(true);
          setPending(false)
          setTimeout(() => {
            navigate("/login");
            
          }, 2000); // Removed brackets around delay
        }
      })
      .catch((err) => {
        // Handle server-side errors
        if (err.response?.status === 401) {
          setMessage("User already exists!");
          setType("error");
          setOpen(true);
        } else {
          setMessage("An error occurred. Please try again.");
          setType("error");
          setOpen(true);
        }
      });
  };
  

  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSelect = (e , value) => {
    e.preventDefault()
    setSelected(value);
    setFinished(false);
  };



  const handleChangeImage = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      })
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
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload a Screenshot 
      </div>
    </button>
  );
const customTextField = {
  flex: 1, margin: "20px 10px 0 0" ,
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

  const customPaiment = {
    mt: 2,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
   " @media (max-width: 768px) " :{
      flexDirection: "column-reverse",
    }
        
  }
  
  return (
    <Container theme={theme}>
      <AlertMessage
        open={open}
        setOpen={setOpen}
        message={message}
        type={type}
      />
     
      <Lottie animationData={me} style={{ width: !isMobile ? "40%" : "60%" , opacity:theme == "light" ? 1 :0.8}} />
      
      <Divider orientation={!isMobile ? "vertical" : "horizontal"} style={{ height: !isMobile ? 300 : 1 , width:  !isMobile ? 1 : 300  ,borderColor:theme == "light" ? secondText : colorElementBackgroundGray }} />
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form theme={theme}>
          <TextField
            sx={customTextField}
            size="small"
            id="outlined-basic"
            label="first name"
            name="firstname"
            variant="outlined"
            onChange={handleChange2}
            required
          />
          <TextField
            sx={customTextField}
            size="small"
            id="outlined-basic"
            label="last name"
            name="lastname"
            variant="outlined"
            onChange={handleChange2}
            required
          />
          <TextField
            sx={customTextField}
            size="small"
            id="outlined-basic"
            label="user name"
            name="username"
            variant="outlined"
            onChange={handleChange2}
            required
          />
          <TextField
           sx={customTextField}
            size="small"
            id="outlined-basic"
            label="email"
            name="email"
            variant="outlined"
            onChange={handleChange2}
            required

          />

          <FormControl
           sx={customTextField}
            size="small"
            id="outlined-basic"
            label="password"
            variant="outlined"
            required

          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              name="password"
              onChange={handleChange2}
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <FormControl
            sx={customTextField}
            size="small"
            id="outlined-basic"
            label="confirm password"
            variant="outlined"
            required

          >
            <InputLabel htmlFor="outlined-adornment-password">
              Confirm Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>

          <FormControl required
         
          sx={customTextField } size="small">
            <InputLabel id="demo-select-small-label">Type</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              name="userRole"
              value={age}
              label="Type"
              onChange={(event) => {
                handleChange2(event);
                handleChange(event);
              }}
              sx={{color:theme == "light" ? primaryTextColor : elementGrayBackground }}
            >
              <MenuItem  value="seller">Seller</MenuItem>

              <MenuItem value="client">Client</MenuItem>
            </Select>
          </FormControl>
          {age == "seller" ? (
            <FormControl
              sx={
              customPaiment
              }
            >
              <Paiment theme={theme} onClick={(e) => handleSelect(e , "Monthly")} value="Monthly"  selected={selected}>
                <Details>
                  <Detail>
                    $40.00 <Duration> /month</Duration>
                  </Detail>
                  <Benifits>
                    <Benifit>illimited orders</Benifit>
                    <Benifit>illimited Products</Benifit>
                    <Benifit>Easy order s managment</Benifit>
                  </Benifits>
                </Details>

                <ShootingStars />
              </Paiment>
              <Paiment theme={theme} name="subscription" onClick={(e) => handleSelect(e , "Annual")} value="Annual" selected={selected}>
                <Details>
                  <Detail>
                    $400.00 <Duration> /year</Duration>
                  </Detail>
                  <Benifits>
                    <Benifit>illimited orders</Benifit>
                    <Benifit>illimited Products</Benifit>
                    <Benifit>Easy order s managment</Benifit>
                  </Benifits>
                </Details>

                <ShootingStars />
              </Paiment>
            </FormControl>

           
          
           
          ) : (
            ""
          )}

          {selected == null || finished ? '':
           <DisabledBackground >
            <PayContainer theme={theme} selected={selected}>
              <IconButton sx={{ ml:'auto' , width:30, height:30 , bgcolor: theme == "light" ? 'black' : colorAccentDark}} onClick={() => setFinished(true)}>
              <CloseTwoToneIcon sx={{color:whiteTextColor, fontSize:16}} />
              </IconButton>
              <PayInformation theme={theme}>
                <Information>
                 CCP Number : 0799990023455436
                </Information>
                <Information>
                 Monton :$ {selected == "Monthly" ? 40.00 : 400.00}
                </Information>
              </PayInformation>
              Add your paiment prof here 
 

 
    <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
      beforeUpload={beforeUpload}
      onChange={handleChangeImage}
     
    >
      {imageUrl ? (
        <img
          src={imageUrl}
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
  


      <PaymentType name='prof' value={imageUrl}>
      <CreatButton theme={theme} onClick={(e) => {handleChange2(e) , setFinished(true) }} style={{width: !isMobile ? 200 : "100%" , marginRight:'auto'}} >Submit</CreatButton>
      <CardsContainer>

      <Cards src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTemtB8Egjx5IeEJ13kX2UcvUkDigPLaULtkA&s" />
      <Cards src="https://comparili.net/wp-content/uploads/2022/12/Badr-Banque-TAWFIR-Comparili-CB-jpg.webp" />
      </CardsContainer>
      </PaymentType>
        
            </PayContainer>
          </DisabledBackground>
          }

          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Agreement margin="10px 0">
            If you already have an account please{" "}
            <Link to="/login" style={{color:main ,fontSize:14 , fontWeight:500}}>LOGIN !!</Link>
          </Agreement>
          <CreatButton theme={theme} onClick={(e) => {handleSubmit(e) , setPending(true)}} disabled={pending ? true : false}>{!pending ? 'CREATE' : <LoadingOutlined />}</CreatButton>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;



