const {verifyTokenAndSeller, verifyToken,verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifytoken");
const { query } = require("../utils/promiseQuery.js");
const connection = require('../db');
const router = require("express").Router();

const Fuse = require('fuse.js');


// Add product to the cart
router.post('/cart/:userId/add/:productId',verifyToken , async (req, res) => {
  try {
      const userId = req.params.userId; // Extracting userId from params
      const productId = req.params.productId; // Extracting productId from params
      const { color, size , quantity } = req.body; // Extracting color and size from request body

      // Check if the product is already in the user's cart
      const cartExistsQuery = 'SELECT * FROM CART WHERE id_Client = ? AND id_Product = ? AND color = ? AND size = ?';
      const cart = await query(cartExistsQuery, [userId, productId, color, size ]);

      if (cart.length === 0) {
          // Add the product to the cart
          const addToCartQuery = 'INSERT INTO CART (id_Client, id_Product, color, size, quantity) VALUES (?, ?, ?, ?,?)';
          await query(addToCartQuery, [userId, productId, color, size , quantity]);
          res.status(200).json({ message: 'Product added to cart successfully.' });
      } else {
          res.status(200).json({ message: 'Product is already in the cart.' });
      }
  } catch (error) {
      console.error('Error adding product to cart:', error);
      res.status(500).json({ error: 'Failed to add product to cart.' });
  }
});

// GET USER CART
router.get('/cart/:userId', async (req, res) => {
  try {
      const userId = req.params.userId; // Extracting userId from params

      // Query to get the user's cart items
      const getCartQuery = `
          SELECT 
              (SELECT COUNT(DISTINCT p.idPRODUCT)               
               FROM CART c 
               JOIN PRODUCT p ON c.id_Product = p.idPRODUCT
               WHERE c.id_Client = ?) AS total_product_count,
               
              (SELECT SUM(p.productprice * c.quantity)         
               FROM CART c 
               JOIN PRODUCT p ON c.id_Product = p.idPRODUCT
               WHERE c.id_Client = ?) AS total_price,

              p.idPRODUCT, 
              p.productname, 
              p.productdesc, 
              p.productprice, 
              p.productimage, 
              p.discount, 
              c.quantity,
              c.color,
              c.size
          FROM 
              CART c
          JOIN 
              PRODUCT p ON c.id_Product = p.idPRODUCT
          WHERE 
              c.id_Client = ?
          GROUP BY 
              p.idPRODUCT, p.productname, p.productdesc, p.productprice, p.productimage, p.discount, c.quantity , c.color , c.size;
      `;

      const cartItems = await query(getCartQuery, [userId, userId, userId]);

      if (cartItems.length === 0) {
          res.status(404).json({ message: 'Cart is empty or user does not exist.' });
      } else {
          // Extract total product count and total price from the first row (they are the same for all rows)
          const totalProductCount = cartItems[0].total_product_count;
          const totalPrice = cartItems[0].total_price;

          // Map the products from the query result
          const products = cartItems.map(item => ({
              id: item.idPRODUCT,
              name: item.productname,
              description: item.productdesc,
              price: item.productprice,
              image: item.productimage,
              discount: item.discount,
              quantity: item.quantity,
              color : item.color,
              size : item.size
          }));

          // Construct the response JSON
          const response = {
              totalProductCount,
              totalPrice,
              products
          };

          res.status(200).json(response);
      }
  } catch (error) {
      console.error('Error retrieving cart:', error);
      res.status(500).json({ error: 'Failed to retrieve cart.' });
  }
});


//update USER Cart

router.put("/update/:userId/:productId",verifyToken , async(req,res)=>{
    const userId = req.params.userId; // Extracting userId from params
    const idP = req.params.productId;
    const qte = req.body.quantity;
    
    try {
     
      // Query to get the user's cart items
      const UpdateCartQuery = `
         UPDATE CART 
            SET quantity = ? 
            WHERE id_Client = ? AND id_Product = ?;
      `;

      connection.query(UpdateCartQuery, [qte,userId, idP]);
      
      res.status(200).json("Product Updated !")

    } catch (err) {
      res.status(500).json("Cart dont exist !")
    }
  })

 



module.exports = router ;