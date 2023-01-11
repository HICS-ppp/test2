import { storage } from "../firebase";
import {getStorage, ref, getDownloadURL, listAll} from "firebase/storage";
/*
    Storageからスライドデータを取得し
    スライドデータをreturnする
 */

function GetSlidesFromFirebaseStorage(groupId:string,index:number){
    const storage = getStorage();

    let downloadImageBool = false;
    let downloadImageFile:any;

    getDownloadURL(ref(storage, `images/${groupId}/${index}`))
        .then((url) => {

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
            console.log(error);
        });

    if(downloadImageBool){
        return downloadImageFile;
    }
}

async function getStorageLength(groupId:string){
    const storage = getStorage();
    const listRef = ref(storage, `images/${groupId}`);
    let returnLength:number = 0;

    listAll(listRef).then((listResult) => {
        returnLength = listResult.items.length;
    }).then(() => {
        console.log(returnLength);
        return returnLength;
    })
    return returnLength;
}

export default GetSlidesFromFirebaseStorage;
export {getStorageLength};