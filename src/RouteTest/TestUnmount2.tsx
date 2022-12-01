// 作成したscriptタグを削除する
export const clearScript2 = () => {
    const externalScript2 = document.getElementsByClassName("externalScript2");

    if (externalScript2) {
        console.log("aaaa"+externalScript2);
        while (externalScript2.length) {
            // @ts-ignore
            externalScript2.item(0).remove();
        }
    }
};
