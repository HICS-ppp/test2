import {useEffect} from "react";
/*
    GetGoogleSlidesThumbnailsはGoogle Slides APIを使用して、
    各ページのサムネイルリンクを取得する。
    またwidth heightも併せて取得する。
    取得したデータは連想配列{link: thumbnailLink width:width height:height}という形式にし
    returnする。
 */

const API_KEY = "AIzaSyB493ybgvXIx1oTCvXuLyKwC7mmkUkwbno"
let SLIDE_ID:any;
let ACCESS_TOKEN:any;

async function returnThumbLinks(pageObjectId:any){
    let jsonResponse:any;

    await fetch(`https://slides.googleapis.com/v1/presentations/${SLIDE_ID}/pages/${pageObjectId}/thumbnail?key=${API_KEY}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ACCESS_TOKEN}`
        },
    }).then(async response => {
        await response.json().then(JsonResponse => {
            console.log("responseをreturn");
            console.log("response Url >>" + JsonResponse.contentUrl);

            jsonResponse = {link: JsonResponse.contentUrl, width: JsonResponse.width, height: JsonResponse.height};



        })
    })

    return jsonResponse;


}


async function GetGoogleSlidesThumbnails(access_token:any,slideId:any){

    SLIDE_ID = slideId;
    ACCESS_TOKEN = access_token
    let pageObjectIds:any;
    let thumbnailLinks:any = [];


    await fetch(`https://slides.googleapis.com/v1/presentations/${slideId}?key=${API_KEY}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
        },
    }).then(async response => {
        await response.json().then(jsonResponse => {

            pageObjectIds = jsonResponse.slides;
            console.log("中身は>>" + pageObjectIds);
            //console.log("中身の中身は>>"+ pageObjectIds.slides);
            //console.log("中身の中身からObjectIdを >> " + pageObjectIds.slides[0].objectId);
            console.log("slides[]のlengthは >>" + pageObjectIds.length);
            console.log("test >>"+pageObjectIds[0].objectId);



        })
        let num:any;
        let j = 0;
        for await(num of pageObjectIds) {
            console.log("今の回数(入る前) >>"+j);
            console.log("今の回数(入る前)++ >>"+num.objectId);
            let teest = await returnThumbLinks(num.objectId)
            console.log("teest >>" + teest.link);
            console.log("teest width+height >>" + teest.width + "x" + teest.height);

            thumbnailLinks.push(teest);
            console.log("今の回数(入った後) >>"+j);
            j++;
        }

    })

    return thumbnailLinks;

}



export default GetGoogleSlidesThumbnails;