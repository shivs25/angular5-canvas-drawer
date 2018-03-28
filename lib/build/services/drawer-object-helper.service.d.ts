import { DrObject } from '../models/dr-object';
import { DrPoint } from '../models/dr-point';
import { BoundingBox } from '../models/bounding-box';
export declare class DrawerObjectHelperService {
    constructor();
    canResize(element: DrObject, checkRotation: boolean): boolean;
    getObjects(ids: number[], availableElements: DrObject[]): DrObject[];
    projectObject(item: DrObject, bounds: BoundingBox, offsetX: number, offsetY: number): void;
    getBoundingBoxForBounds(boundingBoxes: BoundingBox[]): {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    getBoundingBox(drObjs: DrObject[]): BoundingBox;
    getRotatedPoint(x: number, y: number, originX: number, originY: number, angle: number): DrPoint;
    getRotatedBoundingBox(bb: BoundingBox, rotation: number): BoundingBox;
    private getBoundingBoxForObject(drObj);
}
