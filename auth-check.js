import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

const firebaseConfig = {

apiKey:"AIzaSyA6BZsjkGC97WQ6VhsDo4I1sGMXjTD1ecc",
authDomain:"hack-reality.firebaseapp.com",
projectId:"hack-reality",
storageBucket:"hack-reality.firebasestorage.app",
messagingSenderId:"101142651006",
appId:"1:101142651006:web:77b34b4a69bc88fdcdb82f"

};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

onAuthStateChanged(auth, async (user)=>{

if(!user){
window.location.replace("login.html");
return;
}

const uid=user.uid;

const docRef=doc(db,"members",uid);
const docSnap=await getDoc(docRef);

if(!docSnap.exists()){
window.location.replace("pending.html");
return;
}

const data=docSnap.data();

if(data.approved!==true){
window.location.replace("pending.html");
return;
}

});