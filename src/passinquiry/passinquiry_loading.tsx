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
            }, 5000)
        })
    }
    const c = async () => {

        const dbID1 = localStorage.getItem('mailaddress')
        console.log(dbID1)

        if(dbID1==null) {


            try {
                // 控えurl:'https://www.example.com/finishSignUp?cartId=1234'
                // ↓firebaseメール認証の定義処理
                const actionCodeSettings = {
                    url: 'http://localhost:3000/passchange',
                    handleCodeInApp: true,
                }
                const auth = getAuth();
                // @ts-ignore
                sendSignInLinkToEmail(auth, dbID1, actionCodeSettings)
                    .then(() => {
                        // @ts-ignore
                        window.localStorage.setItem('userID', userID);
                        window.location.href = '/passinquiry_mail_send'
                    })
            } catch (e) {
                console.log("メール送信失敗")

            }
        }else{
            window.location.href = '/passerror'
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

export default Passinquiry_loading;