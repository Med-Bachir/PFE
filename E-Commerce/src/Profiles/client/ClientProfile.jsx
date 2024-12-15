import * as React from "react";
import styled from "styled-components";

import { Avatar, Button, Fab, IconButton, TextField, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import SaveAsTwoToneIcon from '@mui/icons-material/SaveAsTwoTone';
import { EditTwoTone } from "@ant-design/icons";
import AlertMessage from "../../Components/Alert";
import newRequest from "../../utils/newRequest";
import Cookies from 'js-cookie'; 
import SaveAltTwoToneIcon from "@mui/icons-material/SaveAltTwoTone";
import { colorAccentDarkTransparent, colorAccentLight, colorAccentMain, colorAccentMediumTransparent, colorAccentSub, colorBackgroundBlack, colorBackgroundGray, colorPrimaryBlack, grayBackground, lightMain, main, primaryTextColor, secondaryTextColor, whiteTextColor } from "../../Colors";

const Container = styled.div`
  
  width: 100%;
 
 position: relative;
  display: flex;
  flex-direction: column;
  color: ${props => props.theme == "light" ? primaryTextColor : whiteTextColor};

  
`;
const SettingContainer = styled.div`
 display: flex;
gap: 32px;
@media (max-width: 768px ){
  flex-direction: column;
  
  gap: 0px;
  }


`;
const Top = styled.div`
 display: flex;
justify-content:space-between;


`;
const SettingGroup = styled.div`
  padding: 32px;
  border-radius: 8px;
  background-color: ${props => props.theme == "light" ? whiteTextColor  : colorPrimaryBlack};
 
  flex: 1;
  display: flex;
  flex-direction: column;
`;
const SettingTitle = styled.span`
  font-size: 20px;
  font-weight: 500;
 
`;
const ImageSetting = styled.div`
  padding: 32px 0;
  display: flex;
  align-items: center;
  gap: 28px;
  @media (max-width: 768px) {
   flex-direction: column;
  }

`;
const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  @media (max-width: 768px ){
  flex-direction: column;
  }
`;
const MyButton = styled.button`
  background-color: ${(props) => (props.type == "delete" ? "transparent" : props.theme == "light" ? "" : colorAccentDarkTransparent)};
   border: ${(props) => (props.type == "delete" ? "1.5px solid" : "")};
   color: ${props => props.theme == "light" ? main : colorAccentSub};
  font-size: 14px;
  
`;

const Required = styled.span`
  font-size: 12px;
  color: ${secondaryTextColor};
  font-weight: 300;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Limit to two lines */
  -webkit-box-orient: vertical; /* Required for line clamping */
  overflow: hidden; /* Hide overflow */
  text-overflow: ellipsis; /* Add ellipsis at the end of the second line */
  @media (max-width: 768px) {
    /* Add media query for mobile */
    -webkit-line-clamp: 2; 
  }
`;
const ProfileInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const Information = styled.div`
  width: 48%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 32px;
`;
const Label = styled.span``;
const Input = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid ${props => props.theme == "light" ? "#e0e0e0" : colorBackgroundGray } ;
  font-size: 16px;
  background-color: ${props => props.theme == "light" ? "" : props.edit ? colorAccentLight : colorAccentDarkTransparent};
  cursor: ${props => props.edit ? 'text': 'not-allowed' };
  color: ${props => props.theme == "light" ? colorPrimaryBlack : whiteTextColor };
`;
const HiddenInput = styled.input`
  display: none;
`;
const UploadButton = styled.label`
    background-color: ${props => props.theme == "light" ? "#f8f8f8 ": colorAccentDarkTransparent };
    color: ${props => props.theme == "light" ? main : colorAccentSub};
  font-size: 14px;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
        background-color: ${props => props.theme == "light" ? "#e0e0e0":  colorBackgroundBlack};
    transform: translateY(2px);
  }
  transition: 200ms;
`;

const ClientProfile = () => {
  const user = useSelector((state) => state.user?.currentUser);
  const theme = useSelector((state) => state.theme.mode);
  const [newUser, setNewUser] = React.useState(user || {
    firstname:'',
lastname:"",
username:"",
email:""
  });
  const token = Cookies.get('accessToken');
  console.log(token)
  
  const [message, setMessage] = React.useState("");
  const [type, setType] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState();
  const [profileImage, setProfileImage] = React.useState(null);
  console.log(newUser)
  
  const handleChange = (e) => {


    e.preventDefault()
  const { name, value, files } = e.target;


 

  if (name === 'userimg' && files.length > 0) {
    setProfileImage(files[0]);
    const reader = new FileReader();
    reader.onload = (event) => {
      setNewUser({...user  , userimg : files[0].name });
    };
    reader.readAsDataURL(files[0]); // Convert blob URL to data URL
  } else {
    setNewUser((prev) => ({ ...prev, [name]: value }));
  }
};

  const data = [
    {
      Label: "First Name",
      name:"firstname",
      value: newUser?.firstname,
    },
    {
      Label: "Last Name",
      name:"lastname",
      value: newUser?.lastname,
    },
    {
      Label: "Username",
      name:"username",
      value: newUser?.username,
    },
    {
      Label: "Email",
      name:"email",
      value: newUser?.email,
    },
    
  ];
  


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user || !user?.accessToken) {
      console.error("User or accessToken is undefined");
      return;
    }

    const formData = new FormData();
    if (profileImage) {
      formData.append('userimg', profileImage);
    }
    Object.keys(newUser).forEach(key => {
      formData.append(key, newUser[key]);
    });

    const headers = {
      Authorization: `Bearer ${token}`
    };

    newRequest
      .put(`/users/${user?.idUSER}`, newUser, { headers })
      .then((res) => {
        if (res.status === 200) {
          setMessage("Update Saved");
          setType("success");
          setOpen(true);
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 409) {
          setMessage("User Does Not Exist");
          setType("error");
          setOpen(true);
        } else {
          setMessage("An error occurred");
          setType("error");
          setOpen(true);
        }
      }).finally(() => {
        setEdit(false)

      })

      
  };

  
  
  return (
    <Container theme={theme}>
      <AlertMessage open={open} setOpen={setOpen} message={message} type={type} />
      
      <SettingGroup theme={theme} style={{marginBottom:32}}>
       <Top>
        <SettingTitle>Profile Details</SettingTitle>
        <IconButton  onClick={() => setEdit(!edit)}><EditTwoTone color="secondary"/></IconButton>
       </Top>
        <ImageSetting>
          <Avatar sx={{ width: 80, height: 80, bgcolor: theme == "light" ? "#eeeeee89" : colorAccentDarkTransparent }}  src={user?.userimg == null ? 'e' : user?.userimg} alt={user?.username} />
          <Options>
            <ButtonGroup>
            <HiddenInput type="file" id="file-upload" name="userimg" onChange={handleChange} />
              <UploadButton theme={theme} htmlFor="file-upload">Upload Profile Image</UploadButton>
              <MyButton theme={theme} type="delete">Delete</MyButton>
            </ButtonGroup>
            <Required>
              *Image size should be at least 320px big,and less then 500kb .
              Allowed files .png and .jpg*
            </Required>
          </Options>
        </ImageSetting>
        <ProfileInfo >
          {data.map((item) => (
            <Information>
              <Label>{item.Label}</Label>
              
              <Input theme={theme}  name={item.name} placeholder={edit ? '' : item.value} value={edit ? item.value : item.value} onChange={handleChange} disabled={edit ? false : true}  />

            </Information>
          ))}
        </ProfileInfo>
        <Button
            
            variant="contained"
            sx={{ width: 200 , color: theme == "light" ? whiteTextColor : colorAccentMain , bgcolor: theme == "light" ? main : colorAccentMediumTransparent , "&:hover" : {bgcolor: theme == "light" ? lightMain  : colorAccentDarkTransparent , color : theme == "light" ? main  : ""}  }}
            startIcon={<SaveAltTwoToneIcon />}
            onClick={handleSubmit}
          >
            Save
          </Button>
        
      </SettingGroup>
      
      <SettingContainer>

      <SettingGroup theme={theme} style={{gap:16}} >
        <SettingTitle >Change Password</SettingTitle>
        <Required>Change Password Only If You Feel Unsafe</Required>
        <MyButton theme={theme} style={{padding:'12px 0 '}}>Change Your Password</MyButton>
      </SettingGroup>
      <SettingGroup theme={theme} style={{gap:16}}>
      <SettingTitle >Delete Account</SettingTitle>
        <Required>If You Deleted You Account It Will Not Restore</Required>
        <MyButton theme={theme} type="delete" style={{padding:'12px 0 '}}>Delete Account</MyButton>
      </SettingGroup>
      </SettingContainer>
      
    </Container>
  );
};

export default ClientProfile;
