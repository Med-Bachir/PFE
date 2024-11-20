const {verifyTokenAndAuthorizationA_S ,verifyTokenAndAuthorizationA_C, verifyTokenAndAdminandSeller, verifyToken,verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyTokenAndSeller } = require("./verifytoken");
const connection = require('../db');
const { query } = require("../utils/promiseQuery.js");
const router = require("express").Router();

const { v2: cloudinary } = require('cloudinary');


// Cloudinary Configuration
cloudinary.config({
    cloud_name: 'dr95wrssj',
    api_key: '419664968851868',
    api_secret: '61D8e5oyWfCQLWBohKa-9t7HxZg'
});


// CREATE a new category
router.post("/add-cat", verifyTokenAndAdmin, async (req, res) => {
    try {
        const { categoryname, image } = req.body;

        // Upload the image to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(image, {
            public_id: 'Cat',
        });
        

        // Store the uploaded URL in the database
        const result = await query(
            "INSERT INTO CATEGORIES (categoryname, categoryimage) VALUES (?, ?)",
            [categoryname, uploadResult.secure_url]
        );

        res.status(200).json({
            idCATEGORIES: result.insertId,
            categoryname,
            image: uploadResult.secure_url
        });
    } catch (error) {
        console.error("Error creating category:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// CREATE a new subcategory
router.post("/add-sub", verifyTokenAndAdmin, async (req, res) => {
    try {
        const { idCat, subname, image } = req.body;

        // Upload the image to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(image, {
            public_id: 'Cat',
        });

        // Store the uploaded URL in the database
        const result = await query(
            "INSERT INTO subcategories (name, image, category_id) VALUES (?, ?, ?)",
            [subname, uploadResult.secure_url, idCat]
        );

        res.status(200).json({
            id: result.insertId,
            subname,
            image: uploadResult.secure_url,
            idCat
        });
    } catch (error) {
        console.error("Error creating subcategory:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// CREATE a new type
router.post("/add-type", verifyTokenAndAdmin, async (req, res) => {
    try {
        const { idSub, typename, image } = req.body;

        // Upload the image to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(image, {
            public_id: 'Taj',
        });

        // Store the uploaded URL in the database
        const result = await query(
            "INSERT INTO types (name, image, id_Sub) VALUES (?, ?, ?)",
            [typename, uploadResult.secure_url, idSub]
        );

        res.status(200).json({
            id: result.insertId,
            typename,
            image: uploadResult.secure_url,
            idSub
        });
    } catch (error) {
        console.error("Error creating type:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


//DELETE CATEGORY

router.delete("/delete-cat/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const { id } = req.params;
  
        // First, delete the related entries in the STOCK table
        const deleteCatQuery = "DELETE FROM Categories WHERE id_CATEGORIES = ?";
        const deleteCatValues = [id];

        connection.query(deleteCatQuery, deleteCatValues, (err, stockResult) => {
            if (err) {
                console.error("Error deleting stock:", err);
                res.status(500).json({ error: "Failed to delete stock." });
                return;
            }
  
           
            res.status(200).json('Cat Deleted Successfuly');
               
        });
    } catch (err) {
        console.error("Internal server error:", err);
        res.status(500).json({ error: "Internal server error." });
    }
  });

  //DELETE SUB

router.delete("/delete-sub/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const { id } = req.params;
  
        // First, delete the related entries in the STOCK table
        const deleteCatQuery = "DELETE FROM subcategories WHERE id = ?";
        const deleteCatValues = [id];

        connection.query(deleteCatQuery, deleteCatValues, (err, stockResult) => {
            if (err) {
                console.error("Error deleting stock:", err);
                res.status(500).json({ error: "Failed to delete stock." });
                return;
            }
            res.status(200).json('Sub Deleted Successfuly');
         
        });
    } catch (err) {
        console.error("Internal server error:", err);
        res.status(500).json({ error: "Internal server error." });
    }
  });
//DELETE TYPE
router.delete("/delete-type/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const { id } = req.params;
  
        // First, delete the related entries in the STOCK table
        const deleteCatQuery = "DELETE FROM types WHERE id = ?";
        const deleteCatValues = [id];

        connection.query(deleteCatQuery, deleteCatValues, (err, stockResult) => {
            if (err) {
                console.error("Error deleting stock:", err);
                res.status(500).json({ error: "Failed to delete stock." });
                return;
            }
            res.status(200).json('Type Deleted Successfuly');
         
        });
    } catch (err) {
        console.error("Internal server error:", err);
        res.status(500).json({ error: "Internal server error." });
    }
  });

router.get("/getallcat", async (req, res) => {
    try {
        const getAllCategoriesQuery = `
    SELECT 
    c.idCATEGORIES,
    c.categoryname,
    c.categoryimage AS icon,

    -- Total products in the category (all products linked to this category)
    (SELECT COUNT(*) 
     FROM PRODUCT p 
     WHERE p.id_Category = c.idCATEGORIES) AS categoryProductCount,

    s.id AS subcategoryId,
    s.name AS subname,
    s.image AS subIcon,

    -- Total products in the subcategory (all products linked to this subcategory)
    (SELECT COUNT(*) 
     FROM PRODUCT p 
     JOIN TYPES t ON p.id_Type = t.id
     WHERE t.id_Sub = s.id) AS subcategoryProductCount,

    t.id AS typeId,
    t.name AS typename,
    t.image AS typeIcon,

    -- Total products in the type (all products linked to this type)
    (SELECT COUNT(*) 
     FROM PRODUCT p 
     WHERE p.id_Type = t.id) AS typeProductCount

FROM 
    CATEGORIES c
LEFT JOIN 
    SUBCATEGORIES s ON c.idCATEGORIES = s.category_id 
LEFT JOIN 
    TYPES t ON t.id_Sub = s.id
LEFT JOIN 
    PRODUCT p ON p.id_Type = t.id

GROUP BY 
    c.idCATEGORIES, c.categoryname, c.categoryimage,
    s.id, s.name, s.image,
    t.id, t.name, t.image

ORDER BY 
    c.categoryname, s.name, t.name;
        `;

        connection.query(getAllCategoriesQuery, (err, results) => {
            if (err) {
                console.error("Error fetching categories:", err);
                return res.status(500).json({ error: "Failed to fetch categories." });
            }

            const categoriesMap = {};

            results.forEach(row => {
                // Initialize category if not present
                if (!categoriesMap[row.categoryname]) {
                    categoriesMap[row.categoryname] = {
                        id: row.idCATEGORIES,
                        icon: row.icon,
                        productCount: row.categoryProductCount,
                        subcategories: {}
                    };
                }

                // Initialize subcategory if not present
                if (!categoriesMap[row.categoryname].subcategories[row.subname]) {
                    categoriesMap[row.categoryname].subcategories[row.subname] = {
                        id: row.subcategoryId,
                        subIcon: row.subIcon,
                        productCount: row.subcategoryProductCount,
                        types: []
                    };
                }

                // Push type into the subcategory
                categoriesMap[row.categoryname].subcategories[row.subname].types.push({
                    id: row.typeId,
                    name: row.typename,
                    icon: row.typeIcon,
                    productCount: row.typeProductCount  // Count of products in this type
                });
            });

            // Convert to array format
            const categoriesArray = Object.keys(categoriesMap).map(categoryName => ({
                id: categoriesMap[categoryName].id,
                categoryname: categoryName,
                icon: categoriesMap[categoryName].icon,
                productCount: categoriesMap[categoryName].productCount,
                subcategories: Object.keys(categoriesMap[categoryName].subcategories).map(subname => ({
                    id: categoriesMap[categoryName].subcategories[subname].id,
                    subname: subname,
                    subIcon: categoriesMap[categoryName].subcategories[subname].subIcon,
                    productCount: categoriesMap[categoryName].subcategories[subname].productCount,
                    types: categoriesMap[categoryName].subcategories[subname].types
                }))
            }));

            res.status(200).json(categoriesArray);
        });
    } catch (err) {
        console.error("Internal server error:", err);
        res.status(500).json({ error: "Internal server error." });
    }
});


// get cateigories 

router.get("/cat", async (req, res) => {
    try {

  
        // Query to fetch products by category name
        const getCategories = `
            SELECT idCATEGORIES,categoryname 
            FROM CATEGORIES
        `;

  
        connection.query(getCategories, (err, categories) => {
            if (err) {
                console.error("Error fetching products by category:", err);
                res.status(500).json({ error: "Failed to fetch products." });
                return;
            }
  
            // Products successfully fetched
            res.status(200).json(categories);
        });
    } catch (err) {
        console.error("Internal server error:", err);
        res.status(500).json({ error: "Internal server error." });
    }
  });

  // get Subs From Category

router.get("/sub/:id", async (req, res) => {
    const id = req.params.id
    try {

  
        // Query to fetch products by category name
        const getSub = `
            SELECT id,name 
            FROM SUBCATEGORIES WHERE category_id = ?
        `;

  
        connection.query(getSub,[id] , (err, categories) => {
            if (err) {
                console.error("Error fetching products by category:", err);
                res.status(500).json({ error: "Failed to fetch products." });
                return;
            }
  
            // Products successfully fetched
            res.status(200).json(categories);
        });
    } catch (err) {
        console.error("Internal server error:", err);
        res.status(500).json({ error: "Internal server error." });
    }
  });

// get Types From subs
  router.get("/type/:id", async (req, res) => {
    const id = req.params.id
    try {

  
        // Query to fetch products by category name
        const getType = `
            SELECT id,name 
            FROM types WHERE id_Sub = ?
        `;

  
        connection.query(getType,[id] , (err, categories) => {
            if (err) {
                console.error("Error fetching products by category:", err);
                res.status(500).json({ error: "Failed to fetch products." });
                return;
            }
  
            // Products successfully fetched
            res.status(200).json(categories);
        });
    } catch (err) {
        console.error("Internal server error:", err);
        res.status(500).json({ error: "Internal server error." });
    }
  });





// DELETE a category
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        await query("DELETE FROM CATEGORIES WHERE idCATEGORIES = ?", [id]);
        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        console.error("Error deleting category:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


module.exports = router ;



