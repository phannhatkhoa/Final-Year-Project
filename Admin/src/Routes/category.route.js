const express = require("express");
const { createCategoryController, getCategoryController, updateCategoryController } = require("../Controllers/category.controller");
const router = express.Router();

// create category
// path: category/create
// method: POST
// access: Private
// Request: { name }
// Response: { data: { category: { name } } }
router.post("/create", createCategoryController);

// get all categories
// path: category/getAll
// method: GET
// access: Public
// Request: {}
// Response: { data: { categories: [{ name }] } }
router.get("/getAll", getCategoryController);

// update category
// path: category/update
// method: PUT
// access: Private
// Request: { name }
// Response: { data: { message: 'Category updated successfully', category: { name } } }
router.put("/update/:id", updateCategoryController);

module.exports = router;