import React, {useState, useEffect} from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.js";
import {Navigate,Link} from "react-router-dom";
import "./gest.css"


const Gest = () => {

    return (
        <>
                <>
                    <header className="header1">

                        <label className="logo">Preport!</label>
                    </header>

                    <div className="center">
                        <h1>ゲスト登録</h1>

                            <div>
                                <label className="input">年齢</label>
                                <input className="agebox1"
                                       name="age"
                                       type="number"
                                       min="0" max="100"/>
                            </div>

                            <div>
                                <label className="input">性別</label>
                                <input className="gen1" name="gender" type="radio" value="男" />男
                                <input className="gen1" name="gender" type="radio" value="女"/>女
                            </div>

                            <button className="register">登録</button>



                    </div>
                </>



        </>
    );
};
export default Gest;