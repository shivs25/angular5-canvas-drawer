import { DrRect } from "./dr-rect";
import { DrTextAlignment } from "./dr-text-alignment.enum";
export interface DrText extends DrRect {
    text: string;
    fitText: boolean;
    bold: boolean;
    italic: boolean;
    size: number;
    fontFamily: string;
    fontColor: string;
    hAlignment: DrTextAlignment;
    vAlignment: DrTextAlignment;
    showText: boolean;
}
export declare const DEFAULT_TEXT: DrText;
export declare function createDrText(properties: any): DrText;
