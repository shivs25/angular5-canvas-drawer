import { NgRedux } from '@angular-redux/store';
import { IDrawerAppState } from '../store';
import { DrObject } from '../models/dr-object';
import { BoundingBox } from '../models/bounding-box';
export declare class DataStoreService {
    private ngRedux;
    constructor(ngRedux: NgRedux<IDrawerAppState>);
    getElements(): DrObject[];
    moveObject(item: DrObject, newBounds: BoundingBox): void;
}
