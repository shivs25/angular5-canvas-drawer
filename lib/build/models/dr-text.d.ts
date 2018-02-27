import { DrRect } from "./dr-rect";
import { DrTextAlignment } from "./dr-text-alignment.enum";
export declare class DrText extends DrRect {
    text: string;
    bold: boolean;
    italic: boolean;
    size: number;
    fontFamily: string;
    hAlignment: DrTextAlignment;
    vAlignment: DrTextAlignment;
}