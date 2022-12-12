import React from "react";
import {Link} from "react-router-dom"
import "./toppage.css";


const Toppage = () => {
    return (
        <>
            <body className="body1">
            <div className="btndiv">
                <Link to={`/login/`}>
                    <span className="btn">Preport!</span>
                </Link>
            </div>

            <div className="sub1div">
                <h3 className="sub1">presentation support</h3>

            </div>


            </body>
        </>

    );
};

export default Toppage;