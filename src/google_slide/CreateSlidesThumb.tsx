
function CreateSlidesThumb(responseSlidesThumb:any){
    console.log("In the CreateSlidesThumb");
    return(
        <div id="PP">
            <ul id="SS">
        {(() => {
            const imgs = []
            /*let link;
            let height;
            let width;
            */
            for(let i=0;i<responseSlidesThumb.length;i++){
                imgs.push(<li key={i}><img src={responseSlidesThumb.link} width={responseSlidesThumb.width}
                                           height={responseSlidesThumb.height}/></li>)
            }
            return imgs
        })()}
            </ul>
        </div>
    );

}

export default CreateSlidesThumb;