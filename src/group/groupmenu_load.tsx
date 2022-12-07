import React from "react";
import {ref, getDatabase, startAt,query, orderByChild, onChildAdded, set,equalTo} from "firebase/database"
import {database} from "../firebase";

const Groupmenu_load = () => {

    const db = getDatabase()
    const serchGroupID = (query(ref(db,'Groups/'),orderByChild('groupID'),startAt(1)))
    const createGroupName = sessionStorage.getItem('groupName')
    const dateObj = new Date()
    // 時間取得
    const createTime = String(dateObj.getFullYear()  +'/'+ (dateObj.getMonth()+1)+'/'
                                    + dateObj.getDate() +' '+ dateObj.getHours() + ':'
                                    + dateObj.getMinutes() +':'+ dateObj.getSeconds())
    const userName = sessionStorage.getItem('SessionUserName')
    const serchGroupName = (query(ref(db,'Groups/'),orderByChild('createName'),equalTo(createGroupName)))

    //上から順番に処理させる処理
    const pr = async () => {
        await Data_check()
        await Database_set()
        await timeout()
        await groupmenu_success()
    }

    const Data_check = async () => {
        onChildAdded(serchGroupName,(snapshot => {
        //　同じグループ名とその作成者名の取得
            let xxx = snapshot.val()
            sessionStorage.setItem('nameCheck',xxx.createName)
            sessionStorage.setItem('userCheck',xxx.createUser)
        }))
    }

    const Database_set = async () => {
        onChildAdded(serchGroupID, (snapshot) => {
            // スナップショットの値を変換、取り出す処理
            let vvv = snapshot.val()
            console.log(snapshot.key) //値を見るためのテスト
            console.log(vvv.groupID)  //値を見るためのテスト
            console.log(sessionStorage.getItem('groupName')) //値を見るためのテスト

            // RealtimeDatabaseからグループIDの最大値を持ってくる
            let maxgroupID = Math.max(vvv.groupID)
            // SessionにID + 1　の値をセットしてグループIDにセットする
            sessionStorage.setItem('groupID', String(Number(maxgroupID) + 1))
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
        const createGroupID = sessionStorage.getItem('groupID')
        const nameCheck = sessionStorage.getItem('nameCheck')
        const userCheck = sessionStorage.getItem('userCheck')
        // 同じグループ名かつ同じ作成者名のグループだったらエラー処理するIF文
        if (nameCheck != createGroupName || userCheck != userName) {
            //RealtimeDatabaseにデータをセットする処理
            set(ref(database, "Groups/" + 'GR' + createGroupID + "/"), {
                createName: createGroupName,
                createTime: createTime,
                createUser: userName,
                groupID: createGroupID
            })
            window.location.href = './groupmenu'
        }else{
            // 使ったSessionクリアしてエラー、メインページに戻る
            sessionStorage.removeItem('nameCheck');sessionStorage.removeItem('userCheck');
            sessionStorage.removeItem('groupName');sessionStorage.removeItem('groupID');
            alert('同じ名前で作成したグループがあるため作成に失敗しました')
            window.location.href = '../mainpage'
        }
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