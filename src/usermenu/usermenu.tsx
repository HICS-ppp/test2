import React, {useState, useEffect} from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.js";
import {Navigate,Link} from "react-router-dom";
import "./usermenu.css"


const Usermenu = () => {

    return (
        <>

            <>
            <header className="header1">
                <label className="logo">Preport!</label>

            </header>
                <h1 className="userinfo">ユーザ情報</h1>
                <div className="mailaddiv">
                    <label className="mailad">登録メールアドレス</label>

                </div>



                <div className="mailbox3">
                <input type="text"
                       className="mailadtext"
                       /*データベースから取得*/
                       value="206042@std.hi-joho.ac.jp"
                       disabled/>
                </div>


                <div className="mailchangediv">
                <button className="mailchange">メールアドレス再設定</button>
                </div>
<div className="passdiv">
    <label className="pass3">
        パスワード
    </label>
</div>

                <div className="passchangediv">
                <button className="passchange">パスワード再設定</button>
                </div>


                <div className="groupdiv">
                <label className="group">所属グループ</label>
                </div>



                <div className="tablediv">
                <table className="table"border="1">
                    <tr>
                        <th>グループID</th>
                        <th>グループ名</th>
                        <th>作成者名</th>
                        <th>加入日</th>
                        <th>操作</th>
                    </tr>
                    {/*データベースからデータ取得*/}
                    <tr>
                        <td>i1000</td>
                        <td>サンプル</td>
                        <td>上田</td>
                        <td>2019/9/12</td>
                        <td><button className="withdrawal">脱退</button></td>
                    </tr>
                    <tr>
                        <td>l3002</td>
                        <td>サンプル</td>
                        <td>上田</td>
                        <td>2020/10/23</td>
                        <td><button className="withdrawal">脱退</button></td>
                    </tr>

                </table>
                </div>

                <div className="notificationdiv">
                    <label className="notification">通知</label>
                </div>

                <div className="tablediv">
                    <table className="table" border="1">
                        <tr>
                            <th>グループID</th>
                            <th>グループ名</th>
                            <th>通知</th>
                            <th>通知日時</th>
                        </tr>
                        {/*データベースからデータ取得*/}
                        <tr>
                            <td>i1000</td>
                            <td>サンプル</td>
                            <td>質問が来ています</td>
                            <td>2019/9/12</td>
                        </tr>
                        <tr>
                            <td>l3002</td>
                            <td>サンプル</td>
                            <td>コメントがついています</td>
                            <td>2020/10/23</td>
                        </tr>

                    </table>
                </div>

                <div className="ankeanswerdiv">
                    <label className="ankeanswer">アンケート回答履歴</label>
                </div>

                <div className="tablediv">
                <table className="table"border="1">
                    <tr>
                        <th>アンケート名</th>
                        <th>回答日</th>

                    </tr>
                    {/*データベースからデータ取得*/}
                    <tr>
                        <td>サンプル</td>
                        <td>2021/2/14</td>

                    </tr>
                    <tr>
                        <td>サンプル</td>
                        <td>2021/6/4</td>

                    </tr>

                </table>
            </div>


            </>
            </>
    );
};

export default Usermenu;