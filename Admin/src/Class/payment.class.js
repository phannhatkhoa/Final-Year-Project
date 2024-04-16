class Payment{
    constructor(user_id, total_price, payment_date){
        this.user_id = user_id;
        this.total_price = total_price;
        this.payment_date = payment_date;
    }
}

module.exports = Payment;