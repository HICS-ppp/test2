import React from "react";
import {Link} from "react-router-dom"
import "./toppage.css";


const Toppage = () => {
    return (
        <>
            <body className="body1">



                <Link to={`/login/`}>

                        <span className="btn">Preport!</span>

                </Link>
                <h3 className="sub1">presentation support</h3>



            </body>
        </>

    );
};

export default Toppage;