
import './index.css'
import Register from './features/Auth/Register'
import Login from './features/Auth/Login'

import {
  createBrowserRouter,
  
  Navigate,
 
  RouterProvider,
  useLocation,
  
} from "react-router-dom";



import AdminPf from './Profiles/admin/Dashboard';
import Drawer from './Components/drawer/Drawer';
import ShopList from './Profiles/admin/shops manager/ShopList';
import Shipping from './Profiles/admin/categories manager/Shipping';

import OwnerPf from './Profiles/owner/Dashboard';
import Products from './Profiles/owner/product manager/Products';
import Store from './Profiles/owner/shop manager/Store';
import CategoryList from './Profiles/admin/categories manager/CategoryList';
import UsersList from './Profiles/admin/user manager/UsersList';

import Settings from './Components/Settings';
import Shops from './Pages/Shops';
import ShopPage from './Pages/ShopPage';
import OrderPage from './Pages/OrderPage';
import CreatShop from './Profiles/owner/shop manager/CreatShop';
import Header from './Components/Header';
import AddProduct from './Profiles/owner/product manager/AddProduct';
import { useDispatch, useSelector } from 'react-redux';
import OwnersList from './Profiles/admin/user manager/ownerList';
import Checkout from './Pages/Checkout';
import ClientPf from './Profiles/client/Dashboard';
import  ClientProfile  from './Profiles/client/ClientProfile';
import WishList from './Profiles/client/WishList';
import Compare from './Pages/Compare';
import Home from './Pages/Home';
import CardProduct from './features/Products/CardProduct';
import ContactUs from './Pages/ContactUs';
import MyOrder from './Profiles/owner/order manager/Orders';
import Stock from './Profiles/owner/product manager/Stock';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AddCategory from './Profiles/admin/categories manager/AddCategory';
import { useEffect } from 'react';










function App() {
  

  const queryClient = new QueryClient();
  const user = useSelector((state) => state.user?.currentUser);

 

  const Clientrouter = createBrowserRouter([
    {
      path: "/",
      element: <Header/>,
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
              element: <ClientProfile />,
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
      element: user !== null ? <Navigate to="/" /> : <Login />,
    },
    {
      path: "register",
      element: user !== null ? <Navigate to="/" /> : <Register />,
    },
   
  ]);
  const Adminrouter = createBrowserRouter([
   
    
    {
      path: "/",
      element: <Drawer/>,
      children: [
        {
          path: "", // Empty string for the index route
          element: user?.userRole == 'admin' ? <AdminPf /> : user?.userRole == 'seller' ? <OwnerPf /> :  '',
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


    <RouterProvider router={user?.userRole == 'admin' || user?.userRole == 'seller' ? Adminrouter : Clientrouter} />

    </QueryClientProvider>
  )
}

export default App
