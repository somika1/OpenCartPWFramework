/**
 * to read data from json file with ts or js we dont need any external library
 * only filesystem is enough to rad file rest everything is already there in JS/TS to handle json
 * 
 */
import fs from "fs";

export class JsonHelper{
    static readJsonData(filepath:string):Record<string,string>[]{
        return JSON.parse(fs.readFileSync(filepath,"utf-8"));
    }
}