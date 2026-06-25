import { Divider, IconButton, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import LocationOnTwoToneIcon from "@mui/icons-material/LocationOnTwoTone";
import LocalShippingTwoToneIcon from "@mui/icons-material/LocalShippingTwoTone";
import ApartmentTwoToneIcon from "@mui/icons-material/ApartmentTwoTone";
import WhereToVoteTwoToneIcon from "@mui/icons-material/WhereToVoteTwoTone";
import { useSelector } from "react-redux";
import newRequest from "../utils/newRequest";
import EmptyData from "../Components/Pending/EmptyData";
import {
  colorAccentLight,
  colorAccentMain,
  colorAccentMedium,
  colorAccentMoreTransparent,
  colorAccentSubDark,
  colorAccentTransparent,
  colorBackgroundGray,
  colorHighlightDarkYellow,
  colorHighlightSoftYellow,
  colorPrimaryBlack,
  colorWarningDark,
  colorWarningSoft,
  darkOrange,
  darkYellow,
  elementGrayBackground,
  grayBackground,
  lightMain,
  lightMedMain,
  lightSoftMain,
  main,
  medMain,
  primaryTextColor,
  secondaryTextColor,
  softMainTransparent,
  softOrange,
  softYellow,
  transparentMain,
  whiteTextColor,
} from "../Colors";
import MoreHorizTwoToneIcon from "@mui/icons-material/MoreHorizTwoTone";

const Container = styled.div`
  height: calc(100vh - 80px);
  width: calc(100% - 64px);
  margin: 32px;
  contain: paint;
  color: ${({ theme }) =>
    theme == "light" ? primaryTextColor : elementGrayBackground};
  background-color: ${({ theme }) =>
    theme == "light" ? whiteTextColor : colorBackgroundGray};
  padding: ${(props) => (props.location == "Orders" ? "32px" : 0)};
  @media (max-width: 768px) {
    height: auto;
    contain: content;
  }
`;
const OrderContainer = styled.div`
  height: 100%;

  contain: paint;

  background-color: ${({ theme }) =>
    theme == "light" ? grayBackground : colorBackgroundGray};
  display: flex;
  gap: 32px;
  overflow-y: auto;
  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    contain: content;
  }
`;

const Center = styled.div`
  width: 30%;
  background-color: ${({ theme }) =>
    theme == "light" ? whiteTextColor : colorPrimaryBlack};
  border-radius: 4px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(147, 147, 147, 0.543);
    border-radius: 20px;
  }
  max-height: 100%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const Title = styled.span`
  font-size: 20px;
  font-weight: 500;
`;
const Orders = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const Order = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  border-radius: 4px;
  background-color: ${({ theme }) =>
    theme == "light" ? grayBackground : colorBackgroundGray};
  cursor: pointer;
  border: ${({ isSelected }) => (isSelected ? `2px solid ${main}` : "none")};
  transition: 200ms;
`;
const OrderHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const OrderNumber = styled.div`
  display: flex;
  font-weight: 500;
  width: 50%;
`;
const Progress = styled.span`
  font-size: 14px;
  padding: 4px;
  background-color: ${(props) =>
    props.status == "Arrived"
      ? props.theme == "light"
        ? lightSoftMain
        : colorAccentLight
      : props.status == "Waiting"
      ? props.theme == "light"
        ? softOrange
        : colorWarningSoft
      : props.theme == "light"
      ? softYellow
      : colorHighlightSoftYellow};
  color: ${(props) =>
    props.status == "Arrived"
      ? props.theme == "light"
        ? main
        : colorAccentMain
      : props.status == "Waiting"
      ? props.theme == "light"
        ? darkOrange
        : colorWarningDark
      : props.theme == "light"
      ? darkYellow
      : colorHighlightDarkYellow};
  border-radius: 4px;
  width: 50%;
  text-align: center;
`;
const ID = styled.span`
  font-weight: 400;
`;
const Information = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Info = styled.span`
  font-size: 14px;
  width: 50%;
  text-align: ${(props) => (props.direction == "left" ? "left" : "right")};
`;
const Right = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) =>
    theme == "light" ? whiteTextColor : colorPrimaryBlack};
  border-radius: 4px;
  padding: 0 0 0 0;
  gap: 20px;
  contain: paint;
  overflow-y: auto;
  max-height: calc(100vh - 80px);
  &::-webkit-scrollbar {
    width: 2px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(147, 147, 147, 0.543);
    border-radius: 20px;
  }
  @media (max-width: 768px) {
    width: calc(100vw - 64px);
  }
`;
const SelectedOrder = styled.div``;
const OrderTitle = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 20px 0;
`;
const OrderId = styled.span`
  font-size: 18px;
  font-weight: 500;
`;
const Detail = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => (theme == "light" ? main : colorAccentMain)};
`;
const OrderInfos = styled.div`
  padding: 20px;
`;
const Status = styled.div`
  justify-content: space-between;
  display: flex;
  padding: 16px 32px;
  background-color: ${({ theme }) =>
    theme == "light" ? grayBackground : colorBackgroundGray};
  border-radius: 4px;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
    padding: 20px 8px;
  }
`;
const TypeTitle = styled.span`
  display: flex;
  gap: 20px;
  align-items: center;
  font-weight: 500;
  @media (max-width: 768px) {
    font-weight: 400;
    justify-content: space-between;
  }
`;
const OrderProcessing = styled.span`
  padding: 4px 12px;
  border-radius: 4px;
  background-color: ${(props) =>
    props.status == "Arrived"
      ? props.theme == "light"
        ? lightSoftMain
        : colorAccentLight
      : props.status == "Waiting"
      ? props.theme == "light"
        ? softOrange
        : colorWarningSoft
      : props.theme == "light"
      ? softYellow
      : colorHighlightSoftYellow};
  color: ${(props) =>
    props.status == "Arrived"
      ? props.theme == "light"
        ? main
        : colorAccentMain
      : props.status == "Waiting"
      ? props.theme == "light"
        ? darkOrange
        : colorWarningDark
      : props.theme == "light"
      ? darkYellow
      : colorHighlightDarkYellow};
  font-weight: 300;
  @media (max-width: 768px) {
    width: 45%;
  }
`;
const PaymentType = styled.span`
  padding: 4px 12px;
  border-radius: 4px;
  background-color: ${(props) =>
    props.theme == "light" ? lightSoftMain : colorAccentLight};
  color: ${(props) => (props.theme == "light" ? main : colorAccentMain)};
  font-weight: 300;
  @media (max-width: 768px) {
    width: 60%;
  }
`;

const Details = styled.div`
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const Addresses = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 16px 0 0;
  border-right: 1px solid ${grayBackground};
  color: ${({ theme }) =>
    theme == "light" ? primaryTextColor : elementGrayBackground};

  @media (max-width: 768px) {
    border-right: none;
    border-bottom: 1px solid ${grayBackground};
  }
`;
const AddressType = styled.div`
  font-size: 14px;
  font-weight: 600;
`;
const Address = styled.div`
  font-size: 13px;
  margin-bottom: 8px;
  color: ${secondaryTextColor};
`;

const OrderTotal = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px;
  @media (max-width: 768px) {
    padding: 12px 0;
    gap: 9px;
  }
`;
const TotalType = styled.div`
  display: flex;
  justify-content: space-between;
`;
const TotalName = styled.span`
  color: ${(props) =>
    props.type == "total"
      ? props.theme == "light"
        ? primaryTextColor
        : elementGrayBackground
      : secondaryTextColor};
  font-size: ${(props) => (props.type == "total" ? "16px" : "14px ")};
  font-weight: ${(props) => (props.type == "total" ? "600" : "300 ")};
`;
const TypePrice = styled.div``;
const Processing = styled.div`
  display: flex;
  flex-direction: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0;
    padding-bottom: 20px;
    justify-content: center;
  }
`;
const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 100px;

  gap: 8px;
  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: center;
    width: 100%;
    height: 50px;
  }
`;

const Step = styled.div`
  border: ${(props) =>
    props.status == "complete"
      ? `3px solid ${medMain}`
      : `1px dashed ${medMain}`};

  width: 60px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  contain: content;
  align-items: center;
  justify-content: center;
`;
const StepLabel = styled.label`
  font-size: 12px;
  text-align: center;
  max-width: 60px;

  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: center;
    width: 100%;
  }
`;
const Span = styled.span`
  background-color: ${(props) =>
    props.status == "complete" || props.status == "in progress"
      ? props.theme == "light"
        ? lightMedMain
        : colorAccentTransparent
      : props.theme == "light"
      ? lightSoftMain
      : colorAccentLight};
  height: 100%;
  border-radius: 50%;
  width: 100%;
  display: flex;
  contain: content;
  align-items: center;
  justify-content: center;
`;

const Connector = styled.progress`
  height: 4px;
  border-radius: 1px;
  margin-bottom: 45px;
  width: 20%;
  display: ${(props) => (props.step ? "none" : "")};
  &::-webkit-progress-bar {
    background-color: ${({ theme }) =>
      theme == "light" ? lightMain : colorAccentMedium};
    color: ${({ theme }) => (theme == "light" ? main : colorAccentMain)};
  }
  &::-webkit-progress-value {
    background-color: ${medMain};
  }
  @media (max-width: 768px) {
    height: 60px;
    width: 4px;
    margin: 0 65px 0 0;
  }
`;

const Table = styled.div`
  background-color: ${({ theme }) =>
    theme == "light" ? transparentMain : colorAccentMoreTransparent};
`;
const TableItems = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  position: relative;
  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(147, 147, 147, 0.543);
    border-radius: 20px;
  }
`;
const TagRow = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: ${({ theme }) =>
    theme == "light" ? main : colorAccentMedium};
  color: ${whiteTextColor};
  padding: 16px 0;
  contain: paint;
  width: 1000px;
`;
const Tag = styled.div`
  font-size: 14px;
  text-align: center;
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 14px;
  background-color: ${({ theme }) =>
    theme == "light" ? transparentMain : colorAccentMoreTransparent};
  contain: paint;
  width: 1000px;
`;
const Product = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 12px;
  margin: 8px -20px 8px 20px;
`;
const ProductImage = styled.img`
  width: 40px;
  height: 50px;
  object-fit: contain;
`;
const ProductName = styled.span``;
const Qte = styled.span``;
const Price = styled.span``;

const Warning = styled.span`
  color: ${secondaryTextColor};
  font-size: 10px;
`;

const Attributs = styled.div`
  height: ${({ selected }) => (selected ? "120px" : "0px")};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  margin: 0 20px;
  width: calc(1000px - 40px);

  transition: height 200ms ease-in-out;
`;
const Attribute = styled.div`
  flex: 1;
  text-align: center;
`;
const ItemContainerTitles = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 0 20px 32px;
  background-color: ${(props) =>
    props.theme == "light" ? medMain : colorAccentMedium};
  @media (max-width: 768px) {
    padding: 10px 0 10px 16px;
  }
  min-width: 600px;
`;
const Values = styled.div`
  display: flex;
  padding: 20px 0 20px 32px;
  background-color: ${(props) =>
    props.theme == "light" ? softMainTransparent : colorAccentMoreTransparent};

  @media (max-width: 768px) {
    padding: 10px 0 10px 16px;
  }
`;
const Value = styled.div`
  flex: 1;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Color = styled.div`
  padding: 4px 12px;
  max-width: 25px;
  border-radius: 8px;
  background-color: ${(props) => props.color};
  opacity: 0.8;
`;

const getProcessedSteps = (selectedOrder) => {
  // Define the steps
  const steps = [
    {
      stepIcon: <LocationOnTwoToneIcon />,
      stepLabel: "Mall Storage",
      stepStatus: "complete",
    },
    {
      stepIcon: <LocalShippingTwoToneIcon />,
      stepLabel: "Out For Delivery",
      stepStatus:
        selectedOrder?.currentplace === "Out For Delivery"
          ? "complete"
          : "waiting",
    },
    {
      stepIcon: <ApartmentTwoToneIcon />,
      stepLabel: selectedOrder?.state,
      stepStatus:
        selectedOrder?.place === selectedOrder?.state ? "complete" : "waiting",
    },
    {
      stepIcon: <WhereToVoteTwoToneIcon />,
      stepLabel: (
        <>
          {selectedOrder?.city} <Warning>{selectedOrder?.type}</Warning>
        </>
      ),
      stepStatus:
        selectedOrder?.place === selectedOrder?.city ? "complete" : "waiting",
      last: true,
    },
  ];

  for (let i = 0; i < steps.length - 1; i++) {
    if (
      steps[i].stepStatus === "complete" &&
      steps[i + 1].stepStatus !== "complete"
    ) {
      steps[i + 1].stepStatus = "in progress";
    }
  }
  // Ensure step statuses follow the rule: if step 2 is "complete", then step 1 must be "complete"
  for (let i = 1; i < steps.length; i++) {
    if (steps[i].stepStatus === "complete") {
      steps[i - 1].stepStatus = "complete";
      steps[i - 2].stepStatus = "complete";
    }
  }

  return steps;
};
const OrderPage = () => {
  const user = useSelector((state) => state.user?.currentUser);
  const theme = useSelector((state) => state.theme.mode);
  const Location = useLocation().pathname.split("/");
  const [ordersItems, setOrdersItems] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState();
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState();
  const [orders, setOrders] = useState([]);


  const getOrdersItems = async (id) => {
    try {
      // Include the `order` parameter in the query string
      const res = await newRequest.get(
        `orders/client/${user?.idUSER}/orderitem-stats?order=${id}`
      );
      setOrdersItems(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };
  const handleOrderClick = (orderId, orderDetails) => {
    setSelectedOrderId(orderId === selectedOrderId ? null : orderId);
    setSelectedOrder(orderId === selectedOrderId ? null : orderDetails);
    getOrdersItems(orderId);
  };
  const steps = getProcessedSteps(selectedOrder);
  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await newRequest.get(
          `orders/client/${user?.idUSER}/order-stats`
        );
        setOrders(res.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    getOrders();
  }, [user?.idUSER]);

  return (
    <Container theme={theme} location={Location[1]}>
      <OrderContainer theme={theme}>
        <Center theme={theme}>
          <Title>My Orders</Title>
          <Orders>
            {orders.map((order) => (
              <Order
                theme={theme}
                key={order.orderId}
                isSelected={selectedOrderId === order.orderId}
                onClick={() => handleOrderClick(order.orderId, order)}
              >
                <OrderHeader>
                  <OrderNumber>
                    Order<ID>#{order.orderId}</ID>
                  </OrderNumber>
                  <Progress theme={theme} status={order.status}>
                    {order.status}
                  </Progress>
                </OrderHeader>
                <Divider />
                <Information>
                  <Info direction="left">Order Sate </Info> :{" "}
                  <Info>{order.dateOrder}</Info>
                </Information>
                <Information>
                  <Info direction="left">Delivery Time</Info> :
                  <Info>{order.estimatedTime}</Info>{" "}
                </Information>
                <Information>
                  <Info direction="left">Amount</Info> :
                  <Info>{order.amount}</Info>{" "}
                </Information>
                <Information>
                  <Info direction="left">Total Price</Info> :
                  <Info> ${order.totalPrice.toFixed(2)}</Info>
                </Information>
              </Order>
            ))}
          </Orders>
        </Center>

        <Right theme={theme}>
          {selectedOrder == null ? (
            <div
              style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <EmptyData text={"Please Select an Order!!"} />
            </div>
          ) : (
            selectedOrder && (
              <SelectedOrder>
                <OrderTitle>
                  <OrderId>Order Details - {selectedOrder.orderId}</OrderId>{" "}
                  <Link>
                    <Detail theme={theme}>
                      <RemoveRedEyeOutlinedIcon fontSize="small" />
                      Details
                    </Detail>
                  </Link>
                </OrderTitle>
                <OrderInfos>
                  <Status theme={theme}>
                    <TypeTitle>
                      Order Status :
                      <OrderProcessing
                        theme={theme}
                        status={selectedOrder.status}
                      >
                        {selectedOrder.status}
                      </OrderProcessing>
                    </TypeTitle>
                    <TypeTitle>
                      Payment Method :
                      <PaymentType theme={theme}>Pay In Cash</PaymentType>
                    </TypeTitle>
                  </Status>
                  <Details>
                    <Addresses theme={theme}>
                      <AddressType>Shipping Address</AddressType>
                      <Address>
                        {selectedOrder.state +
                          " | at the local post number : " +
                          selectedOrder.postalCode}{" "}
                      </Address>
                      <AddressType>Billing Address</AddressType>
                      <Address>ddd - aaa - bbbb -ggg</Address>
                    </Addresses>

                    <OrderTotal>
                      {selectedOrder && (
                        <TotalType>
                          <TotalName>Sub Total</TotalName>
                          <TypePrice>
                            ${selectedOrder.totalPrice.toFixed(2)}
                          </TypePrice>
                        </TotalType>
                      )}
                      <TotalType>
                        <TotalName>Discount</TotalName>
                        <TypePrice>0%</TypePrice>
                      </TotalType>
                      <TotalType>
                        <TotalName>Delivery Fee</TotalName>
                        <TypePrice>${selectedOrder.priceShipping}</TypePrice>
                      </TotalType>
                      {selectedOrder && (
                        <TotalType>
                          <TotalName theme={theme} type="total">
                            Total
                          </TotalName>
                          <TypePrice>
                            $
                            {(
                              selectedOrder.totalPrice +
                              selectedOrder.priceShipping
                            ).toFixed(2)}
                          </TypePrice>
                        </TotalType>
                      )}{" "}
                    </OrderTotal>
                  </Details>
                </OrderInfos>
                <Divider />
                <Processing>
                  {steps.map((step) => (
                    <>
                      <Tooltip title={step.stepStatus} arrow>
                        <StepContainer>
                          <Step status={step.stepStatus}>
                            <Span theme={theme} status={step.stepStatus}>
                              {step.stepIcon}
                            </Span>
                          </Step>
                          <StepLabel>{step.stepLabel}</StepLabel>
                        </StepContainer>
                      </Tooltip>
                      <Connector
                        theme={theme}
                        value={step.stepStatus == "complete" ? 100 : 0}
                        max={100}
                        step={step.last}
                      />
                    </>
                  ))}
                </Processing>

                <Table theme={theme}>
                  <TableItems>
                    <TagRow theme={theme}>
                      <Tag style={{ flex: 3 }}>Item</Tag>

                      <Tag style={{ flex: 2 }}>Quantity</Tag>
                      <Tag style={{ flex: 2 }}>Progress</Tag>
                      <Tag style={{ flex: 2 }}>Price</Tag>
                      <Tag style={{ flex: 1 }}> Action </Tag>
                    </TagRow>

                    {ordersItems.map((product) => {
                      return (
                        <>
                          <Row theme={theme} key={product.idPRODUCT}>
                            <Product style={{ flex: 3 }}>
                              <ProductImage
                                src={product.productimage}
                                alt={product.productname}
                              />
                              <ProductName>{product.productname}</ProductName>
                            </Product>

                            <Qte style={{ flex: 2 }}>{product.qte}</Qte>
                            <Progress
                              theme={theme}
                              status={product.status}
                              style={{ flex: 2 }}
                            >
                              {product.status}
                            </Progress>
                            <Price style={{ flex: 2 }}>
                              {" "}
                              {product.discount != 0 ? (
                                <p
                                  style={{
                                    textDecoration: "line-through",
                                    color: secondaryTextColor,
                                    fontSize: 12,
                                  }}
                                >
                                  ${product.productprice}
                                </p>
                              ) : (
                                ""
                              )}
                              ${" "}
                              {(
                                product.productprice -
                                (product.productprice * product.discount) / 100
                              ).toFixed(2)}
                            </Price>
                            <Price style={{ flex: 1 }}>
                              <IconButton
                                color="secondary"
                                onClick={() => {
                                  setSelectedItem(
                                    selectedItem === product?.idPRODUCT
                                      ? null
                                      : product?.idPRODUCT
                                  );

                                  if (product?.attributes) {
                                    try {
                                      setAttributes(
                                        JSON.parse(product?.attributes)
                                      );
                                    } catch (error) {
                                      console.error(
                                        "Invalid JSON in product attributes:",
                                        product?.attributes,
                                        error
                                      );
                                      setAttributes(null); // Fallback to null if JSON parsing fails
                                    }
                                  } else {
                                    setAttributes(null); // Set to null if attributes are undefined or null
                                  }
                                }}
                                sx={{
                                  rotate:
                                    selectedItem === product?.idPRODUCT
                                      ? "90deg"
                                      : "0deg",
                                  transition: "200ms",
                                  outline: "none",
                                }}
                              >
                                <MoreHorizTwoToneIcon color="secondary" />
                              </IconButton>
                            </Price>
                          </Row>
                          <Attributs
                            selected={selectedItem === product?.idPRODUCT}
                          >
                            <ItemContainerTitles
                              style={{
                                color: whiteTextColor,
                                backgroundColor:
                                  theme == "light" ? main : colorAccentSubDark,
                                padding: "12px 0 12px 32px",
                              }}
                            >
                              {attributes &&
                              typeof attributes === "object" &&
                              !Array.isArray(attributes)
                                ? Object.entries(attributes).map(
                                    ([key, value]) => (
                                      <Attribute key={key}>{key}</Attribute>
                                    )
                                  )
                                : "NO attribbute available"}
                            </ItemContainerTitles>

                            <Values>
                              {attributes &&
                              typeof attributes === "object" &&
                              !Array.isArray(attributes) ? (
                                Object.entries(attributes).map(
                                  ([key, value]) => {
                                    if (key === "color" || key === "colors") {
                                      return (
                                        <Value key={key}>
                                          <Color color={value} />
                                        </Value>
                                      );
                                    }

                                    return (
                                      <Attribute key={key}>{value}</Attribute>
                                    );
                                  }
                                )
                              ) : (
                                <p>No attributes available</p> // Fallback message if attributes is invalid
                              )}
                            </Values>
                          </Attributs>
                        </>
                      );
                    })}
                  </TableItems>
                </Table>
              </SelectedOrder>
            )
          )}
        </Right>
      </OrderContainer>
    </Container>
  );
};

export default OrderPage;
