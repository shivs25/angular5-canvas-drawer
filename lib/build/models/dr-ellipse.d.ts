import { DrObject } from "./dr-object";
export interface DrEllipse extends DrObject {
    x: number;
    y: number;
    rx: number;
    ry: number;
}
export declare const DEFAULT_ELLIPSE: DrEllipse;
export declare function createDrEllipse(properties: any): DrEllipse;
