import "./index.css";

// REACT TOOLS
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useState } from "react";

// CLIENT PAGES
import Register from "./features/Auth/Register";
import Login from "./features/Auth/Login";
import Shops from "./Pages/Shops";
import ShopPage from "./Pages/ShopPage";
import OrderPage from "./Pages/OrderPage";
import ContactUs from "./Pages/ContactUs";
import CardProduct from "./features/Products/CardProduct";
import Checkout from "./Pages/Checkout";
import ClientPf from "./Profiles/client/Dashboard";
import WishList from "./Profiles/client/WishList";
import Home from "./Pages/Home";

//FEATURES
import Recovered from "./Components/resetpassword/Recovered";
import OTPinput from "./Components/resetpassword/OTPinput";
import ResetPassword from "./Components/updateForms/ResetPassword";
import Settings from "./Components/Settings";
import Header from "./Components/Header";

// ADMIN & SELLER
import Drawer from "./Components/drawer/Drawer";
// ADMIN
import AdminPf from "./Profiles/admin/Dashboard";
import AddCategory from "./Profiles/admin/categories manager/AddCategory";
import ShopList from "./Profiles/admin/shops manager/ShopList";
import CategoryList from "./Profiles/admin/categories manager/CategoryList";
import Shipping from "./Profiles/admin/categories manager/Shipping";
import UsersList from "./Profiles/admin/user manager/UsersList";
import OwnersList from "./Profiles/admin/user manager/ownerList";

// SELLER
import OwnerPf from "./Profiles/owner/Dashboard";
import Products from "./Profiles/owner/product manager/Products";
import Store from "./Profiles/owner/shop manager/Store";
import CreatShop from "./Profiles/owner/shop manager/CreatShop";
import AddProduct from "./Profiles/owner/product manager/AddProduct";
import MyOrder from "./Profiles/owner/order manager/Orders";
import Stock from "./Profiles/owner/product manager/Stock";


// INCOMPLETED PAGE
import Compare from "./Pages/Compare";

export const RecoveryContext = createContext();

const App = () => {
  const [page, setPage] = useState("login");
  const [email, setEmail] = useState();
  const [otp, setOTP] = useState();
  const queryClient = new QueryClient();
  const user = useSelector((state) => state.user?.currentUser);

  const NavigateComponents = () => {
    if (page === "login") return <Login />;
    if (page === "otp") return <OTPinput />;
    if (page === "reset") return <ResetPassword />;

    return <Recovered />;
  };

  const Clientrouter = createBrowserRouter([
    {
      path: "/",
      element: <Header />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/cardproduct/:id",
          element: <CardProduct />,
        },
        {
          path: "/contact",
          element: <ContactUs />,
        },
        {
          path: "/compare/:id",
          element: <Compare />,
        },
        {
          path: "/Shops",
          element: <Shops />,
        },
        {
          path: "/checkout/:id",
          element: <Checkout />,
        },
        {
          path: "Shops/:id",
          element: <ShopPage />,
        },
        {
          path: "Orders",
          element: <OrderPage />,
        },
        {
          path: "Client",
          element: <ClientPf />,
        },
        {
          path: "/Client",
          element: <ClientPf />,
          children: [
            {
              path: "/Client",
              element: <Settings />,
            },

            {
              path: "Orders",
              element: <OrderPage />,
            },

            {
              path: "wishlist",
              element: <WishList />,
            },
          ],
        },
      ],
    },

    {
      path: "login",
      element:
        user !== null ? (
          <Navigate to="/" />
        ) : (
          <RecoveryContext.Provider
            value={{ page, setPage, otp, setOTP, setEmail, email }}
          >
            <NavigateComponents />
          </RecoveryContext.Provider>
        ),
    },
    {
      path: "register",
      element: user !== null ? <Navigate to="/" /> : <Register />,
    },
  ]);
  const Adminrouter = createBrowserRouter([
    {
      path: "/",
      element: <Drawer />,
      children: [
        {
          path: "", // Empty string for the index route
          element:
            user?.userRole == "admin" ? (
              <AdminPf />
            ) : user?.userRole == "seller" ? (
              <OwnerPf />
            ) : (
              ""
            ),
        },
        {
          path: "Shops",
          element: <ShopList />,
        },

        {
          path: "shipping",
          element: <Shipping />,
        },
        {
          path: "order/:id",
          element: <MyOrder />,
        },

        {
          path: "products",
          element: <Products />,
        },
        {
          path: "store/:id",
          element: <Store />,
        },
        {
          path: "categories",
          element: <CategoryList />,
        },
        {
          path: "users",
          element: <UsersList />,
        },
        {
          path: "Shops/:id",
          element: <ShopPage />,
        },
        {
          path: "owners",
          element: <OwnersList />,
        },

        {
          path: "settings/:id",
          element: <Settings />,
        },
        {
          path: "create/:id",
          element: <CreatShop />,
        },
        {
          path: "products/Add",
          element: <AddProduct />,
        },
        {
          path: "stock",
          element: <Stock />,
        },
        {
          path: "/add-cat",
          element: <AddCategory />,
        },
      ],
    },
    {
      path: "login",
      element: user !== null ? <Navigate to="/" /> : <Login />,
    },
    {
      path: "register",
      element: user !== null ? <Navigate to="/" /> : <Register />,
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider
        router={
          user?.userRole == "admin" || user?.userRole == "seller"
            ? Adminrouter
            : Clientrouter
        }
      />
    </QueryClientProvider>
  );
}

export default App;
