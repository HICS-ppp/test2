import {ref,getDatabase, onValue} from "firebase/database"

const Loginloading = () => {
        const userID = localStorage.getItem('loginID');
        const userPass = localStorage.getItem('loginPass');
        //Realtime Databaseから値を取ってくる処理
        const db = getDatabase()
        const dbID = (ref(db, "Users/" + userID + '/userID'))
        const dbpass = (ref(db, "Users/" + userID + '/pass'))

            //上から順番に処理させる処理
                const pr = async () => {
                    await a()
                    await b()
                    await c()
                }
            //取ってきた値をsnapshotから変換する処理
    const a = async () => {
        onValue(dbID, (snapshot) => {
            let aaa = snapshot.val()
            localStorage.setItem('UserID', aaa)
            console.log(localStorage.getItem('UserID'))
        })
        onValue(dbpass, (snapshot) => {
            let bbb = snapshot.val();
            localStorage.setItem('UserPass', bbb)
            console.log(localStorage.getItem('UserPass'))
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

            //ユーザ情報を比較して、ログイン判断処理
            const c = async () => {
                const dbID1 = localStorage.getItem('UserID')
                const dbPass1 = localStorage.getItem('UserPass')
                console.log(dbID1)
                if (userID == dbID1 && userPass == dbPass1) {
                    window.sessionStorage.setItem('SessionUserID',String(dbID))
                    localStorage.clear()
                    window.location.href = '/mainpage'
                } else {
        /*            console.log('失敗')
                    localStorage.clear()
                    const logError = 'error'
                    localStorage.setItem("error",logError)*/
                    window.location.href = '/loginerror'
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

export default Loginloading