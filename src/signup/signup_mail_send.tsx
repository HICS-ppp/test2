import React from "react";
import {database} from "../firebase";
import { ref, push } from "firebase/database";
import {getAuth, isSignInWithEmailLink, sendSignInLinkToEmail, signInWithEmailLink} from "firebase/auth";
import {Link} from "react-router-dom";
import signup from "./signup";

const SendMail = () => {

    // ローカルストレージ内データのget
    localStorage.getItem('N');
    localStorage.getItem('P');
    localStorage.getItem('P2');
    localStorage.getItem('A');
    localStorage.getItem('G');
    localStorage.getItem('I');

    const UserID = localStorage.getItem('I')
    const Email = localStorage.getItem('M');
    const userName = localStorage.getItem('N');
    const Pass = localStorage.getItem('P');
    const Pass2 = localStorage.getItem('P2');
    const Age = localStorage.getItem('A');
    const Gender = localStorage.getItem('G');



    // 控えurl:'https://www.example.com/finishSignUp?cartId=1234'
    // ↓firebaseメール認証の定義処理
    const actionCodeSettings = {
        url: 'http://localhost:3000/signup_mail_send',
        handleCodeInApp: true,
    }

    const auth = getAuth();
        // @ts-ignore
    sendSignInLinkToEmail(auth, Email, actionCodeSettings)
        .then(() => {
            // @ts-ignore
            window.localStorage.setItem('emailForSignIn', Email);
        })


    if (isSignInWithEmailLink(auth, window.location.href)) {
        push(ref( database,"Users/"),{
            userID:UserID,
            username: userName,
            mailaddress:Email,
            pass:Pass,
            pass2:Pass2,
            age:Age,
            gender:Gender});
        // ローカルストレージのクリア
        window.localStorage.removeItem('I');
        window.localStorage.removeItem('N');
        window.localStorage.removeItem('P');
        window.localStorage.removeItem('P2');
        window.localStorage.removeItem('A');
        window.localStorage.removeItem('G');
        window.localStorage.removeItem('M');

        let email = window.localStorage.getItem('emailForSignIn');
        // @ts-ignore
        signInWithEmailLink(auth, email, window.location.href)
            .then((result) => {
                window.location.href = "/signup_comp"
                window.localStorage.removeItem('emailForSignIn');
    })}


    /* ↓戻るボタン押下後、ローカルストレージをクリアしサインアップ画面に遷移
    const ClickRemove = () => {
        localStorage.clear()
        window.location.href = "/login"
    }*/

    return(
        <form>
            <h1>{Email}にメールを送信しました</h1>
            <p>※メールが送信されない場合、登録画面からやり直しをお願いします</p>
            <button><Link to={`/`}>トップへ</Link></button>
        </form>
    )
};

export default SendMail;