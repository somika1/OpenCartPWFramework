//schema - a blueprint or contract between client and server
// it tells the type of response
// also about the required fields in the response
//its important to validate schema to make sure each items in response is valid and no property is missing
//can be include as part of smoke test also
//in pw, there no direct method but we can install 3rd library ajv from node
//schema validation types - 1. single object, 2. array of objects

import {test,expect} from "../../src/fixtures/apiFixtures";
import Ajv from "ajv";

let AUTH_HEADER={Authorization:`Bearer ${process.env.API_AUTH_TOKEN}`};

//set up ajv
let ajv=new Ajv();

//single object schema from response :
/**{
    "id": 8511693,
    "name": "Vinay API",
    "email": "vinay_api@1781777888374.test",
    "gender": "male",
    "status": "active"
} */
let userSchema={
  "type": "object",
  "properties": {
    "id": {
      "type": "number"
    },
    "name": {
      "type": "string"
    },
    "email": {
      "type": "string"
    },
    "gender": {
      "type": "string"
    },
    "status": {
      "type": "string"
    }
  },
  "required": [
    "id",
    "name",
    "email",
    "gender",
    "status"
  ]
};

test('GET --> get a user', async({apiHelper})=>{
    let userData={
        name:'schema test',
        email:`automation@${Date.now()}.com`,
        gender:'male',
        status:'active'
    }
    //create a user
    let postResponse=await apiHelper.post('/public/v2/users',userData,AUTH_HEADER);
    expect(postResponse.status).toBe(201);
    let userId=postResponse.body.id;

    //get a user
    let getResponse=await apiHelper.get(`/public/v2/users/${userId}`,AUTH_HEADER);
    expect(getResponse.status).toBe(200);

    //compile the schema
    let validate=ajv.compile(userSchema);
    //check if response is valid with compiled schema
    let isSchemaValid=validate(getResponse.body);
    if(!isSchemaValid)
        console.log("Schema error ",validate.errors);
    expect(isSchemaValid).toBeTruthy();

});
// schema validation with array object
 let userArrayObject={
"type": "array",
  "items": userSchema
}

//get users
test('GET ---> get all users', async({apiHelper})=>{
    let getReposnse=await apiHelper.get('/public/v2/users', AUTH_HEADER);
    expect(getReposnse.status).toBe(200);

    //schema validation
    let validate=ajv.compile(userArrayObject);
    let isSchemaValid=validate(getReposnse.body);
    if(!isSchemaValid)
        console.log("schema error", validate.errors);
    expect(isSchemaValid).toBeTruthy();
});
 


