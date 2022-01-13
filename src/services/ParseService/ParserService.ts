import { unfurl } from 'unfurl.js'

export interface ParseDataResponse {
    title?: string,
    favicon?: string,
    "large-image"?: string,
    snippet?: string,
}

export class ParserService {

    constructor() {}

    async parse(url: string): Promise<ParseDataResponse> {
        const result = await unfurl(`http://${url}`);
        return { 
            title: result.title,
            favicon: result.favicon,
            "large-image": "",
            snippet: "",
        }
    }
}