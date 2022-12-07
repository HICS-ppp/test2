import "./groupmenu.css";
import React from "react";
import {Link} from "react-router-dom";
const groupmenu = () => {
    const groupName = sessionStorage.getItem('groupName')
    const groupID = sessionStorage.getItem('groupID')
return (
    <>
        <>
            <header className="header2">
                <label className="logo2">Preport!</label>
            </header>
            <div className="linkgroup">  <Link to={`/`}>グループ管理機能</Link></div>
            <div className="linkDocument">  <Link to={`/`}>資料管理機能</Link></div>
            <div className="linkstatistics">  <Link to={`/`}>統計機能</Link></div>
            <h2 className="live1">配信</h2>
           <div className="live2"> <Link to={`/`}><button className="livebutton">配信ルーム作成</button></Link></div>
            </>
        </>

    );
};
export default groupmenu;