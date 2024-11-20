import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { gradientBackground, hovredText, whiteTextColor } from "../Colors";
import {
  Avatar,
  Divider,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import { useDispatch, useSelector } from "react-redux";
import newRequest from "../utils/newRequest";
import AlertMessage from "../Components/Alert";
import EmptyData from "../Components/EmptyData";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  height: auto;
  display: flex;
  height: calc(100vh - 80px);
  overflow-y: auto;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Left = styled.div`
  flex: 3;
  background-color: white;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

const LeftTitle = styled.span`
  font-size: 24px;
  font-weight: 500;
  padding: 0 32px;
  margin: 20px 0;
  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 32px;
  gap: 20px;
  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

const Label = styled.label`
  font-size: 18px;
  font-weight: 500;
`;

const Required = styled.span`
  color: red;
`;

const ItemContainerTitles = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 0 20px 32px;
  background-color: ${gradientBackground};
  @media (max-width: 768px) {
    padding: 10px 0 10px 16px;
  }
  min-width: 600px;
`;
const Products = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    overflow: auto;
  }
  max-height: 500px;
`;

const Title = styled.div`
  color: ${whiteTextColor};
  margin: ${(props) => (props.type === "Action" ? "0 8px" : "")};
  flex: ${(props) =>
    props.type === "product" ? 2 : props.type === "Action" ? "" : 1};
  font-size: 18px;
  border-right: ${(props) => (props.type === "Action" ? "" : "1px solid #eee")};
  text-align: center;
`;

const Type = styled.span`
  font-size: 12px;
  color: ${hovredText};
`;

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 0 0 32px;
  @media (max-width: 768px) {
    padding: 8px 0 0 16px;
  }
  min-width: 600px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  flex: 2;
`;

const Detail = styled.div`
  flex: 1;
  font-size: 18px;
  border-right: 1px solid #eee;
  text-align: ${(props) => (props.type === "name" ? "" : "center")};
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 32px 32px;

  background-color: #f9f9f9;
  top: 0;
  position: sticky;
  overflow: hidden;
  height: calc(100vh - 80px);

  @media (max-width: 768px) {
    height: 600px;
    padding: 16px;
  }
`;
const Order = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  width: calc(100%);
  @media (max-width: 768px) {
    position: relative;
    width: calc(100%);
  }
`;
const OrderDetail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Info = styled.div``;

const Button = styled.button`
  background-color: ${gradientBackground};
  color: ${whiteTextColor};
`;
//const Container = styled.div``
//const Container = styled.div``
//const Container = styled.div``

const CheckOut = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [cart, setCart] = useState();
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState({
    state: "",
    city: "",
    phonenumber: "",
    type: "",
  });
  const navigate = useNavigate();
  const [typeOrder, setTypeOrder] = useState("");

  // Handle Functions
  const handleDelete = async ({ index }) => {
    setMessage("Pale Deleted Successfully From Cart");
    setType("success");
    setOpen(true);
  };

  const handleType = (e) => {
    e.preventDefault();
    setTypeOrder(e.target.value);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setOrder((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(order);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(order);

    const setMessageWithTimeout = (
      message,
      type,
      setMessage,
      setType,
      setOpen
    ) => {
      setMessage(message);
      setType(type);
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 2000);
    };

    if (order.state === "") {
      setMessageWithTimeout(
        "Please Add Your State !!",
        "error",
        setMessage,
        setType,
        setOpen
      );
      return;
    }
    if (order.city === "") {
      setMessageWithTimeout(
        "Please Add Your City !!",
        "error",
        setMessage,
        setType,
        setOpen
      );
      return;
    }
    if (order.phonenumber === "") {
      setMessageWithTimeout(
        "Please Add Your Phone Number !!",
        "error",
        setMessage,
        setType,
        setOpen
      );
      return;
    }
    if (order.type === "") {
      setMessageWithTimeout(
        "Please Add Shipping Type !!",
        "error",
        setMessage,
        setType,
        setOpen
      );
      return;
    }

    newRequest
      .post(`/orders/checkout/${user?.idUSER}`, {
        cartItems: cart.products,
        orderDetails: order,
      })
      .then((res) => {
        if (res.status === 200) {
          setMessage("Your order has sent successfully! Please Wait Our Call");
          setType("success");
          setOpen(true);
          setTimeout(() => {
            navigate(`/`);
          }, 2000);
        }
      })
      .catch((err) => {
        if (err.response.status === 409) {
          setMessage("Something wrong please contact us and try again later");
          setType("error");
          setOpen(true);
        }
      });
  };
  const getCart = async () => {
    try {
      const res = await newRequest.get(`/cards/cart/${user?.idUSER}`);

      setCart(res.data);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };
  useEffect(() => {
    getCart();
    
  }, []);

  return (
    <Container>
      <AlertMessage
        open={open}
        setOpen={setOpen}
        message={message}
        type={type}
      />

      <Left>
        <LeftTitle>Pales To Order</LeftTitle>
        <InputContainer>
          <Label>
            State <Required>*</Required>
          </Label>
          <TextField
            sx={{ minWidth: "40%" }}
            size="large"
            id="outlined-basic"
            label="State"
            name="state"
            variant="outlined"
            onChange={handleChange}
          />
          <Label>
            City <Required>*</Required>
          </Label>
          <TextField
            sx={{ minWidth: "40%" }}
            size="large"
            id="outlined-basic"
            label="City"
            name="city"
            variant="outlined"
            onChange={handleChange}
          />
          <Label>
            Postal Code <Required>*</Required>
          </Label>
          <TextField
            sx={{ minWidth: "40%" }}
            size="large"
            id="outlined-basic"
            label="Postal Code"
            name="postalcode"
            variant="outlined"
            onChange={handleChange}
            type="number"
          />
          <Label>
            Phone Number <Required>*</Required>
          </Label>
          <TextField
            sx={{ minWidth: "40%" }}
            size="large"
            id="outlined-basic"
            label="Phone Number"
            name="phonenumber"
            variant="outlined"
            onChange={handleChange}
            type="number"
          />
          <Label>
            Shipping Type<Required>*</Required>
          </Label>
          <FormControl sx={{ minWidth: "40%" }}>
            <InputLabel id="demo-simple-select-helper-label">
              Shipping Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              name="type"
              value={typeOrder}
              label="Shipping Type"
              onChange={(e) => [handleChange(e), handleType(e)]}
            >
              <MenuItem value={"To Home"}>Deliver To Home</MenuItem>
              <MenuItem value={"To Postal"}>Deliver To The Postal</MenuItem>
            </Select>
            <FormHelperText>
              Please ensure that if you choose deliver to home you will pay more
            </FormHelperText>
          </FormControl>
        </InputContainer>

        <LeftTitle>Products </LeftTitle>
        <Products>
          <ItemContainerTitles>
            <Title type="product">Pale</Title>
            <Title>Color</Title>
            <Title>Size</Title>
            <Title>
              Price <Type>(DA)</Type>
            </Title>
            <Title>Quantity</Title>
            <Title type="Action">Action</Title>
          </ItemContainerTitles>
          {cart?.products == [] ? (
            <EmptyData text="No Pales To the Cart" />
          ) : (
            cart?.products.map((item, index) => (
              <ItemContainer key={index}>
                <Item>
                  <Avatar
                    sx={{
                      borderRadius: 2,
                      mr: 3,
                      border: "1px solid #eee",
                      padding: "6px",
                    }}
                    src={item.image}
                  />
                  <Detail type="name">{item.name}</Detail>
                </Item>
                <Detail>{item.color}</Detail>
                <Detail>{item.size}</Detail>
                <Detail> $ {item.price} </Detail>
                <Detail>{item.quantity}</Detail>
                <IconButton
                  color="error"
                  sx={{ outline: "none", m: 2 }}
                  onClick={() => handleDelete({ index })}
                >
                  <DeleteOutlineTwoToneIcon />
                </IconButton>
              </ItemContainer>
            ))
          )}
        </Products>
      </Left>
      <Right>
        <Order>
          <OrderDetail>
            <Label>Estimated Time</Label> <Info>1-2 Days</Info>
          </OrderDetail>
          <OrderDetail>
            <Label>Payment Type</Label> <Info>Pay On Deliver</Info>
          </OrderDetail>
          <OrderDetail>
            <Label>Shipping Price</Label> <Info>Free</Info>
          </OrderDetail>
          <OrderDetail>
            <Label>Price</Label> <Info>$ {cart?.totalPrice}</Info>
          </OrderDetail>
          <Divider />
          <OrderDetail>
            <Label>Total</Label> <Info>$ {cart?.totalPrice}</Info>
          </OrderDetail>
          <Button onClick={handleSubmit}>Order Now</Button>
        </Order>
      </Right>
    </Container>
  );
};

export default CheckOut;
