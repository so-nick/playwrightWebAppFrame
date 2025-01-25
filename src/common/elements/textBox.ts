import { BaseElement } from "./baseElement";

export class TextBox extends BaseElement {

    /**
     * @description Set value to field.
     * @param value Value which will be set to field.
     */
    async set(value: string) {

        if (await this.get()) { await this.clear() };
        await this.fill(value);
    }

    /**
     * @description Take value from field.
     * @returns String.
     */
    async get(): Promise<String> {
        return await this.page.getAttribute(this.selector, 'value') ? '' :
            await this.page.innerText(this.selector);
    }


    /**
     * @description Clear field.
     */
    async clear() {
        await this.page.fill(this.selector, '');
    }


    private async fill(value: string) {
        await this.page.fill(this.selector, value);
    }

}