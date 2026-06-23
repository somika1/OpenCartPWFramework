import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage{
    private readonly emailId:Locator;
    private readonly password:Locator;
    private readonly forgotPasswordLink:Locator;
    private readonly loginButton:Locator;
    // private readonly logo:Locator;
    private readonly LoginErrorMessage:Locator;
    private readonly registerLink:Locator;

    constructor(page:Page){
        super(page);
        this.emailId=page.getByRole('textbox',{name:'E-Mail Address'});
        this.password=page.getByRole('textbox',{name:'Password'});
        this.forgotPasswordLink=page.getByRole('link',{name:'Forgotten Password'}).first();
        this.loginButton=page.getByRole('button',{name:'Login'});
        // this.logo=page.getByAltText('naveenopencart');
        this.LoginErrorMessage=page.locator('.alert.alert-danger.alert-dismissible');
        this.registerLink=page.getByRole('link', { name: 'Register' }).last();
    }

    //public page actions or behaviour of this page
    async goToLoginPage():Promise<void>{
        await this.page.goto('opencart/index.php?route=account/login');
    }

    // async getLoginPageTitle():Promise<string>{
    //     let pageTitle=await this.page.title();
    //     return pageTitle;
    // };

    async isForgotPwdLinkExist():Promise<boolean>{
        return await this.forgotPasswordLink.isVisible();
    };
    async doLogin(emailId:string, password:string):Promise<void>{
        console.log(`apps credentials are ${emailId} and ${password}`);
        await this.emailId.fill(emailId);
        await this.password.fill(password);
        await this.loginButton.click();
    };
    // async isLogoExist():Promise<boolean>{
    //     return await this.logo.isVisible();
    // }
    async isInvalidCredentialsErrorMsgDisplayed():Promise<boolean>{
        return await this.LoginErrorMessage.isVisible();
    }
    async goToRegisterPage():Promise<void>{
        await this.registerLink.click();
    }
}