import styled from "styled-components";
import Lottie from "lottie-react";
import me from "../emptyNotification.json";
import logo from "../assets/logo.png";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  Avatar,
  Badge,
  Button,
  Fab,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import StoreIcon from "@mui/icons-material/Store";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PersonIcon from "@mui/icons-material/Person";
import newRequest from "../utils/newRequest";
import RemoveRedEyeTwoToneIcon from "@mui/icons-material/RemoveRedEyeTwoTone";
import { notifyTotal } from "../redux/notifications";
import Cart from "../features/Cart/Cart";
import { colorAccentDarkTransparent, colorAccentMediumTransparent, colorBackgroundBlack, colorPrimaryBlack, grayBackground, lightMain, main, primaryTextColor, softMain, whiteTextColor } from "../Colors";
import ThemeSwitcher from "./switcher/ThemeSwitcher";

const PagesContainer = styled.div`


`;
const HeaderContainer = styled.header`
  position: sticky;
  height: 80px;
  width: 100%;
  display: flex;
  top: 0;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  align-items: center;
  padding: 0 20px;
  background-color: ${props => props.theme == "light" ? whiteTextColor : colorPrimaryBlack };
  z-index: 99;
  overflow: hidden;
  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    padding: 0;
    padding-bottom: 20px;
    
  }
`;

export const Center = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  gap: 8px;

  @media (max-width: 768px) {
    display: none; /* Hide on small screens */
  }
`;

const Logo = styled.img`
  width: 300px;

  filter: ${props => props.theme === "light" ? "brightness(1) invert(0)" : "brightness(0) invert(1)"};

  @media (max-width: 768px) {
    width: 300px; /* Adjust logo size */
    margin-bottom: -20px;
  }
`;

export const Left = styled.div`
  flex: 1;
  align-items: center;
  display: flex;
  justify-content: flex-start;
  color: ${props => props.theme == "light" ? primaryTextColor : whiteTextColor };

  @media (max-width: 768px) {
    justify-content: center;
  }
`;
const Pages = styled.div`
display: flex;
align-items: center;
gap: 16px;

`
export const Right = styled.div`
  flex: ${(props) =>
    props.user == null ? 3 : props.user?.userRole == "client" ? 3 : 2};
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 20px;
  color: ${props => props.theme == "light" ? primaryTextColor : whiteTextColor };
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
  }
`;
const Notifications = styled.div`
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  position: fixed;
  z-index: 99;
  padding: 8px 0;
  width: 250px;
  display: flex;

  border-radius: 4px;
  flex-direction: column;
  background-color: ${softMain};
  right: ${(props) => (props.open ? "0" : "-250px")};
  top: 80px;

  transition: 200ms;
  @media (max-width: 768px) {
    top: 185px;
    width: 100%;
  right: ${(props) => (props.open ? "0" : "-100%")};

  }
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

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const Responsive = styled.div`
display: none;
align-items: center;

@media (max-width: 768px) {
  display: block;
}

` 
const ResponsivePC = styled.div`
display: flex;
align-items: center;
justify-content: flex-end;

@media (max-width: 768px) {
  display: none;
}

` 



const Header = () => {
  const user = useSelector((state) => state.user?.currentUser);
  const theme = useSelector((state) => state.theme.mode);
  const total = useSelector((state) => state.notify?.total);
  const Location = useLocation().pathname.split("/")[1];
  const [notifications, setNotifications] = useState([]);
  const [openN, setOpenN] = useState(false);
  const dispatch = useDispatch();

 
  useEffect(() => {
    const getNotifications = async () => {
      try {
        let res = null;
        
          res = await newRequest.get(`/notification/${user?.idUSER}`);
        
        
        
        setNotifications(res.data);
        const numberOfNotifications = res.data.length; // Get the number of notifications
        dispatch(notifyTotal(numberOfNotifications)); // Dispatch action with the number of notifications
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    };
    getNotifications();
  }, []);

  const handleUpgrade = async () => {
    try {
      const response = await newRequest.put(
        `/seller/become-seller/${user?.idUSER}`
      );
      console.log(response.data.message);
      alert("you have become a seller");
    } catch (error) {
      console.error("Error deleting user:");
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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




  return (
    <>
      <HeaderContainer theme={theme}>
       
        <>
          <Link to={"/"}>
            <Left theme={theme}>
              <Logo theme={theme} src={logo} />
              {user !== null ? (
              <Responsive>
                <Badge 
                  badgeContent={
                    user?.userRole === "client" ? (
                      <PersonIcon sx={{ fontSize: 14 }} />
                    ) : (
                      <StoreIcon sx={{ fontSize: 14 }} />
                    )
                  }
                  color="success"
                >
                  {user?.userRole !== "client" ? (
                    <Link to="/profile">
                      <Avatar
                        alt={user?.username}
                        sx={{
                          width: "35px",
                          height: "35px",
                          bgcolor: "#009f7f",
                        }}
                        src={user?.userimg || "e"}
                      />
                    </Link>
                  ) : (
                    <Link to="/Client">
                      <Avatar
                        alt={user?.username}
                        sx={{
                          width: "35px",
                          height: "35px",
                          bgcolor: "#eee",
                        }}
                        src={user?.userimg || "e"}
                      />
                    </Link>
                  )}
                </Badge>
               
              </Responsive>
            ) : (
              <>
               
              </>
            )}
            </Left>
          </Link>
          <Center></Center>
          <Right theme={theme} user={user}>
            <Pages>

            <Link style={{color:theme == "light" ? primaryTextColor : whiteTextColor , fontWeight: 400 }} to="/Shops">
              Shops
            </Link>
            <Link style={{color:theme == "light" ? primaryTextColor : whiteTextColor , fontWeight: 400 }} to="/offer">
              Offer
            </Link>
            <Link style={{color:theme == "light" ? primaryTextColor : whiteTextColor , fontWeight: 400 }} to="/contact">
              Contact
            </Link>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              style={{color:theme == "light" ? primaryTextColor : whiteTextColor , fontWeight: 400 }}
              >
              Pages <KeyboardArrowDownIcon />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              sx={{".css-6hp17o-MuiList-root-MuiMenu-list" : {backgroundColor: theme == "light" ? whiteTextColor : colorBackgroundBlack}}}
              >
              <Link
                to="/Orders"
                style={{ textDecoration: "none", color:theme == "light" ? primaryTextColor : whiteTextColor , fontWeight: 400 }}
                >
                <MenuItem onClick={handleClose}>My Orders</MenuItem>
              </Link>
              <Link style={{color:theme == "light" ? primaryTextColor : whiteTextColor , fontWeight: 400 }}>
              <MenuItem onClick={handleClose}>About Us</MenuItem>
              </Link>
            </Menu>
            <Badge badgeContent={total} color="success">
              <IconButton color="success" onClick={OpenNotification}>
                <NotificationsActiveOutlinedIcon sx={{color: theme == 'light' ? primaryTextColor : whiteTextColor}} />
              </IconButton>
            </Badge>
                </Pages>
            
            {user !== null ? (
              <ResponsivePC>
               <Badge
  badgeContent={
    user?.userRole === "client" ? (
      <PersonIcon sx={{ fontSize: 14 }} />
    ) : (
      <StoreIcon sx={{ fontSize: 14 }} />
    )
  }
  sx={{
    "& .MuiBadge-badge": {
      backgroundColor: softMain, // Change the background color here
      color: main, // Optional: Change the text color inside the badge
    },
  }}
>
                  {user?.userRole !== "client" ? (
                    <Link to="/profile">
                      <Avatar
                        alt={user?.username}
                        sx={{
                          width: "35px",
                          height: "35px",
                          bgcolor: "#009f7f",
                        }}
                        src={user?.userimg || "e"}
                      />
                    </Link>
                  ) : (
                    <Link to="/Client">
                      <Avatar
                        alt={user?.username}
                        sx={{
                          width: "35px",
                          height: "35px",
                          bgcolor: "#eee",
                        }}
                        src={user?.userimg || "e"}
                      />
                    </Link>
                  )}
                </Badge>
                {user?.userRole === "client" && (
                  <Button
                    onClick={handleUpgrade}
                    sx={{
                      bgcolor: theme == "light" ? main : colorAccentMediumTransparent,
                      color: whiteTextColor,
                      "&:hover": {
                        color: main,
                      },
                      marginLeft: 3,
                    }}
                  >
                    Become a Seller
                  </Button>
                )}
              </ResponsivePC>
            ) : (
              <>
                <Link to="/register">
                  <Button
                    sx={{
                      bgcolor: theme == "light" ? main : colorAccentMediumTransparent,
                      color: whiteTextColor,
                      "&:hover": {
                        color: main,
                      }
                    }}
                  >
                    Join
                  </Button>
                </Link>
              </>
            )}
          </Right>
        </>
      </HeaderContainer>
      <PagesContainer theme={theme}>
        <Outlet />
        {Location == "checkout" || Location == "Client"  ? "" : <Cart theme={theme} />}
        <Notifications open={openN}> 
          <Title>Notifications :</Title>
          {notifications.length != 0 ? (
            notifications.map((item) => (
              <Text>
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
        <Fab style={{position:'fixed' , bottom:32 , right : 32 , width:"fit-content" , borderRadius:50, padding:0 , backgroundColor: theme == 'light' ? whiteTextColor : colorAccentDarkTransparent}}>
        <ThemeSwitcher />

        </Fab>
      </PagesContainer>
    </>
  );
};

export default Header;
