import { DrObject } from '../models/dr-object';
import { BoundingBox } from '../models/bounding-box';
export declare class ChangeHelperService {
    constructor();
    getBoundsChanges(item: DrObject, newBounds: BoundingBox, oldBounds: BoundingBox): any;
}
