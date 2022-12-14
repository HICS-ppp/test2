import React from "react";
import {Link} from "react-router-dom"
import "./mailchange.css";
import {ref, remove, update} from "firebase/database";
import {database} from "../firebase";


const Mailchange = () => {




    const dbID = window.localStorage.getItem("UserID")

    const newmail = window.localStorage.getItem('newmailaddress')
    const userid = window.localStorage.getItem("userid")
    console.log(newmail)
    console.log(userid)

    if(dbID==userid){
        update(ref(database, "Users/" + userid), {
            mailaddress: newmail,
        })

        remove(ref(database, "Change/" + userid))
    }else{
        remove(ref(database, "Change/" + userid))
      window.location.href = '/accounterror'

    }


    return (
        <>

            <h1> {newmail}</h1>
            <h1>メールアドレスの変更が完了しました</h1>
            <p>このタブは閉じてください</p>
           {/*<Link to="/user_loading/"><button>ユーザメニューへ戻る</button></Link>*/}
        </>
    );
};
export default Mailchange;