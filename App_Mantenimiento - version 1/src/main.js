//console.log('hello world')
//import './signupForm.js'
import {getDocs,collection} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js"
import {auth,db} from './firebase.js'
import { setupPosts } from "./postList.js"

import './signinForm.js'

//import './logout.js'
//import {createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
//import {getAuth} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
//await muy importante
const querySnapshot = await getDocs(collection(db,'Activos'))
setupPosts(querySnapshot.docs)
//console.log(querySnapshot)