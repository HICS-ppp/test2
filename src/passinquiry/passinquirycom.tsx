import React from "react";
import "./passinquirycom.css";
import {Link} from "react-router-dom";

const Passcomp = () => {

    return(
            <div className="passinquirydiv">
            <h1>パスワードの変更が完了しました</h1>
                <Link to="../login"><button className="passinbutton">ログインする</button></Link>
            </div>
    );
}

export default Passcomp;