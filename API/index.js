const express = require("express");
const dotenv = require("dotenv"); 
const bodyParser = require('body-parser'); // Import body-parser


const authRoute = require("./contollers/auth");
const ProductRoute = require("./contollers/product");
const OrderRoute = require("./contollers/order");
const CardRoute = require("./contollers/cart");
const clientroute = require("./contollers/client");  
const sellerroute = require("./contollers/Seller");  
const categoryroute = require("./contollers/category");
const shoproute = require("./contollers/shop");
const wishroute = require("./contollers/wishlist");
const reviewroute = require("./contollers/reviews");
const locationroute = require("./contollers/location");
const statsroute = require("./contollers/stats");
const notificationroute = require("./contollers/notification");
const fileUploadRouter = require('./contollers/upload');

const mysql = require('mysql');
const connection = require('./db');
const cors = require("cors");
const cookieParser = require('cookie-parser');
 
const app = express();
app.use(cors({origin:"http://localhost:5173", credentials:true}));
dotenv.config()
app.use(cookieParser());

// Increase payload limit to 50MB
app.use(bodyParser.json({ limit: '50mb' }));

app.use(express.json());
app.use("/api/auth",authRoute)
app.use("/api/users",clientroute)
app.use("/api/seller",sellerroute)
app.use("/api/products",ProductRoute)
app.use("/api/orders",OrderRoute)
app.use("/api/cards",CardRoute)
app.use("/api/category",categoryroute)
app.use("/api/shop",shoproute)
app.use("/api/shop/location",locationroute)
app.use("/api/wish",wishroute)
app.use("/api/review",reviewroute)
app.use("/api/stats",statsroute)

app.use('/api/upload', fileUploadRouter);
app.use('/api/notification', notificationroute);

app.listen(process.env.PORT_NUM || 5000,()=>{
    console.log("Backend server is running !!");
})

module.exports = { connection };
