const {verifyTokenAndSeller,verifyTokenAndAuthorizationA_S ,verifyTokenAndAuthorizationA_C, verifyTokenAndAdminandSeller, verifyToken,verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifytoken");
const connection = require('../db');
const { query } = require("../utils/promiseQuery.js");
const router = require("express").Router();

// GET NOTIFICATIONS
router.get("/:id", verifyToken, async (req, res, next) => {
  const id = req.params.id
    
    try {
      let sqlQuery = "SELECT * FROM NOTIFICATION where reciver = ? ";
      connection.query(sqlQuery, [id], (err, data) => {
        if (err) return next(err);
        res.status(200).json(data);
      });
    } catch (err) {
      next(err);
    }
  });

  // GET NOTIFICATIONS
router.get("/total-notification/:id", verifyTokenAndAuthorizationA_S, async (req, res, next) => {
  const id = req.params.id
    
  try {
    let sqlQuery = "SELECT count(*) AS Total from ecommerce.notification where reciver = ?";
    connection.query(sqlQuery,[id] , (err, data) => {
      if (err) return next(err);
      res.status(200).json(data);
    console.log(data)
    });
  } catch (err) {
    next(err);
  }
});


module.exports = router ;