const Product = require("../Class/product.class");
const { ObjectId } = require('mongodb');
const databaseServices = require("./database.connect");

class ProductServices {
    async createProduct(body) {
        try {
            const { name, price, description, category, usage_status, image, current_quantity, quantity_sold } = body;
            console.log(name, price, description, category, usage_status, image, current_quantity, quantity_sold);
            const newProduct = new Product(name, price, description, category, usage_status, image, current_quantity, quantity_sold);
            // Insert the new product into the database
            await databaseServices.productCollection.insertOne(newProduct);
            return newProduct;
        } catch (error) {
            console.error('Error during product creation:', error.message);
            return null;
        }
    }

    async getAllProducts(){
        try {
            // Fetch all products from the productCollection in the database
            const products = await databaseServices.productCollection.find().toArray();
            return products; 
        } catch (error) {
            console.error('Error during fetching products:', error.message);
            return null;
        }
    }
    async getProductById(id) {
        try {
            const product = await databaseServices.productCollection.findOne({ _id: new ObjectId(id) });
            if (!product) {
                throw new Error('Product not found');
            }
            return product;
        } catch (error) {
            console.error('Error during fetching product by id:', error.message);
            return null;
        }
    }

    async updateProduct(id, updatedProduct) {
        try {

            await databaseServices.productCollection.updateOne(
                { _id: new ObjectId(id)},
                { $set: updatedProduct });
            return updatedProduct;
        } catch (error) {
            console.error('Error during product update:', error.message);
            return null;
        }
    }

    async deleteProduct(id) {
        try {
            await databaseServices.productCollection.deleteOne({ _id: new ObjectId(id) });
            return true;
        } catch (error) {
            console.error('Error during product deletion:', error.message);
            return null;
        }
    }
}

const productServices = new ProductServices();
module.exports = productServices;
