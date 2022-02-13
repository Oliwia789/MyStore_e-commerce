import express from "express";
import bcrypt from "bcrypt";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, collection, setDoc, getDoc, updateDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtArITSeBIlPksC8uCBoSx8JjKxuffTYA",
  authDomain: "myshop-ea3d6.firebaseapp.com",
  projectId: "myshop-ea3d6",
  storageBucket: "myshop-ea3d6.appspot.com",
  messagingSenderId: "735483364361",
  appId: "1:735483364361:web:935e73d5ca9632431224d8"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const db = getFirestore();

const app = express();

app.use(express.static("public"));
app.use(express.json())

app.get("/", (req, res) => {
    res.sendFile("index.html", {root: "public"})
})

app.get("/signup", (req, res) => {
    res.sendFile("signup.html", {root: "public/signup"})
})

app.post("/signup", (req, res) => {
    const {name, email, password, number, tac} = req.body;

    if(name.length < 3){
        res.json({"alert" : "Your name must be longer than 3 letters"})
    } else if(!email.length){
        res.json({"alert": "Enter your email"})
    } else if(password.length < 8){
        res.json({"alert" : "Password must be longer than 8 characters"})
    } else if(isNaN(number) || number.length < 10){
        res.json({"alert" : "Invalid phone numer, please enter valid one"})
    } else if(!tac){
        res.json({"alert" : "You must agree to our terms and conditions."})
    } else {
        const users = collection(db, "users");

        getDoc(doc(users, email)).then(user => {
            if(user.exists()){
                return res.json({"alert" : "email already exists"})
            } else {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                        req.body.password = hash;
                        req.body.seller = false;

                        setDoc(doc(users, email), req.body).then(data => {
                            res.json({
                                name: req.body.name,
                                email: req.body.email,
                                seller: req.body.seller
                            })
                        })
                    })
                })
            }
        })

    }
})

app.get("/login", (req, res) => {
    res.sendFile("login.html", {root: "public/login"})
})

app.post("/login", (req, res) => {
    let{ email, password} = req.body;
    if(!email.length || !password.length){
        res.json({"alert" : "Fill up the inputs"})
    } 

    const users = collection(db, "users");

    getDoc(doc(users, email))
    .then(user => {
        if(!user.exists()){
            return res.json({"alert" : "email does not exists"});
        } else {
            bcrypt.compare(password, user.data().password, (err, result) => {
                if(result) {
                    let data = user.data();
                    return res.json({
                        name: data.name,
                        email: data.email,
                        seller: data.seller
                    })
                } else {
                    return res.json({"alert" : "the password is incorrect"})
                }
            })
        }
    })
})

app.get("/seller", (req, res) => {
    res.sendFile("seller.html", {root: "public/seller"})
})

app.post("/seller", (req, res) => {
    let {name, address, about, number, email} = req.body;

    if(!name.length || !address.length || !about.length || number < 10 ){
        return res.json({"alert" : "some information(s) is/are incorrect"});
    } else {
        const sellers = collection(db, "sellers");
        setDoc(doc(sellers, email), req.body)
        .then(data => {
            const users = collection(db, "users");
            updateDoc(doc(users, email), {
                seller: true
            })
            .then(data => {
                res.json({ "seller" : true})
            })
        })
    }
})

app.get("/dashboard", (req, res) => {
    res.sendFile("dashboard.html", {root: "public/dashboard"})
})

app.get("/404", (req, res) => {
    res.sendFile("404.html", {root: "public/404"})
})

app.use((req, res) => {
    res.redirect("/404")
})

app.listen(3000, () => {
    console.log("listening on port 3000");
})

