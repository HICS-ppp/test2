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
    const searchGroupID = (ref(db, "Groups/" + GroupID + '/createUser'))
    const UserCount = (query(ref(db, 'Groups_Member/' + GroupID + '/User')))
    let namelist: any = [];
    let namelist2:any = [];
    const [Modal, open, close,] = useModal()　//モーダルのAPIを使用


    onValue(UserCount, (snapshot => {
        let test = Object.keys(snapshot.val()).length;
        console.log(test)
        sessionStorage.setItem('UserCount', String(test))
    }))
    onValue(searchGroupID, (snapshot => {
        const aaa = snapshot.val()
        sessionStorage.setItem('groupCreateUser', aaa)
    }))


    const Group_delete = async () => {
        // グループ削除処理
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

    const Member_banish = async () => {
        const check = window.confirm('このユーザをグループから本当に追放しますか？')
        if(check == true) {
            //ユーザ削除処理未完成
        }
    }


    let j = Number(sessionStorage.getItem('UserCount'))
    for (let i = 1; i <= j; i++) {
        const GroupUserList2 = (query(ref(db, 'Groups_Member/' + GroupID + '/User/')
            , orderByChild('number'), equalTo(i)))
        onChildAdded(GroupUserList2, (snapshot => {
            let test = snapshot.key
            console.log(test)
            sessionStorage.setItem('test' + i, String(test))
        }))
    }


    for (let s = 1; s <= j; s++) {
        let user = sessionStorage.getItem('test' + s)
        const GroupUserList3 = (query(ref(db, 'Groups_Member/' + GroupID + '/User/' + user)))
        onValue(GroupUserList3, (snapshot => {
            let test2 = snapshot.val()
            namelist.name = test2.username
            namelist.role = test2.role
            if (test2.role == 1) {
                namelist2.push(<ul>アドミン {namelist.name}
                    <button onClick={Group_delete}>グループを削除</button>
                </ul>)
            } else if (test2.role == 2) {
                namelist2.push(<ul>エディター {namelist.name}
                    <button onClick={Member_banish}>追放</button>
                </ul>)
            } else {
                namelist2.push(<ul>リードメンバー {namelist.name}
                    <button onClick={Member_banish}>追放</button>
                </ul>)
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
                    <p>{namelist2}</p>
                    <button onClick={close}>閉じる</button>
                </Modal>
            </div>
        </div>
    )
}



export default Group_manage