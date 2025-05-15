import { CartService } from "../services/CartService.js";
import { AuthService } from "../services/AuthService.js";
function renderCart() {
    if (!AuthService.isAuthenticated()) {
        window.location.href = "login.html";
        return;
    }
    const cartItems = CartService.getCart();
    const container = document.getElementById("cart-items");
    if (!container)
        return;
    container.innerHTML = "";
    cartItems.forEach(item => {
        const div = document.createElement("div");
        div.style.border = "1px solid #ddd";
        div.style.margin = "10px";
        div.style.padding = "10px";
        div.innerHTML = `
            <img src="images/${item.product.image}" alt="${item.product.name}" style="width:100px; vertical-align: middle;">
            <strong>${item.product.name}</strong><br>
            Price: $${item.product.getDiscountedPrice().toFixed(2)}<br>
            Quantity:
            <input type="number" min="1" max="5" value="${item.quantity}" id="qty-${item.product.id}">
            <button id="update-${item.product.id}">Update</button>
            <button id="remove-${item.product.id}">Remove</button>
        `;
        container.appendChild(div);
        const updateBtn = document.getElementById(`update-${item.product.id}`);
        const removeBtn = document.getElementById(`remove-${item.product.id}`);
        const qtyInput = document.getElementById(`qty-${item.product.id}`);
        updateBtn === null || updateBtn === void 0 ? void 0 : updateBtn.addEventListener("click", () => {
            const qty = Number(qtyInput.value);
            if (qty >= 1 && qty <= 5) {
                CartService.updateQuantity(item.product.id, qty);
            }
            else {
                alert("Quantity must be between 1 and 5");
            }
        });
        removeBtn === null || removeBtn === void 0 ? void 0 : removeBtn.addEventListener("click", () => {
            CartService.removeFromCart(item.product.id);
            renderCart();
        });
    });
    const totalCost = document.getElementById("total-cost");
    const shippingCost = document.getElementById("shipping-cost");
    const finalTotal = document.getElementById("final-total");
    if (totalCost)
        totalCost.textContent = `$${CartService.getTotal().toFixed(2)}`;
    if (shippingCost)
        shippingCost.textContent = `$${CartService.getShipping().toFixed(2)}`;
    if (finalTotal)
        finalTotal.textContent = `$${CartService.getFinalTotal().toFixed(2)}`;
}
document.addEventListener("DOMContentLoaded", renderCart);
