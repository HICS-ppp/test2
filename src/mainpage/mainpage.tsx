import { useNavigate} from "react-router-dom";

const Mainpage = () => {
    console.log(sessionStorage.getItem('SessionUserID'))
    /* ↓state変数「user」を定義 */
    const navigate = useNavigate();
    /* ↓関数「logout」を定義 */
    const logout = async (e:any) => {
        e.preventDefault()
        sessionStorage.clear()
        navigate("../login");
    }

    const createGroup = async (e:any) => {
                e.preventDefault();
                window.location.href = "../groupmenu_create"
    }

    const joinGroup = async (e:any) => {
                e.preventDefault();
                window.location.href = "../groupmenu_join"
    }

    return (
            <>
                        <header className="header2">
                            <label className="logo2">Preport!</label>
                        </header>
                        <h1 className="mainfont1">グループ</h1>


                <form onSubmit={createGroup}>
                    <h2 className="mainfont2">グループ作成</h2>
                    <div className="maintext">
                        <input type="text" name="groupname" className="form" placeholder="グループ名を入力"
                            onChange={(e) => sessionStorage.setItem('createGroupName',e.target.value)}
                            required/>
                        <button className="mainbutton">作成</button>
                    </div></form>

                <form onSubmit={joinGroup}>
                    <h2 className="mainfont2">グループ入室</h2>
                    <div className="maintext">
                        <input type="text" name="groupid" className="form" placeholder="グループIDを入力"
                               onChange={(e) => sessionStorage.setItem('joinGroupID',e.target.value)}
                               required/>
                        <button className="mainbutton">参加</button>
                    </div></form>


                        <h1 className="mainfont1">視聴</h1>
                        <div className="maintext">
                            <input type="text" name="roomid" className="form" placeholder="ルームIDを入力"/>
                            <button className="mainbutton">参加</button>
                        </div>

                        <button onClick={logout}>ログアウト</button>
                    </>
    );
};

export default Mainpage;