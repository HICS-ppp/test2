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
            // @ts-ignore
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

                        <header className="header1">
                            <label className="logo">Preport!</label>
                        </header>

                        <h1 className="loginpage1">ログインページ</h1>


                    <div className="mdiv1">
                        {/*label→pタグに変更*/}
                        <p className="mail1">メールアドレス</p>
                        <input className="mailbox1"
                            name="email"
                               type="email"
                               placeholder="email"
                               value={loginEmail}
                               onChange={(e) => setLoginEmail(e.target.value)}
                        />
                    </div>

                        <div className="pdiv1">
                            {/*label→pタグに変更*/}
                        <p className="pass1">パスワード</p>
                        <input className="passbox1"
                            name="pass"
                               type="password"
                               placeholder="pass1"
                               value={loginPassword}
                               onChange={(e) => setLoginPassword(e.target.value)}
                        />
                    </div>

                        <div className="div">
                            <button className="log1">ログイン</button>
                        </div>


                        {/* ↓リンクを追加 */}
                       <div className="div"><p>新規登録は<Link to={`/signup/`}>こちら</Link></p></div>
                        <div className="div"><p>ゲスト登録は<Link to={`/gest/`}>こちら</Link></p></div>
                        <div className="div"><p>パスワードを忘れた場合は<Link to={`/passinquiry/`}>こちら</Link></p></div>
                </form>
                    </>
        )}
                    </>
    );
};

export default Login;