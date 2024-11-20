const {verifyTokenAndSeller,verifyTokenAndAuthorizationA_S ,verifyTokenAndAuthorizationA_C, verifyTokenAndAdminandSeller, verifyToken,verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifytoken");
const connection = require('../db');
const { query } = require("../utils/promiseQuery.js");
const router = require("express").Router();

// CREATE LOCATION
router.post("/create", verifyTokenAndSeller, async (req, res) => {
    try {
        const { country, state , city , street} = req.body;
        const result = await query("INSERT INTO LOCATION (country, state , city , street) VALUES (?, ?, ?, ?)", [country, state, city, street]);
        res.status(201).json({ idLOCATION: result.insertId, country, state , city , street});
    } catch (error) {
        console.error("Error creating LOCATION:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});



module.exports = router ;