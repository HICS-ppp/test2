import {authenticate} from "@google-cloud/local-auth";
import {loadSavedCredentialsIfExist} from "./GoogleDriveAPI";
import path from "path";
import process from "process";
import {saveCredentials} from "./GoogleDriveTwo";


const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

async function authorize() {
    let client = await loadSavedCredentialsIfExist();
    if (client) {
        return client;
    }
    client = await authenticate({
        scopes: SCOPES,
        keyfilePath: CREDENTIALS_PATH,
    });
    if (client.credentials) {
        await saveCredentials(client);
    }
    return client;
}

export default authorize();