/*
Google Driveからスライドのリストを取得する。
変数 returnResponseにresponse.json()の形式で格納しreturnする。
 */


let returnResponse:any
async function GetGoogleSlidesList(access_token:string) {
    await fetch("https://www.googleapis.com/drive/v3/files?pageSize=10&q=mimeType%20%3D%20'application%2Fvnd.google-apps.presentation'&fields=files(id%2Cname%2ChasThumbnail%2CthumbnailLink)&key=AIzaSyB493ybgvXIx1oTCvXuLyKwC7mmkUkwbno", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
        },
    }).then((response) => {
        if (response.ok) {
            console.log("SUCCESS!!");
            //json形式でresponseを返す
            returnResponse = response.json();
        } else {
            console.log("ERROR!!");
            returnResponse =  Promise.reject(new Error('エラーです'));
        }
    })

    return returnResponse;
}


export default GetGoogleSlidesList