import React, {useState, useEffect} from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.js";
import {Navigate,Link} from "react-router-dom";
import "./passinquiry.css"
import {getDatabase, onValue, ref} from "firebase/database";

const Passinquiry = () => {

/*    setmail(ref(db, "Users/" + userid + "/pass"))*/





    const useri = (e:any) => {
        e.preventDefault();
        window.location.href = "/passinquiry_loading"

    }


/*    const db = getDatabase()
    const useri = async (e:any) => {
      /!*  e.preventDefault();*!/
        localStorage.removeItem("Userid")
        console.log('xxx')
        a()
        await c(e)
    }


    const a = () => {
        const value = localStorage.getItem('value')
        const dbID = (ref(db,"Users/"+value+"/mailaddress"))
        onValue(dbID, (snapshot) => {
            let aaa = snapshot.val()
            localStorage.setItem('Userid', aaa)
            console.log(aaa)
        })
    }

    const c = async (e:any) =>{
        e.preventDefault();
        //window.location.href = "/passinquiry_mail_send"
        console.log('test')
    }*/


    return (
        <>
            <>
                <header className="header1">

                    <label className="logo">Preport!</label>
                </header>

                <form onSubmit={useri}>


                <div className="center">
                    <h1>パスワードを忘れた場合</h1>

                    <div className="passmaildiv">
                        <input type="text"
                               placeholder="userIDを入力"
                               className="passmail"
                               onChange={(e) => localStorage.setItem('userid',e.target.value)}
                        />
                    </div>

                    <div className="mail4div">
                        <label className="mail4">登録したメールアドレスに送信します</label>
                    </div>

                    <div className="mailbuttondiv">

                       <button className="mailbutton">送信</button>
                    </div>

                </div>
                </form>

            </>
        </>
    );
};
export default Passinquiry;
