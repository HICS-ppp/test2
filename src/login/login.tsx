import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import "./login.css";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

const Login = () => {
            const logE = 'error'
            if (localStorage.getItem('error') == logE){
                alert("IDまたはパスワードが間違っています")
                localStorage.removeItem('error')
            }
    const handleSubmit = async (e:any) => {
        e.preventDefault();
        window.location.href = "/login_loading"
    }

    return (
                <>
                    <header className="header1"><label className="logo">Preport</label></header>
                    {/* onSubmitを追加↓ */}
                    < form onSubmit={handleSubmit}>
                <h1 className="loginpage1">ログインページ</h1>
                    <div className="mdiv1">

                        <label className="Userid">ユーザID</label>
                        <input className="Userid"
                               name="Userid"
                               type="text"
                               placeholder="Userid"
                               onChange={(e) => localStorage.setItem('loginID',e.target.value)}
                        />
                    </div>
                    <div className="pdiv1">
                        <label className="pass1">パスワード</label>
                        <input className="passbox1"
                               name="pass"
                               type="password"
                               placeholder="pass"
                               onChange={(e) => localStorage.setItem('loginPass',e.target.value)}
                        />
                    </div>
                        <div className="logdiv">

                            <button className="log1" >ログイン</button>

                        </div>
                        {/* ↓リンクを追加 */}
                        <div className="linkdiv">  <p>新規登録は<Link to={`/signup`}>こちら</Link></p></div>
                        <div className="linkdiv"><p>ゲスト登録は<Link to={`/gest/`}>こちら</Link></p></div>
                        <div className="linkdiv"><p>パスワードを忘れた場合は<Link to={`/passinquiry/`}>こちら</Link></p></div>
                </form>
                    </>
    );
};

export default Login;