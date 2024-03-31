const { getAllUsersController, updateUserRoleController } = require("../Controllers/admin.controller");
const express = require("express");
const router = express.Router();

//get all users for admin
// Path: /admin/getUser
// Method: GET
// Access: Private
// Request: { token }
// Response: { message: "All users", users: { name, email}
router.get("/getUser", getAllUsersController);

//update user role for admin
// Path: /admin/updateRole/:id
// Method: PUT
// Access: Private
// Request: { updatedData }
// Response: { message: "User updated successfully" }
router.put("/updateRole/:id", updateUserRoleController);

module.exports = router;