import React, { useState } from "react";
import { Link, } from "react-router-dom";
import "./signup.css";


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
            <header className="header1"><label className="logo">Preport!</label></header>
            <h1 className="userh1">ユーザ登録</h1>
            <form onSubmit = {handleSubmit}>
                <div className="sum">
                   <li> <label　className="userinput">ユーザID</label></li>
                    <input
                        onChange={(e:any) => setuserID(e.target.value)}
                        className="regbox1"
                        type="text"
                        placeholder="userID"
                    required/>
                </div>
                <div className="sum">
                   <li> <label className="userinput">メールアドレス</label></li>
                    <input
                           className="regbox1"
                           onChange={(e:any) => setEmail(e.target.value)}
                                name="email"
                                type="email"
                                placeholder="email"
                           required/>
                </div>
                <div className="sum">
                    <li> <label className="userinput">ユーザ名</label></li>
                    <input onChange={(e:any) => setUserName(e.target.value)}
                           className="regbox1"
                                name="username"
                                type="text"
                                placeholder="username"

                           required/>
                </div>
                <div className="sum">
                    <li> <label className="userinput">パスワード</label></li>
                    <input
                            onChange={(e:any) => setPass(e.target.value)}
                            className="regbox1"
                                name="pass"
                                type="password"
                                placeholder="pass"
                            required/>
                </div>
                <div className="sum">
                   <li> <label className="userinput">再パスワード</label></li>
                    <input onChange={(e:any) => setPass2(e.target.value)}
                           className="regbox1"
                                name="pass2"
                                type="password"
                                placeholder="pass2"
                           required/>
                </div>
                <div className="sum2">
                    <label className="userinput2">年齢</label>
                    <input onChange={(e:any) => setAge(e.target.value)}
                           className="agebox1"
                                name="age"
                                type="number"
                                min="0" max="100"
                           required/>
                </div>
                <div className="sum2">
                    <label className="userinput2">性別</label>
                    <input onChange={(e:any) => setGender(e.target.value)}
                                name="gender" type="radio" value="男" required/>男
                    <input onChange={(e:any) => setGender(e.target.value)}
                                name="gender" type="radio" value="女" required/>女
                </div>
                <div className="sumlog">

                    <button className="register">登録</button>


                                {/* ↓リンクを追加 */}
                <p>ログインは<Link to={`/login/`}>こちら</Link></p>
                </div>
            </form>
    </>
    </>
    );
};

export default Register;