import { DrObject, DEFAULT_OBJECT } from "./dr-object";
import { DrType } from "./dr-type.enum";
import { DrStyledObject, DEFAULT_STYLED_OBJECT } from "./dr-styled-object";

export interface DrPointCircle extends DrStyledObject {

    x: number;
    y: number;
    rx: number;
    ry: number;
    
}

export const DEFAULT_ELLIPSE: DrPointCircle = Object.assign({}, DEFAULT_STYLED_OBJECT, {
    x: 0,
    y: 0,
    rx: 0,
    ry: 0,
    drType: DrType.POINT
});

export function createDrPointCircle(properties: any): DrPointCircle {
    return  Object.assign({}, DEFAULT_ELLIPSE, properties);
}