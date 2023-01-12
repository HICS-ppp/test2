import React from "react";
import {database} from "../firebase";
import {getDatabase, onValue, query, ref, set} from "firebase/database";

const Groupmenu_join = () => {

    const db = getDatabase()
    const userID = sessionStorage.getItem('SessionUserID')
    const userName = sessionStorage.getItem('sessionUserName')
    const joinGroupID = sessionStorage.getItem('joinGroupID')
    const searchGroupID = (ref(db, "Groups_Member/" + joinGroupID))
    const searchGroupUserID = (ref(db, "Groups_Member/" + joinGroupID + '/User/' + userID))
    const searchGroupName = (ref(db,"Groups/" + joinGroupID + '/groupName'))


    const pr = async () => {
        await Data_change()
        await timeout()
        await group_login()
        await timeout2()
        await groupJoin_IF()
    }
    // 該当グループがあったら、trueなかったらfalse
    const Data_change = async () => {
        onValue(searchGroupName,(snapshot => {
            const name = snapshot.val()
            sessionStorage.setItem('groupName',name)
        }))
        onValue(searchGroupID, (snapshot) => {
            let aaa = snapshot.val()
            console.log(aaa)
            if(aaa != null){
                const bbb = 'true'
                sessionStorage.setItem('GroupID_check',bbb)
            }else{
                const ccc = 'false'
                sessionStorage.setItem('GroupID_check',ccc)
            }
        })
        onValue(searchGroupUserID,(snapshot) => {
            let xxx = snapshot.key
            console.log(xxx)
            sessionStorage.setItem('GroupMyUserID',String(xxx))
        })
    }

    // 3秒待機する処理
    const timeout = async () => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(true)
            }, 3000)
        })
    }

    // 既に参加している場合、ログインを行う
    const group_login = async () => {
        const GroupUserID = sessionStorage.getItem('GroupMyUserID')
        console.log(GroupUserID)
        if(GroupUserID == userID) {
            console.log('login成功')
            sessionStorage.setItem('groupID',String(joinGroupID))
            window.location.href = './groupmenu'
        }
    }
    // 2秒待機する処理
    const timeout2 = async () => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(true)
            }, 2000)
        })
    }

    // 参加したいグループにリクエストを送る
    const groupJoin_IF = async () => {
        const IDCheck = sessionStorage.getItem('GroupID_check')
        if(IDCheck == 'true') {
            //グループ参加リクエストの数を取得
            const RequestUserCount_Accept = (query(ref(db,'Groups_Member/' + joinGroupID + '/joinRequest')))
            onValue(RequestUserCount_Accept,snapshot => {
                let count = Object.keys(snapshot.val()).length;
                sessionStorage.setItem('RequestUserCount_join',String(count))
            })
            //Groups_Member表にデータをセットする
            let Num = Number(sessionStorage.getItem('RequestCount_join'))
            set(ref(database, "Groups_Member/" + joinGroupID +"/joinRequest/" + userID + "/"), {
                number: Num + 1,
                username:userName
            })
            sessionStorage.removeItem('groupName')
            alert(joinGroupID + 'に参加リクエストを送りました')
            window.location.href = '../mainpage'
        }else{
            alert('該当のグループは存在しません')
            sessionStorage.removeItem('groupName')
            window.location.href = '../mainpage'
        }
    }

    pr()

    return(
        <p>join-test</p>
    )
}

export default  Groupmenu_join