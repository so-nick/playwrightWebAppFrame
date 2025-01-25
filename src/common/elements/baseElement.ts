import { Page } from "@playwright/test";

export class BaseElement {

    protected page: Page;
    protected selector: string;

    constructor(page: Page, selector: string) {
        this.page = page;
        this.selector = selector;
    }

}