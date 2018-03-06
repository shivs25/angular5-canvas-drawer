import { DrObject } from '../models/dr-object';
import { BoundingBox } from '../models/bounding-box';
export declare class DrawerObjectHelperService {
    constructor();
    projectObject(item: DrObject, bounds: BoundingBox, offsetX: number, offsetY: number): void;
    getBoundingBoxForBounds(boundingBoxes: BoundingBox[]): {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    getBoundingBox(drObjs: DrObject[]): BoundingBox;
    private getBoundingBoxForObject(drObj);
}
