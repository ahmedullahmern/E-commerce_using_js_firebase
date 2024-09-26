import { auth, uploadBytes, getDownloadURL, ref, storage, db, collection, addDoc } from "../utils.js"


const product_form = document.getElementById("product_form")
const Add_Product_btn = document.getElementById("Add_Product_btn")

// console.log(auth.currentUser.email);
// console.log(auth.currentUser.email);
// console.log(auth.currentUser.email);



// Toastify({
//     text: "Product Successfully Added",
//     className: "success",
//     duration: 5000,
//     style: {
//         background: "linear-gradient(to right, #00b09b, #96c93d)",
//     }
// }).showToast();

product_form.addEventListener("submit", function (e) {
    e.preventDefault()
    Add_Product_btn.disabled = true
    Add_Product_btn.innerText = "Loading..."
    console.log("e console", e);

    const productInfo = {
        images: e.target[0].files[0],
        productName: e.target[1].value,
        productPrice: e.target[2].value,
        productCategerous: e.target[3].value,
        createdBy: auth.currentUser.uid,
        createdByEmail: auth.currentUser.email,
        Likes: []
    }
    Toastify({
        text: "Product Successfully Added",
        className: "success",
        duration: 5000,
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
    }).showToast();
    const imgRef = ref(storage, productInfo.images.name)
    uploadBytes(imgRef, productInfo.images).then(() => {
        console.log("file upload hogae");
        getDownloadURL(imgRef).then((url) => {
            console.log("url Agaya");
            productInfo.images = url

            const productCollection = collection(db, "addProduct")
            addDoc(productCollection, productInfo).then((doc) => {
                console.log("add document to db");

                Add_Product_btn.disabled = false
                Add_Product_btn.innerText = "Add Product"
                window.location.href = '/'
            }).catch((err) => {
                alert(err)
            })
        }).catch((er) => {
            alert(er)
            Add_Product_btn.disabled = false
            Add_Product_btn.innerText = "Add Product"
        })
    }).catch((e) => {
        Toastify({
            text: e,
            className: "info",
            style: {
                background: "linear-gradient(to right, #f00000, #ff7f7f)", // Gradient from red to a lighter red
            }
        }).showToast();
        alert(a)
        Add_Product_btn.disabled = false
        Add_Product_btn.innerText = "Add Product"
    })

})