import React from "react";
import {ref, getDatabase, startAt,query, orderByChild, onChildAdded, set,equalTo} from "firebase/database"
import {database} from "../firebase";

const Groupmenu_create = () => {

    const db = getDatabase()
    const userID = sessionStorage.getItem('SessionUserID')
    const serchGroupID = (query(ref(db,'Groups/'),orderByChild('groupID'),startAt(1)))
    const createGroupName = sessionStorage.getItem('createGroupName')
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
        await Data_change()
        await timeout()
        await groupmenu_IF()
    }

    const Data_check = async () => {
        onChildAdded(serchGroupName,(snapshot => {
        //　同じグループ名とその作成者名の取得
            let xxx = snapshot.val()
            sessionStorage.setItem('nameCheck',xxx.createName)
            sessionStorage.setItem('userCheck',xxx.createUser)
        }))
    }

    const Data_change = async () => {
        onChildAdded(serchGroupID, (snapshot) => {
            // スナップショットの値を変換、取り出す処理
            let vvv = snapshot.val()
            console.log(snapshot.key) //値を見るためのテスト
            console.log(vvv.groupID)  //値を見るためのテスト
            console.log(sessionStorage.getItem('createGroupName')) //値を見るためのテスト
            // RealtimeDatabaseからグループIDの最大値を持ってくる
            let maxgroupID = Math.max(vvv.groupID)
            // SessionにID + 1　の値をセットしてグループIDにセットする
            sessionStorage.setItem('createGroupID', String(Number(maxgroupID) + 1))
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
    const groupmenu_IF = async () => {
        const createGroupID = sessionStorage.getItem('createGroupID')
        const nameCheck = sessionStorage.getItem('nameCheck')
        const userCheck = sessionStorage.getItem('userCheck')
        // 同じグループ名かつ同じ作成者名のグループだったらエラー処理するIF文
        if (nameCheck != createGroupName || userCheck != userName) {
            //Groups表にデータをセットする
            set(ref(database, "Groups/" + 'GR' + createGroupID + "/"), {
                groupName: createGroupName,
                createTime: createTime,
                createUser: userName,
                groupID: createGroupID
            })
            //Groups_Member表にデータをセットする
            set(ref(database, "Groups_Member/" + 'GR' + createGroupID + "/" + userID + "/"), {
                joinTime:createTime,
                role:1
            })
            // Group情報をセット
            sessionStorage.setItem('groupID','GR' + createGroupID)
            sessionStorage.setItem('groupName',String(createGroupName))

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
        <p>create-test</p>
    </form>
    )
}

export default Groupmenu_create;