import {useEffect,useState,useRef} from "react";
import GetGoogleSlidesThumbnails from "../google_slide/GetGoogleSlidesThumbnails";
import CreateSlidesThumb from "../google_slide/CreateSlidesThumb";
import AddGoogleSlidesLink from "../addFirebase/AddGoogleSlidesLink";
import GetGoogleSlidesList from "../google_drive/GetGoogleSlidesList";
import {prevPages,nextPages} from "../google_slide/SearchFifth";
import {isNumber} from "util";


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
        fifthSlidesには最初のスライド、最後のスライド、今いるスライドの位置から前と次の2ページを
        直接指定できるボタンを保持する。
     */
    const [fifthSlides,setFifthSlides] = useState<any>();

    const [testBool,setTestBool] = useState(false);



    /*
        currentPageには現在ページの位置を格納する。
    */
    /*const [currentPage,setPage] = useState(0);
    const setPageChange = (newIndex:number) => setPage(newIndex);*/


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
    const width = 1200;
    const height = 675;

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
    let firstSlideImg:any;


    /*
        selectIndexにslideListsのx番目が押された時のxを格納する
     */
    const [selectIndex,setSelectIndex] = useState(0);
    const selectIndexIncrement = () => setSelectIndex((prevValue) => prevValue + 1);
    const selectIndexDecrement = () => setSelectIndex((prevValue) => prevValue - 1);
    const selectIndexChanges = (newIndex:number) => setSelectIndex((prevValue) => newIndex);

    const isFirstRender =  useRef(false);

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
        console.log("getSLidePages >>" + GoogleSlidesList);
        setDisplaySlideLists(false);
        setDisplayGoogleSlidesList(true);
        setSlideImgTags(createSlideImg());
        setFifthSlides(firstRenderButton());
        //createSlideImg(GoogleSlidesList[GoogleSlidesListPointer].link);
    }

    function firstRenderButton(){
        const returnButtons:any = []
        const firstButton = (<li key="firstButton"><button>最初</button></li>)
        returnButtons.push(firstButton);
        returnButtons.push(<li key="NP"><h4>1</h4></li>)
        const nextList = nextPages(0,GoogleSlidesList.length);
        for(let i = 0;i < nextList.length;i++){
            returnButtons.push(<li key={"nextPage" + nextList[i]}>
                <button onClick={() => {anySlideImg(nextList[i])}}>{nextList[i] + 1}</button>
            </li>);
        }

        const lastButton = (<li key="lastButton"><button>最後</button></li>)
        returnButtons.push(lastButton);

        selectIndexChanges(0);


        return returnButtons
    }

    function changeButtons(index:number,length:number){
        const returnButtons = [];
        console.log("changeButtons >>" + length);
        console.log(slideImg);
        console.log(GoogleSlidesList);
        //最初のスライド用
        const firstButton = (<li key={"firstButton"}><button onClick={() => {
            selectIndexChanges(0);
            setSlideImgTags(setSlide(0,length));
        }}>最初</button></li>)


        //飾りの最初のボタン
        const decoFirstButton = (<li key={"decoFirstButton"}><button>最初</button></li>);

        //最後のスライド用
        const lastButton = (<li key={"lastButton"}><button onClick={() => {
            selectIndexChanges((length - 1));
            setSlideImgTags(setSlide((length - 1),length));
        }}>最後</button></li>)

        //飾りの最後のボタン
        const decoLastButton = (<li key={"decoLastButton"}><button>最後</button></li>);

        /*
            前のページの要素を検索する。
         */
        const prevList = prevPages(index,length);

        /*
            現在地が最初のページであるなら、
         */
        if(index == 0) {
            returnButtons.push(decoFirstButton);
        }else{
            returnButtons.push(firstButton);
        }

        for(let i = 0;i < prevList.length;i++){
            console.log("prev >> "+i);
            console.log("prev >> "+prevList[i]);
            returnButtons.push(<li key={"fifthButtons"+prevList[i]}><button onClick={() => {
                selectIndexChanges(prevList[i]);
                setSlideImgTags(setSlide(prevList[i],length));
            }}>{prevList[i] + 1}</button></li>);
        }

        returnButtons.push(<li key="nowPosition"><h4>{index + 1}</h4></li>)
        const nextList = nextPages(index,length);

        for(let i = 0;i < nextList.length;i++){
            console.log("next >> "+i);
            returnButtons.push(<li key={"fifthButtons"+nextList[i]}><button onClick={() => {
                selectIndexChanges(nextList[i]);
                setSlideImgTags(setSlide(nextList[i],length));
            }}>{nextList[i] + 1}</button></li>);
        }

        /*
            現在地が最後のページであるなら、
            "最後"ボタンは表示しない。
         */
        if(index == length - 1) {
            returnButtons.push(decoLastButton);
        }else {
            returnButtons.push(lastButton);
        }
        return returnButtons;
    }

    /*
        imgタグを作成するfunction
     */
    function createSlideImg(){
        const returnSlideImg:any = [];
        returnSlideImg.push(<img key={GoogleSlidesListPointer} referrerPolicy="no-referrer" src={GoogleSlidesList[GoogleSlidesListPointer].link} width={width} height={height}/>);
        const returnSetSlideImg:any = []
        for(let i = 0;i < GoogleSlidesList.length;i++){
            console.log(i+"回目の処理");
            returnSetSlideImg.push(<img key={i} referrerPolicy="no-referrer" src={GoogleSlidesList[i].link} width={width} height={height} />);
        }
        setSlideImg(returnSetSlideImg);
        firstSlideImg = returnSetSlideImg;
        return returnSlideImg;
    }


    /*
        setSlideはnextSlideImg,prevSlideImgで使用することを想定。
        slideImgから引数のnumber番目の位置を参照してリンクを取得し、returnする。
        ※setSlideImgTags(setSlide(index))という形で呼び出しているので、
        returnした値がそのままslideImgTagsに入る。
     */

    function setSlide(index:number,length:number){
        let returnSlides:any = [];
        console.log("setSlide >> " +slideImg);
        console.log("firstSlideImg >>" + firstSlideImg);
        if(slideImg.length == 0){
            console.log("setSlideLength >>"+ slideImg.length);
            returnSlides = firstSlideImg;
        }else{
            returnSlides = slideImg;
        }
        console.log("GoogleSlidesList >>" + GoogleSlidesList.length);
        console.log("returnSlides ??" + returnSlides);
        return returnSlides[index];
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
            console.log("prevSlideImg >>" + slideImg.length);
            setSlideImgTags(setSlide(selectIndex - 1,slideImg.length));
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
            console.log("prevSlideImg >>" + slideImg.length);
            setSlideImgTags(setSlide(selectIndex + 1,slideImg.length))
            return;
        }else{
            return;
        }
    }

    function anySlideImg(index:number){
        selectIndexChanges(index);
        console.log(slideImg.length);
        console.log(GoogleSlidesList.length);
        let a;
        if(slideImg.length == 0){
            a = GoogleSlidesList.length
        }else{
            a = slideImg.length
        }
        console.log(a);
        console.log(index);
        setSlideImgTags(setSlide(index,a));
    }


    /*
        changeButtonsは
        ページネーションを新たに変更する処理を行う。
     */


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
                isFirstRender.current = true;
            }, [])

    /*
        selectIndexが変更されたら走ることを想定。
     */

    useEffect(() => {
        if(isFirstRender.current == false) {
            console.log("LOLOL");
            isFirstRender.current = true;
        }else{
            console.log("LALAL");
            //setSlideImgTags(setSlide(selectIndex, slideImg.length));
            setFifthSlides(changeButtons(selectIndex, slideImg.length));
        }
    },[selectIndex])


    return(
        <div className="GoogleAuth2">
            {/*docShareは資料を共有する際にクリックするボタンを入れる*/
                <div id="docShare">
                    <input id="TEST1" type="submit" onClick={getToken} value="資料共有"/>
                </div>
            }

            {/*switchUserは連携したGoogleアカウントを変えるときに使うdeleteResponseボタンを入れる*/
                <div id="switchUser">
                    <input type="submit" onClick={deleteResponse} value="delete"/>
                </div>
            }
            {/*updateSlidesはスライドの更新を行うためのボタンを入れる予定*/
                <div id="updateSlides">
                    <input type="submit"  value="update" />
                </div>
            }



            {/*
                selectSlidesは資料を選択する画面を表示させる
            */}
            <div id="selectSlides">
                <ul>
                {displaySlideLists &&
                    slideLists
                }
                </ul>
            </div>

            {/*
                prevPageは前のスライドへ移動するためのボタンを入れる予定
                nextPageは次のスライドへ移動するためのボタンを入れる予定
            */}
            <div id="prevPage">
                {displayGoogleSlidesList &&
                    /*<input type="submit" onClick={prevSlideImg} value="前へ"/>*/
                    <button onClick={prevSlideImg}>prevPage</button>
                }
            </div>

            <div id="nextPage">
                {displayGoogleSlidesList &&
                    /*<input type="submit" onClick={nextSlideImg} value="次へ"/>*/
                    <button onClick={nextSlideImg}>nextPage</button>
                }
            </div>

            <div id="testButtons">
                <ul key="AAAAA">
                {displayGoogleSlidesList &&
                    fifthSlides
                }
                </ul>
            </div>

            {/*
                imgSlidesは画面に表示させるスライド（１ページ分）
                を入れる
            */}

                <div id="imgSlides">
                    {displayGoogleSlidesList &&
                        slideImgTags
                    }
                </div>
            <button onClick={() => {selectIndexChanges(1)}}>AAA</button>
        </div>
    )
}


export default GoogleAuth3;