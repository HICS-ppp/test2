
import React, {useState, useEffect} from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.js";
import {Navigate,Link} from "react-router-dom";
import "./gest.css"


const Gest = () => {


    /*state変数を定義*/
    const [Age, setAge] = useState("");
    const [Gender,setGender] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            //　ローカルストレージに一度保存する
            localStorage.setItem('A', Age);
            localStorage.setItem('G', Gender);
            window.location.href = "/gest_comp.tsx"
        } catch (error) {
            alert("正しく入力してください");
        }
    }
    return (
        <>
            <>
                <header className="header1">

                    <label className="logo">Preport!</label>
                </header>
                <form onSubmit = {handleSubmit}>
                <div className="center">
                    <h1>ゲスト登録</h1>

                    <div>
                        <label className="input">年齢</label>
                        <input required
                               onChange={(e:any) => setAge(e.target.value)}
                               className="agebox1"
                               name="age"
                               type="number"
                               min="0" max="100"/>
                    </div>

                    <div>
                        <label className="input">性別</label>
                        <input required onChange={(e:any) => setGender(e.target.value)}
                               name="gender" type="radio" value="男" />男
                        <input required onChange={(e:any) => setGender(e.target.value)}
                               name="gender" type="radio" value="女"/>女
                    </div>
                    <button className="register">登録</button>
                    <p>ログインページは<Link to={`/login/`}>こちら</Link></p>

                </div>

                </form>
            </>
        </>
    );
};
export default Gest;
