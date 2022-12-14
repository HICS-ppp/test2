import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
/*import "./loginuser.css";*/
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

const Login_user = () => {

    const userID = window.localStorage.getItem('localID')
    console.log(userID)
        
    const handleSubmit =  (e:any) => {
        e.preventDefault();
        window.location.href = "/loginuser_loading"
    }

    return (
        <>
            {/* onSubmitを追加↓ */}
            < form onSubmit={handleSubmit}>
                <h1 className="loginpage1">再度ログインしてください</h1>
                <div className="udiv1">

                    <label className="userid1">ユーザID</label>
                    <input className="useridbox1"
                           name="Userid"
                           type="text"
                           placeholder="Userid"
                           onChange={(e) => localStorage.setItem('loginID',e.target.value)}
                    />

                    <div className="pdiv1">
                        <label className="pass1">パスワード</label>
                        <input className="passbox1"
                               name="pass"
                               type="password"
                               placeholder="pass"
                               onChange={(e) => localStorage.setItem('loginPass',e.target.value)}
                        />
                    </div>
                </div>

                <div className="logdiv">

                    <button className="log1" >ログイン</button>

                </div>

            </form>
        </>
    );
};

export default Login_user;