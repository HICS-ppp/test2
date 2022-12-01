// @ts-ignore
export const loadDynamicScript = callback => {

    const scriptId = "test_script";
    //const scriptId2 = "test_script2";
    const existingScript = document.getElementById(scriptId);
    //const existingScript2 = document.getElementById(scriptId2);
    console.log(existingScript)


    if(!existingScript){
        console.log("222")
        const script = document.createElement("script");
        script.id = scriptId;
        script.type = "text/javascript";
        script.async = true;
        script.defer = true;

        //script.src = "https://apis.google.com/js/api.js";
        script.src = "https://accounts.google.com/gsi/client";

        script.className = "externalScript";

        document.body.appendChild(script);;


        script.onload = () => {
            if (callback) callback();
        }
    }

    if(existingScript&&callback) callback();
};