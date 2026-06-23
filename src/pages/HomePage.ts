import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";


export class HomePage extends BasePage{
    private readonly logoutLink:Locator;
    private readonly homePageHeaders:Locator;
    // private readonly search:Locator;
    // private readonly searchIcon:Locator;

    constructor(page:Page){
        super(page);
        this.logoutLink=page.getByRole('link',{name:'Logout'});
        this.homePageHeaders=page.getByRole('heading',{level:2});
        // this.search=page.getByRole('textbox',{name:"Search"});
        // this.searchIcon=page.locator('div#search button');

    }
    //page actions
    //will get it from base page
    // async gethomePageTitle():Promise<string>{
    //     return await this.page.title();
    // }
    async isLogoutLinkExist():Promise<boolean>{
        return await this.logoutLink.isVisible();
    }
    async getHomePageHeaders():Promise<string[]>{
        let headerList:string[]=await this.homePageHeaders.allInnerTexts();
        return headerList;
    }

    async doSearch(productName:string):Promise<void>{
        console.log("product name is ", productName);
        await this.search.fill(productName);//getting from base page
        await this.searchIcon.click();//getting from base page
    }


}