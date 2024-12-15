import { Skeleton } from '@mui/material';
import React from 'react'
import styled from 'styled-components';
import { colorBackgroundBlack, colorPrimaryBlack, grayBackground, whiteTextColor } from '../Colors';
import { useSelector } from 'react-redux';


const Item = styled.div`
  flex: 1;
  border: 1px solid ${props => props.theme == 'light' ? grayBackground : colorBackgroundBlack};
  
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
background-color: ${props => props.theme == 'light' ? whiteTextColor : props.color === "red"
      ? "#ff83831f"
      : props.color === "green"
      ? "#ff80d51f"
      : props.color === "blue"
      ? "#c06dff1f"
      : "#745eff1f"};
`;
const ItemIcon = styled.img`
  width: 60px;
  padding: 4px;
  border-radius: 4px;
  
background-color: ${props => props.theme == 'light' ? grayBackground : props.color};
  
  
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


const StaticsContainer = ({color , title , value , icon , loading }) => {
  const theme = useSelector((state) => state.theme.mode);

  return (
    <>
    {loading ?
    <Item theme={theme} >

      <Skeleton variant="rectangular" width={60} height={60} />
      <ItemInfo style={{width:'80%' }}>
        <ItemTitle style={{width:'100%'}} >
      <Skeleton variant="rectangular" width="80%" height={30} sx={{marginLeft:'auto'}}/>

        </ItemTitle>
        <ItemStatic>
      <Skeleton variant="rectangular" width={40} height={20} />

        </ItemStatic>
      </ItemInfo>
    </Item>
      :
      <Item theme={theme} color={color}>
      <ItemIcon theme={theme} src={icon} />
      <ItemInfo>
      <ItemTitle>{title}</ItemTitle>
      <ItemStatic>{value}</ItemStatic>
      </ItemInfo>
      </Item>
    }
    </>
  )
}

export default StaticsContainer
