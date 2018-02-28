import { DrRect } from "./dr-rect";
import { DrTextAlignment } from "./dr-text-alignment.enum";
export interface DrText extends DrRect {
    text: string;
    bold: boolean;
    italic: boolean;
    size: number;
    fontFamily: string;
    fontColor: string;
    hAlignment: DrTextAlignment;
    vAlignment: DrTextAlignment;
}
export declare const DEFAULT_TEXT: DrText;
export declare function createDrText(properties: any): DrText;
