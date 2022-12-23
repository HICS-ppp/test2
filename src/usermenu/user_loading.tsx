import React from "react";
import {Link} from "react-router-dom"
import "./user_loading.css";
import {getDatabase, onValue, ref,onChildAdded} from "firebase/database";
import {getAuth, sendSignInLinkToEmail} from "firebase/auth";
import {resolve} from "dns";
import {rejects} from "assert";
import {isNumberObject} from "util/types";



const Userloading =  () => {


    const sessionID = window.sessionStorage.getItem('SessionUserID')
    //Realtime Databaseから値を取ってくる処理
    const db = getDatabase()
    const dbpass = (ref(db, "Users/" + sessionID + '/pass'))
    const dbmailaddress = (ref(db, "Users/" + sessionID + '/mailaddress'))


    const ary = [""];
    let len = 0;

    let test2 = "";
    let test3 = 10;


    const aaa = async () => {
        await KeyGet()
        await Time()
        await GroupGet()
    }

    const KeyGet = () => {
        const Test = (ref(db,'Groups_Data/'+sessionID+"/"))
        onChildAdded(Test,snapshot => {
                /*   let test = snapshot.val()
                   let test2 = snapshot.key*/
                //配列にグループID登録
                ary.push(String(snapshot.key))
                /* test3 = String(snapshot.key?.length)*/
            }
        )
    }


//二秒待つ処理
    const Time = async () => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(true)
            }, 2000)
        })
    }

    //所属しているグループのデータを取得
    const GroupGet = () => {
        let num = 0;

        //所属グループ分セッションに登録
        //numをカウントアップして変数に適用
        while(num<test3){
            /*    console.log(ary[num])*/

            const createUser = (ref(db, "Groups_Data/"+sessionID+"/"+ ary[num] + '/createUser'))
            //取ってきた値をsnapshotから変換する処理
            onValue(createUser, (snapshot) => {
                let aaa = snapshot.val()
                sessionStorage.setItem('createUser'+num, aaa)
                console.log(sessionStorage.getItem('createUser'+num))

            })
            const groupID = (ref(db, "Groups_Data/"+sessionID+"/"+ ary[num] + '/groupID'))
            //取ってきた値をsnapshotから変換する処理
            onValue(groupID, (snapshot) => {
                let aaa = snapshot.val()
                sessionStorage.setItem('groupID'+num, aaa)
                console.log(sessionStorage.getItem('groupID'+num))

            })
            const groupName = (ref(db, "Groups_Data/"+sessionID+"/"+ ary[num] + '/groupName'))
            //取ってきた値をsnapshotから変換する処理
            onValue(groupName, (snapshot) => {
                let aaa = snapshot.val()
                sessionStorage.setItem('groupName'+num, aaa)
                console.log(sessionStorage.getItem('groupName'+num))
            })
            const joinTime = (ref(db, "Groups_Data/"+sessionID+"/"+ ary[num] + '/joinTime'))
            //取ってきた値をsnapshotから変換する処理
            onValue(joinTime, (snapshot) => {
                let aaa = snapshot.val()
                sessionStorage.setItem('joinTime'+num, aaa)
                console.log(sessionStorage.getItem('joinTime'+num))
            })
            num++;
        }

        console.log(ary.length)
        len = (ary.length)
        sessionStorage.setItem('len',String(len))
    }

    aaa()




   /* while (count<=10){

        const groupID = (ref(db,"Groups_Data"+sessionID+"GR"+count+"groupID"))
        const groupName = (ref(db,"Groups_Data"+sessionID+"GR"+count+"groupName"))
        const createUser = (ref(db,"Groups_Data"+sessionID+"GR"+count+"crateUser"))
        const joinTime = (ref(db,"Groups_Data"+sessionID+"GR"+count+"joinTime"))
*/
/*        onValue(groupID, (snapshot ) => {
            let promise = new Promise((resolve,rejects) =>{
                if(snapshot.val() == null){
                    rejects("null" /!*取得できてない*!/);
                }else{
                    resolve("OK!");
                }
            })

            promise.then(
                result => //sessionStorage.setItem('groupID'+count, snapshot.val())
                    console.log(snapshot.val())

            )
        })*/

      /*  onValue(groupID, (snapshot) => {
            let gr = snapshot.val()
            sessionStorage.setItem('groupName'+count, gr)
        })

        onValue(groupName, (snapshot) => {
            let gr = snapshot.val()
            sessionStorage.setItem('groupName'+count, gr)
        })
        onValue(createUser, (snapshot) => {
            let gr = snapshot.val()
            sessionStorage.setItem('crateUser'+count, gr)
        })
        onValue(joinTime, (snapshot) => {
            let gr = snapshot.val()
            sessionStorage.setItem('joinTime'+count, gr)
        })
        count++;
        // console.log(sessionStorage.getItem('group'))

    }
*/

    //
    // グループID   groupID
    // グループ名  groupName
    // 作者名   crateUser
    // 加入日  joinTime

    console.log(sessionID)

    const pr = async () => {
        await a()
        await b()
        await c()
    }
    //取ってきた値をsnapshotから変換する処理
    let a = async () => {
        onValue(dbpass, (snapshot) => {
            let aaa = snapshot.val()
            sessionStorage.setItem('pass2', aaa)
            console.log(sessionID)
        })

        onValue(dbmailaddress, (snapshot) => {
            let aaa = snapshot.val()
            sessionStorage.setItem('dbmail', aaa)
            console.log(dbmailaddress)
        })
    }

    const b = async () => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(true)
            }, 3000)
        })
    }

    const c = async () => {
        const pass1 = sessionStorage.getItem('pass1')
        const pass2 = sessionStorage.getItem('pass2')
        console.log(sessionStorage.getItem('pass1'))
        console.log(sessionStorage.getItem('pass2'))

        if(pass1==pass2){
            window.location.href = 'usermenu'
        }else{
            window.location.href='usererror'
        }
    }

    pr()




    return (
        <>
            <div className="loader">
                <div className="one"></div>
                <div className="two"></div>
                <div className="three"></div>
                <div className="four"></div>
            </div>
        </>
    );
};
export default Userloading;