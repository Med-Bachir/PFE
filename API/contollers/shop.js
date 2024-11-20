const {verifyTokenAndSeller,verifyTokenAndAuthorizationA_S ,verifyTokenAndAuthorizationA_C, verifyTokenAndAdminandSeller, verifyToken,verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifytoken");
const connection = require('../db');
const { query } = require("../utils/promiseQuery.js");
const router = require("express").Router();

// CREATE SHOP
router.post("/create-shop/:id_Owner", verifyTokenAndAuthorizationA_S, async (req, res) => {
    try {
        const { shopname, shopimage, shopdesc, shopcover, number, country, state, city, street } = req.body;
        const id_Owner = req.params.id_Owner;

        // Check if the owner has already submitted a shop creation request
        const checkExistingRequestQuery = "SELECT * FROM SHOP WHERE id_Owner = ? AND status = 'close'";
        const checkExistingRequestValues = [id_Owner];

        connection.query(checkExistingRequestQuery, checkExistingRequestValues, (err, existingRequestResult) => {
            if (err) {
                console.error("Error checking existing request:", err);
                res.status(500).json({ error: "Failed to check existing request." });
                return;
            }

            if (existingRequestResult.length > 0) {
                // If an existing pending request is found, inform the user and ask them to wait
                res.status(400).json({ error: "You have already submitted a shop creation request. Please wait for admin approval." });
                return;
            }

            // Continue with the shop creation process

            // Insert location into the database
            const insertLocationQuery = "INSERT INTO LOCATION (country, state, city, street) VALUES (?, ?, ?, ?)";
            const insertLocationValues = [country, state, city, street];

            connection.query(insertLocationQuery, insertLocationValues, (err, locationResult) => {
                if (err) {
                    console.error("Error inserting location:", err);
                    res.status(500).json({ error: "Failed to insert location." });
                    return;
                }

                const id_Location = locationResult.insertId; // Get the ID of the inserted location

                // Insert shop into the database with status as "Pending"
                const insertShopQuery = "INSERT INTO SHOP (id_Owner, shopname, shopimage, shopdesc, status, shopcover, number, id_Location, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())";
                const insertShopValues = [id_Owner, shopname, shopimage, shopdesc, 'Waiting', shopcover, number, id_Location];

                connection.query(insertShopQuery, insertShopValues, (err, shopResult) => {
                    if (err) {
                        console.error("Error creating shop:", err);
                        res.status(500).json({ error: "Failed to create shop." });
                        return;
                    }

                    // Fetch the username of the seller
                    const getUsernameQuery = "SELECT username FROM user WHERE idUSER = ?";
                    connection.query(getUsernameQuery, [id_Owner], (err, userResult) => {
                        if (err) {
                            console.error("Error fetching username:", err);
                            res.status(500).json({ error: "Failed to fetch username." });
                            return;
                        }

                        const senderUsername = userResult[0].username;

                        // Insert notification for admin
                        const notificationText = ` ${senderUsername} send request to Open ${shopname}.`;
                        const insertNotificationQuery = "INSERT INTO NOTIFICATION (text, type, reciver) VALUES (?, ?, ?)";
                        const insertNotificationValues = [notificationText, 'Shop Created', 1];

                        connection.query(insertNotificationQuery, insertNotificationValues, (err, notificationResult) => {
                            if (err) {
                                console.error("Failed to create notification:", err);
                                // Don't send an error response here as it's an optional step and doesn't affect shop creation
                            }

                            res.status(200).json({ message: "Shop creation request submitted successfully. Please wait for admin approval." });
                        });
                    });
                });
            });
        });
    } catch (err) {
        console.error("Internal server error:", err);
        res.status(500).json({ error: "Internal server error." });
    }
});


// ADMIN APPROVE SELLER SHOP
router.put("/approve-seller/:shopId", verifyTokenAndAdmin, async (req, res) => {
    try {
        const { shopId } = req.params;

        // Update the status of the shop to "Accepted"
        const updateShopQuery = "UPDATE SHOP SET status = 'open' WHERE idSHOP = ?";
        const updateShopValues = [shopId];

        connection.query(updateShopQuery, updateShopValues, (err, result) => {
            if (err) {
                console.error("Error updating shop status:", err);
                res.status(500).json({ error: "Failed to approve seller." });
                return;
            }

            if (result.affectedRows === 0) {
                res.status(404).json({ error: "Shop not found." });
                return;
            }

            // Get the seller's ID from the shop details
            const getSellerIdQuery = "SELECT id_Owner FROM SHOP WHERE idSHOP = ?";
            const getSellerIdValues = [shopId];

            connection.query(getSellerIdQuery, getSellerIdValues, (err, sellerResult) => {
                if (err) {
                    console.error("Error fetching seller ID:", err);
                    res.status(500).json({ error: "Failed to approve seller." });
                    return;
                }

                const sellerId = sellerResult[0].id_Owner;

                // Insert notification for the seller
                const notificationText = "Your shop has been approved by the admin.";
                const insertNotificationQuery = "INSERT INTO NOTIFICATION (text, type, reciver) VALUES (?, ?, ?)";
                const insertNotificationValues = [notificationText, 'Shop Approved', sellerId];

                connection.query(insertNotificationQuery, insertNotificationValues, (err, notificationResult) => {
                    if (err) {
                        console.error("Failed to create notification for seller:", err);
                        // Don't send an error response here as it's an optional step and doesn't affect the approval process
                    }

                    res.status(200).json({ message: "Seller approved successfully." });
                });
            });
        });
    } catch (err) {
        console.error("Internal server error:", err);
        res.status(500).json({ error: "Internal server error." });
    }
});

// GET SHOP APPROVAL NOTIFICATIONS FOR SELLER
router.get("/shop-approval-notifications/:reciver", verifyTokenAndSeller, async (req, res) => {
    try {
        const sellerId = req.params.reciver; // Extracting sellerId from route parameters

        // Fetch notifications of type 'Shop Approved' for the seller
        const getNotificationsQuery = "SELECT * FROM NOTIFICATION WHERE reciver = ?";
        const getNotificationsValues = [sellerId];

        connection.query(getNotificationsQuery, getNotificationsValues, (err, notifications) => {
            if (err) {
                console.error("Error fetching shop approval notifications:", err);
                res.status(500).json({ error: "Failed to fetch notifications." });
                return;
            }

            res.status(200).json(notifications);
        });
    } catch (err) {
        console.error("Internal server error:", err);
        res.status(500).json({ error: "Internal server error." });
    }
});

// ADMIN REFUSE SHOP
router.delete("/refuse-shop/:shopId", verifyTokenAndAdmin, async (req, res) => {
    try {
        const { shopId } = req.params;

        // First, fetch the shop details to get the owner's ID
        const getShopOwnerQuery = "SELECT id_Owner FROM SHOP WHERE idSHOP = ?";
        const getShopOwnerValues = [shopId];

        connection.query(getShopOwnerQuery, getShopOwnerValues, (err, shopOwnerResult) => {
            if (err) {
                console.error("Error fetching shop owner details:", err);
                res.status(500).json({ error: "Failed to refuse shop." });
                return;
            }

            if (shopOwnerResult.length === 0) {
                res.status(404).json({ error: "Shop not found." });
                return;
            }

            const shopOwnerId = shopOwnerResult[0].id_Owner;

            // Delete the shop request
            const deleteShopQuery = "DELETE FROM SHOP WHERE idSHOP = ?";
            connection.query(deleteShopQuery, [shopId], (err, deleteResult) => {
                if (err) {
                    console.error("Error deleting shop request:", err);
                    res.status(500).json({ error: "Failed to refuse shop." });
                    return;
                }

                if (deleteResult.affectedRows === 0) {
                    res.status(404).json({ error: "Shop not found." });
                    return;
                }

                // Send notification to the seller
                const notificationText = "Your shop application has been refused by the admin.";
                const insertNotificationQuery = "INSERT INTO NOTIFICATION (text, type, reciver) VALUES (?, ?, ?)";
                const insertNotificationValues = [notificationText, 'Shop Refused', shopOwnerId];

                connection.query(insertNotificationQuery, insertNotificationValues, (err, notificationResult) => {
                    if (err) {
                        console.error("Failed to create notification for seller:", err);
                        // Don't send an error response here as it's an optional step and doesn't affect the refusal process
                    }

                    res.status(200).json({ message: "Shop refused successfully." });
                });
            });
        });
    } catch (err) {
        console.error("Internal server error:", err);
        res.status(500).json({ error: "Internal server error." });
    }
});

// DELETE NOTIFICATION
router.delete("/notifications/:notificationId", verifyToken, async (req, res) => {
    try {
        const { notificationId } = req.params;

        // Check if the notification exists
        const checkNotificationQuery = "SELECT * FROM NOTIFICATION WHERE idNOTIFICATION = ?";
        connection.query(checkNotificationQuery, [notificationId], (err, notificationResult) => {
            if (err) {
                console.error("Error checking notification:", err);
                res.status(500).json({ error: "Failed to delete notification." });
                return;
            }

            if (notificationResult.length === 0) {
                res.status(404).json({ error: "Notification not found." });
                return;
            }

            // Delete the notification
            const deleteNotificationQuery = "DELETE FROM NOTIFICATION WHERE idNOTIFICATION = ?";
            connection.query(deleteNotificationQuery, [notificationId], (err, deleteResult) => {
                if (err) {
                    console.error("Error deleting notification:", err);
                    res.status(500).json({ error: "Failed to delete notification." });
                    return;
                }

                res.status(200).json({ message: "Notification deleted successfully." });
            });
        });
    } catch (err) {
        console.error("Internal server error:", err);
        res.status(500).json({ error: "Internal server error." });
    }
});
// GET ADMIN NOTIFICATIONS
router.get("/admin-notifications", verifyTokenAndAdmin, async (req, res) => {
    try {
        // Fetch notifications for the admin
        const getNotificationsQuery = "SELECT * FROM NOTIFICATION WHERE reciver = ?";
        const adminId = 1; // Assuming admin's ID is 1, replace it with the actual admin's ID if different
        const getNotificationsValues = [adminId];

        connection.query(getNotificationsQuery, getNotificationsValues, (err, notifications) => {
            if (err) {
                console.error("Error fetching admin notifications:", err);
                res.status(500).json({ error: "Failed to fetch admin notifications." });
                return;
            }

            res.status(200).json(notifications);
        });
    } catch (err) {
        console.error("Internal server error:", err);
        res.status(500).json({ error: "Internal server error." });
    }
});
// GET ALL SHOPS
router.get("/shops-admin", verifyTokenAndAdmin, async (req, res) => {
    try {
        // Fetch details for all shops and sort by shop status (closed shops first)
        const shopDetailsQuery = `
           SELECT 
    s.idSHOP AS ShopID,
    s.shopname AS ShopName,
    s.shopimage AS ShopImage,
    s.status AS ShopStatus,
    COALESCE(prod_count.TotalProducts, 0) AS TotalProducts,
    COALESCE(ord_count.TotalOrders, 0) AS TotalOrders,
    u.username AS OwnerName
FROM 
    SHOP s
LEFT JOIN 
    USER u ON s.id_Owner = u.idUSER

-- Subquery for counting unique products per shop
LEFT JOIN (
    SELECT 
        st.id_Shop,
        COUNT(DISTINCT st.id_Product) AS TotalProducts
    FROM 
        STOCK st
    JOIN 
        PRODUCT p ON st.id_Product = p.idPRODUCT
    GROUP BY 
        st.id_Shop
) AS prod_count ON s.idSHOP = prod_count.id_Shop

-- Subquery for counting unique orders per shop
LEFT JOIN (
    SELECT 
        st.id_Shop,
        COUNT(DISTINCT o.idORDER) AS TotalOrders
    FROM 
        STOCK st
    JOIN 
        PRODUCT p ON st.id_Product = p.idPRODUCT
    JOIN 
        ORDERITEM oi ON p.idPRODUCT = oi.id_Product
    JOIN 
        ecommerce.ORDER o ON oi.id_Order = o.idORDER
    GROUP BY 
        st.id_Shop
) AS ord_count ON s.idSHOP = ord_count.id_Shop

GROUP BY 
    s.idSHOP, s.shopname, s.shopimage, s.status, u.username

ORDER BY 
    CASE 
        WHEN s.status = 'Close' THEN 0
        ELSE 1
    END;

        `;

        connection.query(shopDetailsQuery, (err, results) => {
            if (err) {
                console.error("Error fetching shop details:", err);
                res.status(500).json({ error: "Failed to fetch shop details." });
                return;
            }

            res.status(200).json(results);
        });
    } catch (err) {
        console.error("Internal server error:", err);
        res.status(500).json({ error: "Internal server error." });
    }
});


// GET ALL SHOPS
router.get("/shops-requests", verifyTokenAndAdmin, async (req, res) => {
    try {
        // Fetch details for all shops and sort by shop status (closed shops first)
        const shopDetailsQuery = `
    SELECT 
    s.idSHOP AS ShopID,
    s.shopname AS ShopName,
    s.shopimage AS ShopImage,
    s.status AS ShopStatus,
    u.username AS OwnerName,
    (
      SELECT COUNT(DISTINCT p.idPRODUCT)
      FROM ecommerce.STOCK st
      JOIN ecommerce.PRODUCT p ON st.id_Product = p.idPRODUCT
      WHERE st.id_Shop = s.idSHOP
    ) AS TotalProducts,
    (
      SELECT COUNT(DISTINCT o.idORDER)
      FROM ecommerce.ORDERITEM oi
      JOIN ecommerce.ORDER o ON oi.id_Order = o.idORDER
      WHERE oi.id_Product IN (SELECT st.id_Product FROM ecommerce.STOCK st WHERE st.id_Shop = s.idSHOP)
    ) AS TotalOrders
FROM 
    ecommerce.SHOP s
LEFT JOIN 
    ecommerce.USER u ON s.id_Owner = u.idUSER
WHERE 
    s.status = 'Waiting';


            
        `;

        connection.query(shopDetailsQuery, (err, results) => {
            if (err) {
                console.error("Error fetching shop details:", err);
                res.status(500).json({ error: "Failed to fetch shop details." });
                return;
            }

            res.status(200).json(results);
        });
    } catch (err) {
        console.error("Internal server error:", err);
        res.status(500).json({ error: "Internal server error." });
    }
});



// GET ALL SHOPS FOR CLIENT
router.get("/shops-client", async (req, res) => {
    try {
        // Fetch only shop name, shop image, and location details
        const shopDetailsQuery = `
            SELECT 
            s.idSHOP AS idShop,
                s.shopname AS ShopName,
                s.shopimage AS ShopImage,
                l.country AS Country,
                l.state AS State,
                l.city AS City,
                l.street AS Street
            FROM 
                SHOP s
            LEFT JOIN 
                LOCATION l ON s.id_Location = l.idLOCATION;
        `;

        connection.query(shopDetailsQuery, (err, results) => {
            if (err) {
                console.error("Error fetching shop details:", err);
                res.status(500).json({ error: "Failed to fetch shop details." });
                return;
            }

            res.status(200).json(results);
        });
    } catch (err) {
        console.error("Internal server error:", err);
        res.status(500).json({ error: "Internal server error." });
    }
});


//get shop 
router.get("/shops/:id", async (req, res) => {
    try {
        const shopId = req.params.id;

        // Query to get shop details
        const shopDetailsQuery = `
            SELECT 
                s.idSHOP AS ShopID,
                s.shopname AS ShopName,
                s.shopimage AS ShopImage,
                s.shopcover AS ShopCover,
                s.status AS ShopStatus,
                s.shopdesc AS ShopDesc,
                YEAR(s.createdAt) AS CreatedAt,
                s.number AS ShopPhoneNumber,
                COALESCE(s.id_Location, 0) AS LocationID,
                COALESCE(l.country, '') AS Country,
                COALESCE(l.state, '') AS State,
                COALESCE(l.city, '') AS City,
                COALESCE(l.street, '') AS Street
            FROM 
                SHOP s
            LEFT JOIN 
                LOCATION l ON s.id_Location = l.idLOCATION
            WHERE 
                s.idSHOP = ?;
        `;

        // Query to get total product count for the shop
        const productCountQuery = `
            SELECT 
                COUNT(DISTINCT p.idPRODUCT) AS TotalProducts
            FROM 
                STOCK st
            JOIN 
                PRODUCT p ON st.id_Product = p.idPRODUCT
            WHERE 
                st.id_Shop = ?;
        `;

        connection.query(shopDetailsQuery, [shopId], (err, shopDetails) => {
            if (err) {
                console.error("Error fetching shop details:", err);
                res.status(500).json({ error: "Failed to fetch shop details." });
                return;
            }

            connection.query(productCountQuery, [shopId], (err, productCount) => {
                if (err) {
                    console.error("Error fetching product count:", err);
                    res.status(500).json({ error: "Failed to fetch product count." });
                    return;
                }

                const result = {
                    ...shopDetails[0],
                    TotalProducts: productCount[0].TotalProducts,
                };

                res.status(200).json(result);
            });
        });
    } catch (err) {
        console.error("Internal server error:", err);
        res.status(500).json({ error: "Internal server error." });
    }
});




router.get("/seller-shops/:idOwner", verifyTokenAndAuthorizationA_S, async (req, res) => {
    
    const  idOwner  = req.params.idOwner;
    console.log(`Received request for owner ID: ${idOwner}`);
    try {
        // Fetch details for shops by a specific owner, including total products and total orders
        const shopDetailsQuery = `
        select DISTINCT(idSHOP),shopname  from shop , user where id_Owner = ? `;

                

        connection.query(shopDetailsQuery, [idOwner], (err, results) => {
            if (err) {
                console.error("Error fetching shop details:", err);
                res.status(500).json({ error: "Failed to fetch shop details." });
                
                return;
            }

            if (results.length === 0) {
                console.log("No shops found for this owner.");
                
            } else {
                console.log("Shops found:", results);
                
            }

            res.status(200).json(results);
            console.log(results)
            
        });
    } catch (err) {
        console.error("Internal server error:", err);
        res.status(500).json({ error: "Internal server error." });
        
    }
});



// GET seller SHOPS with total products and orders
router.get("/shops-seller-view/:idOwner", verifyTokenAndAuthorizationA_S, async (req, res) => {
    
    const  idOwner  = req.params.idOwner;
    console.log(`Received request for owner ID: ${idOwner}`);
    try {
        // Fetch details for shops by a specific owner, including total products and total orders
        const shopDetailsQuery = `
            SELECT 
                s.idSHOP AS ShopID,
                s.shopname AS ShopName,
                s.shopimage AS ShopImage,
                s.status AS ShopStatus,
                COALESCE(p.totalProducts, 0) AS TotalProducts,
                COALESCE(o.totalOrders, 0) AS TotalOrders
            FROM 
                SHOP s
            LEFT JOIN (
                SELECT 
                    id_Shop, COUNT(*) AS totalProducts
                FROM 
                    STOCK
                GROUP BY 
                    id_Shop
            ) p ON s.idSHOP = p.id_Shop
            LEFT JOIN (
                SELECT 
                    st.id_Shop, COUNT(DISTINCT oi.id_Order) AS totalOrders
                FROM 
                    STOCK st
                JOIN 
                    PRODUCT p ON st.id_Product = p.idPRODUCT
                JOIN 
                    ORDERITEM oi ON p.idPRODUCT = oi.id_Product
                GROUP BY 
                    st.id_Shop
            ) o ON s.idSHOP = o.id_Shop
            WHERE 
                s.id_Owner = ?`;

                

        connection.query(shopDetailsQuery, [idOwner], (err, results) => {
            if (err) {
                console.error("Error fetching shop details:", err);
                res.status(500).json({ error: "Failed to fetch shop details." });
                console.log('here')
                return;
            }

            if (results.length === 0) {
                console.log("No shops found for this owner.");
                console.log('here2')
            } else {
                console.log("Shops found:", results);
                console.log('here3')
            }

            res.status(200).json(results);
            console.log(results)
            console.log('first')
        });
    } catch (err) {
        console.error("Internal server error:", err);
        res.status(500).json({ error: "Internal server error." });
        console.log('first')
    }
});






//delete shop
router.delete("/delete/:shopId", verifyTokenAndAuthorizationA_S, async (req, res) => {
    const shopId = req.params.shopId;

    // Start a transaction
    connection.beginTransaction(err => {
        if (err) {
            console.error("Error starting transaction:", err);
            res.status(500).json({ error: "Failed to start transaction." });
            return;
        }

        // Step 1: Delete the stock associated with the shop
        const deleteStockQuery = "DELETE FROM STOCK WHERE id_Shop = ?";
        connection.query(deleteStockQuery, [shopId], (err, result) => {
            if (err) {
                console.error("Error deleting stock:", err);
                return connection.rollback(() => {
                    res.status(500).json({ error: "Failed to delete stock." });
                });
            }

            // Step 2: Delete the products associated with the shop
            const deleteProductsQuery = `
                DELETE FROM PRODUCT 
                WHERE idPRODUCT IN (
                    SELECT id_Product 
                    FROM STOCK 
                    WHERE id_Shop = ?
                )`;
            connection.query(deleteProductsQuery, [shopId], (err, result) => {
                if (err) {
                    console.error("Error deleting products:", err);
                    return connection.rollback(() => {
                        res.status(500).json({ error: "Failed to delete products." });
                    });
                }

                // Step 3: Delete the shop
                const deleteShopQuery = "DELETE FROM SHOP WHERE idSHOP = ?";
                connection.query(deleteShopQuery, [shopId], (err, result) => {
                    if (err) {
                        console.error("Error deleting shop:", err);
                        return connection.rollback(() => {
                            res.status(500).json({ error: "Failed to delete shop." });
                        });
                    }

                    if (result.affectedRows === 0) {
                        return connection.rollback(() => {
                            res.status(404).json({ error: "Shop not found." });
                        });
                    }

                    // Commit the transaction if all queries succeed
                    connection.commit(err => {
                        if (err) {
                            console.error("Error committing transaction:", err);
                            return connection.rollback(() => {
                                res.status(500).json({ error: "Failed to commit transaction." });
                            });
                        }

                        // Shop and associated stock and products successfully deleted
                        res.status(200).json({ message: "Shop and associated stock and products deleted successfully." });
                    });
                });
            });
        });
    });
});




module.exports = router ;