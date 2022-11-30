import React, {useState, useEffect} from "react";
import {
    createUserWithEmailAndPassword,
    isSignInWithEmailLink,
    onAuthStateChanged,
    signInWithEmailLink
} from "firebase/auth";
import {auth, database} from "../firebase.js";
import {Navigate,Link} from "react-router-dom";
import "./passchange.css";
import {update, get, ref, push} from "firebase/database";
import firebase from "firebase/compat";


const Passchange = () => {


    const maile = window.localStorage.getItem("maile");

    const [pass,setPass] = useState("");
    const [pass2,setPass2] = useState("");
    
   const passhi = (e:any) => {

    e.preventDefault();
    if (pass !== pass2) {
        alert("パスワードが一致しません")
    } else {
        update(ref( database,"Users/"+{maile}),{
            pass:pass,
        });
         window.location.href="/passchangecom"
    }
}
    // @ts-ignore
    return (
        <>
            <>
                <header className="header1">
                    <label className="logo">Preport!</label>
                </header>

                <form onSubmit = {passhi}>

                    <div className="passdiv1">
                        <input  required
                                type="text"
                                className="newpass"
                                placeholder="新しいパスワードを入力してください"
                                onChange={(e:any) => setPass(e.target.value)}/>
                    </div>

                <div className="passdiv1">
                <input  required
                    type="text"
                       className="newpass2"
                       placeholder="再度パスワードを入力してください"
                        onChange={(e:any) => setPass2(e.target.value)}/>
                </div>

                <div className="passdiv2">
                    <button className="change">変更</button>
                </div>

          {/*          <p>{maile}</p>*/}

                </form>

            </>
            </>

    );
};
export default Passchange;
