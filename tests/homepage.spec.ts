import {test,expect} from "../src/fixtures/pageFixtures"


test.beforeEach(async({loginPage})=>{
    await loginPage.goToLoginPage();
    await loginPage.doLogin('james.test@gmail.com','James@123');
   
});

test('@smoke home page title test', async({homePage})=>{
    expect(await homePage.getCurrentPageTitle()).toBe('My Account');
});

test('@smoke logout link exist test', async({homePage})=>{
    expect(await homePage.isLogoutLinkExist()).toBeTruthy();
});

test('@smoke home page header test', async({homePage})=>{
    let homePageHeadersList:string[]=await homePage.getHomePageHeaders();
    expect.soft(homePageHeadersList).toHaveLength(4);
    expect.soft(homePageHeadersList).toEqual([
        'My Account',
        'My Orders',
        'My Affiliate Account',
        'Newsletter'
    ]);
    
});