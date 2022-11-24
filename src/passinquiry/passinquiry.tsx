import React, {useState, useEffect} from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.js";
import {Navigate,Link} from "react-router-dom";
import "./passinquiry.css"
import {set} from "react-hook-form";


const Passinquiry = () => {

    const [passEmail, setPassEmail] = useState("");


    const handleSubmit = async (e: any) => {
        e.preventDefault();
            //　ローカルストレージに一度保存する
            localStorage.setItem('E', passEmail);
            window.location.href = "/passinquiry_mail_send.tsx"
    }



    return (
        <>
            <>
                <header className="header1">

                    <label className="logo">Preport!</label>
                </header>
                <form onSubmit = {handleSubmit}>

                <div className="center">
                    <h1>パスワードを忘れた場合</h1>

                    <div className="passmaildiv">
                  {/*      <input type="email"
                               placeholder="メールアドレスを入力"
                               className="passmail"/>*/}

                        <input className="passmail"
                               name="email"
                               type="email"
                               placeholder="email"
/*
                               onChange={(e) => setLoginEmail(e.target.value)}
*/
                        />

                    </div>
                    <div className="mail4div">
                        <label className="mail4">入力したメールアドレスに送信します</label>
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
