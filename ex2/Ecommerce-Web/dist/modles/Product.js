export class Product {
    constructor(id, name, price, discount, image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.discount = discount;
        this.image = image;
    }
    getDiscountedPrice() {
        return this.price - (this.price * this.discount);
    }
}
