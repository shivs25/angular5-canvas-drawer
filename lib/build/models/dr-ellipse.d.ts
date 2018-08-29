import { DrStyledObject } from "./dr-styled-object";
export interface DrEllipse extends DrStyledObject {
    x: number;
    y: number;
    rx: number;
    ry: number;
}
export declare const DEFAULT_ELLIPSE: DrEllipse;
export declare function createDrEllipse(properties: any): DrEllipse;
