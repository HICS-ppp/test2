import React, { useState } from 'react';
import {Link} from "react-router-dom";
import "./usermenu.css";
import {getDatabase, onValue, ref} from "firebase/database";
import {isBooleanObject, isNumberObject} from "util/types";

const Usermenu = () => {

    const sessionID = window.sessionStorage.getItem('SessionUserID')
    //Realtime Databaseから値を取ってくる処理

    console.log(sessionID)
    console.log(sessionStorage.getItem('dbmail'))

   const len = sessionStorage.getItem('len')

    const db = getDatabase()
    const dbmailaddress = (ref(db, "Users/" + sessionID + '/mailaddress'))

    console.log(dbmailaddress)

    //取ってきた値をsnapshotから変換する処理
        onValue(dbmailaddress, (snapshot) => {
            let aaa = snapshot.val()
            sessionStorage.setItem('dbmail', aaa)
        })

    const sessionmail = String(sessionStorage.getItem('dbmail'))

    console.log(sessionmail)
   /* const user = window.sessionStorage.getItem('SessionUserID')*/

    return (
        <>
            <div className="userdiv">
            <h1 className="userh1">ユーザ情報</h1>
            </div>
            <p className="userp">登録メールアドレス</p>
            <div className="mailboxdiv">

            <input type="text"　
                   className="mailbox"
                   disabled
                 value= {sessionmail}
                />
            </div>

            <div className="maildiv1">
           <Link to='/usermail/'><button className="mailbutton1">メールアドレス再設定</button></Link>
            </div>

            <p className="userp">パスワード</p>
            <div className="maildiv1">
           <Link to="/passresetting/"><button　className="mailbutton1">パスワード再設定</button></Link>
            </div>
            <p className="userp">所属グループ</p>

            {(() => {
                const items = [];
                for (let i = 1; i < Number(len); i++) {
                    items.push(<tr><td>{sessionStorage.getItem('groupID'+i)}</td>
                        <td>{sessionStorage.getItem('groupName'+i)}</td>
                        <td>{sessionStorage.getItem('createUser'+i)}</td>
                        <td>{sessionStorage.getItem('joinTime'+i)}</td></tr>)
                }
                return<div className="table2div" >
                    <table className="table2">
                    <thead>
                    <tr>
                        <th>グループID</th>
                        <th>グループ名</th>
                        <th>作者名</th>
                        <th>加入日</th>
                    </tr>
                 {/*   //for文を使ってループ処理させる*/}
                    {items[0]}
                    {items[1]}
                    {items[2]}
                    {items[3]}
                    {items[4]}
                    {items[5]}
                    {items[6]}
                    {items[7]}
                    {items[8]}
                    {items[9]}
                    {items[10]}
                    </thead>
                    </table></div>;
            })()}
            <Link to={'/mainpage/'}><button>メインページに戻る</button></Link>
        </>
    );
};
export default Usermenu;