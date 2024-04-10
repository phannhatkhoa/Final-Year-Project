const { ObjectId } = require("mongodb");
const databaseServices = require("./database.connect");

class CartServices {

    async addToCart(body) {
        try {
            const { user_id, product_id, product_quantity } = body;
    
            const userIdObject = new ObjectId(user_id);
            const productIdObject = new ObjectId(product_id);
    
            const cart = await databaseServices.cartCollection.findOne({ user_id: userIdObject });
            if (cart) {
                const productExist = cart.products.find(product => product.product_id.equals(productIdObject));
                if (productExist) {
                    productExist.product_quantity += product_quantity;
                } else {
                    cart.products.push({ product_id: productIdObject, product_quantity });
                }
                await databaseServices.cartCollection.updateOne({ user_id: userIdObject }, { $set: cart });
                return cart;
            } else {
                const newCart = {
                    user_id: userIdObject,
                    products: [{ product_id: productIdObject, product_quantity }]
                };
                await databaseServices.cartCollection.insertOne(newCart);
                return newCart;
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }


    async getCart(user_id) {
        try {
            const userIdObject = new ObjectId(user_id);
            const cart = await databaseServices.cartCollection.findOne({ user_id: userIdObject });
            const products = await databaseServices.productCollection.aggregate(
                [
                    {
                        '$match': {
                            '_id': {
                                '$in': cart.products.map(product => product.product_id)
                            }
                        }
                    }
                ]
            ).toArray();
            cart.products = cart.products.map(product => {
                const productDetail = products.find(p => p._id.equals(product.product_id));
                return {
                    product_id: product.product_id,
                    product_quantity: product.product_quantity,
                    product_detail: productDetail
                }
            });
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
