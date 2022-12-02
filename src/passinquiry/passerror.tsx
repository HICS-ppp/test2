import React from "react";
import {Link} from "react-router-dom"
import "./passerror.css";


const Passerror = () => {
    return (
        <>
            <div className="errorall">
                <h1 className="toph1">入力されたUserIDは登録されていません</h1>

                <Link to={`/`}><button className="top1">トップページへ戻る</button></Link>
            </div>
        </>
    );
};

export default Passerror;