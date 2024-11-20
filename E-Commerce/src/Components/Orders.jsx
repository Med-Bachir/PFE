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

const rowTagProduct = ["Product", "Color", "Size", "Quantity", "Price"];

const Orders = () => {
  const user = useSelector((state) => state.user?.currentUser);

  const [message, setMessage] = useState('');
  const [type, setType] = useState('');
  const [open, setOpen] = useState(false);

  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [edited, setEdited] = useState(null);
  const [status, setStatus] = React.useState('');
  const [place, setPlace] = React.useState('');
  const [state, setState] = useState({
    Waiting: false,
    'On Way': false,
    Arrived: false,
  });

  useEffect(() => {
    const getOrders = async () => {
      try {
        let endpoint = `/orders/client/orders/${user?.idUSER}`;
        const activeStates = Object.keys(state).filter(status => state[status]);
        if (activeStates.length > 0) {
          endpoint += `?progress=${activeStates.join(",")}`;
        }

        const res = await newRequest.get(endpoint);
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };
    getOrders();
  }, [state]);

  const parseProducts = (productsJson) => {
    const productsArray = JSON.parse(productsJson);
    return productsArray;
  };

  const handleToggleOrderDetails = (orderId) => {
    setSelectedOrderId(selectedOrderId === orderId ? null : orderId);
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    setPlace({ ...state, [event.target.name]: event.target.checked });
  };


  const handleUpdate = (index , type , id , user) => {
     if (type == 'submit'){
      try {
        newRequest.put(`/orders/client/update-order-stats/${id}` , {status : status.status, currentplace : place.place , userId : user}).then((res) => {
          setMessage("Order Updates Successfuly ");
          setType("success");
          setOpen(true);
          setTimeout(() => {
            window.location.reload();

          }, [2000])

        }).catch((err) => {
          if (err?.response?.status === 409) {
            
            setMessage("Somting is wrong ,contact us about the problem");
            setType("error");
            setOpen(true);
          }
         
          
  
        })
  
      } catch (err) {
        console.log(err)
      }
    }
    setEdited((prevIndex) => (prevIndex === index ? null : index));  
  };


  const handleDelete = (id) => {
   
     try {
       newRequest.delete(`/order/client/delete-order/${id}`).then((res) => {
         setMessage("Order Deleted Successfuly ");
         setType("success");
         setOpen(true);
         setTimeout(() => {
           window.location.reload();

         }, [2000])

       }).catch((err) => {
         if (err?.response?.status === 409) {
           
           setMessage("Somting is wrong ,contact us about the problem");
           setType("error");
           setOpen(true);
         }
        
         
 
       })
 
     } catch (err) {
       console.log(err)
     }
   
   setEdited((prevIndex) => (prevIndex === index ? null : index));  
 };

  const handleStatus = (event) => {
    setStatus({[event.target.name] : event.target.value});
    console.log(status)
  };
  const handlePlace = (event) => {
    setPlace({[event.target.name] : event.target.value});
    console.log(place)
  };
 
  return (
    <Container>
      <AlertMessage open={open} setOpen={setOpen} message={message} type={type} />
      <FilterContainer>
        <Title>Filter Orders</Title>
        <FilterList>
          <FormControlLabel
            value="Waiting"
            control={<Switch color="success" />}
            label="Waiting"
            labelPlacement="start"
            name="Waiting"
            onChange={handleChange}
          />
          <FormControlLabel
            value="On Way"
            control={<Switch color="success" />}
            label="On Way"
            labelPlacement="start"
            name="On Way"
            onChange={handleChange}
          />
          <FormControlLabel
            value="Arrived"
            control={<Switch color="success" />}
            label="Arrived"
            labelPlacement="start"
            name="Arrived"
            onChange={handleChange}
          />
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
        {orders != "" ? orders.map((order, index) => (
          <div key={index}>
            <Order>
              <Informations type="ID">#{order?.orderId}</Informations>
              <Informations>0{order?.phonenumber}</Informations>
              <Informations>{edited === index ? 
              <FormControl sx={{ minWidth: 80 , width:'80%' }} size="small">
              <InputLabel id="demo-simple-select-autowidth-label">Places</InputLabel>
              <Select
              name="place"
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={place.place}
                onChange={handlePlace}
                autoWidth
                label="Places"
                >
               
                <MenuItem value={'Mall Storage'}>Mall Storage</MenuItem>
                <MenuItem value={'Out For Delivery'}>Out For Delivery</MenuItem>
                <MenuItem value={order?.state}>{order?.state}</MenuItem>
                <MenuItem value={order?.city}>{order?.city}</MenuItem>
              </Select>
                </FormControl>
              : order?.currentPlace}</Informations>
              <Informations>
              { edited === index ? <FormControl sx={{ minWidth: 80 , width:'80%' }} size="small">
        <InputLabel id="demo-simple-select-autowidth-label">Status</InputLabel>
        <Select
        name="status"
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={status.status}
          onChange={handleStatus}
          autoWidth
          label="Status"
        >
         
          <MenuItem value={'Waiting'}>Waiting</MenuItem>
          <MenuItem value={'On Way'}>On Way</MenuItem>
          <MenuItem value={'Arrived'}>Arrived</MenuItem>
        </Select>
      </FormControl> : <Status status={order?.status}>{ order?.status }</Status> }
              </Informations>
              <Informations>{order?.state}</Informations>
              <Informations>{order?.city}</Informations>
              <Informations>{order?.type}</Informations>
              <Informations>{order?.dateOrder}</Informations>
              <Informations type="Action">
              {edited === index ? <Tooltip title='edit' arrow>
    <IconButton sx={{flex:1}} onClick={() => handleUpdate(index , 'submit' , order?.orderId , order?.user)}><SaveTwoToneIcon color='primary' /> </IconButton>
    </Tooltip>:<Tooltip title='edit' arrow>
    <IconButton sx={{flex:1}} onClick={() => handleUpdate(index , 'change' , order?.orderId , order?.user)}><EditTwoToneIcon color='primary' /> </IconButton>
    </Tooltip>}
                <IconButton onClick={() => handleDelete(order?.orderId)}>
                  <DeleteTwoToneIcon color="error" />
                </IconButton>
                <IconButton
                  onClick={() => handleToggleOrderDetails(order?.orderId)}
                  sx={{
                    rotate: selectedOrderId === order?.orderId ? "90deg" : "0",
                    transition: "200ms",
                  }}
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
              {parseProducts(order?.products).map((product, idx) => (
                <Details key={idx}>
                  <Detail type="Product">
                    <Avatar
                      src={product.image}
                      sx={{ borderRadius: 2, width: 50, height: 50, mr: 4 }}
                    />
                    {product.name}
                  </Detail>
                  <Detail>
                    {product.color.split(",").map(c => (

                      <Circle color={c} />
                    ))}
                  </Detail>
                  <Detail>{product.size}</Detail>
                  <Detail>{product.quantity}</Detail>
                  <Detail> $ {product.price}</Detail>
                </Details>
              ))}
            </OrderDetails>
          </div>
        )) : 
        <LottieContainer>
        <Lottie  animationData={me} style={{ width:"40%"}} /> 
        No Order Found
        </LottieContainer> 
        
        }
      </ListContainer>
    </Container>
  );
};

export default Orders;
