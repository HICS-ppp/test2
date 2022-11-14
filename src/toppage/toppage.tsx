import React from "react";
import {Link} from "react-router-dom"
const Toppage = () => {
    return (
        <>
        <h1>Preport</h1>

            <Link to={`/login/`}><button>ログイン</button></Link>
        </>
    );
};
export default Toppage;