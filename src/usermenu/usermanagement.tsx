import React, {useState, useEffect} from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.js";
import {Navigate,Link} from "react-router-dom";
import "./usermanagement.css"


const Usermana = () => {


    return (
        <>

            <>
                <header className="header1">
                    <label className="logo">Preport!</label>
                </header>

                <div className="mail2div">
                <label className="mail2">現在の登録メールアドレス</label>
                </div>

                <div className="mailtextdiv">
                    <input type="email" className="mailtext" value="206042@std.hi-joho.ac.jp" disabled/>
                </div>
                <div className="mailtextdiv">
                    <input type="email" className="mailtext" name="mail2"　placeholder="新しいメールアドレスを入力"/>
                </div>
                <div className="mailtextdiv">
                    <input type="email" className="mailtext"　name="mail2" placeholder="再度新しいメールアドレスを入力"/>
                </div>


                <button className="change">変更</button>

                <button className="change2">キャンセル</button>


            </>
        </>
    );

};

export default Usermana;