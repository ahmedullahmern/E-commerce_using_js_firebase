import { auth, storage, db, onAuthStateChanged, signOut } from "./utils.js"

// console.log("auth==>",auth);
// console.log("storage==>",storage);
// console.log("db==>",db);
const signout_btn = document.getElementById("signout_btn")

onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
    } else {
        window.location.href = '/login/login.html'
    }
});
signout_btn.addEventListener("click", () => {
    signOut(auth)
})
