import {app} from "../../firebase-config.js"
import { getAuth,sendPasswordResetEmail  } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

// All variables
let email = document.querySelector(".element-1");
let submit = document.getElementById("submit-data");
const auth = getAuth(app);
let message = document.querySelector(".error")
const getASecureRandomPassword = async () => {
    try{
        let data = await sendPasswordResetEmail(auth, email.value);
        message.innerHTML = "New Password link has been sent to your gmail"
    }
    catch(error){
        if(error.message === "Firebase: Error (auth/user-not-found)."){
            message.innerHTML = "You dont have any account to reset password"
        }
    }
}
submit.addEventListener("click", getASecureRandomPassword);