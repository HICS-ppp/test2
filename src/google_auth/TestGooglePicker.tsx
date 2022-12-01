import {useEffect, useState} from "react";
import {API_KEY} from "../googledriveapi/GoogleDriveAPI2";

/*
12/01
Google Pickerを使おうと思ったが、一時中断
 */

function TestGooglePicker(){

    const CLIENT_ID = "479014391591-s59okul2ibk2j4rftfjj5g3p27gfl963.apps.googleusercontent.com";
    const SCOPE = "https://www.googleapis.com/auth/drive";


    //let gisInited = false;
    //let pickerInited = false;
    let access_token = "";

    const [pickerInited,setPickerInited] = useState(false);
    const [gisInited, setGisInited] = useState(false);

    function onApiLoad() {
        gapi.load('picker', onPickerApiLoad);
    }

    function onPickerApiLoad(){
        setPickerInited(true);
    }



    useEffect(() =>{
        console.log("mmietru?");
        //@ts-ignore

        const google = window.google;
        google.accounts.oauth2.initTokenClient({
            client_id: CLIENT_ID,
            scope: SCOPE,
            prompt: '',
            callback: async(tokenResponse: any) => {
                if(tokenResponse.error !== undefined) {
                    throw(tokenResponse);
                }
                access_token = tokenResponse.access_token;
                showPicker();
                console.log(access_token);

            }
        });
        setGisInited(true);

        const showPicker = () => {
            const picker = new google.picker.PickerBuilder()
                .addViewGroup(
                    new google.picker.ViewGroup(google.picker.ViewId.DOCS)
                        .addView(google.picker.ViewId.DOCUMENTS)
                        .addView(google.picker.ViewId.PRESENTATIONS))
                .setLocale('ja')
                .setOAuthToken(access_token)
                .setDeveloperKey(API_KEY)
                .setCallback(pickerCallback)
                .build();
            picker.setVisible(true);
        }

        if (access_token === null) {
            // Prompt the user to select a Google Account and ask for consent to share their data
            // when establishing a new session.
            //@ts-ignore
            tokenClient.requestAccessToken({prompt: 'consent'});
        } else {
            // Skip display of account chooser and consent dialog for an existing session.
            //@ts-ignore
            tokenClient.requestAccessToken({prompt: ''});
        }

        function pickerCallback(data:any){
            let url = 'nothing';
            if(data[google.picker.Response.ACTION] == google.picker.Action.PICKED){
                let doc = data[google.picker.Response.DOCUMENTS][0];
                url = doc[google.picker.Document.URL];
            }
           /* let message = `You picked: ${url}`;
            document.getElementById('result').innerText = message;*/

        }

    },[pickerInited])

}

export default TestGooglePicker;