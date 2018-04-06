import { DrObject } from './dr-object';
export interface DrStyledObject extends DrObject {
    showFill: boolean;
    showStroke: boolean;
    fill: string;
    stroke: string;
    strokeWidth: number;
    opacity: number;
    dashedLine: boolean;
}
export declare const DEFAULT_STYLED_OBJECT: DrStyledObject;
export declare function createDrStyledObject(properties: any): DrStyledObject;
