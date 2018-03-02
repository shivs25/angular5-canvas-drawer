import { DrObject } from './models/dr-object';

import { SET_ELEMENTS, CHANGE_OBJECT_BOUNDS, SELECT_OBJECTS, BEGIN_EDIT, END_EDIT } from './actions';
import { DrImage } from './models/dr-image';
import { DrType } from './models/dr-type.enum';
import { DrRect } from './models/dr-rect';

import undoable, { distinctState, excludeAction } from 'redux-undo';
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
    selectedObjects: DrObject[];
    selectedBounds: BoundingBox;
    selectedTool: EditorToolType;
}

export interface IEditingState {
    isEditing: boolean;
}

export interface IDrawerAppState {
    elementState: IHistory<IElementState>;
    editingState: IEditingState;
}

export const INITIAL_ELEMENT_STATE: IElementState = {
    elements: [],
    selectedObjects: [],
    selectedBounds: null,
    selectedTool: EditorToolType.SELECTOR_TOOL
}

export const INITIAL_EDITING_STATE: IEditingState = {
    isEditing: false
}

export const INITIAL_STATE: IDrawerAppState = {
    elementState: {
        past: [],
        present: INITIAL_ELEMENT_STATE,
        future: []
    },
    editingState: {
        isEditing: false
    }
}

export const editingReducer: Reducer<IEditingState> = (state: IEditingState = INITIAL_EDITING_STATE, action: any) => {

    switch(action.type) {
        case BEGIN_EDIT:
            return  Object.assign({}, state, {
                isEditing: true
            });
        case END_EDIT:
            return  Object.assign({}, state, {
                isEditing: false
            });
    }
    
    return state;
}

export const elementsReducer: Reducer<IElementState> = (state: IElementState = INITIAL_ELEMENT_STATE, action: any) => {
    switch(action.type) {
        case SET_ELEMENTS:
            return Object.assign({}, state, {
                elements: action.elements ? action.elements.slice(0) : [],
                selectedObject: [],
                selectedBounds: null
            });
        case CHANGE_OBJECT_BOUNDS:
            let item: DrObject = state.elements.find((t: any) => t.id === action.id);
            let index = state.elements.indexOf(item);
            let newItem: DrObject = Object.assign({}, item, action.changes);

            let newSelectedObjects: DrObject[] = null;
            let selectedItem: DrObject = state.selectedObjects ? state.selectedObjects.find((t: any) => t.id === action.id) : null;
            if (null !== selectedItem) {
                //item was in the selection
                let selectedIndex = state.selectedObjects.indexOf(selectedItem);
                newSelectedObjects = [
                    ...state.selectedObjects.slice(0, selectedIndex),
                    Object.assign({}, newItem),
                    ...state.selectedObjects.slice(selectedIndex + 1)
                ];
            }

            return Object.assign({}, state, {
                elements: [
                    ...state.elements.slice(0, index),
                    newItem,
                    ...state.elements.slice(index + 1)
                ],
                selectedBounds: Object.assign({}, action.newBounds),
                selectedObjects: newSelectedObjects ? newSelectedObjects : state.selectedObjects
            });
        case SELECT_OBJECTS:
            return Object.assign({}, state, {
                selectedBounds: Object.assign({}, action.selectedBounds),
                selectedObjects: action.items.map(x => Object.assign({}, x))
            });
        default:
            return state;
    }
}

const ACTIONS_TO_IGNORE = [SET_ELEMENTS, SELECT_OBJECTS, BEGIN_EDIT, END_EDIT];
export const undoableElementsReducer: any = undoable(elementsReducer, {
    filter: excludeAction(ACTIONS_TO_IGNORE),
    limit: 10,
    
});



export const rootReducer: Reducer<IDrawerAppState> = combineReducers({
    elementState: undoableElementsReducer,
    editingState: editingReducer
});


