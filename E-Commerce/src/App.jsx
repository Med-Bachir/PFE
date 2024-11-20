
import './index.css'
import Register from './Pages/Register'
import Login from './Pages/Login'

import {
  createBrowserRouter,
  
  Navigate,
 
  RouterProvider,
  useLocation,
  
} from "react-router-dom";



import AdminPf from './Pages/Profiles/admin/AdminPf';
import Drawer from './Components/Drawer';
import ShopList from './Components/ShopList';
import Shipping from './Components/Shipping';
import RefundsRepport from './Components/RefundsRepport';
import OwnerPf from './Pages/Profiles/shop/OwnerPf';
import Products from './Components/Products';
import Store from './Pages/Profiles/shop/Store';
import CategoryList from './Components/CategoryList';
import UsersList from './Components/UsersList';
import Banned from './Components/Banned';
import Settings from './Components/Settings';
import Shops from './Pages/Shops';
import ShopPage from './Pages/ShopPage';
import OrderPage from './Pages/OrderPage';
import CreatShop from './Components/CreatShop';
import Header from './Components/Header';
import AddProduct from './Components/AddProduct';
import { useSelector } from 'react-redux';
import OwnersList from './Components/ownerList';
import Checkout from './Pages/Checkout';
import ClientPf from './Pages/ClientPf';
import  ClientProfile  from './Components/ClientProfile';
import WishList from './Components/WishList';
import Compare from './Pages/Compare';
import Home from './Pages/productFolder/PHomepage';
import CardProduct from './Pages/productFolder/CardProduct';
import ContactUs from './Pages/ContactUs';
import MyOrder from './Components/Orders';
import Stock from './Components/Stock';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AddCategory from './Components/AddCategory';










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
          path: "repports",
          element: <RefundsRepport />,
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
          path: "banned",
          element: <Banned />,
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
