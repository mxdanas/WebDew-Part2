export class Product {
  constructor(
    public id: number,
    public name: string,
    public price: number,
    public discount: number,
    public image: string
  ) {}

  getDiscountedPrice(): number {
    return this.price - (this.price * this.discount);
  }
}