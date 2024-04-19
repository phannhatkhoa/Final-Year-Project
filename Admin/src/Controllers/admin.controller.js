const adminService = require('../Services/admin.services');



const getAllUsersController = async (req, res, next) => {
    const users = await adminService.getAllUsers();
    return res.status(200).json({ message: "All users", users: users })
}

const updateUserRoleController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedUser = await adminService.updateUserRole(id, updatedData);

        if (updatedUser) {
            return res.status(200).json({ message: "User role updated successfully" });
        } else {
            return res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error updating user role:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const getAllProductsController = async (req, res, next) => {
    const products = await adminService.getAllProducts();
    return res.status(200).json({ message: "All products", products: products })

}

const deleteUserController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedUser = await adminService.deleteUser(id);
        if (deletedUser) {
            return res.status(200).json({ message: "User deleted successfully" });
        } else {
            return res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const addProductController = async (req, res, next) => {
    try {
        const newProduct = req.body;
        const addedProduct = await adminService.addProduct(newProduct);
        if (addedProduct) {
            return res.status(200).json({ message: "Product added successfully" });
        } else {
            return res.status(500).json({ message: "Internal server error" });
        }
    } catch (error) {
        console.error("Error adding product:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const deleteProductController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedProduct = await adminService.deleteProduct(id);
        if (deletedProduct) {
            return res.status(200).json({ message: "Product deleted successfully" });
        } else {
            return res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.error("Error deleting product:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const editProductController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedProduct = await adminService.editProduct(id, updatedData);

        if (updatedProduct) {
            return res.status(200).json({ message: "Product updated successfully" });
        } else {
            return res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.error("Error updating product:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    getAllUsersController,
    updateUserRoleController,
    getAllProductsController,
    deleteUserController,
    addProductController,
    deleteProductController,
    editProductController
}