import { DrObject } from './models/dr-object';

import { SET_ELEMENTS, CHANGE_OBJECT_BOUNDS } from './actions';
import { DrImage } from './models/dr-image';
import { DrType } from './models/dr-type.enum';
import { DrRect } from './models/dr-rect';

import undoable, { distinctState } from 'redux-undo';
import { combineReducers, Reducer } from 'redux';
import { DrawerObjectHelperService } from './services/drawer-object-helper.service';
import { BoundingBox } from './models/bounding-box';
import { DrPolygon } from './models/dr-polygon';
import { EditorToolType } from './models/enums';

export interface IHistory<T> {
    past: T[],
    present: T,
    future: T[]

}

export interface IElementState {
    elements: DrObject[];
    selectedIds: number[];
    selectedTool: EditorToolType;
}

export interface IDrawerAppState {
    elementState: IHistory<IElementState>;
}

export const INITIAL_ELEMENT_STATE: IElementState = {
    elements: [],
    selectedIds: [],
    selectedTool: EditorToolType.SELECTOR_TOOL
}

export const INITIAL_STATE: IDrawerAppState = {
    elementState: {
        past: [],
        present: INITIAL_ELEMENT_STATE,
        future: []
    }
}



export const elementsReducer: Reducer<IElementState> = (state: IElementState = INITIAL_ELEMENT_STATE, action: any) => {
    switch(action.type) {
        case SET_ELEMENTS:
            return Object.assign({}, state, {
                elements: action.elements ? action.elements.map(x => Object.assign({}, x)) : [],
                selectedIds: [],
                selectedTool: state.selectedTool
            });
        case CHANGE_OBJECT_BOUNDS:
            let item: DrObject = state.elements.find((t: any) => t.id === action.id);
            let index = state.elements.indexOf(item);
            let i;
            switch(item.drType) {
                case DrType.RECTANGLE:
                case DrType.TEXT:
                case DrType.IMAGE:

                    i = Object.assign({}, item, {
                        x: action.newBounds.x,
                        y: action.newBounds.y,
                        width: action.newBounds.width,
                        height: action.newBounds.height
                    });
                    break;
                case DrType.ELLIPSE:
                    i = Object.assign({}, item, {
                        x: action.newBounds.x + action.newBounds.width / 2,
                        y: action.newBounds.y + action.newBounds.height / 2,
                        rx: action.newBounds.width / 2,
                        ry: action.newBounds.height / 2
                    });
                    break;
                case DrType.POLYGON:
                    let helper: DrawerObjectHelperService = new DrawerObjectHelperService();
                    let bounds: BoundingBox = helper.getBoundingBox([item]);
                    
                    let r: DrPolygon = Object.assign({}, item) as DrPolygon;

                    let scaleX: number = action.newBounds.width / bounds.width;
                    let scaleY: number = action.newBounds.height / bounds.height;

                    for(let pt of r.points) {
                        pt.x = pt.x - (bounds.x + bounds.width / 2);
                        pt.x = pt.x * scaleX;
                        pt.x = pt.x + action.newBounds.x + action.newBounds.width / 2;

                        pt.y = pt.y - (bounds.y + bounds.height / 2);
                        pt.y = pt.y * scaleY;
                        pt.y = pt.y + action.newBounds.y + action.newBounds.height / 2;
                    }

                    i = r;

                    
                    break;
            }
            return Object.assign({}, state, {
                elements: [
                    ...state.elements.slice(0, index),
                    i,
                    ...state.elements.slice(index + 1)
                ],
                selectedIds: state.selectedIds,
                selectedTool: state.selectedTool
            });
            
        default:
            return state;
    }
}

export const undoableElementsReducer: any = undoable(elementsReducer, {
    filter: distinctState(),
    limit: 10
});

export const rootReducer: Reducer<IDrawerAppState> = combineReducers({
    elementState: undoableElementsReducer
});


