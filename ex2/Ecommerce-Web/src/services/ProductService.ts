import { Product } from "../modles/Product.js";

export namespace ProductService{
    export async function fetchProducts(){
        const response = await fetch("../data/products.json");
        const data = await response.json();
        return data.map(
            (p: any) => new Product(p.id,p.name, p.price, p.discount, p.image)
        );
    }
}