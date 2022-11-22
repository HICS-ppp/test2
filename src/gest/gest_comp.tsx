import React from "react";
import "./gest_comp.css";

const Gestcomp = () => {
    localStorage.getItem('I2');
    const userID = localStorage.getItem('I2');



    return(
        <form>
            <h1>登録完了</h1>
            <h3>ID:{userID}です</h3>
            <p>ログインの際に必要です</p>
            <h2>このページは閉じても大丈夫です</h2>
        </form>

    );
    window.localStorage.removeItem('I2')
}

export default Gestcomp;