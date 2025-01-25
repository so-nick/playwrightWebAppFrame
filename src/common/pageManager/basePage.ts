import * as fs from 'fs';

export abstract class BasePage {

    constructor(jsonPath: string) {
        this.loadSelectors(jsonPath);
    }

    /**
     * 
     * @param jsonPath Path to json files which should overrited to constructor
     */
    protected loadSelectors(jsonPath: string) {
        const selectors = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
        for (const key of Object.keys(selectors)) {
            if (this.hasOwnProperty(key)) {
                (this as any)[key] = selectors[key];
            }
        }
    }
}