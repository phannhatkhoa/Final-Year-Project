const databaseServices = require("./database.connect");
const { ObjectId } = require('mongodb');
const OrderHistory = require("../Class/orderHistory.class");
const e = require("express");

class OrderHistoryServices {
    async createOrderHistory(body) {
        try {
            const { user_id, products, total_price } = body;
            const order_date = new Date();

            const userIdObject = new ObjectId(user_id);
            const cart = await databaseServices.cartCollection.findOne({ user_id: userIdObject });
            if (cart) {
                const newOrderHistory = new OrderHistory(userIdObject, products, total_price, order_date);
                await databaseServices.orderHistoryCollection.insertOne(newOrderHistory);
                return newOrderHistory;
            }
            else {
                return null;
            }
        } catch (error) {
            console.error('Error creating order history:', error.message);
            return null;
        }
    }

    async getOrderHistoryByUserId(user_id) {
        try {
            const userIdObject = new ObjectId(user_id);
            const orderHistories = await databaseServices.orderHistoryCollection.find({ user_id: userIdObject }).toArray();
            if (!orderHistories || orderHistories.length === 0) {
                console.error('No order history found for user:', user_id);
                return null;
            }

            // Iterate through each order history
            for (const orderHistory of orderHistories) {
                const productIds = orderHistory.products.map(product => new ObjectId(product.product_id));
                const products = await databaseServices.productCollection.aggregate([
                    {
                        '$match': {
                            '_id': {
                                '$in': productIds
                            }
                        }
                    }
                ]).toArray();

                orderHistory.products = orderHistory.products.map(product => {
                    const productDetail = products.find(p => p._id.equals(product.product_id));
                    return {
                        product_id: product.product_id,
                        product_quantity: product.product_quantity,
                        product_detail: productDetail
                    };
                });
            }

            return orderHistories;
        } catch (error) {
            console.error('Error getting order history:', error.message);
            return null;
        }
    }

    async getAllOrderHistory() {
        try {
            const orderHistories = await databaseServices.orderHistoryCollection.find().toArray();
            if (!orderHistories || orderHistories.length === 0) {
                console.error('No order history found');
                return null;
            }

            // Iterate through each order history
            for (const orderHistory of orderHistories) {
                const productIds = orderHistory.products.map(product => new ObjectId(product.product_id));
                const products = await databaseServices.productCollection.aggregate([
                    {
                        '$match': {
                            '_id': {
                                '$in': productIds
                            }
                        }
                    }
                ]).toArray();

                orderHistory.products = orderHistory.products.map(product => {
                    const productDetail = products.find(p => p._id.equals(product.product_id));
                    return {
                        product_id: product.product_id,
                        product_quantity: product.product_quantity,
                        product_detail: productDetail
                    };
                });
            }

            return orderHistories;
        } catch (error) {
            console.error('Error getting order history:', error.message);
            return null;
        }

    }

}

const orderHistoryServices = new OrderHistoryServices();
module.exports = orderHistoryServices;
