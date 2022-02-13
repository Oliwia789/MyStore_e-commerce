window.onload = () => {
    if(sessionStorage.user){
        user = JSON.parse(sessionStorage.user);
        if(user.email){
            location.replace("/")
        }
    }
}

let formBtn = document.querySelector(".submit-btn");
let loeader = document.querySelector(".loader");

formBtn.addEventListener("click", () =>{
    let fullname = document.querySelector("#name");
    let email = document.querySelector("#email");
    let password = document.querySelector("#password");
    let number = document.querySelector("#number");
    let tac = document.querySelector("#tc");


    if(fullname.value.length < 3){
        showFormError("Your name must be longer than 3 letters")
    } else if(!email.value.length){
        showFormError("Enter your email")
    } else if(password.value.length < 8){
        showFormError("Password must be longer than 8 characters")
    } else if(/*isNaN(number) || */number.value.length < 10){
        console.log(typeof(number.value))
        showFormError("Invalid phone numer, please enter valid one")
    } else if(!tac){
        showFormError("You must agree to our terms and conditions.")
    } else {
        loeader.style.display = "block";
        sendData("/signup", {
            name: fullname.value,
            email: email.value,
            password: password.value,
            number: number.value,
            tac: tac.checked
        })
    }


})