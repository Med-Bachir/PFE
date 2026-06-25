import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { colorAccentMain, elementGrayBackground, lightMain, primaryTextColor, secondaryTextColor, softMain } from "../../Colors";
import newRequest from "../../utils/newRequest";



const AttributeContain = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  gap: 8px;
`;
const Attribute = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin: 10px 0;
`;
const AttributeName = styled.span`
  font-size: 18px;
  color: ${props => props.theme == "light" ? primaryTextColor : elementGrayBackground};

`;
const AttributeValue = styled.span`
  font-size: 16px;
  color: ${secondaryTextColor};
`;
const ColorContainer = styled.div`
  display: flex;
  height: 50px;
  align-items: center;
  gap: 8px;
`;
const ColorT = styled.span`
  font-weight: 500;
  margin-right: 20px;
`;
const ColorDot = styled.span`
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
`;
const Color = styled.div`
  background-color: ${(props) => props.color};
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  border: ${({ isSelected , theme }) =>
    isSelected ? `2px solid ${theme == "light" ? softMain : colorAccentMain}` : "none"};
  opacity: ${({ isSelected }) => (isSelected ? "1" : "0.7")};
  &:hover {
    opacity: 1;
  }
  transition: 200ms ease-in-out;
`;
const SizeContainer = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
`;
const SizeT = styled.span`
  margin-right: 30px;
`;
const Size = styled.span`
  border: 1px solid ${lightMain};
  padding: 7px 15px;
  border-radius: 20px;
  margin-right: 10px;
  cursor: pointer;
  color: ${(props) => (props.isSelected ? props.theme == "light" ? main : colorAccentMain: props.theme == "light" ? primaryTextColor : elementGrayBackground)};
  background-color: ${(props) => (props.isSelected ? lightMain : "")};
  transition: 200ms ease-in-out;
`;

const AttributeContainer = ({ theme, product, selectedAttributes, handleAttributes , Location }) => {
  const [categoryConfig, setCategoryConfig] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await newRequest.get(`/products/product/${Location}`);
        const product = res.data;

        // Generate dynamic category configuration
        const fields = Object.entries(product.attributes).map(([key, value]) => {
          const isSplit = value.includes(",");
          const type = ["color", "size" , 'weight' , 'colors' , 'dimension'].includes(key.toLowerCase())
            ? key.toLowerCase()
            : "default";

          return {
            key,
            label: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize key
            type,
            split: isSplit,
            suffix: type === "size" || type === "Weight" ? " " : undefined,
          };
        });

        setCategoryConfig({
          fields,
        });

   
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    getProduct();
  }, [Location]);

  if (!product || !categoryConfig) return null;

  return (
    <AttributeContain theme={theme}>
      {categoryConfig?.fields?.map((field) => {
        const value = product?.attributes?.[field.key];
        if (!value) return null;

        if (field.type === "colors") {
          const colors = field.split ? value.split(",") : [value];
          return (
            <ColorContainer key={field.key}>
              <ColorT>{field.label}</ColorT>
              {colors.map((color, index) => (
                <ColorDot
                  key={index}
                  onClick={() => handleAttributes(field.type, color)}
                >
                  <Color
                    theme={theme}
                    color={color}
                    isSelected={color === selectedAttributes?.[field?.type]}
                  />
                </ColorDot>
              ))}
            </ColorContainer>
          );
        }

        if (field.type === "size" || field.type === "weight" || field.type === "dimension" ) {
          const sizes = field.split ? value.split(",") : [value];
          return (
            <SizeContainer key={field.key}>
              <SizeT>{field.label}</SizeT>
              {sizes.map((size, index) => (
                <Size
                  key={index}
                  theme={theme}
                  isSelected={size === selectedAttributes?.[field?.type]}
                  onClick={() => handleAttributes(field.type, size)}
                >
                  {size} {field.suffix || ""}
                </Size>
              ))}
            </SizeContainer>
          );
        }

        return (
          <Attribute theme={theme} key={field.key}>
            <AttributeName theme={theme}>{field.label}:</AttributeName>
            <AttributeValue theme={theme}>
              {value} {field.suffix || ""}
            </AttributeValue>
          </Attribute>
        );
      })}
    </AttributeContain>
  );
};

export default AttributeContainer;
