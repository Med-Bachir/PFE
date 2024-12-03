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

import { Input, Tag, theme } from "antd";
import newRequest from "../../../utils/newRequest";
import { useSelector } from "react-redux";

const Container = styled.div`
  height: calc(100vh - 80px);
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px dashed #bebebe;
  padding: 32px 0;
  gap: 32px;
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
  background-color: white;
  padding: 32px;
  border-radius: 4px;
`;

const Required = styled.span`
  font-size: 14px;
  font-weight: 400;
`;

const Span = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #46a25d;
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
  border: 1px solid #d4d4d4;

  &:focus {
    border: 1px solid #46a25d;
  }
`;



const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
  console.log(reader.result);
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
 

  const [loading, setLoading] = useState(false);

  const [logoImageUrl, setLogoImageUrl] = useState(null);

  

  const [cats, setCats] = useState(null);
  const [cat, setCat] = useState(null);
  const [catId, setCatId] = useState(null);

  const [subs, setSubs] = useState(null);
  const [sub, setSub] = useState({idCat : null , subname:'' , image:''});

  const [type, setType] = useState({idCat : null , typename:'' , image:'' , idSub : null});

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setLogoImageUrl(url);
      });
      console.log(logoImageUrl);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);

        setLogoImageUrl(url);
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
        setCat((prev) =>  ({...prev , [event.target.name]: value, image: logoImageUrl }));

        break;
      case "sub":
        setSub((prev) => ({...prev, [event.target.name]: value, image: logoImageUrl  }));
        break;
      case "type":
        setType((prev) => ({...prev, [event.target.name]: value , image: logoImageUrl }));
        console.log(cat)
        break;
      default:
        console.warn(`Unhandled field: ${field}`);
    }

    console.log({ cat, sub, type });
  };

  const handleSubmitField = async (event, field) => {
    
console.log(type)
    try {
        let response ;
      switch (field) {
        case "cat":
            response = await newRequest.post(
            `category/add-cat`,
            cat
          );

          break;
        case "sub":
            response = await newRequest.post(
                `category/add-sub`,
                sub
              );
          break;
        case "type":
            response = await newRequest.post(
                `category/add-type`,
                type
              );
          break;
      }
      console.log(response.status);

      if (response.status === 200) {
        message.success("Product added successfully.");
      } else {
        message.error("Failed to add product.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      message.error("Failed to add product.");
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


  // get Types

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      {loading ? (
        <LoadingOutlined style={{ fontSize: 50, color: "#46A25D" }} />
      ) : (
        <CloudUploadTwoTone style={{ color: "#50BA6A", fontSize: 50 }} />
      )}
      <div
        style={{
          marginTop: 8,
        }}
      >
        <Required>
          <Span>Upload an Icon</Span> Or drag and drop. png,jpg
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
          name="categoryimage"
          listType="picture-card"
          showUploadList={true}
          beforeUpload={beforeUpload}
          onChange={(info) => handleChange(info, "logo")}
        >
          {logoImageUrl ? (
            <img
              src={logoImageUrl}
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
          <InputContainer>
            <Label>
              Name <Span style={{ color: "red" }}>*</Span>
            </Label>
            <InputText
              name="categoryname"
              onChange={(e) => handleChangeField(e, "cat")}
            ></InputText>
          </InputContainer>
          <Button
            color="success"
            variant="contained"
            startIcon={<SaveAltTwoToneIcon />}
            onClick={(e) => handleSubmitField(e , 'cat')}
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
          showUploadList={true}
          beforeUpload={beforeUpload}
          onChange={(info) => handleChange(info, "logo")}
        >
          {logoImageUrl ? (
            <img
              src={logoImageUrl}
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
          <InputContainer>
            <Label>
              Name <Span style={{ color: "red" }}>*</Span>
            </Label>
            <InputText
              name="subname"
              onChange={(e) => handleChangeField(e, "sub")}
            ></InputText>
          </InputContainer>

          <InputContainer>
            <Label>Category</Label>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="demo-simple-select-helper-label">
                Categories
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                name="idCat"
                value={cat?.id}
                label="Categories"
                onChange={(e) => handleChangeField(e, "sub")}
              >
                {cats?.map((cat) => (
                  <MenuItem value={cat?.idCATEGORIES}>
                    {cat.categoryname}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Please Select The Main Category</FormHelperText>
            </FormControl>
          </InputContainer>
          <Button
            color="success"
            variant="contained"
            startIcon={<SaveAltTwoToneIcon />}
            onClick={(e) => handleSubmitField(e , 'sub')}
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
          onChange={(info) => handleChange(info, "logo")}
        >
          {logoImageUrl ? (
            <img
              src={logoImageUrl}
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
              name="typename"
              onChange={(e) => handleChangeField(e, "type")}
            ></InputText>
          </InputContainer>
          <InputContainer>
            <Label>Category</Label>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="demo-simple-select-helper-label">
                Categories
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                name='idCat'
                value={cat?.id}
                label="Categories"
                onChange={(e) => handleChangeField(e, "type")}
              >
                {cats?.map((cat) => (
                  <MenuItem value={cat?.idCATEGORIES}>
                    {cat.categoryname}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Please Select The Main Category</FormHelperText>
            </FormControl>
          </InputContainer>
          <InputContainer>
            <Label>Sub Category</Label>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="demo-simple-select-helper-label">
                Sub Categories
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={sub?.id}
                label="Sub Categories"
                name='idSub'
                onChange={(e) => handleChangeField(e, "type")}
              >
                {subs?.map((sub) => (
                  <MenuItem value={sub?.id}>{sub.name}</MenuItem>
                ))}
              </Select>
              <FormHelperText>
                Please Select Your Product Sub Category
              </FormHelperText>
            </FormControl>
          </InputContainer>
          <Button
            color="success"
            variant="contained"
            startIcon={<SaveAltTwoToneIcon />}
            onClick={(e) => handleSubmitField(e , 'type')}
          >
            Save
          </Button>
        </>
      ),
    },
  ];

  return (
    <Container>
      <FormTitle>Add Product</FormTitle>
      {form.map((item) => (
        <FormContainer key={item.title}>
          <Left>
            <Title>{item.title}</Title>
            <Desc>{item.desc}</Desc>
          </Left>
          <Right>{item.body}</Right>
        </FormContainer>
      ))}
    </Container>
  );
};

export default AddCategory;
