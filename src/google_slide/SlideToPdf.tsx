
/*
SlideToPdfではgoogle drive内のgoogle slideをpdfに変換するために
取得したpresentationIdを使用する。
 */
async function SlideToPdf(token:any,slideId:string){
    var presentation:any;
    const API_KEY = "AIzaSyB493ybgvXIx1oTCvXuLyKwC7mmkUkwbno";

    await fetch(`https://www.googleapis.com/drive/v3/files/${slideId}/export?mimeType=application%2Fpdf&key=${API_KEY}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }).then((response) => {
        if (response.ok) {
            return response;
        } else {
            return Promise.reject(new Error('エラーです'));
        }
    }).then(response =>{
        presentation = response;
    })
    console.log("Status >>"+presentation);
    return(
        presentation
    )
}


export default SlideToPdf;