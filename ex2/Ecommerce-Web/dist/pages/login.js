var _a, _b;
import { AuthService } from "../services/AuthService.js";
console.log("Login script loaded.");
(_a = document.getElementById("login-form")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if (AuthService.login(username, password)) {
        window.location.href = "products.html";
    }
    else {
        alert("Invalid Credentials !!");
    }
});
(_b = document.getElementById("register-form")) === null || _b === void 0 ? void 0 : _b.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("new-username").value;
    const password = document.getElementById("new-password").value;
    if (AuthService.register(username, password)) {
        alert("User registered successfully! Please log in.");
    }
});
