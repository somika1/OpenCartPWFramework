import { Page,Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductInfoPage extends BasePage{
    private readonly productHeader:Locator;
    private readonly productImages:Locator;
    private readonly productMetaData:Locator;
    private readonly productPricing:Locator;
    private readonly productQty:Locator;
    private readonly addToCartBtn:Locator;
    private readonly productAddedSuccessMsg:Locator;
    private readonly itemCountOnCartBtn:Locator;
    private readonly shoppingCartLink:Locator;
    private map:Map<string,string|number>;

    constructor(page:Page){
        super(page);
        this.productHeader=page.getByRole('heading',{level:1});
        this.productImages=page.locator('div#content li img');
        this.productMetaData=page.locator('div#content ul.list-unstyled:nth-of-type(1) li');
        this.productPricing=page.locator('div#content ul.list-unstyled:nth-of-type(2) li');
        this.productQty=page.getByRole('textbox', { name: 'Qty' });
        this.addToCartBtn=page.getByRole('button', { name: 'Add to Cart' });
        this.productAddedSuccessMsg=page.locator('div.alert.alert-success.alert-dismissible');
        this.itemCountOnCartBtn=page.locator('span#cart-total');
        this.shoppingCartLink=page.getByRole('link', { name: 'shopping cart' }).last();
        this.map=new Map<string,string|number>();
    }

    //actions
    async getProductHeader():Promise<string>{
        return await this.productHeader.innerText();
    }
    async getProductImagesCount():Promise<number>{
        await this.productImages.first().waitFor({state:'visible'});
        return await this.productImages.count();
    }

// Brand: Apple
// Product Code: Product 18
// Reward Points: 800
// Availability: Out Of Stock
    private async getProductDetails():Promise<void>{
        let productMeta=await this.productMetaData.allInnerTexts();
        for(let productDetails of productMeta){
            let metaData=productDetails.split(":");
            let productKey=metaData[0].trim();
            let productVal=metaData[1].trim();
            this.map.set(productKey,productVal);
        }
    }

// $2,000.00
// Ex Tax: $2,000.00
     private async getProductPricing():Promise<void>{
        let productPricingData=await this.productPricing.allInnerTexts();
        // for(let price of productPricingData){
        //     this.map.set('Product Price',price);
        // }
        this.map.set('ProductPricing',productPricingData[0].trim());
        let ExTaxPricingVal=productPricingData[1].split(":")[1].trim();
        this.map.set('ExTaxPricing',ExTaxPricingVal)
        
    }

    /**
     * 
     * @returns this method is returning the complete product details: header, images, metaData, pricing
     */
    async getProductInfo():Promise<Map<string,string|number>>{
        this.map.set('ProductHeader',await this.getProductHeader());
        this.map.set('ProductImages',await this.getProductImagesCount());
        await this.getProductDetails();
        await this.getProductPricing();
        return this.map;
    }

    async setProductQuantity(quantity:number):Promise<void>{
        await this.productQty.clear();
        await this.productQty.fill(String(quantity));

    }
    async addToCart():Promise<void>{
        await this.addToCartBtn.click();
        await this.productAddedSuccessMsg.waitFor({state:'visible'});
    }
    async productAddedConfirmation():Promise<boolean>{
        await this.productAddedSuccessMsg.waitFor({state:'visible'});
       return await this.productAddedSuccessMsg.isVisible();
    }
    async getItemCountOnCartButton():Promise<string>{
        return await this.itemCountOnCartBtn.innerText();
    }
    async goToCart():Promise<void>{
        await this.shoppingCartLink.click();
    }
}