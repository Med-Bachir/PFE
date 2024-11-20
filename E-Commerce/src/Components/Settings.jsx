import * as React from "react";
import styled from "styled-components";

import { Avatar, Fab, IconButton, TextField, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import SaveAsTwoToneIcon from '@mui/icons-material/SaveAsTwoTone';
import { EditTwoTone } from "@ant-design/icons";
import AlertMessage from "../Components/Alert";
import newRequest from "../utils/newRequest";
import Cookies from 'js-cookie'; 
const data = [
  {
    Label: "First Name",
    value: "Bouchaib",
  },
  {
    Label: "Last Name",
    value: "Mouhamed El Bachir",
  },
  {
    Label: "Username",
    value: "Med Bachir",
  },
  {
    Label: "Email",
    value: "mouhamedbachir2323@gmail.com",
  },
];

const Container = styled.div`
  height: calc(100vh - 80px);
  width: 100%;
  padding: 32px;
  overflow:auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;
const SettingContainer = styled.div`
 display: flex;
gap: 32px;

`;
const Top = styled.div`
 display: flex;
justify-content:space-between;

`;
const SettingGroup = styled.div`
  padding: 32px;
  border-radius: 8px;
  background-color: white;
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
`;
const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;
const Button = styled.button`
  background-color: ${(props) => (props.type == "delete" ? "transparent" : "")};
  border: ${(props) => (props.type == "delete" ? "1.5px solid" : "")};
  color: green;
  font-size: 14px;
`;

const Required = styled.span`
  font-size: 12px;
  color: #9f9f9f;
  font-weight: 300;
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

const Settings = () => {
  const user = useSelector((state) => state.user?.currentUser);
  const [newUser, setNewUser] = React.useState(user || {});
  const token = Cookies.get('accessToken');
  console.log(token)
  
  const [message, setMessage] = React.useState("");
  const [type, setType] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [profileImage, setProfileImage] = React.useState(null);
  console.log(newUser)
  
  const handleChange = (e) => {
  const { name, value, files } = e.target;
  if (name === 'userimg' && files.length > 0) {
    setProfileImage(files[0]);
    const reader = new FileReader();
    reader.onload = (event) => {
      setNewUser((prev) => ({ ...prev, [name]: event.target.result }));
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
      value: user?.firstname,
    },
    {
      Label: "Last Name",
      name:"lastname",
      value: user?.lastname,
    },
    {
      Label: "Username",
      name:"username",
      value: user?.username,
    },
    {
      Label: "Email",
      name:"email",
      value: user?.email,
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
      .put(`/seller/${user?.idUSER}`, newUser, { headers })
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
      });
  };

  
  console.log(user?.userimg)
  return (
    <Container>
      <AlertMessage open={open} setOpen={setOpen} message={message} type={type} />
      
      <SettingGroup>
       <Top>
        <SettingTitle>Profile Details</SettingTitle>
        <IconButton onClick={() => setEdit(!edit)}><EditTwoTone/></IconButton>
       </Top>
        <ImageSetting>
          <Avatar sx={{ width: 80, height: 80 ,bgcolor:'green' }}  src={user?.userimg == null ? 'e' : user?.userimg} alt={user?.username} />
          <Options>
            <ButtonGroup>
            <HiddenInput type="file" id="file-upload" name="userimg" onChange={handleChange} />
              <UploadButton htmlFor="file-upload">Upload Profile Image</UploadButton>
              <Button type="delete">Delete</Button>
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
              
              <Input  name={item.name} placeholder={edit ? '' : item.value} onChange={handleChange} disabled={edit ? false : true}  />

            </Information>
          ))}
        </ProfileInfo>
      </SettingGroup>
      <SettingContainer>

      <SettingGroup style={{gap:16}} >
        <SettingTitle >Change Password</SettingTitle>
        <Required>Change Password Only If You Feel Unsafe</Required>
        <Button style={{padding:'12px 0 '}}>Change Your Password</Button>
      </SettingGroup>
      <SettingGroup style={{gap:16}}>
      <SettingTitle >Delete Account</SettingTitle>
        <Required>If You Deleted You Account It Will Not Restore</Required>
        <Button type="delete" style={{padding:'12px 0 '}}>Delete Account</Button>
      </SettingGroup>
      </SettingContainer>
      <Tooltip title="Send Request">

       <Fab color="success" style={{position:'absolute',  bottom:96 , right:32}} aria-label="add" onClick={handleSubmit}>
        <SaveAsTwoToneIcon />
      </Fab>
</Tooltip>
    </Container>
  );
};

export default Settings;
