import React from 'react'
import styled from 'styled-components';


const Item = styled.div`
  flex: 1;
  border: 1px solid #33333331;
  border-bottom: 4px solid 
    ${(props) =>
      props.color === "red"
        ? "#ff8383"
        : props.color === "green"
        ? "#ff80d5"
        : props.color === "blue"
        ? "#c06dff"
        : "#745eff"};

      
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32px 24px;
`;
const ItemIcon = styled.img`
  width: 60px;
  padding: 4px;
  border-radius: 4px;
  
`;
const ItemInfo = styled.div`
  display: flex;
  text-align: end;
  flex-direction: column;
  justify-content: space-between;
  align-items: end;
  gap: 8px;
`;

const ItemTitle = styled.span`
  color: gray;
`;
const ItemStatic = styled.span`
  font-weight: 600;
  font-size: 20px;
`;


const StaticsContainer = ({color , title , value , icon}) => {
  return (
    <Item color={color}>
    <ItemIcon src={icon} />
    <ItemInfo>
      <ItemTitle>{title}</ItemTitle>
      <ItemStatic>{value}</ItemStatic>
    </ItemInfo>
  </Item>
  )
}

export default StaticsContainer
