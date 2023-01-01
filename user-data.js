import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsWuaRZDfXEBXyv9j_Eluwn2TU5Q0kaI4",
  authDomain: "web-data-maruchero.firebaseapp.com",
  projectId: "web-data-maruchero",
  storageBucket: "web-data-maruchero.appspot.com",
  messagingSenderId: "548473541156",
  appId: "1:548473541156:web:78a4680c660f66d650beb1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const colRef = collection(db, "userData");

// addDoc
let sessionId;
let sessionDoc;

function insertData() {
  // Get user data
  fetch("https://ipapi.co/json/").then((res) => {
    res.json().then((data) => {
      // Create new document
      sessionDoc = data;
      sessionDoc.site = window.location.href;
      sessionDoc.visitTime = new Date();
      sessionDoc.leaveTime = new Date();

      // Add document to the database
      addDoc(colRef, sessionDoc)
        .then((res) => {
          sessionId = res.id;
        })
        .catch((e) => {
          console.error(e);
        });
    });
  });
}

// updateData
function updateData() {
  sessionDoc.leaveTime = new Date(); // Update leave time

  setDoc(doc(colRef, sessionId), sessionDoc) // Update document in the db
    .then((res) => {
      // Success
    })
    .catch((e) => {
      console.error(e);
    });
}

// Start
window.addEventListener("load", () => {
  insertData();
  setInterval(() => {
    updateData();
  }, 1000);
});
