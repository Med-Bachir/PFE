import Product from "../../Components/Product.jsx";
import styled from "styled-components";
import { useEffect, useState } from "react";
import newRequest from "../../utils/newRequest.js";
import { useSelector} from "react-redux";


//styled components
const Container = styled.div`
padding: 10px;
 display: grid;
  gap: 20px;
background-color: #eee;
  // Conditionally set the number of columns based on props
  grid-template-columns: repeat(4, 1fr);


width: calc(100vw - 64px);
  
  
`;

//Http Request "get all product from shop"
const FilterProduct = () => {
  
  const state = useSelector((state) => state.caty) || "default-category"; // Default category name
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);

  console.log(state)
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await newRequest.get("/products/products-with-categories");
        setProducts(res.data);
      } catch (error) {
        console.log("error", error);
      }
    };

    getProducts();
  }, []);

  useEffect(() => {
    const getFilterProducts = async () => {
      try {
        if (state) {
          let res;
          if (state.categoryName && state.subName && state.typeName) {
            res = await newRequest.get(`/products/${state.categoryName}/${state.subName}/${state.typeName}`);
          } else if (state.categoryName &&  state.subName ) {
            res = await newRequest.get(`/products/${state.categoryName}/${state.subName}`);
          } else if (state.categoryName) {
            res = await newRequest.get(`/products/${state.categoryName}`);
          }
  
          if (res) {
            setFilterProducts(res.data);
          }
        } else {
          setFilterProducts(products);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    getFilterProducts();
  }, [state, products]);


  

  return (
    <Container>
      {state?.products.map((item) => (
        <Product
          key={item?.idPRODUCT}
          id={item?.idPRODUCT}
          productimage={item?.productimage}
          productname={item.productname}
          productprice={item.productprice}
          discount={item.discount}
        />
      ))}
    </Container>
  );
};

export default FilterProduct;
