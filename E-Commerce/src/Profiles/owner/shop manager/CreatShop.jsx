//TOOLS
import Fab from "@mui/material/Fab";
import styled from "styled-components";
import { LoadingOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { useState } from "react";
import { CircularProgress, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import newRequest from "../../../utils/newRequest";

// IMAGES & ICONS
import AddBusinessTwoToneIcon from "@mui/icons-material/AddBusinessTwoTone";
import CloudUploadTwoTone from "@mui/icons-material/CloudUploadTwoTone";
// OLORS
import {
  colorAccentDarkTransparent,
  colorBackgroundBlack,
  colorPrimaryBlack,
  grayBackground,
  main,
  primaryTextColor,
  whiteTextColor,
} from "../../../Colors";

const Container = styled.div`
  height: calc(100vh - 80px);
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
  color: ${(props) =>
    props.theme == "light" ? primaryTextColor : whiteTextColor};
  gap: 32px;
  @media (max-width: 768px) {
    padding: 32px 12px;
  }
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px dashed #bebebe;
  padding: 32px 0;
  gap: 32px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FormTitle = styled.h3`
  font-weight: 500;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 32px 0;
  gap: 12px;
`;

const Title = styled.span`
  font-size: 18px;
  font-weight: 500;
`;

const Desc = styled.span`
  font-size: 13px;
  color: #989898;
`;

const Right = styled.div`
  flex: 2;
  background-color: ${(props) =>
    props.theme == "light" ? whiteTextColor : colorPrimaryBlack};
  padding: 32px;
  border-radius: 4px;
`;

const Required = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: ${(props) =>
    props.theme == "light" ? primaryTextColor : whiteTextColor};
`;

const Span = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: ${main};
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`;

const Label = styled.label``;

const Input = styled.input`
  padding: 14px 16px;
  outline: none;
  border-radius: 4px;
  border: 1px solid
    ${(props) =>
      props.theme == "light" ? grayBackground : colorBackgroundBlack};
  background-color: ${(props) =>
    props.theme == "light" ? whiteTextColor : colorAccentDarkTransparent};
  color: ${(props) =>
    props.theme == "light" ? primaryTextColor : whiteTextColor};
  &:focus {
    border: 1px solid ${main};
  }
  transition: 200ms;
`;

const Area = styled.textarea`
  padding: 14px 16px;
  outline: none;
  border-radius: 4px;
  border: 1px solid
    ${(props) =>
      props.theme == "light" ? grayBackground : colorBackgroundBlack};
  background-color: ${(props) =>
    props.theme == "light" ? whiteTextColor : colorAccentDarkTransparent};
  color: ${(props) =>
    props.theme == "light" ? primaryTextColor : whiteTextColor};
  &:focus {
    border: 1px solid ${main};
  }
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
    message.error("You can only upload JPG/PNG/WEBP file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const CreateShop = () => {
  const user = useSelector((state) => state.user?.currentUser);
  const theme = useSelector((state) => state.theme.mode);
  const [shop, setShop] = useState({});
  const [logoImageUrl, setLogoImageUrl] = useState(null);
  const [coverImageUrl, setCoverImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");

  const handleChangeInfo = (e) => {
    e.preventDefault();
    setShop((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


  const handleChange = (info, type) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        if (type === "logo") {
          setLogoImageUrl(url);
        } else if (type === "cover") {
          setCoverImageUrl(url);
        }
      });
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        if (type === "logo") {
          setLogoImageUrl(url);
        } else if (type === "cover") {
          setCoverImageUrl(url);
        }
      });
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    handleChangeInfo(e);
  };

  const handleCreate = async () => {
    setIsLoading(true);
    try {
      const response = await newRequest.post(
        `shop/create-shop/${user?.idUSER}`,
        {
          shopname: shop.shopname,
          shopimage: logoImageUrl,
          shopdesc: shop.shopdesc,
          shopcover: coverImageUrl,
          number: shop.number,
          country: shop.country,
          state: shop.state,
          city: shop.city,
          street: shop.street,
        }
      );

      if (response.status === 200) {
        message.success(
          "Shop creation request submitted successfully. Please wait for admin approval."
        );
        setIsLoading(false);
      } else {
        message.error("Failed to submit shop creation request.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error creating shop:", error);
      message.error("Failed to submit shop creation request.");
      setIsLoading(false);
    }
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        width: "100%",
        background: theme == "light" ? "none" : colorAccentDarkTransparent,
      }}
      type="button"
    >
      {loading ? (
        <LoadingOutlined style={{ fontSize: 50, color: main }} />
      ) : (
        <CloudUploadTwoTone style={{ color: main, fontSize: 50 }} />
      )}
      <div style={{ marginTop: 8 }}>
        <Required>
          <Span>Upload an image</Span> Or drag and drop. png, jpg
        </Required>
      </div>
    </button>
  );

  const form = [
    {
      title: "Logo",
      desc: (
        <>
          Upload your shop logo from here <Span>300 x 300px</Span>
        </>
      ),
      body: (
        <Upload
          name="shopimage"
          listType="picture-card"
          showUploadList={true}
          beforeUpload={beforeUpload}
          onChange={(info) => handleChange(info, "logo")}
        >
          {logoImageUrl ? (
            <img
              src={logoImageUrl}
              alt="avatar"
              style={{ width: 400, height: 400, objectFit: "contain" }}
            />
          ) : (
            uploadButton
          )}
        </Upload>
      ),
    },
    {
      title: "Cover Image",
      desc: (
        <>
          Upload your shop cover image from here. Dimension of the cover image
          should be <Span>1170 x 435px</Span>
        </>
      ),
      body: (
        <Upload
          name="shopcover"
          listType="picture-card"
          showUploadList={true}
          beforeUpload={beforeUpload}
          onChange={(info) => handleChange(info, "cover")}
        >
          {coverImageUrl ? (
            <img
              src={coverImageUrl}
              alt="cover"
              style={{ width: "100%", height: 400, objectFit: "contain" }}
            />
          ) : (
            uploadButton
          )}
        </Upload>
      ),
    },

    {
      title: "Basic Information",
      desc: <>Add some basic information about your shop here</>,
      body: (
        <>
          <InputContainer theme={theme}>
            <Label>
              Name <Span style={{ color: "red" }}>*</Span>
            </Label>
            <Input
              theme={theme}
              name="shopname"
              onChange={handleNameChange}
              value={name}
            />
          </InputContainer>
          <InputContainer>
            <Label>Slug</Label>
            <Input
              theme={theme}
              disabled={true}
              style={{ cursor: "no-drop" }}
              value={name}
            />
          </InputContainer>
          <InputContainer>
            <Label>Description</Label>
            <Area
              theme={theme}
              name="shopdesc"
              onChange={handleChangeInfo}
            ></Area>
          </InputContainer>
        </>
      ),
    },
    {
      title: "Owner Information",
      desc: <>Add Your Personal Information Here</>,
      body: (
        <>
          <InputContainer theme={theme}>
            <Label>
              Name <Span style={{ color: "red" }}>*</Span>
            </Label>
            <Input theme={theme} value={user?.username} disabled />
          </InputContainer>
          <InputContainer>
            <Label>
              Email <Span style={{ color: "red" }}>*</Span>
            </Label>
            <Input theme={theme} value={user?.email} disabled />
          </InputContainer>
          <InputContainer>
            <Label>
              Phone Number <Span style={{ color: "red" }}>*</Span>
            </Label>
            <Input theme={theme} name="number" onChange={handleChangeInfo} />
          </InputContainer>
        </>
      ),
    },
    {
      title: "Shop Address",
      desc: <>Add your physical shop address from here</>,
      body: (
        <>
          <InputContainer theme={theme}>
            <Label>
              Country <Span style={{ color: "red" }}>*</Span>
            </Label>
            <Input theme={theme} name="country" onChange={handleChangeInfo} />
          </InputContainer>
          <InputContainer theme={theme}>
            <Label>
              State <Span style={{ color: "red" }}>*</Span>
            </Label>
            <Input theme={theme} name="state" onChange={handleChangeInfo} />
          </InputContainer>
          <InputContainer theme={theme}>
            <Label>
              City <Span style={{ color: "red" }}>*</Span>
            </Label>
            <Input theme={theme} name="city" onChange={handleChangeInfo} />
          </InputContainer>
          <InputContainer theme={theme}>
            <Label>
              Street <Span style={{ color: "red" }}>*</Span>
            </Label>
            <Input theme={theme} name="street" onChange={handleChangeInfo} />
          </InputContainer>
        </>
      ),
    },
  ];

  return (
    <Container theme={theme}>
      <FormTitle>Create Shop</FormTitle>
      {form.map((item, index) => (
        <FormContainer theme={theme} key={index}>
          <Left>
            <Title>{item.title}</Title>
            <Desc>{item.desc}</Desc>
          </Left>
          <Right theme={theme}>{item.body}</Right>
        </FormContainer>
      ))}
      <Tooltip title="Send Request">
        <Fab
          color="success"
          sx={{ position: "absolute", bottom: 96, right: 32, bgcolor: main }}
          aria-label="add"
          onClick={handleCreate}
          disabled={isLoading ? true : false}
        >
          {isLoading ? (
            <CircularProgress size="30px" color="inherit" />
          ) : (
            <AddBusinessTwoToneIcon />
          )}
        </Fab>
      </Tooltip>
    </Container>
  );
};

export default CreateShop;
