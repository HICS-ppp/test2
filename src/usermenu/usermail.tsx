import React, {useState} from "react";
import {Link} from "react-router-dom"
import "./usermail.css";
import {getAuth, sendSignInLinkToEmail} from "firebase/auth";


const Usermail = () => {

    const sessionID = sessionStorage.getItem('dbmail')
    /*console.log(sessionID)*/

    const [mail1,setmail1] = useState("");
    const [mail2,setmail2] = useState("");


    const mail = () => {

        if(mail1!==mail2){
            alert("メールアドレスが一致していません")
        }/*else if(sessionID==mail1){
            alert("現在のメールアドレスから変更してください")
       }*/else{
            const result =  window.confirm("変更内容を適用しますか?")

            if(String(result)=="true"){

                console.log(mail1)

                const actionCodeSettings = {
                    url: 'http://localhost:3000/mailchange',
                    handleCodeInApp: true,
                }
                const auth = getAuth();
                // @ts-ignore
                sendSignInLinkToEmail(auth, sessionID, actionCodeSettings)
                    .then(() => {

                        sessionStorage.setItem('a',mail1)
                    })

                alert("入力したメールアドレスに再設定メールを送信しました")
            }

        }
    }



    return (
        <>
            <form onSubmit={mail}>
            <div className="pdiv2">
                <p>現在の登録メールアドレス</p>

            </div>

            <div className="maildiv">
                <input type="email"
                       className="newmail1"
                       disabled
                       value={String(sessionID)}
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

            <button>変更</button>
           <Link to={'/usermenu/'} ><button>キャンセル</button></Link>

            </form>
        </>
    );
};
export default Usermail;