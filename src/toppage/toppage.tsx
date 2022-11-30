import React from "react";
import {Link} from "react-router-dom"
import "./toppage.css";


const Toppage = () => {
    return (
        <>
            <div className="topall">


        <h1 className="pre1">Preport</h1>

            <Link to={`/login/`}><button className="log1">ログイン</button></Link>
            </div>
        </>
    );
};

export default Toppage;