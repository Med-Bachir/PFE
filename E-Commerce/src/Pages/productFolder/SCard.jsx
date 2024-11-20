import { styled } from "styled-components";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CloseIcon from "@mui/icons-material/Close";
import Lottie from "react-lottie";
import * as animationData from "../../NotFound.json";
import { useState } from "react";
//import { usestate } from "react";

//Style Component
const Container = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: center;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
  backdrop-filter: ${(props) => (props.close ? "" : "brightness(60%)")};

backdrop-filter: ${(props) => (props.open ? "brightness(40%)" : "")};

`;

const CubeContainer = styled.div`
  width: 70px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  height: 70px;
  background-color: #009f7f;
  position: fixed;
  z-index: 99;
  padding: 14px 10px;
  right: 0;
  top: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    opacity: 0.9;
  }
`;

const CubeItemContainer = styled.div`
  display: flex;
  font-size: 13px;
  font-weight: 600;
  align-items: center;
`;
const CubeItem = styled.div``;
const CubeLogo = styled.div`
  margin-right: 5px;
`;

const CubeAmountContainer = styled.div``;
const CubeItemNumber = styled.span`
  background-color: white;
  color: #009f7f;
  padding: 3px 10px;
  border-radius: 7px;
  font-size: 15px;
`;

//Panier
const Wrapper = styled.div`
  height: 100vh;
  width: 60vh;
  background-color: white;

  right: 0;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transform: ${(props) =>
    props.close ? "translateX(500px)" : "translateX(0)"};
  transform: ${(props) => (props.open ? "translateX(0)" : "translateX(500px)")};
  transition: all 0.5s ease-in-out;
  overflow: hidden;
  z-index: 99;
`;
const Top = styled.div`
  padding: 3px 10px;
  margin-top: 10px;
  display: flex;
  border-bottom: 1px solid #00000013;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;
const Item = styled.div`
  color: #009f7f;
  margin-left: 10px;
  font-weight: 400;
`;
const LogoItem = styled.div`
  color: #009f7f;
`;
const ItemContainer = styled.div`
  display: flex;
`;

const Center = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 15px 20px;
`;
const ProdutsFound = styled.div`
  margin-bottom: 20px;
`;
const ProdutsFoundT = styled.div``;

const Bottom = styled.div`
  padding: 15px 18px;
`;

const Checkout = styled.div`
  background-color: #009f7f;
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  border-radius: 30px;
  align-items: center;
  cursor: pointer;
  transition: all 0.1s ease-in;
  &:hover{
opacity: 0.9;


  }
`;
const CheckoutT = styled.span`
  color: white;
  font-weight: 600;
`;
const CheckoutNumber = styled.span`
  background-color: white;
  color: #009f7f;
  padding: 5px 10px;
  border-radius: 30px;
`;

//Body
const SCard = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData, // the animation data
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const [open, setOpen] = useState(false);
  const [close, setClose] = useState(false);

  const handlleClickClose = () => {
    setOpen(false);
    setClose(true);
  };

  const handlleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Container open={open} close={close}>
        <CubeContainer onClick={handlleClickOpen}>
          <CubeItemContainer>
            <CubeLogo>
              <ShoppingBagIcon sx={{ fontSize: "20px" }} />
            </CubeLogo>
            <CubeItem>0 Item</CubeItem>
          </CubeItemContainer>
          <CubeAmountContainer>
            <CubeItemNumber>0.00$</CubeItemNumber>
          </CubeAmountContainer>
        </CubeContainer>
        <Wrapper open={open} close={close}>
          <Top>
            <ItemContainer>
              <LogoItem>
                <ShoppingBagIcon />
              </LogoItem>
              <Item>0 Item</Item>
            </ItemContainer>
            <LogoItem
              style={{
                marginRight: "20px",
                cursor: "pointer",
                backgroundColor: "#009f7f",
                borderRadius: "50%",
                color: "white",
                width: "30px",
                display: "flex",
                justifyContent: "center",
                height: "30px",
                alignItems: "center",
              }}
            >
              <CloseIcon onClick={handlleClickClose} sx={{ width: "17px" }} />
            </LogoItem>
          </Top>

          <Center>
            <ProdutsFound>
              <Lottie options={defaultOptions} height={300} width={300} />
            </ProdutsFound>
            <ProdutsFoundT>No products found</ProdutsFoundT>
          </Center>

          <Bottom>
            <Checkout>
              <CheckoutT>Checkout</CheckoutT>
              <CheckoutNumber>$0.00</CheckoutNumber>
            </Checkout>
          </Bottom>
        </Wrapper>
      </Container>
    </>
  );
};

export default SCard;
