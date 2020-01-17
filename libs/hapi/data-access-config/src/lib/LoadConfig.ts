import {join} from "path";
import {existsSync, readFileSync} from "fs";

export function loadConfig(): ILoadConfig {
  try {
    return readConfigFileSync('./assets/config/config.json');
  } catch (e) {
    console.log('error reading file', e);
    throw new Error(e.message);
  }
}

export function readConfigFileSync(
  fileName: string
): any {
  const configPath = join(__dirname, fileName);
  if (!existsSync(configPath)) {
    throw new Error('Config file does not exist at ' + configPath);
  }
  let jsonData: any;
  try {
     jsonData = JSON.parse(readFileSync(configPath, 'utf8'));

     return jsonData['development'];
  } catch (err) {
    throw new Error(
      `Config file at ${configPath} does not parse into JSON; ${err.error}`
    );
  }
}

export interface ILoadConfig {
  "apiKey": string,
  "apiURL": string
}
