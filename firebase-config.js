import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js"
const firebaseConfig = {
    apiKey: "AIzaSyCOTk4WMVObXgZOhnHfX7QHeEQZ_al99yM",
    authDomain: "whatsapp-45c7d.firebaseapp.com",
    projectId: "whatsapp-45c7d",
    storageBucket: "whatsapp-45c7d.appspot.com",
    messagingSenderId: "221058335748",
    appId: "1:221058335748:web:73772738c632a43afde151",
    measurementId: "G-54SW4PXQCW"
};
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);
export const storage = getStorage(app)
