import { storage } from "../firebase";
import {getStorage, ref, getDownloadURL, listAll} from "firebase/storage";
/*
    Storageからスライドデータを取得し
    スライドデータをreturnする
 */

function GetSlidesFromFirebaseStorage(groupId:string,index:number){
    console.log("HEY");
    const storage = getStorage();

    let downloadImageBool = false;
    let downloadImageFile:any;

    getDownloadURL(ref(storage, `images/${groupId}/Pages${index}`))
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
            console.log("Download!"+downloadImageFile);
        })
        .catch((error) => {
            //エラーがあれば
            console.log(error);
        });

    if(downloadImageBool){
        return downloadImageFile;
    }
}

async function getStorageLength(groupId:string):Promise<any>{
    const storage = getStorage();
    const listRef = ref(storage, `images/${groupId}`);
    let returnLength:number = 0;

    await listAll(listRef).then((listResult) => {
        console.log(listResult);
        returnLength = listResult.items.length;
    }).then(() => {
        console.log(returnLength);
        return returnLength;
    })
    console.log(returnLength);
    return returnLength;

}

export default GetSlidesFromFirebaseStorage;
export {getStorageLength};