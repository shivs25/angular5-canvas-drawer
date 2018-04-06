import { DrStyle } from "./dr-style";
import { DrTextAlignment } from "./enums";
export interface DrTextStyle extends DrStyle {
    bold: boolean;
    italic: boolean;
    size: number;
    fontFamily: string;
    fontColor: string;
    hAlignment: DrTextAlignment;
    vAlignment: DrTextAlignment;
}
export declare const DEFAULT_TEXT_STYLE: DrTextStyle;
export declare function createDrTextStyle(properties: any): DrTextStyle;
