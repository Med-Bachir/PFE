const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createError = require('http-errors');
const { query } = require("../utils/promiseQuery.js");
const { v2: cloudinary } = require("cloudinary");
const { v4: uuidv4 } = require("uuid");
const { body, validationResult } = require('express-validator');

// Environment variables configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Rate limiting middleware (install express-rate-limit)
const rateLimit = require('express-rate-limit');
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
});

// Input validation middleware
const validateRegister = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }),
  body('userRole').isIn(['seller', 'buyer' , 'client' ])
];

// Enhanced registration with security measures
router.post('/register', apiLimiter, validateRegister, async (req, res, next) => {
  try {
    // Validate inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check existing user using prepared statement
    const [existingUser] = await query(
      "SELECT idUSER FROM USER WHERE email = ? LIMIT 1",
      [req.body.email]
    );

    if (existingUser) {
      return next(createError(409, "User already exists"));
    }

    // Hash password with bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Handle image upload
    let profileUrl = req.body.prof;
    if (req.body.userRole === 'seller') {
      const uniquePublicId = `Product_${uuidv4()}`;
      const uploadResult = await cloudinary.uploader.upload(req.body.prof, {
        public_id: uniquePublicId,
        folder: 'user_profiles'
      });
      profileUrl = uploadResult.secure_url;
    }

    // Insert user with transaction
    const insertResult = await query(
      `INSERT INTO USER SET
        firstname = ?,
        lastname = ?,
        username = ?,
        password = ?,
        email = ?,
        userRole = ?,
        createdAt = NOW(),
        userimg = ?,
        subscription = ?,
        prof = ?`,
      [
        req.body.firstname,
        req.body.lastname,
        req.body.username,
        hashedPassword,
        req.body.email,
        req.body.userRole,
        req.body.userimg,
        req.body.subscription,
        profileUrl
      ]
    );

    // Return sanitized response
    res.status(201).json({
      id: insertResult.insertId,
      email: req.body.email,
      userRole: req.body.userRole
    });

  } catch (err) {
    next(err);
  }
});

// Secure login implementation
router.post('/login', apiLimiter, async (req, res, next) => {
  try {
    // Input validation
    if (!req.body.username || !req.body.password) {
      return res.status(400).json("Missing credentials");
    }

    // Find user with prepared statement
    const [user] = await query(
      "SELECT * FROM user WHERE username = ? LIMIT 1",
      [req.body.username]
    );

    if (!user) {
      return res.status(401).json("Invalid credentials");
    }

    // Verify password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(401).json("Invalid credentials");
    }

    // Generate JWT
    const accessToken = jwt.sign(
      {
        idUSER: user.idUSER,
        userRole: user.userRole
      },
      process.env.JWT_ACCESSTOKEN,
      { expiresIn: '3d' }
    );
    

    // Set secure cookie
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 1 hour
    });

    // Return sanitized user data
    const { password, ...safeUserData } = user;
    res.status(200).json(safeUserData);

  } catch (err) {
    next(createError(500, "Authentication failed"));
  }
});

// Secure logout
router.post('/logout', (req, res) => {
  res
    .clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    })
    .status(200)
    .json({ message: "Successfully logged out" });
});

module.exports = router;