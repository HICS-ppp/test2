import React, {useEffect, useState} from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, Navigate } from "react-router-dom";
import { ref, push } from "firebase/database";
import { database } from "../firebase"
import {getAuth, sendSignInLinkToEmail} from "firebase/auth";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { useForm, SubmitHandler } from "react-hook-form";
import "./signup.css";
import {getValue} from "@testing-library/user-event/dist/utils";


const Register = () => {


    const [value, setValue] = useState(""); // valueをstateで管理
    const [value1,setValue1] = useState("");

    useEffect(() => {

    },)

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

            if (Pass !== Pass2) {
                alert("パスワードが一致しません");
            } else {
                try {
                    //　ローカルストレージに一度保存する
                    localStorage.setItem('N', userName);
                    localStorage.setItem('M', Email)
                    localStorage.setItem('P', Pass);
                    localStorage.setItem('P2', Pass2);
                    localStorage.setItem('A', Age);
                    localStorage.setItem('G', Gender);
                    localStorage.setItem('I', userID);
                    localStorage.setItem('I2', userID);
                    window.location.href = "/signup_mail_send"
                } catch (error) {
                    alert("正しく入力してください");
                }
            }
        }

    return (

        <><>
            <h1>ユーザ登録</h1>
            <form onSubmit = {handleSubmit}>
                <div className="sum">
                    <label　className="userinput">ユーザID</label>
                    <input
                        required
                        onChange={(e:any) => setuserID(e.target.value)}
                        className="regbox1"
                        type="text"
                        placeholder="userID" />
                </div>
                <div className="sum">
                    <label className="userinput">メールアドレス</label>
                    <input
                        required
                           className="regbox1"
                           onChange={(e:any) => setEmail(e.target.value)}
                                name="email"
                                type="email"
                                placeholder="email" />
                </div>
                <div className="sum">
                    <label className="userinput">ユーザ名</label>
                    <input required
                        onChange={(e:any) => setUserName(e.target.value)}
                           className="regbox1"
                                name="username"
                                type="text"
                                placeholder="username" />
                </div>


                <div className="sum">
                    <label className="userinput">パスワード</label>
                    <input required
                            onChange={(e:any) => setPass(e.target.value)}
                            className="regbox1"
                                name="pass"
                                type="password"
                                placeholder="pass"
                    />
                </div>
                <div className="sum">
                    <label className="userinput">再パスワード</label>
                    <input
                        required
                        onChange={(e:any) => setPass2(e.target.value)}
                           className="regbox1"
                                name="pass2"
                                type="password"

                                placeholder="pass2" />
                </div>
                <div className="sum">
                    <label className="userinput">年齢</label>
                    <input required
                        onChange={(e:any) => setAge(e.target.value)}
                           className="agebox1"
                                name="age"
                                type="number"
                                min="0" max="100"/>
                </div>
                <div className="sum">
                    <label className="userinput">性別</label>
                    <input required onChange={(e:any) => setGender(e.target.value)}
                                name="gender" type="radio" value="男" />男
                    <input required onChange={(e:any) => setGender(e.target.value)}
                                name="gender" type="radio" value="女"/>女
                </div>
                <div className="sum">

                    <button className="register">登録</button>

                    {/* ↓リンクを追加 */}
                <p>ログインページは<Link to={`/login/`}>こちら</Link></p>
                </div>
            </form>
    </>
    </>
    );
};

export default Register;