import { DrRect, DEFAULT_RECT } from "./dr-rect";
import { DrTextAlignment } from "./dr-text-alignment.enum";
import { DrType } from "./dr-type.enum";

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


export const DEFAULT_TEXT: DrText = Object.assign({}, DEFAULT_RECT, {
    text: "",
    bold: false,
    italic: false,
    size: 16,
    fontFamily: 'Verdana',
    fontColor: 'black',
    hAlignment: DrTextAlignment.NEAR,
    vAlignment: DrTextAlignment.NEAR,
    drType: DrType.TEXT
});

export function createDrText(properties: any): DrText {
    return  Object.assign({}, DEFAULT_TEXT, properties);
}