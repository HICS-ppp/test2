import React from "react";
import {Link} from "react-router-dom"
import {getDatabase, onValue, ref,onChildAdded} from "firebase/database";
import {writeSync} from "fs";

const Syozoku = () => {

    const userid = window.sessionStorage.getItem('SessionUserID')

    const db = getDatabase()


    // let a = 0;
    // const gr = "";
    const ary = [""];
    let len = 0;

    let test2 = "";
    let test3 = 5;

    const aaa = async () => {
        await KeyGet()
        await Time()
        await GroupGet()
    }

    //データベースからキー取得
    //所属グループ数をlengthで取得
const KeyGet = () => {
            const Test = (ref(db,'Groups_Data/'+userid+"/"))
            onChildAdded(Test,snapshot => {
                 /*   let test = snapshot.val()
                    let test2 = snapshot.key*/
                //配列にグループID登録
                    ary.push(String(snapshot.key))
               /* test3 = String(snapshot.key?.length)*/
                }
            )
       }
//二秒待つ処理
    const Time = async () => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(true)
            }, 2000)
        })
    }


    //所属しているグループのデータを取得
    const GroupGet = () => {
        let num = 0;

        //所属グループ分セッションに登録
        //numをカウントアップして変数に適用
while(num<test3){
/*    console.log(ary[num])*/

    const createUser = (ref(db, "Groups_Data/"+userid+"/"+ ary[num] + '/createUser'))
    //取ってきた値をsnapshotから変換する処理
    onValue(createUser, (snapshot) => {
        let aaa = snapshot.val()
        sessionStorage.setItem('createUser'+num, aaa)
        console.log(sessionStorage.getItem('createUser'+num))

    })
    const groupID = (ref(db, "Groups_Data/"+userid+"/"+ ary[num] + '/groupID'))
    //取ってきた値をsnapshotから変換する処理
    onValue(groupID, (snapshot) => {
        let aaa = snapshot.val()
        sessionStorage.setItem('groupID'+num, aaa)
        console.log(sessionStorage.getItem('groupID'+num))

    })
    const groupName = (ref(db, "Groups_Data/"+userid+"/"+ ary[num] + '/groupName'))
    //取ってきた値をsnapshotから変換する処理
    onValue(groupName, (snapshot) => {
        let aaa = snapshot.val()
        sessionStorage.setItem('groupName'+num, aaa)
        console.log(sessionStorage.getItem('groupName'+num))
    })
    const joinTime = (ref(db, "Groups_Data/"+userid+"/"+ ary[num] + '/joinTime'))
    //取ってきた値をsnapshotから変換する処理
    onValue(joinTime, (snapshot) => {
        let aaa = snapshot.val()
        sessionStorage.setItem('joinTime'+num, aaa)
        console.log(sessionStorage.getItem('joinTime'+num))
    })
    num++;
}

console.log(ary.length)
        len = (ary.length)
}

aaa()

    return (
        <>
            <h1>所属グループ一覧</h1>

       {/*     {len}*/}


{/*<table>*/}
{/*    <thead>*/}


{/*    <tr>*/}
{/*    <th>グループID</th>*/}
{/*    <th>グループ名</th>*/}
{/*    <th>作者名</th>*/}
{/*    <th>加入日</th>*/}
{/*    </tr>*/}
{/*    <tr>*/}
    {/*    <td>{sessionStorage.getItem('groupID1')}</td>*/}
    {/*    <td>{sessionStorage.getItem('groupName1')}</td>*/}
    {/*    <td>{sessionStorage.getItem('createUser1')}</td>*/}
    {/*    <td>{sessionStorage.getItem('joinTime1')}</td>*/}

    {/*</tr>*/}
    {/*<tr>*/}
    {/*    <td>{sessionStorage.getItem('groupID2')}</td>*/}
    {/*    <td>{sessionStorage.getItem('groupName2')}</td>*/}
    {/*    <td>{sessionStorage.getItem('createUser2')}</td>*/}
    {/*    <td>{sessionStorage.getItem('joinTime2')}</td>*/}

    {/*</tr>*/}
    {/*<tr>*/}
    {/*    <td>{sessionStorage.getItem('groupID3')}</td>*/}
    {/*    <td>{sessionStorage.getItem('groupName3')}</td>*/}
    {/*    <td>{sessionStorage.getItem('createUser3')}</td>*/}
    {/*    <td>{sessionStorage.getItem('joinTime3')}</td>*/}

    {/*</tr>*/}
    {/*<tr>*/}
    {/*    <td>{sessionStorage.getItem('groupID4')}</td>*/}
    {/*    <td>{sessionStorage.getItem('groupName4')}</td>*/}
    {/*    <td>{sessionStorage.getItem('createUser4')}</td>*/}
    {/*    <td>{sessionStorage.getItem('joinTime4')}</td>*/}

    {/*</tr>*/}
            {/*    </thead>*/}
            {/*</table>*/}

{/*length未設定*/}
{/*            {(() => {
                const items = [];
                for (let i = 1; i < 9; i++) {
                    items.push(<tr><td>{sessionStorage.getItem('groupID'+i)}</td>
                    <td>{sessionStorage.getItem('groupName'+i)}</td>
                    <td>{sessionStorage.getItem('createUser'+i)}</td>
                    <td>{sessionStorage.getItem('joinTime'+i)}</td></tr>)
                }
                return <table>
                    <thead>

                    <tr>
                        <th>グループID</th>
                        <th>グループ名</th>
                        <th>作者名</th>
                        <th>加入日</th>
                    </tr>

                    {items}
                    </thead>
                </table>;
            })()}*/}
        </>
    );
};
export default Syozoku;