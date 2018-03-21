import { TextInfo } from '../models/text-info';
import { DrText } from '../models/dr-text';
export declare const SPACE_PLACEHOLDER: string;
export declare const TEXT_PADDING: number;
export declare class TextRenderingService {
    constructor();
    undoHtmlText(html: string): string;
    getDivText(d: DrText): string;
    getSvgText(d: DrText): TextInfo[];
    private replaceSpaces(s);
}
