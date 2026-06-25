import { Avatar, Divider, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import DoneTwoToneIcon from "@mui/icons-material/DoneTwoTone";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import me from "../../../assets/Lotties/Animation - 1716145973359.json"

import Lottie from "lottie-react";
import Loading from "../../../Components/Pending/Loading";
import { colorAccentDark, colorAccentDarkTransparent, colorAccentMain, colorAccentMediumTransparent, colorAccentSoftTransparent, colorBackgroundBlack, colorErrorDark, colorErrorSoft, colorPrimaryBlack, colorWarningDark, colorWarningSoft, darkOrange, darkRed, lightSoftMain, main, primaryTextColor, softOrange, softRed, whiteTextColor } from "../../../Colors";
import { useSelector } from "react-redux";



const Table = styled.table`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
 
overflow: auto;
`;
const Row = styled.tr`
  display: flex;
  justify-content: space-between;
  height: 50px;
padding: 5px 0;
  align-items: center;
  background-color: ${(props) =>
  props.type === "tag" ? props.theme == "light" ? main : colorAccentDark : props.theme == "light" ? whiteTextColor : colorAccentDarkTransparent};
   @media (max-width: 768px) {
  min-width: 100vh;
}
`;
const ColumnTag = styled.td`
  flex: 2;
  color: ${(props) => (props.type === "tag" ? main : whiteTextColor)};
  font-weight: 300;
  padding-left: 10px;
  border-right: 1px solid white;
  text-align:center;
`;
const Column = styled.th`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.type === "tag" ? main : props.theme == 'light' ? primaryTextColor : whiteTextColor  )};

  font-weight: 300;
  padding: 5px 10px;
`;
const ColumnInfo = styled.th`
    color: ${(props) => (props.type === "tag" ? main : props.theme == 'light' ? primaryTextColor : whiteTextColor  )};

  font-weight: 300;
  width: 80px;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
  background-color: ${(props) =>
    props.status === "Active"
      ? props.theme == "light" ? lightSoftMain : colorAccentDarkTransparent
      : props.status === "Closed"
      ? props.theme == "light" ? softRed :  colorErrorSoft
      : props.theme == "light" ? softOrange : colorWarningSoft};
  color: ${(props) =>
    props.status === "Active"
      ? props.theme == "light" ? main : colorAccentMain
      : props.status === "Closed"
      ?props.theme == "light" ?  darkRed  : colorErrorDark
      :props.theme == "light" ? darkOrange : colorWarningDark};
`;

const LottieContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
background-color: ${({theme}) => theme == "light" ? whiteTextColor : colorAccentDarkTransparent};
border-radius: 8px;
margin-bottom: 20px;
`;

const ShopeRequest = ({shop , loading}) => {
  const theme = useSelector(state => state.theme.mode)
 
  return (
    <Table >
      <Row theme={theme} type={"tag"}>
        <ColumnTag>Brand name</ColumnTag>
        <ColumnTag>Store Owner</ColumnTag>
        <ColumnTag>Status</ColumnTag>

        <ColumnTag style={{ border: "none", flex: 1 }}>Action</ColumnTag>
      </Row>
      {shop != "" && !loading ? shop?.map((item) => (
        <>
          <Row theme={theme} key={item.ShopID} type={"normal"}>
            <Column>
              <ColumnInfo
              theme={theme}
                style={{
                  display: "flex",
                  backgroundColor: "transparent",
                  width: "100%",
                  alignItems: "center",
                  gap: 8,
                  color: theme == 'light' ? primaryTextColor : whiteTextColor,
                }}
              >
                <Avatar src={item.ShopImage} sx={{ width: 35, height: 35 }} />
                {item.ShopName}
              </ColumnInfo>
            </Column>
              
            <Column  theme={theme} >Mr.{item.OwnerName}</Column>
            <Column style={{ alignItems: "center" }}>
              <ColumnInfo theme={theme} status={item.ShopStatus}>{item.ShopStatus}</ColumnInfo>
            </Column>

            <Column style={{ border: "none", flex: 1 }} key={item.ShopID}>
              <ColumnInfo
                style={{
                  display: "flex",
                  backgroundColor: "transparent",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                {item.ShopStatus == "Active" ? (
                  <>
                    <IconButton>
                      <VisibilityTwoToneIcon sx={{ color: "#007FFF" }} />
                    </IconButton>
                    <IconButton>
                      <DeleteIcon sx={{ color: darkRed }} />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <IconButton>
                      <DoneTwoToneIcon sx={{ color: "#007FFF" }} />
                    </IconButton>
                    <IconButton>
                      <CloseTwoToneIcon sx={{ color: darkRed }} />
                    </IconButton>
                  </>
                )}
              </ColumnInfo>
            </Column>
          </Row>
          
        </>
      ))
    :   loading ? <Loading /> :
    <LottieContainer theme={theme}>
            <Lottie  animationData={me} style={{ width:"20%"}} /> 
            No Shop Request Found
            </LottieContainer> 
            }
    </Table>
  );
};

export default ShopeRequest;
