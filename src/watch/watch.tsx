/* 「useState」と「useEffect」をimport↓ */
import React, { useState, useEffect } from "react";
/* 「onAuthStateChanged」と「auth」をimport↓ */
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate,Navigate } from "react-router-dom";
import "./watch.css"




const Watch = () => {



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

                <div className="watchall">

                    <div className="watchbox1">

                        <div className="watch">
                            <h1>配信画面</h1>

                        </div>

                        <div className="watchbutton">
                            <button className="move">⇦</button>
                            <button className="move">⇨</button>
                            <button className="stop">スライドの同期を停止</button>
                            <button className="download">⇩</button>
                        </div>
                    </div>

                <div className="watchbox2">
                    <div className="leavdiv">
                        <button className="leav" name="leav">退室</button>

                    </div>



                    <input type="text"
                           placeholder="入力"
                           className="watchtext"
                           name="watchtext"/>

                    <div className="check">
                        <input type="radio" className="check" name="check" value="1"/>チャット
                        <input type="radio" className="check" name="check" value="2"/>質問
                    </div>
                    <div className="ch">
                        <button className="chbutton" name="chbutton">送信</button>

                    </div>
                </div>
                </div>
            </>

        </>
    );
};

export default Watch;