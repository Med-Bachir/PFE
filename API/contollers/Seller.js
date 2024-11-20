const {verifyTokenAndClient,verifyTokenAndAuthorizationA_S ,verifyTokenAndAuthorizationA_C, verifyTokenAndAdminandSeller, verifyToken,verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyTokenAndSeller } = require("./verifytoken");
const connection = require('../db');
const { query } = require("../utils/promiseQuery.js");
const router = require("express").Router();


// BECOME A SELLER
router.put("/become-seller/:id", verifyToken, async (req, res) => {
    try {
        const userId = req.params.id;

        // Update userRole to 'seller'
        const query = "UPDATE USER SET userRole = 'seller' WHERE idUSER = ?";
        const values = [userId];

        connection.query(query, values, (err, result) => {
            if (err) {
                res.status(500).json({ error: "Failed to update user role." });
                return;
            }

            // Check if any rows were affected
            if (result.affectedRows === 0) {
                res.status(404).json({ error: "User not found." });
                return;
            }

            res.status(200).json({ message: "User has become a seller successfully." });
        });
    } catch (err) {
        res.status(500).json({ error: "Internal server error." });
    }
});

//GET ALL SELLERS
router.get("/", verifyTokenAndAdmin, async (req, res, next) => {
    
    try {
      let sqlQuery = "SELECT * FROM USER WHERE userRole = 'seller'";
      
     
  
      connection.query(sqlQuery, (err, data) => {
        if (err) return next(err);
        res.status(200).json(data);
      });
    } catch (err) {
      next(err);
    }
  });

// GET SELLER BY ID 

router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const userId = req.params.id;
        const query = "SELECT idUSER, firstname, lastname, username, email, userRole, createdAt, userimg FROM USER WHERE idUSER = ? AND userRole = 'seller'";
        
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

// UPDATE SELLER

router.put("/:id", verifyToken, async (req, res) => {
    try {
        const userId = req.params.id;
        const { username,userimg ,email } = req.body;

        const query = "UPDATE USER SET   username=?, email=? ,userimg=? WHERE idUSER=?";
        const values = [ username,email , userimg, userId];

        connection.query(query, values, (err, result) => {
            if (err) {
                console.log(err)
                res.status(500).json({ error: "Failed to update user." });
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

// DELETE SELLER
router.delete("/delete/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const userId = req.params.id;

        const query = "DELETE FROM USER WHERE idUSER = ? and userRole = 'seller'";
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

// GET MONTHLY REVENUE FOR SELLER
router.get('/seller/:sellerId/monthly-revenue', verifyTokenAndAuthorizationA_S, async (req, res) => {
    try {
      const sellerId = req.params.sellerId;
  
      const getMonthlyRevenueQuery = `
      WITH RECURSIVE months AS (
        SELECT 1 AS month
        UNION ALL
        SELECT month + 1
        FROM months
        WHERE month < 12
      )
      SELECT 
        EXTRACT(YEAR FROM CURDATE()) AS year,
        m.month AS monthNumber,
        COALESCE(SUM(oi.qte * p.productprice), 0) AS monthlyRevenue
      FROM months m
      LEFT JOIN \`ORDER\` o ON YEAR(o.createdAt) = EXTRACT(YEAR FROM CURDATE()) AND MONTH(o.createdAt) = m.month
      LEFT JOIN ORDERITEM oi ON o.idORDER = oi.id_Order 
      LEFT JOIN PRODUCT p ON oi.id_Product = p.idPRODUCT
      LEFT JOIN STOCK s ON p.idPRODUCT = s.id_Product
      LEFT JOIN SHOP sh ON s.id_Shop = sh.idSHOP
      WHERE sh.id_Owner = ? OR sh.id_Owner IS NULL
      GROUP BY m.month
      ORDER BY m.month;
      `;
  
      const monthlyRevenue = await query(getMonthlyRevenueQuery, [sellerId]);
  
      // Convert month numbers to month names
      const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
  
      const result = monthlyRevenue.map(item => ({
        year: item.year,
        month: monthNames[item.monthNumber - 1],
        monthlyRevenue: item.monthlyRevenue
      }));
  
      res.status(200).json(result);
    } catch (error) {
      console.error('Error fetching monthly revenue:', error);
      res.status(500).json({ error: 'Failed to fetch monthly revenue.' });
    }
  });



module.exports = router ;