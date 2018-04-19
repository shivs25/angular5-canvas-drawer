import { DrObject } from '../models/dr-object';
import { DrPoint } from '../models/dr-point';
import { BoundingBox } from '../models/bounding-box';
import { DrCallout } from '../models/dr-callout';
export declare class DrawerObjectHelperService {
    private clipper;
    constructor();
    getObjectsAtPoint(elements: DrObject[], x: any, y: any): DrObject[];
    canResize(element: DrObject, checkRotation: boolean): boolean;
    getObjects(ids: number[], availableElements: DrObject[]): DrObject[];
    projectObject(item: DrObject, bounds: BoundingBox, offsetX: number, offsetY: number): void;
    getBoundingBoxForPoints(points: DrPoint[]): BoundingBox;
    getBoundingBoxForBounds(boundingBoxes: BoundingBox[]): {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    getBoundingBox(drObjs: DrObject[]): BoundingBox;
    getRotatedPointForSinglePoint(x: number, y: number, item: DrObject): DrPoint;
    getRotatedPoint(x: number, y: number, originX: number, originY: number, angle: number): DrPoint;
    getRotatedBounds(item: DrObject): BoundingBox;
    getRotatedBoundingBox(bb: BoundingBox, rotation: number): BoundingBox;
    getRotatedPoints(drObj: DrObject): DrPoint[];
    getUnionOfShapes(shape1: DrPoint[], shape2: DrPoint[]): DrPoint[];
    getCalloutPath(v: DrCallout): string;
    private getCorner(b, p);
    private getBoundingBoxForObject(drObj);
}
