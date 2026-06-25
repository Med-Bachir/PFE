import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import newRequest from "../../../utils/newRequest";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";

// ICON & IMAGES
import DeleteIcon from "@mui/icons-material/Delete";
import me from "../../../assets/Lotties/Animation - 1716145973359.json";

// COMPONENTS
import Loading from "../../../Components/Pending/Loading";
import LazyAvatar from "../../../Components/Pending/LazyAvatar";
// COLORS
import {
  colorAccentMain,
  colorAccentMediumTransparent,
  colorAccentSoftTransparent,
  colorErrorSoft,
  grayBackground,
  primaryTextColor,
  whiteTextColor,
} from "../../../Colors";

const Container = styled.div`
  height: calc(100vh - 80px);
  padding: 32px;
  display: flex;
  justify-content: space-evenly;
  gap: 20px;
  flex-wrap: wrap;
  overflow: auto;
  
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 12px;
  }
`;

const StoreProfile = styled.div`
  padding: 20px;
  border-radius: 12px;
  background-color: ${(props) =>
    props.theme == "light" ? whiteTextColor : colorAccentSoftTransparent};
  height: 200px;
  @media (max-width: 768px) {
    height: auto;
  }
`;

const Shop = styled.div`
  display: flex;
  border-bottom: 1px solid
    ${(props) =>
      props.theme == "light" ? grayBackground : colorAccentMediumTransparent};
  color: ${(props) =>
    props.theme == "light" ? primaryTextColor : whiteTextColor};
  padding: 0 0 8px;
  gap: 8px;
  align-items: center;
  @media (max-width: 768px) {
    width: 100%;
    gap: 0px;
  }
`;

const Circle = styled.div`
  width: 80px;
  height: 80px;
  border: 1.5px dashed
    ${(props) => (props.theme == "light" ? grayBackground : colorAccentMain)};
  border-radius: 50%;
  padding: 8px;
`;

const StorInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
`;

const Name = styled.span``;
const Products = styled.span``;
const StaticContainer = styled.span`
  display: flex;
  padding: 8px 0;
  justify-content: space-between;
  color: ${(props) =>
    props.theme == "light" ? primaryTextColor : whiteTextColor};
`;
const Stats = styled.span`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 12px;
  gap: 8px;
`;
const Title = styled.span`
  display: flex;
`;
const Value = styled.span`
  display: flex;
  font-weight: 600;
  font-size: 18px;
`;
const Status = styled.span`
  padding: 4px 20px;
  border-radius: 4px;
  background-color: ${(props) =>
    props.status === "Close"
      ? props.theme == "light"
        ? "#FFE6EC"
        : colorErrorSoft
      : props.theme == "light"
      ? "#E0FAF6"
      : colorAccentMediumTransparent};
  color: ${(props) =>
    props.status === "Close"
      ? "#FF003F"
      : props.theme == "light"
      ? "#65CFBD"
      : colorAccentMain};
`;
const LottieContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Store = () => {
  const user = useSelector((state) => state.user?.currentUser);
  const theme = useSelector((state) => state.theme.mode);
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Check initial window size
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const getShops = async () => {
      try {
        const res = await newRequest.get(
          `/shop/shops-seller-view/${user?.idUSER}`
        );
        setShops(res.data);
        setLoading(true);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, [1000]);
      }
    };
    getShops();
  }, [user?.idUSER]);

  const handleDelete = async (id, status) => {
    try {
      if (status === "Open") {
        const response = await newRequest.delete(`/shop/delete/${id}`);
        if (response.status === 200) {
          alert("Shop Deleted successfully.");
        }
      } else {
        const response = await newRequest.delete(`/shop/refuse-shop/${id}`);
        if (response.status === 200) {
          alert("Shop refused successfully.");
        }
      }
    } catch (error) {
      console.error("Failed to refuse shop:", error);
      alert("Failed to refuse shop. Please try again later.");
    }
  };

  return (
    <Container>
      {shops != "" && !loading ? (
        shops.map((shop) => (
          <Link
            to={`/Shops/${shop.ShopID}`}
            style={{
              width: isMobile ? "100%" : "35%",
              height: isMobile ? "auto" : "200px",
            }}
            key={shop.ShopID}
          >
            <StoreProfile theme={theme}>
              <Shop theme={theme}>
                <Circle>
                  <LazyAvatar
                    src={shop.ShopImage}
                    sx={{
                      width: "100%",
                      height: "100%",
                      bgcolor: "transparent",
                    }}
                  />
                </Circle>
                <StorInfo theme={theme}>
                  <Name>{shop.ShopName}</Name>
                  <Products>Total Products: {shop.TotalProducts}</Products>
                </StorInfo>
                <IconButton
                  sx={{ float: "right", marginLeft: "auto", height: "40px" }}
                  onClick={() => handleDelete(shop.ShopID, shop.ShopStatus)}
                >
                  <DeleteIcon sx={{ color: "#E92F4A" }} />
                </IconButton>
              </Shop>
              <StaticContainer theme={theme}>
                <Stats>
                  <Title>Orders:</Title>
                  <Value>{shop.TotalOrders}</Value>
                </Stats>
                <Stats
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    borderLeft: `1px dashed ${
                      theme == "light"
                        ? grayBackground
                        : colorAccentMediumTransparent
                    }`,
                  }}
                >
                  <Status theme={theme} status={shop.ShopStatus}>
                    {shop.ShopStatus}
                  </Status>
                </Stats>
              </StaticContainer>
            </StoreProfile>
          </Link>
        ))
      ) : loading ? (
        <Loading />
      ) : (
        <LottieContainer>
          <Lottie animationData={me} style={{ width: "40%" }} />
        </LottieContainer>
      )}
    </Container>
  );
};

export default Store;
