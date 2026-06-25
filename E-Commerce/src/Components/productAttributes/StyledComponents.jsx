import styled from "styled-components";
import { colorAccentDarkTransparent, colorAccentLight, colorAccentMain, elementGrayBackground, main, primaryTextColor, whiteTextColor } from "../../Colors";

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
  
`;
export const InputText = styled.input`
  padding: 14px 16px;
  outline: none;
  border-radius: 4px;
  background-color: ${({theme}) => theme == "light" ? whiteTextColor : colorAccentDarkTransparent};
  border: 1px solid ;
  border-color: ${({theme}) => theme == "light" ? elementGrayBackground : colorAccentLight};
  color: ${({theme}) => theme == "light" ? primaryTextColor : elementGrayBackground};

  &:focus , &:hover {
    border: 1px solid ;
    border-color: ${({theme}) => theme == "light" ? main : colorAccentMain};
  }
  transition: 200ms ease-in-out ;
`;