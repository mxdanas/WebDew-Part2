import { ProductService } from "../services/ProductService.js";
import { CartService } from "../services/CartService.js";
import { AuthService } from "../services/AuthService.js";
import { Product } from "../modles/Product.js";

async function loadProducts(){
    if(!AuthService.isAuthenticated()){
        window.location.href = "login.html";
        return;
    }

const products = await ProductService.fetchProducts(); 
const grid = document.getElementById("product-grid");
if (!grid) return;
console.log("Loaded products:", products);
products.forEach((product : Product) => {
    const card = document. createElement("div");
    card.style.border = "1px solid #ccc";
    card.style.padding = "10px";
    card.style.margin = "10px";
    card.style.width = "200px";
    card.style.display = "inline-block";

    card.innerHTML = `
      <img src="images/${product.image}" alt="${product.name}" style="width:100%">
      <h3>${product.name}</h3>
      <p>Price: $${product.price.toFixed(2)}</p>
      <p>Discount: ${product.discount * 100}%</p>
      <p>Discounted Price: $${product.getDiscountedPrice().toFixed(2)}</p>
      <label>Qty:
        <select id="qty-${product.id}">
          ${[1, 2, 3, 4, 5].map(q => `<option value="${q}">${q}</option>`).join("")}
        </select>
      </label>
      <button id="add-${product.id}">Add to Cart</button>
    `;
    grid.appendChild(card);

    const addBtn = document.getElementById(`add-${product.id}`);
    const qtySelector = document.getElementById(`qty-${product.id}`) as HTMLSelectElement;

    addBtn?.addEventListener("click", ()=> {
        const quantity = parseInt(qtySelector.value);
        CartService.addToCart(product, quantity);
    });
});

}

document.addEventListener("DOMContentLoaded", loadProducts);