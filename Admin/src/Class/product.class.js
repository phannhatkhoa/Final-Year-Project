class Product {
    constructor(name, price, description, category_id, usage_status, image, current_quantity, quantity_sold, brand_id, comment) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.category_id = category_id;
        this.usage_status = usage_status;
        this.image = image;
        this.current_quantity = current_quantity;
        this.quantity_sold = quantity_sold;
        this.brand_id = brand_id;
        this.comment = comment;
    }
}

module.exports = Product;
