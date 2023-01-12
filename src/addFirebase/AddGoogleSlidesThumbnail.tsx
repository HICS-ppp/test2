import {ref, uploadBytes} from "firebase/storage";
import {storage} from "../firebase";

/*
        Firebase Storageの images/グループIDの下に
        スライドを格納する
*/

async function AddGoogleSlidesThumbnail(slidesUrl:string,groupId:string,index:number){

    const response = await fetch(slidesUrl);
    const blob = await response.blob();
    console.log("blob is >>"+blob);

    if(blob == null) return;
    const imageRef = ref(storage,`images/${groupId}/Page${index}`);
    await uploadBytes(imageRef, blob);
}

export default AddGoogleSlidesThumbnail;