
import {test as baseTest} from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { CsvHelper } from "../utils/CsvHelper";
import { RegisterPage } from "../pages/RegisterPage";
import { RegisterConfirmPage } from "../pages/RegisterConfirmPage";
import { SearchResultsPage } from "../pages/searchResultsPage";
import { ProductInfoPage } from "../pages/ProductInfoPage";
import { BasePage } from "../pages/BasePage";

//create custom type for extend() that which type of fixture it will return
type pageFixtures={
    basePage:BasePage,
    loginPage:LoginPage,
    homePage:HomePage,
    registerPage:RegisterPage,
    registerConfirmPage:RegisterConfirmPage,
    searchResultsPage:SearchResultsPage,
    productInfoPage:ProductInfoPage,
    testdata:Record<string,string>[]
};
export let test=baseTest.extend<pageFixtures>({
    basePage:async({page},use)=> {
        let basePage=new BasePage(page);
        await use(basePage);//passing this custom fixture to test() else test will not get it
    },
    loginPage:async({page},use)=> {
        let loginPage=new LoginPage(page);
        await use(loginPage);//passing this custom fixture to test() else test will not get it
    },
    homePage:async({page},use)=>{
        let homePage=new HomePage(page);
        await use(homePage);
    },
    registerPage:async({page},use)=>{
        let registerPage=new RegisterPage(page);
        await use(registerPage);
    },
    registerConfirmPage:async({page},use)=>{
        let registerConfirmPage=new RegisterConfirmPage(page);
        await use(registerConfirmPage);
    },
    searchResultsPage:async({page},use)=> {
        let searchResultsPage=new SearchResultsPage(page);
        await use(searchResultsPage);
    },
    productInfoPage:async({page},use)=>{
        let productInfoPage=new ProductInfoPage(page);
        await use(productInfoPage);
    },
    testdata:async({},use)=>{
        let testdata=CsvHelper.readCsvData(`src/data/loginData.csv`);
        await use(testdata);
    }
});

//in same file lets export expect also so that in test file only one import should be enough
export {expect} from "@playwright/test";
