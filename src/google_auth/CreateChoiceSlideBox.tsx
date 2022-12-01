import GetGoogleSlide from "../google_slide/GetGoogleSlide";
import SlideToPdf from "../google_slide/SlideToPdf";
/*
GoogleAuth2から要素数を受け取り、BOXを作る処理。
tableを利用するのが一番手っ取り早い？
 */
var returnTable:any;
/*export const CreateChoiceSlideBox = (responseBody:any,length:number) =>{
    console.log("it Works!");

    for(var i = 0;length > i;i++){
        console.log(i +"番目の要素のIDは"+responseBody[i].id);
        returnTable = "<li>"+responseBody[i].id+"</li>"
    }
    console.log(length);

    return (
        <ul className="PP">
            {(() => {
                const d = [];
                for(let i = 0; i<length;i++){
                    console.log("let i >>"+i);
                    d.push(<li>ID = {responseBody.id}</li>);
                }
                console.log(d);
                return d;
            })()}
        </ul>
    );
}*/



function CreateChoiceSlideBox1(token:string,responseBody:any,length:number){

    console.log("it Works!");
    console.log(responseBody);
    for(var i = 0;length > i;i++){
        console.log(i +"番目の要素のIDは"+responseBody[i].id);
        returnTable = "<li>"+responseBody[i].id+"</li>"
    }
    console.log(length);



    return (
        <div className="GoogleAuth2">
            <ul className="PP">
                {(() => {
                    const d = [];
                    for(let i = 0; i<length;i++){
                        console.log("let i >>"+i);
                        d.push(<li key={i}><button onClick={() => SlideToPdf(token,responseBody[i].id)}>{responseBody[i].id}</button></li>);
                    }
                    console.log(d);
                    return d;
                })()}
            </ul>
        </div>
    );
}



export default CreateChoiceSlideBox1;