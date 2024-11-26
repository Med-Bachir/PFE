import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { gradientBackground } from "../Colors";
import newRequest from "../utils/newRequest";
import { Avatar, Divider, FormControl, FormControlLabel, IconButton, InputLabel, MenuItem, Select, Switch, Tooltip } from "@mui/material";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import MoreHorizTwoToneIcon from "@mui/icons-material/MoreHorizTwoTone";
import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone';
import AlertMessage from "./Alert";
import Lottie from "lottie-react";
import me from "../Animation - 1716145973359.json"
import { useSelector } from "react-redux";
const Container = styled.div`
 
  padding: 32px;
  overflow-y: auto;
  height: calc(100vh - 80px);
 
`;

const FilterContainer = styled.div`
  background-color: white;
  border-radius: 4px;
  padding: 20px;
  width: 50%;
  margin-bottom: 20px;
  width: auto;
min-width: 200px;
contain: paint;
overflow-x: auto;
&::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(147, 147, 147, 1);
    border-radius: 20px;
  }
`;

const Title = styled.span`
  font-size: 20px;
  font-weight: 500;
`;

const FilterList = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  
`;

const ListContainer = styled.div`
  background-color: white;
  border-radius: 4px;
  contain: paint;
  padding-bottom: 32px;
  overflow: auto;
`;

const Tags = styled.div`
  display: flex;
  padding: 20px;
  background-color: ${gradientBackground};
  color: white;
  text-align: center;
  width: auto;
min-width: 600px;
`;

const Tag = styled.div`
  flex: ${(props) => (props.tag === "ID" ? 1 : 3)};
  border-left: ${(props) => (props.tag === "ID" ? "" : "1px solid")};
 
`;

const Order = styled.div`
  display: flex;
  padding: 20px;
  width:auto;
min-width: 600px;
`;

const OrderTag = styled.div`
  flex: ${(props) => (props.tag === "Product" ? 3 : 2)};
  border-left: ${(props) => (props.tag === "Product" ? "" : "1px solid")};
`;

const Informations = styled.div`
  flex: ${(props) => (props.type === "ID" ? 1 : 3)};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 200ms;
 
`;

const OrderDetails = styled.div`
  background-color: #f9f9f9;
  margin: 0 20px;
  border-radius: 4px;
  max-height: ${(props) =>
    props.show ? "1200px" : "0"}; /* Adjust max-height based on your content size */
  overflow: hidden;
  transition: max-height 200ms ease-in-out; /* Smooth transition */
  display: flex;
  flex-direction: column;
  width: auto;
min-width: 600px;

`;

const Details = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 4px;
  display: flex;
  align-items: center;
`;

const Detail = styled.div`
  flex: ${(props) => (props.type === "Product" ? 3 : 2)};
  font-size: 18px;
  align-items: center;
  justify-content: ${(props) => (props.type === "Product" ? "start" : "center")};
  display: flex;
  gap: 4px;
`;

const Circle = styled.div`
  
  
  background-color: ${(props) => props.color};
  height: 8px;
  width: 24px;
 border-radius: 8px;
 opacity: 0.6;
  
`;

const Status = styled.span`
  background-color: ${(props) => (props.status === 'Arrived' ? '#E0FAF6' : props.status === 'Waiting' ? '#FFE6CC' : '#FFFFCC')};
  color: ${(props) => (props.status === 'Arrived' ? '#4FA193' : props.status === 'Waiting' ? '#E67300' : '#CCCC00')};
  padding: 8px 20px;
  border-radius: 4px;
`;
const LottieContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;

`

const rowTag = [
  "ID",
  "Phone Number",
  "Place" ,
  "Status",
  "State",
  "City",
  "Type",
  "Date",
  "Action",
];

const rowTagProduct = ["Product", "Color", "Size","Status","Current Place" ,"Quantity", "Price" , "Actions"];

const Orders = () => {
  const user = useSelector((state) => state.user?.currentUser);

  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [open, setOpen] = useState(false);

  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [edited, setEdited] = useState(null);
  const [status, setStatus] = useState("");
  const [place, setPlace] = useState("");
  const [state, setState] = useState({
    Waiting: false,
    "On Way": false,
    Arrived: false,
  });

  const getOrders = async () => {
    try {
      let endpoint = `/orders/client/orders/${user?.idUSER}`;
      const activeStates = Object.keys(state).filter((key) => state[key]);
      if (activeStates.length > 0) {
        endpoint += `?progress=${activeStates.join(",")}`;
      }
      const res = await newRequest.get(endpoint);
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };
  
  useEffect(() => {
 
    getOrders();
  }, [state]);

  

  const handleToggleOrderDetails = (orderId) => {
    setSelectedOrderId(selectedOrderId === orderId ? null : orderId);
  };

  const handleChange = (event) => {
    setState((prev) => ({ ...prev, [event.target.name]: event.target.checked }));
  };

  const handleUpdate = async (index, type, id, userId , owner) => {
    if (type === "submit") {
      try {
        await newRequest.put(`/orders/seller/update-orderitem-stats/${id}`, {
          status,
          currentplace: place,
          userId,
          owner
        });
        setMessage("Order updated successfully");
        setType("success");
        setOpen(true);
        setTimeout(() => getOrders(), 2000);
      } catch (err) {
        setMessage("Error updating order. Please try again.");
        setType("error");
        setOpen(true);
      }
    }
    setEdited((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleDelete = async (id) => {
    try {
      await newRequest.delete(`/order/client/delete-order/${id}`);
      setMessage("Order deleted successfully");
      setType("success");
      setOpen(true);
      setTimeout(() => getOrders(), 2000);
    } catch (err) {
      setMessage("Error deleting order. Please try again.");
      setType("error");
      setOpen(true);
    }
  };

  return (
    <Container>
      <AlertMessage open={open} setOpen={setOpen} message={message} type={type} />
      <FilterContainer>
        <Title>Filter Orders</Title>
        <FilterList>
          {["Waiting", "On Way", "Arrived"].map((status) => (
            <FormControlLabel
              key={status}
              value={status}
              control={<Switch color="success" />}
              label={status}
              labelPlacement="start"
              name={status}
              onChange={handleChange}
            />
          ))}
        </FilterList>
      </FilterContainer>
      <ListContainer>
        <Tags>
          {rowTag.map((tag, index) => (
            <Tag key={index} tag={tag}>
              {tag}
            </Tag>
          ))}
        </Tags>
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={index}>
              <Order>
                <Informations type="ID">#{order?.orderId}</Informations>
                <Informations>0{order?.phone}</Informations>
                <Informations>
                {edited === index ? (
                    <FormControl sx={{ minWidth: 80, width: "80%" }} size="small">
                      <InputLabel>Places</InputLabel>
                      <Select
                        value={place}
                        onChange={(e) => setPlace(e.target.value)}
                      >
                        <MenuItem value="Mall Storage">Mall Storage</MenuItem>
                        <MenuItem value="Out For Delivery">Out For Delivery</MenuItem>
                        <MenuItem value={order?.state}>{order?.state}</MenuItem>
                        <MenuItem value={order?.city}>{order?.city}</MenuItem>
                      </Select>
                    </FormControl>
                  ) :(
                    <>
                    {order?.currentPlace}
                    </>
                  )
                  }
                </Informations>
                <Informations>
                {edited === index ? (
                      <FormControl sx={{ minWidth: 80, width: "80%" }} size="small">
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <MenuItem value="Waiting">Waiting</MenuItem>
                        <MenuItem value="On Way">On Way</MenuItem>
                        <MenuItem value="Arrived">Arrived</MenuItem>
                      </Select>
                    </FormControl>
                  ) :(
                  
                    <Status status={order?.status}>{order?.status}</Status>
          )}
                </Informations>
                <Informations>{order?.state}</Informations>
                <Informations>{order?.city}</Informations>
                <Informations>{order?.type}</Informations>
                <Informations>{order?.dateOrder}</Informations>
                <Informations type="Action">
                  
                {edited === index ? (
                    <Tooltip title="Save">
                      <IconButton
                        onClick={() => handleUpdate(index, "submit", order?.orderId, order?.clientId , user?.idUSER)}
                      >
                        <SaveTwoToneIcon color="primary" />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Edit">
                      <IconButton
                        onClick={() => setEdited(index)}
                      >
                        <EditTwoToneIcon color="primary" />
                      </IconButton>
                    </Tooltip>
                  )}
                  <IconButton
                    onClick={() => handleToggleOrderDetails(order?.orderId)}
                    sx={{ rotate: selectedOrderId === order?.orderId ? "90deg" : "0deg", transition: "200ms" }}
                  >
                    <MoreHorizTwoToneIcon color="secondary" />
                  </IconButton>
                  
                </Informations>
              </Order>
              <OrderDetails show={selectedOrderId === order?.orderId}>
                <Tags>
                  {rowTagProduct.map((tag, index) => (
                    <OrderTag key={index} tag={tag}>
                      {tag}
                    </OrderTag>
                  ))}
                </Tags>
                {order?.products.map((product, index) => (
                  <Details key={index}>
                    <Detail type="Product">
                      <Avatar
                        src={product.image}
                        sx={{ borderRadius: 2, width: 50, height: 50, mr: 4 }}
                      />
                      {product.name}
                    </Detail>
                    <Detail>
                      {product.attributes?.color ? product.attributes?.color &&
                        product.attributes.color.split(",").map((c, i) => (
                          <Circle key={i} color={c} />
                        ))
                      
                      :
                       "/"} 
                    </Detail>
                    <Detail>{product.attributes?.size || "N/A"}</Detail>
                    <Detail>

                     
                    <Status status={product?.status}>{product?.status}</Status>
                  
                  </Detail>
                  <Detail>
                   
                    {product?.place}
                  
                  </Detail>
                    <Detail>{product.quantity}</Detail>
                    <Detail>${product.price.toFixed(2)}</Detail>
                    <Detail type="Action">
                  
                  <IconButton onClick={() => handleDelete(order?.orderId)}>
                    <DeleteTwoToneIcon color="error" />
                  </IconButton>
                  
                </Detail>
                  </Details>
                ))}
              </OrderDetails>
            </div>
          ))
        ) : (
          <LottieContainer>
            <Lottie animationData={me} style={{ width: "40%" }} />
            No Orders Found
          </LottieContainer>
        )}
      </ListContainer>
    </Container>
  );
};

export default Orders;
