import React, { useState } from 'react';
import {Link} from "react-router-dom";
import "./usermenu.css";
import {getDatabase, onValue, ref} from "firebase/database";


const Usermenu = () => {

    const sessionID = window.sessionStorage.getItem('SessionUserID')
    //Realtime Databaseから値を取ってくる処理

    console.log(sessionID)
    console.log(sessionStorage.getItem('dbmail'))



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

            <div className="table1div">



            <table className="table1">
                <thead>
                <tr>
                    <th>グループID</th>
                    <th>グループ名</th>
                    <th>作者名</th>
                    <th>加入日</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>aa</td>
                    <td>aa</td>
                    <td>aa</td>
                    <td>aa</td>
                    <td>aa</td>

                </tr>
                <tr>
                    <td>ss</td>
                    <td>ss</td>
                    <td>ss</td>
                    <td>ss</td>
                    <td>ss</td>
                </tr>

                <tr>
                    <td>ss</td>
                    <td>ss</td>
                    <td>ss</td>
                    <td>ss</td>
                    <td>ss</td>
                </tr>
                </tbody>
            </table>
            </div>



            <p>通知</p>

            <table className="table2">
                <thead>
                <tr>
                    <th>グループID</th>
                    <th>グループ名</th>
                    <th>通知</th>
                    <th>通知日時</th>

                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>aa</td>
                    <td>aa</td>
                    <td>aa</td>
                    <td>aa</td>
                    <td>aa</td>

                </tr>
                <tr>
                    <td>ss</td>
                    <td>ss</td>
                    <td>ss</td>
                    <td>ss</td>
                    <td>ss</td>
                </tr>

                <tr>
                    <td>ss</td>
                    <td>ss</td>
                    <td>ss</td>
                    <td>ss</td>
                    <td>ss</td>
                </tr>
                </tbody>
            </table>
            <p>アンケート回答履歴</p>

            <table className="table2">
                <thead>
                <tr>
                    <th>アンケート名</th>
                    <th>回答日</th>

                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>aa</td>
                    <td>aa</td>


                </tr>
                <tr>
                    <td>ss</td>
                    <td>ss</td>

                </tr>

                <tr>
                    <td>ss</td>
                    <td>ss</td>

                </tr>
                </tbody>
            </table>


            <Link to={'/mainpage/'}><button>メインページに戻る</button></Link>

        </>
    );
};
export default Usermenu;