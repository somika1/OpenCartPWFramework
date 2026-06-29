import {test,expect} from "../src/fixtures/pageFixtures";
import { LoginPage } from "../src/pages/LoginPage";
import { CsvHelper } from "../src/utils/CsvHelper";
import { ExcelHelper } from "../src/utils/ExcelHelper";
import { JsonHelper } from "../src/utils/JsonHelper";

test.beforeEach('go to login page', async({loginPage})=>{
   await loginPage.goToLoginPage();
    
});
test('@smoke title test', async({loginPage})=>{
   let pageTitle=await loginPage.getCurrentPageTitle();
    console.log("title of page is:", pageTitle);
    expect(pageTitle).toBe('Account Login');
});
test('@smoke forgot password link exist test', async({loginPage})=>{
    let isForgotPwdLinkExist=await loginPage.isForgotPwdLinkExist();
    expect(isForgotPwdLinkExist).toBeTruthy();
});

test('@smoke application logo test', async({loginPage})=>{
    expect(await loginPage.isLogoExist()).toBeTruthy();
});


test('user is able to login with environment data test',async({loginPage,homePage})=>{
    await loginPage.doLogin(process.env.USERNAME!,process.env.PASSWORD!);
    expect.soft(await homePage.isLogoutLinkExist()).toBeTruthy();
    expect.soft(await homePage.getHomePageHeaders()).toHaveLength(4);
});
//common test
test('Footer links available on product page',async({basePage})=>{
    expect(await basePage.isFooterLinkExist()).toBeTruthy();
});


/**with fixture approach we have drawbacks:-
 * fixtures run for every test() so even if test does not need csv data it will unnecessary run for that
 * below has 3 rows of data but in report it will consider only 1 test case not 3 so this is not parameterization
 * hence recommended to use without fixture 
 * and call csvhelper class readfile mthod for the test which needs data
 * and run the test inside for loop to run it multiple times 
 */

test('Invalid credentials passing through csv with fixture test',async({loginPage,testdata})=>{
    for(let data of testdata){
        await loginPage.doLogin(data.username,data.password);
        expect(await loginPage.isInvalidCredentialsErrorMsgDisplayed()).toBeTruthy();
    }
});


let testData=CsvHelper.readCsvData(`src/data/loginData.csv`);

for(let data of testData){
    //since here 3 rows are there in csv and 3 times test case will run so smae name is not allowed
    test(`Invalid credentials passing through csv without fixture test with ${data.username} and ${data.password}`,async({loginPage})=>{
        await loginPage.doLogin(data.username,data.password);
        expect(await loginPage.isInvalidCredentialsErrorMsgDisplayed()).toBeTruthy();
    
});
}

//drawbacks with excel"-
//MS -office should be installed
//xlsx format only
//maintainance - its tough if huge excel then it might corrupt
let loginExcelData=ExcelHelper.readExcelData(`src/data/loginDataExcel.xlsx`);

for(let data of loginExcelData){
    //excel will take space but not complete blank
    test(`Invalid credentials passing through excel with ${data.username} and ${data.password}`,async({loginPage})=>{
        await loginPage.doLogin(data.username,data.password);
        expect(await loginPage.isInvalidCredentialsErrorMsgDisplayed()).toBeTruthy();
    
});
};

//json
let loginJsonData=JsonHelper.readJsonData(`src/data/loginData.json`);
for(let data of loginJsonData){
    test(`Invalid credentials passing through json with ${data.username} and ${data.password}`,async({loginPage})=>{
        await loginPage.doLogin(data.username,data.password);
        expect(await loginPage.isInvalidCredentialsErrorMsgDisplayed()).toBeTruthy();
    
});
};

