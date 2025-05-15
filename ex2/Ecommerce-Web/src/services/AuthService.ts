import { User } from "../modles/Users.js";
export namespace AuthService{
    const key = "users";

    function loadUsers() :User[] {
        const raw = localStorage.getItem(key);
        return raw? JSON.parse(raw) : [];
    }

    function saveUsers(users :User[]){
        localStorage.setItem(key,JSON.stringify(users));
    }

    export function register(username: string,password:string):boolean{
        const users = loadUsers();
        if(users.some(u => u.username === username)){
            alert("Username already exists");
            return false;
        }
        if(password.length<6){
            alert("Password must be at least 6 characters long");
            return false;
        }
        users.push(new User(username, password));
        saveUsers(users);
        return true;
    }
    export function login(username: string, password: string): boolean{
        const users = loadUsers();
        const user = users.find(
            u => u.username === username && u.password === password 
        );
        if(user){
            localStorage.setItem("loggedInUser",JSON.stringify(user));
            return true;
        }
        return false;
    }
    export function isAuthenticated(): boolean{
        return !!localStorage.getItem("loggedInUser");
    }

    export function logout(): void{
        localStorage.removeItem("loggedInUser");
    }
}