const Product = require("../Class/product.class");
const { ObjectId } = require('mongodb');
const databaseServices = require("./database.connect");

class ProductServices {
    async createProduct(body) {
        try {
            const { name, price, description, category_id, usage_status, image, current_quantity, quantity_sold, brand_id } = body;
    
            const categoryId = new ObjectId(category_id);
            const brandId = new ObjectId(brand_id);
    
            const category = await databaseServices.categoryCollection.findOne({ _id: categoryId });
            if (!category) {
                throw new Error('Invalid category_id');
            }
    
            const brand = await databaseServices.brandCollection.findOne({ _id: brandId });
            if (!brand) {
                throw new Error('Invalid brand_id');
            }
    
            const newProduct = new Product(name, price, description, categoryId, usage_status, image, current_quantity, quantity_sold, brandId);
            await databaseServices.productCollection.insertOne(newProduct);
            return newProduct;
        } catch (error) {
            console.error('Error during product creation:', error.message);
            return null;
        }
    }
    


    async getAllProducts() {
        try {
            const products = await databaseServices.productCollection.aggregate(
                [
                    {
                        '$lookup': {
                            'from': 'category',
                            'localField': 'category_id',
                            'foreignField': '_id',
                            'as': 'category'
                        }
                    }, {
                        '$unwind': '$category'
                    },
                    {
                        '$lookup': {
                            'from': 'brand',
                            'localField': 'brand_id',
                            'foreignField': '_id',
                            'as': 'brand'
                        }
                    },
                    {
                        '$unwind': '$brand'
                    }
                ]
            ).toArray();
            return products;
        } catch (error) {
            console.error('Error during fetching products:', error.message);
            return null;
        }
    }

    async getProductById(id) {
        try {
            const objectId = new ObjectId(id);
            const product = await databaseServices.productCollection.aggregate([
                {
                    $match: { _id: objectId }
                },
                {
                    '$lookup': {
                        'from': 'category',
                        'localField': 'category_id',
                        'foreignField': '_id',
                        'as': 'category'
                    }
                },
                {
                    '$unwind': '$category'
                },
                {
                    '$lookup': {
                        'from': 'brand',
                        'localField': 'brand_id',
                        'foreignField': '_id',
                        'as': 'brand'
                    }
                },
                {
                    '$unwind': '$brand'
                }
            ]).toArray();
    
            if (product.length === 0) {
                throw new Error('Product not found');
            }
            return product[0];
        } catch (error) {
            console.error('Error during fetching product by id:', error.message);
            return null;
        }
    }
    

    async updateProduct(id, updatedProduct) {
        try {

            await databaseServices.productCollection.updateOne(
                { _id: new ObjectId(id) },
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

    async commentProduct(id, comment) {
        try {
            const product = await databaseServices.productCollection.findOne({ _id: new ObjectId(id) });
            if (!product) {
                throw new Error('Product not found');
            }
            
            // Check if product.comment exists and is an array
            if (!product.comment || !Array.isArray(product.comment)) {
                product.comment = []; // Initialize as an array if not
            }
    
            // Add current date and time to the comment
            const timestamp = new Date();
            const commentWithTimestamp = { comment, timestamp };
    
            product.comment.push(commentWithTimestamp); // Add the new comment with timestamp
            await databaseServices.productCollection.updateOne(
                { _id: new ObjectId(id) },
                { $set: { comment: product.comment } }
            );
            return true;
        } catch (error) {
            console.error('Error during commenting product:', error.message);
            return null;
        }
    }
    
    

    async getCommentProduct(id) {
        try {
            const product = await databaseServices.productCollection.findOne({ _id: new ObjectId(id) });
            if (!product) {
                throw new Error('Product not found');
            }
            return product.comment;
        } catch (error) {
            console.error('Error during fetching comment:', error.message);
            return null;
        }
    }
}

const productServices = new ProductServices();
module.exports = productServices;
