import * as React from "react";
import styled from "styled-components";

import {
  Avatar,
  Button,
  Fab,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import CloudUploadTwoTone from "@mui/icons-material/CloudUploadTwoTone";
import { useSelector } from "react-redux";
import SaveAsTwoToneIcon from "@mui/icons-material/SaveAsTwoTone";
import { EditTwoTone, LoadingOutlined } from "@ant-design/icons";
import AlertMessage from "../Components/Alert";
import newRequest from "../utils/newRequest";
import Cookies from "js-cookie";
import SaveAltTwoToneIcon from "@mui/icons-material/SaveAltTwoTone";
import {
  colorAccentDarkTransparent,
  colorAccentLight,
  colorAccentMain,
  colorAccentMediumTransparent,
  colorAccentSoft,
  colorAccentSub,
  colorAccentSubDark,
  colorBackgroundBlack,
  colorBackgroundGray,
  colorPrimaryBlack,
  darkMain,
  lightMain,
  main,
  medMain,
  primaryTextColor,
  whiteTextColor,
} from "../Colors";
import UpdatePassword from "./updateForms/UpdatePassword";
import { Upload } from "antd";
import { useLocation } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  padding: 32px;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  color: ${(props) =>
    props.theme == "light" ? primaryTextColor : whiteTextColor};
  @media (max-width: 768px) {
    padding: 12px;
  }
`;
const SettingContainer = styled.div`
  display: flex;
  margin-top: 32px;
  gap: 32px;
  @media (max-width: 768px) {
    flex-direction: column;

    gap: 0px;
  }
`;
const Top = styled.div`
  display: flex;
  justify-content: space-between;
`;
const SettingGroup = styled.div`
  padding: 32px;
  border-radius: 8px;
  background-color: ${(props) =>
    props.theme == "light" ? whiteTextColor : colorPrimaryBlack};

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
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const MyButton = styled.button`
  background-color: ${(props) =>
    props.type == "delete"
      ? "transparent"
      : props.theme == "light"
      ? ""
      : colorAccentDarkTransparent};
  border: ${(props) => (props.type == "delete" ? "1.5px solid" : "")};
  color: ${(props) => (props.theme == "light" ? main : colorAccentSub)};

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
  border: 1px solid
    ${(props) => (props.theme == "light" ? "#e0e0e0" : colorBackgroundGray)};
  font-size: 16px;
  background-color: ${(props) =>
    props.theme == "light"
      ? ""
      : props.edit
      ? colorAccentLight
      : colorAccentDarkTransparent};
  cursor: ${(props) => (props.edit ? "text" : "not-allowed")};
  color: ${(props) =>
    props.theme == "light" ? colorPrimaryBlack : whiteTextColor};
`;
const HiddenInput = styled.input`
  display: none;
`;
const UploadButton = styled.label`
  background-color: ${(props) =>
    props.theme == "light" ? "#f8f8f8 " : colorAccentDarkTransparent};
  color: ${(props) => (props.theme == "light" ? main : colorAccentSub)};

  font-size: 14px;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${(props) =>
      props.theme == "light" ? "#e0e0e0" : colorBackgroundBlack};
    transform: translateY(2px);
  }
  transition: 200ms;
`;

const UpdateImage = styled.div`
  position: absolute;
  height: 80px;
  width: 80px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px dashed;
  opacity: 0;
  backdrop-filter: brightness(20%);
  &:hover {
    opacity: 1;
  }
  transition: 200ms;
`;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);

};

const beforeUpload = (file) => {
  const isJpgOrPng =
    file.type === "image/jpeg" ||
    file.type === "image/png" ||
    file.type === "image/webp";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};
const Settings = () => {
  const user = useSelector((state) => state.user?.currentUser);
  const theme = useSelector((state) => state.theme.mode);
  const [newUser, setNewUser] = React.useState(
    user || {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
    }
  );
  const token = Cookies.get("accessToken");


  const [message, setMessage] = React.useState("");
  const [type, setType] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState();
  const [changed, setChanged] = React.useState(false);
  const location = useLocation().pathname.split("/")[1];
  const [logoImageUrl, setLogoImageUrl] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setNewUser((prev) => ({ ...prev, [name]: value }));
  };
  const handleChangeImage = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setLogoImageUrl(url);
      });

      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);

        setLogoImageUrl(url);
      });
    }
  };

  const data = [
    {
      Label: "First Name",
      name: "firstname",
      value: newUser?.firstname,
    },
    {
      Label: "Last Name",
      name: "lastname",
      value: newUser?.lastname,
    },
    {
      Label: "Username",
      name: "username",
      value: newUser?.username,
    },
    {
      Label: "Email",
      name: "email",
      value: newUser?.email,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const accessToken = user?.accessToken;
    if (!user) {
      console.error("User or accessToken is undefined");
      return;
    }

    const formData = new FormData();
    if (logoImageUrl) {
      formData.append("userimg", logoImageUrl);
    }
    Object.keys(newUser).forEach((key) => {
      if (key !== "userimg") {
        // Avoid overwriting with old filename
        formData.append(key, newUser[key]);
      }
    });

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "multipart/form-data", // Ensure correct content type
    };

    newRequest
      .put(`/users/${user.idUSER}`, formData, { headers })
      .then((res) => {
        if (res.status === 200) {
          setMessage("Update Saved");
          setType("success");
          setOpen(true);

          // 6. Update user context with new data if needed
          // You might want to update your user context here
        }
      })
      .catch((err) => {
        if (err.response) {
          switch (err.response.status) {
            case 401:
              setMessage("Unauthorized - Please login again");
              break;
            case 409:
              setMessage("User Does Not Exist");
              break;
            default:
              setMessage("An error occurred");
          }
        } else {
          setMessage("Network Error - Please try again later");
        }
        setType("error");
        setOpen(true);
      })
      .finally(() => {
        setEdit(false);
      });
  };
  const [password, setPassword] = React.useState({ old: "", password: "" });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPassword((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const uploadButton = (
    <button
      style={{
        height: 80,
        width: 80,
        background: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      type="button"
    >
      {loading ? (
        <LoadingOutlined
          style={{
            fontSize: 30,
            color: theme == "light" ? main : colorAccentMain,
          }}
        />
      ) : (
        <CloudUploadTwoTone
          style={{
            color: theme == "light" ? main : colorAccentMain,
            fontSize: 30,
          }}
        />
      )}
      <div
        style={{
          marginTop: 8,
        }}
      ></div>
    </button>
  );

  return (
    <Container
      style={{ height: location !== "Client" ? "calc(100vh - 80px)" : "" }}
      theme={theme}
    >
      <AlertMessage
        open={open}
        setOpen={setOpen}
        message={message}
        type={type}
      />

      <SettingGroup theme={theme}>
        <Top>
          <SettingTitle>Profile Details</SettingTitle>
          <IconButton onClick={() => setEdit(!edit)}>
            <EditTwoTone />
          </IconButton>
        </Top>
        <ImageSetting>
          <Avatar
            sx={{
              width: 80,
              height: 80,
              bgcolor:
                theme == "light" ? "#eeeeee89" : colorAccentDarkTransparent,
            }}
            src={user?.userimg == null ? logoImageUrl : user?.userimg}
            alt={user?.username}
          />
          <UpdateImage>
            <Upload
              name="productimage"
              listType="picture-card"
              showUploadList={true}
              beforeUpload={beforeUpload}
              onChange={(info) => handleChangeImage(info, "logo")}
            >
              {logoImageUrl ? (
                <img
                  src={logoImageUrl}
                  alt="avatar"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </UpdateImage>
          <Options>
            <ButtonGroup>
              <HiddenInput
                type="file"
                id="file-upload"
                name="userimg"
                onChange={handleChange}
              />
              <UploadButton theme={theme}>
                Hover Profile to change image
              </UploadButton>
              <MyButton theme={theme} type="delete">
                Delete
              </MyButton>
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

              <Input
                theme={theme}
                name={item.name}
                placeholder={edit ? "" : item.value}
                value={edit ? item.value : item.value}
                onChange={handleChange}
                disabled={edit ? false : true}
                edit={edit}
              />
            </Information>
          ))}
        </ProfileInfo>
        <Button
          color="success"
          variant="contained"
          sx={{
            width: 200,
            color: theme == "light" ? whiteTextColor : colorAccentMain,
            bgcolor: theme == "light" ? main : colorAccentMediumTransparent,
            "&:hover": {
              bgcolor:
                theme == "light" ? lightMain : colorAccentDarkTransparent,
              color: theme == "light" ? main : "",
            },
          }}
          startIcon={<SaveAltTwoToneIcon />}
          onClick={handleSubmit}
        >
          Save
        </Button>
      </SettingGroup>

      <SettingContainer>
        {changed == true ? (
          <SettingGroup theme={theme} style={{ gap: 16 }}>
            <UpdatePassword
              theme={theme}
              user={user}
              password={password}
              onPasswordChange={handlePasswordChange}
              setMessage={setMessage}
              setOpen={setOpen}
              setType={setType}
              type={type}
              setChanged={setChanged}
            />
          </SettingGroup>
        ) : (
          <SettingGroup theme={theme} style={{ gap: 16 }}>
            <SettingTitle>Change Password</SettingTitle>
            <Required>Change Password Only If You Feel Unsafe</Required>
            <MyButton
              theme={theme}
              onClick={() => setChanged(!changed)}
              style={{ padding: "12px 0 " }}
            >
              Change Your Password
            </MyButton>
          </SettingGroup>
        )}
        <SettingGroup theme={theme} style={{ gap: 16 }}>
          <SettingTitle>Delete Account</SettingTitle>
          <Required>If You Deleted You Account It Will Not Restore</Required>
          <MyButton theme={theme} type="delete" style={{ padding: "12px 0 " }}>
            Delete Account
          </MyButton>
        </SettingGroup>
      </SettingContainer>
    </Container>
  );
};

export default Settings;
