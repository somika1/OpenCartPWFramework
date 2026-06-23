import { Locator, Page } from "@playwright/test";

    //base page for common locators and actions

    
export class BasePage{
    protected readonly page:Page;
    protected readonly logo:Locator;
    protected readonly search:Locator;
    protected readonly searchIcon:Locator;
    protected readonly cartButton:Locator;
    protected readonly footerLinks:Locator;

    constructor(page:Page){
        this.page=page;
        this.logo=page.getByAltText('naveenopencart');
        this.search=page.getByRole('textbox',{name:"Search"});
        this.searchIcon=page.locator('div#search button');
        this.cartButton=page.locator('#cart button');
        this.footerLinks=page.locator('footer a');
    }
    //actions
     async isLogoExist():Promise<boolean>{
        return await this.logo.isVisible();
    }
    // async doSearch(productName:string):Promise<void>{
    //     console.log("product name is ", productName);
    //     await this.search.fill(productName);
    //     await this.searchIcon.click();
    // }
    async isCartButtonExist():Promise<boolean>{
        return await this.cartButton.isVisible();
    }
    async isFooterLinkExist():Promise<boolean>{
        return await this.footerLinks.isVisible();
    }

    async isSearchboxVisible():Promise<boolean>{
        return await this.search.isVisible();
    }
    async getCurrentPageTitle():Promise<string>{
        return await this.page.title();
    }
    async getPageUrl():Promise<string>{
        return this.page.url();
    }
    async waitForPageLoad():Promise<void>{
        await this.page.waitForLoadState('load');
    }
    async getScreenshot(name:string):Promise<void>{
        await this.page.screenshot({
            fullPage:true,
            path:`reports/screenshot/${name}.png`
        })
    }
    async pauseExecution():Promise<void>{
        await this.page.pause();
    }

}