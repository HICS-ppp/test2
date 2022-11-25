import React from "react";
import {database} from "../firebase";
import { ref, push } from "firebase/database";
import {getAuth, isSignInWithEmailLink, sendSignInLinkToEmail, signInWithEmailLink} from "firebase/auth";
import {Link} from "react-router-dom";


const Passinquirymail = () => {


    // ローカルストレージ内データのget
    localStorage.getItem('E');
    const Maile = localStorage.getItem('E');

/*
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

        // ローカルストレージのクリア
        window.localStorage.removeItem('E');

        let email = window.localStorage.getItem('emailForSignIn');
        // @ts-ignore
        signInWithEmailLink(auth, email, window.location.href)
            .then((result) => {
                window.location.href = "/signup_comp"
                window.localStorage.removeItem('emailForSignIn');
            })*/


    return(

        <form>
            <h1>{Maile}にメールを送信しました</h1>
            <button><Link to={`/`}>トップへ</Link></button>
        </form>

    )
};

export default Passinquirymail;