import React, {useState, useEffect} from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.js";
import {Navigate,Link} from "react-router-dom";

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
            <form onSubmit={handleSubmit}>
                <div>
                    <label>メールアドレス</label>
                    <input name="email"
                           type="email"
                           placeholder="email"
                        /* ↓「value」と「onChange」を追加 */
                           value={registerEmail}
                           onChange={(e) => setRegisterEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>ユーザ名</label>
                    <input name="username"
                           type="text"
                           placeholder="username"
                    />
                </div>
                <div>
                    <label>パスワード</label>
                    <input name="pass"
                           type="password"
                           placeholder="pass"
                        /* ↓「value」と「onChange」を追加 */
                           value={registerPassword}
                           onChange={(e) => setRegisterPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label>再パスワード</label>
                    <input name="pass2"
                           type="password"
                           placeholder="pass2" />
                </div>
                <div>
                    <label>年齢</label>
                    <input name="age"
                           type="number"
                           min="0" max="100"/>
                </div>
                <div>
                    <label>性別</label>
                    <input name="gender" type="radio" value="男" />
                    <input name="gender" type="radio" value="女"/>
                </div>
                    <button>登録</button>
                {/* ↓リンクを追加 */}
                <p>ログインは<Link to={`./login/`}>こちら</Link></p>
            </form>
    </>
    )}
            </>
    );
};

export default Register;