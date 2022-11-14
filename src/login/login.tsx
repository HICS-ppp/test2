import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword,onAuthStateChanged} from "firebase/auth";
import { auth } from "../firebase";
import {Navigate,Link} from "react-router-dom";
import "./login.css"

const Login = () => {

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const handleSubmit = async (e:any) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            );
        } catch(error) {
            alert("メールアドレスまたはパスワードが間違っています");
        }
    };

    const [user, setUser] = useState();
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
    });

    return (
        <>
            {/* ↓ログインしている場合、マイページにリダイレクトする設定 */}
            {user ? (
                <Navigate to={`/mainpage/`} />
            ) : (
                <>
                    {/* onSubmitを追加↓ */}
                    < form onSubmit={handleSubmit}>
                <h1>ログインページ</h1>
                    <div className="mdiv">
                        <label className="mail">メールアドレス</label>
                        <input className="mailbox"
                            name="email"
                               type="email"
                               placeholder="email"
                               value={loginEmail}
                               onChange={(e) => setLoginEmail(e.target.value)}
                        />
                    </div>

                        <div className="pdiv">
                        <label className="pass">パスワード</label>
                        <input className="passbox"
                            name="pass"
                               type="password"
                               placeholder="pass"
                               value={loginPassword}
                               onChange={(e) => setLoginPassword(e.target.value)}
                        />
                    </div>

                        <div className="div">
                            <button className="log">ログイン</button>
                        </div>


                        {/* ↓リンクを追加 */}
                       <div className="div"><p>新規登録は<Link to={`/signup/`}>こちら</Link></p></div>
                </form>
                    </>
        )}
                    </>
    );
};

export default Login;