/* 「useState」と「useEffect」をimport↓ */
import React, { useState, useEffect } from "react";
/* 「onAuthStateChanged」と「auth」をimport↓ */
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import {useNavigate, Navigate, Link} from "react-router-dom";
import  "./mainpage.css";

const Mainpage = () => {
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
        navigate("../login/login");
    }

    return (
            <>
                    <>

                        <header className="header2">
                            <label className="logo2">Preport!</label>
                        </header>
                        <h1 className="mainfont1">グループ</h1>



                        <h2 className="mainfont2">グループ作成</h2>
                        <div className="maintext">
                            <input type="text" name="groupname" className="form" placeholder="グループ名を入力"/>
                            <Link to={`/groupmenu/`}><button className="mainbutton">作成</button></Link>
                        </div>


                        <h2 className="mainfont2">グループ入室</h2>
                        <div className="maintext">
                            <input type="text" name="groupid" className="form" placeholder="グループIDを入力"/>
                            <Link to={`/groupmenu/`}><button className="mainbutton">参加</button></Link>

                        </div>
                        <h1 className="mainfont1">視聴</h1>
                        <div className="maintext">
                            <input type="text" name="roomid" className="form" placeholder="ルームIDを入力"/>
                            <button className="mainbutton">参加</button>
                        </div>
                        <button onClick={logout}>ログアウト</button>
                    </>

                    </>
    );
};

export default Mainpage;