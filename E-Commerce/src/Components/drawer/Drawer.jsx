import React, { useEffect, useState } from "react";
import {
  Avatar,
  Badge,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";

import logo from "../../assets/logo.png";

import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/apiCalls";

import styled from "styled-components";
import MenuIcon from "@mui/icons-material/Menu";
import AddBusinessTwoToneIcon from "@mui/icons-material/AddBusinessTwoTone";
import SearchIcon from "@mui/icons-material/Search";
import { Link, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { OpenDrawer } from "../../redux/drawer";
import LocalShippingTwoToneIcon from "@mui/icons-material/LocalShippingTwoTone";
import MenuL from "./Menu";
import StoreIcon from "@mui/icons-material/Store";
import ThumbDownOffAltTwoToneIcon from "@mui/icons-material/ThumbDownOffAltTwoTone";
import GroupsTwoToneIcon from "@mui/icons-material/GroupsTwoTone";
import DashboardTwoTone from "@mui/icons-material/DashboardTwoTone";
import InboxIcon from "@mui/icons-material/Inbox";
import { LogoutOutlined, StopTwoTone } from "@ant-design/icons";
import StoreTwoToneIcon from "@mui/icons-material/StoreTwoTone";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import CategoryTwoToneIcon from "@mui/icons-material/CategoryTwoTone";
import Inventory2TwoToneIcon from "@mui/icons-material/Inventory2TwoTone";
import RemoveRedEyeTwoToneIcon from "@mui/icons-material/RemoveRedEyeTwoTone";

import SettingsTwoTone from "@mui/icons-material/SettingsTwoTone";

import HourglassBottomTwoToneIcon from "@mui/icons-material/HourglassBottomTwoTone";
import AccountTreeTwoToneIcon from "@mui/icons-material/AccountTreeTwoTone";
import Lottie from "lottie-react";
import me from "../../emptyNotification.json";
import newRequest from "../../utils/newRequest";
import AlertMessage from "../Alert";
import {
  colorBackgroundBlack,
  colorPrimaryBlack,
  grayBackground,
  lightSoftMain,
  primaryTextColor,
  secondaryTextColor,
  whiteTextColor,
} from "../../Colors";
import Switcher from "../switcher/ThemeSwitcher";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const DrawerHeader = styled.div`
  width: 100%;
  height: 80px;
  position: fixed;
  display: flex;

  padding: ${(props) => (props.open ? `0 32px 0 0` : `0 32px 0 0px`)};
  align-items: center;
  right: 0;
  background-color: ${props => props.theme == "light" ? whiteTextColor : colorPrimaryBlack };
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
 
`;

const Left = styled.div`
  width: ${(props) => (props.open ? `288px` : `80px`)};
  display: flex;
  transition: 300ms ease-in-out;
  overflow: hidden;
  align-items: center;
  @media (max-width: 768px) {
  display: none;
}
`;

const Logo = styled.img`
  width: 300px;
  margin-left: ${(props) => (props.open ? 0 : "-35px")};
  transition: 300ms ease-in-out;
  filter: ${props => props.theme === "light" ? "brightness(1) invert(0)" : "brightness(0) invert(1)"};
`;

const Center = styled.div`
  flex: 5;
  padding: 0 20px;
  display: flex;
  align-items: center;
  gap: 32px;
  @media (max-width: 768px) {
  gap: 4px;
  padding: 12px;
}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 8px;
`;

const Information = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  color: ${props => props.theme == "light" ? primaryTextColor : whiteTextColor};
  @media (max-width: 768px) {
  display: none;
}
`;

const UserName = styled.span`
  font-weight: 600;
  font-size: 14px;
`;

const UserRole = styled.span`
  opacity: 0.4;
  font-size: 12px;
`;

const InformationContainer = styled.div`
  width: 100vw;
  margin: 80px 0;
  height: 100vh;
  position: fixed;
  display: flex;
  left: 0;
`;

const DrawerSideBar = styled.div`
  height: calc(100% - 80px);
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  top: 80px;
  width: ${(props) =>
    props.open ? `288px` : `80px`}; // Using template literals
  contain: ${(props) => (props.open ? "paint" : "")};
  overflow-x: hidden;
  background-color: transparent;
  overflow-y: scroll;
 background-color:${props => props.theme == "light" ? whiteTextColor : colorPrimaryBlack};
  &::-webkit-scrollbar {
    width: 4px; /* width of the entire scrollbar */
  }
  &::-webkit-scrollbar-track {
    background: transparent; /* color of the tracking area */
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(147, 147, 147, 0.7); /* color of the scroll thumb */
    border-radius: 20px; /* roundness of the scroll thumb */
    /* creates padding around scroll thumb */
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: rgba(147, 147, 147, 1); /* color of the scroll thumb */
    width: 8px;
    border-radius: 20px; /* roundness of the scroll thumb */
    /* creates padding around scroll thumb */
  }
  transition: 300ms ease-in-out;
  @media (max-width: 768px) {
    width: ${(props) =>
    props.open ? `288px` : `60px`}; // Using template literals
  contain: ${(props) => (props.open ? "paint" : "")};
}
`;

const InfoComponents = styled.div`
  background-color: ${grayBackground};
  width: ${(props) =>
    props.open ? `calc(100vw - 288px)` : `calc(100vw - 80px)`};
  transition: 300ms ease-in-out;
  background-color: ${(props) =>
    props.theme == "light" ? grayBackground : colorBackgroundBlack};

@media (max-width: 768px) {
  width: ${(props) =>
    props.open ? `calc(100vw - 288px)` : `calc(100vw - 60px)`};
}
`;

const ProfileConainer = styled.div`
  display: flex;
  height: 100px;
  border-bottom: 1px dashed #bdbdbd;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;
const ProfileInformation = styled.div`
  flex-direction: column;
  align-content: center;
  justify-content: center;
  display: ${(props) => (props.open ? "flex" : "none")};
`;
const OwnerName = styled.div`
  font-weight: 500;
  font-size: 16px;
`;
const Email = styled.div`
  font-size: 10px;
  color: ${secondaryTextColor};
  display: flex;
  align-items: center;
  gap: 2px;
`;
const Notifications = styled.div`
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  position: absolute;
  margin-top: -20px;
  z-index: 99;
  padding: 8px 0;
  width: 250px;
  display: flex;

  border-radius: 4px;
  flex-direction: column;
  background-color: ${lightSoftMain};
  right: ${(props) => (props.open ? "0" : "-250px")};
  top: 20px;

  transition: 300ms ease-in-out;
`;
const Text = styled.div`
  display: flex;
  padding: 8px 16px;
  font-size: 12px;
  align-items: center;
  justify-content: space-between;
  &:hover {
    background-color: #c7efff28;
  }
`;
const NotificationText = styled.div`
  font-size: 12px;
`;
const Action = styled.div``;
const LottieContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.span`
  font-size: 14px;
  padding: 5px 16px;
  border-bottom: 1px solid #eee;
`;
const Drawer = () => {
  const user = useSelector((state) => state.user?.currentUser);
  const theme = useSelector((state) => state.theme?.mode);

  const navigate = useNavigate();

  const open = useSelector((state) => state.cart.open);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(OpenDrawer());
  };
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [openAlert, setOpen] = useState(false);

  // State to manage dropdowns

  const [anchorEl, setAnchorEl] = useState(null);
  const openProfile = Boolean(anchorEl);
  const [notifications, setNotifications] = useState([]);
  const [openN, setOpenN] = useState(false);
  const [total, setTotal] = useState();

  useEffect(() => {
    const getNotifications = async () => {
      try {
        let res = null;
        if (user?.userRole == "admin") {
          res = await newRequest.get("/shop/admin-notifications");
        } else {
          if (user?.userRole == "seller") {
            res = await newRequest.get(
              `/shop/shop-approval-notifications/${user?.idUSER}`
            );
          } else {
            console.log("virifi");
          }
        }
        setNotifications(res.data);
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    };
    getNotifications();
  }, [user?.idUSER]);
  useEffect(() => {
    const getTotal = async () => {
      try {
        let res = null;

        res = await newRequest.get(
          `/notification/total-notification/${user?.idUSER}`
        );

        setTotal(res.data);
        // Dispatch action with the number of notifications
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    };
    getTotal();
  }, []);
  const OpenNotification = () => {
    setOpenN(!openN);
  };

  const handleDeleteNotification = async (notificationId) => {
    try {
      await newRequest.delete(`/shop/notifications/${notificationId}`);
      setNotifications(
        notifications.filter(
          (notification) => notification.idNOTIFICATION !== notificationId
        )
      );
      dispatch(notifyTotal(notifications.length - 1));
    } catch (err) {
      console.error("Error deleting notification:", err);
    }
  };
  const handleClickProfile = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogOut = () => {
    logout(dispatch);
    navigate("/login");
  };
  console.log(total);

  return (
    <Container theme={theme}>
      <DrawerHeader open={open} theme={theme}>
        <Link to="/">
          <Left open={open}>
            <Logo open={open} src={logo} theme={theme} />
            
          </Left>
        </Link>
        <Divider orientation="vertical" />
        <Center>
          <IconButton sx={{color:theme == "light" ? primaryTextColor : whiteTextColor , backgroundColor:theme == "light" ? "" : colorBackgroundBlack}} onClick={handleClick}>
            <MenuIcon />
          </IconButton>
          <Badge
            sx={{ marginLeft: "auto" }}
            badgeContent={total == null ? 0 : total[0]?.Total}
            color="success"
          >
            <IconButton sx={{color:theme == "light" ? primaryTextColor : whiteTextColor , backgroundColor:theme == "light" ? "" : colorBackgroundBlack}} onClick={OpenNotification}>
              <NotificationsActiveOutlinedIcon />
            </IconButton>
          </Badge>
          <Switcher />
        </Center>
        <Divider orientation="vertical" />
        <IconButton
          onClick={handleClickProfile}
          size="small"
          sx={{ ml: 2, borderRadius: "4px" }}
          aria-controls={openProfile ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openProfile ? "true" : undefined}
        >
          <Right>
            <Avatar
              src={user?.userimg == null ? "e" : user?.userimg}
              alt={user?.username}
            />
            <Information theme={theme}>
              <UserName>{user?.username}</UserName>
              <UserRole>{user?.userRole}</UserRole>
            </Information>
          </Right>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={openProfile}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <Link to="/">
            <MenuItem onClick={handleClose}>
              <Avatar /> Profile
            </MenuItem>
          </Link>

          <div
            onClick={() => {
              if (user?.approved === 0) {
                setMessage(
                  "You are not Approved yet!! Wait for the admin's acceptance."
                );
                setOpen(true);
                setType("error");
              } else {
                navigate(`create/${user?.idUSER}`);
              }
            }}
            style={{ cursor: "pointer" }}
          >
            <MenuItem onClick={handleClose}>
              <AddBusinessTwoToneIcon style={{ marginRight: 8 }} />
              Create Shop
            </MenuItem>
          </div>

          <Divider />
          <Link to={`settings/${user?.idUSER}`}>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <SettingsTwoTone fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
          </Link>
          <MenuItem
            onClick={() => {
              handleClose();
              handleLogOut();
            }}
          >
            <ListItemIcon>
              <LogoutOutlined fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </DrawerHeader>
      <InformationContainer>
        <DrawerSideBar theme={theme} open={open}>
          {user?.userRole == "seller" ? (
            <ProfileConainer>
              <Badge
                badgeContent={<StoreIcon sx={{ fontSize: 12 }} />}
                color="success"
              >
                <Avatar
                  style={{ width: 50, height: 50 }}
                  src={user?.userimg == null ? "e" : user?.userimg}
                  alt={user?.username}
                />
              </Badge>

              <ProfileInformation open={open}>
                <OwnerName>{user?.username}</OwnerName>
                <Email>
                  <InboxIcon sx={{ fontSize: 14, color: "#d1d1d1c0" }} />
                  {user?.email}
                </Email>
              </ProfileInformation>
            </ProfileConainer>
          ) : (
            ""
          )}

          <MenuL
            title="MENU"
            link="profile"
            subTitle="Dashboard"
            isDrop={false}
            menuList={[
              {
                menuItemName: "Dashboard",
                menuLink: "/",
                menuIcon: <DashboardTwoTone fontSize="small" />,
              },
            ]}
          />

          {user?.userRole == "admin" ? (
            <>
              <Divider />

              <MenuL
                title="SHOPS MANAGEMENT"
                link="shops"
                subTitle="Shops"
                itemIcon={<StoreTwoToneIcon fontSize="small" />}
                isDrop={true}
                dropList={[
                  { dropTitle: "All Shops", dropLink: "shops" },
                  { dropTitle: "My Shops", dropLink: `store/${user?.idUSER}` },
                ]}
                menuList={[]}
                dropHeight={["70px", "70px"]}
              />
            </>
          ) : user?.userRole == "seller" ? (
            <>
              <Divider />
              <MenuL
                title="STORE"
                link="store"
                subTitle="Dashboard"
                isDrop={false}
                menuList={[
                  {
                    menuItemName: "My Stores",
                    menuLink: `store/${user?.idUSER}`,
                    menuIcon: <StoreTwoToneIcon fontSize="small" />,
                  },
                ]}
              />
            </>
          ) : (
            ""
          )}
          <Divider />
          {user?.userRole == "admin" ? (
            <MenuL
              title="E COMMERCE MANAGEMENT"
              link="shipping"
              isDrop={false}
              menuList={[
                {
                  menuItemName: "Shipping",
                  menuLink: "shipping",
                  menuIcon: <LocalShippingTwoToneIcon fontSize="small" />,
                },
                {
                  menuItemName: "My Orders",
                  menuLink: `order/${user?.idUSER}`,
                  menuIcon: <HourglassBottomTwoToneIcon fontSize="small" />,
                },
                {
                  menuItemName: "Categories",
                  menuLink: "categories",
                  menuIcon: <CategoryTwoToneIcon fontSize="small" />,
                },
                {
                  menuItemName: "Products",
                  menuLink: "products",
                  menuIcon: <Inventory2TwoToneIcon fontSize="small" />,
                },

                {
                  menuItemName: `${"Stock"}`,
                  menuLink: "stock",
                  menuIcon: <AccountTreeTwoToneIcon fontSize="small" />,
                },
              ]}
              dropHeight={["70px", "70px"]}
            />
          ) : (
            <MenuL
              title="E COMMERCE MANAGEMENT"
              link="shipping"
              isDrop={false}
              menuList={[
                {
                  menuItemName: "Shipping",
                  menuLink: "shipping",
                  menuIcon: <LocalShippingTwoToneIcon fontSize="small" />,
                },
                {
                  menuItemName: "My Orders",
                  menuLink: `order/${user?.idUSER}`,
                  menuIcon: <HourglassBottomTwoToneIcon fontSize="small" />,
                },

                {
                  menuItemName: "Stock",
                  menuLink: "products",
                  menuIcon: <Inventory2TwoToneIcon fontSize="small" />,
                },
              ]}
              dropHeight={["70px", "70px"]}
            />
          )}
          {user?.userRole == "admin" ? (
            <>
              <Divider />
              <MenuL
                title="USER MANAGEMENT"
                link="users"
                subTitle="Users"
                itemIcon={<GroupsTwoToneIcon fontSize="small" />}
                isDrop={true}
                dropList={[
                  { dropTitle: "All Users", dropLink: "users", dropHight: "" },

                  {
                    dropTitle: "Stores Owners",
                    dropLink: "owners",
                    dropHeight: "",
                  },
                ]}
                menuList={[]}
                dropHeight={["70px", "70px"]}
              />
            </>
          ) : (
            ""
          )}
          <Divider />
          <MenuL
            title="SETTINGS"
            link="profile"
            subTitle="Dashboard"
            isDrop={false}
            menuList={[
              {
                menuItemName: "Setting",
                menuLink: `settings/${user?.idUSER}`,
                menuIcon: <SettingsTwoToneIcon fontSize="small" />,
              },
            ]}
          />
        </DrawerSideBar>

        <InfoComponents theme={theme} open={open}>
          <Notifications theme={theme} open={openN}>
            <Title theme={theme}>Notifications :</Title>
            {notifications.length != 0 ? (
              notifications.map((item) => (
                <Text theme={theme}>
                  <NotificationText>{item.text}</NotificationText>
                  <Action>
                    <Tooltip title="Mark as read" arrow>
                      <IconButton
                        onClick={() =>
                          handleDeleteNotification(item.idNOTIFICATION)
                        }
                      >
                        <RemoveRedEyeTwoToneIcon color="success" />
                      </IconButton>
                    </Tooltip>
                  </Action>
                </Text>
              ))
            ) : (
              <LottieContainer>
                <Lottie animationData={me} style={{ width: "40%" }} />
              </LottieContainer>
            )}
          </Notifications>
          <AlertMessage
            open={openAlert}
            setOpen={setOpen}
            message={message}
            type={type}
          />

          <Outlet />
        </InfoComponents>
      </InformationContainer>
    </Container>
  );
};

export default Drawer;
