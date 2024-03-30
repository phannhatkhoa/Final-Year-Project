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