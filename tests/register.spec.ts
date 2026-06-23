
import {test,expect} from "../src/fixtures/pageFixtures"
import { CsvHelper } from "../src/utils/CsvHelper";
import { ExcelHelper } from "../src/utils/ExcelHelper";
import { JsonHelper } from "../src/utils/JsonHelper";

test.beforeEach(async({loginPage})=>{
    await loginPage.goToLoginPage();
    await loginPage.goToRegisterPage();
});

test('Register page title test',async({registerPage})=>{
    expect(await registerPage.getCurrentPageTitle()).toBe('Register Account');
})
let registerData=CsvHelper.readCsvData('src/data/registerData.csv');
for(let data of registerData){
test(`New user registration for ${data.firstname} using csv test`,async({registerPage,registerConfirmPage})=>{
    await registerPage.fillRegisterForm(data.firstname,data.lastname,data.email,data.telephone,data.password,data.newslettersubscribe);
    expect(await registerConfirmPage.isRegisterConfirmed()).toBeTruthy();
})
}
const regData=JsonHelper.readJsonData('src/data/registerData.json');
for(let data of regData){
    test(`verify new user registration for ${data.firstname} and ${data.lastname} using json test`,async({registerPage,registerConfirmPage})=>{
    await registerPage.fillRegisterForm(data.firstname,data.lastname,data.email,data.telephone,data.password,data.newslettersubscribe);
    expect(await registerConfirmPage.isRegisterConfirmed()).toBeTruthy();
})
}

const regExcelData=ExcelHelper.readExcelData('src/data/opencartData.xlsx');
for(let data of regData){
    test(`verify new user registration for ${data.firstname} and ${data.lastname} using excel test`,async({registerPage,registerConfirmPage})=>{
    await registerPage.fillRegisterForm(data.firstname,data.lastname,data.email,data.telephone,data.password,data.newslettersubscribe);
    expect(await registerConfirmPage.isRegisterConfirmed()).toBeTruthy();
});
}

