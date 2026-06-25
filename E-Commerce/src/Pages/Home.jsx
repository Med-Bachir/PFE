import styled from "styled-components";
import Products from "../features/Products/Products.jsx";
import Side from "../Components/side.jsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../redux/category.js";
import ism from "./../assets/ecommerce.json";
import {
  colorAccentDarkTransparent,
  colorAccentLight,
  colorAccentMedium,
  colorBackgroundBlack,
  colorPrimaryBlack,
  grayBackground,
  lightSoftMain,
  main,
  primaryTextColor,
  whiteTextColor,
} from "../Colors.jsx";
import Lottie from "lottie-react";

// Styled Component

const All = styled.div``;
const MotherContainer = styled.div`
  transition: all 0.5s ease-in-out;
  filter: ${(props) => (props.open ? "brightness(80%)" : "")};
  width: 100%;
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-position: center;
  mix-blend-mode: multiply;
  background-color: ${(props) =>
    props.theme == "light" ? whiteTextColor : colorPrimaryBlack};
  transition: 200ms ease-in-out;
  @media (max-width: 768px) {
    text-align: center;
  }
`;

const Wrapper = styled.div`
  transition: 200ms ease-in-out;
  width: 100%;
  min-height: calc(100vh - 80px);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;
const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 100%;
  padding: 0 32px;
  color: ${(props) =>
  props.theme == "light" ? primaryTextColor : whiteTextColor};
  transition: 200ms ease-in-out;

  @media (max-width: 768px) {
    padding: 20px;
    width: 100%;
  }
`;
const SearchTitle = styled.h1`
  font-size: 48px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;
const SearchPara = styled.p`
  font-size: 17px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const SearchInputContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 600px;
  transition: 200ms ease-in-out;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

const SearchInput = styled.input`
  flex: 4;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  transition: 200ms ease-in-out;
  border: none;
  padding: 20px 10px;
  background-color: ${(props) =>
  props.theme == "light" ? grayBackground : colorAccentDarkTransparent};
  color: ${(props) =>
  props.theme == "light" ? primaryTextColor : whiteTextColor};
  // ON FOCUS
  &:focus {
    border: ${(props) =>
      props.theme == "light"
        ? `2px solid ${main}`
        : `2px solid ${colorAccentMedium}`};
    outline: none;
  }

  @media (max-width: 768px) {
    flex: unset;
    border-radius: 10px;
    margin-bottom: 10px;
  }
`;

const SearchButton = styled.button`
  flex: 1;
  border-radius: 0;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: ${(props) =>
  props.theme == "light" ? main : colorAccentMedium};
  color: ${whiteTextColor};
  font-weight: 600;
  font-size: 17px;
  cursor: pointer;
  border: 2px solid;
  border-color: ${(props) =>
  props.theme == "light" ? main : colorAccentMedium};
  padding: 20px 10px;
  transition: all 0.2s ease-in-out;
  // ON HOVER
  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    flex: unset;
    border-radius: 10px;
  }
`;

const ProductConatiner = styled.div`
  display: flex;
  background-color: ${(props) =>
  props.theme == "light" ? grayBackground : colorBackgroundBlack};
  transition: 200ms ease-in-out;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

// SideBarcontainer
const SideBarContainer = styled.div`
  height: calc(100vh - 80px);
  background-color: ${(props) =>
  props.theme == "light" ? whiteTextColor : colorPrimaryBlack};
  color: ${(props) =>
  props.theme == "light" ? primaryTextColor : whiteTextColor};
  position: sticky;
  top: 80px;
  flex: 0.25;

  @media (max-width: 768px) {
    position: static;
    height: auto;
    flex: unset;
  }
`;

// PRODUCTS CONTAINER

const ProductsContainer = styled.div`
  flex: 1;

  @media (max-width: 768px) {
    width: 100%;
  }
`;
const LottieContainer = styled.div`
  width: 40%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

// Body of PHomepage
const PHomepage = () => {
  const theme = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <All>
      <MotherContainer theme={theme}>
        <Container theme={theme}>
          <Wrapper theme={theme}>
            <SearchContainer theme={theme}>
              <SearchTitle>Shop your designer dresses</SearchTitle>
              <SearchPara>
                Ready to wear dresses tailored for you online. Hurry up while
                stock lasts.
              </SearchPara>
              <SearchInputContainer theme={theme}>
                <SearchInput
                  theme={theme}
                  placeholder="Search your product from here"
                ></SearchInput>
                <SearchButton theme={theme}>Search</SearchButton>
              </SearchInputContainer>
            </SearchContainer>
            <LottieContainer>
              <Lottie animationData={ism} style={{ width: "100%" }} />
            </LottieContainer>

            <div
              style={{
                width: "50%",
                height: "100%",
                position: "absolute",
                right: -50,
                bottom: -150,
                borderRadius: "80% 0 0 0",
                backgroundColor:
                theme == "light" ? lightSoftMain : colorAccentLight,
                zIndex: -1,
              }}
            />
          </Wrapper>
        </Container>

        <ProductConatiner theme={theme}>
          <SideBarContainer theme={theme}>
            <Side theme={theme} />
          </SideBarContainer>

          <ProductsContainer>
            <Products theme={theme} />
          </ProductsContainer>
        </ProductConatiner>
      </MotherContainer>
    </All>
  );
};

export default PHomepage;
