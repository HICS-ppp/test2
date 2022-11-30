import React from "react";
import {database} from "../firebase";
import {ref, push, getDatabase} from "firebase/database";
import {getAuth, isSignInWithEmailLink, sendSignInLinkToEmail, signInWithEmailLink} from "firebase/auth";
import {Link} from "react-router-dom";


const Passinquirymail = () => {


    // ローカルストレージ内データのget

    const userid = localStorage.getItem('userid');


    const db = getDatabase()

/*   const mail = (ref(db, "Users/" + {userid} + '/mailaddress'))*/



    // 控えurl:'https://www.example.com/finishSignUp?cartId=1234'
    // ↓firebaseメール認証の定義処理
    const actionCodeSettings = {
        url: 'http://localhost:3000/passchange',
        handleCodeInApp: true,
    }
    const auth = getAuth();

    // @ts-ignore
   sendSignInLinkToEmail(auth, Maile, actionCodeSettings)
        .then(() => {
            // @ts-ignore
            window.localStorage.setItem('maile', maile);

        })

    return(

        <form>
            <h1>{mail}にメールを送信しました</h1>
            <button><Link to={`/`}>トップへ</Link></button>
        </form>

    )
};
export default Passinquirymail;