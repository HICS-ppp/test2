
/*
GetGoogleSlideではgoogle driveからgoogle slideをpresentationに
取得し、呼び出し元へreturnする想定。
 */


async function GetGoogleSlide(token:any,slideId:string){
    var presentation:any;

        /*const slideData = async() =>{*/
            await fetch(`https://slides.googleapis.com/v1/presentations/${slideId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },

            }).then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return Promise.reject(new Error('エラーです'));
                }
            }).then(response =>{
                presentation = response;
            })

        //}
    console.log("Status >>"+presentation.presentationId);
    return(
        presentation
    )
}


export default GetGoogleSlide;