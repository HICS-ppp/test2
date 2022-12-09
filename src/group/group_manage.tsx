import {getDatabase, ref,onValue} from "firebase/database";


const Group_manage = () => {
    const db = getDatabase()
    const GroupID = sessionStorage.getItem('groupID')
    const GroupName = sessionStorage.getItem('groupName')
    const searchGroupID = (ref(db, "Groups/" + GroupID + '/createUser'))


        onValue(searchGroupID,(snapshot => {
            const aaa = snapshot.val()
            sessionStorage.setItem('groupCreateUser',aaa)
        }))
    

    const Group_delete = async () => {
    }
    const Member_banish = async () => {
    }
    const Request_accept = async () => {
    }
    const Request_reject = async () => {
    }

    return (
        <form>
            <p>グループID:{GroupID}</p>
            <p>グループ名:{GroupName}</p>
            <p>グループ作成者:{sessionStorage.getItem('groupCreateUser')}</p>
            <button onClick={Group_delete}>グループを削除</button>
            <button onClick={Member_banish}>追放</button>
            <button onClick={Request_accept}>承諾</button>
            <button onClick={Request_reject}>拒否</button>

        </form>

    )
}
export default Group_manage