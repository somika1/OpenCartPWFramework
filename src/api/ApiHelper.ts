import { APIRequestContext } from "@playwright/test";

export class ApiHelper{
    private readonly baseURL:string;
    private readonly request:APIRequestContext;

    constructor(baseURL:string, request:APIRequestContext){
        this.baseURL=baseURL;
        this.request=request;
    }
    //get
    async get(endpoint:string,headers?:Record<string,string>){
        let response=await this.request.get(`${this.baseURL}${endpoint}`,{
            headers:headers
        });
        return {
            body: await response.json(),
            status:response.status()
        }
    }

    //post
    async post(endpoint:string,data:object,headers?:Record<string,string>){
        let response=await this.request.post(`${this.baseURL}${endpoint}`,{
            data:data,
            headers:headers
        });
        return {
            body:await response.json(),
            status:response.status()
        }
    }

    //put
    async put(endpoint:string,data:object,headers?:Record<string,string>){
        let response=await this.request.put(`${this.baseURL}${endpoint}`,{
            data:data,
            headers:headers
        });
         return {
            body: await response.json(),
            status:response.status()
        }
    }

    //delete
    async delete(endpoint:string,headers?:Record<string,string>){
        let response=await this.request.delete(`${this.baseURL}${endpoint}`,{
            headers:headers
        });
        return {
            status:response.status(),
        
        }
    }
}