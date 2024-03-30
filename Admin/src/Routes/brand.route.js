const express = require("express");
const { createBrandController, getBrandController, updateBrandController, deleteBrandController } = require("../Controllers/brand.controller");

const router = express.Router();

// crete brand
// path: brand/createBrand
// method: POST
// access: Public
// Request: { name, location }
// Response: { message: "Brand created successfully", brand: { name, location } }
router.post("/createBrand", createBrandController);

// get all brands
// path: brand/getBrand
// method: GET
// access: Public
// Request: {}
// Response: { brands: [{ name, location }] }
router.get("/getBrand", getBrandController);

// update brand
// path: brand/updateBrand
// method: PUT
// access: Public
// Request: { name, location }
// Response: { message: "Brand updated successfully", brand: { name, location } }
router.put("/updateBrand/:id", updateBrandController);

// delete brand
// path: brand/deleteBrand
// method: DELETE
// access: Public
// Request: { id }
// Response: { message: "Brand deleted successfully" }
router.delete("/deleteBrand/:id", deleteBrandController);


module.exports = router;