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
                    <header className="header1"><label className="logo">Preport</label></header>
                    {/* onSubmitを追加↓ */}


                    <div className="body"></div>
                    <div className="grad"></div>
                    <div className="header">
                        <div>Site<span>Random</span></div>
                    </div>

                    <div className="login">
                        <input type="text" placeholder="username" name="user" />
                            <input type="password" placeholder="password" name="password" />
                                <input type="button" value="Login" />
                    </div>





                    </>
    );
};

export default Login;