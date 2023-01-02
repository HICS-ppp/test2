import {useEffect,useState} from "react";
import {BrowserRouter as Router, Link, useNavigate} from "react-router-dom";
import { loadDynamicScript } from "./TestCreateScript";
import {Component} from "react";
import { clearScript } from './TestUnmount';
import {clear} from "@testing-library/user-event/dist/clear";

/*

実行不可:クラスコンポーネントでHookを利用しようとしているため

 */


class TestClass extends Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    //一時的に放置
    navigate = useNavigate();
    componentDidMount() {
        const [hasScript, setHasScript] = useState(false);

        useEffect(() => {
            loadDynamicScript(() => {
                setHasScript(true);
            });

            }, [hasScript]);

        return (
            <div>
                //要変更
                {hasScript ? (
                    <div>
                        <div>
                            <h1>GoogleDriveテスト</h1>
                            {/*
                    ボタンのところはDrive用にする
                    */}
                            <button id="authorize-button">Authorize</button>
                            <button id="signout-button">Sign Out</button>

                            <div id="content"></div>
                        </div>

                        <div>
                            <h1>Aboutページです</h1>
                            <Link to="/">Homeページに移動</Link>
                            <br/>
                            <Link to="/contact">Contactページに移動</Link>
                            <br/>
                            <Link to="/test">Testページへ</Link>
                        </div>
                    </div>

                ) : (
                    ""
                )}
            </div>
        )

    }

    componentWillUnmount() {
        clearScript();
    }

}



export default TestClass;

