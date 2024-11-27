import * as React from "react";
import styled from "styled-components";

import { Avatar, Button, Fab, IconButton, TextField, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import SaveAsTwoToneIcon from '@mui/icons-material/SaveAsTwoTone';
import { EditTwoTone } from "@ant-design/icons";
import AlertMessage from "../Components/Alert";
import newRequest from "../utils/newRequest";
import Cookies from 'js-cookie'; 
import SaveAltTwoToneIcon from "@mui/icons-material/SaveAltTwoTone";

const Container = styled.div`
  
  width: 100%;
 
 
 position: relative;
  display: flex;
  flex-direction: column;

  
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
  background-color: white;
  
  margin-bottom: 32px;
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
  background-color: ${(props) => (props.type == "delete" ? "transparent" : "")};
  border: ${(props) => (props.type == "delete" ? "1.5px solid" : "")};
  color: green;
  font-size: 14px;
  
`;

const Required = styled.span`
  font-size: 12px;
  color: #9f9f9f;
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
  border: 1px solid #e0e0e0;
  font-size: 16px;
`;
const HiddenInput = styled.input`
  display: none;
`;
const UploadButton = styled.label`
  background-color: #f8f8f8;
  color: green;
  font-size: 14px;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #e0e0e0;
  }
  transition: 200ms;
`;

const ClientProfile = () => {
  const user = useSelector((state) => state.user?.currentUser);
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
    <Container>
      <AlertMessage open={open} setOpen={setOpen} message={message} type={type} />
      
      <SettingGroup>
       <Top>
        <SettingTitle>Profile Details</SettingTitle>
        <IconButton onClick={() => setEdit(!edit)}><EditTwoTone/></IconButton>
       </Top>
        <ImageSetting>
          <Avatar sx={{ width: 80, height: 80 ,bgcolor:'#eeeeee89' }}  src={user?.userimg == null ? 'e' : user?.userimg} alt={user?.username} />
          <Options>
            <ButtonGroup>
            <HiddenInput type="file" id="file-upload" name="userimg" onChange={handleChange} />
              <UploadButton htmlFor="file-upload">Upload Profile Image</UploadButton>
              <MyButton type="delete">Delete</MyButton>
            </ButtonGroup>
            <Required>
              *Image size should be at least 320px big,and less then 500kb .
              Allowed files .png and .jpg*
            </Required>
          </Options>
        </ImageSetting>
        <ProfileInfo>
          {data.map((item) => (
            <Information>
              <Label>{item.Label}</Label>
              
              <Input  name={item.name} placeholder={edit ? '' : item.value} value={edit ? item.value : item.value} onChange={handleChange} disabled={edit ? false : true}  />

            </Information>
          ))}
        </ProfileInfo>
        <Button
            color="success"
            variant="contained"
            sx={{width : 200}}
            startIcon={<SaveAltTwoToneIcon />}
            onClick={handleSubmit}
          >
            Save
          </Button>
        
      </SettingGroup>
      
      <SettingContainer>

      <SettingGroup style={{gap:16}} >
        <SettingTitle >Change Password</SettingTitle>
        <Required>Change Password Only If You Feel Unsafe</Required>
        <MyButton style={{padding:'12px 0 '}}>Change Your Password</MyButton>
      </SettingGroup>
      <SettingGroup style={{gap:16}}>
      <SettingTitle >Delete Account</SettingTitle>
        <Required>If You Deleted You Account It Will Not Restore</Required>
        <MyButton type="delete" style={{padding:'12px 0 '}}>Delete Account</MyButton>
      </SettingGroup>
      </SettingContainer>
      
    </Container>
  );
};

export default ClientProfile;
