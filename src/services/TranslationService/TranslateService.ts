import * as cheerio from 'cheerio';

export class TranslateService {

    constructor() {}

    async translate(url: string) {
        //TODO: 
        /**
         * Pseudocode
         * Load the HTML from the URL
         * Find a way to strip the HTML tags
         * Translate the content
         * Replace the HTML tags to the position it was
         * Return the result
         */
        const $ = cheerio.load(`http://${url}`);
    }
}