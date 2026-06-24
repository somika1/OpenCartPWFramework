import {test,expect} from "../src/fixtures/pageFixtures";
import { CsvHelper } from "../src/utils/CsvHelper";

test.beforeEach(async({loginPage})=>{
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.USERNAME!,process.env.PASSWORD!);
});
//either destructure with basepage or productinforpage 
test('company logo exist on product page',async({productInfoPage})=>{
    expect(await productInfoPage.isLogoExist()).toBeTruthy();
});

test('Footer links available on product page',async({basePage})=>{
    expect(await basePage.isFooterLinkExist()).toBeTruthy();
});

test('verify selected product image count',async({homePage,productInfoPage,searchResultsPage})=>{
    await homePage.doSearch('Macbook');
    await searchResultsPage.selectProduct('MacBook Pro');
    expect(await productInfoPage.getProductImagesCount()).toBe(4);
});

test('verify selected product header',async({homePage,productInfoPage,searchResultsPage})=>{
    await homePage.doSearch('Macbook');
    await searchResultsPage.selectProduct('MacBook Pro');
    expect(await productInfoPage.getProductHeader()).toBe('MacBook Pro');
});

const productInfo=CsvHelper.readCsvData('src/data/product.csv');
for(let row of productInfo){
    if(Number(row.resultcount)===0)
        break;
    test(`get product details test for product ${row.productname}`,async({homePage,productInfoPage,searchResultsPage})=>{
    await homePage.doSearch(row.searchkey);
    await searchResultsPage.selectProduct(row.productname);
    //productData is a map here
    let productData=await productInfoPage.getProductInfo();
    console.log("complete product details are ", productData);
    expect.soft(productData.get('ProductHeader')).toBe(row.productheader);
    expect.soft(productData.get('ProductImages')).toBe(Number(row.productimages));//everything in csv is string hence needs conversion
    expect.soft(productData.get('Brand')).toBe(row.brand);
    if(!row.rewardspoint===null)
        expect.soft(productData.get('Reward Points')).toBe(row.rewardspoint);
    expect.soft(productData.get('Availability')).toBe(row.availability);
    expect.soft(productData.get('ProductPricing')).toBe(row.productprice);
    expect.soft(productData.get('ExTaxPricing')).toBe(row.extaxprice);
});
}


test.skip('add product quantity and add to cart test',async({homePage,productInfoPage,searchResultsPage})=>{
    await homePage.doSearch('Macbook');
    await searchResultsPage.selectProduct('MacBook Pro');
    await homePage.pauseExecution(); //just to remove existing cart value for this user
    await productInfoPage.setProductQuantity(2);
    await productInfoPage.addToCart();
    let textOnCartBtn=await productInfoPage.getItemCountOnCartButton();
    console.log("text on cart button",textOnCartBtn);
    expect.soft(textOnCartBtn).toContain(' 2 item(s)');
    expect.soft(await productInfoPage.productAddedConfirmation()).toBeTruthy();
});

test('add product and go to cart',async({homePage,productInfoPage,searchResultsPage})=>{
    await homePage.doSearch('Macbook');
    await searchResultsPage.selectProduct('MacBook Pro');
    //await homePage.pauseExecution(); //just to remove existing cart value for this user
    await productInfoPage.setProductQuantity(2);
    await productInfoPage.addToCart();
    await productInfoPage.goToCart();
    expect(await productInfoPage.getCurrentPageTitle()).toBe('Shopping Cart');
});


