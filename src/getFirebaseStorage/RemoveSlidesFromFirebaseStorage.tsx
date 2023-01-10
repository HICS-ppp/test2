import {deleteObject, getStorage, listAll, ref} from "firebase/storage";

/*
    Firebase Storage内にあるスライドデータを全て削除する処理
 */

async function RemoveSlidesFromFirebaseStorage(groupId:string){

    const storage = getStorage();
    const listRef = ref(storage, `images/${groupId}`);

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
    })

}

export default RemoveSlidesFromFirebaseStorage