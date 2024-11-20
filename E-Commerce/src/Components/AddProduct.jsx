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
  const [catname, setCatName] = useState(null);
  const [subname, setSubName] = useState(null);

  const [typename, setTypesName] = useState(null);
  const [att , setAtt] = useState({})


  

  


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

  

  const handlNameChange = (e ) => {
    e.preventDefault();
    setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
 setAtt({ size : Object.values(checkedList).join(',') , color :Object.values(tags).join(',')})
    console.log(att)
    const productDetails = {
      ...product,
      productimage:logoImageUrl,
      shopname:shops,
      catID : cat ,
      subID : sub , 
      typeID : type , 
      attribute : att
    };
    console.log(productDetails)
  };
  const handleSubmit = async () => {
    
    setAtt({ size : Object.values(checkedList).join(',') , color :Object.values(tags).join(',')})

    const productDetails = {
      ...product,
      productimage:logoImageUrl,
      shopname:shops,
      catID : cat ,
      subID : sub , 
      typeID : type , 
      attribute : att
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

  
  const handleChangeField = (event, field, name) => {
    const value = event.target.value;
  
    switch (field) {
      case 'cat':
        setCat(value); // Only update the ID here
        setCatName(cats.find(cat => cat.idCATEGORIES === value).categoryname)
    console.log(catname)
        break;
      case 'sub':
        setSub(value);
        setSubName(subs.find(sub => sub.id === value).name)
    console.log(subname)
        break;
      case 'type':
        setType(value);
        setTypesName(name);
        break;
      default:
        console.warn(`Unhandled field: ${field}`);
    }
  
    // You can now directly access the category name from the 'cats' array
    
    
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
            <InputText name="productname" onChange={(e) => handlNameChange(e) }></InputText>
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
          onChange={(e) => handleChangeField(e, 'cat' , cats.find((cat) => cat.idCATEGORIES === e.target.value)?.categoryname)}
        >
          {cats?.map((cat) => (

          
            <MenuItem name={cat?.categoryname} value={cat?.idCATEGORIES}>{cat.categoryname}</MenuItem>
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
     {catname !== 'Cloths' ? (
  catname === 'Electronics' ? (
    <>
      <InputContainer>
      {subname == 'Mobiles' || subname == 'Tablets' ? 
      <InputContainer>
      <Label>
      Camera<Span style={{ color: 'red' }}>*</Span>
    </Label>
    <InputText
      name="camera"
      type="number"
      onChange={handlNameChange}
      placeholder="48 , 108"
    />
  </InputContainer>
      : null}
        <Label>
          RAM <Span style={{ color: 'red' }}>*</Span>
        </Label>
        <InputText
          name="RAM"
          type="number"
          onChange={handlNameChange}
          placeholder="RAM (GB)"
        />
      </InputContainer>
      <InputContainer>
        <Label>
          CPU <Span style={{ color: 'red' }}>*</Span>
        </Label>
        <InputText
          name="CPU"
          type="text"
          onChange={handlNameChange}
          placeholder="ex: Intel Core i7"
        />
      </InputContainer>
      <InputContainer>
        <Label>
          GPU <Span style={{ color: 'red' }}>*</Span>
        </Label>
        <InputText
          name="GPU"
          type="text"
          onChange={handlNameChange}
          placeholder="ex: RTX 4090 Ti "
        />
      </InputContainer>
      <InputContainer>
        <Label>
          Battery Capacity <Span style={{ color: 'red' }}>*</Span>
        </Label>
        <InputText
          name="Battery"
          type="number"
          onChange={handlNameChange}
          placeholder="in MW"
        />
      </InputContainer>
      <InputContainer>
        <Label>
          Storage <Span style={{ color: 'red' }}>*</Span>
        </Label>
        <InputText
          name="Storage"
          type="number"
          onChange={handlNameChange}
          placeholder="in GB"
        />
      </InputContainer>
      <InputContainer>
        <Label>
          Screen Size <Span style={{ color: 'red' }}>*</Span>
        </Label>
        <InputText
          name="screen"
          type="number"
          onChange={handlNameChange}
          placeholder="15, 14"
        />
      </InputContainer>
    </>
  ) : null
) : (
  <>
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
                style={{
                  width: 64,
                  height: 22,
                  marginInlineEnd: 8,
                  verticalAlign: 'top',
                }}
                value={editInputValue}
                onChange={(e) => {
                  handleEditInputChange(e);
                  handleInputChange(e);
                  handlNameChange(e);
                }}
                onBlur={handleEditInputConfirm}
                onPressEnter={(e) => handleEditInputConfirm(e)}
              />
            );
          }
          const isLongTag = tag.length > 20;
          const tagElem = (
            <Tag
              color={tag}
              key={tag}
              closable={index !== 0}
              style={{ userSelect: 'none' }}
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
            name="color"
            style={{
              width: 64,
              height: 22,
              marginInlineEnd: 8,
              verticalAlign: 'top',
            }}
            value={inputValue}
            onChange={(e) => {
              handleInputChange(e);
              handlNameChange(e);
            }}
            onBlur={handleInputConfirm}
            onPressEnter={(e) => {
              handleInputConfirm(e);
              handlNameChange(e);
            }}
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
      <Checkbox
        name="size"
        indeterminate={indeterminate}
        onClick={(e) => {
          onCheckAllChange(e);
          handlNameChange(e);
        }}
        checked={checkAll}
      >
        Check all
      </Checkbox>
      <Divider />
      <CheckboxGroup
        name="size"
        options={plainOptions}
        value={checkedList}
        onClick={(e) => {
          handlNameChange(e);
        }}
        onChange={onChange}
      />
    </InputContainer>
    <InputContainer>
      <Label>Description</Label>
      <Area type="textarea" name="productdesc" onChange={handlNameChange} />
    </InputContainer>
  </>
)}

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
