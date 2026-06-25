const {verifyTokenAndAuthorizationA_C, verifyTokenAndAdminandSeller, verifyToken,verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyTokenAndAuthorizationA_S } = require("./verifytoken");
const connection = require('../db');
const router = require("express").Router();
const { v2: cloudinary } = require("cloudinary");
const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const multer = require('multer');
const upload = multer();
const saltRounds = 10;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
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

// UPDATE INFORMATION

router.put("/:id", verifyToken, upload.none(), async (req, res) => {
  try {
    const userId = req.params.id;
    const { firstname, lastname, username, email, userimg } = req.body;

    // Prepare an array to hold parts of the SQL query and values
    let fields = [];
    let values = [];

    // Check for textual fields and add them if provided
    if (firstname !== undefined) {
      fields.push("firstname = ?");
      values.push(firstname);
    }
    if (lastname !== undefined) {
      fields.push("lastname = ?");
      values.push(lastname);
    }
    if (username !== undefined) {
      fields.push("username = ?");
      values.push(username);
    }
    if (email !== undefined) {
      fields.push("email = ?");
      values.push(email);
    }

    // If an image was provided, upload it and add to the update fields
    if (userimg) {
      const uniquePublicId = `Profile_${uuidv4()}`;
      try {
        const uploadResult = await cloudinary.uploader.upload(userimg, {
          public_id: uniquePublicId,
          resource_type: 'auto', // Auto-detect resource type
        });
        const imageUrl = uploadResult.secure_url;
        fields.push("userimg = ?");
        values.push(imageUrl);
      } catch (uploadError) {
        console.error("Cloudinary error:", uploadError);
        return res.status(500).json({ error: "Image upload failed." });
      }
    }

    // If no fields were provided in the request, nothing to update
    if (fields.length === 0) {
      return res.status(400).json({ error: "No fields provided for update." });
    }

    // Construct the full SQL query dynamically
    const query = `UPDATE USER SET ${fields.join(", ")} WHERE idUSER = ?`;
    values.push(userId);

    connection.query(query, values, (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Database update failed." });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "User not found." });
      }
      res.status(200).json({ message: "User updated successfully." });
    });
  } catch (err) {
    console.error("Internal error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
});


// CHANGE PASSWORD
router.put("/change-password/:id", verifyToken, async (req, res) => {
  try {
    const userId = req.params.id;
    const { old, password } = req.body;
    
    if (!old || !password) {
      return res.status(404).json({ error: "Both old and new passwords are required." });
    }
    const getPasswordQuery = "SELECT password FROM USER WHERE idUSER = ?";
    const updatePasswordQuery = "UPDATE USER SET password = ? WHERE idUSER = ?";
    // Fetch current password from the database
    connection.query(getPasswordQuery, [userId], async (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Failed to retrieve user password." });
      }
      if (result.length === 0) {
        return res.status(404).json({ error: "User not found." });
      }

      const currentHashedPassword = result[0].password;

   // In change-password route
const isPasswordMatch = await bcrypt.compare(old, currentHashedPassword);

      if (!isPasswordMatch) {
        return res.status(402).json({ error: "Old password is incorrect." });
      }

  

      // In reset-password route
const hashedPassword = await bcrypt.hash(password, saltRounds);
      connection.query(updatePasswordQuery, [hashedPassword, userId], (err, result) => {
        if (err) {
          return res.status(500).json({ error: "Failed to update password." });
        }

        if (result.affectedRows === 0) {
          return res.status(400).json({ error: "Password update failed." });
        }

        res.status(200).json({ message: "Password updated successfully." });
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error." });
  }
});


// Reset Password - Updated route
router.put("/reset-password/:email", async (req, res) => {
  try {
    const email  = req.params.email;
    const password = req.body.password;

    // Validate input
    if (!password || !email) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    // Add password validation (e.g., minimum length)
    if (password.length < 8) {
      return res.status(400).json({ error: "Password must be at least 8 characters." });
    }

    // Consider adding password hashing here
    const updatePasswordQuery = "UPDATE USER SET password = ? WHERE email = ?";
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    connection.query(updatePasswordQuery, [hashedPassword, email], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to update password." });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Account doesn't exist" });
      }

      res.status(200).json({ message: "Password updated successfully." });
    });
  } catch (err) {
    console.error(err);
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
  



  const sendEmail = ({ recipient_email, OTP }) => {
    return new Promise((resolve, reject) => {
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.MY_EMAIL,
          pass: process.env.MY_PASSWORD2,
        },
      });
      console.log("MY_EMAIL:", process.env.MY_EMAIL);
      console.log("MY_PASSWORD:", process.env.MY_PASSWORD2);
      const mail_configs = {
        from: process.env.MY_EMAIL,
        to: recipient_email,
        subject: "KODING 101 PASSWORD RECOVERY",
        html: `<!DOCTYPE html>
  <html lang="en" >
  <head>
    <meta charset="UTF-8">
    <title>CodePen - OTP Email Template</title>
    
  
  </head>
  <body>
  <!-- partial:index.partial.html -->
  <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    <div style="margin:50px auto;width:70%;padding:20px 0">
      <div style="border-bottom:1px solid #eee">
        <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Taj Mall</a>
      </div>
      <p style="font-size:1.1em">Hi,</p>
      <p>Thank you for choosing Taj Mall. Use the following OTP to complete your Password Recovery Procedure. OTP is valid for 5 minutes</p>
      <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
      <p style="font-size:0.9em;">Regards,<br />Taj Mall</p>
      <hr style="border:none;border-top:1px solid #eee" />
      <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
        <p>Taj Mall Inc</p>
        <p>23001 ,Dibanet lihoud</p>
        <p>Annaba</p>
      </div>
    </div>
  </div>
  <!-- partial -->
    
  </body>
  </html>`,
      };
      transporter.sendMail(mail_configs, function (error, info) {
        if (error) {
          console.log(error);
          return reject({ message: `An error has occured` });
        }
        return resolve({ message: "Email sent succesfuly" });
      });
    });
  }
  

  
 router.post("/send_recovery_email", (req, res) => {
    sendEmail(req.body)
      .then((response) => res.send(response.message))
      .catch((error) => res.status(500).send(error.message));
  });



  module.exports = router ;