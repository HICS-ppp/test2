// 作成したscriptタグを削除する
export const clearScript = () => {
    const externalScript = document.getElementsByClassName("externalScript");

    if (externalScript) {
        console.log("aaaa"+externalScript);
        while (externalScript.length) {
            // @ts-ignore
            externalScript.item(0).remove();
        }
    }
};
