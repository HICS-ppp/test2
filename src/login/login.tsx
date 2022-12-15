import {Link} from "react-router-dom";
import "./login.css";

const Login = () => {
            const logE = 'error'
            if (localStorage.getItem('error') == logE){
                alert("IDまたはパスワードが間違っています")
                localStorage.removeItem('error')
            }
    const handleSubmit = async (e:any) => {
        e.preventDefault();
        window.location.href = "/login_loading"
    }

    return (
                <>
                    <header className="header1"><label className="logo">Preport!</label></header>
                    {/* onSubmitを追加↓ */}
                    < form onSubmit={handleSubmit}>
                <h1 className="loginpage1"></h1>
                    <div className="udiv1">

                       <div className="nam"> <label className="userid1">ユーザー</label></div>
                        <input className="useridbox1"
                               name="Userid"
                               type="text"
                               placeholder="userID"
                               onChange={(e) => localStorage.setItem('loginID',e.target.value)}
                        />

                        <div className="pdiv1">
                        <div className="nam2"><label className="pass1">パスワード</label></div>
                            <input className="passbox1"
                                   name="pass"
                                   type="password"
                                   placeholder="pass"
                                   onChange={(e) => localStorage.setItem('loginPass',e.target.value)}
                            />
                        </div>
                    </div>

                        <div className="logdiv">

                            <button className="log1" >ログイン</button>

                        </div>
                        {/* ↓リンクを追加 */}
                        <div className="linkdiv">  <p>新規登録は<Link to={`/signup`}>こちら</Link></p></div>
                        {/*<div className="linkdiv"><p>ゲスト登録は<Link to={`/gest/`}>こちら</Link></p></div>*/}
                        <div className="linkdiv"><p>パスワードを忘れた場合は<Link to={`/passinquiry/`}>こちら</Link></p></div>

                </form>
                    </>
    );
};

export default Login;