import {
    auth,
    db,
    onAuthStateChanged,
    signOut,
    doc,
    getDoc,
    getDocs,
    collection,
    query,
    where,
    deleteDoc
} from "../utils.js"

// console.log("auth==>",auth);
// console.log("storage==>",storage);
// console.log("db==>",db);
const signout_btn = document.getElementById("signout_btn")
const login_btn_home = document.getElementById("login_btn_home")
const user_image = document.getElementById("user_image")
const addproduct_home = document.getElementById("addproduct_home")
const dispaly_product = document.getElementById("dispaly_product")
const myProduts_home = document.getElementById("myProduts_home")
del_btn()
onAuthStateChanged(auth, (user) => {
    if (user) {
        const email = user.email
        const uid = user.uid;
        user_image.style.display = "inline-block"
        addproduct_home.style.display = "inline-block"
        getUserImage(uid)
        getOnlyMyproducts(uid)
    } else {
        user_image.style.display = "none"
        addproduct_home.style.display = "none"
        // window.location.href = '/login/login.html'
    }
});
// signout_btn.addEventListener("click", function () {
//     signOut(auth)
// })


function getUserImage(uid) {
    const userRef = doc(db, "users", uid)
    getDoc(userRef).then((data) => {
        console.log("user image", data.data().img);
        user_image.src = data.data().img
    }).catch((err) => {
        console.log(err);
        // alert(err)
    })
}



async function getOnlyMyproducts(uid) {
    try {
        console.log("uig", uid);
        const q = query(collection(db, "addProduct"), where("createdBy", "==", uid));
        const querySnapshot = await getDocs(q);
        dispaly_product.innerHTML = ""
        querySnapshot.forEach((doc) => {
            console.log("kiu nahi chal raha he bahiya tu==>");
            // console.log(`${doc.id} => ${doc.data()}`);
            const products = doc.data()
            const { images, createdByEmail, productName, productPrice, Likes, productCategerous } = products
            console.log(products);
            const cartProduce = `
            <div class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img class="rounded-t-lg w-full h-48 object-cover" src="${images}" alt="Product Image">
            <div class="p-5">
            <h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${productName}</h5>
            <p class="text-gray-700 dark:text-gray-400 mt-3">PRICE : ${productPrice}</p>
            <p class="text-gray-700 dark:text-gray-400 mt-3">CATEGORY : ${productCategerous}</p>
            <p class="text-gray-700 dark:text-gray-400 mt-3">CREATOR : ${createdByEmail}</p>
            <button  id= ${doc.id} onclick="carted(this)" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5 block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                ${auth?.currentUser && products?.Likes?.includes(auth.currentUser.uid) ? "carted..." : "Add to Cart"}
                </button>
             <button  onclick="del_btn(this)"   id= ${doc.id} class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 mt-5 block text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
             Delete
             </button>
            </div>
            </div>
            `
            window.del_btn = del_btn
            dispaly_product.innerHTML += cartProduce

        });
    } catch (err) {
        console.log(err)
    }
}

async function  del_btn(e){
  try {
    console.log(e.innerText)
    await deleteDoc(doc(db, "addProduct", e.id));
    console.log("del ho gaya");
    const User_uid = auth.currentUser.uid
    getOnlyMyproducts(User_uid)
  } catch (error) {
    console.log(error);
  }
}

// function carted(e) {
//     console.log("this", e.innerText);
//     if (auth.currentUser) {
//         const docRef = doc(db, "addProduct", e.id)
//         if (e.innerText == "carted...") {
//             updateDoc(docRef, {
//                 Likes: arrayRemove(auth.currentUser.uid)
//             }).then(() => {
//                 e.innerText = "Add to Cart"
//             }).catch((errr) => {
//                 console.log(errr);
//             })

//         } else {

//             updateDoc(docRef, {
//                 Likes: arrayUnion(auth.currentUser.uid)
//             }).then(() => {
//                 e.innerText = "carted..."
//             }).catch((errr) => {
//                 console.log(errr);
//             })
//         }
//     } else {
//         alert("First login")
//         // window.location.href = 'login/login.html'
//     }
// }