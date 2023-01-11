import {getDatabase, ref, get, child} from "firebase/database";

/*
    Firebase RealtimeDatabaseからGroups_Document/groupId内のデータを
    取得する。
 */

async function ConvertFromRealtimeDatabase(groupId:string) {
    let ppp;
    const db = getDatabase();
    const test = ref(db);

    await get(child(test, `Groups_Document/${groupId}`)).then(async (snapshot) => {
        if (snapshot.exists()) {
            ppp = await snapshot.val();
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
    return ppp;
}

export default ConvertFromRealtimeDatabase;