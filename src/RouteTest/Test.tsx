import {useEffect,useState} from "react";
import {BrowserRouter as Router, Link, useNavigate} from "react-router-dom";
import { loadDynamicScript } from "./TestCreateScript";
import { Component } from "react";


const Test = () => {
    const [hasScript, setHasScript] = useState(false);
    useEffect(() => {
        loadDynamicScript(() => {
            setHasScript(true);
        });
    }, [hasScript]);



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
                    <button id="authorize-button" >Authorize</button>
                    <button id="signout-button" >Sign Out</button>

                    <div id="content"></div>
                </div>

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
                ""
            )}
        </div>
    );
};

export default Test;

