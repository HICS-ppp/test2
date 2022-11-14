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

            <h1>ユーザ登録</h1>

             <div className="userall">
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="mail">メールアドレス</label>
                    <input  className="mailbox"
                        name="email"
                           type="email"
                           placeholder="email"
                        /* ↓「value」と「onChange」を追加 */
                           value={registerEmail}
                           onChange={(e) => setRegisterEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label className="user">ユーザ名</label>
                    <input className="userbox"
                        name="username"
                           type="text"
                           placeholder="username"
                    />
                </div>

                <div>
                    <label className="pass1">パスワード</label>
                    <input className="passbox1"
                        name="pass"
                           type="password"
                           placeholder="pass"
                        /* ↓「value」と「onChange」を追加 */
                           value={registerPassword}
                           onChange={(e) => setRegisterPassword(e.target.value)}
                    />
                </div>

                <div>
                    <label className="password">再パスワード</label>
                    <input className="passwordbox"
                        name="pass2"
                           type="password"
                           placeholder="pass2" />
                </div>

                <div>
                    <label className="age">年齢</label>
                    <input className="agebox"
                        name="age"
                           type="number"
                           min="0" max="100"/>
                </div>

                <div>
                    <label className="gender">性別</label>
                    <input className="gen" name="gender" type="radio" value="男" />男
                    <input className="gen" name="gender" type="radio" value="女"/>女
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