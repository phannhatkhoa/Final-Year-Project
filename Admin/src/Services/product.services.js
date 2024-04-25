const Product = require("../Class/product.class");
const { ObjectId } = require('mongodb');
const databaseServices = require("./database.connect");
const c = require("config");

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

    async commentProduct(body) {
        const { user_id, product_id, comment } = body;
        try {
            const userIdObject = new ObjectId(user_id);
            const productIdObject = new ObjectId(product_id);
            const user = await databaseServices.userCollection.findOne({ _id: userIdObject });
            if (!user) {
                throw new Error('Invalid user_id');
            }
            const product = await databaseServices.productCollection.findOne({ _id: productIdObject });
            if (!product) {
                throw new Error('Invalid product_id');
            }
            const newComment = {
                user_id: userIdObject,
                user_name: user.full_name,
                comment: comment,
                timestamp: new Date()
            }
            await databaseServices.productCollection.updateOne(
                { _id: productIdObject },
                { $push: { comment: newComment } }
            );
            return newComment;
        } catch (error) {
            console.error('Error during comment creation:', error.message);
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

    async deleteCommentProduct(body) {
        const { product_id, comment, user_id } = body;
        try {
            const productId = new ObjectId(product_id);
            const product = await databaseServices.productCollection.findOne({ _id: productId });
            if (!product) {
                throw new Error('Product not found');
            }
            const commentIndex = product.comment.findIndex((c) => c.comment === comment && c.user_id.toString() === user_id);
            if (commentIndex === -1) {
                throw new Error('Comment not found');
            }
            product.comment.splice(commentIndex, 1);
            await databaseServices.productCollection.updateOne(
                { _id: productId },
                { $set: { comment: product.comment } }
            );
            return true;
        }
        catch (error) {
            console.error('Error during comment deletion:', error.message);
            return null;
        }
    }
}

const productServices = new ProductServices();
module.exports = productServices;
