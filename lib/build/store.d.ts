import { DrObject } from './models/dr-object';
import { Reducer } from 'redux';
export interface IHistory<T> {
    past: T[];
    present: T[];
    future: T[];
}
export interface IDrawerAppState {
    elements: IHistory<DrObject>;
}
export declare const INITIAL_STATE: IDrawerAppState;
export declare const elementsReducer: Reducer<DrObject[]>;
export declare const undoableElementsReducer: any;
export declare const rootReducer: Reducer<IDrawerAppState>;
