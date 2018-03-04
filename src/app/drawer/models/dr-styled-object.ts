import { DrType } from "./dr-type.enum";
import { DrObject, DEFAULT_OBJECT } from './dr-object';

export interface DrStyledObject extends DrObject {
    showFill: boolean;
    showStroke: boolean;
    fill: string;
    stroke: string;
    strokeWidth: number;
    opacity: number;
    dashedLine: boolean;
    
}

export const DEFAULT_STYLED_OBJECT: DrStyledObject = Object.assign({}, DEFAULT_OBJECT, {
    showFill: true,
    showStroke: true,
    fill: "white",
    stroke: "black",
    strokeWidth: 1,
    opacity: 1,
    dashedLine: false
 });

 export function createDrStyledObject(properties: any): DrStyledObject {
    return  Object.assign({}, DEFAULT_STYLED_OBJECT, properties);
}