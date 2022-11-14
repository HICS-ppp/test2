import React from "react";
import {Link} from "react-router-dom"
import './top.css';

const Toppage = () => {
    return (
        <>
        <h1>Preport</h1>

          <div className="a"> <Link to={`/login/`}><button className="log">ログイン</button></Link>
          </div>   </>
    );
};
export default Toppage;