import { Product } from "./Product.js";  

export class CartItem {
  constructor(
    public product: Product, 
    public quantity: number
  ) {}
}