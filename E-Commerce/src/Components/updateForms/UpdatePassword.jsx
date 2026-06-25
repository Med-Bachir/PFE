import { Button, TextField } from "@mui/material";
import styled from "styled-components";
import {
  colorAccentDarkTransparent,
  colorAccentMain,
  colorAccentMedium,
  colorAccentMediumTransparent,
  colorAccentMoreTransparent,
  colorAccentSoft,
  colorErrorDark,
  colorErrorSoft,
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


const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const UpdatePassword = ({
  theme,
  user,
  password,
  onPasswordChange,
  type,
  setType,
  setOpen,
  setMessage,
  setChanged,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    newRequest

      .put(`/users/change-password/${user.idUSER}`, password)

      .then((res) => {
        if (res.status === 200) {
          setMessage("Password Updated Successfully");
          setType("success");
          setOpen(true);
          setTimeout(() => {
            setChanged(false)
          }, [1000])
        }
      })

      .catch((err) => {
        if (err.response) {
          const status = err.response.status;
          if (status === 402) {
            setMessage("Old Password Is Incorrect");
            setType("error");
            setOpen(true);
          } else if (status === 404) {
            setMessage("Both old and new passwords are required.");
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
      <TextField
        name="old"
        label="Old Password"
        value={password.old}
        onChange={onPasswordChange}
        sx={[
          customTextField,
          {
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor:
                  theme == "light"
                    ? type == "success"
                      ? lightMain
                      : darkRed
                    : type == "success"
                    ? colorAccentSoft
                    : colorErrorDark, // Hover border color
              },
              "&.Mui-focused fieldset": {
                borderColor:
                  theme == "light"
                    ? type == "success"
                      ? main
                      : darkRed
                    : type == "success"
                    ? colorAccentMedium
                    : colorErrorDark, // Focused border color
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color:
                theme == "light"
                  ? type == "success"
                    ? main
                    : darkRed
                  : type == "success"
                  ? colorAccentMain
                  : colorErrorDark, // Focused label color
            },
          },
        ]}
      />
      <TextField
        name="password"
        label="New Password"
        value={password.password}
        onChange={onPasswordChange}
        sx={customTextField}
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
    </Container>
  );
};

export default UpdatePassword;
