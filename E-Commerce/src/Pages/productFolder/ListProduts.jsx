import Anouncement from "../../Component/Announcment";
import Footer from "../../Component/Footer";
import Navbar from "../../Component/Navbar";

import Products from "./Products";
import styled from "styled-components";

const Container = styled.div``;
const Title = styled.h1`
  margin: 20px;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px;
`;
const Filter = styled.div``;

const FilterText = styled.span`
  font-weight: 600;
  font-size: 18px;
`;
const Select = styled.select`
  padding: 10px;
  margin-left: 10px;
`;
const Option = styled.option``;

const ProductList = () => {
  return (
    <>
      <Navbar />
      <Anouncement />
      <Title>Dresses</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select>
            <Option disabled selected>
              Color
            </Option>
            <Option>White</Option>
            <Option>Black</Option>
            <Option>Red</Option>
            <Option>Blue</Option>
            <Option>Yellow</Option>
            <Option>Green</Option>
          </Select>
          <Select>
            <Option disabled selected>
              Size
            </Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>

          <Select>
            <Option selected>Newest</Option>
            <Option>Price (asc)</Option>
            <Option>Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Container>
        <Products />

        <Footer />
      </Container>
    </>
  );
};

export default ProductList;
