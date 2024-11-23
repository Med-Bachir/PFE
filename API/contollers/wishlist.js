const {verifyTokenAndSeller,verifyTokenAndAuthorizationA_S ,verifyTokenAndAuthorizationA_C, verifyTokenAndAdminandSeller, verifyToken,verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifytoken.js");
const connection = require('../db.js');
const { query } = require("../utils/promiseQuery.js");
const router = require("express").Router();


// ADD PRODUCT TO THE WISHLIST
router.post('/:userId/add/:productId', async (req, res) => {
    try {
      const userId = req.params.userId; // Extracting userId from params
      const productId = req.params.productId; // Extracting productId from params
  
      // Check if the product is already in the user's wishlist
      const wishlistExistsQuery = 'SELECT * FROM WISHLIST WHERE id_User = ? AND id_Product = ?';
      const wishlist = await query(wishlistExistsQuery, [userId, productId]);
  
      if (wishlist.length === 0) {
        // Add the product to the wishlist
        const addToWishlistQuery = 'INSERT INTO WISHLIST (id_User, id_Product) VALUES (?, ?)';
        await query(addToWishlistQuery, [userId, productId]);
        res.status(200).json({ message: 'Product added to wishlist successfully.' });
      } else {
        res.status(200).json({ message: 'Product is already in the wishlist.' });
      }
    } catch (error) {
      console.error('Error adding product to wishlist:', error);
      res.status(500).json({ error: 'Failed to add product to wishlist.' });
    }
  });
  
  // GET USER WISHLIST
  router.get('/:userId', async (req, res) => {
    try {
      const userId = req.params.userId; // Extracting userId from params
  
      // Query to get the user's wishlist items
      const getWishlistQuery = `
      SELECT 
      p.idPRODUCT,
      p.productname,
      p.productdesc,
      p.productprice,
      p.productimage,
      COALESCE(AVG(r.rate), 0) AS productRate,  -- Calculate the average rating
      s.shopname AS shopName,                     -- Get the shop name
      p.discount                     -- Get the discount percentage
    FROM 
      WISHLIST w
    JOIN 
      PRODUCT p ON w.id_Product = p.idPRODUCT
    LEFT JOIN 
      reviews r ON p.idPRODUCT = r.id_Product
    LEFT JOIN 
      STOCK st ON p.idPRODUCT = st.id_Product
    LEFT JOIN 
      SHOP s ON st.id_Shop = s.idSHOP
    
    WHERE 
      w.id_User = ?
    GROUP BY 
      p.idPRODUCT, 
      p.productname, 
      p.productdesc, 
      p.productprice, 
      p.productimage, 
      s.shopname, 
      p.discount;
    
      `;
      const wishlistItems = await query(getWishlistQuery, [userId]);
  
      if (wishlistItems.length === 0) {
        res.status(404).json({ message: 'Wishlist is empty or user does not exist.' });
      } else {
        res.status(200).json(wishlistItems);
      }
    } catch (error) {
      console.error('Error retrieving wishlist:', error);
      res.status(500).json({ error: 'Failed to retrieve wishlist.' });
    }
  });


  // Product in Wish List
router.get('/:product/:user', (req, res) => {
  const { product , user } = req.params;

  const isWish = `
      SELECT 
          w.id_Product
      FROM 
          wishlist w 
      JOIN 
          Product p ON w.id_Product = p.idPRODUCT
      JOIN 
          user u ON u.idUSER = w.id_User
      WHERE 
          w.id_Product = ? and w.id_User = ?
      
  `;

  connection.query(isWish, [product , user], (err, result) => {
      if (err) {
          console.error("Error fetching product reviews:", err);
          return res.status(500).json({ error: "Failed to fetch reviews."  });
          
      }

      // Map results to include full name and user image
      

      res.status(200).json(result != '');
  });
});

  
  // DELETE PRODUCT FROM WISHLIST
  router.delete('/:userId/delete/:productId', async (req, res) => {
    try {
      const userId = req.params.userId; // Extracting userId from params
      const productId = req.params.productId; // Extracting productId from params
  
      // Query to delete the product from the user's wishlist
      const deleteProductQuery = `
        DELETE FROM WISHLIST 
        WHERE id_User = ? AND id_Product = ?;
      `;
      const result = await query(deleteProductQuery, [userId, productId]);
  
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'Product not found in wishlist or user does not exist.' });
      } else {
        res.status(200).json({ message: 'Product removed from wishlist successfully.' });
      }
    } catch (error) {
      console.error('Error removing product from wishlist:', error);
      res.status(500).json({ error: 'Failed to remove product from wishlist.' });
    }
  });



module.exports = router ;