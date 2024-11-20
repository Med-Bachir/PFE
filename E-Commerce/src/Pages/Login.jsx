import styled from "styled-components"

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from "react";
import { Divider, IconButton, InputAdornment, OutlinedInput, TextField } from "@mui/material";
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Lottie from "lottie-react"
import ism from "../login1.json"
import newRequest from "../utils/newRequest";
import { useDispatch } from "react-redux";
import AlertMessage from "../Components/Alert";
import { loginFailure, loginStart, loginSuccess } from "../redux/user";
import { Navigate, useNavigate } from "react-router-dom";


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
  padding: 40px 0;
  

`

const Wrapper = styled.div`
    padding: 20px;
    width: 30%;
    background-color: white;
    margin-left: 50px;
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

const Link = styled.a`
cursor: pointer;
font-weight: 600;
font-size: 14px;
color: teal;
`
const CreatButton = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: #27272A;
    color: white;
    cursor: pointer;
    border: solid #27272A;
    transition: 200ms ease-in-out;

    &:hover{
      background-color: transparent ;
      
    color: #27272A;
    }
`





    
    

const Login = () => {
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});

  const dispatch = useDispatch();
    
const navigate = useNavigate();
   

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



  return (
    <Container>
        <AlertMessage open={open} setOpen={setOpen} message={message} type={type} />
        
        <Wrapper>
            <Title>
                LOGIN
            </Title>
            <Form>
           
      
            <TextField sx={{flex: 1 , minWidth :'40%' , margin :'20px 10px 0 0'  }} size='small' id="outlined-basic" label="user name" name="username" variant="outlined" onChange={handleChange} />
        
           
            <FormControl sx={{flex: 1 , minWidth :'40%' , margin :'20px 10px 0 0'  }} size='small' id="outlined-basic" label="confirm password" variant="outlined">
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
                
                <CreatButton onClick={handleClick}>CREATE</CreatButton>
                <Agreement >
                  If you are new please <Link>CREATE ACCOUNT !!</Link>
                </Agreement>
            </Form>
        </Wrapper>
        <Divider orientation="vertical" style={{height:300}}/>
       <Lottie animationData={ism}/>
    </Container>
  )
}

export default Login;