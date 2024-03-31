const { ObjectId } = require("mongodb");
const databaseServices = require("./database.connect");

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
        } catch {
            console.error('Error during updating user role:', error.message);
            return null;
        }
    }
}

const adminService = new AdminService();
module.exports = adminService;