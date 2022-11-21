import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, Navigate } from "react-router-dom";
import { ref, push } from "firebase/database";
import { database } from "../firebase"
import {getAuth, sendSignInLinkToEmail} from "firebase/auth";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";


const Register = () => {



    /*state変数を定義*/
    /*Realtime Databaseに登録するデータの変数を定義*/
    const [userName, setUserName] = useState("");
    const [Email, setEmail] = useState("");
    const [Pass, setPass] = useState("");
    const [Pass2, setPass2] = useState("");
    const [Age, setAge] = useState("");
    const [Gender,setGender] = useState("");
    const [userID, setuserID] = useState("");

    /* ↓関数「handleSubmit」を定義 */
        const handleSubmit = async (e: any) => {
            e.preventDefault();
            try {
                //　ローカルストレージに一度保存する
                localStorage.setItem('N',userName);localStorage.setItem('M',Email)
                localStorage.setItem('P',Pass);localStorage.setItem('P2',Pass2);
                localStorage.setItem('A',Age);localStorage.setItem('G',Gender);
                localStorage.setItem('I',userID);localStorage.setItem('I2',userID);
                // 画面遷移処理
                window.location.href = "/signup_mail_send"

            } catch (error) {
                alert("正しく入力してください");
            }
        };
    return (

        <><>
            <h1>ユーザ登録</h1>
            <form onSubmit = {handleSubmit}>
                <div>
                    <label>ユーザID</label>userID
                    <input
                        onChange={(e:any) => setuserID(e.target.value)}
                        className="userID"
                        type="text"
                        placeholder="userID" />
                </div>
                <div>
                    <label>メールアドレス</label>
                    <input
                           onChange={(e:any) => setEmail(e.target.value)}
                                name="email"
                                type="email"
                                placeholder="email" />
                </div>
                <div>
                    <label>ユーザ名</label>
                    <input onChange={(e:any) => setUserName(e.target.value)}
                                name="username"
                                type="text"
                                placeholder="username" />
                </div>
                <div>
                    <label>パスワード</label>
                    <input
                            onChange={(e:any) => setPass(e.target.value)}
                                name="pass"
                                type="password"
                                placeholder="pass" />
                </div>
                <div>
                    <label>再パスワード</label>
                    <input onChange={(e:any) => setPass2(e.target.value)}
                                name="pass2"
                                type="password"
                                placeholder="pass2" />
                </div>
                <div>
                    <label>年齢</label>
                    <input onChange={(e:any) => setAge(e.target.value)}
                                name="age"
                                type="number"
                                min="0" max="100"/>
                </div>
                <div>
                    <label>性別</label>
                    <input onChange={(e:any) => setGender(e.target.value)}
                                name="gender" type="radio" value="男" />
                    <input onChange={(e:any) => setGender(e.target.value)}
                                name="gender" type="radio" value="女"/>
                </div>
                <button>登録</button>
                                {/* ↓リンクを追加 */}
                <p>ログインは<Link to={`./login/`}>こちら</Link></p>
            </form>
    </>
    </>
    );
};


export default Register;