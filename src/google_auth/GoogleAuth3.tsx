import {useEffect,useState} from "react";
import GetGoogleSlidesThumbnails from "../google_slide/GetGoogleSlidesThumbnails";
import CreateSlidesThumb from "../google_slide/CreateSlidesThumb";
import AddGoogleSlidesLink from "../addFirebase/AddGoogleSlidesLink";
import GetGoogleSlidesList from "../google_drive/GetGoogleSlidesList";
import  "./Google_Auth.css";

let access_token:any;

//Google API を使用するためのclient_id
const CLIENT_ID = "479014391591-s59okul2ibk2j4rftfjj5g3p27gfl963.apps.googleusercontent.com";
//Google OAuth2に使用する連携の範囲(恐らく)
const SCOPE = "https://www.googleapis.com/auth/drive";

/*
google.accounts.oauth2.initTokenClientだけでも動作することを確認する。
11/28 動作確認済み.
11/29 ul liに取得したスライドIDを表示した

12/12
const a = document.getElementById("TEST1");
    //@ts-ignore
    a.style.visibility = "hidden";
で非表示になることを確認
 */

function GoogleAuth3(){

    const [tokenClient, setTokenClient] = useState({});

    //thumbResponseにfetchでgoogleapiへgetで要求したやつのresponseが入る
    const[thumbResponse,setThumbResponse]　= useState<any>();
    let jsonResponse:any;
    /*
        GoogleSlidesListは選択したスライドの
        全ページIDを保持する配列。
     */
    /*
        slideImgTagsは実際に表示する１ページ分のスライドを保持する。
     */
    const [slideImgTags,setSlideImgTags] = useState([]);

    /*
        GoogleSlidesListは処理の中で一時的に使用する。
        createImg()とgetSlidePage()にて使用。
     */
    let GoogleSlidesList:any = [];
    GoogleSlidesList.push("P");
    /*
        現在表示しているGoogleSlidesListの配列番号を格納する。
     */
    let GoogleSlidesListPointer:number = 0;
    const[displayGoogleSlidesList,setDisplayGoogleSlidesList] = useState(false);

    /*
        width及びheightはGoogleSlidesから取得した際に
        返ってくるwidth,heightが1600x900で返ってくるため
        予め設定しておく。
     */
    const width = 1024;
    const height = 576;
    /*
        slideListsはGoogleDriveから取得したスライドIDのリストを格納する。
        ボタンを一覧表示する際に使用することを想定
     */
    const [slideLists,setSlideLists] = useState();
    const [displaySlideLists,setDisplaySlideLists] = useState(false);

    /*
        slideImgではgetThumbnailで取得したサムネイルリンクを全てimgタグにし、保持する。
     */
    const [slideImg,setSlideImg] = useState([]);

    /*
        selectIndexにslideListsのx番目が押された時のxを格納する
     */
    const [selectIndex,setSelectIndex] = useState(0);
    const selectIndexIncrement = () => setSelectIndex((prevValue) => prevValue + 1)
    const selectIndexDecrement = () => setSelectIndex((prevValue) => prevValue - 1);



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

    /*
        スライドの一覧から選択したSlidesのIDを使用して、
        Google Slides APIを通し、サムネイルリンクを取得する。
        取得した後、1ページ目を表示する。
     */
    async function getSlidePages(index:number){
        GoogleSlidesList = await GetGoogleSlidesThumbnails(access_token,jsonResponse.files[index].id);

        setDisplaySlideLists(false);
        setDisplayGoogleSlidesList(true);
        setSlideImgTags(createSlideImg());
        //createSlideImg(GoogleSlidesList[GoogleSlidesListPointer].link);

    }

    /*
        imgタグを作成するfunction
     */
    function createSlideImg(){
        const returnSlideImg:any = []
        returnSlideImg.push(<img key={GoogleSlidesListPointer} referrerPolicy="no-referrer" src={GoogleSlidesList[GoogleSlidesListPointer].link} width={width} height={height}/>);
        const returnSetSlideImg:any = []
        for(let i = 0;i < GoogleSlidesList.length;i++){
            console.log(i+"回目の処理");
            returnSetSlideImg.push(<img key={i} referrerPolicy="no-referrer" src={GoogleSlidesList[i].link} width={width} height={height} />);
        }
        setSlideImg(returnSetSlideImg);
        return returnSlideImg;
    }

    /*
        setSlideはnextSlideImg,prevSlideImgで使用することを想定。
        slideImgから引数のnumber番目の位置を参照してリンクを取得し、returnする。
        ※setSlideImgTags(setSlide(index))という形で呼び出しているので、
        returnした値がそのままslideImgTagsに入る。
     */
    function setSlide(index:number){
        return slideImg[index];
    }

    /*
        prevSlideImgはポインタの位置を１つ前に戻し、
        imgタグを返す処理。
        selectIndexはuseStateを使用しているため、そのまま使うとずれが生じる。
        ずれを補正するために幾つかの処理を追加している。
     */
    function prevSlideImg(){
        if(selectIndex == 0){
            return;
        }else{
            selectIndexDecrement();
            setSlideImgTags(setSlide(selectIndex - 1));
            return;
        }
    }

    /*
        nextSlideImgはポインタの位置を１つ次の位置にし、
        imgタグを返す処理。
        selectIndexはuseStateを使用しているため、そのまま使うとずれが生じる。
        ずれを補正するために幾つかの処理を追加している。
     */
    function nextSlideImg(){
        if(selectIndex + 1 < slideImg.length){
            selectIndexIncrement();
            setSlideImgTags(setSlide(selectIndex + 1))
            return;
        }else{
            return;
        }
    }
    /*
        Firebase RealtimeDatabaseから取得してくる処理を記述予定
    */

    //setSlideLists(firebaseから取ってくる処理)
    //仮で条件式をtrueにしている
    /*if(slideLists != false){
       setDisplaySlideLists(true);
    }*/


    useEffect(() => {
        //@ts-ignore
        const google = window.google;
        //if() {
            setTokenClient(
                google.accounts.oauth2.initTokenClient({
                    client_id: CLIENT_ID,
                    scope: SCOPE,
                    prompt: '',
                    callback: async (tokenResponse: any) => {
                        access_token = tokenResponse.access_token;
                        console.log("access_token >>" + access_token);

                        /*
                            OAuth2のアクセストークンを使用してSlidesのリストを取得する。
                         */
                        jsonResponse = await GetGoogleSlidesList(access_token);
                        setThumbResponse(jsonResponse);


                        const slideIdLists:any = []
                        for(let i = 0;i<Object.keys(jsonResponse.files).length;i++) {
                            //onClickは要検討
                            slideIdLists.push(<li key={i}><button onClick={() => {
                                getSlidePages(i);
                            }}>{jsonResponse.files[i].id}</button></li>);
                        }
                        //要注意ポイント バグ発生の可能性あり
                        //12/16 確認完了
                        setSlideLists(slideIdLists);
                        setDisplaySlideLists(true);
                    }
                })
            )
        //}else{

        //}



        //for(let i=0;) {

        //}
            console.log("PPP");
            }, [])

    return(
        <div className="GoogleAuth2">
            {/*docShareは資料を共有する際にクリックするボタンを入れる*/
                <div className="buts">
                    <input className="test1" id="TEST1" type="submit" onClick={getToken} value="資料共有"/>



                    {/*switchUserは連携したGoogleアカウントを変えるときに使うdeleteResponseボタンを入れる*/

                        <input className="subm" type="submit" onClick={deleteResponse} value="delete"/>

                    }
                    {/*updateSlidesはスライドの更新を行うためのボタンを入れる予定*/

                        <input type="submit" value="update"/>


                    }
                </div>
            }
            {/*
                selectSlidesは資料を選択する画面を表示させる
            */}

            <div  id="selectSlides">
                <ul className="ul1">
                {displaySlideLists &&
                    slideLists
                }
                </ul>
            </div>

            {/*
                prevPageは前のスライドへ移動するためのボタンを入れる予定
                nextPageは次のスライドへ移動するためのボタンを入れる予定
            */}

            <div className="buttuns3">
            <div className="prevPage">
                {displayGoogleSlidesList &&
                    /*<input type="submit" onClick={prevSlideImg} value="前へ"/>*/
                    <button className="bu" onClick={prevSlideImg}>＜</button>
                }
            </div>

            <div className="nextPage">
                {displayGoogleSlidesList &&
                    /*<input type="submit" onClick={nextSlideImg} value="次へ"/>*/
                    <button className="nx" onClick={nextSlideImg}>＞</button>
                }
            </div>
            </div>
            {/*
                imgSlidesは画面に表示させるスライド（１ページ分）
                を入れる
            */}

            <div className="acc">
                    {displayGoogleSlidesList &&
                        slideImgTags
                    }
            </div>
                </div>

    )
}


export default GoogleAuth3;