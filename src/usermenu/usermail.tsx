import React, {useState} from "react";
import {Link} from "react-router-dom"
import "./usermail.css";
import {getAuth, sendSignInLinkToEmail} from "firebase/auth";
import Screendelete from "./screendelete";
import {ref, set} from "firebase/database";
import {database} from "../firebase";

const Usermail = () => {

    const sessionmail = sessionStorage.getItem('dbmail')
    const us = window.sessionStorage.getItem('SessionUserID')

    /*console.log(sessionID)*/

    const [mail1,setmail1] = useState("");
    const [mail2,setmail2] = useState("");


    const mail = (e:any) => {
            e.preventDefault()
        if(mail1!==mail2){
            alert("メールアドレスが一致していません")
        }else{
            const result = window.confirm("変更内容を適用しますか?")
            if(String(result)=="false"){
                alert("送信失敗")
            }else{
                console.log(mail1)

                set(ref(database,"Change/"+us+"/"),{
                    userID:us,
                    newmailaddress:mail1,});


                const actionCodeSettings = {
                    //メール内のリンク
                    url: 'http://localhost:3000/loginuser',
                    handleCodeInApp: true,
                }
                const auth = getAuth();
                // @ts-ignore
                sendSignInLinkToEmail(auth, mail1, actionCodeSettings,us)
                    .then(() => {
                        window.localStorage.setItem('a',mail1)
                        window.localStorage.setItem('userID',String(us))
                        window.location.href='/usermenu'
                    })
            }
        }




/*        if(mail1!==mail2){
            alert("メールアドレスが一致していません")
        }/!*else if(sessionID==mail1){
            alert("現在のメールアドレスから変更してください")
       }*!/else{
            const result =  window.confirm("変更内容を適用しますか?")
            if(String(result)=="true"){

                console.log(mail1)

                const actionCodeSettings = {
                    //メール内のリンク
                    url: 'http://localhost:3000/mailchange',
                    handleCodeInApp: true,
                }
                const auth = getAuth();
                // @ts-ignore
                sendSignInLinkToEmail(auth, sessionID, actionCodeSettings,)
                    .then(() => {
                        window.localStorage.setItem('a',mail1)
                        window.location.href='/screendelete'
                    })
            }
        }*/
    }


    return (
        <>
{/*
            <h1>{us}</h1>
*/}

            <form onSubmit={mail}>
                <div className="pdiv2">
                    <p className="usermailp">現在の登録メールアドレス</p>

                </div>

                <div className="maildiv">
                    <input type="email"
                           className="newmail1"
                           disabled
                           value={String(sessionmail)}
                    />
                </div>
                <div className="newmaildiv1">
                    <input type="email"
                           className="newmail2"
                           placeholder="新しいメールアドレスを入力してください"
                           onChange={(e:any) => setmail1(e.target.value)}
                           required
                    />

                </div>
                <div className="newmaildiv2">
                    <input type="email"
                           className="newmail3"
                           placeholder="再度メールアドレスを入力してください"
                           onChange={(e:any) => setmail2(e.target.value)}
                           required
                    />
                </div>



                <div className="buttondiv3">


                <div className="buttondiv4">
                    <button className="changebutton">変更</button>

                </div>
                    <div className="buttondiv5">
                        <Link to={'/usermenu/'} ><button className="cancelbutton1">キャンセル</button></Link>
                    </div>

                </div>



            </form>
        </>
    );
};
export default Usermail;