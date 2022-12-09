import React, {useState} from "react";
import {Link} from "react-router-dom"
import "./passresetting.css";


const Passresetting = () => {


    const [pass,setPass] = useState("");
    const [pass2,setPass2] = useState("");

    const passhi = (e:any) => {

        sessionStorage.setItem("pass",pass)


        if (pass !== pass2) {
            alert("パスワードが一致しません")
        } else {
            /*        update(ref( database,"Users/"+userid),{
                        pass:pass,
                    });*/
            e.preventDefault();
            window.location.href="/passre_loading"
        }
    }


    return (
        <>
            <form onSubmit={passhi}>


            <div className="passre1div">
                <input type="text"
                       className="passre1"
                       placeholder="新しいパスワードを入力"
                       onChange={(e:any) => setPass(e.target.value)}
                       required

                />

            </div>
            <div className="passre2div">
            <input type="text"
                   className="passre2"
                   placeholder="再度パスワードを入力"
                   onChange={(e:any) => setPass2(e.target.value)}
                   required
            />
            </div>

                <button className="passrebutton">変更</button>
            {/*<Link to="/passre_loading"><button className="passrebutton">変更</button></Link>*/}
            </form>

        </>
    );
};
export default Passresetting;