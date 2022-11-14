import {promises as fs} from "fs";
import {google} from "googleapis";
import path from "path";
import process from "process";

const TOKEN_PATH = path.join(process.cwd(), 'token.json');

async function loadSavedCredentialsIfExist() {
    try {
        const content = await fs.readFile(TOKEN_PATH);
        const credentials = JSON.parse(content.toString());
        return google.auth.fromJSON(credentials);
    } catch (err) {
        return null;
    }
}


export default loadSavedCredentialsIfExist();