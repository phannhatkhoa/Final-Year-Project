const productServices = require("../Services/product.services");


const createProductController = async (req, res) => {
    const insertedData = await productServices.createProduct(req.body);
    if (insertedData) {
        return res.status(201).json({ data: { message: 'Product created successfully', product: insertedData } });
    } else {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const getProductController = async (req, res) => {
    try {
        const products = await productServices.getAllProducts();
        
        if (products) {
            return res.status(200).json({ data: { products } });
        } else {
            return res.status(500).json({ message: 'Internal server error' });
        }
    } catch (error) {
        console.error('Error during fetching products:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const getProductByIdController = async (req, res) => {
    const { id } = req.params;
    const product = await productServices.getProductById(id);
    if (product) {
        res.status(200).json({ data: { product } });
    } else {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const updateProductController = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    const resultUpdate = await productServices.updateProduct(id, req.body);
    if (resultUpdate) {
        res.status(200).json({ data: { message: 'Product updated successfully', product: updatedData } });
    } else {
        res.status(500).json({ message: 'Internal server error' });
    }

}
const deleteProductController = async (req, res) => {
    const { id } = req.params;
    const resultDelete = await productServices.deleteProduct(id);
    if (resultDelete) {
        res.status(200).json({ message: 'Product deleted successfully' });
    } else {
        res.status(500).json({ message: 'Internal server error' });
    }
}



module.exports = {
    createProductController,
    getProductController,
    getProductByIdController,
    updateProductController,
    deleteProductController
};

