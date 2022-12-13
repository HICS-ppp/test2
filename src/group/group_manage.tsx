import {getDatabase, ref, onValue, update, remove, query, onChildAdded,limitToFirst} from "firebase/database";
import {database} from "../firebase";


const Group_manage = () => {
    const db = getDatabase()
    const GroupID = sessionStorage.getItem('groupID')
    const GroupName = sessionStorage.getItem('groupName')
    const searchGroupID = (ref(db, "Groups/" + GroupID + '/createUser'))
    const UserCount = (query(ref(db, 'Groups_Member/' + GroupID + '/')))
    let list:any = []

        onChildAdded(UserCount, (snapshot => {
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
    const Request_accept = async () => {
    }
    const Request_reject = async () => {
    }



    let j = Number(sessionStorage.getItem('UserCount'))
        for(let i=1;i <= j;i++) {
        const GroupUserList2 = (query(ref(db, 'Groups_Member/' + GroupID + '/'), limitToFirst(i)))
        onChildAdded(GroupUserList2, (snapshot => {
            let test = snapshot.key
            console.log(test)
            list.push(test)
            sessionStorage.setItem('i'+i,String(test))
        }))

        }


    return (
        // ロールの昇順
        <form>
            <div>
                <>
            <p>グループID:{GroupID}</p>
            <p>グループ名:{GroupName}</p>
            <p>グループ作成者:{sessionStorage.getItem('groupCreateUser')}</p>
                    {(()=>{
                        let o = Number(sessionStorage.getItem('UserCount'))
                        let k = 1
                        while(k <= o){
                            return(
                                <p>{sessionStorage.getItem('i'+k)}</p>
                            )
                        }
                    })()
                    }

                   <button onClick={Group_delete}>グループを削除</button>
                   <button onClick={Member_banish}>追放</button>
                   <button onClick={Request_accept}>承諾</button>
                   <button onClick={Request_reject}>拒否</button>
            </>
            </div>
            </form>
    )
}

export default Group_manage