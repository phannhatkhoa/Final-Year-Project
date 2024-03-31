const adminService = require('../Services/admin.services');

const getAllUsersController = async (req, res, next) => {
    const users = await adminService.getAllUsers();
    return res.status(200).json({ message: "All users", users: users })
}

const updateUserRoleController = async (req, res, next) => {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedUser = await adminService.updateUserRole(id, updatedData);
    if (updatedUser) {
        return res.status(200).json({ message: "User role updated successfully" });
    }else{
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    getAllUsersController,
    updateUserRoleController
}