import { Avatar, Divider, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import DoneTwoToneIcon from "@mui/icons-material/DoneTwoTone";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";


const Table = styled.table`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Row = styled.tr`
  display: flex;
  justify-content: space-between;
  height: 50px;
  margin: 5px 0;
  align-items: center;
  background-color: ${(props) =>
  props.type === "tag" ? `#0e0037` : `#f8f8f85a`};
`;
const ColumnTag = styled.td`
  flex: 2;
  color: ${(props) => (props.type === "tag" ? `#0e0037` : `#eeeeee`)};
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
  color: #0e0037;
  font-weight: 300;
  padding: 5px 10px;
`;
const ColumnInfo = styled.th`
  color: #000000;
  font-weight: 300;
  width: 80px;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
  background-color: ${(props) =>
    props.status === "Active"
      ? "#E0FAF6"
      : props.status === "Closed"
      ? "#FFE6EC"
      : "#FFF2E6"};
  color: ${(props) =>
    props.status === "Active"
      ? "#65CFBD"
      : props.status === "Closed"
      ? "#FF003F"
      : "#FF7F00"};
`;

const ShopeRequest = ({shop}) => {
  
 
  return (
    <Table>
      <Row type={"tag"}>
        <ColumnTag>Brand name</ColumnTag>
        <ColumnTag>Store Owner</ColumnTag>
        <ColumnTag>Status</ColumnTag>

        <ColumnTag style={{ border: "none", flex: 1 }}>Action</ColumnTag>
      </Row>
      {shop?.map((item) => (
        <>
          <Row key={item.ShopID} type={"normal"}>
            <Column>
              <ColumnInfo
                style={{
                  display: "flex",
                  backgroundColor: "transparent",
                  width: "100%",
                  alignItems: "center",
                  gap: 8,
                  color: "#0e0037",
                }}
              >
                <Avatar src={item.ShopImage} sx={{ width: 35, height: 35 }} />
                {item.ShopName}
              </ColumnInfo>
            </Column>
            <Column>Mr.{item.OwnerName}</Column>
            <Column style={{ alignItems: "center" }}>
              <ColumnInfo status={item.ShopStatus}>{item.ShopStatus}</ColumnInfo>
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
                      <DeleteIcon sx={{ color: "#E92F4A" }} />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <IconButton>
                      <DoneTwoToneIcon sx={{ color: "#007FFF" }} />
                    </IconButton>
                    <IconButton>
                      <CloseTwoToneIcon sx={{ color: "#E92F4A" }} />
                    </IconButton>
                  </>
                )}
              </ColumnInfo>
            </Column>
          </Row>
          <Divider />
        </>
      ))}
    </Table>
  );
};

export default ShopeRequest;
