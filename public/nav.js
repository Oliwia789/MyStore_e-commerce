const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if(scrollY >= 180) {
        navbar.classList.add("bg");
    } else {
        navbar.classList.remove("bg");
    }
})


const createNavBar = () => {
    let navbar = document.querySelector(".navbar");
    navbar.innerHTML += `
       <ul class="links-container">
            <li class="link-items"><a href="#" class="link active">HOME</a></li>
            <li class="link-items"><a href="#" class="link">Product</a></li>
            <li class="link-items"><a href="#" class="link">ABOUT</a></li>
            <li class="link-items"><a href="#" class="link">CONTACT</a></li>
        </ul>
        <div class="user-interactions">
            <div class="cart">
                <img src="img/cart.png" class="cart-icon" alt="cart logo">
                <span class="cart-item-count">00</span>
            </div>
            <div class="user">
                <img src="img/user.png" class="user-icon" alt="user logo">
                <div class="user-icon-popup">
                    <p>Login to your account</p>
                    <a>Login</a>
                </div>
            </div>
        </div>
        `
}

createNavBar();

let userIcon = document.querySelector(".user-icon");
let userPopupIcon = document.querySelector(".user-icon-popup");

userIcon.addEventListener("click", () => userPopupIcon.classList.toggle("active"))

let text = userPopupIcon.querySelector("p");
let actionBtn = userPopupIcon.querySelector("a");
let user = JSON.parse(sessionStorage.user || null);

if(user != null){
    text.innerHTML = `Hello, ${user.name}`;
    actionBtn.innerHTML = "log out";
    actionBtn.addEventListener("click", () => logout());
} else {
    text.innerHTML = "login to your account";
    actionBtn.innerHTML = "login";
    actionBtn.addEventListener("click", () => location.href = "/login");
}

const logout = () => {
    sessionStorage.clear();
    location.reload();
}