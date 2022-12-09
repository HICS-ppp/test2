import React from "react";
import {Link} from "react-router-dom"
import "./usercert.css";
import {getDatabase, ref} from "firebase/database";

const Usersert = () => {

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        window.location.href = "/user_loading"
    }

    return (
        <>
            <form onSubmit={handleSubmit}>

            <h1>再度認証を行ってください</h1>
            <div className="passbox2">
                <input type="text"
                       placeholder="パスワード"
                       onChange={(e) => sessionStorage.setItem('pass1',e.target.value)}
                />
            </div>

            <button className="loginbutton">ログイン</button>
            <Link to={'/mainpage/'} ><button className="loginbutton">キャンセル</button></Link>
</form>
        </>
    );
};
export default Usersert;