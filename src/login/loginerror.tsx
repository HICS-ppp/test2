import React from "react";
import {Link} from "react-router-dom"
import "./loginerror.css";


const Loginerror = () => {
    return (
        <>
            <div className="errorall">
                <h1 className="toph1">UserIDまたはパスワードが間違っています</h1>

                <Link to={`/`}><button className="top1">トップページへ戻る</button></Link>
            </div>
        </>
    );
};

export default Loginerror;