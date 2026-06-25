import React, { useEffect, useState } from "react";
import ProductList from "./ProductList";
import { Fab, Tooltip, Pagination, Box } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import newRequest from "../../../utils/newRequest";
import { colorAccentDarkTransparent, colorAccentMain, colorPrimaryBlack, lightMain, main, primaryTextColor, whiteTextColor } from "../../../Colors";
import SearchComponent from "../../../features/Search";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 32px;
  gap: 20px;
  height: calc(100vh - 80px);
`;

const StaticContainer = styled.div`
  background-color: ${({ theme }) => (theme === "light" ? whiteTextColor : colorPrimaryBlack)};
  width: 100%;
  max-height: calc(100vh - 144px);
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(147, 147, 147, 0.543);
    border-radius: 20px;
  }
`;

const Products = () => {
  const user = useSelector((state) => state.user?.currentUser);
  const theme = useSelector((state) => state.theme.mode);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of shops per page
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(null);
  const [filteredRows, setFilteredRows] = useState([]);

  const getProducts = async () => {
    let res;
    try {
      if (user?.userRole === "admin") {
        res = await newRequest.get(`/products/all-products`);
      } else {
        res = await newRequest.get(`/products/seller-products/${user?.idUSER}`);
      }
      setProducts(res.data);
      setFilteredRows(res.data);
      setLoading(true);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleSearchResults = (rows) => {
    setFilteredRows(rows);
    setCurrentPage(1); // Reset to first page on search
  };

  const totalPages = Math.ceil(filteredRows.length / itemsPerPage);
  const paginatedData = filteredRows.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Container>
      <StaticContainer theme={theme} style={{padding:'20px 20px 20px 0', display:'flex',alignItems:'center' , flexDirection:'row' , justifyContent:'space-between' , borderRadius:8 }}>
          <SearchComponent data={products} onSearch={handleSearchResults} type="Products" />
        </StaticContainer>
        <StaticContainer theme={theme} style={{ borderRadius: 4 }}>
          <ProductList productData={paginatedData} loading={loading} />
        </StaticContainer>
        <Box sx={{display:'flex' , alignContent:'center' , justifyContent:'center'}}>

         <Pagination
               count={Math.ceil((filteredRows?.length > 0 ? filteredRows?.length : products?.length) / itemsPerPage)}
               page={currentPage}
               onChange={handlePageChange}
               sx={{
                 ".css-yuzg60-MuiButtonBase-root-MuiPaginationItem-root": {
                   backgroundColor: theme === 'light' ? lightMain : colorAccentDarkTransparent,
                   color: theme === "light" ? main : colorAccentMain
                  },
                  ".css-yuzg60-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected" : {
                    backgroundColor: theme === 'light' ? main : colorAccentMain,
                    color: whiteTextColor 
                  }
                }}
                />
            </Box>
        <Link  to="Add">
          <Tooltip title="Add Product">
            <Fab
              aria-label="add"
              sx={{
                bgcolor: main,
                position: "absolute",
                bottom: 120,
                right: 50,
                "@media (max-width: 768px)": { bottom: 92, right: 8 },
              }}
            >
              <AddShoppingCartIcon sx={{ color: whiteTextColor, "&:hover": { color: primaryTextColor } }} />
            </Fab>
          </Tooltip>
        </Link>
      </Container>
    </>
  );
};

export default Products;
