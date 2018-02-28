import { DrObject } from './models/dr-object';
export interface IDrawerAppState {
    elements: DrObject[];
}
export declare const INITIAL_STATE: IDrawerAppState;
export declare function rootReducer(state: any, action: any): any;
