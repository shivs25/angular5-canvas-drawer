import { DrObject, DEFAULT_OBJECT } from "./dr-object";
import { DrType } from "./dr-type.enum";

export interface DrEllipse extends DrObject {

    x: number;
    y: number;
    rx: number;
    ry: number;
    
}

export const DEFAULT_ELLIPSE: DrEllipse = Object.assign({}, DEFAULT_OBJECT, {
    x: 0,
    y: 0,
    rx: 0,
    ry: 0,
    drType: DrType.ELLIPSE
});

export function createDrEllipse(properties): DrEllipse {
    return  Object.assign({}, DEFAULT_ELLIPSE, properties);
}