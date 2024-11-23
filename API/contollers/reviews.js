const {verifyTokenAndClient,verifyTokenAndSeller,verifyTokenAndAuthorizationA_S ,verifyTokenAndAuthorizationA_C, verifyTokenAndAdminandSeller, verifyToken,verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifytoken");
const connection = require('../db');
const { query } = require("../utils/promiseQuery.js");
const router = require("express").Router();



//SUBMIT A REVIEW
router.post('/submit-review/:id_User/:id_Product', verifyTokenAndClient, (req, res) => {
    const { id_User, id_Product } = req.params;
    const { rate, text } = req.body;

    if (!rate) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const insertReviewQuery = `
        INSERT INTO REVIEWS (rate, text, id_User, id_Product) 
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
            rate = VALUES(rate),
            text = VALUES(text)
    `;
    const insertReviewValues = [rate, text, id_User, id_Product];

    connection.query(insertReviewQuery, insertReviewValues, (err, result) => {
        if (err) {
            console.error("Error submitting review:", err);
            return res.status(500).json({ error: "Failed to submit review." });
        }

        res.status(200).json({ message: "Review submitted successfully." });
    });
});


//get all reviews for one product
router.get('/product-reviews/:id_Product', (req, res) => {
    const { id_Product } = req.params;

    const getProductReviewsQuery = `
        SELECT 
            r.rate, 
            r.text, 
            u.firstname, 
            u.lastname, 
            u.userimg, 
            u.username AS name
        FROM 
            REVIEWS r
        JOIN 
            USER u ON r.id_User = u.idUSER
        WHERE 
            r.id_Product = ?
    `;

    connection.query(getProductReviewsQuery, [id_Product], (err, results) => {
        if (err) {
            console.error("Error fetching product reviews:", err);
            return res.status(500).json({ error: "Failed to fetch reviews." });
        }

        // Map results to include full name and user image
        const reviewsWithNames = results.map(review => ({
            rate: review.rate,
            text: review.text,
            reviewer: review.name,
            userimage: review.userimg
        }));

        res.status(200).json(reviewsWithNames);
    });
});
//
router.get('/total-review/:id_Product', (req, res) => {
    const { id_Product } = req.params;

    const getProductReviewsQuery = `
        SELECT 
           Count(*) AS total
        FROM 
            REVIEWS r
        JOIN 
            Product p ON r.id_Product = p.idPRODUCT
        WHERE 
            r.id_Product = ?
        GROUP BY
        r.id_Product
    `;

    connection.query(getProductReviewsQuery, [id_Product], (err, result) => {
        if (err) {
            console.error("Error fetching product reviews:", err);
            return res.status(500).json({ error: "Failed to fetch reviews." });
        }

        // Map results to include full name and user image
        

        res.status(200).json(result);
    });
});



//delete a review
router.delete('/delete-review/:id_User/:id_Product', verifyTokenAndAuthorizationA_C, (req, res) => {
    const { id_User, id_Product } = req.params;

    const deleteReviewQuery = `
        DELETE FROM REVIEWS 
        WHERE id_User = ? AND id_Product = ?
    `;

    connection.query(deleteReviewQuery, [id_User, id_Product], (err, result) => {
        if (err) {
            console.error("Error deleting review:", err);
            return res.status(500).json({ error: "Failed to delete review." });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Review not found." });
        }

        res.status(200).json({ message: "Review deleted successfully." });
    });
});



module.exports = router ;