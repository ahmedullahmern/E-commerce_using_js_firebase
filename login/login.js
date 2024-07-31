import { signInWithEmailAndPassword, auth } from "../utils.js"

const login_form = document.getElementById("login_form")
const login_btn = document.getElementById("login_btn")

login_form.addEventListener("submit", function (e) {
  e.preventDefault()
  login_btn.disabled = true
  login_btn.innerText = "Loading..."
  console.log("e", e);


  const email = e.target[0].value
  const password = e.target[1].value
  console.log("email", email);
  console.log("password", password);
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
      window.location.href = '/'
      login_btn.disabled = false
      login_btn.innerText = "LOGIN"
    })
    .catch((error) => {
      login_btn.disabled = false
      login_btn.innerText = "LOGIN" 
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(error)
    });
})