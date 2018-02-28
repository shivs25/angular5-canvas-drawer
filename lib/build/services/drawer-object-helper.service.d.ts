import { DrObject } from '../models/dr-object';
import { BoundingBox } from '../models/bounding-box';
export declare class DrawerObjectHelperService {
    constructor();
    getBoundingBox(drObjs: DrObject[]): BoundingBox;
    private getBoundingBoxForObject(drObj);
}
