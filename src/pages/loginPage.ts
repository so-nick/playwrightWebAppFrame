import * as fs from 'fs';
import { Page } from "@playwright/test";
import { Button } from "../common/elements/button";
import { TextBox } from "../common/elements/textBox";
import { BasePage } from "../common/pageManager/basePage";

export class LoginPage extends BasePage {
    private static readonly url = 'https://practicetestautomation.com/practice-test-login/'
    private static readonly jsonPath = './loginPage.json';
    private page: Page;

    homeButton: Button;
    practiceButton: Button;
    coursesButton: Button;
    blogButton: Button;
    contactButton: Button;
    title: TextBox;
    userNameField: TextBox;
    passwordField: TextBox;
    submitButton: Button;


    constructor(page: Page) {
        super(LoginPage.jsonPath);
        this.page = page;
    }

    protected loadSelectors() {
        const selectors = JSON.parse(fs.readFileSync(LoginPage.jsonPath, 'utf-8'));

        this.homeButton = new Button(this.page, selectors.homeButton);
        this.practiceButton = new Button(this.page, selectors.practiceButton);
        this.coursesButton = new Button(this.page, selectors.coursesButton);
        this.blogButton = new Button(this.page, selectors.blogButton);
        this.contactButton = new Button(this.page, selectors.contactButton);
        this.title = new TextBox(this.page, selectors.title);
        this.userNameField = new TextBox(this.page, selectors.userNameField);
        this.passwordField = new TextBox(this.page, selectors.passwordField);
        this.submitButton = new Button(this.page, selectors.submitButton);
    }

    async setUserName(userName: string) {
        await this.userNameField.set(userName);
    }

    async setPassword(password: string) {
        await this.passwordField.set(password);
    }

    async clickSubmit() {
        await this.submitButton.click();
    }

    async performLogin(userName: string, password: string) {
        await this.setUserName(userName);
        await this.setPassword(password);
        await this.clickSubmit;
    }


}