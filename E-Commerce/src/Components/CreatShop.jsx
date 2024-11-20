import Fab from '@mui/material/Fab';
import AddBusinessTwoToneIcon from '@mui/icons-material/AddBusinessTwoTone';
import styled from 'styled-components'
import { LoadingOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { useState } from 'react';
import CloudUploadTwoTone from '@mui/icons-material/CloudUploadTwoTone';
import { Tooltip } from '@mui/material';
import { useSelector } from 'react-redux';
import newRequest from '../utils/newRequest';

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
  color: #46A25D;
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
  border: 1px solid #d4d4d4;
  &:focus {
    border: 1px solid #46A25D;
  }
`;

const Area = styled.textarea`
  padding: 14px 16px;
  outline: none;
  border-radius: 4px;
  border: 1px solid #d4d4d4;
  &:focus {
    border: 1px solid #46A25D;
  }
`;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
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

const CreateShop = () => {
  const user = useSelector((state) => state.user?.currentUser);
  const [shop, setShop] = useState({});
  const [logoImageUrl, setLogoImageUrl] = useState(null);
const [coverImageUrl, setCoverImageUrl] = useState(null);
const [loading, setLoading] = useState(false);
 
  const [name, setName] = useState('');

  const handleChangeInfo = (e) => {
    e.preventDefault();
    setShop((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  console.log(shop)

  const handleChange = (info, type) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        if (type === 'logo') {
          setLogoImageUrl(url);
        } else if (type === 'cover') {
          setCoverImageUrl(url);
        }
      });
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        if (type === 'logo') {
          setLogoImageUrl(url);
        } else if (type === 'cover') {
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
    try {
      const response = await newRequest.post(`shop/create-shop/${user?.idUSER}`, {
        shopname: shop.shopname,
        shopimage: logoImageUrl,
        shopdesc: shop.shopdesc,
        shopcover: coverImageUrl,
        number: shop.number,
        country: shop.country,
        state: shop.state,
        city: shop.city,
        street: shop.street,
      });
console.log(response.status)
      if (response.status === 200) {
        message.success('Shop creation request submitted successfully. Please wait for admin approval.');
      } else {
        message.error('Failed to submit shop creation request.');
      }
    } catch (error) {
      console.error('Error creating shop:', error);
      message.error('Failed to submit shop creation request.');
    }
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type="button"
    >
      {loading ? <LoadingOutlined style={{ fontSize: 50, color: '#46A25D' }} /> : <CloudUploadTwoTone style={{ color: '#50BA6A', fontSize: 50 }} />}
      <div style={{ marginTop: 8 }}>
        <Required><Span>Upload an image</Span> Or drag and drop. png, jpg</Required>
      </div>
    </button>
  );

  const form = [
    {
      title: 'Logo',
      desc: <>Upload your shop logo from here <Span>300 x 300px</Span></>,
      body: (
        <Upload
          name="shopimage"
          listType="picture-card"
          showUploadList={true}
          beforeUpload={beforeUpload}
          onChange={(info) => handleChange(info, 'logo')}
        >
          {logoImageUrl ? (
            <img
              src={logoImageUrl}
              alt="avatar"
              style={{ width: '30%' }}
            />
          ) : (
            uploadButton
          )}
        </Upload>
      ),
    },
    {
      title: 'Cover Image',
      desc: <>Upload your shop cover image from here. Dimension of the cover image should be <Span>1170 x 435px</Span></>,
      body: (
        <Upload
          name="shopcover"
          listType="picture-card"
          showUploadList={true}
          beforeUpload={beforeUpload}
          onChange={(info) => handleChange(info, 'cover')}
        >
          {coverImageUrl ? (
            <img
              src={coverImageUrl}
              alt="cover"
              style={{ width: '100%' }}
            />
          ) : (
            uploadButton
          )}
        </Upload>
      ),
    },
    
    {
      title: 'Basic Information',
      desc: <>Add some basic information about your shop here</>,
      body: (
        <>
          <InputContainer>
            <Label>Name <Span style={{ color: 'red' }}>*</Span></Label>
            <Input name='shopname' onChange={handleNameChange} value={name} />
          </InputContainer>
          <InputContainer>
            <Label>Slug</Label>
            <Input disabled={true} style={{ cursor: 'no-drop' }} value={name} />
          </InputContainer>
          <InputContainer>
            <Label>Description</Label>
            <Area name='shopdesc' onChange={handleChangeInfo}></Area>
          </InputContainer>
        </>
      ),
    },
    {
      title: 'Owner Information',
      desc: <>Add Your Personal Information Here</>,
      body: (
        <>
          <InputContainer>
            <Label>Name <Span style={{ color: 'red' }}>*</Span></Label>
            <Input value={user?.username} disabled />
          </InputContainer>
          <InputContainer>
            <Label>Email <Span style={{ color: 'red' }}>*</Span></Label>
            <Input value={user?.email} disabled />
          </InputContainer>
          <InputContainer>
            <Label>Phone Number <Span style={{ color: 'red' }}>*</Span></Label>
            <Input name='number' onChange={handleChangeInfo} />
          </InputContainer>
        </>
      ),
    },
    {
      title: 'Shop Address',
      desc: <>Add your physical shop address from here</>,
      body: (
        <>
          <InputContainer>
            <Label>Country <Span style={{ color: 'red' }}>*</Span></Label>
            <Input name='country' onChange={handleChangeInfo} />
          </InputContainer>
          <InputContainer>
            <Label>State <Span style={{ color: 'red' }}>*</Span></Label>
            <Input name='state' onChange={handleChangeInfo} />
          </InputContainer>
          <InputContainer>
            <Label>City <Span style={{ color: 'red' }}>*</Span></Label>
            <Input name='city' onChange={handleChangeInfo} />
          </InputContainer>
          <InputContainer>
            <Label>Street <Span style={{ color: 'red' }}>*</Span></Label>
            <Input name='street' onChange={handleChangeInfo} />
          </InputContainer>
        </>
      ),
    },
  ];

  return (
    <Container>
      <FormTitle>Create Shop</FormTitle>
      {form.map((item, index) => (
        <FormContainer key={index}>
          <Left>
            <Title>{item.title}</Title>
            <Desc>{item.desc}</Desc>
          </Left>
          <Right>
            {item.body}
          </Right>
        </FormContainer>
      ))}
      <Tooltip title="Send Request">
        <Fab color="success" style={{ position: 'absolute', bottom: 96, right: 32 }} aria-label="add" onClick={handleCreate}>
          <AddBusinessTwoToneIcon />
        </Fab>
      </Tooltip>
    </Container>
  );
}

export default CreateShop;
