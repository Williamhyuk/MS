import {signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import {auth} from "./firebase.js"
//import{showMessage} from "./showMessage.js"

const signInForm = document.querySelector('#signup-form');

signInForm.addEventListener('submit',async(e)=>{
    e.preventDefault()

    const email = signInForm['input_Email'].value
    const password = signInForm['input_Password'].value

    console.log(email,password)

    try {
        const userCredentials =await signInWithEmailAndPassword(auth, email, password)
        console.log('Si se encuentra')
        console.log(userCredentials)
        window.location.replace("dashboard.html");//cuando pulsa el boton login llama a la vrntana "Dashboard"
    
    }catch(error){
        console.log(error)
    }
})