import { Button, TextField } from "@mui/material";
import styled from "styled-components";
import {
  colorAccentDarkTransparent,
  colorAccentMain,
  colorAccentMedium,
  colorAccentMediumTransparent,
  colorAccentMoreTransparent,
  colorAccentSoft,
  colorBackgroundBlack,
  colorBackgroundGray,
  colorErrorDark,
  colorErrorSoft,
  colorPrimaryBlack,
  darkRed,
  elementGrayBackground,
  lightMain,
  main,
  primaryTextColor,
  secondText,
  softMain,
  softRed,
  whiteTextColor,
} from "../../Colors";
import SaveAltTwoToneIcon from "@mui/icons-material/SaveAltTwoTone";
import newRequest from "../../utils/newRequest";
import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { RecoveryContext } from "../../App";
import AlertMessage from "../Alert";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: start;
  height: 100vh;
  padding: 32px;
background-color: ${({theme}) => theme == "light" ? elementGrayBackground : colorBackgroundGray };
color: ${({theme}) => theme == "light" ? colorPrimaryBlack : elementGrayBackground };
`;
const InputContainer = styled.form`
  display: flex;
  width: 400px;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  border-radius: 8px;
background-color: ${({theme}) => theme == "light" ? elementGrayBackground : colorBackgroundBlack };
 
`;

const ResetPassword = () => {
      const {setPage , email } = useContext(RecoveryContext);
    
const theme = useSelector(state => state.theme.mode)
    const [password , setPassword] = useState()
    const [message , setMessage] = useState()
    const [type , setType] = useState()
    const [open , setOpen] = useState()



  const handleSubmit = (e) => {
    e.preventDefault();

    newRequest

      .put(`/users/reset-password/${email}`, {password})

      .then((res) => {
        if (res.status === 200) {
          setMessage("Password Updated Successfully");
          setType("success");
          setOpen(true);
          setTimeout(() => {
            setPage("login")
          }, [1000])
        }
      })

      .catch((err) => {
        if (err.response) {
          const status = err.response.status;
          if (status === 404) {
            setMessage("Account doesn't exist");
            setType("error");
            setOpen(true);
          } else if (status === 500) {
            setMessage("Somthing went wrong please check your internet connection OR CONTACT US");
            setType("error");
            setOpen(true);
          } else {
            // Handle other statuses
            setMessage("An error occurred");
            setType("error");
            setOpen(true);
          }
        } else {
          // Network error or no response
          setMessage("Network Error. Please try again.");
          setType("error");
          setOpen(true);
        }
      })
    
  };

  const customTextField = {
    flex: 1,
    minWidth: "40%",
    borderRadius: 1,
    bgcolor: theme == "light" ? whiteTextColor : colorAccentMoreTransparent,
    ".css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
      color: theme == "light" ? primaryTextColor : elementGrayBackground,
    },
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
    ".css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input": {
      color: theme == "light" ? primaryTextColor : elementGrayBackground,
    },
  };
  return (
    <Container>
        <AlertMessage open={open} setOpen={setOpen} message={message} type={type} />

        <InputContainer>
      <TextField
        name="password"
        label="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={
            customTextField
            
        }
        />
     
      <Button
        variant="contained"
        sx={{
            width: 200,
            color: theme == "light" ? whiteTextColor : colorAccentMain,
            bgcolor: theme == "light" ? main : colorAccentMediumTransparent,
            "&:hover": {
                bgcolor: theme == "light" ? lightMain : colorAccentDarkTransparent,
                color: theme == "light" ? main : "",
            },
        }}
        startIcon={<SaveAltTwoToneIcon />}
        onClick={handleSubmit}
        >
        Save
      </Button>
          </InputContainer>
    </Container>
  );
};

export default ResetPassword;
