import styled from "styled-components";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import newRequest from "../../utils/newRequest";
import { useState } from "react";
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
const Container = styled.div`
  width: 100%;
  height: 100vh;
  /* background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)


    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;*/

  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const Wrapper = styled.div`
  padding: 20px;
  width: 40%;
  background-color: white;
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
`;
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
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
  background-color: #27272a;
  color: white;
  border: solid #27272a;
  cursor: pointer;
  transition: 200ms ease-in-out;

  &:hover {
    background-color: transparent;

    color: #27272a;
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
  &:hover {
    background: rgb(0, 0, 0);
    background: linear-gradient(
      33deg,
      rgba(0, 0, 0, 1) 68%,
      rgba(219, 219, 219, 1) 100%
    );
    color: white;
    transform: translateY(8px);
  }
  transition: 200ms ease-in-out;
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
  color: #828282;
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
position: absolute;
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
background-color: white;
width: 50%;
height: auto;
gap: 20px;
transform: ${props => props.selected == null ? "translateY(-200%)" : "translateY(0)"} ;
border-radius:8px;
transition: 500ms ease-in-out;

`
const PayInformation = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
background-color: black;
border-radius: 8px;
color: white;
padding: 20px;

`
const Information = styled.div``
const PaymentType = styled.div`
display: flex;
align-items: center;
gap: 8px;
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
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
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
  const [imageUrl, setImageUrl] = useState();
  const [finished, setFinished] = useState(false);
  const navigate = useNavigate();

  const handleChange2 = (e) => {
    e.preventDefault();
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value , subscription : selected , prof : imageUrl }));
    console.log(user);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    newRequest
      .post("/auth/register", user)
      .then((res) => {
        console.log(user);
        if (res.status === 201) {
          setMessage("User created successfully! Please login again");
          setType("success");
          setOpen(true);

          setTimeout(() => {
            navigate("/login");
          }, [2000]);
        }
      })
      .catch((err) => {
        if (err.response.status === 409) {
          setMessage("User already exist!");
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
        border: 0,
        background: 'none',
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
  return (
    <Container>
      <AlertMessage
        open={open}
        setOpen={setOpen}
        message={message}
        type={type}
      />
      <Lottie animationData={me} style={{ width: "40%" }} />
      <Divider orientation="vertical" style={{ height: 300 }} />
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <TextField
            sx={{ flex: 1, minWidth: "40%", margin: "20px 10px 0 0" }}
            size="small"
            id="outlined-basic"
            label="first name"
            name="firstname"
            variant="outlined"
            onChange={handleChange2}
          />
          <TextField
            sx={{ flex: 1, minWidth: "40%", margin: "20px 10px 0 0" }}
            size="small"
            id="outlined-basic"
            label="last name"
            name="lastname"
            variant="outlined"
            onChange={handleChange2}
          />
          <TextField
            sx={{ flex: 1, minWidth: "40%", margin: "20px 10px 0 0" }}
            size="small"
            id="outlined-basic"
            label="user name"
            name="username"
            variant="outlined"
            onChange={handleChange2}
          />
          <TextField
            sx={{ flex: 1, minWidth: "40%", margin: "20px 10px 0 0" }}
            size="small"
            id="outlined-basic"
            label="email"
            name="email"
            variant="outlined"
            onChange={handleChange2}
          />

          <FormControl
            sx={{ flex: 1, minWidth: "40%", margin: "20px 10px 0 0" }}
            size="small"
            id="outlined-basic"
            label="password"
            variant="outlined"
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
            sx={{ flex: 1, minWidth: "40%", margin: "20px 10px 0 0" }}
            size="small"
            id="outlined-basic"
            label="confirm password"
            variant="outlined"
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

          <FormControl sx={{ mt: 2.5, mr: 3, minWidth: 120 }} size="small">
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
            >
              <MenuItem value="seller">Seller</MenuItem>

              <MenuItem value="client">Client</MenuItem>
            </Select>
          </FormControl>
          {age == "seller" ? (
            <FormControl
              sx={{
                mt: 2,
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Paiment onClick={(e) => handleSelect(e , "Monthly")}  selected={selected}>
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
              <Paiment name="subscription" onClick={(e) => handleSelect(e , "Annual")} value="Annual" selected={selected}>
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
            <PayContainer selected={selected}>
              <IconButton sx={{ ml:'auto' , width:30, height:30 , bgcolor:'black'}} onClick={() => setFinished(true)}>
<CloseTwoToneIcon sx={{color:'white', fontSize:16}} />
              </IconButton>
              <PayInformation>
                <Information>
                 CCP Number : 0799990023455436
                </Information>
                <Information>
                 Monton :$ {selected == "Monthly" ? 40.00 : 400.00}
                </Information>
              </PayInformation>

            <Flex  gap="middle" style={{width:'100%' ,display:"flex" , flexDirection:'column'}} wrap>
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
              height:300,
              objectFit:'contain'
            }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
      <PaymentType name='prof' value={imageUrl}>
        
      <CreatButton onClick={(e) => {handleChange2(e) , setFinished(true) }} style={{width:200 , marginRight:'auto'}} >Submit</CreatButton>
      <Cards src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTemtB8Egjx5IeEJ13kX2UcvUkDigPLaULtkA&s" />
      <Cards src="https://comparili.net/wp-content/uploads/2022/12/Badr-Banque-TAWFIR-Comparili-CB-jpg.webp" />
      </PaymentType>
    </Flex>
            </PayContainer>
          </DisabledBackground>
          }

          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Agreement margin="10px 0">
            If you already have an account please{" "}
            <Link to="/login">LOGIN !!</Link>
          </Agreement>
          <CreatButton onClick={handleSubmit}>CREATE</CreatButton>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;



/* 

import React, { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Flex, message, Upload } from 'antd';
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};
const App = () => {
 
  
  return (
    
  );
};
export default App;
*/