import {
    getDatabase, ref, onValue, update, remove, query,
    onChildAdded, orderByChild, equalTo,
} from "firebase/database";
import {database} from "../firebase";
import "./group_manage.css"
import {useModal} from "react-hooks-use-modal";


const Group_manage = () => {
    const db = getDatabase()
    const GroupID = sessionStorage.getItem('groupID')
    const GroupName = sessionStorage.getItem('groupName')
    const searchCreateUser = (ref(db, "Groups/" + GroupID + '/createUser'))
    const UserCount = (query(ref(db, 'Groups_Member/' + GroupID + '/User')))
    const RequestUserCount = (query(ref(db,'Groups_Member/' + GroupID + '/joinRequest')))
    const [Modal, open, close] = useModal()　//モーダルのAPIを使用
    const dateObj = new Date()
    // 時間取得
    const joinTime = String(dateObj.getFullYear()  +'/'+ (dateObj.getMonth()+1)+'/'
            + dateObj.getDate() +' '+ dateObj.getHours() + ':'
            + dateObj.getMinutes() +':'+ dateObj.getSeconds())
    let NameList: any = [];
    let NameList2:any = [];
    let RequestList: any = [];
    let RequestList2: any = [];


        //メンバーの数をカウント
    onValue(UserCount, (snapshot => {
        let count = Object.keys(snapshot.val()).length;
        sessionStorage.setItem('UserCount', String(count))
    }))
        //グループ参加リクエストの数をカウント
    onValue(RequestUserCount,snapshot => {
        let count = Object.keys(snapshot.val()).length;
        sessionStorage.setItem('RequestUserCount',String(count))
    })
        //グループ制作者の取得
    onValue(searchCreateUser, (snapshot => {
        const createUser = snapshot.val()
        sessionStorage.setItem('groupCreateUser', createUser)
    }))



        // グループ削除処理
    const Group_delete = async () => {
        const check = window.prompt('「'+GroupID + '」を削除します。\nグループIDを入力してください')
        if(check == GroupID) {
            const lastCheck = window.confirm('グループを削除します本当によろしいですか？')
            if(lastCheck == true) {
                update(ref( database,"Groups/"+GroupID),{
                    createTime:null,
                    createUser:null,
                    groupID:null,
                    groupName:null
                });
                remove(ref(database,"Groups_Member/" + GroupID))
                sessionStorage.removeItem('groupID')
                sessionStorage.removeItem('groupName')
                window.location.href = './mainpage'
                alert('グループを削除しました')
            }}
    }


            //メンバー削除処理
    const Member_banish = async (e:any) => {
        //console.log(e.currentTarget.id)
        let UserID = e.currentTarget.id
        const check = window.confirm('このユーザをグループから本当に追放しますか？')
        if(check == true) {
            //nullを値に入れることでも削除できる
            update(ref(database,"Groups_Member/" + GroupID + "/User/" + UserID), {
              joinTime:null,
              number:null,
              role:null,
              username:null
            })
            //removeを使う事でも削除できる
            remove(ref(database,"Groups_Data/" + UserID + '/' + GroupID))
            alert(`該当ユーザを削除しました`)
            window.location.reload()
        }else{
         alert('該当のユーザのデータを受け取れませんでした。\nもう一度お試しください')
        }
    }


        //ロール変更処理
    const role_change = async (e:any) => {
        let UserID = e.currentTarget.id
        let UserDiv = e.currentTarget.name
        //console.log(UserID)
        //console.log(UserDiv)
        let str:any = document.getElementById(UserDiv)
        //console.log(str.value)
        update(ref(database,"Groups_Member/" + GroupID + "/User/" + UserID),{
            role:str.value
        })
        alert(UserID + 'のロールを変更しました')
    }


        //リクエスト承認処理
    const RequestAccept = (e:any) => {
        let Num = Number(sessionStorage.getItem('UserCount'))
        let RequestID = e.currentTarget.id
        let RequestName = e.currentTarget.name
        const Acheck = window.confirm('このユーザからのリクエストを承諾しますか？')
        if(Acheck == true) {
            update(ref(database,"Groups_Member/" + GroupID + "/User/" + RequestID),{
                role:3,
                username:RequestName,
                joinTime:joinTime,
                number:Num + 1
            })
            remove(ref(database,"Groups_Member/" + GroupID + '/joinRequest/' + RequestID))
            alert(RequestID + 'をグループに追加しました')
            window.location.reload()
        }
        //グループ参加リクエストの数を再度取得
        const RequestUserCount_Accept = (query(ref(db,'Groups_Member/' + GroupID + '/joinRequest')))
        onValue(RequestUserCount_Accept,snapshot => {
            let count = Object.keys(snapshot.val()).length;
            sessionStorage.setItem('RequestUserCount_Accept',String(count))
        })

        let Ac = Number(sessionStorage.getItem('RequestUserCount_Accept'))
        for(let a = 1; a <= Ac;a++) {
            const RequestUserCount2 = (query(ref(db,'Groups_Member/' + GroupID + '/joinRequest/')
                , orderByChild('number'), equalTo(a + 1)))
            onChildAdded(RequestUserCount2, (snapshot => {
                let RequestUser_Accept = snapshot.key
                console.log(RequestUser_Accept)
                sessionStorage.setItem('Request_Accept' + a,String(RequestUser_Accept))
            }))
        }
        //joinRequestの新しいナンバーを付与
        for(let Zc = 1; Zc <= Ac; Zc++){
            let Ruser_Accept:any = sessionStorage.getItem('Request_Accept' + Zc)
            console.log(Ruser_Accept)
            update(ref(database,"Groups_Member/" + GroupID + "/joinRequest/" + Ruser_Accept),{
                number:Zc
            })
        }
        window.location.reload()
    }




        //リクエスト拒否処理
    const RequestReject = (e:any) => {
        //remove処理
        let RequestID = e.currentTarget.id
        const Rcheck = window.confirm('このユーザからのリクエストを拒否しますか？')
        if(Rcheck == true) {
            remove(ref(database,"Groups_Member/" + GroupID + '/joinRequest/' + RequestID))
            alert(RequestID + 'の参加リクエストを拒否しました')
            window.location.reload()
        }
        //グループ参加リクエストの数を再度取得
        const RequestUserCount_Reject = (query(ref(db,'Groups_Member/' + GroupID + '/joinRequest')))
        onValue(RequestUserCount_Reject,snapshot => {
            let count = Object.keys(snapshot.val()).length;
            sessionStorage.setItem('RequestUserCount_Reject',String(count))
        })

        let Rj = Number(sessionStorage.getItem('RequestUserCount_Reject'))
        for(let RR = 1; RR <= Rj;RR++) {
            const RequestUserCount2 = (query(ref(db,'Groups_Member/' + GroupID + '/joinRequest/')
                , orderByChild('number'), equalTo(RR + 1)))
            onChildAdded(RequestUserCount2, (snapshot => {
                let RequestUser_Reject = snapshot.key
                console.log(RequestUser_Reject)
                sessionStorage.setItem('Request_Reject' + RR,String(RequestUser_Reject))
            }))
        }
        //joinRequestの新しいナンバーを付与
        for(let Rc = 1; Rc <= Rj; Rc++){
            let Ruser_Reject:any = sessionStorage.getItem('Request_Reject' + Rc)
            //console.log(Ruser_Reject)
            update(ref(database,"Groups_Member/" + GroupID + "/joinRequest/" + Ruser_Reject),{
                number:Rc
            })
        }
        window.location.reload()
    }




        //参加リクエスト取得処理
    let r = Number(sessionStorage.getItem('RequestUserCount'))
    for(let q = 1; q <= r;q++) {
        const RequestUserCount2 = (query(ref(db,'Groups_Member/' + GroupID + '/joinRequest/')
            , orderByChild('number'), equalTo(q)))
        onChildAdded(RequestUserCount2, (snapshot => {
            let RequestUser = snapshot.key
            //console.log(RequestUser)
            sessionStorage.setItem('Request' + q,String(RequestUser))
        }))
    }

    for(let z = 1; z <= r; z++){
        let Ruser:any = sessionStorage.getItem('Request' + z)
        //console.log(Ruser)
        const RequestUserList = (query(ref(db,'Groups_Member/' + GroupID + '/joinRequest/' + Ruser)))
            onValue(RequestUserList,(snapshot => {
                let RequestUser = snapshot.val()
                //console.log(RequestUser)
                RequestList.name = RequestUser.username
                RequestList2.push(<tr key={Ruser}><td>参加リクエスト</td><td>{Ruser}</td><td>{RequestList.name}</td>
                <td><button onClick={RequestAccept} id={Ruser} name={RequestList.name}>承諾</button>
                    <button onClick={RequestReject} id={Ruser}>拒否</button></td>
            </tr>)
        }))
    }



        //メンバー取得処理
    let j = Number(sessionStorage.getItem('UserCount'))
    for (let i = 1; i <= j; i++) {
        const GroupUserList2 = (query(ref(db, 'Groups_Member/' + GroupID + '/User/')
            , orderByChild('number'), equalTo(i)))
        onChildAdded(GroupUserList2, (snapshot => {
            let user = snapshot.key
            //console.log(test)
            sessionStorage.setItem('Member' + i, String(user))
        }))
    }

            //listにメンバー情報、ボタンなどを追加,表示
    for (let s = 1; s <= j; s++) {
        let user:any = sessionStorage.getItem('Member' + s)
        let createUser = sessionStorage.getItem('groupCreateUser')
        const GroupUserList3 = (query(ref(db, 'Groups_Member/' + GroupID + '/User/' + user)))
        onValue(GroupUserList3, (snapshot => {
            let Users = snapshot.val()
            NameList.name = Users.username
            NameList.role = Users.role
            let UserDiv = Users.username + Users.role

            if(Users.username == createUser) {
                NameList2.push(<tr key={user}><td>アドミン</td><td>{user}</td><td>{NameList.name}</td>
                    <td><button onClick={Group_delete}>グループを削除</button></td>
                    </tr>)
            }else if(Users.role == 1) {
                NameList2.push(<tr key={user}><td><form ><select id={UserDiv} defaultValue={1}>
                        <option value={1}>アドミン</option>
                        <option value={2}>エディター</option>
                        <option value={3}>リードメンバー</option></select></form></td>
                        <td>{user}</td><td>{NameList.name}</td>
                        <td><button onClick={role_change} id={user} name={UserDiv}>役割変更</button>
                        <button onClick={Member_banish} id={user}>追放</button></td>
                </tr>)
            } else if (Users.role == 2) {
                NameList2.push(<tr key={user}><td><form><select id={UserDiv} defaultValue={2}>
                        <option value={1}>アドミン</option>
                        <option value={2}>エディター</option>
                        <option value={3}>リードメンバー</option></select></form></td>
                        <td>{user}</td><td>{NameList.name}</td>
                        <td><button onClick={role_change} id={user} name={UserDiv}>役割変更</button>
                        <button onClick={Member_banish} id={user}>追放</button></td>
                </tr>)
            } else {
                NameList2.push(<tr key={user}><td><form><select id={UserDiv} defaultValue={3}>
                        <option value={1}>アドミン</option>
                        <option value={2}>エディター</option>
                        <option value={3}>リードメンバー</option></select></form></td>
                        <td>{user}</td><td>{NameList.name}</td>
                        <td><button onClick={role_change} id={user} name={UserDiv}>役割変更</button>
                        <button onClick={Member_banish} id={user}>追放</button></td>
                </tr>)
            }
        }))
    }



    return (
        <div>
            <p>グループID:{GroupID}</p>
            <p>グループ名:{GroupName}</p>
            <p>グループ作成者:{sessionStorage.getItem('groupCreateUser')}</p>
            <div>
                <button onClick={open}>メンバー表示</button>
                <Modal>
                    <div className="content"></div>
                    <h1>メンバー一覧</h1>
                    <table border={5} key={NameList2}>
                        <tbody>
                        <tr>
                            <th key={'役割'}>役割</th>
                            <th key={'ID'}>ID</th>
                            <th key={'名前'}>名前</th>
                            <th key={'操作'}>操作</th>
                        </tr>
                        {NameList2}
                        {RequestList2}
                        </tbody></table>
                    <button onClick={close}>閉じる</button>
                </Modal>
            </div>
        </div>
    )
}



export default Group_manage