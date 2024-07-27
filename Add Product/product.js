import { uploadBytes, getDownloadURL, ref, storage, db, collection, addDoc } from "../utils.js"



const product_form = document.getElementById("product_form")
const Add_Product_btn = document.getElementById("Add_Product_btn")

product_form.addEventListener("submit", function (e) {
    e.preventDefault()
    Add_Product_btn.disabled = true
    Add_Product_btn.innerText = "Add Product"
    console.log("e console", e);

    const productInfo = {
        images: e.target[0].files[0],
        productName: e.target[1].value,
        productPrice: e.target[2].value,
        productCategerous: e.target[3].value,
        Likes: []
    }

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
        alert(e)
        Add_Product_btn.disabled = false
        Add_Product_btn.innerText = "Add Product"
    })

})