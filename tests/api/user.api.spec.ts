import {test, expect } from "@playwright/test";

let AUTH_TOKEN={Authorization:'Bearer bc8a9282efba6657b4df422b5b917074cbe85d3163a392472dda1c93e12f263d'};
test('get user data',async({request})=>{
    let response=await request.get('https://gorest.co.in/public/v2/users',{
        headers:AUTH_TOKEN
        
    })
    let jsonResponse=await response.json();
    console.log(jsonResponse);
    console.log(response.status());
    console.log(response.statusText());
    expect(response.statusText()).toBe('OK');
    
});


test('create new user',async({request})=>{
    let user={
        name: 'Shridevi Sharma',
        email: `sharma_${Date.now()}@yahoo.example`,
        gender: 'female',
        status: 'active'
    }
    //js object is autoserialized into json 
    let response=await request.post('https://gorest.co.in/public/v2/users',{
        headers:AUTH_TOKEN,
        data:user
    })
    let jsonResponse=await response.json();
    console.log(jsonResponse);
    console.log(response.status());
    console.log(response.statusText());
    expect(response.statusText()).toBe('Created');
    
});


test('update existing user',async({request})=>{
    let user={
        name: 'Shridevi Gupta',
        email: `sharma_${Date.now()}@yahoo.example`,
        gender: 'female',
        status: 'inactive'
    }
    let response=await request.put('https://gorest.co.in/public/v2/users/8502318',{
       headers:AUTH_TOKEN,
        data:user
    })
    let jsonResponse=await response.json();
    console.log(jsonResponse);
    console.log(response.status());
    console.log(response.statusText());
    expect(response.statusText()).toBe('OK');
    
});

test('update existing user using patch',async({request})=>{
    let user={
        //name: 'Shridevi Gupta',
        email: `sharma_${Date.now()}@yahoo.example`,
        // gender: 'female',
        // status: 'inactive'
    }
    let response=await request.patch('https://gorest.co.in/public/v2/users/8502318',{
        headers:AUTH_TOKEN,
        data:user
    })
    let jsonResponse=await response.json();
    console.log(jsonResponse);
    console.log(response.status());
    console.log(response.statusText());
    expect(response.statusText()).toBe('OK');
    
});


test('delete existing user',async({request})=>{
    
    let response=await request.delete('https://gorest.co.in/public/v2/users/8502317',{
        headers:AUTH_TOKEN,
        
    })
   
    console.log(response.status());
    console.log(response.statusText());
    expect(response.statusText()).toBe('No Content');
    
});