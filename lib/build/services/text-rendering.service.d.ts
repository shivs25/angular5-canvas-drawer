import { TextInfo } from '../models/text-info';
import { DrText } from '../models/dr-text';
export declare const SPACE_PLACEHOLDER: string;
export declare const PIPE_CHAR_PLACEHOLDER: string;
export declare const TEXT_PADDING: number;
export declare const LINE_HEIGHT_RATIO: number;
export declare class TextRenderingService {
    constructor();
    undoHtmlText(html: string): string;
    getDivText(d: DrText): string;
    getSvgText(d: DrText): TextInfo[];
    getLineHeight(o: DrText): number;
    getAscent(o: DrText): number;
    private replaceSpecialCases(s);
    private replaceSpaces(s);
    private replacePipeChar(s);
}
