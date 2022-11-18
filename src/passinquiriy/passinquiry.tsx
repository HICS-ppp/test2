import React, {useState, useEffect} from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.js";
import {Navigate,Link} from "react-router-dom";
import "./passinquiry.css"


const Passinquiry = () => {



    /*state変数を定義*/
    const [RegisterEmail, setRegisterEmail] = useState("");

    const [RegisterPassword, setRegisterPassword] = useState("");


    /* ↓関数「handleSubmit」を定義 */
    const handleSubmit = async (e:any) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(
                auth, RegisterEmail, RegisterPassword
            );
        } catch(error) {
            alert("正しく入力してください");
        }
    };



    const [user, setUser] = useState();

    return (
        <>

                <>
                    <header className="header1">

                        <label className="logo">Preport!</label>
                    </header>

                    <div className="center">
                        <h1>パスワードを忘れた場合</h1>

                        <form onSubmit={handleSubmit}>

                        </form>
                    </div>
                </>
        </>
    );

};

export default Passinquiry;