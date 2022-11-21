import React from "react";
import {Link} from "react-router-dom"
import './top.css';

const Toppage = () => {
    return (
        <>
        <h1 className="pre1">Preport</h1>

          <div className="a1"> <Link to={`/passinquiry/`}><button className="log1">ログイン</button></Link>
          </div>   </>
    );
};
export default Toppage;