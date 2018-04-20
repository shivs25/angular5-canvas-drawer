import { EventEmitter } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IDrawerAppState } from '../store';
import { DrObject } from '../models/dr-object';
import { BoundingBox } from '../models/bounding-box';
import { EditorToolType } from '../models/enums';
import { DrawerObjectHelperService } from '../services/drawer-object-helper.service';
import { ChangeHelperService } from './change-helper.service';
import { DrStyle } from '../models/dr-style';
import { DrGroupedObject } from '../models/dr-grouped-object';
import { DrImage } from '../models/dr-image';
import { TextRenderingService } from './text-rendering.service';
import { TextInfo } from '../models/text-info';
import { DrPoint } from '../models/dr-point';
export declare class DataStoreService {
    private _ngRedux;
    private _objectHelperService;
    private _changeService;
    private _textRenderService;
    undid: EventEmitter<void>;
    redid: EventEmitter<void>;
    selectionChanged: EventEmitter<DrObject[]>;
    objectsDoubleClicked: EventEmitter<DrObject[]>;
    objectsClicked: EventEmitter<DrObject[]>;
    selectedBoundsChanged: EventEmitter<BoundingBox>;
    editingChanged: EventEmitter<boolean>;
    objectsAdded: EventEmitter<DrObject[]>;
    textObjectChanged: EventEmitter<DrObject[]>;
    toolChanged: EventEmitter<void>;
    private _duplicateOffset;
    constructor(_ngRedux: NgRedux<IDrawerAppState>, _objectHelperService: DrawerObjectHelperService, _changeService: ChangeHelperService, _textRenderService: TextRenderingService);
    elements: DrObject[];
    readonly selectedObjects: DrObject[];
    readonly selectedBounds: BoundingBox;
    selectedTool: EditorToolType;
    readonly isEditing: boolean;
    readonly hideSelection: boolean;
    getUniqueName(prefix: string): string;
    private getName(prefix, showNumOne);
    private deCopyify(name);
    setHideSelection(hide: boolean): void;
    alignObjectsLeft(items: DrObject[]): void;
    alignObjectsRight(items: DrObject[]): void;
    alignObjectsCenter(items: DrObject[]): void;
    alignObjectsTop(items: DrObject[]): void;
    alignObjectsMiddle(items: DrObject[]): void;
    alignObjectsBottom(items: DrObject[]): void;
    setCalloutPointer(item: DrObject, basePoint1: DrPoint, basePoint2: DrPoint, pointerLocation: DrPoint): void;
    moveObjects(items: DrObject[], newBounds: BoundingBox): void;
    setVisibility(items: DrObject[], visibility: boolean): void;
    setUrls(items: DrObject[], url: string): void;
    setInitialUrls(items: DrImage[], url: string): void;
    setRotation(item: DrObject, rotation: number): void;
    setTextAndBounds(items: DrObject[], text: string, bounds: BoundingBox): void;
    onTextObjectsChanged(items: DrObject[]): void;
    setText(items: DrObject[], text: string): void;
    renameObjects(items: DrObject[], newName: string): void;
    setStyles(items: DrObject[], newStyle: DrStyle): void;
    getSvgText(item: DrObject): TextInfo[];
    getCalloutPath(item: DrObject): string;
    moveObjectsDown(items: DrObject[]): void;
    moveObjectsUp(items: DrObject[]): void;
    addTempObjects(items: DrObject[]): void;
    addObjects(items: DrObject[]): void;
    removeObjects(items: DrObject[]): void;
    removeTempObjects(items: DrObject[]): void;
    groupObjects(items: DrObject[]): void;
    ungroupObject(item: DrGroupedObject): void;
    duplicateObjects(items: DrObject[]): void;
    clearObjects(): void;
    setPreviewStyle(style: DrStyle): void;
    private getObjectIndex(item);
    private getNextId();
    private areElementArraysTheSameOrder(arr1, arr2);
    private alignObjects(items, alignment);
    private resetSelection();
    private buildRotatedPoints(items);
    selectObjects(items: DrObject[]): void;
    beginEdit(): void;
    endEdit(): void;
    setPreviewElements(items: DrObject[]): void;
    doubleClickObjects(items: DrObject[]): void;
    clickObjects(items: DrObject[]): void;
    undo(): void;
    redo(): void;
    getObjects(ids: number[]): DrObject[];
}
