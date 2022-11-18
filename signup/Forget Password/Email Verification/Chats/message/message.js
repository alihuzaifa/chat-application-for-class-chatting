import { db, app } from "../../../../../firebase-config.js";
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
    orderBy
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

// All variables
const auth = getAuth(app);
let currentUser = document.querySelector(".current-user-name");
let currentUserNumber = document.querySelector(".current-user-number");
let currentUserImg = document.querySelector(".person");
const send = document.querySelector(".send");
let message = document.querySelector(".message-input");
let messageData = document.querySelector(".messageData");
let uid1;
let uid2;
let printUid;
let userImage;
let unsubscribe;
let user = localStorage.getItem("selectedUser");
user = JSON.parse(user);
uid2 = user;


onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        uid1 = uid;
        uids(uid1,uid2)
        forImage();
        currentUserData();
        fetchData()
    } else {
        console.log("User is signed out")
    }
});


const currentUserData = () => {
    const q = query(collection(db, "users"), where("uid", "==", user));
    unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let data = doc.data()
            currentUser.innerHTML = data.userName;
            currentUserImg.src = data.image;
            currentUserNumber.innerHTML = data.PhoneNumber;
        });
    });
};

const forImage = () => {
    const q = query(collection(db, "users"), where("uid", "==", auth.currentUser.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let data = doc.data();
            userImage = data.image
        });
    });
}

const addData = () => {
    let collectionRef = collection(db, "messages");
    let data = {
        message: message.value,
        date: Timestamp.fromDate(new Date()),
        messageType: "text",
        messageSatus: "unread",
        messageImg: userImage,
        userId : auth.currentUser.uid,
        uid: uids(uid1, uid2),
    }
    addDoc(collectionRef, data);
    message.value = "";
}
send.addEventListener("click", addData);

const uids = (uid1, uid2) => {
    if(uid1 > uid2){
        printUid = uid1 + uid2;
        return printUid;
    }
    else{
        printUid = uid2 + uid1;
        return printUid;
    }

}

function fetchData() {
    const collectionRef = collection(db, "messages");
    const queries = where("uid", "==", printUid);
    // const orderData = orderBy("date","desc")
    const q = query(collectionRef, queries);
    unsubscribe = onSnapshot(q, (querySnapshot) => {
        if(querySnapshot.size > 0){
            messageData.innerHTML = "";
            querySnapshot.forEach((doc) => {
                let data = doc.data();
                messageData.innerHTML +=`<div class="col-4 offset-1"></div>
                <div class="col-4 offset-1 d-flex text-white py-2 rounded my-1 text-end" id = "message-2">
                    <img src="${data.messageImg}" class="img-fluid message-person align-self-center me-1" alt="person">
                    <h5 class="pt-3" id = "message-2">${data.message}</h5>`
            });
        }
    });
}
window.addEventListener("keydown", (e) => {
    if(e.key === "Enter"){
        addData()
    }
})