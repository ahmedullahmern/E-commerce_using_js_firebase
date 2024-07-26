import {
    auth, storage, db, onAuthStateChanged, signOut, doc, getDoc, getDocs, collection
} from "./utils.js"

// console.log("auth==>",auth);
// console.log("storage==>",storage);
// console.log("db==>",db);
const signout_btn = document.getElementById("signout_btn")
const login_btn_home = document.getElementById("login_btn_home")
const user_image = document.getElementById("user_image")
const addproduct_home = document.getElementById("addproduct_home")
const product_display = document.getElementById("product_display")
getaAllproducts()
onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        getUserImage(uid)
        login_btn_home.style.display = "none"
        user_image.style.display = "inline-block"
        addproduct_home.style.display = "block"
    } else {
        login_btn_home.style.display = "inline-block"
        user_image.style.display = "none"
        addproduct_home.style.display = "none"
        window.location.href = '/login/login.html'
    }
});
signout_btn.addEventListener("click", () => {
    signOut(auth)
})


function getUserImage(uid) {
    const userRef = doc(db, "users", uid)
    getDoc(userRef).then((data) => {
        console.log("user image", data.data().img);
        user_image.src = data.data().img
    }).catch((err) => {
        alert(err)
    })
}



async function getaAllproducts() {
    try {
        const querySnapshot = await getDocs(collection(db, "addProduct"));
        product_display.innerHTML = ""
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            const products = doc.data()
            const { images, productName, productPrice, productCategerous } = products
            console.log(products);
            const cartProduce = `
           
            `

    product_display.innerHTML += cartProduce

        });
    } catch (err) {
       console.log(err)
    }
}


