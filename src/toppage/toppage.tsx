import React from "react";
import {Link} from "react-router-dom"
import "./toppage.css";


const Toppage = () => {
    return (
        <>
            <body className="body1">

            <div className="topall">

        <h1 className="pre1">Preport!</h1>
        <h3 className="sub1">presentation support</h3>
                <Link to={`/login/`}>
                    <button>
                        <span className="btn">Login</span>
                    </button>
                </Link>

            <Link to={`/login/`}><button className="btn">ログイン</button></Link>
            </div>
            </body>
        </>

    );
};

export default Toppage;