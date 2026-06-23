import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class RegisterPage extends BasePage{
    private readonly firstName:Locator;
    private readonly lastName:Locator;
    private readonly email:Locator;
    private readonly telephone:Locator;
    private readonly password:Locator;
    private readonly passwordConfirm:Locator;
    private readonly newsletterSubscribeYes:Locator;
    private readonly newsletterSubscribeNo:Locator;
    private readonly readAndAgreeCheckbox:Locator;
    private readonly continueBtn:Locator;

    constructor(page:Page){
        super(page);
        this.firstName=page.getByRole('textbox',{name:'First Name'});
        this.lastName=page.getByRole('textbox',{name:'Last Name'});
        this.email=page.getByRole('textbox',{name:'E-mail'});
        this.telephone=page.getByRole('textbox',{name:'Telephone'});
        this.password=page.getByRole('textbox', {name:'* Password',exact:true}).first();
        this.passwordConfirm=page.getByRole('textbox',{name:'Password Confirm'});
        this.newsletterSubscribeYes=page.getByRole('radio',{name:'Yes'});
        this.newsletterSubscribeNo=page.getByRole('radio',{name:'No'});
        this.readAndAgreeCheckbox=page.getByRole('checkbox');
        this.continueBtn=page.getByRole('button', {name:'Continue'});

    }
    //page actions
    // async getRegisterPageTitle():Promise<string>{
    //     return await this.page.title();
    // }

    async fillRegisterForm(firstName:string,lastName:string,email:string,telephone:string,password:string,newsletterSubscribe:string):Promise<void>{
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.email.fill(email);
        await this.telephone.fill(telephone);
        await this.password.fill(password);
        await this.passwordConfirm.fill(password);
        if(newsletterSubscribe.toLowerCase()==='yes')
            await this.newsletterSubscribeYes.click();
        else
            await this.newsletterSubscribeNo.click();
        await this.readAndAgreeCheckbox.check();
        await this.continueBtn.click();
    }

}