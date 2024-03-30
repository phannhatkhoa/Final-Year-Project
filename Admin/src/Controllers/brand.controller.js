const brandServices = require("../Services/brand.services");

const createBrandController = async (req, res) => {
    const insertedData = await brandServices.createBrand(req.body);
    if (insertedData) {
        return res.status(201).json({ data: { message: 'Brand created successfully', brand: insertedData } });
    } else {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const getBrandController = async (req, res) => {
    try {
        const brands = await brandServices.getAllBrands();
        
        if (brands) {
            return res.status(200).json({ data: { brands } });
        } else {
            return res.status(500).json({ message: 'Internal server error' });
        }
    } catch (error) {
        console.error('Error during fetching brands:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const updateBrandController = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    const resultUpdate = await brandServices.updateBrand(id, req.body);
    if (resultUpdate) {
        res.status(200).json({ data: { message: 'Brand updated successfully', brand: updatedData } });
    } else {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const deleteBrandController = async (req, res) => {
    const { id } = req.params;
    const resultDelete = await brandServices.deleteBrand(id);
    if (resultDelete) {
        res.status(200).json({ message: 'Brand deleted successfully' });
    } else {
        res.status(500).json({ message: 'Internal server error' });
    }

}
module.exports = { createBrandController, getBrandController, updateBrandController, deleteBrandController};