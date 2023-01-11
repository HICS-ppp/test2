import {ref, update, getDatabase} from "firebase/database"

/*
    ObjectExistenceをtrueにする処理
    またここでlimitも現在の時刻にする。
    主に資料共有を行った際に動かす処理と想定して記述している。
 */
async function ChangeObjectExistence(groupId:string,slidesId:string){
    const db = getDatabase();
    let postData
    /*
        スライドIDが変化する場合を判定して、
        postDataの項目を変更している。
     */
    if(slidesId == "") {
        postData = {
            //slidesId:slidesId
            ObjectExistence: true,
            limit: Date.now()
        };
    }else{
        postData = {
            slidesId:slidesId,
            ObjectExistence: true,
            limit: Date.now()
        };
    }


    await update(ref(db,`/Groups_Document/${groupId}`),postData);
}


export default ChangeObjectExistence