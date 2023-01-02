// @ts-ignore

import GoogleAuth2 from "../google_auth/GoogleAuth2";
export const loadDynamicScript2 = (callback: () => void) => {

    const scriptId2 = "test_script2";
    //const scriptId2 = "test_script2";
    const existingScript2 = document.getElementById(scriptId2);
    //const existingScript2 = document.getElementById(scriptId2);
    console.log(existingScript2)


    if(!existingScript2){
        console.log("222")
        const script2 = document.createElement("script");
        script2.id = scriptId2;
        script2.type = "text/javascript";

        //script.src = "https://apis.google.com/js/api.js";
        script2.src = "https://accounts.google.com/gsi/client";
        script2.className = "externalScript2";

        document.body.appendChild(script2);


        script2.onload = () => {
            if (callback) callback();
        }
    }

    if(existingScript2&&callback) callback();
};