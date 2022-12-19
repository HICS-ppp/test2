import {useEffect,useState} from "react";
import {BrowserRouter as Router, Link, useNavigate} from "react-router-dom";
import { loadDynamicScript } from "./TestCreateScript";
import { Component } from "react";
import {clearScript} from "./TestUnmount";

const Test2 = () => {


    const [hasScript, setHasScript] = useState(false);

    //11.20 loginStatusを使用して、ログインボタンまたはログアウトボタンの表示を行うために作成。
    const [loginStatus, setLoginStatus] = useState(false);

    //useEffectの発火条件を変更すれば何にでも応用できそう
    useEffect(() => {
        console.log("aaa")
        loadDynamicScript(() => {
            setHasScript(true);
            console.log(hasScript);
        });

        return() => {
            clearScript()
        }
    }, []);


    const navigate = useNavigate();

    // componentWillUnmount()を使用すること = componentDidMount()も使用しなければならない
    return (
        <div>
            {hasScript ?(
                <div>
                    <div>
                        <h1>GoogleDriveテスト</h1>
                        {/*
                    ボタンのところはDrive用にする
                    */}
                        <button id="authorize-button" onClick={() =>
                            window.open('../googledriveapi/GoogleDriveAPI',undefined,'top=100,left=100,width=300,height=400')}>Authorize</button>
                        {/*//@ts-ignore*/}
                        <button id="signout" onClick={GoogleDriveAPI}>Sign Out</button>
                        <button id="signout-button" >Sign Out</button>

                        <div id="content"></div>
                    </div>

                    <div className="GoogleAuth"></div>
                    <div className="GoogleAuth2"></div>
                    <div>
                        <h1>Aboutページです</h1>
                        <Link to="/">Homeページに移動</Link>
                        <br />
                        <Link to="/contact">Contactページに移動</Link>
                        <br />
                        <Link to="/test">Testページへ</Link>
                    </div>
                </div>

            ):(
                <div><h1>間違ってる</h1></div>
            )}
        </div>
    );
};

export default Test2;

