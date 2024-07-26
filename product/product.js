import { uploadBytes, getDownloadURL, ref, storage, db, collection, addDoc } from "../utils.js"



const product_form = document.getElementById("product_form")

product_form.addEventListener("submit", function (e) {
    e.preventDefault()
    console.log("e console", e);

    const productInfo = {
        images: e.target[0].files[0],
        productName: e.target[1].value,
        productPrice: e.target[2].value,
        productCategerous: e.target[3].value,
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
                window.location.href = '/'
            }).catch((err) => {
                alert(err)
            })
        }).catch((er) => {
            alert(er)
        })
    }).catch((e) => {
        alert(e)
    })

})