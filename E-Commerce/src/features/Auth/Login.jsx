import styled from "styled-components"

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect, useState } from "react";
import { Divider, IconButton, InputAdornment, OutlinedInput, TextField } from "@mui/material";
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Lottie from "lottie-react"
import ism from "../../login1.json"
import newRequest from "../../utils/newRequest";
import { useDispatch, useSelector } from "react-redux";
import AlertMessage from "../../Components/Alert";
import { loginFailure, loginStart, loginSuccess } from "../../redux/user";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { colorAccentMain, colorAccentMedium, colorAccentMoreTransparent, colorAccentSoft, colorBackgroundBlack, colorElementBackgroundGray, colorPrimaryBlack, elementGrayBackground, lightMain, lightSoftMain, main, primaryTextColor, secondText, whiteTextColor } from "../../Colors";


const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-color: ${({theme}) => theme == "light" ? whiteTextColor : colorBackgroundBlack};
   /* background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;*/
  
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 40px 0;
  @media (max-width: 768px) and (max-height: 923px) {
 flex-direction: column-reverse;
 height:auto;
}
@media (max-width: 768px) and (min-height: 923px) {
  flex-direction: column-reverse;
  
}
  

`

const Wrapper = styled.div`
    padding: 20px;
    width: 30%;
    color: ${({theme}) => theme == "light" ? colorPrimaryBlack : elementGrayBackground };
    margin-left: 50px;
    @media (max-width: 768px) {
 width: 100%;
 margin-left: 0;
}

`
const Title = styled.h1`
    font-size: 24px;
    font-weight: 500;
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
`
const Agreement = styled.span`
    font-size: 12px;
    margin: 20px 0 ;
    width: 100%;
`


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
 width: 100%;
 margin-left: 0;
}
`





    
    

const Login = () => {
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});
const theme = useSelector(state => state.theme.mode)
  const dispatch = useDispatch();
    
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

    const [showPassword, setShowPassword] = useState(false); 
    const handleChange = (e) => {
      e.preventDefault();
      setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      console.log(user)
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };


    const handleClick = (e) => {
      e.preventDefault();
  
      dispatch(loginStart());
  
      try {
        newRequest.post("/auth/login", user).then((res) => {
          dispatch(loginSuccess(res.data));
          
          
          setMessage("Loggin Success");
          setType("success");
          setOpen(true);
          setTimeout(() => {

            navigate("/");
          }, [2000])

        }).catch((err) => {
          if (err?.response?.status === 400) {
            dispatch(loginFailure())
            setMessage("User not found!");
            setType("error");
            setOpen(true);
          }
          if (err?.response?.status === 401) {
            dispatch(loginFailure())
            setMessage("Wrong password!");
            setType("error");
            setOpen(true);
          }
          if (err?.response?.status === 402) {
            dispatch(loginFailure())
            setMessage("Wrong username !");
            setType("error");
            setOpen(true);
          }
          
  
        })
  
      } catch (err) {
        dispatch(loginFailure())
      }
    };


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

  return (
    <Container theme={theme}>
        <AlertMessage open={open} setOpen={setOpen} message={message} type={type} />
        
        <Wrapper theme={theme}>
            <Title>
                LOGIN
            </Title>
            <Form>
           
      
            <TextField sx={customTextField} size='small' id="outlined-basic" label="user name" name="username" variant="outlined" onChange={handleChange}  required/>
        
           
            <FormControl sx={customTextField} size='small' id="outlined-basic" label="confirm password" variant="outlined" required>
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
          onChange={handleChange}
            id="outlined-adornment-password"
            name="password"
            type={showPassword ? 'text' : 'password'}
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
                  
               
               
                

      

    
                <Agreement>
                By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
                </Agreement>
                
                <CreatButton theme={theme} onClick={handleClick}>LOGIN</CreatButton>
                <Agreement >
                  If you are new please <Link to={'/register' } style={{color:main , fontSize:14 , fontWeight:500}}>CREATE ACCOUNT !!</Link>
                </Agreement>
            </Form>
        </Wrapper>
        <Divider orientation={!isMobile ? "vertical" : "horizontal"} style={{ height: !isMobile ? 300 : 1 , width:  !isMobile ? 1 : 300  ,borderColor:theme == "light" ? secondText : colorElementBackgroundGray }} />
       <Lottie animationData={ism}/>
    </Container>
  )
}

export default Login;