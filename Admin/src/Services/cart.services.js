const { ObjectId } = require("mongodb");
const databaseServices = require("./database.connect");

class CartServices {
    async addToCart(body) {
        try{
            const {user_id, product_id, product_quantity} = body;
            const cart = await databaseServices.cartCollection.findOne({ user_id });
            if (cart) {
                const productExist = cart.products.find(product => product.product_id === product_id);
                if (productExist) {
                    productExist.product_quantity += product_quantity;
                } else {
                    cart.products.push({ product_id, product_quantity });
                }
                await databaseServices.cartCollection.updateOne({ user_id }, { $set: cart });
                return cart;
            } else {
                const newCart = {
                    user_id,
                    products: [{ product_id, product_quantity }]
                };
                await databaseServices.cartCollection.insertOne(newCart);
                return newCart;
            }
        }catch(error){
            console.error(error);
            return null;
        }
    }

    async getCart(user_id) {
        try {
            const cart = await databaseServices.cartCollection.findOne({ user_id });
            return cart;
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
