/*
    12/29
    TestGetImgr内でGoogleSlidesより取得したリンクから
    Blob形式でデータを受け取れることが分かった。
 */

import {ref, uploadBytes} from "firebase/storage";
import {storage} from "../firebase";

function TestGetImgr() {

    const url = "https://lh4.googleusercontent.com/I3O0tNaMe4fqJG99Z2H8-GACUbC4ZFLiVrOg83lD-Bfi-_2HRt0f-DzLLtYSW-C7K2_W7Peo3i7X85eJ0RaOnOFyVRphWeLiSY7UpnlMlGjMVtVDix7H4TjMbfYr183YUb3qX_JBy9OwcOS1UYuhiZk-lU-t3lIHJdBdjX93cQTZgl0XWGlAr6f0JW2dlhwe2CaIRp_qy1_xBroJPplSJF532d4kVSHMjiXNVKOZTUZtdiotRj5k5PqL2Ew0pmBawdsbOXDueDHBwkNDL8Qkv6MrDok8lw=s1600";

    const downloadFile = async (url: string): Promise<void> => {
        /*const response = await fetch(url)
        const blob = await response.blob()
        console.log("blob is >>"+blob);

        if(blob == null) return;
        //@ts-ignore
        const imageRef = ref(storage,`TEST/SAMPLE`);
        uploadBytes(imageRef, blob).then(() => {
            alert("upload!");
        })*/

        /*const downloadTag = document.createElement('a')
        downloadTag.href = URL.createObjectURL(blob)
        downloadTag.download = `sample.png`
        downloadTag.click()*/
    }

    /*let uploadToStorage = (imageURL:any) => {
        getFileBlob(imageURL,(blob: Blob | Uint8Array | ArrayBuffer) => {
            firebase.storage().ref().put(blob).then(function(snapshot) {
                console.log("Uploaded a blob or file!");
            })
        })
    }*/
    return(
        <div>

            <button onClick={() => {downloadFile(url)}}>test Blob!</button>

        </div>

    )


}

export default TestGetImgr;