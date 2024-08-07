import{
    auth,
    getDoc,
    doc,
    db,
    onAuthStateChanged
} from "../utils.js"

const user_profile_image = document.getElementById("user_profile_image")
const user_profile_email = document.getElementById("user_profile_email")


onAuthStateChanged(auth,(user)=>{
    if(user){
        const profileUid = user.uid
        getProfile(profileUid)
    }else{
        console.log("user is not login");
    }
})



user_profile_email.innerText="Loading..."
function getProfile(profileUid){
    const imageRef = doc(db,"users",profileUid)
    getDoc(imageRef).then((data)=>{
        console.log(data.data());
        user_profile_image.src = data.data().img
        user_profile_email.innerText = data.data().email 
    }).catch((err)=>{
        console.log(err);
        alert(err)
        user_profile_email.innerText="user@example.com"
    })
}


