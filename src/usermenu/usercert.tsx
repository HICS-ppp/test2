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
            <div className="passbox2div">
                <input type="text"
                       placeholder="パスワード"
                       className="passbox2"
                       onChange={(e) => sessionStorage.setItem('pass1',e.target.value)}
                />
            </div>

                <div className="buttondiv">
<div className="buttondiv1">

            <button className="loginbutton2">ログイン</button>
</div>
                    <div className="buttondiv2">


            <Link to={'/mainpage/'} ><button className="cancelbutton">キャンセル</button></Link>
                    </div>
                </div>


</form>
        </>
    );
};
export default Usersert;