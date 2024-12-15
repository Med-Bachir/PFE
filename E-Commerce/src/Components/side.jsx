import { useEffect, useState } from "react";
import styled from "styled-components";
import newRequest from "../utils/newRequest";
import { useDispatch } from "react-redux";
import { categoryName, subName, typeName } from "../redux/category";
import { Divider } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { colorAccentDarkTransparent, colorAccentLight, colorAccentMain, colorAccentMediumTransparent, colorAccentSoftTransparent, colorAccentTransparent, colorBackgroundBlack, colorElementBackgroundGray, grayBackground, lightMain, main, primaryTextColor, secondaryTextColor, whiteTextColor } from "../Colors";
const Container = styled.div``;

const Title = styled.span`
  font-size: 18px;
  font-weight: 400;
  color: ${secondaryTextColor};
`;

const Category = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  contain: paint;
  padding: 12px 10px;
  max-height: ${({ open }) => (open ? "500px" : "50px")};
  overflow: hidden;
  transition: max-height 0.5s ease-in-out;
`;

const SubCategory = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 0px 0 20px;
  gap: 4px;
  max-height: ${({ open }) => (open ? "500px" : "40px")};
  contain: paint;
  transition: max-height 0.4s ease-in-out;
`;

const Information = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 10px;
  border-radius: 8px;
  cursor: pointer;
background-color: ${props => props.open ? props.theme == 'light' ? lightMain :  colorAccentDarkTransparent :  ""};
color: ${props => props.open ? props.theme == 'light' ?  main : colorAccentMain : ''};
  &:hover {
    background-color: ${props => props.theme == 'light' ? grayBackground : colorElementBackgroundGray};
    color: ${props => props.theme == 'light' ? primaryTextColor : whiteTextColor};

  }

  transition: 200ms ease-in-out;

  @media (max-width: 768px) {
    padding: 8px;
  }
`;

const Type = styled.div`
  padding: 0px 0px 0 20px;
`;

const Icon = styled.img`
  width: 25px;
  height: 25px;
  filter: ${props => props.theme === "light" ? "brightness(1) invert(0)" : "brightness(0) invert(1)"};

  //filter: brightness(0) invert(1); /* Works for solid white backgrounds */
  filter: ${props => props.open ? "brightness(0) invert(0.28) sepia(1) saturate(1000%) hue-rotate(160deg);" : ""} ;


  @media (max-width: 768px) {
    width: 20px;
    height: 20px;
  }
`;

const Name = styled.div`
  font-size: 16px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

// Responsive Enhancements
const DividerStyled = styled(Divider)`
  margin-top: 12px !important;
  @media (max-width: 768px) {
    margin-top: 8px !important;
  }
`;

const Side = ({theme}) => {
  const [categories, setCategories] = useState([]);
  const [openCategoryId, setOpenCategoryId] = useState(null);
  const [openSubcategoryId, setOpenSubcategoryId] = useState(null);
  const [openTypeId, setOpenTypeId] = useState(null);
  const queryClient = useQueryClient();
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
    setOpenSubcategoryId(
      openSubcategoryId === subcategoryId ? null : subcategoryId
    );
  };
  const handleTypeClick = (typeId) => {
    setOpenTypeId(
      openTypeId === typeId ? null : typeId
    );
  };

  const onClickFilter = (name, type) => {
    if (type === "") {
      dispatch(categoryName(""));
      dispatch(subName(""));
      dispatch(typeName(""));
      setOpenCategoryId('')
      setOpenSubcategoryId('')
      setOpenTypeId('')
    } else if (type === "category") {
      dispatch(categoryName(name));
      dispatch(subName(""));
      dispatch(typeName(""));
    } else if (type === "sub") {
      dispatch(subName(name));
      dispatch(typeName(""));
    } else {
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
      queryClient.invalidateQueries({ queryKey: ["filter"] });
    },
  });

  const handleAction = () => {
    mutation.mutate();
  };

  return (
    <Container>
      <Category>
        <Information theme={theme} onClick={() => onClickFilter("", "")}>
          <CategoryOutlinedIcon  />
          <Name>All</Name>
        </Information>
      </Category>
      <div style={{ padding: "0 20px", margin: "12px 0" }}>
        <Title>Filter</Title>
        <DividerStyled />
      </div>
      {categories.length > 0 ? (
        categories.map((category) => (
          <Category
            key={category.categoryname}
            open={openCategoryId === category.categoryname}
          >
            <Information
            theme={theme}
              onClick={() => {
                handleCategoryClick(category.categoryname);
                onClickFilter(category.categoryname, "category");
                handleAction();
              }}
            open={openCategoryId === category.categoryname}

            >
              <Icon theme={theme} open={openCategoryId === category.categoryname} src={category.icon} />
              <Name>{category.categoryname}</Name>
              <KeyboardArrowRightIcon
                sx={{
                  marginLeft: "auto",
                  rotate:
                    openCategoryId === category.categoryname ? "90deg" : "0",
                  transition: "0.4s ease-in-out",
                }}
              />
            </Information>
            {category.subcategories.map((sub) => (
              <SubCategory
                key={sub.subname}
                open={openSubcategoryId === sub.subname}
              >
                <Information
                theme={theme}
                  onClick={() => {
                    handleSubcategoryClick(sub.subname);
                    onClickFilter(sub.subname, "sub");
                  }}
                open={openSubcategoryId === sub.subname}

                >
                  <Icon theme={theme} open={openSubcategoryId === sub.subname} src={sub.subIcon} />
                  <Name>{sub.subname}</Name>
                  <KeyboardArrowRightIcon
                    sx={{
                      marginLeft: "auto",
                      rotate: openSubcategoryId === sub.subname ? "90deg" : "0",
                      transition: "0.4s ease-in-out",
                    }}
                  />
                </Information>
                {sub.types.map((type) => (
                  <Type key={type.name}>
                    <Information
                    theme={theme}
                    onClick={() => {onClickFilter(type.name, "type"),handleTypeClick(type.name) }}
                open={openTypeId === type.name}

                    >
                      <Icon theme={theme} open={openTypeId === type.name} src={type.icon} />
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
