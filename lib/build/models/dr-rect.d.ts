import { DrStyledObject } from "./dr-styled-object";
export interface DrRect extends DrStyledObject {
    x: number;
    y: number;
    width: number;
    height: number;
}
export declare const DEFAULT_RECT: DrRect;
export declare function createDrRect(properties: any): DrRect;
