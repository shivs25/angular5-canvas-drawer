import { DrObject, DEFAULT_OBJECT } from "./dr-object";
import { DrType } from "./dr-type.enum";

export interface DrRect extends DrObject {

    x: number;
    y: number;
    width: number;
    height: number;
    
}

export const DEFAULT_RECT: DrRect = Object.assign({}, DEFAULT_OBJECT, {
   x: 0,
   y: 0,
   width: 0,
   height: 0,
   drType: DrType.RECTANGLE
});

export function createDrRect(properties): DrRect {
    return  Object.assign({}, DEFAULT_RECT, properties);
}