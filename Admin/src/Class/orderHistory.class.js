class OrderHistory {
    constructor(user_id, products, total_price, order_date) {
        this.user_id = user_id;
        this.products = products;
        this.total_price = total_price;
        this.order_date = new Date(order_date);
    }
}

module.exports = OrderHistory;
