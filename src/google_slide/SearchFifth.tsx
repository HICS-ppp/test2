/*
    SearchFifthでは、ページネーションを作成する上での何ページ分のボタンを
    作れるか検索する
 */
function prevPages(index:number,length:number) {
    const maxDifference: number = 2;
    const oneDifference: number = 1;
    let difference: number;

    //lengthを補正する。
    const lastArray: number = length - 1;

    /*
        indexesの中身
        0 1 2 3 4 という風に前2ページ、現在のページ、次2ページの番号を順に格納
     */
    const indexes = [];

    /*
        前2ページの計算を行う予定。
     */
    difference = index - maxDifference;
    if (difference >= 0) {
        //前2ページ分の番号を格納
        indexes.push(difference);
        indexes.push(index - oneDifference);
    } else if (difference == -1) {
        //前1ページ分の番号を格納
        indexes.push(0);
    } else if (difference == -2) {
        //格納しない
    }

    return indexes;
}

function nextPages(index:number,length:number){
    const maxDifference: number = 2;
    const oneDifference: number = 1;
    let difference: number;

    //lengthを補正する。
    const lastArray: number = length - 1;

    /*
        indexesの中身
        0 1 2 3 4 という風に前2ページ、現在のページ、次2ページの番号を順に格納
     */
    const indexes = [];

    /*
        次の2ページ分の計算を行う予定。
     */
    difference = index + maxDifference;
    if(difference < length){

        //次の2ページ分の番号を格納する
        indexes.push(index + oneDifference);
        indexes.push(difference);
    }else if(difference == length){

        //次の1ページ分の番号を格納する
        indexes.push(lastArray);
    }else if(difference > length){
        //格納しない
    }

    return indexes;
}

export {prevPages,nextPages};