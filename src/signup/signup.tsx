import React, {useState, useEffect} from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.js";
import {Navigate,Link} from "react-router-dom";
import "./signup.css"

const Register = () => {
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
            {user ? (
                <Navigate to={`/`} />
            ) : (
                <>


<header className="header1">

    <label className="logo">Preport!</label>
</header>

                    <div className="center">


            <h1>ユーザ登録</h1>


            <form onSubmit={handleSubmit}>
                <div>
                    <label className="userinput">メールアドレス</label>

                    <input  className="mailbox2"
                        name="email"
                           type="email"
                           placeholder="email"
                        /* ↓「value」と「onChange」を追加 */
                           value={registerEmail}
                           onChange={(e) => setRegisterEmail(e.target.value)}
                    />

                </div>

                <div>
                    <label className="userinput">ユーザ名</label>
                    <input className="userbox1"
                        name="username"
                           type="text"
                           placeholder="username"
                    />
                </div>

                <div>
                    <label className="userinput">パスワード</label>
                    <input className="passbox2"
                        name="pass"
                           type="password"
                           placeholder="pass"
                        /* ↓「value」と「onChange」を追加 */
                           value={registerPassword}
                           onChange={(e) => setRegisterPassword(e.target.value)}
                    />
                </div>

                <div>
                    <label className="userinput">再パスワード</label>
                    <input className="passwordbox1"
                        name="pass2"
                           type="password"
                           placeholder="pass2" />
                </div>

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
                {/* ↓リンクを追加 */}
                <p>ログインは<Link to={`./login/`}>こちら</Link></p>
            </form>
                    </div>
    </>


    )}
            </>
    );
};
export default Register;