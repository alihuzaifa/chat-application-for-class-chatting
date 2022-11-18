import { db, app } from "../../../../firebase-config.js";
import {
    getAuth,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

import {
    collection,
    addDoc,
    Timestamp,
    query,
    where,
    onSnapshot,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

// All variables
// const logout = document.querySelector(".logout");
let person = document.querySelector(".person");
let searchFriend = document.querySelector(".search-friend");
let friend = document.querySelector(".friend-image");
let friendImage = document.querySelector(".friend-name");
let list = document.querySelector(".list");
let unsubscribe;
const auth = getAuth(app);

// Checking Auth
onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        friendsGet();
    } else {
        console.log("User is signed out")
    }
});

// // SignOut;
// const signOutUser = () => {
//     signOut(auth).then(() => {
//         location.replace("../../../../index.html")
//     }).catch((error) => {
//         // An error happened.
//     });
// }
// logout.addEventListener("click", signOutUser)

// Current userImage
const userImage = () => {
    let collectionRef = collection(db, "users");
    let queries = where("uid", "==", auth.currentUser.uid)
    const q = query(collectionRef, queries);
    unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let data = doc.data();
            person.src = data.image;
        });
    });
}

// Show Friends
const friendsGet = () => {
    let collectionRef = collection(db, "users");
    let queries = where("uid", "!=", auth.currentUser.uid)
    const q = query(collectionRef, queries);
    unsubscribe = onSnapshot(q, (querySnapshot) => {
        list.innerHTML = "";
        querySnapshot.forEach((doc) => {
            let data = doc.data()
            list.innerHTML += `<div class="col-12 my-1 d-flex py-2 rounded text-white" id = "box" onclick = "selectedUser('${data.uid}')">
            <img src="${data.image}" class="img-fluid friend-image friend" alt="person" onclick = "selectedUser('${data.uid}')">
            <h5 class="ms-2 fw-bold friend-name" onclick = "selectedUser('${data.uid}')">${data.userName}</h5>
        </div>`
        });
    });
    userImage()
}

const selectedUser = (user) => {
    localStorage.setItem("selectedUser", JSON.stringify(user))
    location = "message/message.html"
}

window.selectedUser = selectedUser;