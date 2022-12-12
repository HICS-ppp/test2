import React from "react";
import {Link} from "react-router-dom"
import "./user_loading.css";
import {getDatabase, onValue, ref} from "firebase/database";
import {getAuth, sendSignInLinkToEmail} from "firebase/auth";



const Userloading = () => {

    const sessionID = window.sessionStorage.getItem('SessionUserID')
    //Realtime Databaseから値を取ってくる処理
    const db = getDatabase()
    const dbpass = (ref(db, "Users/" + sessionID + '/pass'))
    const dbmailaddress = (ref(db, "Users/" + sessionID + '/mailaddress'))

    console.log(sessionID)


    const pr = async () => {
        await a()
        await b()
        await c()
    }
    //取ってきた値をsnapshotから変換する処理
    const a = async () => {
        onValue(dbpass, (snapshot) => {
            let aaa = snapshot.val()
            sessionStorage.setItem('pass2', aaa)
            console.log(sessionID)
        })

        onValue(dbmailaddress, (snapshot) => {
            let aaa = snapshot.val()
            sessionStorage.setItem('dbmail', aaa)
            sessionStorage.setItem('dbmail',aaa)
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