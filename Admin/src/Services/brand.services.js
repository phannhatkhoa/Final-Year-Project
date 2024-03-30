const { ObjectId } = require("mongodb");
const Brand = require("../Class/brand.class");
const databaseServices = require("./database.connect");

class BrandServices {
    async createBrand(body) {
        try {
            const { name, location } = body;
            const newBrand = new Brand(name, location);
            await databaseServices.brandCollection.insertOne(newBrand);
            return newBrand;
        }
        catch (error) {
            console.error('Error during brand creation:', error.message);
            return null;
        }
    }

    async getAllBrands() {
        try {
            const brands = await databaseServices.brandCollection.find().toArray();
            return brands;
        } catch (error) {
            console.error('Error during fetching brands:', error.message);
            return null;
        }
    }

    async updateBrand(id, updateBrand) {
        try {
            ;
            await databaseServices.brandCollection.updateOne({ _id: new ObjectId(id) },
                { $set: updateBrand });
            return updateBrand;
        } catch (error) {
            console.error('Error during brand update:', error.message);
            return null;
        }
    }

    async deleteBrand(id) {
        try {
            await databaseServices.brandCollection.deleteOne({ _id: new ObjectId(id) });
            return true;
        } catch (error) {
            console.error('Error during brand deletion:', error.message);
            return null;
        }
    }
}


const brandServices = new BrandServices();
module.exports = brandServices;