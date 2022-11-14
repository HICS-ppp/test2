import {google} from "googleapis";
import loadSavedCredentialsIfExist from "./GoogleDriveOne";
import authorize from "./GoogleDriveThree";

/*
未完成
 */

async function listFiles(authClient: any) {
    const drive = google.drive({version: 'v3', auth: authClient});
    const res = await drive.files.list({
        pageSize: 10,
        fields: 'nextPageToken, files(id, name)',
    });
    const files = res.data.files;
    // @ts-ignore
    if (files.length === 0) {
        console.log('No files found.');
        return;
    }

    console.log('Files:');
    // @ts-ignore
    files.map((file: { name: any; id: any; }) => {
        console.log(`${file.name} (${file.id})`);
    });
}

// @ts-ignore
authorize().then(listFiles).catch(console.error);

export {loadSavedCredentialsIfExist,};