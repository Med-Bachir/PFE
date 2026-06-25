const {verifyTokenAndSeller,verifyTokenAndAuthorizationA_S ,verifyTokenAndAuthorizationA_C, verifyTokenAndAdminandSeller, verifyToken,verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifytoken");
const connection = require('../db');
const { query } = require("../utils/promiseQuery.js");
const router = require("express").Router();


router.post('/checkout/:userId', async (req, res) => {
  const userId = req.params.userId;
  const { state, postalcode, city , phonenumber , type } = req.body.orderDetails;
  
  const cartQuery = `
    SELECT c.id_Product, c.attributes, c.quantity, p.productprice
    FROM CART c , product p
    WHERE id_Client = ? AND c.id_Product = p.idPRODUCT
  `;

  try {
    const cartProducts = await new Promise((resolve, reject) => {
      connection.query(cartQuery, [userId], (err, results) => {
        if (err) {
          console.error("Error fetching cart products:", err);
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    if (!cartProducts || cartProducts.length === 0) {
      return res.status(400).json({ error: "No products found in the cart." });
    }

    connection.beginTransaction(async (err) => {
      if (err) {
        return res.status(500).json({ error: "Transaction start failed." });
      }

      try {
        // Insert address into ADDRESS table
        const addressInsertQuery = `
          INSERT INTO ADDRESS (state, postal_code, city)
          VALUES (?, ?, ?)
        `;
        const addressResult = await new Promise((resolve, reject) => {
          connection.query(addressInsertQuery, [state, postalcode, city], (err, results) => {
            if (err) reject(err);
            else resolve(results);
          });
        });
        const addressId = addressResult.insertId;
/*
        // Insert shipping details into SHIPPING table
        const shippingInsertQuery = `
          INSERT INTO SHIPPING (shippingname, shippingimg, shippingprice, availability)
          VALUES (?, ?, ?, ?)
        `;
        const shippingResult = await new Promise((resolve, reject) => {
          connection.query(shippingInsertQuery, [shippingname, shippingimg, shippingprice, availability], (err, results) => {
            if (err) reject(err);
            else resolve(results);
          });
        });
        const shippingId = shippingResult.insertId;*/

        // Define values for the ORDER table
        const qteValue = cartProducts.reduce((sum, item) => sum + item.quantity, 0);
        const estimatedTimeValue = new Date(); // Placeholder, adjust as needed
        const createdAtValue = new Date();
        const discountValue = 0; // Placeholder discount logic
        const progressValue = 'Waiting'; // Starting status for order
        const currentplaceValue = 'Store Storage'; // Example starting point
        

        // Insert order details into ORDER table, including phone, currentplace, and type
        const orderInsertQuery = `
          INSERT INTO \`ORDER\` (id_User, id_Adrress, qte, estimtedtime, createdAt, discount, id_Shipping, progress, currentplace, phone, type)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const orderResult = await new Promise((resolve, reject) => {
          connection.query(orderInsertQuery, [userId, addressId, qteValue, estimatedTimeValue, createdAtValue, discountValue, 1, progressValue, currentplaceValue, phonenumber, type], (err, results) => {
            if (err) reject(err);
            else resolve(results);
          });
        });
        const orderId = orderResult.insertId;

        // Insert order items into ORDERITEM table
        const orderItemsQuery = `
          INSERT INTO ORDERITEM (id_Order, id_Product, qte, attributes)
          VALUES (?, ?, ?, ?)
        `;
        for (const product of cartProducts) {
          const { id_Product, attributes, quantity } = product;
          console.log(quantity)
          await new Promise((resolve, reject) => {
            connection.query(orderItemsQuery, [orderId, id_Product, quantity, attributes], (err, results) => {
              if (err) reject(err);
              else resolve(results);
            });
          });
        }

        // Delete products from CART table
        const deleteCartQuery = `
          DELETE FROM CART
          WHERE id_Client = ? AND id_Product IN (?)
        `;
        await new Promise((resolve, reject) => {
          connection.query(deleteCartQuery, [userId, cartProducts.map(p => p.id_Product)], (err, results) => {
            if (err) reject(err);
            else resolve(results);
          });
        });

        connection.commit((err) => {
          if (err) {
            return connection.rollback(() => {
              res.status(500).json({ error: "Transaction commit failed." });
            });
          }
          res.status(200).json({ message: "Order placed successfully.", orderId });
        });
      } catch (error) {
        connection.rollback(() => {
          console.error("Transaction error:", error);
          res.status(500).json({ error: "Transaction failed.", details: error });
        });
      }
    });
  } catch (error) {
    console.error("Error retrieving cart products:", error);
    res.status(500).json({ error: "Error retrieving cart products.", details: error });
  }
});


router.put("/client/update-order-stats/:id", verifyTokenAndAuthorizationA_S, async (req, res) => {
  const orderId = req.params.id;
  const { status, currentplace, userId } = req.body; // Ensure userId is included in the request body
console.log(req.body)
  try {
    const updateOrderStatusQuery = `
      UPDATE \`order\`
      SET progress = ?, currentplace = ?
      WHERE idORDER = ?;
    `;

    connection.query(updateOrderStatusQuery, [status, currentplace, orderId], (err, results) => {
      if (err) {
        console.error("Error updating order status:", err);
        return res.status(500).json({ error: "Failed to update order status." });
      }

      // Insert a notification for the user
      const insertNotificationQuery = `
        INSERT INTO notification (text, type, reciver)
        VALUES (?, ?, ?);
      `;

      const notificationText = `Your order #${orderId} status has been updated to "${status}" at "${currentplace}".`;
      const notificationType = "order_update"; // You can define notification types as needed

      connection.query(insertNotificationQuery, [notificationText, notificationType, userId], (err, results) => {
        if (err) {
          console.error("Error sending notification:", err);
          return res.status(500).json({ error: "Failed to send notification." });
        }

        res.status(200).json({ message: "Order status updated and notification sent successfully." });
      });
    });
  } catch (err) {
    console.error("Internal server error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
});

router.put("/seller/update-orderitem-stats/:id", verifyTokenAndAuthorizationA_S, async (req, res) => {
  const orderId = req.params.id; // ID of the order being updated
  const { status, currentplace, userId, owner } = req.body; // Ensure userId is included in the request body

  console.log(req.body);

  try {
    // Step 1: Update the specific order item for the seller
    const updateOrderItemQuery = `
      UPDATE orderitem
      SET status = ?, currentplace = ?
      WHERE id_Order = ? 
        AND id_Product IN (
          SELECT s.id_Product 
          FROM stock s 
          JOIN shop sh ON sh.idSHOP = s.id_Shop 
          WHERE sh.id_Owner = ?
        );
    `;

    connection.query(updateOrderItemQuery, [status, currentplace, orderId, owner], (err, results) => {
      if (err) {
        console.error("Error updating order item status:", err);
        return res.status(500).json({ error: "Failed to update order item status." });
      }

      // Step 2: Retrieve all order items with their statuses and current places for the order
      const getOrderItemsQuery = `
        SELECT status, currentplace 
        FROM orderitem 
        WHERE id_Order = ?;
      `;

      connection.query(getOrderItemsQuery, [orderId], (err, rows) => {
        if (err) {
          console.error("Error retrieving order item statuses and places:", err);
          return res.status(500).json({ error: "Failed to retrieve order item statuses and places." });
        }

        // Extract all statuses and current places
        const statuses = rows.map(row => row.status);
        const places = rows.map(row => row.currentplace);

        // Step 3: Determine the new overall order status
        let newOrderStatus;
        if (statuses.every(s => s === "Waiting")) {
          newOrderStatus = "Waiting";
        } else if (statuses.every(s => s === "On Way")) {
          newOrderStatus = "On Way";
        } else if (statuses.every(s => s === "Arrived")) {
          newOrderStatus = "Arrived";
        } else {
          // Mixed statuses (e.g., some "Waiting", some "On Way"): you may define your logic here.
          newOrderStatus = "On Way";
        }

        // Step 4: Determine the overall current place
        let overallCurrentPlace;
        if (places.every(place => place === places[0])) {
          // All order items share the same current place
          overallCurrentPlace = places[0];
        } else {
          // Mixed current places.
          // Example logic: use a predefined progression to determine which place is furthest along.
          const progressionOrder = ["Seller Warehouse", "In Transit", "Local Hub", "Final Destination"];
          overallCurrentPlace = places.reduce((prev, curr) => {
            // If a place is not found in your progression, you can decide on a default behavior.
            const prevIndex = progressionOrder.indexOf(prev);
            const currIndex = progressionOrder.indexOf(curr);
            return (currIndex > prevIndex ? curr : prev);
          }, places[0]);
        }

        // Step 5: Update the overall order record with both status and current place
        const updateOrderStatusQuery = `
          UPDATE ecommerce.order
          SET progress = ?, currentplace = ?
          WHERE idORDER = ?;
        `;

        connection.query(updateOrderStatusQuery, [newOrderStatus, overallCurrentPlace, orderId], (err, results) => {
          if (err) {
            console.error("Error updating order status and current place:", err);
            return res.status(500).json({ error: "Failed to update order." });
          }

          // Step 6: Insert a notification for the user about the update
          const insertNotificationQuery = `
            INSERT INTO notification (text, type, reciver)
            VALUES (?, ?, ?);
          `;
          const notificationText = `Your order #${orderId} has been updated to status "${newOrderStatus}" and is now at "${overallCurrentPlace}".`;
          const notificationType = "order_update";

          connection.query(insertNotificationQuery, [notificationText, notificationType, userId], (err, results) => {
            if (err) {
              console.error("Error sending notification:", err);
              return res.status(500).json({ error: "Failed to send notification." });
            }

            res.status(200).json({ 
              message: "Order item updated, overall order updated, and notification sent successfully.",
              orderStatus: newOrderStatus,
              orderPlace: overallCurrentPlace
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



// Route to get order stats for a client
router.get('/client/:clientId/order-stats', verifyToken, async (req, res) => {
  const clientId = req.params.clientId;

  try {
    const getOrderStatsQuery = `
    SELECT 
    DISTINCT o.idORDER,
    o.id_User,
    o.progress AS orderStatus,
    DATE_FORMAT(o.createdAt, '%Y-%m-%d') AS dateOrder,
    DATE_FORMAT(DATE_ADD(o.estimtedtime, INTERVAL 2 DAY), '%Y-%m-%d') AS estimatedTime,
    o.qte AS amount,
    o.currentplace AS place,
    SUM((oi.qte * (p.productprice - p.productprice * p.discount / 100) )) AS totalPrice,
    s.shippingname AS typeShipping,
    a.state, a.postal_code, a.city,
    s.shippingprice AS priceShipping
   
FROM 
    \`ORDER\` o
JOIN 
    ORDERITEM oi ON o.idORDER = oi.id_Order
JOIN 
    PRODUCT p ON oi.id_Product = p.idPRODUCT
JOIN 
    SHIPPING s ON o.id_Shipping = s.idSHIPPING
JOIN 
    ADDRESS a ON o.id_Adrress = a.idADDRESS
WHERE 
    o.id_User = ?
GROUP BY o.idORDER

    `;

    connection.query(getOrderStatsQuery, [clientId], (err, results) => {
      if (err) {
        console.error("Error fetching order stats:", err);
        res.status(500).json({ error: "Failed to fetch order stats." });
        return;
      }

      if (results.length > 0) {
        const orders = {};
        results.forEach(row => {
          const orderId = row.idORDER;
          if (!orders[orderId]) {
            orders[orderId] = {
              orderId: orderId,
              user:row.id_User,
              status: row.orderStatus,
              dateOrder: row.dateOrder,
              estimatedTime: row.estimatedTime,
              amount: row.amount,
              totalPrice: row.totalPrice,
              typeShipping: row.typeShipping,
              state: row.state,
              postalCode: row.postal_code,
              priceShipping: row.priceShipping,
              place:row.place,
              city:row.city,
              type:row.type
              
            };
          }
          
        });

        const formattedResults = Object.values(orders);

        res.status(200).json(formattedResults);
      } else {
        res.status(404).json({ error: "No orders found for this client" });
      }
    });
  } catch (err) {
    console.error("Internal server error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
});



router.get('/client/:clientId/orderitem-stats', verifyToken, async (req, res) => {
  const clientId = req.params.clientId;
  const order = req.query.order; // Retrieve the `order` parameter from the query string

  try {
    const getOrderStatsQuery = `
       SELECT 
    p.idPRODUCT, 
    p.productname, 
    p.productdesc, 
    p.productprice, 
    p.productimage, 
    oi.qte,
    SUM(oi.qte) AS totalQuantity,
    p.discount,
    -- If all statuses are the same, you can use MIN or MAX, 
    -- or you can concatenate if they might differ.
    MIN(oi.status) AS status,
    -- Here, we concatenate distinct places. Adjust this logic as needed.
    GROUP_CONCAT(DISTINCT o.currentplace SEPARATOR ', ') AS places,
    SUM(oi.qte * (p.productprice - p.productprice * p.discount / 100)) AS totalPrice
FROM 
    ecommerce.ORDER o
JOIN 
    ORDERITEM oi ON oi.id_Order = ?
JOIN 
    PRODUCT p ON oi.id_Product = p.idPRODUCT
WHERE 
    o.id_User = ?
GROUP BY 
    p.idPRODUCT, p.productname, p.productdesc, p.productprice, p.productimage, p.discount , oi.qte;

    `;

    connection.query(getOrderStatsQuery, [order,clientId ], (err, results) => {
      if (err) {
        console.error("Error fetching order stats:", err);
        return res.status(500).json({ error: "Failed to fetch order stats." });
      }

      res.status(200).json(results); // Return the results
    });
  } catch (err) {
    console.error("Internal server error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
});


// GET MOUNTHLY INCOME

router.get("/income" , verifyTokenAndAdmin , async (req,res)=>{
    const date = new Date();
    const lastmonth = new Date(date.setMonth(date.getMonth()-1))
    const previousmonth = new Date(new Date().setMonth(lastmonth.getMonth()-1))
     
    try {
        const income = await Order.aggregate([
            {$match: {createdAt : {$gte: previousmonth}}},
            {
                $project:{
                    month : { $month: "$createdAt"},
                    sales : "$amount"
                },
            },
                {
                    $group:{
                        _id:"$month",
                        total:{$sum: "$sales"}
                    },
                },
            
        ]);
        res.status(200).json(income);
    } catch (err) {
        res.status(500).json(err)
    }
})

//total orders status
router.get("/orders/status-count", verifyTokenAndAdmin, async (req, res) => {
  try {
    const getOrderStatusCountQuery = `
      SELECT 
        progress, COUNT(*) AS totalOrders 
      FROM 
        \`ORDER\`
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
        'On Way': 0,
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
//get the shipping details 
router.get('/order/:orderId/shipping-details', verifyToken, async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const getShippingDetailsQuery = `
      SELECT 
        o.idORDER,
        o.id_User,
        o.id_Adrress,
        o.qte,
        o.estimtedtime,
        o.createdAt,
        o.discount,
        o.progress,
        s.shippingname,
        s.shippingimg,
        s.shippingprice,
        s.availability
      FROM 
        \ORDER\ o
      JOIN 
        SHIPPING s ON o.id_Shipping = s.idSHIPPING
      WHERE 
        o.idORDER = ?;
    `;

    connection.query(getShippingDetailsQuery, [orderId], (err, results) => {
      if (err) {
        console.error("Error fetching shipping details:", err);
        res.status(500).json({ error: "Failed to fetch shipping details." });
        return;
      }

      if (results.length > 0) {
        res.status(200).json(results[0]);
      } else {
        res.status(404).json({ error: "Order not found" });
      }
    });
  } catch (err) {
    console.error("Internal server error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
});



router.get('/order/shipping-details', verifyToken, async (req, res) => {
  try {
    const getShippingDetailsQuery = `
    SELECT * FROM shipping
    `;

    connection.query(getShippingDetailsQuery, (err, results) => {
      if (err) {
        console.error("Error fetching shipping details:", err);
        res.status(500).json({ error: "Failed to fetch shipping details." });
        return;
      }

      if (results.length > 0) {
        res.status(200).json(results);  // Return all results
      } else {
        res.status(404).json({ error: "No shipping details found" });
      }
    });
  } catch (err) {
    console.error("Internal server error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
});


// GET My ORDERS
router.get('/client/orders/:id', verifyTokenAndAuthorizationA_S, async (req, res) => {
  const sellerId = req.params.id; // Seller's user ID
  const { status } = req.query;

  // Validate and process status filter
  const validStatuses = ['Waiting', 'On Way', 'Arrived'];
  const statusArray = status ? status.split(',') : [];
  const allStatusesValid = statusArray.every(s => validStatuses.includes(s));
  if (statusArray.length > 0 && !allStatusesValid) {
    return res.status(400).json({ error: 'Invalid order status' });
  }

  const statusCondition = statusArray.length > 0
    ? `AND o.progress IN (${statusArray.map(s => `'${s}'`).join(',')})`
    : '';

  try {
    const getOrderStatsQuery = `
      SELECT 
        o.idORDER,
        o.id_User AS clientId,
        o.progress AS status,
        o.currentplace AS currentPlace,
        a.state,
        a.city,
        a.postal_code,
        o.phone,
        o.type,
        DATE_FORMAT(o.createdAt, '%Y-%m-%d') AS dateOrder,
        DATE_FORMAT(DATE_ADD(o.estimtedtime, INTERVAL 2 DAY), '%Y-%m-%d') AS estimatedTime,
        COUNT(oi.idORDERITEM) AS totalProducts,
        SUM((p.productprice - p.productprice * p.discount / 100) * oi.qte) AS totalPrice,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'productId', p.idPRODUCT,
            'name', p.productname,
            'image', p.productimage,
            'price', p.productprice,
            'quantity', oi.qte,
            'attributes', oi.attributes,
            'status',oi.status,
            'place',oi.currentplace
          )
        ) AS products
      FROM 
        ecommerce.order o
      JOIN 
        ecommerce.orderitem oi ON o.idORDER = oi.id_Order
      JOIN 
        ecommerce.product p ON oi.id_Product = p.idPRODUCT
      JOIN 
        ecommerce.stock s ON s.id_Product = p.idPRODUCT AND s.id_Shop IN (
          SELECT idSHOP FROM ecommerce.shop WHERE id_Owner = ?
        )
      JOIN 
        ecommerce.address a ON o.id_Adrress = a.idADDRESS
      WHERE 
        s.id_Shop IN (SELECT idSHOP FROM ecommerce.shop WHERE id_Owner = ?) 
        ${statusCondition}
      GROUP BY 
        o.idORDER,
        o.id_User,
        o.progress,
        o.currentplace,
        a.state,
        a.city,
        a.postal_code,
        o.phone,
        o.type,
        o.createdAt,
        o.estimtedtime;
    `;

    connection.query(getOrderStatsQuery, [sellerId, sellerId], (err, results) => {
      if (err) {
        console.error('Error fetching order stats:', err);
        return res.status(500).json({ error: 'Failed to fetch order stats.' });
      }

      if (results.length > 0) {
        const orders = results.map(row => ({
          orderId: row.idORDER,
          clientId: row.clientId,
          status: row.status,
          currentPlace: row.currentPlace,
          state: row.state,
          city: row.city,
          postalCode: row.postal_code,
          phone: row.phone,
          type: row.type,
          dateOrder: row.dateOrder,
          estimatedTime: row.estimatedTime,
          totalProducts: row.totalProducts,
          totalPrice: row.totalPrice,
          products: JSON.parse(row.products)
        }));

        res.status(200).json(orders);
      } else {
        res.status(200).json([]);
      }
    });
  } catch (err) {
    console.error('Internal server error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});





module.exports = router ;