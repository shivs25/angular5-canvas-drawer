import { DrStyle, DEFAULT_STYLE } from "./dr-style";
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

export const DEFAULT_TEXT_STYLE: DrTextStyle = Object.assign({}, DEFAULT_STYLE, {
    bold: false,
    italic: false,
    size: 16,
    fontFamily: 'Verdana',
    fontColor: '#000000',
    hAlignment: DrTextAlignment.NEAR,
    vAlignment: DrTextAlignment.NEAR
});

export function createDrTextStyle(properties: any): DrTextStyle {
    return  Object.assign({}, DEFAULT_TEXT_STYLE, properties);
}