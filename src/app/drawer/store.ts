import { DrObject } from './models/dr-object';

import { SET_ELEMENTS, CHANGE_OBJECT_BOUNDS } from './actions';
import { DrImage } from './models/dr-image';
import { DrType } from './models/dr-type.enum';
import { DrRect } from './models/dr-rect';

import undoable, { distinctState } from 'redux-undo';
import { combineReducers, Reducer } from 'redux';

export interface IDrawerAppState {
    elements: {
        past: DrObject[],
        present: DrObject[],
        future: DrObject[]
    }
}

export const INITIAL_STATE: IDrawerAppState = {
    elements: {
        past: [],
        present: [],
        future: []
    }
}


export const elementsReducer: Reducer<DrObject[]> = (state = [], action) => {
    switch(action.type) {
        case SET_ELEMENTS:
            return action.elements.slice(0);
        case CHANGE_OBJECT_BOUNDS:
            let item: DrObject = state.find(t => t.id === action.id);
            let index = state.indexOf(item);
            if (DrType.RECTANGLE === item.drType) {
                let i: any = Object.assign({}, item, {
                    x: action.newBounds.x,
                    y: action.newBounds.y,
                    width: action.newBounds.width,
                    height: action.newBounds.height
                });
                return [
                    ...state.slice(0, index),
                    i,
                    ...state.slice(index + 1)
                ];
            }
        default:
            return state;
    }
}

export const undoableElementsReducer = undoable(elementsReducer, {
    filter: distinctState(),
    limit: 10
});

export const rootReducer: Reducer<IDrawerAppState> = combineReducers({
    elements: undoableElementsReducer
});


