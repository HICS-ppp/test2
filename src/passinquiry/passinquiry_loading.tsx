import {ref,getDatabase, onValue} from "firebase/database"
import "./passinquiry_loading.css"
import {getAuth, sendSignInLinkToEmail, signInWithEmailLink} from "firebase/auth";

const Passinquiry_loading = () => {
    const userID = localStorage.getItem('userid');

    const db = getDatabase()
    const dbmailaddress = (ref(db, "Users/" + userID + '/mailaddress'))



    //上から順番に処理させる処理
    const pr = async () => {
        await a()
        await b()
        await c()
    }
    //取ってきた値をsnapshotから変換する処理
    const a = async () => {
        onValue(dbmailaddress, (snapshot) => {
            let aaa = snapshot.val()
            localStorage.setItem('mailaddress', aaa)
            console.log(localStorage.getItem('mailaddress'))

        })
    }
    // ５秒待機する処理
    const b = async () => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(true)
            }, 2000)
        })
    }
    const c = async () => {

        const dbID1 = localStorage.getItem('mailaddress')
        console.log(dbID1)
        try{



        }catch(e) {
            console.log("メール送信失敗")
        }
    }
    pr()

    return(
        <form>
            <p>test</p>

        </form>
    )
}

export default Passinquiry_loading;