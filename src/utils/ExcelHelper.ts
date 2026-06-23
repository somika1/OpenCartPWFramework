
import XLSX from "xlsx";

export class ExcelHelper{
    static readExcelData(filepath:string,sheetName?:string):Record<string,string>[]{
        const workbook=XLSX.readFile(filepath);
        const sheet=workbook.Sheets[sheetName || workbook.SheetNames[0]]; //if sheetname is not supplied then by default it will take 0th sheet
        return XLSX.utils.sheet_to_json<Record<string,string>>(sheet); // convert the data to json
    }
}