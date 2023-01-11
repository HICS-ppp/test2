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
    const ankeary = [""];
    let len = 0;


    let test3 = 10;



    const aaa = async () => {
        await KeyGet()
        await Time()
        await GroupGet()
        await AnkeGet()
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

        const Test2 = (ref(db,"Questionnaire/" + sessionID +"/"))
        onChildAdded(Test2,snapshot => {

                ankeary.push(String(snapshot.key))

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
                console.log(num)

            })
            const groupID = (ref(db, "Groups_Data/"+sessionID+"/"+ ary[num] + '/groupID'))
            //取ってきた値をsnapshotから変換する処理
            onValue(groupID, (snapshot) => {
                let aaa = snapshot.val()
                sessionStorage.setItem('groupID'+num, aaa)
                console.log(sessionStorage.getItem('groupID'+num))
                console.log(num)

            })
            const groupName = (ref(db, "Groups_Data/"+sessionID+"/"+ ary[num] + '/groupName'))
            //取ってきた値をsnapshotから変換する処理
            onValue(groupName, (snapshot) => {
                let aaa = snapshot.val()
                sessionStorage.setItem('groupName'+num, aaa)
                console.log(sessionStorage.getItem('groupName'+num))
                console.log(num)

            })
            const joinTime = (ref(db, "Groups_Data/"+sessionID+"/"+ ary[num] + '/joinTime'))
            //取ってきた値をsnapshotから変換する処理
            onValue(joinTime, (snapshot) => {
                let aaa = snapshot.val()
                sessionStorage.setItem('joinTime'+num, aaa)
                console.log(sessionStorage.getItem('joinTime'+num))
                console.log(num)
            })


            num++;
        }

        /*console.log(ary.length)*/
        len = (ary.length)
        sessionStorage.setItem('len',String(len))
    }


   const AnkeGet = () => {

       let num = 0;
       //回答したアンケートの内容を取得
       while (num < test3) {


           const ankeName = (ref(db, "Questionnaire/" + sessionID +"/"+ankeary[num]+"/questionnairename"))
           //取ってきた値をsnapshotから変換する処理
           onValue(ankeName, (snapshot) => {
               let aaa = snapshot.val()
               sessionStorage.setItem('ankeName' + num, aaa)
               console.log(sessionStorage.getItem('ankeName'+num))
               console.log(num)

           })

           const answerDate = (ref(db, "Questionnaire/" + sessionID +"/"+ ankeary[num]+"/answerDate"))
           //取ってきた値をsnapshotから変換する処理
           onValue(answerDate, (snapshot) => {
               let aaa = snapshot.val()
               sessionStorage.setItem('answerDate' + num, aaa)
               console.log(sessionStorage.getItem('answerDate' + num))
               console.log(num)

           })
           num++;
       }
       len = (ankeary.length)
       console.log(len)
       sessionStorage.setItem('ankelen',String(len))

   }



    aaa()


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
            }, 2000)
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
            <div id="loading-wrapper">
                <div id="loading-text">LOADING</div>
                <div id="loading-content"></div>
            </div>
        </>
    );
};
export default Userloading;