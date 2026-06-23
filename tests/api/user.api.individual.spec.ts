import { get } from "node:http";
import { ApiHelper } from "../../src/api/ApiHelper";
import {test,expect} from "../../src/fixtures/apiFixtures";
let AUTH_HEADER={Authorization:`Bearer ${process.env.API_AUTH_TOKEN!}`}

//to make them independent everytime we need to create a new user so create a generic function for the same

async function createUser(apiHelper:ApiHelper){
    let userData={
       name: 'Vinay API',
        email: `vinay_api@${Date.now()}.test`,
        gender: 'male',
        status: 'active' 
    }
    let response=await apiHelper.post('/public/v2/users',userData,AUTH_HEADER);
    expect(response.status).toBe(201);
    return response.body;
}


//Test 1. create a user test + verify: AAA
//API chain
//POST--> userId--> GeT/userID --->verify
test('POST --> create a user', async({apiHelper})=>{
    let userResponse=await createUser(apiHelper);
    //expect(userResponse.id).not.toBe(null);

    //get the user
    let getResponse=await apiHelper.get(`/public/v2/users/${userResponse.id}`,AUTH_HEADER);
    console.log('created new user id ', userResponse.id);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.name).toBe('Vinay API');
    console.log(getResponse.body);
    
});


//Test 2. update a user + verify : AAA
//POST ---> UserID --> PUT/UserId ---> get
test('PUT----> upadte a user', async({apiHelper})=>{
    let postResponse=await createUser(apiHelper);
     let userDataUpdated={
       name: 'Vinay API updated',
        // email: `vinay_api@${Date.now()}.test`,
        // gender: 'male',
        status: 'inactive' 
    }
    //update user
    let putResponse=await apiHelper.put(`/public/v2/users/8510120`,userDataUpdated,AUTH_HEADER);
    expect(putResponse.status).toBe(200);
    expect(putResponse.body.name).toBe(userDataUpdated.name);
    expect(putResponse.body.status).toBe(userDataUpdated.status);

    //get response
    //${postResponse.id}
    let getResponse=await apiHelper.get(`/public/v2/users/8510120`,AUTH_HEADER);
    console.log("response after modification", getResponse.body);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.name).toBe(userDataUpdated.name);
    expect(getResponse.body.status).toBe(userDataUpdated.status);
    
    
});

//Test 3. delete a user + verify : AAA
//POST ---> UserID --> Delete/UserId ---> get
test('DELETE----> delete a user', async({apiHelper})=>{
    let postResponse=await createUser(apiHelper);
     
    //delete
    let putResponse=await apiHelper.delete(`/public/v2/users/${postResponse.id}`,AUTH_HEADER);
    expect(putResponse.status).toBe(204);

    //get response
    let getResponse=await apiHelper.get(`/public/v2/users/${postResponse.id}`,AUTH_HEADER);
    expect(getResponse.status).toBe(404);
    expect(getResponse.body.message).toBe('Resource not found');

});