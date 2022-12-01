import {useEffect,useState} from "react";
import jwt_decode from "jwt-decode";
import {clearScript} from "../RouteTest/TestUnmount";
import {loadDynamicScript} from "../RouteTest/TestCreateScript";

const CLIENT_ID = "479014391591-s59okul2ibk2j4rftfjj5g3p27gfl963.apps.googleusercontent.com";
const SCOPE = "https://www.googleapis.com/auth/drive";



function GoogleAuth() {
    //要らないかも
    const [hasScript, setHasScript] = useState(false);
    //よくわからない
    const [ tokenClient, setTokenClient] = useState({});
    //responseの内容を保存する用のuseState
    const [ thumbResponse, setThumbResponse] = useState({});
    //access_tokenの保持を試みる
    //const [ access_token, setAccessToken] = useState({});


    let access_token:any;
    function createDriveFile(){
        //@ts-ignore
        tokenClient.requestAccessToken();
        console.log("aaa");
    }

    function setThumb(response:any){
        setThumbResponse(response);
    }

    function checkResponse(){
        console.log(thumbResponse);
        console.log("tokenClientの状態"+tokenClient);
    }

    function loadDriveFileList(){
        //@ts-ignore
        for(var i = 0;Object.keys(thumbResponse.files).length > i; i++){
            //@ts-ignore
            console.log("要素数>>" + thumbResponse.files.length);
        }
    }


    function handleCallbackResponse(response:any){
        console.log("Encoded"+response.credential);
        let userObject = jwt_decode(response.credential);
        console.log(userObject);
        console.log("test>>"+response.access_token);
    }

    useEffect(() => {
        loadDynamicScript(() => {
            setHasScript(true);
            //@ts-ignore
            const google = window.google;
            //@ts-ignore
            google.accounts.id.initialize({
                client_id: CLIENT_ID,
                scope: SCOPE,
                //scopeの指定も可能？
                callback: handleCallbackResponse
            });
            //@ts-ignore
            google.accounts.id.renderButton(
                document.getElementById("signInDiv"),
                {theme: "outline", size: "large"}
            );

            // AccessTokenを取得する
            //ここと関連する部分だけで成立する？
            setTokenClient(
                google.accounts.oauth2.initTokenClient({
                    client_id: CLIENT_ID,
                    scope: SCOPE,
                    callback: async(tokenResponse: any) => {
                        access_token = tokenResponse.access_token;
                        console.log("アクセストークンは" + access_token);
                        //ファイルのリストを取得できるように改造する。
                        if(tokenResponse && tokenResponse.access_token){
                            //methodにgetを指定してファイルリストを取得する
                            //saveAPImessage(document)に原文あり
                            const response = await fetch("https://www.googleapis.com/drive/v3/files?pageSize=10&q=mimeType%20%3D%20'application%2Fvnd.google-apps.presentation'&fields=files(id%2Cname%2ChasThumbnail%2CthumbnailLink)&key=AIzaSyB493ybgvXIx1oTCvXuLyKwC7mmkUkwbno", {
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
                            }).then(response =>{
                                setThumb(response);
                                console.log(thumbResponse);
                            })

                        }

                    }
                })
            )
            console.log(tokenClient);

            google.accounts.id.prompt();
        });
        return() => {
            clearScript()
        }
    },[])

    return (
        <div>
        <button onClick={hiddenGoogleSignIn}>非表示用</button>
            <button onClick={trueGoogleSignIn}>表示用</button>

            <div className="GoogleAuth">
            <div id="signInDiv"></div>
                <input type="submit" onClick={createDriveFile} value="Create File" />
                <button onClick={loadDriveFileList}>ファイルリスト</button>
                <button onClick={checkResponse}>レスポンス</button>
        </div>
        </div>
    );

}
//非表示、表示が可能であることを確認
function hiddenGoogleSignIn(){
    //@ts-ignore
    document.getElementById("signInDiv").hidden = true;
}

function trueGoogleSignIn(){
    //@ts-ignore
    document.getElementById("signInDiv").hidden = false;
}

export default GoogleAuth