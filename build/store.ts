import { DrObject } from './models/dr-object';

import { SET_ELEMENTS, MOVE_OBJECT } from './actions';
import { DrImage } from './models/dr-image';
import { DrType } from './models/dr-type.enum';

export interface IDrawerAppState {
    elements: DrObject[]
}

export const INITIAL_STATE: IDrawerAppState = {
    elements: []
}

export function rootReducer(state: any, action: any) {

    switch(action.type) {
        case SET_ELEMENTS:
            return Object.assign({}, state, {
                elements: action.elements.slice(0)
            });
        case MOVE_OBJECT:
            let item: DrObject = state.elements.find((t: any) => t.id === action.id);
            let index = state.elements.indexOf(item);
            if (DrType.IMAGE === item.drType) {
                let i: DrImage = Object.assign({}, item) as DrImage;
                i.x += action.delta.x;
                i.y += action.delta.y;
                console.log(i);
                return Object.assign({}, state, {
                    elements: [
                        ...state.elements.slice(0, index),
                        i,
                        ...state.elements.slice(index + 1)
                    ]
                });
            }
            
    }

    return state;
}