
import React, {useState, useEffect} from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.js";
import {Navigate,Link} from "react-router-dom";
import "./signup.css"


const Gest = () => {
    /*state変数を定義*/
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    /* ↓関数「handleSubmit」を定義 */
    const handleSubmit = async (e:any) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(
                auth, registerEmail, registerPassword
            );
        } catch(error) {
            alert("正しく入力してください");
        }
    };
    const [user, setUser] = useState();

    /* ↓ログインしているかどうかを判定する */
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
    }, []);

    return (
        <>
            {/* ↓ログインしていればマイページを表示 */}

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
