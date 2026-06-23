import {test,expect} from "@playwright/test";

//web app -> intercept all the API calls and log them
//**/* --> wildcard pattern --> matched all urls


//normal intercept -> intercepting netwrok calls
test('intercept the calls and log them',async({page})=>{
    await page.route('**/*',async (route)=>{
        console.log(route.request().method(),// parameter route you go to all request and fetch methods
        route.request().url());// and give all urls
        await route.continue(); // just continue and goto next method until last url
    });
    //on below url whatever you go on the page any test is running, it will capture everything
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=common/home');

});

//intercept with mocking
//pw offers some basic level of mocking
//mocking means fake response or dummy response when orginal server or backend stuff is not ready then we can mock the response and do the testing
test('intercept with mocking', async({page})=>{
    let fakeProducts=[
        {name:'Mackbook pro', price:'$23.55'},
        {name:'Mackbook air', price:'$55.99'}
    ]
    await page.route('**/opencart/index.php?route=common/home', async route=>{
        await route.fulfill({
            status:200,
            contentType:'application/json',
            body:JSON.stringify(fakeProducts)// convert json object to json
        });

    });
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=common/home');
    await page.pause();
});

