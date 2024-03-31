const categoryServices = require("../Services/category.services");

const createCategoryController = async (req, res) => {
    const insertedData = await categoryServices.createCategory(req.body);
    if (insertedData) {
        return res.status(201).json({ data: { message: 'Category created successfully', category: insertedData } });
    } else {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const getCategoryController = async (req, res) => {
    try {
        const categories = await categoryServices.getAllCategories();
        
        if (categories) {
            return res.status(200).json({ data: { categories } });
        } else {
            return res.status(500).json({ message: 'Internal server error' });
        }
    } catch (error) {
        console.error('Error during fetching categories:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const getProductByCategoryController = async (req, res) => {
    const { id } = req.params;
    const products = await categoryServices.getProductByCategory(id);
    if (products) {
        res.status(200).json({ data: { products } });
    } else {
        res.status(500).json({ message: 'Internal server error' });
    }
}
const updateCategoryController = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    const resultUpdate = await categoryServices.updateCategory(id, req.body);
    if (resultUpdate) {
        res.status(200).json({ data: { message: 'Category updated successfully', category: updatedData } });
    } else {
        res.status(500).json({ message: 'Internal server error' });
    }

}

module.exports = { createCategoryController, getCategoryController,updateCategoryController, getProductByCategoryController};