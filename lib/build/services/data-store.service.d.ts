import { NgRedux } from '@angular-redux/store';
import { IDrawerAppState } from '../store';
import { DrObject } from '../models/dr-object';
import { BoundingBox } from '../models/bounding-box';
import { EditorToolType } from '../models/enums';
export declare class DataStoreService {
    private ngRedux;
    constructor(ngRedux: NgRedux<IDrawerAppState>);
    elements: DrObject[];
    readonly selectedIds: number[];
    readonly selectedTool: EditorToolType;
    moveObject(item: DrObject, newBounds: BoundingBox): void;
    undo(): void;
    redo(): void;
}
