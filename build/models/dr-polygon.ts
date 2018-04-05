import { DrObject, DEFAULT_OBJECT } from "./dr-object";
import { DrPoint } from './dr-point';
import { DrType } from "./dr-type.enum";
import { DrStyledObject, DEFAULT_STYLED_OBJECT } from "./dr-styled-object";

export interface DrPolygon extends DrStyledObject {

    points: DrPoint[];
    isClosed: boolean
}

export const DEFAULT_POLYGON: DrPolygon = Object.assign({}, DEFAULT_STYLED_OBJECT, {
    points: [],
    isClosed: true,
    drType: DrType.POLYGON
});

export const DEFAULT_POLYLINE: DrPolygon = Object.assign({}, DEFAULT_STYLED_OBJECT, {
    points: [],
    isClosed: false,
    drType: DrType.POLYGON
});

export function createDrPolygon(properties: any): DrPolygon {
    return  Object.assign({}, DEFAULT_POLYGON, properties);
}

export function createDrPolyline(properties: any): DrPolygon {
    return  Object.assign({}, DEFAULT_POLYLINE, properties);
}

export function createDrPolygonStar(x: number, y: number, width: number, height: number, properties: any): DrPolygon {
    return  Object.assign({}, DEFAULT_POLYGON, properties, {
        points: [
            { x: x + width * 0.5, y: y },   //Top of star
            { x: x + width * 0.624, y: y + height * 0.373 },
            { x: x + width, y: x + height * 0.382 },
            { x: x + width * 0.701, y: y + height * 0.621 },
            { x: x + width * 0.809, y: y + height },
            { x: x + width * 0.5, y: y + height * 0.774 },
            { x: x + width * 0.191, y: y + height },
            { x: x + width * 0.299, y: y + height * 0.621 },
            { x: x, y: y + height * 0.382 },
            { x: x + width * 0.376, y: y + height * 0.373 }
        ]
    });
}

export function createDrPolygonTriangle(x: number, y: number, width: number, height: number, properties: any): DrPolygon {
    return  Object.assign({}, DEFAULT_POLYGON, properties, {
        points: [
            { x: x + width * 0.5, y: y },   //Top of triangle
            { x: x + width, y: y + height }, 
            { x: x, y: y + height }
        ]
    });
}


export function createDrPolygonCallout(x: number, y: number, width: number, height: number, properties: any): DrPolygon {
    return  Object.assign({}, DEFAULT_POLYGON, properties, {
        points: [
            { x: x + width * 1, y: y + height * 0.08 },
            { x: x + width * 0, y: y + height * 0.08 },
            { x: x + width * 0, y: y + height * 0.688 },
            { x: x + width * 0.619, y: y + height * 0.688 },
            { x: x + width * 0.619, y: y + height * 0.912 },
            { x: x + width * 0.753, y: y + height * 0.688 },
            { x: x + width * 1, y: y + height * 0.688 }
        ]
    });
}

export function createDrPolygonArrow(x: number, y: number, width: number, height: number, properties: any): DrPolygon {
    return  Object.assign({}, DEFAULT_POLYGON, properties, {
        points: [
            { x: x + width * 0.526, y: y + height * 0.112 },
            { x: x + width, y: y + height * 0.5 },
            { x: x + width * 0.526, y: y + height * 0.888 },
            { x: x + width * 0.522, y: y + height * 0.688 },
            { x: x, y: y + height * 0.688 },
            { x: x, y: y + height * 0.312 },
            { x: x + width * 0.526, y: y + height * 0.312 }
        ]
    });
}


