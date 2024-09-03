import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { getFirestore} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js"
import { 
  collection, 
  addDoc,
  getDocs,
  deleteDoc,
  onSnapshot,
  doc,
  getDoc,
  updateDoc

} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js"
//import { getFirestore } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";
  
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDzVLy_fzbt3eBs9XZpskn6PUje_1k46tE",
    authDomain: "dho-mantenimientomenor-bateas.firebaseapp.com",
    projectId: "dho-mantenimientomenor-bateas",
    storageBucket: "dho-mantenimientomenor-bateas.appspot.com",
    messagingSenderId: "241134709334",
    appId: "1:241134709334:web:1b77c02d633c4b816069f7"
  };

  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);
  // Initialize Firebase Authentication and get a reference to the service
  export const auth = getAuth(app);
  export const db = getFirestore(app);
  export const saveTask =(title,description,campamento)=>{
    //console.log(title,description)
    addDoc(collection(db,"tasks"),{title,description,campamento});
  }
  
  //export const getTasks = () => console.log('tasks list');
  export const getTasks = () => getDocs(collection(db,'tasks'))
  //export const equipoDoc = () => getDocs(collection(db,'equipos')doc(db,'miEquipo'))
  //export const equipoDoc = db.collection('equipos').doc('miEquipo');

  //export const onGetTask = () => console.log('onGetTasks')
  export const onGetTasks = (callback) => onSnapshot(collection(db,'tasks'),callback)//Extraer datos de la BD
  
  export const deleteTask = id => deleteDoc(doc(db,"tasks",id))//le mando la (coleccion y el documento) exacto a eliminar (eliminar de la BD)

  //para que me muestre una unica tarea
  export const getTask = id => getDoc(doc(db,"tasks",id))

  export const updateTask = (id,newFields) => 
    updateDoc(doc(db,'tasks',id),newFields);