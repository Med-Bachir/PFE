import { useEffect, useState } from "react";
import styled from "styled-components";
import newRequest from "../utils/newRequest";
import { useDispatch } from "react-redux";
import { categoryName, subName, typeName } from "../redux/category";
import { Divider } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Container = styled.div`
  width: 288px;
;`
const Title = styled.span`
font-size: 20px;
font-weight: 500;
color: #9a9a9a;
`

const Category = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  contain: paint;
  padding: 12px 10px;
  
  max-height: ${({ open }) => (open ? '500px' : '50px')}; 
  overflow: hidden;
  transition: max-height 0.5s ease-in-out;
  
;`
const SubCategory = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 0px 0 20px;
  max-height: ${({ open }) => (open ? '500px' : '40px')}; 
  contain: paint;
  transition: max-height 0.4s ease-in-out;
;`
const Information = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius:8px;
  cursor: pointer;
  &:hover {
    background-color: #eeeeee61;
  }
  transition: 200ms ease-in-out;
;`
const Type = styled.div`
  padding: 0px 0px 0 20px;

;`
const Icon = styled.img`
  width: 25px;
  height: 25px;
;`
const Name = styled.div``;
const Side = () => {
  const [categories, setCategories] = useState([]);
  const [openCategoryId, setOpenCategoryId] = useState(null);
  const [openSubcategoryId, setOpenSubcategoryId] = useState(null);
  const [catName, setCatName] = useState("");
  const [subCatName, setSubCatName] = useState("");
  const [typename, setTypeName] = useState("");
  const [filter, setFilter] = useState(null);
const queryClient = useQueryClient()
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await newRequest.get(`/category/getallcat`);
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    getCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    setOpenCategoryId(openCategoryId === categoryId ? null : categoryId);
    setOpenSubcategoryId(null);
  };

  const handleSubcategoryClick = (subcategoryId) => {
    setOpenSubcategoryId(openSubcategoryId === subcategoryId ? null : subcategoryId);
  };

  const onClickFilter = (name, type) => {
    if(type === ""){
      setCatName("");
      dispatch(categoryName(""));
      setSubCatName("");
      dispatch(subName(""));
      setTypeName("");
      dispatch(typeName(""));
    }
    else if (type === "category") {
      setCatName(name);
      dispatch(categoryName(name));
      setSubCatName("");
      dispatch(subName(""));
      setTypeName("");
      dispatch(typeName(""));
    } else if (type === "sub") {
      setSubCatName(name);
      dispatch(subName(name));
      setTypeName("");
      dispatch(typeName(""));
    } else {
      setTypeName(name);
      dispatch(typeName(name));
    }

  };

  const mutation = useMutation({
    mutationFn: () =>
      new Promise((resolve) => {
        onClickFilter();
        resolve();
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['filter'] });
    },
  });
  
  
  const handleAction = () => {
    mutation.mutate()

  } 


  

  
  return (
    <Container>
      <Category>
        <Information onClick={() => onClickFilter("" , "")}>
          <CategoryOutlinedIcon />
          <Name>All</Name>
        </Information>
      </Category>
      <div style={{ padding: "0 20px", margin: "12px 0" }}>
        <Title>Filter</Title>
        <Divider sx={{ mt: 2 }} />
      </div>
      {categories.length > 0 ? (
        categories.map((category) => (
          <Category key={category.categoryname} open={openCategoryId === category.categoryname}>
            <Information onClick={() => { handleCategoryClick(category.categoryname); onClickFilter(category.categoryname, "category"); handleAction() }}>
              <Icon src={category.icon} />
              <Name>{category.categoryname}</Name>
              <KeyboardArrowRightIcon sx={{ marginLeft: "auto", rotate: openCategoryId === category.categoryname ? "90deg" : "0", transition: "0.4s ease-in-out" }} />
            </Information>
            {category.subcategories.map((sub) => (
              <SubCategory key={sub.subname} open={openSubcategoryId === sub.subname}>
                <Information onClick={() => { handleSubcategoryClick(sub.subname); onClickFilter(sub.subname, "sub"); }}>
                  <Icon src={sub.subIcon} />
                  <Name>{sub.subname}</Name>
                  <KeyboardArrowRightIcon sx={{ marginLeft: "auto", rotate: openSubcategoryId === sub.subname ? "90deg" : "0", transition: "0.4s ease-in-out" }} />
                </Information>
                {sub.types.map((type) => (
                  <Type key={type.name}>
                    <Information onClick={() => onClickFilter(type.name, "type")}>
                      <Icon src={type.icon} />
                      <Name>{type.name}</Name>
                    </Information>
                  </Type>
                ))}
              </SubCategory>
            ))}
          </Category>
        ))
      ) : (
        <p>No categories available</p>
      )}
    </Container>
  );
};

export default Side;
