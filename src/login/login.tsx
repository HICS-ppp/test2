import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword,onAuthStateChanged} from "firebase/auth";
import { auth } from "../firebase";
import {Navigate,Link} from "react-router-dom";

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
                <Navigate to={`/`} />
            ) : (
                <>
                    <h1>ログインページ</h1>
                    {/* onSubmitを追加↓ */}
                    < form onSubmit={handleSubmit}>
                <h1>ログインページ</h1>
                    <div>
                        <label>メールアドレス</label>
                        <input name="email"
                               type="email"
                               placeholder="email"
                               value={loginEmail}
                               onChange={(e) => setLoginEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>パスワード</label>
                        <input name="pass"
                               type="password"
                               placeholder="pass"
                               value={loginPassword}
                               onChange={(e) => setLoginPassword(e.target.value)}
                        />
                    </div>
                        <button>ログイン</button>
                        {/* ↓リンクを追加 */}
                        <p>新規登録は<Link to={`/register/`}>こちら</Link></p>
                </form>
                    </>
        )}
                    </>
    );
};

export default Login;