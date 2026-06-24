import {expect, test} from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";
import { HomePage } from "../src/pages/HomePage";

let loginPage:LoginPage;
let homePage:HomePage;
test.beforeEach(async({page})=>{
    loginPage=new LoginPage(page);
    await loginPage.goToLoginPage();
    await loginPage.doLogin('james.test@gmail.com','James@123');
    homePage=new HomePage(page);
});

test.skip('home page title test', async()=>{
    expect(await homePage.gethomePageTitle()).toBe('My Account');
});

test('logout link exist test', async()=>{
    expect(await homePage.isLogoutLinkExist()).toBeTruthy();
});

test('home page header test', async()=>{
    let homePageHeadersList:string[]=await homePage.getHomePageHeaders();
    expect.soft(homePageHeadersList).toHaveLength(4);
    expect.soft(homePageHeadersList).toEqual([
        'My Account',
        'My Orders',
        'My Affiliate Account',
        'Newsletter'
    ]);
    
});