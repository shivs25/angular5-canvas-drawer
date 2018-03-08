import { DrObject } from './models/dr-object';
import { Reducer } from 'redux';
import { BoundingBox } from './models/bounding-box';
import { EditorToolType } from './models/enums';
export interface IHistory<T> {
    past: T[];
    present: T;
    future: T[];
}
export interface IElementState {
    elements: DrObject[];
    selectedObjects: DrObject[];
    selectedBounds: BoundingBox;
    selectedTool: EditorToolType;
}
export interface IEditingState {
    isEditing: boolean;
    previewElements: DrObject[];
}
export interface IDrawerAppState {
    elementState: IHistory<IElementState>;
    editingState: IEditingState;
}
export declare const INITIAL_ELEMENT_STATE: IElementState;
export declare const INITIAL_EDITING_STATE: IEditingState;
export declare const INITIAL_STATE: IDrawerAppState;
export declare const editingReducer: Reducer<IEditingState>;
export declare const elementsReducer: Reducer<IElementState>;
export declare const undoableElementsReducer: any;
export declare const rootReducer: Reducer<IDrawerAppState>;
