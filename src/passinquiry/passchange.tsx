import React, {useState, useEffect} from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.js";
import {Navigate,Link} from "react-router-dom";
import "./passchange.css";


const Passchange = () => {

    const [pass,setPass] = useState("");
    const [pass2,setPass2] = useState("");

const changePass1 = (e:any) => {
    setPass(e.target.value);
}
    const changePass2 = (e:any) =>{
        setPass2(e.target.value);

    }



const passhi = (e:any) => {

    e.preventDefault();
        if(pass!==pass2) {
            alert("パスワードが一致しません")
        }else{
        window.location.href="/passchangecom"
}

}

    return (
        <>
            {/* ↓ログインしていればマイページを表示 */}

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
                        onChange={(e:any) => setPass(e.target.value)}
                />
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

                </form>

            </>
            </>

    );
};
export default Passchange;
