import {test as baseTest} from "@playwright/test"
import { ApiHelper } from "../api/ApiHelper"

type apiFixtures={
    apiHelper:ApiHelper
}

export let test=baseTest.extend<apiFixtures>({
    apiHelper:async({request},use)=>{
        let apiHelper=new ApiHelper(process.env.API_BASE_URL!,request);
        await use(apiHelper);
    }
});
export {expect} from "@playwright/test";