import AddBusinessTwoToneIcon from '@mui/icons-material/AddBusinessTwoTone';
import styled from 'styled-components'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Checkbox, Divider, Flex, message, Upload } from 'antd';

import CloudUploadTwoToneIcon from '@mui/icons-material/CloudUploadTwoTone';
import CloudUploadTwoTone from '@mui/icons-material/CloudUploadTwoTone';
import { Fab, FormControl, FormControlLabel, FormHelperText, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Tooltip } from '@mui/material';
import  { useEffect, useRef, useState } from 'react';

import {  Input, Tag, theme} from 'antd';
import newRequest from '../utils/newRequest';
import { useSelector } from 'react-redux';


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

const Area = styled.textarea`
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
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
  console.log(reader.result);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const AddProduct = () => {

  const user = useSelector((state) => state.user?.currentUser);
  const [product, setProduct] = useState([]);
  const plainOptions = ['XS', 'S', 'M', 'L', 'XL'];
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [name, setName] = useState('');
  const { token } = theme.useToken();
  const [tags, setTags] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState('');
  const [checkedList, setCheckedList] = useState([]);
  const [logoImageUrl, setLogoImageUrl] = useState(null);
  const [shops, setShops] = useState('');
  const [selectedValues, setSelectedValues] = useState({
    productFor: '',
    productType: ''
  });

  const [cats, setCats] = useState(null);
  const [cat, setCat] = useState(null);
  const [catsID, setCatsID] = useState(null);
  const [subs, setSubs] = useState(null);
  const [sub, setSub] = useState(null);
  const [subsID, setSubsID] = useState(null);
  const [types, setTypes] = useState(null);
  const [type, setType] = useState(null);
  const [typesID, setTypesID] = useState(null);


  

  const categoryname = Object.values(selectedValues).join(',');
  const productsize = Object.values(checkedList).join(',');
  const productcolor = Object.values(tags).join(',');

 

  const CheckboxGroup = Checkbox.Group;
  const checkAll = plainOptions.length === checkedList.length;
  const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length;


  const handleChangeRadio = (event) => {
    const { name, value } = event.target;
    setSelectedValues((prevState) => ({
      ...prevState,
      [name]: value
    }));
    console.log(selectedValues);
  };

  const onChange = (list) => {
    setCheckedList(list);
  };

  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
  };

  const inputRef = useRef(null);
  const editInputRef = useRef(null);
  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);
  useEffect(() => {
    editInputRef.current?.focus();
  }, [editInputValue]);
  const handleClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    console.log(newTags);
    setTags(newTags);
  };
  const showInput = () => {
    setInputVisible(true);
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleInputConfirm = () => {
    if (inputValue && !tags.includes(inputValue)) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue('');
  };
  const handleEditInputChange = (e) => {
    setEditInputValue(e.target.value);
  };
  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    setEditInputIndex(-1);
    setEditInputValue('');
  };
  const tagPlusStyle = {
    height: 22,
    background: token.colorBgContainer,
    borderStyle: 'dashed'
  };
  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setLogoImageUrl(url);
       
      });
      console.log(logoImageUrl)
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        
        setLogoImageUrl(url);
        
      });
    }
  };

  const handlNameChange = (e) => {
    e.preventDefault();
    setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
   
    const productDetails = {
      ...product,
      productsize: productsize,
      categoryname: categoryname,
      productimage:logoImageUrl,
      productcolor:productcolor,
      shopname:shops,
      catID : cat ,
      subID : sub , 
      typeID : type
    };
    console.log(productDetails)
  };
  const handleSubmit = async () => {
    const categoryname = Object.values(selectedValues).join(',');
    const productsize = Object.values(checkedList).join(',');
    const productcolor = Object.values(tags).join(',');


    const productDetails = {
      ...product,
      productsize: productsize,
      productimage:logoImageUrl,
      productcolor:productcolor,
      shopname:shops,
      catID : cat ,
      subID : sub , 
      typeID : type
    };

    try {
      const response = await newRequest.post(`products/add-product/${productDetails.shopname}`, productDetails);
      console.log(response.status);

      if (response.status === 200) {
        message.success('Product added successfully.');
      } else {
        message.error('Failed to add product.');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      message.error('Failed to add product.');
    }
  };

  
  const [myShops , setMyShops] = useState([])

  useEffect(() => {
    const getShops = async () => {
      try {
        const res = await newRequest.get(`/shop/seller-shops/${user?.idUSER}`);
        setMyShops(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    getShops();
  }, []);

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

  

  const handleChangeShop = (event) => {
  setShops(event.target.value);
  console.log(shops)
  };

  const handleChangeField = (event, field) => {
    const value = event.target.value;
  
    switch (field) {
      case 'cat':
        setCat(value);
          
        break;
      case 'sub':
        setSub(value);
        break;
      case 'type':
        setType(value);
        break;
      default:
        console.warn(`Unhandled field: ${field}`);
    }
    

  
  
    console.log({ cat, sub, type });
  };
  


  

  



  // get Subs 

  useEffect(() => {
    const getSubs = async () => {
      try {
        const res = await newRequest.get(`/category/sub/${cat}`);
        setSubs(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    getSubs();
  }, [cat]);

  // get Types 

  useEffect(() => {
    const getTypes = async () => {
      try {
        const res = await newRequest.get(`/category/type/${sub}`);
        setTypes(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    getTypes();
  }, [sub]);

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none'
      }}
      type="button"
    >
      {loading ? <LoadingOutlined style={{ fontSize: 50, color: '#46A25D' }} /> : <CloudUploadTwoTone style={{ color: '#50BA6A', fontSize: 50 }} />}
      <div
        style={{
          marginTop: 8
        }}
      >
        <Required>
          <Span>Upload an image</Span> Or drag and drop. png,jpg
        </Required>
      </div>
    </button>
  );
 
  

  const form = [
    {
      title: 'Product Image',
      desc: (
        <>
          Upload your product image from here <Span>300 x 300px</Span>
        </>
      ),
      body: (
        <Upload
        name="productimage"
        listType="picture-card"
        showUploadList={true}
        beforeUpload={beforeUpload}
        onChange={(info) => handleChange(info, 'logo')}
        >
          {logoImageUrl ? (
            <img
              src={logoImageUrl}
              alt="avatar"
              style={{
                width: '100%'
              }}
            />
          ) : (
            uploadButton
          )}
        </Upload>
      )
    },
    {
      title: 'Product Information',
      desc: <>Add some basic information about your product here</>,
      body: (
        <>
          <InputContainer>
            <Label>
              Name <Span style={{ color: 'red' }}>*</Span>
            </Label>
            <InputText name="productname" onChange={handlNameChange}></InputText>
          </InputContainer>
          <InputContainer>
            <Label>Color</Label>
            <div style={{ display: 'flex', gap: '4px 0', flexWrap: 'wrap' }}>
              {tags.map((tag, index) => {
                if (editInputIndex === index) {
                  return (
                    <Input
                      ref={editInputRef}
                      key={tag}
                      size="small"
                      style={{ width: 64, height: 22, marginInlineEnd: 8, verticalAlign: 'top' }}
                      value={editInputValue}
                      onChange={handleEditInputChange}
                      onBlur={handleEditInputConfirm}
                      onPressEnter={handleEditInputConfirm}
                    />
                  );
                }
                const isLongTag = tag.length > 20;
                const tagElem = (
                  <Tag
                    color={tag}
                    key={tag}
                    closable={index !== 0}
                    style={{
                      userSelect: 'none'
                    }}
                    onClose={() => handleClose(tag)}
                  >
                    <span
                      onDoubleClick={(e) => {
                        if (index !== 0) {
                          setEditInputIndex(index);
                          setEditInputValue(tag);
                          e.preventDefault();
                        }
                      }}
                    >
                      {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                    </span>
                  </Tag>
                );
                return isLongTag ? (
                  <Tooltip title={tag} key={tag}>
                    {tagElem}
                  </Tooltip>
                ) : (
                  tagElem
                );
              })}
              {inputVisible ? (
                <Input
                  ref={inputRef}
                  type="text"
                  size="small"
                  style={{ width: 64, height: 22, marginInlineEnd: 8, verticalAlign: 'top' }}
                  value={inputValue}
                  onChange={handleInputChange}
                  onBlur={handleInputConfirm}
                  onPressEnter={handleInputConfirm}
                />
              ) : (
                <Tag style={tagPlusStyle} icon={<PlusOutlined />} onClick={showInput}>
                  New Color
                </Tag>
              )}
            </div>
          </InputContainer>
          <InputContainer>
            <Label>Size</Label>
            <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
              Check all
            </Checkbox>
            <Divider />
            <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
          </InputContainer>

          <InputContainer>
            <Label>Description</Label>
            <Area type="textarea" name='productdesc' onChange={handlNameChange} ></Area>
          </InputContainer>
          <InputContainer>
            <Label>
              Price <Span style={{ color: 'red' }}>*</Span>
            </Label>
            <InputText name='productprice' type="number" onChange={handlNameChange}></InputText>
          </InputContainer>
          <InputContainer>
           
           
          </InputContainer>
          <InputContainer>
            <Label>
              Discount <Span style={{ color: 'red' }}></Span>
            </Label>
            <InputText name='discount' type="number" onChange={handlNameChange}></InputText>
          </InputContainer>
          <InputContainer>
          <Label>Category</Label>
          <FormControl sx={{  width:'100%'}}>
        <InputLabel id="demo-simple-select-helper-label">Categories</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={cat}
          label="Categories"
          onChange={(e) => handleChangeField(e, 'cat')}
        >
          {cats?.map((cat) => (

            <MenuItem value={cat?.idCATEGORIES}>{cat.categoryname}</MenuItem>
          ) )}
          
        </Select>
        <FormHelperText>Please Select Your Product Category</FormHelperText>
      </FormControl>
          </InputContainer>
         {cat!= null ? 

           <InputContainer>
          <Label>Sub Category</Label>
          <FormControl sx={{  width:'100%'}}>
        <InputLabel id="demo-simple-select-helper-label">Sub Categories</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={sub}
          label="Sub Categories"
          onChange={(e) => handleChangeField(e, 'sub')}
          >
          {subs?.map((sub) => (
            
            <MenuItem value={sub?.id}>{sub.name}</MenuItem>
          ) )}
          
        </Select>
        <FormHelperText>Please Select Your Product Sub Category</FormHelperText>
      </FormControl>
          </InputContainer>
    : '' }
    {sub != null ?
      
      <InputContainer>
          <Label>Type</Label>
          <FormControl sx={{  width:'100%'}}>
        <InputLabel id="demo-simple-select-helper-label">Types</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={type}
          label="Types"
          onChange={(e) => handleChangeField(e, 'type')}
          >
          {types?.map((type) => (
            
            <MenuItem value={type?.id}>{type.name}</MenuItem>
          ) )}
          
        </Select>
        <FormHelperText>Please Select Your Product Type</FormHelperText>
      </FormControl>
          </InputContainer>
      :''}
          <InputContainer>
          <Label>Shops</Label>
          <FormControl sx={{  width:'100%'}}>
        <InputLabel id="demo-simple-select-helper-label">Shops</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={shops}
          label="Shops"
          onChange={handleChangeShop}
          >
          {myShops.map((shop) => (
            
            <MenuItem value={shop?.idSHOP}>{shop.shopname}</MenuItem>
          ) )}
          
        </Select>
        <FormHelperText>With label + helper text</FormHelperText>
      </FormControl>
          </InputContainer>
          <InputContainer>
            <Label>
              Quantity <Span style={{ color: 'red' }}>*</Span>
            </Label>
            <InputText name='qte' type="number" onChange={handlNameChange}></InputText>
          </InputContainer>
        </>
      )
    }
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

      <Tooltip title="Send Request">
        <Fab color="success" style={{ position: 'absolute', bottom: 96, right: 32 }} aria-label="add" onClick={handleSubmit}>
          <AddBusinessTwoToneIcon />
        </Fab>
      </Tooltip>
    </Container>
  );
};

export default AddProduct;
