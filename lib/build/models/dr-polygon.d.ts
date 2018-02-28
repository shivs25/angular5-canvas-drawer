import { DrObject } from "./dr-object";
import { DrPoint } from './dr-point';
export interface DrPolygon extends DrObject {
    points: DrPoint[];
}
export declare const DEFAULT_POLYGON: DrPolygon;
export declare function createDrPolygon(properties: any): DrPolygon;
