class Payment{
    constructor(user_id, cart_id, total_price, payment_method, payment_status, payment_date){
        this.user_id = user_id;
        this.cart_id = cart_id;
        this.total_price = total_price;
        this.payment_method = payment_method;
        this.payment_status = payment_status;
        this.payment_date = payment_date;
    }
}

module.exports = Payment;