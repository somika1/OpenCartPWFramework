import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SearchResultsPage extends BasePage{
    private readonly searchResults:Locator;
    private readonly product:Locator;
    constructor(page:Page){
        super(page);
        this.searchResults=page.locator('div.product-thumb');
        this.product=page.locator('.product-thumb h4 a');

    }
    //page actions
    async getSearchResultsCount():Promise<number>{
        return await this.searchResults.count();
    }
    async selectProduct(productName:string):Promise<void>{
       if(await this.getSearchResultsCount()>0)
            await this.page.getByRole('link', { name: productName }).first().click();
       else
           console.log("no results found");
    }
}