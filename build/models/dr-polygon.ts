import { DrObject, DEFAULT_OBJECT } from "./dr-object";
import { DrPoint } from './dr-point';
import { DrType } from "./dr-type.enum";

export interface DrPolygon extends DrObject {

    points: DrPoint[];
}

export const DEFAULT_POLYGON: DrPolygon = Object.assign({}, DEFAULT_OBJECT, {
    points: [],
    drType: DrType.POLYGON
});

export function createDrPolygon(properties: any): DrPolygon {
    return  Object.assign({}, DEFAULT_POLYGON, properties);
}