const { ObjectId } = require("mongodb");
const databaseServices = require("./database.connect");

class CartServices {
    async addToCart(product_id, product_name, product_price, product_quantity, product_image, product_total_price, user_id) {
        try {
            const cart = await databaseServices.cartCollection.findOne({ product_id });
            if (!cart) {
                const newCart = { product_id, product_name, product_price, product_quantity, product_image, product_total_price, user_id };
                await databaseServices.cartCollection.insertOne(newCart);
                return newCart;
            }
            return cart;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async getCart(user_id) {
        try {
            const cart = await databaseServices.cartCollection.findOne({ user_id });
            if (cart) {
                return cart;
            }
            return null;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async deleteCart(id) {
        try {
            await databaseServices.cartCollection.deleteOne({ _id: new ObjectId(id) });
            return true;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async updateCart(id, updatedCart) {
        try {
            await databaseServices.cartCollection.updateOne(
                { _id: new ObjectId(id) },
                { $set: updatedCart });
            return updatedCart;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

const cartServices = new CartServices();
module.exports = cartServices;
