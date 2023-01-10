import { storage } from "../firebase";
import {getStorage, ref, getDownloadURL } from "firebase/storage";
/*
    Storageからスライドデータを取得し
    スライドデータをreturnする
 */

function GetSlidesFromFirebaseStorage(){
    const storage = getStorage();

    let downloadImageBool = false;
    let downloadImageFile:any;

    getDownloadURL(ref(storage, 'images/GR1/GR11'))
        .then((url) => {
            // `url` is the download URL for 'images/stars.jpg'

            // This can be downloaded directly:
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = (event) => {
                const blob = xhr.response;
            };
            xhr.open('GET', url);

            downloadImageFile = url;
            downloadImageBool = true;
            // Or inserted into an <img> element
            /*const img = document.getElementById('myimg');
            img.setAttribute('src', url);*/
        })
        .catch((error) => {
            //エラーがあれば
        });

    if(downloadImageBool){
        return downloadImageFile;
    }
}

export default GetSlidesFromFirebaseStorage;