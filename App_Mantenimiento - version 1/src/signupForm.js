import {createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import {auth} from'./firebase.js'

const signupform = document.querySelector('#signup-form');

signupform.addEventListener('submit',async(e) =>{
    e.preventDefault();

    //const email= document.querySelector('#input_Email').value;
    //const password= document.querySelector('#input_Password').value;
    const email = signupform['input_Email'].value
    const password = signupform['input_Password'].value

    console.log(email,password)

        try{
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
            console.log('sign up')
            console.log(userCredentials)
            //document.querySelector(#signup modal)
        }catch(error){
            console.log(error)
        }
         

})