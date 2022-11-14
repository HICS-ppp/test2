/* 「useState」と「useEffect」をimport↓ */
import React, { useState, useEffect } from "react";
/* 「onAuthStateChanged」と「auth」をimport↓ */
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate,Navigate } from "react-router-dom";

const Mainpage = () => {
    /* ↓state変数「user」を定義 */
    const [user, setUser] = useState("");

    /* ↓ログインしているかどうかを判定する */
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
    }, []);

    const navigate = useNavigate();

    /* ↓関数「logout」を定義 */
    const logout = async () => {
        await signOut(auth);
        navigate("../login/login");
    }

    return (
            <>
                {/* ↓ログインしていない場合はログインページにリダイレクトする設定 */}
                {!user ? (
                    <Navigate to={`/login/`} />
                ) : (
                    <>
            <h1>Preport!</h1>
            <button onClick={logout}>ログアウト</button>
        </>
                        )}
                    </>
    );
};

export default Mainpage;