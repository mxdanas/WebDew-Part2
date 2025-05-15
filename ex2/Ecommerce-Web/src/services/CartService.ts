import { CartItem } from "../modles/cartItem.js";
import { Product } from "../modles/Product.js";

export namespace CartService {
    const key = "cart";

    export function getCart(): CartItem[]{
        const raw = localStorage.getItem(key);
        if(!raw) return[];
        const items = JSON.parse(raw);
        return items.map((item: any)=>
            new CartItem(new Product(item.product.id, item.product.name,item.product.price, item.product.discount, item.product.image), item.quantity)
        );
    }

    export function saveCart(cart: CartItem[]){
        localStorage.setItem(key, JSON.stringify(cart));
    }

    export function addToCart(product: Product, quantity: number){
        const cart = getCart();
        const existing = cart.find(item => item.product.id === product.id);
        if(existing){
            existing.quantity +=quantity;
        }else cart.push(new CartItem(product, quantity));
        saveCart(cart);
    }

    export function updateQuantity(productId: number,quantity: number){
        const cart = getCart();
        const item = cart.find(i => i.product.id === productId);
        if(item){
            item.quantity = quantity;
        }
        saveCart(cart);
    }

    export function removeFromCart(productId: number){
        let cart = getCart();
        cart = cart.filter(i => i.product.id !== productId);
        saveCart(cart);
    }

    export function getTotal(): number{
        return getCart().reduce((sum, item)=> sum + item.product.getDiscountedPrice() * item.quantity,0);
    }

    export function getShipping(): number{
        return getTotal() > 100 ? 0 :10;
    }

    export function getFinalTotal(): number {
        return getTotal() + getShipping();
    }
}
