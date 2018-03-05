import { DrPoint } from './dr-point';
import { DrStyledObject } from "./dr-styled-object";
export interface DrPolygon extends DrStyledObject {
    points: DrPoint[];
}
export declare const DEFAULT_POLYGON: DrPolygon;
export declare function createDrPolygon(properties: any): DrPolygon;
