const orderHistoryServices = require("../Services/orderHistory.services");

const createOrderHistory = async (req, res) => {
    try {
        const orderHistory = await orderHistoryServices.createOrderHistory(req.body);
        if (orderHistory) {
            res.status(200).json({ message: 'Order history created successfully', orderHistory });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, newStatus } = req.body;
        const success = await orderHistoryServices.updateOrderStatus(orderId, newStatus);
        if (success) {
            res.status(200).json({ message: 'Order status updated successfully' });
        } else {
            res.status(404).json({ message: 'Order not found or error updating status' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getOrderHistoryByUserId = async (req, res) => {
    try {
        const {user_id} = req.params;
        const orderHistory = await orderHistoryServices.getOrderHistoryByUserId(user_id);
        if (orderHistory) {
            res.status(200).json({ message: 'Order history', orderHistory });
        } else {
            res.status(404).json({ message: 'Order history not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
module.exports = {
    createOrderHistory,
    updateOrderStatus,
    getOrderHistoryByUserId
};
