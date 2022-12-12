import React, { useState } from 'react';
import {Link} from "react-router-dom";
import "./usermenu.css";
import {getDatabase, onValue, ref} from "firebase/database";


const Usermenu = () => {


        const sessionmail = sessionStorage.getItem('dbmail')
        console.log(sessionmail)


    return (
        <>
            <h1>ユーザ情報</h1>
            <p>登録メールアドレス</p>
            <input type="text"　
                   className="mailbox"
                   disabled
            value={String(sessionmail)}/>


            <div className="maildiv">
           <Link to='/usermail/'><button>メールアドレス再設定</button></Link>
            </div>


            <p>パスワード</p>
           <Link to="/passresetting/"><button>パスワード再設定</button></Link>

            <p>所属グループ</p>

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