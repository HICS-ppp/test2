import React from "react";
import {Link} from "react-router-dom"
import "./mailchange.css";
import {ref, update} from "firebase/database";
import {database} from "../firebase";


const Mailchange = () => {


    const newmail = window.localStorage.getItem('a')
    const userid = window.localStorage.getItem("userID")
    console.log(newmail)
    console.log(userid)

    update(ref( database,"Users/"+userid),{
        mailaddress:newmail,
    });


    return (
        <>

            <h1> {newmail}</h1>
            <h1>メールアドレスの変更が完了しました</h1>
           <Link to="/user_loading/"><button>ユーザメニューへ戻る</button></Link>
        </>
    );
};
export default Mailchange;