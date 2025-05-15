import { User } from "../modles/Users.js";
export var AuthService;
(function (AuthService) {
    const key = "users";
    function loadUsers() {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : [];
    }
    function saveUsers(users) {
        localStorage.setItem(key, JSON.stringify(users));
    }
    function register(username, password) {
        const users = loadUsers();
        if (users.some(u => u.username === username)) {
            alert("Username already exists");
            return false;
        }
        if (password.length < 6) {
            alert("Password must be at least 6 characters long");
            return false;
        }
        users.push(new User(username, password));
        saveUsers(users);
        return true;
    }
    AuthService.register = register;
    function login(username, password) {
        const users = loadUsers();
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            localStorage.setItem("loggedInUser", JSON.stringify(user));
            return true;
        }
        return false;
    }
    AuthService.login = login;
    function isAuthenticated() {
        return !!localStorage.getItem("loggedInUser");
    }
    AuthService.isAuthenticated = isAuthenticated;
    function logout() {
        localStorage.removeItem("loggedInUser");
    }
    AuthService.logout = logout;
})(AuthService || (AuthService = {}));
