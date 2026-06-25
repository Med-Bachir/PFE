import AddBusinessTwoToneIcon from "@mui/icons-material/AddBusinessTwoTone";
import styled from "styled-components";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Checkbox, Divider, Flex, message, Upload } from "antd";
import SaveAltTwoToneIcon from "@mui/icons-material/SaveAltTwoTone";
import CloudUploadTwoToneIcon from "@mui/icons-material/CloudUploadTwoTone";
import CloudUploadTwoTone from "@mui/icons-material/CloudUploadTwoTone";
import {
  Button,
  Fab,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Tooltip,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";

import newRequest from "../../../utils/newRequest";
import { useSelector } from "react-redux";
import {
  colorAccentDark,
  colorAccentDarkTransparent,
  colorAccentLight,
  colorAccentMain,
  colorAccentMedium,
  colorAccentMediumTransparent,
  colorAccentMoreTransparent,
  colorAccentSoft,
  colorBackgroundBlack,
  colorBackgroundGray,
  colorElementBackgroundGray,
  colorPrimaryBlack,
  elementGrayBackground,
  grayBackground,
  lightMain,
  main,
  primaryTextColor,
  secondaryTextColor,
  secondText,
  softMain,
  whiteTextColor,
} from "../../../Colors";

const Container = styled.div`
  height: calc(100vh - 80px);
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
  @media (max-width: 768px) {
 padding:32px 12px;
}
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px dashed
    ${(props) => (props.theme == "light" ? "#bebebe" : "#454545")};

  padding: 32px 0;
  gap: 32px;
  color: ${(props) =>
    props.theme == "light" ? primaryTextColor : whiteTextColor};
    gap: 32px;
  @media (max-width: 768px) {
  flex-direction: column;
}
`;

const FormTitle = styled.h3`
  font-weight: 500;
  color: ${(props) =>
    props.theme == "light" ? primaryTextColor : whiteTextColor};
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
  color: ${secondaryTextColor};
`;

const Right = styled.div`
  flex: 2;
  padding: 32px;
  border-radius: 4px;
  background-color: ${(props) =>
    props.theme == "light" ? whiteTextColor : colorPrimaryBlack};
  color: ${(props) =>
    props.theme == "light" ? primaryTextColor : whiteTextColor};
`;

const Required = styled.span`
  font-size: 14px;
  font-weight: 400;
`;

const Span = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => (props.theme == "light" ? main : colorAccentMain)};
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`;

const Label = styled.label``;

const InputText = styled.input`
  padding: 14px 16px;
  outline: none;
  border-radius: 4px;
  border: 1px solid
    ${(props) =>
      props.theme == "light" ? grayBackground : colorBackgroundGray};
  background-color: ${(props) =>
    props.theme == "light" ? whiteTextColor : colorAccentDarkTransparent};
  color: ${(props) =>
    props.theme == "light" ? primaryTextColor : whiteTextColor};

  &:hover {
    border: 1px solid
      ${(props) => (props.theme == "light" ? softMain : colorAccentMedium)};
  }
  &:focus {
    border: 1px solid
      ${(props) => (props.theme == "light" ? main : colorAccentMain)};
  }
  transition: 200ms ease-in-out;
`;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const AddCategory = () => {
  const theme = useSelector((state) => state.theme.mode);
  const [loading, setLoading] = useState(false);
  const [cats, setCats] = useState(null);
  const [cat, setCat] = useState(null);
  const [subs, setSubs] = useState(null);
  const [sub, setSub] = useState({ idCat: null, subname: "", image: "" });
  const [type, setType] = useState({
    idCat: null,
    typename: "",
    image: "",
    idSub: null,
  });

  const handleChange = (info, field) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);

        switch (field) {
          case "cat":
            setCat({ ...cat, image: url });

            break;
          case "sub":
            setSub({ ...sub, image: url });
            break;
          case "type":
            setType({ ...type, image: url });
            
            break;
          default:
            console.warn(`Unhandled field: ${field}`);
        }
      });
      if (info.file.status === "done") {
        getBase64(info.file.originFileObj, (url) => {
          setLoading(false);

          switch (field) {
            case "cat":
              setCat({ ...cat, image: url });

              break;
            case "sub":
              setSub({ ...sub, image: url });
              break;
            case "type":
              setType({ ...type, image: url });
             
              break;
            default:
              console.warn(`Unhandled field: ${field}`);
          }
        });
      }

      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);

        switch (field) {
          case "cat":
            setCat({ ...cat, image: url });

            break;
          case "sub":
            setSub({ ...sub, image: url });
            break;
          case "type":
            setType({ ...type, image: url });
            
            break;
          default:
            console.warn(`Unhandled field: ${field}`);
        }
      });
    }
 
  };

  // get cat
  useEffect(() => {
    const getCats = async () => {
      try {
        const res = await newRequest.get(`/category/cat`);
        setCats(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    getCats();
  }, []);

  const handleChangeField = (event, field) => {
    event.preventDefault();
    const value = event.target.value;

    switch (field) {
      case "cat":
        setCat((prev) => ({ ...prev, [event.target.name]: value }));

        break;
      case "sub":
        setSub((prev) => ({ ...prev, [event.target.name]: value }));
        break;
      case "type":
        setType((prev) => ({ ...prev, [event.target.name]: value }));
        
        break;
      default:
        console.warn(`Unhandled field: ${field}`);
    }

   
  };

  const handleSubmitField = async (event, field) => {
    setLoading(true);
    try {
      let response;
      switch (field) {
        case "cat":
          response = await newRequest.post(`category/add-cat`, cat);

          break;
        case "sub":
          response = await newRequest.post(`category/add-sub`, sub);

          break;
        case "type":
          response = await newRequest.post(`category/add-type`, type);

          break;
      }

      if (response.status === 200) {
        message.success("Product added successfully.");
      } else {
        message.error("Failed to add product.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      message.error("Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  // get Subs

  useEffect(() => {
    const getSubs = async () => {
      try {
        const res = await newRequest.get(`/category/sub/${type?.idCat}`);
        setSubs(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    getSubs();
  }, [type?.idCat]);

  const customButton = {
    bgcolor: theme == "light" ? main : colorAccentMedium,
    "&:hover": { backgroundColor: colorAccentDark },
    "&.Mui-disabled": {
      color: secondText,
      bgcolor:
        theme == "light" ? elementGrayBackground : colorElementBackgroundGray,
    },
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
  const uploadButton = (
    <button
      style={{
        width: "100%",
        background: theme == "light" ? "none" : colorAccentDarkTransparent,
      }}
      type="button"
    >
      {loading ? (
        <LoadingOutlined
          style={{
            fontSize: 50,
            color: theme == "light" ? main : colorAccentMain,
          }}
        />
      ) : (
        <CloudUploadTwoTone
          style={{
            color: theme == "light" ? main : colorAccentMain,
            fontSize: 50,
          }}
        />
      )}
      <div
        style={{
          marginTop: 8,
        }}
      >
        <Required style={{ color: theme == "light" ? "" : secondaryTextColor }}>
          <Span theme={theme}>Upload an Icon</Span> Or drag and drop. png,jpg
        </Required>
      </div>
    </button>
  );

  const form = [
    {
      title: "Category Icon",
      desc: (
        <>
          Upload Your Category Icon From Here <Span>40 x 40px</Span>
        </>
      ),
      body: (
        <Upload
          listType="picture-card"
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={(info) => handleChange(info, "cat")}
        >
          {cat?.image ? (
            <img
              src={cat.image}
              alt="avatar"
              style={{
                width: "100%",
              }}
            />
          ) : (
            uploadButton
          )}
        </Upload>
      ),
    },
    {
      title: "Category Information",
      desc: <>Add some basic information about your Category here</>,
      body: (
        <>
          <InputContainer theme={theme}>
            <Label>
              Name <Span style={{ color: "red" }}>*</Span>
            </Label>
            <InputText
              theme={theme}
              name="name"
              onChange={(e) => handleChangeField(e, "cat")}
            ></InputText>
          </InputContainer>
          <Button
            sx={customButton}
            variant="contained"
            startIcon={loading ? <LoadingOutlined /> : <SaveAltTwoToneIcon />}
            onClick={(e) => handleSubmitField(e, "cat")}
            disabled={loading}
          >
            Save
          </Button>
        </>
      ),
    },
    {
      title: "Category Icon",
      desc: (
        <>
          Upload Your Sub Categry Icon From Here <Span>40 x 40px</Span>
        </>
      ),
      body: (
        <Upload
          name="categoryimage"
          listType="picture-card"
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={(info) => handleChange(info, "sub")}
        >
          {sub?.image ? (
            <img
              src={sub?.image}
              alt="avatar"
              style={{
                width: "100%",
              }}
            />
          ) : (
            uploadButton
          )}
        </Upload>
      ),
    },
    {
      title: "Sub Category Information",
      desc: <>Add some basic information about your Sub Category here</>,
      body: (
        <>
          <InputContainer theme={theme}>
            <Label>
              Name <Span style={{ color: "red" }}>*</Span>
            </Label>
            <InputText
              theme={theme}
              name="subname"
              onChange={(e) => handleChangeField(e, "sub")}
            ></InputText>
          </InputContainer>

          <InputContainer theme={theme}>
            <Label>Category</Label>
            <FormControl sx={customTextField}>
              <InputLabel
                sx={{
                  color: theme == "light" ? primaryTextColor : whiteTextColor,
                }}
                id="demo-simple-select-helper-label"
              >
                Categories
              </InputLabel>
              <Select
                sx={{
                  color: theme == "light" ? primaryTextColor : whiteTextColor,
                }}
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                name="idCat"
                value={cat?.id}
                label="Categories"
                onChange={(e) => handleChangeField(e, "sub")}
              >
                {cats?.map((cat) => (
                  <MenuItem value={cat?.id}>{cat.name}</MenuItem>
                ))}
              </Select>
              <FormHelperText
                style={{
                  backgroundColor: "transparent",
                  color: secondaryTextColor,
                }}
              >
                Please Select The Main Category
              </FormHelperText>
            </FormControl>
          </InputContainer>
          <Button
            color="success"
            sx={customButton}
            variant="contained"
            startIcon={loading ? <LoadingOutlined /> : <SaveAltTwoToneIcon />}
            onClick={(e) => handleSubmitField(e, "sub")}
            disabled={loading}
          >
            Save
          </Button>
        </>
      ),
    },
    {
      title: "Type Icon",
      desc: (
        <>
          Upload Your Type Icon From Here <Span>40 x 40px</Span>
        </>
      ),
      body: (
        <Upload
          name="typeimage"
          listType="picture-card"
          showUploadList={true}
          beforeUpload={beforeUpload}
          onChange={(info) => handleChange(info, "type")}
        >
          {type?.image ? (
            <img
              src={type.image}
              alt="avatar"
              style={{
                width: "100%",
              }}
            />
          ) : (
            uploadButton
          )}
        </Upload>
      ),
    },
    {
      title: "Type Information",
      desc: <>Add some basic information about your Type here</>,
      body: (
        <>
          <InputContainer>
            <Label>
              Name <Span style={{ color: "red" }}>*</Span>
            </Label>
            <InputText
              theme={theme}
              name="typename"
              onChange={(e) => handleChangeField(e, "type")}
            ></InputText>
          </InputContainer>
          <InputContainer>
            <Label>Category</Label>
            <FormControl sx={customTextField}>
              <InputLabel
                sx={{
                  color: theme == "light" ? primaryTextColor : whiteTextColor,
                }}
                id="demo-simple-select-helper-label"
              >
                Categories
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                name="idCat"
                value={cat?.id}
                label="Categories"
                onChange={(e) => handleChangeField(e, "type")}
              >
                {cats?.map((cat) => (
                  <MenuItem value={cat?.id}>{cat.name}</MenuItem>
                ))}
              </Select>
              <FormHelperText
                style={{
                  backgroundColor: "transparent",
                  color: secondaryTextColor,
                }}
              >
                Please Select The Main Category
              </FormHelperText>
            </FormControl>
          </InputContainer>
          <InputContainer>
            <Label>Sub Category</Label>
            <FormControl sx={customTextField}>
              <InputLabel
                sx={{
                  color: theme == "light" ? primaryTextColor : whiteTextColor,
                }}
                id="demo-simple-select-helper-label"
              >
                Sub Categories
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={sub?.id}
                label="Sub Categories"
                name="idSub"
                onChange={(e) => handleChangeField(e, "type")}
              >
                {subs?.map((sub) => (
                  <MenuItem value={sub?.id}>{sub.name}</MenuItem>
                ))}
              </Select>
              <FormHelperText
                style={{
                  backgroundColor: "transparent",
                  color: secondaryTextColor,
                }}
              >
                Please Select Your Product Sub Category
              </FormHelperText>
            </FormControl>
          </InputContainer>
          <Button
            color="success"
            sx={customButton}
            variant="contained"
            startIcon={loading ? <LoadingOutlined /> : <SaveAltTwoToneIcon />}
            onClick={(e) => handleSubmitField(e, "type")}
            disabled={loading}
          >
            Save
          </Button>
        </>
      ),
    },
  ];

  return (
    <Container>
      <FormTitle theme={theme}>Add Product</FormTitle>
      {form.map((item) => (
        <FormContainer theme={theme} key={item.title}>
          <Left>
            <Title>{item.title}</Title>
            <Desc>{item.desc}</Desc>
          </Left>
          <Right theme={theme}>{item.body}</Right>
        </FormContainer>
      ))}
    </Container>
  );
};

export default AddCategory;
