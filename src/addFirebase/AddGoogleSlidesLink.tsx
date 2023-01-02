/*
Firebase RealtimeDatabaseへ格納する関数コンポーネント
 */

/*
引数:jsonResponseはresponse.json()で取ってくること。
jsonResponseの中身はresponse.files[i].idと指定することでスライドのIDを取得。
Object.keys(response.files).lengthでlengthを取得できる。

access_tokenはfunction getToken()を使用？

 */
function AddGoogleSlidesLink(access_token:any,jsonResponse:any){

    //処理が成功したらtrueを返す。
    return true;
}

export default AddGoogleSlidesLink;