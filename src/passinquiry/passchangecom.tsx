
import React, {useState, useEffect} from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.js";
import {Navigate,Link} from "react-router-dom";
import "./passchangecom.css";


const Passchangecom = () => {


    return (
        <>
            {/* ↓ログインしていればマイページを表示 */}

            <>


                <header className="header1">

                    <label className="logo">Preport!</label>
                </header>

                <h1>パスワードの変更が完了しました！</h1>


<div className="log2div">
    <Link to={`/login/`}><button className="log2">ログインへ</button></Link>

</div>

            </>
        </>
    );
};
export default Passchangecom;
