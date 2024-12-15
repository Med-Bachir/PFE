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
const { v2: cloudinary } = require("cloudinary");
const { v4: uuidv4 } = require("uuid");

// Cloudinary Configuration
cloudinary.config({
  cloud_name: "dr95wrssj",
  api_key: "419664968851868",
  api_secret: "61D8e5oyWfCQLWBohKa-9t7HxZg",
});

//ADD PRODUCT TO THE SHOP
router.post(
  "/add-product/:shopId",
  verifyTokenAndAuthorizationA_S,
  async (req, res) => {
    try {
      const {
        productname,
        productdesc,
        productprice,
        productimage,
        discount,
        catID,
        subID,
        typeID,
        qte,
        attribute,
      } = req.body;
      const shopId = req.params.shopId;

      // Generate a unique public ID for the image
      const uniquePublicId = `Product_${uuidv4()}`;
      const uploadResult = await cloudinary.uploader.upload(productimage, {
        public_id: uniquePublicId,
      });

      // Insert the product into the database
      const insertProductQuery =
        "INSERT INTO PRODUCT (productname, productdesc, productprice, productimage, discount, id_Category, id_SubCategory, id_Type, attributes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
      const insertProductValues = [
        productname,
        productdesc,
        productprice,
        uploadResult.secure_url,
        discount,
        catID,
        subID,
        typeID,
        JSON.stringify(attribute), // Convert the attributes object to a JSON string
      ];

      connection.query(
        insertProductQuery,
        insertProductValues,
        (err, productResult) => {
          if (err) {
            console.error("Error adding product:", err);
            res.status(500).json({ error: "Failed to add product." });
            return;
          }

          const id_Product = productResult.insertId; // Get the ID of the inserted product

          // Insert stock into the database
          const insertStockQuery =
            "INSERT INTO STOCK (id_Shop, id_Product, qte) VALUES (?, ?, ?)";
          const insertStockValues = [shopId, id_Product, qte];

          connection.query(
            insertStockQuery,
            insertStockValues,
            (err) => {
              if (err) {
                console.error("Error adding stock:", err);
                res.status(500).json({ error: "Failed to add stock." });
                return;
              }

              res
                .status(200)
                .json({ message: "Product and stock added successfully." });
            }
          );
        }
      );
    } catch (err) {
      console.error("Internal server error:", err);
      res.status(500).json({ error: "Internal server error." });
    }
  }
);

router.put("/update/:id", verifyTokenAndAuthorizationA_S, async (req, res) => {
  const { id } = req.params; // Extract id from params
  const { price, discount, quantity } = req.body;

  const updateQuery = "UPDATE PRODUCTS SET productprice = ?, discount = ? WHERE idPRODUCT = ?";
  const updateQuantity = "UPDATE STOCK SET qte = ? WHERE id_Product = ?";

  try {
    // Update the product price and discount
    await new Promise((resolve, reject) => {
      connection.query(updateQuery, [price, discount, id], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });

    // Update the product quantity in stock
    await new Promise((resolve, reject) => {
      connection.query(updateQuantity, [quantity, id], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });

    // Respond with success
    res.status(200).json("Product Updated Successfully");
  } catch (error) {
    // Handle errors
    res.status(404).json({ message: error.message || "Product Not Found" });
  }
});


router.get("/all-products", verifyTokenAndAdmin, async (req, res) => {
  try {
    // Query to fetch all products with the names of shops, categories, and average rating
    const getAllProductsQuery = `
        SELECT 
            p.idPRODUCT,
            p.productname,
            p.productprice,
            p.id_Category,
            p.productimage,
            p.discount,
            s.shopimage ,
            c.categoryname AS categoryName,
            s.idSHOP AS isshop,
            AVG(r.rate) AS avgRate
        FROM 
            PRODUCT p
        JOIN 
            STOCK st ON p.idPRODUCT = st.id_Product
        JOIN 
            SHOP s ON st.id_Shop = s.idSHOP
        JOIN 
            CATEGORIES c ON p.id_Category = c.idCATEGORIES
        LEFT JOIN 
            REVIEWS r ON p.idPRODUCT = r.id_Product
        GROUP BY 
            p.idPRODUCT, p.productname, p.productprice, p.id_Category, s.shopimage, c.categoryname ,p.productimage , s.idSHOP , p.discount ;
      `;

    connection.query(getAllProductsQuery, (err, products) => {
      if (err) {
        console.error("Error executing query:", err.sqlMessage || err.message);
        res.status(500).json({ error: "Failed to fetch products." });
        return;
      }

      // Products successfully fetched with shop names, category names, and average rating
      res.status(200).json(products);
    });
  } catch (err) {
    console.error("Internal server error:", err.message);
    res.status(500).json({ error: "Internal server error." });
  }
});

// GET ALL PRODUCTS FROM THE SHOP
router.get("/shop-products/:shopId", async (req, res) => {
  try {
    const shopId = req.params.shopId;

    // Query to fetch all products associated with the specified shop
    const getProductsQuery = `
          SELECT p.idPRODUCT , p.productname , p.discount , p.productprice , p.productimage , AVG(r.rate) AS rate
          FROM PRODUCT p
          JOIN STOCK s ON p.idPRODUCT = s.id_Product
          LEFT JOIN reviews r ON r.id_Product = p.idPRODUCT
          WHERE s.id_Shop = ?
          GROUP BY p.idPRODUCT , p.productname , p.discount , p.productprice , p.productimage
          ;
      `;
    const getProductsValues = [shopId];

    connection.query(getProductsQuery, getProductsValues, (err, products) => {
      if (err) {
        console.error("Error fetching products:", err);
        res.status(500).json({ error: "Failed to fetch products." });
        return;
      }

      res.status(200).json(products);
    });
  } catch (err) {
    console.error("Internal server error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
});

//get all seller product
router.get(
  "/seller-products/:sellerId",
  verifyTokenAndAuthorizationA_S,
  async (req, res) => {
    try {
      const sellerId = req.params.sellerId;

      // Query to fetch all products associated with the specified seller
      const getProductsQuery = `
          SELECT
          distinct
          p.idPRODUCT,
           p.productname ,
          p.productimage ,
          p.productprice ,
          p.discount,
          p.id_Category,
          p.id_SubCategory,
          p.id_Type,
          p.attributes,
                 s.qte AS quantity,
                 c.categoryname AS categoryName,
                 sh.shopname AS shopName,
                 su.name as subname ,
                 t.name as typename ,
                 AVG(r.rate) AS avgRate
          FROM PRODUCT p
          JOIN STOCK s ON p.idPRODUCT = s.id_Product
          JOIN shop sh ON sh.idSHOP = s.id_Shop
          JOIN CATEGORIES c ON p.id_Category = c.idCATEGORIES
          JOIN types t ON p.id_Type = t.id
          JOIN SUBCATEGORIES su ON p.id_SubCategory = su.id
           LEFT JOIN 
            REVIEWS r ON p.idPRODUCT = r.id_Product
          WHERE sh.id_Owner = ? 
          GROUP BY p.idPRODUCT,
           p.productname ,
          p.productimage ,
          p.productprice ,
          p.discount , c.categoryname , sh.shopname , su.name , t.name  , s.qte ,p.attributes  , p.id_Category,p.id_SubCategory, p.id_Type ;
      `;
      const getProductsValues = [sellerId];

      // Execute the query to get products
      connection.query(getProductsQuery, getProductsValues, (err, products) => {
        if (err) {
          console.error("Error fetching products:", err);
          res.status(500).json({ error: "Failed to fetch products." });
          return;
        }

        res.status(200).json(products);
      });
    } catch (err) {
      console.error("Internal server error:", err);
      res.status(500).json({ error: "Internal server error." });
    }
  }
);

//DELETE PRODUCT

router.delete(
  "/delete-product/:productId",
  verifyTokenAndAuthorizationA_S,
  async (req, res) => {
    try {
      const { productId } = req.params;

      // First, delete the related entries in the STOCK table
      const deleteStockQuery = "DELETE FROM STOCK WHERE id_Product = ?";
      const deleteStockValues = [productId];

      connection.query(
        deleteStockQuery,
        deleteStockValues,
        (err, stockResult) => {
          if (err) {
            console.error("Error deleting stock:", err);
            res.status(500).json({ error: "Failed to delete stock." });
            return;
          }

          // Then, delete the product from the PRODUCT table
          const deleteProductQuery = "DELETE FROM PRODUCT WHERE idPRODUCT = ?";
          const deleteProductValues = [productId];

          connection.query(
            deleteProductQuery,
            deleteProductValues,
            (err, productResult) => {
              if (err) {
                console.error("Error deleting product:", err);
                res.status(500).json({ error: "Failed to delete product." });
                return;
              }

              res
                .status(200)
                .json({ message: "Product deleted successfully." });
            }
          );
        }
      );
    } catch (err) {
      console.error("Internal server error:", err);
      res.status(500).json({ error: "Internal server error." });
    }
  }
);

router.get("/product/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;

    // Query to fetch the product by its ID
    const getProductQuery =
      "SELECT p.* ,sh.idSHOP, sh.shopname ,c.categoryname , s.name as subname, t.name as typename FROM PRODUCT p ,shop sh  ,stock st, categories c , subcategories s , types t WHERE idPRODUCT = ? and p.id_Category = c.idCATEGORIES and s.id = p.id_SubCategory and t.id = p.id_Type and st.id_Product = p.idPRODUCT and st.id_Shop = sh.idSHOP ";
    const getProductValues = [productId];

    connection.query(getProductQuery, getProductValues, (err, product) => {
      if (err) {
        console.error("Error fetching product:", err);
        res.status(500).json({ error: "Failed to fetch product." });
        return;
      }

      if (product.length === 0) {
        res.status(404).json({ error: "Product not found." });
        return;
      }

      // Parse the attributes field if it exists
      let productData = product[0];
      if (productData.attributes) {
        try {
          productData.attributes = JSON.parse(productData.attributes);
        } catch (parseError) {
          console.error("Error parsing attributes:", parseError);
          productData.attributes = 0; // Set to null if parsing fails
        }
      }

      // Query to fetch the average rating for the product
      const getAverageRatingQuery = `
              SELECT AVG(rate) AS averageRate
              FROM REVIEWS
              WHERE id_Product = ?
          `;
      connection.query(
        getAverageRatingQuery,
        [productId],
        (err, ratingResult) => {
          if (err) {
            console.error("Error fetching average rating:", err);
            res.status(500).json({ error: "Failed to fetch average rating." });
            return;
          }

          const averageRate = ratingResult[0]?.averageRate;
          const productWithRating = {
            ...productData,
            averageRate: averageRate !== null ? averageRate : "No ratings yet",
          };

          // Product and average rating successfully fetched
          res.status(200).json(productWithRating);
        }
      );
    });
  } catch (err) {
    console.error("Internal server error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
});

//GET PRODUCTS BY CATORY NAME

router.get("/:categoryName", async (req, res) => {
  try {
    const categoryName = req.params.categoryName;

    // Query to fetch products by category name
    const getProductsByCategoryQuery = `
          SELECT p.* 
          FROM PRODUCT p
          JOIN CATEGORIES c ON p.id_Category = c.idCATEGORIES
          WHERE c.categoryname = ?
      `;
    const getProductsByCategoryValues = [categoryName];

    connection.query(
      getProductsByCategoryQuery,
      getProductsByCategoryValues,
      (err, products) => {
        if (err) {
          console.error("Error fetching products by category:", err);
          res.status(500).json({ error: "Failed to fetch products." });
          return;
        }

        // Products successfully fetched
        res.status(200).json(products);
      }
    );
  } catch (err) {
    console.error("Internal server error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
});
// Get products by category name and subcategory
router.get("/:categoryName/:sub", async (req, res) => {
  try {
    const { categoryName, sub } = req.params;

    const getProductsByCategoryQuery = `
      SELECT p.* 
      FROM PRODUCT p
      JOIN CATEGORIES c ON p.id_Category = c.idCATEGORIES
      JOIN SUBCATEGORIES s ON p.id_SubCategory = s.id
      WHERE c.categoryname = ? AND s.name = ? + '\n'
    `;

    connection.query(
      getProductsByCategoryQuery,
      [categoryName, sub],
      (err, products) => {
        if (err) {
          console.error("Error fetching products by category:", err);
          res.status(500).json({ error: "Failed to fetch products." });
          return;
        }

        res.status(200).json(products);
      }
    );
  } catch (err) {
    console.error("Internal server error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
});

// Get products by category name, subcategory, and type
router.get("/:categoryName/:sub/:type", async (req, res) => {
  try {
    const { categoryName, sub, type } = req.params;

    const getProductsByCategoryQuery = `
      SELECT p.* 
      FROM PRODUCT p
      JOIN CATEGORIES c ON p.id_Category = c.idCATEGORIES
      JOIN SUBCATEGORIES s ON p.id_SubCategory = s.id
      JOIN TYPES t ON p.id_Type = t.id
      WHERE c.categoryname = ? AND s.name = ? + '\n' AND t.name = ?
    `;

    connection.query(
      getProductsByCategoryQuery,
      [categoryName, sub, type],
      (err, products) => {
        if (err) {
          console.error("Error fetching products by category:", err);
          res.status(500).json({ error: "Failed to fetch products." });
          return;
        }

        res.status(200).json(products);
      }
    );
  } catch (err) {
    console.error("Internal server error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
});

//COMPARATEUR

function calculateSimilarity(product1, product2) {
  const fuse = new Fuse([product1], {
    includeScore: true,
    keys: ["productname", "productdesc"],
  });
  const result = fuse.search(product2.productname);
  if (result.length > 0) {
    return 1 - result[0].score; // Score ranges from 0 to 1, so 1 minus the score gives similarity
  }
  return 0; // If no result is found, return 0 similarity
}

router.get("/similar-products/:productId", (req, res) => {
  const productId = req.params.productId;

  // Fetch product details based on the provided product ID
  const getProductQuery = `
        SELECT 
            p.idPRODUCT,
            p.productname,
            p.productdesc,
            p.productprice,
            p.productimage,
            p.productcolor,
            p.productsize,
            c.categoryname,
            c.categoryimage,
            s.id_Shop,
            s.qte
        FROM 
            PRODUCT p
        INNER JOIN 
            STOCK s ON p.idPRODUCT = s.id_Product
        INNER JOIN 
            CATEGORIES c ON p.id_Category = c.idCATEGORIES
        WHERE
            p.idPRODUCT = ?;
    `;

  connection.query(getProductQuery, [productId], (err, productResult) => {
    if (err) {
      console.error("Error fetching product:", err);
      res.status(500).json({ error: "Failed to fetch product." });
      return;
    }

    // If product not found, return error
    if (productResult.length === 0) {
      res.status(404).json({ error: "Product not found." });
      return;
    }

    const product = productResult[0];

    // Fetch all other products from different shops
    const getAllProductsQuery = `
            SELECT 
                p.idPRODUCT,
                p.productname,
                p.productdesc,
                p.productprice,
                p.productimage,
                p.productcolor,
                p.productsize,
                c.categoryname,
                c.categoryimage,
                s.id_Shop,
                s.qte
            FROM 
                PRODUCT p
            INNER JOIN 
                STOCK s ON p.idPRODUCT = s.id_Product
            INNER JOIN 
                CATEGORIES c ON p.id_Category = c.idCATEGORIES
            WHERE
                p.idPRODUCT != ?;
        `;

    connection.query(getAllProductsQuery, [productId], (err, results) => {
      if (err) {
        console.error("Error fetching products:", err);
        res.status(500).json({ error: "Failed to fetch products." });
        return;
      }

      // Array to store similar products
      const similarProducts = [];

      // Iterate through each product to compare their names and descriptions with the provided product
      for (let i = 0; i < results.length; i++) {
        const similarityName = calculateSimilarity(product, results[i]);

        // If similarity score is above threshold, consider them similar
        if (similarityName > 0.6) {
          similarProducts.push(results[i]);
        }
      }

      // Send similar products as response
      res.json(similarProducts);
    });
  });
});

// GET ALL PRODUCTS WITH CATEGORY NAMES
router.get("/", async (req, res) => {
  try {
    // Fetch all products with their corresponding category names
    const getAllProductsWithCategoriesQuery = `
              SELECT 
                  p.idPRODUCT , p.productname , p.productprice , p.productimage , p.discount , AVG(r.rate) AS rate from product p 
                  LEFT JOIN reviews r ON r.id_Product = p.idPRODUCT
                  GROUP BY p.idPRODUCT , p.productname , p.productprice , p.productimage , p.discount ORDER BY AVG(r.rate) desc
               
          `;

    connection.query(getAllProductsWithCategoriesQuery, (err, products) => {
      if (err) {
        console.error("Error fetching products with categories:", err);
        res
          .status(500)
          .json({ error: "Failed to fetch products with categories." });
        return;
      }

      res.status(200).json(products);
    });
  } catch (err) {
    console.error("Internal server error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
});

router.get(
  "/seller-orders/:sellerId",
  verifyTokenAndSeller,
  async (req, res) => {
    try {
      const sellerId = req.params.sellerId;

      const getSellerOrdersQuery = `
        SELECT 
          o.idORDER,
          o.qte,
          DATE_FORMAT(DATE_ADD(o.estimtedtime, INTERVAL 2 DAY), '%Y-%m-%d') AS estimatedDelivery,
          ship.shippingname,
          a.state,
          a.postal_code,
          SUM(oi.qte) AS totalQuantity,
          SUM(oi.qte * p.productprice) AS totalRevenue
        FROM 
          \ORDER\ o
        JOIN 
          ORDERITEM oi ON o.idORDER = oi.id_Order
        JOIN 
          PRODUCT p ON oi.id_Product = p.idPRODUCT
        JOIN 
          STOCK s ON p.idPRODUCT = s.id_Product
        JOIN 
          SHOP sh ON s.id_Shop = sh.idSHOP
        JOIN 
          ADDRESS a ON o.id_Adrress = a.idADDRESS
        JOIN 
          SHIPPING ship ON o.id_Shipping = ship.idSHIPPING
        WHERE 
          sh.id_Owner = ?
        GROUP BY 
          o.id_User, o.idORDER, o.id_Adrress, o.qte, estimatedDelivery, ship.shippingname, a.state, a.postal_code;
      `;

      connection.query(getSellerOrdersQuery, [sellerId], (err, orders) => {
        if (err) {
          console.error("Error fetching seller orders:", err);
          res.status(500).json({ error: "Failed to fetch seller orders." });
          return;
        }

        res.status(200).json(orders);
      });
    } catch (err) {
      console.error("Internal server error:", err);
      res.status(500).json({ error: "Internal server error." });
    }
  }
);

//total orders status
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

module.exports = router;
