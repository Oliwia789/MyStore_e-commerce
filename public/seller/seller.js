window.onload = () => {
    let user = JSON.parse(sessionStorage.user || null);
    if(user == null){
        location.replace("/login");
    } else if(user.seller){
        location.replace("/dashboard")
    }
}


let loader = document.querySelector(".loader");
let applyBtn = document.querySelector(".apply-btn");

applyBtn.addEventListener("click", () => {
    let businessName = document.querySelector("#name").value;
    let businessAddress = document.querySelector("#address").value;
    let about = document.querySelector("#about").value;
    let businessNumber = document.querySelector("#number").value;

    if(!businessName.length || !businessAddress.length || !about.length || businessNumber < 10 ){
        showFormError("some information(s) is/are incorrect")
    } else {
        loader.style.display = "block";
        sendData("/seller", {
            name: businessName,
            address: businessAddress,
            about: about,
            number: businessNumber,
            email: JSON.parse(sessionStorage.user).email
        })
    }

})