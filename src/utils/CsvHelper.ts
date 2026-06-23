import fs from 'fs';
import {parse} from 'csv-parse/sync'; //sync version is much simpler

export class CsvHelper{
      static readCsvData(filepath:string):Record<string,string>[]{
        //readFileSync to read the file from a given path , sync means wait until the file is read completely
        //utf-8: without this data will not be readable it will buffer of bytes form
        //with this it converts into text and make it readable 
        //its basically a character encoding
        //UTF-8 converts the raw bytes from the file into a readable string, which can then be processed by CSV parsers or other text-processing logic.
        let fileContent=fs.readFileSync(filepath,'utf-8');
        return parse(fileContent,{
            columns:true,
            skip_empty_lines:true,
            trim:true
        }) as Record<string, string>[];
      }
}

// CSV helper code to implement execution:yes or no:

// import fs from "fs";
// import { parse } from 'csv-parse/sync';

// export class csvHelper {
//     static readCsv(filePath: string): Record<string, string>[] {
//         const records = parse(fs.readFileSync(filePath, "utf-8"), {
//             columns: true,
//             skip_empty_lines: true,
//             trim: true,
//         }) as Record<string, string>[];
        
//         return records.filter(row => row.execution?.toLowerCase() == 'yes');
//     }
// }