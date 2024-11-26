import styled from "styled-components"

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import newRequest from "../utils/newRequest";
import { useState } from "react";
import { Divider, IconButton, InputAdornment, OutlinedInput, TextField } from "@mui/material";
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Lottie from "lottie-react"
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import me from "../Home.json"
import AlertMessage from "../Components/Alert";
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

`

const Wrapper = styled.div`
    padding: 20px;
    width: 40%;
    background-color: white;
`
const Title = styled.h1`
    font-size: 24px;
    font-weight: 500;
`
const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
`
const Agreement = styled.span`
    font-size: 12px;
    margin: 20px 0 10px;
    width: 100%;
`


const CreatButton = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: #27272A;
    color: white;
    border: solid #27272A;
    cursor: pointer;
    transition: 200ms ease-in-out;

    &:hover{
      background-color: transparent ;
      
    color: #27272A;
    }
`




const Register = () => {

  const [user, setUser] = useState({});
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [open, setOpen] = useState(false);
  
  const navigate = useNavigate();
 

  const handleChange2 = (e) => {
    e.preventDefault();
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(user)
  };

  

  const handleSubmit = (e) => {
    e.preventDefault()
    newRequest.post("/auth/register", user).then((res) => {
      console.log(user)
      if (res.status === 201) {
        
          setMessage("User created successfully! Please login again");
          setType("success");
          setOpen(true);

          setTimeout(() => {

            navigate("/login");
          }, [2000])
         
         
        
      }
    }).catch((err) => {
      if (err.response.status === 409) {
        setMessage("User already exist!");
        setType("error");
        setOpen(true);
        
      }
    })
  }


  




    const [age, setAge] = useState('');

    const handleChange = (event) => {
      setAge(event.target.value);
    };

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };



  return (
    <Container>
      <AlertMessage open={open} setOpen={setOpen} message={message} type={type} />
      <Lottie animationData={me} style={{ width:"40%"}} />
      <Divider orientation="vertical" style={{height:300}} />
        <Wrapper>
            <Title>
                CREATE AN ACCOUNT
            </Title>
            <Form>
           
            <TextField sx={{flex: 1 , minWidth :'40%' , margin :'20px 10px 0 0'   }} size='small' id="outlined-basic" label="first name" name="firstname" variant="outlined" onChange={handleChange2}  />
            <TextField sx={{flex: 1 , minWidth :'40%' , margin :'20px 10px 0 0'  }} size='small' id="outlined-basic" label="last name" name="lastname" variant="outlined" onChange={handleChange2} />
            <TextField sx={{flex: 1 , minWidth :'40%' , margin :'20px 10px 0 0'  }} size='small' id="outlined-basic" label="user name" name="username" variant="outlined" onChange={handleChange2} />
            <TextField sx={{flex: 1 , minWidth :'40%' , margin :'20px 10px 0 0'  }} size='small' id="outlined-basic" label="email" name="email" variant="outlined" onChange={handleChange2} />
           
            <FormControl sx={{flex: 1 , minWidth :'40%' , margin :'20px 10px 0 0'  }} size='small' id="outlined-basic" label="password" variant="outlined" >
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            name="password"
            onChange={handleChange2}
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
        <FormControl sx={{flex: 1 , minWidth :'40%' , margin :'20px 10px 0 0'  }} size='small' id="outlined-basic" label="confirm password" variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
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

            
               
               
                <FormControl sx={{ mt: 2.5,mr: 3, minWidth: 120 }} size="small">
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
   
     
    

                <Agreement>
                By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
                </Agreement>
                <Agreement margin='10px 0'>
                  If you already have an account please <Link to="/login">LOGIN !!</Link>
                </Agreement>
                <CreatButton onClick={handleSubmit}>CREATE</CreatButton>
            </Form>
        </Wrapper>
    </Container>
  )
}

export default Register