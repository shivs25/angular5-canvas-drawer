import { DrPoint } from './dr-point';
import { DrStyledObject } from "./dr-styled-object";
export interface DrPolygon extends DrStyledObject {
    points: DrPoint[];
    isClosed: boolean;
}
export declare const DEFAULT_POLYGON: DrPolygon;
export declare const DEFAULT_POLYLINE: DrPolygon;
export declare function createDrPolygon(properties: any): DrPolygon;
export declare function createDrPolyline(properties: any): DrPolygon;
export declare function createDrPolygonStar(x: number, y: number, width: number, height: number, properties: any): DrPolygon;
export declare function createDrPolygonTriangle(x: number, y: number, width: number, height: number, properties: any): DrPolygon;
export declare function createDrPolygonCallout(x: number, y: number, width: number, height: number, properties: any): DrPolygon;
export declare function createDrPolygonArrow(x: number, y: number, width: number, height: number, properties: any): DrPolygon;
