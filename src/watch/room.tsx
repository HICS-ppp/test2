/* 「useState」と「useEffect」をimport↓ */
import React, { useState, useEffect } from "react";
/* 「onAuthStateChanged」と「auth」をimport↓ */
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import {useNavigate, Navigate, Link} from "react-router-dom";
import "./room.css"




const Roompass = () => {



    /* ↓state変数「user」を定義 */
    const [user, setUser] = useState("");

    /* ↓ログインしているかどうかを判定する */
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            // @ts-ignore
            setUser(currentUser);
        });
    }, []);

    const navigate = useNavigate();

    /* ↓関数「logout」を定義 */
    const logout = async () => {
        await signOut(auth);
        navigate("../login");
    }




    return (
        <>
            <>
                <div className="roompassall">
                <h1 className="room">ルームパスワード入力画面</h1>


                    <input className="roompasstext"
                           name="roompass"
                           type="text"
                           placeholder="ルームパスワード入力"
                    />



                <button className="participation">参加</button>

                </div>
                 <Link to={`/mainpage/`}><button className="a3">戻る</button></Link>


            </>

        </>
    );
};

export default Roompass;