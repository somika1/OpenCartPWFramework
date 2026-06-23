import {test,expect} from "../src/fixtures/pageFixtures";
import { CsvHelper } from "../src/utils/CsvHelper";

test.beforeEach(async({loginPage})=>{
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.USERNAME!,process.env.PASSWORD!);
});
test('search product',async({homePage})=>{
    await homePage.doSearch('Macbook');

});

// works as data provider
const  productData=CsvHelper.readCsvData('src/data/product.csv');
for (let row of productData){
    test(`verify the search results count for ${row.productname}`,async({homePage,searchResultsPage})=>{
    await homePage.doSearch(row.searchkey);
    //everything in scv is considered as string but getresultcount is returning number so do the conversion
    expect(await searchResultsPage.getSearchResultsCount()).toBe(Number(row.resultcount));

});
}

for (let row of productData){
test(`verify user is able to land on product page for ${row.productname}`,async({homePage,searchResultsPage,page})=>{
    await homePage.doSearch(row.searchkey);
    await searchResultsPage.selectProduct(row.productname);
    expect(await page.title()).toBe(row.productname);

});
}