import { Avatar, Divider, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import Header from "../Components/Header";
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
import LocalShippingTwoToneIcon from '@mui/icons-material/LocalShippingTwoTone';
import ApartmentTwoToneIcon from '@mui/icons-material/ApartmentTwoTone';
import WhereToVoteTwoToneIcon from '@mui/icons-material/WhereToVoteTwoTone';
import LockTwoToneIcon from '@mui/icons-material/LockTwoTone';
import { useSelector } from "react-redux";
import newRequest from "../utils/newRequest";
import EmptyData from "../Components/EmptyData";
import { hovredText } from "../Colors";





const Container = styled.div`
height: calc(100vh - 70px);
contain: paint;
background-color: #eee;
padding: ${props => props.location == 'Orders'  ? '32px' : 0};
`
const OrderContainer = styled.div`
height: 110vh;

contain: paint;


background-color: #f3f3f3;
display: flex;


gap: 32px;
contain: paint;
overflow-y: auto;
`




const Center = styled.div`

width: 30%;
background-color:white;
border-radius: 4px;
padding: 20px;
display: flex;
flex-direction: column;
gap: 20px;

contain: paint;
overflow-y:auto;

&::-webkit-scrollbar {
    width: 2px; 
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(
      147,
      147,
      147,
      0.543
    ); 
    border-radius: 20px; 
  }
 max-height: calc(100vh - 80px);
`
const Title = styled.span`
font-size: 20px;
font-weight: 500;

`
const Orders = styled.div`
display: flex;
flex-direction: column;
gap: 20px;


`
const Order = styled.div`
display: flex;
flex-direction: column;
gap: 16px;

padding: 16px;
border-radius: 4px;
background-color: #f5f5f5;
cursor: pointer;
border: ${({ isSelected }) => (isSelected ? 'solid #50BA6A' : 'none')};
transition: 200ms;

`
const OrderHeader = styled.div`
display: flex;

align-items: center;
gap: 8px;

`
const OrderNumber= styled.div`
display: flex;
font-weight: 500;
width: 50%;
`
const Progress = styled.span`
font-size: 14px;
padding: 4px;
background-color: ${props => props.status == 'Arrived' ? '#C3F5EC7e' : props.status == 'Waiting' ? '#FF7F002f' : '#E6C7002f'};
color: ${props => props.status == 'Arrived' ? '#4FA193' : props.status == 'Waiting' ? '#FF7F00' : '#E6C700'};
border-radius: 4px;
width: 50%;
text-align: center;
`
const ID = styled.span`font-weight:400;`
const Information = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
`
const Info = styled.span`
font-size: 14px;
width: 50%;
text-align: ${props => props.direction == 'left' ? 'left' : 'right'};

`




const Right = styled.div`
width: 70%;
display: flex;
flex-direction: column;
background-color:white;
border-radius: 4px;
padding: 0 0 0;
gap: 20px;
border: 1px solid #dfdfdf;
contain: paint;
overflow-y:auto;
max-height: calc(100vh - 80px);
&::-webkit-scrollbar {
    width: 2px; 
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(
      147,
      147,
      147,
      0.543
    ); 
    border-radius: 20px; 
  }



`
const OrderTitle = styled.div`
display: flex;
justify-content: space-between;
padding: 20px 20px 0;


`
const OrderId = styled.span`
font-size:18px;
font-weight: 500;
`
const Detail = styled.span`
display: flex;
align-items: center;
gap: 8px;
color: #50BA6A;
`
const OrderInfos = styled.div`
padding:  20px;
`
const Status = styled.div`
justify-content:space-between;
display: flex;

padding: 16px 32px;
background-color: #f5f5f5;
border-radius: 4px;
margin-bottom: 20px;
`
const TypeTitle = styled.span`
display: flex;
gap: 20px;
align-items: center;
font-weight: 500;

`
const OrderProcessing = styled.span`

padding: 4px 12px;
border-radius: 4px;
background-color: ${props => props.status == 'Arrived' ? '#C3F5EC7e' : props.status == 'Waiting' ? '#ff80002f' : '#E6C7002f'};
color: ${props => props.status == 'Arrived' ? '#4FA193' : props.status == 'Waiting' ? '#FF7F00' : '#E6C700'};
font-weight: 300;
`
const PaymentType = styled.span`
padding: 4px 12px;
border-radius: 4px;
background-color: #C3F5EC7e;
color: #4FA193; 
font-weight: 300;

`



const Details = styled.div`

display: flex;
`
const Addresses = styled.div`
flex: 3;
display: flex;
flex-direction: column;
justify-content: space-between;
gap: 12px;
padding: 16px 16px 0 0;
border-right: 1px solid #e8e8e8;


`
const AddressType = styled.div`
font-size: 14px;
font-weight: 600;
`
const Address = styled.div`
font-size: 13px;
margin-bottom: 8px;
color: #707070;
`


const OrderTotal = styled.div`
flex: 2;
display: flex;
flex-direction: column;
justify-content: space-between;
padding: 12px;

`
const TotalType = styled.div`
display: flex;
justify-content: space-between;
`
const TotalName = styled.span `

color: ${props => props.type == 'total' ? 'black' :'#707070 '};
font-size: ${props => props.type == 'total' ? '16px' :'14px '};
font-weight: ${props => props.type == 'total' ? '600' :'300 '};
`
const TypePrice = styled.div``
const Processing = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
 
  

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
  align-items: start;

  }
`;
const StepContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;


gap: 8px;
@media (max-width: 768px) {
   flex-direction: row;
   
  }
`

const Step = styled.div`


border: ${props => props.status == 'complete' ? '1px solid #72EA90' : '1px dashed #90EFA7'};

width: 60px;
height: 50px;
border-radius: 50%;
display: flex;
contain:content;
align-items: center;
justify-content: center;
padding: 2px;
`
const StepLabel = styled.label`
font-size: 12px;
text-align: center;
max-width: 60px;
`
const Span = styled.span`

background-color: ${props => props.status == 'complete' || props.status == 'in progress' ? '#90efa892' : '#90EFA733'};

height: 100%;
border-radius: 50%;
width: 100%;
display: flex;
contain:content;
align-items: center;
justify-content: center;

`


const Connector = styled.progress`
height: 4px;
border-radius: 1px;
margin: 25px 0;
width: 20%;
display: ${props => props.step ? 'none' :''};
&::-webkit-progress-bar{
    background-color: #eee;
    color:  #90EFA7;
}
&::-webkit-progress-value{
    background-color:  #72EA90;
}
@media (max-width: 768px) {
   height: 60px;
   width: 4px;
   margin: 0 65px 0 0;
  }


`



const Table = styled.div`
display: flex;
flex-direction: column;

`
const TagRow = styled.div`
display: flex;
position:sticky;
top: 0;
background-color:#f4f4f4;
padding: 16px 0 ;
`
const Tag = styled.div`
font-size: 14px;

text-align: center;

`
const Row = styled.div`
display: flex;
align-items: center;
text-align: center;
font-size: 14px;
background-color: white;
`
const Product = styled.div`
display: flex;
align-items: center;
justify-content:space-evenly;
gap: 20px;
padding: 4px;
`
const ProductImage= styled.img`
width: 60px;

`
const ProductName= styled.span``
const Qte= styled.span``
const Price= styled.span``

const Warning = styled.span`
color: ${hovredText};
font-size: 10px;
`








const getProcessedSteps = (selectedOrder) => {
  // Define the steps
  const steps = [
    {
      stepIcon: <LocationOnTwoToneIcon />,
      stepLabel: 'Mall Storage',
      stepStatus: 'complete',
    },
    {
      stepIcon: <LocalShippingTwoToneIcon />,
      stepLabel: 'Out For Delivery',
      stepStatus: selectedOrder?.currentplace === 'Out For Delivery' ? 'complete' : 'waiting',
    },
    {
      stepIcon: <ApartmentTwoToneIcon />,
      stepLabel:  selectedOrder?.state ,
      stepStatus: selectedOrder?.place === selectedOrder?.state ? 'complete' : 'waiting',
    },
    {
      stepIcon: <WhereToVoteTwoToneIcon />,
      stepLabel: <>{selectedOrder?.city} <Warning>(Local Post)</Warning></>,
      stepStatus: selectedOrder?.place === selectedOrder?.city ? 'complete' : 'waiting',
      last: true,
    },
  ];

  for (let i = 0; i < steps.length - 1; i++) {
    if (steps[i].stepStatus === 'complete' && steps[i + 1].stepStatus !== 'complete') {
      steps[i + 1].stepStatus = 'in progress';
    }
  }
  // Ensure step statuses follow the rule: if step 2 is "complete", then step 1 must be "complete"
  for (let i = 1; i < steps.length; i++) {
    if (steps[i].stepStatus === 'complete') {
      
      steps[i - 1].stepStatus = 'complete';
      steps[i - 2].stepStatus = 'complete';
      
    }
  }
  

  return steps;
};
const OrderPage = () => {




  const user = useSelector((state) => state.user?.currentUser);
  const Location = useLocation().pathname.split('/')
    
  const [selectedOrderId, setSelectedOrderId] = useState();
  const [selectedOrder, setSelectedOrder] = useState();
  const [orders, setOrders] = useState([]);
console.log(Location)
  const handleOrderClick = (orderId, orderDetails) => {
    setSelectedOrderId(orderId === selectedOrderId ? null : orderId);
    setSelectedOrder(orderId === selectedOrderId ? null : orderDetails);
  };
  const steps = getProcessedSteps(selectedOrder);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await newRequest.get(`orders/client/${user?.idUSER}/order-stats`);
        setOrders(res.data);
      } catch (error) {
        console.log("error", error);
      }
    };

    getOrders();
  }, [user?.idUSER]);
  const total = 0
console.log(selectedOrder?.currentplace)
  return (
    <Container location ={Location[1]}>
       

        <OrderContainer>


      

      <Center>
        <Title>My Orders</Title>
        <Orders>
            {orders.map((order) => (

                
                <Order
                 key={order.orderId}
                 isSelected={selectedOrderId === order.orderId}
                 onClick={() => handleOrderClick(order.orderId, order)}
                 >
            <OrderHeader>
                <OrderNumber>Order<ID>#{order.orderId}</ID></OrderNumber>
                <Progress status={order.status}>{order.status}</Progress>
            </OrderHeader>
            <Divider />
            <Information><Info direction='left'>Order Sate </Info> : <Info>{order.dateOrder}</Info></Information>
            <Information><Info direction='left'>Delivery Time</Info> :<Info>{order.estimatedTime}</Info> </Information>
            <Information><Info direction='left'>Amount</Info> :<Info>{order.amount}</Info> </Information>
            <Information><Info direction='left'>Total Price</Info> :<Info> ${order.products.reduce((total, item) => total + item.price, 0)  - (order?.products.reduce((total, item) => total + item.price, 0) * 0) + order.priceShipping }</Info></Information>
          </Order>
        ))}
        </Orders>
      </Center>

      <Right>
      {selectedOrder == null ?
      <div style={{height:'100%' , display:'flex' , alignItems:'center' , width : '100%' , justifyContent:'center'}}>

      <EmptyData text={'Cart Is Empty'} />
      </div>
      : selectedOrder && (
          <>
        <OrderTitle>
          <OrderId>Order Details - {selectedOrder.orderId}</OrderId>{" "}
          <Link>
            <Detail><RemoveRedEyeOutlinedIcon fontSize="small" />Details</Detail>
          </Link>
        </OrderTitle>
        <OrderInfos>
          <Status>
           
              <TypeTitle>
                Order Status :
                <OrderProcessing status={selectedOrder.status}>{selectedOrder.status}</OrderProcessing>
              </TypeTitle>
              <TypeTitle>
                Payment Method :
                <PaymentType>Pay In Cash</PaymentType>
              </TypeTitle>
            
          </Status>
          <Details>
            <Addresses>
              <AddressType>Shipping Address</AddressType>
              <Address>{selectedOrder.state + ' | at the local post number : ' + selectedOrder.postalCode} </Address>
              <AddressType>Billing Address</AddressType>
              <Address>ddd - aaa - bbbb -ggg</Address>
            </Addresses>
          
            <OrderTotal>
            {selectedOrder && (
  <TotalType>
    <TotalName>Sub Total</TotalName>
    <TypePrice>
      ${selectedOrder.products.reduce((total, item) => total + item.price, 0)}
    </TypePrice>
  </TotalType>
)}
              <TotalType><TotalName>Discount</TotalName><TypePrice>0%</TypePrice></TotalType>
              <TotalType><TotalName>Delivery Fee</TotalName><TypePrice>${selectedOrder.priceShipping}</TypePrice></TotalType>
              {selectedOrder && ( <TotalType ><TotalName type="total">Total</TotalName><TypePrice>${selectedOrder.products.reduce((total, item) => total + item.price, 0)  - (selectedOrder?.products.reduce((total, item) => total + item.price, 0) * 0) + selectedOrder.priceShipping }</TypePrice></TotalType>
           )} </OrderTotal>
          </Details>
        </OrderInfos>
        <Divider />
        <Processing>
        {steps.map((step) => (

            
<>
<Tooltip title={step.stepStatus} arrow>

<StepContainer>
<Step status={step.stepStatus}><Span status={step.stepStatus}>{step.stepIcon}</Span></Step>
<StepLabel>{step.stepLabel}</StepLabel>
</StepContainer>
</Tooltip>
<Connector value={step.stepStatus == 'complete' ? 100 : 0} max={100} step={step.last} />
</>
))}
            
          
        

        </Processing>
       
        <Table>
          <TagRow>
            <Tag style={{flex:3}}>Item</Tag>
            <Tag style={{flex:2}}>Color</Tag>
            <Tag style={{flex:2}}>Size</Tag>
            <Tag style={{flex:2}}>Quantity</Tag>
            <Tag style={{flex:2}}>Price</Tag>
          </TagRow>
         

              
  
   
      {selectedOrder?.products.map(product => (
        <Row key={product.id}>
          <Product style={{flex:3}}>
            <ProductImage src={product.image} alt={product.name} />
            <ProductName>{product.name}</ProductName>
          </Product>
          <Qte style={{flex:2}}>{product.color}</Qte>
          <Qte style={{flex:2}}>{product.size}</Qte>
          <Qte style={{flex:2}}>{product.quantity}</Qte>
          <Price style={{flex:2}}> $ {product.price}</Price>
        </Row>
      ))}
    

          
            
        </Table>
      
       
        </>
      )}
      </Right>
        </OrderContainer>
    </Container>
  );
};

export default OrderPage;
