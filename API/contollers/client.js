const {verifyTokenAndAuthorizationA_C, verifyTokenAndAdminandSeller, verifyToken,verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifytoken");
const connection = require('../db');
const router = require("express").Router();
const { v2: cloudinary } = require("cloudinary");
const { v4: uuidv4 } = require("uuid");



cloudinary.config({
  cloud_name: "dr95wrssj",
  api_key: "419664968851868",
  api_secret: "61D8e5oyWfCQLWBohKa-9t7HxZg",
});
//GET ALL CLIENTS
router.get("/", verifyTokenAndAdminandSeller, async (req, res, next) => {
    
    try {
      let sqlQuery = "SELECT * FROM USER WHERE userRole = 'client'";
      
     
  
      connection.query(sqlQuery, (err, data) => {
        if (err) return next(err);
        res.status(200).json(data);
      });
    } catch (err) {
      next(err);
    }
  });

  // GET CLIENT BY ID 

  router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const userId = req.params.id;
        const query = "SELECT idUSER, firstname, lastname, username, email, userRole, createdAt, userimg FROM USER WHERE idUSER = ? AND userRole = 'client'";
        
        connection.query(query, [userId], (err, result) => {
            if (err) {
                res.status(500).json({ error: "Failed to fetch user." });
                return;
            }

            if (result.length === 0) {
                res.status(404).json({ error: "No client found with this ID." });
                return;
            }

            const user = result[0];
            const { password, ...others } = user;
            res.status(200).json(others);
        });
    } catch (err) {
        res.status(500).json({ error: "Internal server error." });
    }
});

// UPDATE CLIENT 

router.put("/:id", verifyTokenAndAuthorizationA_C, async (req, res) => {
  try {
      const userId = req.params.id;
      const { firstname, lastname, username, email, userimg } = req.body;

      // Upload the image to Cloudinary
      const uniquePublicId = `Profile_${uuidv4()}`;
      console.log("User image:", userimg); // Add this to debug
      const uploadResult = await cloudinary.uploader.upload(userimg, {
        public_id: uniquePublicId,
      });

      // Extract the URL of the uploaded image
      const imageUrl = uploadResult.secure_url;

      // Update query
      const query = "UPDATE USER SET firstname=?, lastname=?, username=?, email=?, userimg=? WHERE idUSER=?";
      const values = [firstname, lastname, username, email, imageUrl, userId];

      // Execute query
      connection.query(query, values, (err, result) => {
          if (err) {
              res.status(500).json({ error: "Failed to update user." + err });
              return;
          }

          // Check if any rows were affected
          if (result.affectedRows === 0) {
              res.status(404).json({ error: "User not found." });
              return;
          }

          res.status(200).json({ message: "User updated successfully." });
      });
  } catch (err) {
      res.status(500).json({ error: "Internal server error." });
  }
});

// DELETE CLIENT 
router.delete("/delete/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const userId = req.params.id;

        const query = "DELETE FROM USER WHERE idUSER = ? and userRole = 'client'";
        const values = [userId];

        connection.query(query, values, (err, result) => {
            if (err) {
                res.status(500).json({ error: "Failed to delete user." });
                return;
            }

            // Check if any rows were affected
            if (result.affectedRows === 0) {
                res.status(404).json({ error: "User not found." });
                return;
            }

            res.status(200).json({ message: "User has been deleted." });
        });
    } catch (err) {
        res.status(500).json({ error: "Internal server error." });
    }
});



//total orders status
router.get("/orders/status-count/:iduser", verifyToken, async (req, res) => {
    try {
      const userId = req.params.iduser; // Assuming the user ID is available in the req.user object after token verification
  
      const getOrderStatusCountQuery = `
        SELECT 
          progress, COUNT(*) AS totalOrders 
        FROM 
          ecommerce.ORDER
        WHERE
          id_User = ?
        GROUP BY 
          progress;
      `;
  
      connection.query(getOrderStatusCountQuery, [userId], (err, results) => {
        if (err) {
          console.error("Error fetching order status counts:", err);
          res.status(500).json({ error: "Failed to fetch order status counts." });
          return;
        }
  
        // Create an object to store the counts
        const statusCounts = {
          'OnWay': 0,
          'Arrived': 0,
          'Failure': 0
        };
  
        // Populate the object with the results
        results.forEach(row => {
          statusCounts[row.progress] = row.totalOrders;
        });
  
        res.status(200).json(statusCounts);
      });
    } catch (err) {
      console.error("Internal server error:", err);
      res.status(500).json({ error: "Internal server error." });
    }
  });
  







  module.exports = router ;