const { ObjectId } = require("mongodb");
const Category = require("../Class/category.class");
const databaseServices = require("./database.connect");

class CategoryServices {
    async createCategory(body) {
        try {
            const { name } = body;
            const newCategory = new Category(name);
            // Insert the new category into the database
            await databaseServices.categoryCollection.insertOne(newCategory);
            return newCategory;
        } catch (error) {
            console.error('Error during category creation:', error.message);
            return null;
        }
    };

    async getAllCategories() {
        try {
            const categories = await databaseServices.categoryCollection.find().toArray();
            return categories;
        } catch (error) {
            console.error('Error during fetching categories:', error.message);
            return null;
        }
    }

    async getProductByCategory(id) {
        try {
            const objectId = new ObjectId(id);
            const products = await databaseServices.productCollection.aggregate([
                {
                    $match: { category_id: objectId }
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
            return products;
        } catch (error) {
            console.error('Error during fetching products:', error.message);
            return null;
        }
    }

    async updateCategory(id, updateCategory) {
        try {
            await databaseServices.categoryCollection.updateOne(
                { _id: id },
                { $set: updateCategory });
            return updateCategory;
        } catch (error) {
            console.error('Error during updating category:', error.message);
            return false;
        }
    }
}

const categoryServices = new CategoryServices();
module.exports = categoryServices;