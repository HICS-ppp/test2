import {ref,getDatabase, onValue} from "firebase/database"
import {useState} from "react";
import {Simulate} from "react-dom/test-utils";
import load = Simulate.load;

const Loginloading = () => {
        const userID = localStorage.getItem('loginID');
        const userPass = localStorage.getItem('loginPass');

        const [dbID1, setdbID1] = useState<any>('');
        const [dbpass1, setdbpass1] = useState<any>('');
        const [dbEmail1, setdbEmail1] = useState<any>('');



            //Realtime Databaseから値を取ってくる処理
            const db = getDatabase()
            setdbpass1(ref(db, "Users/" + userID + '/pass'))
            setdbID1(ref(db, "Users/" + userID + '/userID'))
            setdbEmail1(ref(db, "Users/" + userID + '/mailaddress'))

//上から順番に処理させる処理
            const pr = async () => {
                await a()
                await b()
                await c()
            }

            //取ってきた値をsnapshotから変換する処理
            const a = async () => {
                onValue(dbID1, (snapshot) => {
                    let aaa = snapshot.val()
                    localStorage.setItem('UserID', aaa)
                })
                onValue(dbpass1, (snapshot) => {
                    let bbb = snapshot.val();
                    localStorage.setItem('UserPass', bbb)
                })
                onValue(dbEmail1, (snapshot) => {
                    let ccc = snapshot.val()
                    localStorage.setItem('UserEmail', ccc)
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
                const dbID = localStorage.getItem('UserID')
                const dbPass = localStorage.getItem('UserPass')
                const dbEmail = localStorage.getItem('UserEmail')

                if (userID == dbID && userPass == dbPass) {
                    window.location.href = '/mainpage'
                } else {
                    console.log('失敗')
                    localStorage.clear()
                    const logError = 'error'
                    localStorage.setItem("error",logError)
                    window.location.href = '/login'
                }
            }
            pr()

    return(
        <form>
        <p>test</p>
        </form>
    )
}

export default Loginloading