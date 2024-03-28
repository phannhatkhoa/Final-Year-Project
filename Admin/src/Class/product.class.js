class Product {
    constructor(name, price, description, category, usage_status, image, current_quantity, quantity_sold) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.category = category;
        this.usage_status = usage_status;
        this.image = image;
        this.current_quantity = current_quantity;
        this.quantity_sold = quantity_sold;
    }
}

module.exports = Product;
