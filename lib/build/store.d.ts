import { DrObject } from './models/dr-object';
import { Reducer } from 'redux';
import { EditorToolType } from './models/enums';
export interface IHistory<T> {
    past: T[];
    present: T;
    future: T[];
}
export interface IElementState {
    elements: DrObject[];
    selectedIds: number[];
    selectedTool: EditorToolType;
}
export interface IDrawerAppState {
    elementState: IHistory<IElementState>;
}
export declare const INITIAL_ELEMENT_STATE: IElementState;
export declare const INITIAL_STATE: IDrawerAppState;
export declare const elementsReducer: Reducer<IElementState>;
export declare const undoableElementsReducer: any;
export declare const rootReducer: Reducer<IDrawerAppState>;
