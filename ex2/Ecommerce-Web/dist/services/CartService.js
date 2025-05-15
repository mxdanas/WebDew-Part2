import { CartItem } from "../modles/cartItem.js";
import { Product } from "../modles/Product.js";
export var CartService;
(function (CartService) {
    const key = "cart";
    function getCart() {
        const raw = localStorage.getItem(key);
        if (!raw)
            return [];
        const items = JSON.parse(raw);
        return items.map((item) => new CartItem(new Product(item.product.id, item.product.name, item.product.price, item.product.discount, item.product.image), item.quantity));
    }
    CartService.getCart = getCart;
    function saveCart(cart) {
        localStorage.setItem(key, JSON.stringify(cart));
    }
    CartService.saveCart = saveCart;
    function addToCart(product, quantity) {
        const cart = getCart();
        const existing = cart.find(item => item.product.id === product.id);
        if (existing) {
            existing.quantity += quantity;
        }
        else
            cart.push(new CartItem(product, quantity));
        saveCart(cart);
    }
    CartService.addToCart = addToCart;
    function updateQuantity(productId, quantity) {
        const cart = getCart();
        const item = cart.find(i => i.product.id === productId);
        if (item) {
            item.quantity = quantity;
        }
        saveCart(cart);
    }
    CartService.updateQuantity = updateQuantity;
    function removeFromCart(productId) {
        let cart = getCart();
        cart = cart.filter(i => i.product.id !== productId);
        saveCart(cart);
    }
    CartService.removeFromCart = removeFromCart;
    function getTotal() {
        return getCart().reduce((sum, item) => sum + item.product.getDiscountedPrice() * item.quantity, 0);
    }
    CartService.getTotal = getTotal;
    function getShipping() {
        return getTotal() > 100 ? 0 : 10;
    }
    CartService.getShipping = getShipping;
    function getFinalTotal() {
        return getTotal() + getShipping();
    }
    CartService.getFinalTotal = getFinalTotal;
})(CartService || (CartService = {}));
