import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class RegisterConfirmPage extends BasePage{
    private readonly registerSuccessMsg:Locator;

    constructor(page:Page){
        super(page);
        this.registerSuccessMsg=page.getByRole('heading',{name:'Your Account Has Been Created!',level:1});
        
    }

    async isRegisterConfirmed():Promise<boolean>{
        await this.registerSuccessMsg.waitFor({state:'visible'});
        return await this.registerSuccessMsg.isVisible();
    }
}