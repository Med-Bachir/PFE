import React, { useState } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

import DashboardTwoToneIcon from "@mui/icons-material/DashboardTwoTone";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import StoreTwoToneIcon from "@mui/icons-material/StoreTwoTone";

import { useSelector } from "react-redux";
import { colorAccentMain, colorAccentSoftTransparent, colorBackgroundBlack, colorPrimaryBlack, grayBackground, lightSoftMain, main, primaryTextColor, secondaryTextColor, whiteTextColor } from "../../Colors";

const Menu = styled.div`
  width: 100%;
  padding: 24px 20px 12px;
  @media (max-width: 768px) {
    padding: 24px 10px 12px;
}
`;

const MenuTitle = styled.span`
  margin: 0px 12px 20px;
  font-size: 14px;
  font-weight: 500;
  display: ${(props) => (props.open ? `block` : `none`)};
  color: ${secondaryTextColor};
`;

const MenuItems = styled.div`
  margin-top: ${(props) => (props.open ? `12px` : `0`)};
  display: flex;
  flex-direction:column;
  gap: 0px;
  
 
`;

const Item = styled.div`
  display: flex;
  width:100%;
  padding: ${(props) => (props.open ? `8px 12px` : `8px 8px`)};
  align-items: center;
  transition: 200ms;
  border-radius: 8px;
  gap: 15px;
  font-weight: ${(props) => (props.isOpen ? `800` : `100`)};
  background-color: ${(props) => (props.isOpen ? props.theme == 'light' ? grayBackground : colorBackgroundBlack : "")};
  color:${props => props.theme == 'light' ? primaryTextColor : whiteTextColor};

  &:hover {
    color: ${main};
    background-color: ${props => props.theme == "light" ? grayBackground : colorBackgroundBlack};
  }
`;

const ItemTitle = styled.span`
  font-weight: 400;
  font-size: 14px;
  display: ${(props) => (props.open ? `flex` : `none`)};
  align-items: center;
  width:100%;
  
`;

const DropDownMenu = styled.div`
  padding: 0 24px;
  margin: 0 10px 0 10px;
  
  contain: paint;
  z-index: 2;
  background-color: ${(props) => (props.drawer ? props.theme =='light' ? lightSoftMain : colorAccentSoftTransparent  : props.theme == "light" ? whiteTextColor : colorPrimaryBlack)};
  margin: ${(props) => (props.drawer ? "" : "-15px 61px")};
  box-shadow: ${(props) =>
    props.drawer
      ? ""
      : " rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"};
  height: ${(props) =>
    props.open && props.drawer
      ? "90px"
      : props.open && !props.drawer
      ? "70px"
      : "0"};
  transition: 500ms all;
  border-radius: 4px;
  position: ${(props) => (props.drawer ? "relative" : "absolute")};
`;

const Line = styled.span`
  border: 1px dashed #9c9c9c5c;
  display: ${(props) => (props.open ? "" : "none")};
  width: 24px;
  height: 1px;
  
`;


const DropItem = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px 0;
  border-left: ${(props) => (props.open ? "1px dashed #9c9c9c5c " : "none")};
  transition: 500ms;
  color: ${(props) => (props.drawer ? props.theme =='light' ? lightSoftMain : colorAccentSoftTransparent  : props.theme == "light" ? whiteTextColor : colorPrimaryBlack)};

`;

const DropLine = styled.span`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const MenuL = ({ title, link, itemIcon , subTitle, dropList, menuList,dropHeight,isDrop }) => {
  
  const Location = useLocation().pathname.split("/");
  console.log(Location)
  const open = useSelector((state) => state.cart.open);
  const theme = useSelector((state) => state.theme.mode);

  const [dropdownState, setDropdownState] = useState({
    shops: false,
    refunds: false,
    users: false,
  });
  const isShop = true;

  
  const toggleDropdown = (dropdown) => {
    setDropdownState({
      ...dropdownState,
      [dropdown]: !dropdownState[dropdown],
    });
  };

  return (
    <>
      {!isDrop ? (
        <Menu>
          <MenuTitle open={open}>{title}</MenuTitle>
          {menuList.map((item) => (

            <Link to={item.menuLink}>
            <MenuItems open={open}>
              <Item
              theme={theme}
                open={open}
                style={{
                  backgroundColor: `${title == 'MENU' ? `${
                    Location[1] === '' ? theme == "light" ? lightSoftMain : colorAccentSoftTransparent : ""
                  }` :  `${
                    Location[1] + (Location[2] == null ? '' : '/' + Location[2]) === `${item.menuLink}` ? theme == "light" ? lightSoftMain : colorAccentSoftTransparent : ""
                  }` }`,
                  color: `${title == 'MENU' ? `${
                    Location[1] === '' ? theme == "light" ? main : colorAccentMain : ""
                  }` : `${
                   Location[1] + (Location[2] == null ? '' : '/' + Location[2]) === `${item.menuLink}` ? theme == "light" ? main : colorAccentMain : ""
                  }`}`,
                }}
                >
                {item.menuIcon}
                <ItemTitle theme={theme} open={open}>{item.menuItemName}</ItemTitle>
              </Item>
            </MenuItems>
          </Link>
            ))}
        </Menu>
      ) :  (
        <Menu>
          <MenuTitle open={open}>{title}</MenuTitle>
          {menuList.map((item) => (
            <Link to={item.menuLink}>
              <MenuItems>
                <Item
                theme={theme}
                  open={open}
                  style={{
                    backgroundColor: `${
                      Location[1] + (Location[2] == null ? '' : '/' + Location[2]) == `${item.menuLink}` ? theme == "light" ? lightSoftMain : colorAccentSoftTransparent : ""
                    }`,
                    color: `${Location[1] + (Location[2] == null ? '' : '/' + Location[2]) == `${item.menuLink}` ? theme == "light" ? main : colorAccentMain : ""}`,
                  }}
                >
                  {item.menuIcon}

                  <ItemTitle open={open}>{item.menuItemName}</ItemTitle>
                </Item>
              </MenuItems>
            </Link>
          ))}
          {isShop || subTitle != 'Refunds' ? <MenuItems>
            <Item
                theme={theme}

              onClick={() => toggleDropdown("shops")}
              open={open}
              isOpen={dropdownState.shops}
            >
              {itemIcon}
              <ItemTitle open={open}>
                {subTitle}{" "}
                {dropdownState.shops ? (
                  <KeyboardArrowRightIcon style={{ marginLeft:`auto`  }} />
                ) : (
                  <KeyboardArrowDownIcon style={{ marginLeft: `auto` }} />
                )}{" "}
              </ItemTitle>
            </Item>

            <DropDownMenu
            theme={theme}
              drawer={open}
              open={dropdownState.shops}
              onClick={() => toggleDropdown("shops")}
              style={{
                height: `${
                  open && dropdownState.shops
                    ? dropHeight[0]
                    : !open && dropdownState.shops
                    ? dropHeight[1]
                    : "0"}`,
                    
              }}
            >
              <DropItem theme={theme} open={open}>
                {dropList.map((item) => 
                  (
                  <DropLine>
                    {" "}
                    <Line open={open} />{" "}
                    <Link
                      style={{
                        fontSize: 14,
                        color: `${
                          Location[1] === `${item.dropLink.split('/')[0]}` ? theme == "light" ? main : colorAccentMain : theme == "light" ? primaryTextColor : whiteTextColor
                        }`,
                        
                      }}
                      to={`${item.dropLink}`}
                    >
                      {item.dropTitle}
                    </Link>
                  </DropLine>
                ))}
                
              </DropItem>
            </DropDownMenu>
          </MenuItems> : ''}
          
        </Menu>
      )}
    </>
  );
};

export default MenuL;
