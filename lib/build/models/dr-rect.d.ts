import { DrObject } from "./dr-object";
export interface DrRect extends DrObject {
    x: number;
    y: number;
    width: number;
    height: number;
}
export declare const DEFAULT_RECT: DrRect;
export declare function createDrRect(properties: any): DrRect;
