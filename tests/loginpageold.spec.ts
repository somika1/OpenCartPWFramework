import test, { expect } from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";
import { log } from "node:console";
import { HomePage } from "../src/pages/HomePage";


let loginPage:LoginPage;
let homePage:HomePage;

test.beforeEach('go to login page', async({page})=>{
    loginPage=new LoginPage(page);
    await loginPage.goToLoginPage();
    homePage=new HomePage(page);
})
test('title test', async()=>{
   let pageTitle=await loginPage.getLoginPageTitle();
    console.log("title of page is:", pageTitle);
    expect(pageTitle).toBe('Account Login');
});
test('forgot password link exist test', async()=>{
    let isForgotPwdLinkExist=await loginPage.isForgotPwdLinkExist();
    expect(isForgotPwdLinkExist).toBeTruthy();
});

test('login test',async({page})=>{
    await loginPage.doLogin('james.test@gmail.com','James@123');
    expect.soft(await homePage.isLogoutLinkExist()).toBeTruthy();
    expect.soft(await homePage.getHomePageHeaders()).toHaveLength(4);
});