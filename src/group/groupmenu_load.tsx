import React from "react";
import {ref, getDatabase, startAt,query, orderByChild, onChildAdded, set} from "firebase/database"
import {database} from "../firebase";

const Groupmenu_load = () => {

    const db = getDatabase()
    const aaa = (query(ref(db,'Groups/'),orderByChild('groupID'),startAt(1)))
    const createGroupName = sessionStorage.getItem('groupName')
    const dateObj = new Date()
    // 時間取得
    const createTime = String(dateObj.getFullYear()  +'/'+ (dateObj.getMonth()+1)+'/'
                                    + dateObj.getDate() +' '+ dateObj.getHours() + ':'
                                    + dateObj.getMinutes() +':'+ dateObj.getSeconds())
    const userName = sessionStorage.getItem('SessionUserName')

    //上から順番に処理させる処理
    const pr = async () => {
        await Database_set()
        await timeout()
        await groupmenu_success()
    }

    const Database_set = async () => {
        onChildAdded(aaa, (snapshot) => {
            let vvv = snapshot.val()
            console.log(snapshot.key) //値を見るためのテスト
            console.log(vvv.groupID)  //値を見るためのテスト
            console.log(sessionStorage.getItem('groupName')) //値を見るためのテスト

            // RealtimeDatabaseからグループIDの最大値を持ってくる
            let maxgroupID = Math.max(vvv.groupID)
            // SessionにID + 1　の値をセットしてグループIDにセットする
            sessionStorage.setItem('groupID', String(Number(maxgroupID) + 1))
        })
        const createGroupID = sessionStorage.getItem('groupID')

            //RealtimeDatabaseにデータをセットする処理
        set(ref(database, "Groups/" + 'GR' + createGroupID + "/"), {
            createName: createGroupName,
            createTime: createTime,
            createUser: userName,
            groupID: createGroupID
        })
    }

    // ５秒待機する処理
    const timeout = async () => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(true)
            }, 5000)
        })
    }
    //次の画面へ遷移する処理
    const groupmenu_success = async () => {
        window.location.href = './groupmenu'
    }
    //18行目の順番処理実行
    pr()

    return (
    <form>
        <p>test</p>
    </form>
    )
}

export default Groupmenu_load