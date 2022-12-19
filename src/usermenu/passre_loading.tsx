import {ref, getDatabase, onValue, update} from "firebase/database"
import "./passre_loading.css"
import {getAuth, sendSignInLinkToEmail, signInWithEmailLink} from "firebase/auth";
import {database} from "../firebase";
import {Link} from "react-router-dom";

const Passre_loading = () => {

  const newpass = sessionStorage.getItem('pass')
    const userID = window.sessionStorage.getItem('SessionUserID')

  console.log(newpass)
    console.log(userID)

    update(ref( database,"Users/"+userID),{
     pass:newpass,
    });

    return(
<>
    <h1>パスワードの変更が完了しました</h1>
    <Link to="/usermenu"><button className="usermenubutton">ユーザメニューへ戻る</button></Link>


</>



    )
}

export default Passre_loading;