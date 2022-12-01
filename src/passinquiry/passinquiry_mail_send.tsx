import React, {useState} from "react";
import {database} from "../firebase";
import {ref, push, getDatabase,onValue} from "firebase/database";
import {getAuth, isSignInWithEmailLink, sendSignInLinkToEmail, signInWithEmailLink} from "firebase/auth";
import {Link} from "react-router-dom";








const Passinquirymail = () => {

   const dbid = localStorage.getItem("Userid");
   const dbi = "u"

   if(dbid==dbi){
       alert("取得")

   }else{
       alert("取得できてない")
   }




    return(

        <form>
            <h1>{dbid}にメールを送信しました</h1>
            <button><Link to={`/`}>トップへ</Link></button>
        </form>

    )
};
export default Passinquirymail;




/*
    const userid = localStorage.getItem('userid');
    const [mail, setmail] = useState<any>('');

    const db = getDatabase()
    setmail(ref(db, "Users/" + userid + "/pass"))
    onValue(mail, (snapshot) => {
        let aaa = snapshot.val()
        localStorage.setItem('UserID', aaa)
    })
    const dbID = localStorage.getItem('UserID')
*/
