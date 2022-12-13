import React from "react";
import {Link} from "react-router-dom"



const Loginerror = () => {
    return (
        <>
            <div className="errorall">
                <h1 className="toph1">UserIDまたはパスワードが間違っています</h1>
                <p>メールアドレスの再設定をやり直してください</p>

            </div>
        </>
    );
};

export default Loginerror;