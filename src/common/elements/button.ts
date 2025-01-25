import { BaseElement } from "./baseElement";

export class Button extends BaseElement {

    /**
     * @description Click on button.
     */
    async click() { await this.page.click(this.selector) };

    /**
     * @description Take a name of button.
     * @returns String
     */
    async getButtonName(): Promise<string> {

        return await this.page.getAttribute(this.selector, 'value') ? '' :
            await this.page.innerText(this.selector);
    }
}