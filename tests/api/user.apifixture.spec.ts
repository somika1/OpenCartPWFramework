import {test,expect} from "../../src/fixtures/apiFixtures";
let AUTH_HEADER={Authorization:`Bearer ${process.env.API_AUTH_TOKEN!}`}

let userId:number;

test.describe.serial('CRUD--> operations',()=>{


test('GET ----> get users with generic method', async({apiHelper})=>{
    let response=await apiHelper.get('/public/v2/users',AUTH_HEADER);
   // console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
});

test('POST----> create new user',async({apiHelper})=>{
    let userData={
       name: 'Vinay API',
        email: `vinay_api@${Date.now()}.test`,
        gender: 'male',
        status: 'active' 
    }
    let response=await apiHelper.post('/public/v2/users',userData,AUTH_HEADER);
    userId=response.body.id;
    console.log("user id is :", userId);
    expect(response.status).toBe(201);
    expect(response.body.id).not.toBe(null);
    expect(response.body.name).toBe(userData.name);
});


//put is dependent on post for user id so we cannot run sperarately
//if we run tigether also then multiple workers can be created and run  test individually
// so need to execute them sequentially either we can exectute with 1 worker or we can define test group and run in serial mode
test('PUT----> update user data',async({apiHelper})=>{
    let userDataUpdated={
       name: 'Tom API updated',
        // email: `vinay_api@${Date.now()}.test`,
        // gender: 'male',
        status: 'inactive' 
    }
    console.log('user id in put', userId);
    let response=await apiHelper.put(`/public/v2/users/${userId}`,userDataUpdated,AUTH_HEADER);
    
    expect(response.status).toBe(200);
    //expect(response.body.id).not.toBe(null);
    expect(response.body.name).toBe(userDataUpdated.name);
    expect(response.body.status).toBe(userDataUpdated.status);
});

test('DELETE ---> delete user',async({apiHelper})=>{
    let response=await apiHelper.delete(`/public/v2/users/${userId}`,AUTH_HEADER);
    expect(response.status).toBe(204);
    //expect(response.body.message).toBe('Resource not found')
})
});