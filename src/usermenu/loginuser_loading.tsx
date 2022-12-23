import {ref, getDatabase, onValue, remove, set} from "firebase/database"
import {database} from "../firebase";

const Loginuser_loading = () => {

    const userID = localStorage.getItem('loginID');
    const userPass = localStorage.getItem('loginPass');
    //Realtime Databaseから値を取ってくる処理
    const db = getDatabase()
    const dbID = (ref(db, "Users/" + userID + '/userID'))
    const dbpass = (ref(db, "Users/" + userID + '/pass'))
    const changeID = (ref(db, "Change/" + userID + '/userID'))
    const mailaddress = (ref(db, "Change/" + userID + '/newmailaddress'))


    //上から順番に処理させる処理
    const pr = async () => {
        await a()
        await b()
        await c()
    }
    //取ってきた値をsnapshotから変換する処理
    const a = async () => {
        onValue(dbID, (snapshot) => {
            let a = snapshot.val()
            localStorage.setItem('UserID', a)
            console.log(localStorage.getItem('UserID'))
        })
        onValue(dbpass, (snapshot) => {
            let b = snapshot.val();
            localStorage.setItem('UserPass', b)
            console.log(localStorage.getItem('UserPass'))
        })
        onValue(changeID, (snapshot) => {
            let c = snapshot.val();
            localStorage.setItem('userid', c)
            console.log(localStorage.getItem('userid'))
        })
        onValue(mailaddress, (snapshot) => {
            let d = snapshot.val();
            localStorage.setItem('newmailaddress', d)
            console.log(localStorage.getItem('newmailaddress'))
        })




    }
    // ５秒待機する処理
    const b = async () => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(true)
            }, 3000)
        })
    }

    //ユーザ情報を比較して、ログイン判断処理
    const c = async () => {
        const dbID1 = localStorage.getItem('UserID')
        const dbPass1 = localStorage.getItem('UserPass')
        console.log(dbID1)
        if (userID == dbID1 && userPass == dbPass1) {


            window.location.href = '/mailchange'

        } else {
            window.location.href = '/loginusererror'
        }
    }
    pr()

    return(
        <form>

            <div className="loader">
                <div className="one"></div>
                <div className="two"></div>
                <div className="three"></div>
                <div className="four"></div>
            </div>
        </form>
    )
}

export default Loginuser_loading;