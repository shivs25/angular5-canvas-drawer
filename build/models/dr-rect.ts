import { DrObject, DEFAULT_OBJECT } from "./dr-object";
import { DrType } from "./dr-type.enum";
import { DrStyledObject, DEFAULT_STYLED_OBJECT } from "./dr-styled-object";

export interface DrRect extends DrStyledObject {

    x: number;
    y: number;
    width: number;
    height: number;
    rounded: boolean;
    
}

export const DEFAULT_RECT: DrRect = Object.assign({}, DEFAULT_STYLED_OBJECT, {
   x: 0,
   y: 0,
   width: 0,
   height: 0,
   rounded: false,
   drType: DrType.RECTANGLE
});

export function createDrRect(properties: any): DrRect {
    return  Object.assign({}, DEFAULT_RECT, properties);
}