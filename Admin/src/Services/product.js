async function createProduct(productData) {
    try {
        const { name, price, description, category, usage_status, image, current_quantity, quantity_sold } = productData;
        const createProduct = new Product({
            name, price, description, category, usage_status, image, current_quantity, quantity_sold
        });
        console.log(createProduct);
        const savedProduct = await createProduct.save();
        return savedProduct;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = { createProduct };