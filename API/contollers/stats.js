const {
  verifyTokenAndSeller,
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorizationA_S,
} = require("./verifytoken");
const { query } = require("../utils/promiseQuery.js");
const connection = require("../db");
const router = require("express").Router();

const Fuse = require("fuse.js");

//CLIENTS

// GET CLIENTS STATS

router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  const formattedLastYear = lastYear.toISOString().split("T")[0];

  try {
    const query = `
          SELECT MONTHNAME(STR_TO_DATE(CONCAT('2024-', months.month, '-01'), '%Y-%m-%d')) AS month, COUNT(USER.idUSER) AS total
          FROM (
              SELECT '01' AS month UNION SELECT '02' UNION SELECT '03' UNION SELECT '04' UNION SELECT '05' UNION SELECT '06' UNION SELECT '07' UNION SELECT '08' UNION SELECT '09' UNION SELECT '10' UNION SELECT '11' UNION SELECT '12'
          ) AS months
          LEFT JOIN USER ON LPAD(months.month, 2, '0') = MONTH(STR_TO_DATE(USER.createdAt, '%Y-%m-%d')) AND STR_TO_DATE(USER.createdAt, '%Y-%m-%d') >= ?
          GROUP BY months.month
      `;
    const values = [formattedLastYear];

    connection.query(query, values, (err, results) => {
      if (err) {
        res.status(500).json({ error: "Failed to fetch user statistics." });
        return;
      }

      res.status(200).json(results);
    });
  } catch (err) {
    res.status(500).json({ error: "Internal server error." });
  }
});

router.get("/all-stats", verifyTokenAndAdmin, async (req, res) => {
  try {
    const query = `
WITH OwnerProducts AS (
    SELECT p.idPRODUCT, p.productprice , (p.discount) /100 AS discount
    FROM ecommerce.orderitem oi
    JOIN ecommerce.product p ON oi.id_Product = p.idPRODUCT
    JOIN ecommerce.stock st ON p.idPRODUCT = st.id_Product
    JOIN ecommerce.shop sh ON st.id_Shop = sh.idSHOP
    JOIN ecommerce.user o ON sh.id_Owner = o.idUSER
    WHERE o.userRole = 'admin'
)

SELECT 
    (SELECT COUNT(*) FROM ecommerce.user WHERE subscription = 'Monthly') AS totalMonthSubs,
    (SELECT COUNT(*) FROM ecommerce.user WHERE subscription = 'Annual') AS totalAnnualSubs,

    (SELECT COUNT(*) FROM ecommerce.user WHERE userRole = 'seller') AS totalOwners,
    (SELECT COUNT(*) FROM ecommerce.user WHERE userRole != 'admin') AS totalUsers,
    (SELECT COUNT(*) FROM ecommerce.user WHERE userRole = 'client') AS totalClients,
    (SELECT COUNT(*) FROM ecommerce.shop) AS totalShops,
    (SELECT COUNT(*) FROM ecommerce.product) AS totalProducts,
    (SELECT COUNT(*) 
     FROM ecommerce.shop s
     JOIN ecommerce.user u ON s.id_Owner = u.idUSER 
     WHERE u.userRole = 'admin') AS myshop,

    
    (SELECT COUNT(DISTINCT oi.id_Order) 
     FROM ecommerce.orderitem oi 
     WHERE oi.id_Product IN (SELECT idPRODUCT FROM OwnerProducts)) AS totalOrdersFromOwner,

    
    (SELECT COUNT(DISTINCT oi.id_Order) 
     FROM ecommerce.orderitem oi 
     JOIN ecommerce.order o ON oi.id_Order = o.idORDER
     WHERE oi.id_Product IN (SELECT idPRODUCT FROM OwnerProducts) 
     AND o.progress = 'Waiting') AS WaitingOrders,

  
    (SELECT COUNT(DISTINCT oi.id_Order) 
     FROM ecommerce.orderitem oi 
     JOIN ecommerce.order o ON oi.id_Order = o.idORDER
     WHERE oi.id_Product IN (SELECT idPRODUCT FROM OwnerProducts) 
     AND o.progress = 'On Way') AS OnWayOrders,

    (SELECT COUNT(DISTINCT oi.id_Order) 
     FROM ecommerce.orderitem oi 
     JOIN ecommerce.order o ON oi.id_Order = o.idORDER
     WHERE oi.id_Product IN (SELECT idPRODUCT FROM OwnerProducts) 
     AND o.progress = 'Arrived') AS ArrivedOrders,

    (SELECT SUM((op.productprice - op.productprice * op.discount)  * oi.qte) 
     FROM ecommerce.orderitem oi 
     JOIN ecommerce.order o ON oi.id_Order = o.idORDER
     JOIN OwnerProducts op ON oi.id_Product = op.idPRODUCT
     WHERE oi.status = 'Arrived') AS TotalArrivedOrderValue
;



      `;

    connection.query(query, (err, results) => {
      if (err) {
        res.status(500).json({ error: "Failed to fetch statistics." + err });
        return;
      }

      res.status(200).json(results[0]); // Return the first row which contains all the counts
    });
  } catch (err) {
    res.status(500).json({ error: "Internal server error." });
  }
});
// GET TOP 10 MOST RATED PRODUCTS
router.get("/top-rated-products", async (req, res) => {
  try {
    // Query to retrieve the top 10 most rated products
    const topRatedProductsQuery = `
    SELECT 
    p.idPRODUCT,
    MAX(p.productname) AS productname,
    MAX(p.productdesc) AS productdesc,
    MAX(p.productprice) AS productprice,
    MAX(p.productimage) AS productimage,
    
    AVG(r.rate) AS avg_rating
FROM 
    PRODUCT p
JOIN 
    REVIEWS r ON p.idPRODUCT = r.id_Product
GROUP BY 
    p.idPRODUCT
ORDER BY 
    avg_rating DESC
LIMIT 10;
    `;

    // Execute the query using the connection object
    connection.query(topRatedProductsQuery, (err, topRatedProducts) => {
      if (err) {
        console.error("Error retrieving top rated products:", err);
        res
          .status(500)
          .json({ error: "Failed to retrieve top rated products." });
        return;
      }

      res.status(200).json(topRatedProducts);
    });
  } catch (err) {
    console.error("Internal server error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
});

//TOP 10 RATED PRODUCTS FOR ALL SHOPS OF A SPECIFIC SELLER
//TOP 10 RATED PRODUCTS FOR ALL SHOPS OF A SPECIFIC SELLER
router.get(
  "/top-rated-products/:sellerId",
  verifyTokenAndAuthorizationA_S,
  async (req, res) => {
    try {
      const sellerId = req.params.sellerId;

      // Query to fetch top-rated products for all shops of a specific seller

      const getTopRatedProductsQuery = `
       select DISTINCT(s.idSHOP),p.productimage ,p.idPRODUCT , p.productname, p.productprice ,s.shopname,  AVG(r.rate) AS avgrate from product as p , stock as st  , shop as s , user as u , reviews as r
          where st.id_Shop = s.idSHOP AND 
          p.idPRODUCT = st.id_Product  AND s.id_Owner = ? AND p.idPRODUCT = r.id_Product  group by  s.idSHOP ,p.idPRODUCT , p.productname, p.productprice ,p.productimage , s.shopname order by avgrate DESC ;
      `;

      connection.query(
        getTopRatedProductsQuery,
        [sellerId],
        (err, products) => {
          if (err) {
            console.error("Error retrieving top rated products:", err);
            res
              .status(500)
              .json({ error: "Failed to retrieve top rated products." });
            return;
          }

          res.status(200).json(products);
        }
      );
    } catch (err) {
      console.error("Internal server error:", err);
      res.status(500).json({ error: "Internal server error." });
    }
  }
);

// Get the top 10 sold products
router.get(
  "/top-sold-products-admin",
  verifyTokenAndAdmin,
  async (req, res) => {
    try {
      // Query to get the top 10 sold products from the ORDERITEM table
      const topSoldProductsQuery = `
          SELECT p.idPRODUCT, p.productname, p.productdesc, p.productprice, p.productimage,  SUM(oi.qte) as totalSold
          FROM ORDERITEM oi
          JOIN PRODUCT p ON oi.id_Product = p.idPRODUCT
          GROUP BY p.idPRODUCT, p.productname, p.productdesc, p.productprice, p.productimage
          ORDER BY totalSold DESC
          LIMIT 10;
      `;

      connection.query(topSoldProductsQuery, (err, results) => {
        if (err) {
          console.error("Error fetching top sold products:", err);
          res.status(500).json({ error: "Failed to fetch top sold products." });
          return;
        }

        res.status(200).json(results);
      });
    } catch (err) {
      console.error("Internal server error:", err);
      res.status(500).json({ error: "Internal server error." });
    }
  }
);

// Get the top 10 sold products for a specific seller
router.get(
  "/top-sold-products/:sellerId",
  verifyTokenAndAuthorizationA_S,
  async (req, res) => {
    try {
      const sellerId = req.params.sellerId;

      // Query to get the top 10 sold products for a specific seller
      const topSoldProductsQuery = `
          SELECT p.idPRODUCT, p.productname,p.productprice, p.productimage ,SUM(oi.qte) as totalSold
          FROM ORDERITEM oi
          JOIN PRODUCT p ON oi.id_Product = p.idPRODUCT
          JOIN STOCK s ON p.idPRODUCT = s.id_Product
          JOIN SHOP sh ON s.id_Shop = sh.idSHOP
          WHERE sh.id_Owner = ?
          GROUP BY p.idPRODUCT, p.productname,  p.productprice, p.productimage 
          ORDER BY totalSold DESC
          LIMIT 10;
      `;

      connection.query(topSoldProductsQuery, [sellerId], (err, results) => {
        if (err) {
          console.error("Error fetching top sold products for seller:", err);
          res
            .status(500)
            .json({ error: "Failed to fetch top sold products for seller." });
          return;
        }

        res.status(200).json(results);
      });
    } catch (err) {
      console.error("Internal server error:", err);
      res.status(500).json({ error: "Internal server error." });
    }
  }
);

//ALL STATS
router.get("/orders/status-count", verifyTokenAndAdmin, async (req, res) => {
  try {
    const getOrderStatusCountQuery = `
        SELECT 
          progress, COUNT(*) AS totalOrders 
        FROM 
          \ORDER\
        GROUP BY 
          progress;
      `;

    connection.query(getOrderStatusCountQuery, (err, results) => {
      if (err) {
        console.error("Error fetching order status counts:", err);
        res.status(500).json({ error: "Failed to fetch order status counts." });
        return;
      }

      // Create an object to store the counts
      const statusCounts = {
        "On Way": 0,
        Arrived: 0,
        Failure: 0,
      };

      // Populate the object with the results
      results.forEach((row) => {
        statusCounts[row.progress] = row.totalOrders;
      });

      res.status(200).json(statusCounts);
    });
  } catch (err) {
    console.error("Internal server error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
});

// seller stats

router.get(
  "/seller-stats/:sellerId",
  verifyTokenAndSeller,
  async (req, res) => {
    const sellerId = req.params.sellerId;
    try {
      const query = `
        WITH OwnerProducts AS (
            SELECT DISTINCT p.idPRODUCT, p.productprice , p.discount
            FROM ecommerce.orderitem oi
            JOIN ecommerce.product p ON oi.id_Product = p.idPRODUCT
            JOIN ecommerce.stock st ON p.idPRODUCT = st.id_Product
            JOIN ecommerce.shop sh ON st.id_Shop = sh.idSHOP
            JOIN ecommerce.user o ON sh.id_Owner = ${connection.escape(
              sellerId
            )}
        )
        
        SELECT 
            (SELECT subscription from user where idUSER = ${connection.escape(
              sellerId
            )}  ) AS subs ,
            (SELECT COUNT(*) 
             FROM ecommerce.stock s 
             JOIN ecommerce.shop sh ON s.id_Shop = sh.idSHOP 
             WHERE sh.id_Owner = ${connection.escape(
               sellerId
             )}) AS totalProducts,
             
            (SELECT COUNT(*) 
             FROM ecommerce.shop  
             WHERE id_Owner = ${connection.escape(sellerId)}) AS myshop,
  
            (SELECT COUNT(DISTINCT oi.id_Order) 
             FROM ecommerce.orderitem oi 
             WHERE oi.id_Product IN (SELECT idPRODUCT FROM OwnerProducts)) AS totalOrdersFromOwner,

            (SELECT COUNT(DISTINCT oi.id_Order) 
             FROM ecommerce.orderitem oi 
             JOIN ecommerce.order o ON oi.id_Order = o.idORDER
             WHERE oi.id_Product IN (SELECT idPRODUCT FROM OwnerProducts) 
               AND o.progress = 'Waiting') AS WaitingOrders,

            (SELECT COUNT(DISTINCT oi.id_Order) 
             FROM ecommerce.orderitem oi 
             JOIN ecommerce.order o ON oi.id_Order = o.idORDER
             WHERE oi.id_Product IN (SELECT idPRODUCT FROM OwnerProducts) 
               AND o.progress = 'On Way') AS OnWayOrders,

            (SELECT COUNT(DISTINCT oi.id_Order) 
             FROM ecommerce.orderitem oi 
             JOIN ecommerce.order o ON oi.id_Order = o.idORDER
             WHERE oi.id_Product IN (SELECT idPRODUCT FROM OwnerProducts) 
               AND o.progress = 'Arrived') AS ArrivedOrders,

            (SELECT SUM((op.productprice - op.productprice * op.discount / 100) * oi.qte) 
             FROM ecommerce.orderitem oi 
             JOIN ecommerce.order o ON oi.id_Order = o.idORDER
             JOIN OwnerProducts op ON oi.id_Product = op.idPRODUCT
             WHERE o.progress = 'Arrived') AS TotalArrivedOrderValue;
        `;

      connection.query(query, (err, results) => {
        if (err) {
          res.status(500).json({ error: "Failed to fetch statistics." });
          console.log(err);
          return;
        }

        res.status(200).json(results[0]); // Return the first row containing all the counts
      });
    } catch (err) {
      res.status(500).json({ error: "Internal server error." });
    }
  }
);

module.exports = router;
