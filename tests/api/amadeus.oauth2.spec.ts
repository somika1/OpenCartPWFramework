import { test, expect } from '@playwright/test';

let OAUTH_CONFIG = {
    tokenURL: 'https://test.api.amadeus.com/v1/security/oauth2/token',
    clientId: process.env.OAUTH_CLIENT_ID!,
    clientSecret: process.env.OAUTH_CLIENT_SECRET!,
    grantType: process.env.GRANT_TYPE!
}

let access_token:string;
//generate token
test.beforeEach('Generate access token',async({request})=>{
    let response=await request.post(OAUTH_CONFIG.tokenURL, {
        form: {
            grant_type: OAUTH_CONFIG.grantType,
            client_id: OAUTH_CONFIG.clientId,
            client_secret: OAUTH_CONFIG.clientSecret
            //or directly but better to write above ways it helps when multiple test cases are there , key should have same format like grant_type
            // grant_type: process.env.GRANT_TYPE!,
            // client_id: process.env.OAUTH_CLIENT_ID!,
            // client_secret: process.env.OAUTH_CLIENT_SECRET!

    }});
    expect(response.status()).toBe(200);
    let postResponseBody=await response.json();
    access_token=postResponseBody.access_token;
    console.log("access token retrieved ", access_token);
    
});

test('GET ---> get location data', async({request})=>{
    ////https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY,AIRPORT&keyword=MUC&countryCode=DE
    let baseURL = 'https://test.api.amadeus.com';
    let endPointURL = '/v1/reference-data/locations';
    let queryParams={
        subType:'CITY,AIRPORT',
        keyword:'MUC',
        countryCode:'DE'
    };
    let response=await request.get(`${baseURL}${endPointURL}`,{
       headers:{
            Authorization:`Bearer ${access_token}`
        },
        params:queryParams,
    });
    expect(response.status()).toBe(200);
    let getResponseBody=await response.json();
    console.log('get response body ', getResponseBody);
    //print count
    expect(getResponseBody.meta.count).toBe(2);
    console.log(getResponseBody.meta.links.self);
    console.log(getResponseBody.data[1]);
    expect(getResponseBody.data[1].name).toBe('MUNICH INTERNATIONAL');

})


