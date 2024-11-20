import styled from "styled-components";
import Products from "./Products.jsx";
import Side from "../../Components/side.jsx";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { reset } from "../../redux/category.js";

//Styled Component

const All = styled.div``;
const MotherContainer = styled.div`


  transition: all 0.5s ease-in-out;
  filter: ${(props) => (props.open ? "brightness(80%)" : "")};
`;

const Container = styled.div`

  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("https://pickbazar-graphql.redq.io/_next/image?url=https%3A%2F%2Fpickbazarlaravel.s3.ap-southeast-1.amazonaws.com%2F908%2Fcloths.png&w=1920&q=75");
  background-size: cover;
  background-position: center;
  background-color: #eee;
  
`;
const Wrapper = styled.div`
  height: calc(100vh - 80px);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;

  height: 100%;
`;
const SearchTitle = styled.h1`
  font-size: 48px;
  margin-bottom: 20px;
  color: black;
`;
const SearchPara = styled.p`
  color: black;
  font-size: 17px;
  margin-bottom: 30px;
`;
const SearchInputContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
const SearchInput = styled.input`
  flex: 4;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  border: none;
  &:focus {
    outline-color: #009f7f;
  }
  padding: 20px 10px;
`;
const SearchButton = styled.button`
  flex: 1;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: #009f7f;
  color: white;
  font-weight: 600;
  font-size: 17px;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease-in-out;
  &:hover {
    opacity: 0.9;
  }
`;

const ProductConatiner = styled.div`
  display: flex;
  background-color: #eee;
`;

//SideBarcontainer
const SideBarContainer = styled.div`
  height: calc(100vh - 80px);
  background-color: white;
  position: sticky;
  top: 80px;
`;

//Body of PHomepage
const PHomepage = () => {
const dispatch = useDispatch();
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);
  return (
    <All>
      <MotherContainer>
        <Container>
          <Wrapper>
            <SearchContainer>
              <SearchTitle>Shop your designer dresses</SearchTitle>
              <SearchPara>
                Ready to wear dresses tailored for you online. Hurry up while
                stock lasts.
              </SearchPara>
              <SearchInputContainer>
                <SearchInput placeholder="Search your product from here"></SearchInput>
                <SearchButton>search</SearchButton>
              </SearchInputContainer>
            </SearchContainer>
          </Wrapper>
        </Container>

        <ProductConatiner>
          <SideBarContainer>
            <Side />
          </SideBarContainer>

          <Products />
        </ProductConatiner>
      </MotherContainer>
    </All>
  );
};

export default PHomepage;
