const { ObjectId } = require("mongodb");
const databaseServices = require("./database.connect");
const Product = require('../Class/product.class');

class AdminService {
    async getAllUsers() {
        try {
            const users = await databaseServices.userCollection.find().toArray();
            return users;
        } catch (error) {
            console.error('Error during fetching users:', error.message);
            return null;
        }
    }
    async updateUserRole(id, updatedData) {
        try {
            await databaseServices.userCollection.updateOne(
                { _id: new ObjectId(id) },
                { $set: updatedData }
            );
            return { message: "User role updated successfully" }
        } catch (error) {
            console.error('Error during updating user role:', error.message);
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

    async deleteUser(id) {
        try {
            await databaseServices.userCollection.deleteOne({ _id: new ObjectId(id) });
            return { message: "User deleted successfully" }
        } catch (error) {
            console.error('Error during deleting user:', error.message);
            return null;
        }
    
    }

    async addProduct(body){
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
}

const adminService = new AdminService();
module.exports = adminService;