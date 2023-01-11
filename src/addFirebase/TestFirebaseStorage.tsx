import firebase from "firebase/compat";
import { storage } from "../firebase";
import {getStorage, ref, uploadBytes, listAll, getDownloadURL, deleteObject } from "firebase/storage";
import {useEffect, useState} from "react";
import changeObjectExistence from "./ChangeObjectExistence";
import ChangeObjectExistence from "./ChangeObjectExistence";
import { getStorageLength } from "../getFirebaseStorage/GetSlidesFromFirebaseStorage"


function TestFirebaseStorage(){

    const [imageUpload,setImage] = useState(null);
    const [downloadImageFile,setDownloadImageFile] = useState<any>("");
    const [downloadImageBool, setDownloadImageBool] = useState(false);


    const groupId = "GR1";
    const count = 1;
    const uploadImage = () => {
        if(imageUpload == null) return;
        //@ts-ignore
        const imageRef = ref(storage,`${groupId}/${groupId}${count}`);
        uploadBytes(imageRef, imageUpload).then(() => {
            alert("upload!");
        })
    }

    const downloadImage = async () =>{
        /*const storage = getStorage();
        const listRef = ref(storage, `images/GR1`);

        listAll(listRef)
            .then((res:any) => {
                console.log(res);
                res.items.forEach((itemRef:any) => {
                    console.log("bye~"+itemRef);
                    console.log(itemRef);
                    const gsReference = itemRef;
                    deleteObject(gsReference)
                });
            }).catch((error:any) =>{
            //console.log("ERROR!" + error);
        })*/
    }

    const dataDownloadImage = () => {
        const storage = getStorage();
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

                setDownloadImageFile(url);
                setDownloadImageBool(true);
                // Or inserted into an <img> element
                /*const img = document.getElementById('myimg');
                img.setAttribute('src', url);*/
            })
            .catch((error) => {
                // Handle any errors
            });

    }

    const deleteImageData = async () => {
        const fireStorage = getStorage();
        await deleteObject(ref(fireStorage,'images/GR1/sample.png'))
            .then(() => {
                console.log("delete now");
            });
    }

    const changeDatabase = async () =>{
        await ChangeObjectExistence("TEST2","");
    }

    const checkLength = async () =>{
        getStorageLength("GR1")
    }

    return(
        <>
            <input type="file" onChange={(event) => {
                // @ts-ignore
                setImage(event.target.files[0]);
            }} />
            <button onClick={uploadImage}>Up</button>

            {/*<button onClick={}>GET</button>*/}
            <button onClick={dataDownloadImage}>DownData</button>
            <button onClick={downloadImage}>Down</button>
            {downloadImageBool &&
                <img src={downloadImageFile}/>
            }
            <button onClick={deleteImageData}>delete</button>
            <button onClick={changeDatabase}>Change It</button>
            <button onClick={checkLength}>Check it</button>
        </>
    );
}
export default TestFirebaseStorage;