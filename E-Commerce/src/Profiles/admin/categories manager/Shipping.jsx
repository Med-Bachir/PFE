import { Avatar, Divider, IconButton } from "@mui/material";
import React from "react";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import DoneTwoToneIcon from "@mui/icons-material/DoneTwoTone";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";

const data = [
  {
    key: "1",

    ShippingImage:
      "https://img.icons8.com/color/96/000000/motorcycle-delivery-single-box.png",
    Order: 10,
    ShippingPrice: "",
    Availability: "Available",
  },
  {
    key: "2",

    ShippingImage: "https://img.icons8.com/color/48/delivery--v1.png",
    Order: 10,
    ShippingPrice: 5,
    Availability: "Soon",
  },
];

import { StaticContainer, StaticTitle } from "../Dashboard";

export const Container = styled.div`
  padding: 0 32px;
  overflow-y: scroll;
  height: 500px;
`;

const Table = styled.table`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  contain: paint;
`;
const Row = styled.tr`
  display: flex;
  justify-content: space-between;
  height: 50px;
  margin: 0 0 10px;
  align-items: center;
  background-color: ${(props) =>
    props.type === "tag" ? `#cbfef42a` : `#f8f8f85a`};
`;
const ColumnTag = styled.td`
  flex: 1;
  color: #0e0037;
  font-weight: 300;
  text-align: center;
  border-right: 1px solid #cbcbcb;
`;
const Column = styled.th`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;

  color: #0e0037;
  font-weight: 300;
  padding: 0 8px;

  text-align: left;
`;
const ColumnInfo = styled.th`
  color: #000000;
  font-weight: 300;
  width: 80px;
  padding: 8px 0;
  display: flex;
  justify-content: center;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
  background-color: ${(props) =>
    props.status === "Available"
      ? "#E0FAF6"
      : props.status === "Soon"
      ? "#FFE6EC"
      : ""};
  color: ${(props) =>
    props.status === "Available"
      ? "#65CFBD"
      : props.status === "Soon"
      ? "#FF003F"
      : ""};
  width: ${(props) => (props.status ? "120px" : "")};
`;

const Shipping = () => {
  const ColumnsTag = ["ID", "Type", "Order", "Price", "Availability"];
  return (
    <Container>
      <StaticContainer
        style={{
          padding: "0 32px 0 0",
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <StaticTitle>Shipping </StaticTitle>
      </StaticContainer>

      <StaticContainer style={{ padding: "0", contain: "paint" }}>
        <Table>
          <Row type={"tag"}>
            {ColumnsTag.map((item) => (
              <ColumnTag>{item}</ColumnTag>
            ))}
            <ColumnTag style={{ border: "none", flex: 1 }}>Action</ColumnTag>
          </Row>
          {data.map((item) => (
            <>
              <Row key={item.key} type={"normal"}>
                <Column style={{ flex: 1, alignItems: "center" }}>
                  #{item.key}
                </Column>
                <Column>
                  <ColumnInfo style={{}}>
                    <Avatar
                      src={item.ShippingImage}
                      sx={{ width: 40, height: 40 }}
                    />
                  </ColumnInfo>
                </Column>

                <Column style={{ alignItems: "center", flex: 1 }}>
                  {item.Order}
                </Column>
                <Column style={{ alignItems: "center", flex: 1 }}>
                  {item.ShippingPrice == 0 ? "free" : "$" + item.ShippingPrice}
                </Column>
                <Column style={{ alignItems: "center", flex: 1 }}>
                  <ColumnInfo status={item.Availability}>
                    {item.Availability}
                  </ColumnInfo>
                </Column>

                <Column style={{ flex: 1 }} key={item.key}>
                  <ColumnInfo>
                    <>
                      <IconButton>
                        <VisibilityTwoToneIcon sx={{ color: "#007FFF" }} />
                      </IconButton>
                      <IconButton>
                        <DeleteIcon sx={{ color: "#E92F4A" }} />
                      </IconButton>
                    </>
                  </ColumnInfo>
                </Column>
              </Row>
              <Divider />
            </>
          ))}
        </Table>
      </StaticContainer>
    </Container>
  );
};

export default Shipping;
