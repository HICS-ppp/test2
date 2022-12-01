import {useEffect,useState} from "react";
import {loadDynamicScript} from "../RouteTest/TestCreateScript";
import {clearScript} from "../RouteTest/TestUnmount";
import CreateChoiceSlideBox1 from "./CreateChoiceSlideBox";
import TestGooglePicker from "./TestGooglePicker";
import {keyboard} from "@testing-library/user-event/dist/keyboard";
import test from "node:test";
import GoogleAuth from "./GoogleAuth";

var client:any;
var access_token:any;

const testJus = {id:"k"};

const CLIENT_ID = "479014391591-s59okul2ibk2j4rftfjj5g3p27gfl963.apps.googleusercontent.com";

//SCOPEがSCOPESになるかも
const SCOPE = "https://www.googleapis.com/auth/drive";
/*

google.accounts.oauth2.initTokenClientだけでも動作することを確認する。


11/28 動作確認済み.
11/29 ul liに取得したスライドIDを表示した

 */
function GoogleAuth2(){
    const [hasScript, setHasScript] = useState(false);
    const [tokenClient, setTokenClient] = useState({});

    //thumbResponseにfetchでgoogleapiへgetで要求したやつのresponseが入る
    const [thumbResponse,setThumbResponse] = useState(testJus);
    //choiceSlideではgoogleapiから取得したらtrueにし、表示する処理の判定、フラグである。
    const [choiceSlide,setChoiceSlide] = useState(false);
    //@ts-ignore


    var test:any;

    function setThumb(response:any){
        setThumbResponse(response);
    }

    function checkResponse(){
        console.log();
        console.log(thumbResponse);
        console.log("tokenClientの状態"+tokenClient);
    }

    function deleteResponse(){
        console.log("delete!");
        //@ts-ignore
        google.accounts.oauth2.revoke(access_token);
    }

    function getToken(){
        //@ts-ignore
        tokenClient.requestAccessToken();
        //@ts-ignore
        console.log(tokenClient.requestAccessToken());
        //@ts-ignore
        return tokenClient.requestAccessToken();
    }

    useEffect( () => {
        console.log("useEffect!!")
        //要らない可能性あり
        loadDynamicScript(() => {
            //@ts-ignore
            const google = window.google;
            setHasScript(true);
            setTokenClient(
                google.accounts.oauth2.initTokenClient({
                    client_id: CLIENT_ID,
                    scope: SCOPE,
                    prompt: '',
                    callback: async(tokenResponse: any) => {
                        access_token = tokenResponse.access_token;
                        console.log(tokenResponse.access_token);
                        console.log("access_token >>" + access_token);
                        await fetch("https://www.googleapis.com/drive/v3/files?pageSize=10&q=mimeType%20%3D%20'application%2Fvnd.google-apps.presentation'&fields=files(id%2Cname%2ChasThumbnail%2CthumbnailLink)&key=AIzaSyB493ybgvXIx1oTCvXuLyKwC7mmkUkwbno", {
                            method: 'GET',
                            //pageSize:10 q:mimeType = application/vnd.google-apps.presentation
                            //これらのパラメータがあったら取得できそう
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${tokenResponse.access_token}`
                            },
                            //mimeTypeにGoogle SlideのmimeTypeを指定
                            //body: JSON.stringify({"name":" TestCreateFile4","mimeType":"application/vnd.google-apps.presentation"
                            //})

                        }).then((response) => {
                            if(response.ok) {
                                //json形式でresponseを返す
                                return response.json();

                            }else{
                                return Promise.reject(new Error('エラーです'));
                            }
                            //setThumb(response);
                        }).then(response =>{
                            setThumb(response);
                            //test = CreateChoiceSlideBox1(response.files,Object.keys(response.files).length);
                            setChoiceSlide(true);
                            console.log(test);
                        })


                    }


                })
            )
        })

        return() => {
            clearScript()
        }
    },[])





    return(
        <div className="GoogleAuth2">
            {/*<button onClick={initClient}>initClient</button>*/}
            <input type="submit" onClick={getToken} value="getTokenIt" />
            <input type="submit" onClick={checkResponse} value="checkResponse" />
            <input type="submit" onClick={deleteResponse} value="delete"/>
            {/*<input type="submit" onClick={testPicker} value="testPicker" />*/}
            {choiceSlide &&
                // @ts-ignore
                CreateChoiceSlideBox1(access_token,thumbResponse.files,Object.keys(thumbResponse.files).length)
            }

        </div>
    )
}

export default GoogleAuth2;