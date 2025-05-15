import { AuthService } from "../services/AuthService.js";

console.log("Login script loaded.");

document.getElementById("login-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = (document.getElementById("username") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;

    if(AuthService.login(username, password)){
        window.location.href = "products.html";
    }else {
        alert("Invalid Credentials !!");
    }
});

document.getElementById("register-form")?.addEventListener("submit", (e)=>{
    e.preventDefault();
    const username = (document.getElementById("new-username") as HTMLInputElement).value;
    const password = (document.getElementById("new-password") as HTMLInputElement).value;

    if (AuthService.register(username, password)) {
    alert("User registered successfully! Please log in.");
  }
});