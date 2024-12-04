const router = require("express").Router();
const User = require("../Models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const createError = require('http-errors');
const connection = require('../db');
const { query } = require("../utils/promiseQuery.js");
const { v2: cloudinary } = require("cloudinary");
const { v4: uuidv4 } = require("uuid");


// Cloudinary Configuration
cloudinary.config({
  cloud_name: "dr95wrssj",
  api_key: "419664968851868",
  api_secret: "61D8e5oyWfCQLWBohKa-9t7HxZg",
});

router.post('/register', async (req, res, next) => {
  try {
    // Declare uploadResult
    let uploadResult;

    if (req.body.userRole === 'seller') {
      // Upload to Cloudinary if userRole is 'seller'
      const uniquePublicId = `Product_${uuidv4()}`;
      uploadResult = await cloudinary.uploader.upload(req.body.prof, {
        public_id: uniquePublicId,
      });
    } else {
      // Use the provided value if not a seller
      uploadResult = { secure_url: req.body.prof };
    }

    // CHECK EXISTING USER
    const checkUserQuery = "SELECT * FROM USER WHERE lastname = ? OR email = ?";
    connection.query(checkUserQuery, [req.body.lastname, req.body.email], (err, data) => {
      if (err) return next(err);
      if (data.length) return next(createError(409, "User already exists"));

      // Hash the password (placeholder, replace with bcrypt for security)
      const hashedPassword = req.body.password;

      // Prepare the INSERT query
      const insertUserQuery = `
        INSERT INTO USER(
          firstname, lastname, username, password, email, userRole, createdAt, userimg, subscription, prof
        ) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

      connection.query(
        insertUserQuery,
        [
          req.body.firstname,
          req.body.lastname,
          req.body.username,
          hashedPassword,
          req.body.email,
          req.body.userRole,
          currentDate,
          req.body.userimg,
          req.body.subscription,
          uploadResult.secure_url, // Use the secure URL or provided prof
        ],
        (err) => {
          if (err) return next(err);

          // Retrieve the newly created user's ID
          const selectUserIdQuery = "SELECT idUSER FROM USER WHERE email = ?";
          connection.query(selectUserIdQuery, [req.body.email], (err, data) => {
            if (err) return next(err);
            return res.status(201).json(data[0]);
          });
        }
      );
    });
  } catch (err) {
    next(err);
  }
});


//LOGIN

router.post('/login', async (req, res) => {
  try {
      const sql = "SELECT * FROM user WHERE username = ?";
      const values = [req.body.username];
      const users = await query(sql, values);

      if (users.length === 0) {
          return res.status(402).json("Wrong User Name");
      }

      const user = users[0];
      const hashedPassword = user.password; // Assuming the password is stored in the database in plaintext
      const inputPassword = req.body.password;

      if (hashedPassword !== inputPassword) {
          return res.status(401).json("Wrong Password");
      }

      // Add logging before jwt.sign() function call
      console.log("Generating JWT token...");

      // Generate a JWT token
      const accessToken = jwt.sign(
          { idUSER: user.idUSER, userRole: user.userRole },
          process.env.JWT_ACCESSTOKEN,
          { expiresIn: "3d" }
      );
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000
      });

      
      const { password, ...others } = user;
      res.status(200).json({ accessToken, ...others }); // Send back the token and user data
  } catch (err) {
      res.status(400).json(err);
  }
});

//LOGOUT

router.post('/logout', (req, res) => {
  res
    .cookie("accessToken", "", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      expires: new Date(1),
    })
    .status(200)
    .send("User has been logged out!");
});
module.exports = router;