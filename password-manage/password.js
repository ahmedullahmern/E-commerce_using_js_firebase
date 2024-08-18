import { sendPasswordResetEmail,auth } from "../utils.js";

var emailChanged = document.querySelector("#email_reset")
var resetPassword = document.querySelector("#reset_btn")

resetPassword.addEventListener("click", function () {
    sendPasswordResetEmail(auth, emailChanged.value)
        .then(() => {
            console.log("Kam Karaha he");
            
        })
        .catch((error) => {
            console.log("Error");
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
})  