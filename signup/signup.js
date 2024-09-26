import { createUserWithEmailAndPassword, auth, ref, uploadBytes, getDownloadURL, storage, doc, setDoc, db } from "../utils.js"

const signup_form = document.getElementById("signup_form")
const signup_btn = document.getElementById("signup_btn")



signup_form.addEventListener("submit", function (e) {
    signup_btn.innerText = "Loading..."
    signup_btn.disabled = true
    e.preventDefault()
    console.log(e);
    const img = e.target[0].files[0]
    const email = e.target[1].value
    const password = e.target[2].value
    console.log("email", email);
    console.log("password", password);

    const userInfo = {
        img,
        email,
        password,
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("users", userCredential.user.uid);
            const imgRef = ref(storage, `user/${userCredential.user.uid}`)
            uploadBytes(imgRef, img).then(() => {
                console.log("image uploaded");
                getDownloadURL(imgRef).then((url) => {
                    console.log("url agaya", url);
                    userInfo.img = url
                    const userDbRef = doc(db, "users", userCredential.user.uid)
                    setDoc(userDbRef, userInfo).then(() => {
                        console.log("user object updated");
                        window.location.href = '/'
                        signup_btn.innerText = "Signup"
                        signup_btn.disabled = false
                    }).catch((errorrr) => {
                        alert(errorrr)
                        signup_btn.innerText = "Signup"
                        signup_btn.disabled = false
                    })
                }).catch((e) => {
                    signup_btn.innerText = "Signup"
                    signup_btn.disabled = false
                    console.log("url nahi deya", e);
                })
                Swal.fire({
                    title: 'Login Completed!',
                    text: "Do you want to continue",
                    icon: "success",
                })
            }).catch((err) => {
                console.log("image uploade nahi ho ra ha he", err);
                alert(err)
                signup_btn.innerText = "Signup"
                signup_btn.disabled = false
            })
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            signup_btn.innerText = "Signup"
            signup_btn.disabled = false
            Swal.fire({
                title: 'SomeThing Went Worng',
                text: errorMessage,
                icon: 'error',
            })
        });
})

