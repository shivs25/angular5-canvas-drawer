import { EventEmitter } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IDrawerAppState } from '../store';
import { DrObject } from '../models/dr-object';
import { BoundingBox } from '../models/bounding-box';
import { EditorToolType } from '../models/enums';
import { DrawerObjectHelperService } from '../services/drawer-object-helper.service';
import { MouseEventData } from '../models/mouse-event-data';
import { ChangeHelperService } from './change-helper.service';
import { DrStyle } from '../models/dr-style';
export declare class DataStoreService {
    private _ngRedux;
    private _objectHelperService;
    private _changeService;
    undid: EventEmitter<void>;
    redid: EventEmitter<void>;
    clickedObject: EventEmitter<DrObject>;
    mouseDownObject: EventEmitter<MouseEventData>;
    mouseMoveObject: EventEmitter<MouseEventData>;
    mouseUpObject: EventEmitter<MouseEventData>;
    selectionChanged: EventEmitter<DrObject[]>;
    editingChanged: EventEmitter<boolean>;
    constructor(_ngRedux: NgRedux<IDrawerAppState>, _objectHelperService: DrawerObjectHelperService, _changeService: ChangeHelperService);
    elements: DrObject[];
    readonly selectedObjects: DrObject[];
    readonly selectedBounds: BoundingBox;
    readonly selectedTool: EditorToolType;
    readonly isEditing: boolean;
    handleClickedObject(clickedObject: DrObject): void;
    handleMouseDownObject(clickedObject: MouseEventData): void;
    handleMouseMoveObject(clickedObject: MouseEventData): void;
    handleMouseUpObject(clickedObject: MouseEventData): void;
    moveObject(item: DrObject, newBounds: BoundingBox): void;
    setStyle(item: DrObject, newStyle: DrStyle): void;
    selectObjects(items: DrObject[]): void;
    beginEdit(): void;
    endEdit(): void;
    undo(): void;
    redo(): void;
}
