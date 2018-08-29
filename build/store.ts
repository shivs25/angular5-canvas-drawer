import { DrObject } from './models/dr-object';

import { SET_ELEMENTS, SELECT_OBJECTS, BEGIN_EDIT, END_EDIT, SET_TOOL, REMOVE_OBJECTS, CHANGE_OBJECTS_PROPERTIES, ADD_OBJECTS, CLEAR_OBJECTS, REPLACE_OBJECTS, INIT_ELEMENTS, SET_PREVIEW_ELEMENTS, CHANGE_PREVIEW_STYLES, SET_HIDE_SELECTION, ADD_TEMP_OBJECTS, REMOVE_TEMP_OBJECTS, SET_INITIAL_URLS, OVERWRITE_OBJECT } from './actions';
import { DrImage } from './models/dr-image';
import { DrType } from './models/dr-type.enum';
import { DrRect } from './models/dr-rect';

import undoable, { excludeAction } from 'redux-undo';
import { combineReducers, Reducer } from 'redux';
import { DrawerObjectHelperService } from './services/drawer-object-helper.service';
import { BoundingBox } from './models/bounding-box';
import { DrPolygon } from './models/dr-polygon';
import { EditorToolType } from './models/enums';
import { DrGroupedObject, createDrGroupedObject } from './models/dr-grouped-object';
import { cloneDeep } from './utilities';


export interface IHistory<T> {
    past: T[],
    present: T,
    future: T[]

}

export interface IElementState {
    elements: DrObject[];
    selectedObjects: DrObject[];
    hideSelection: boolean;
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

export const INITIAL_ELEMENT_STATE: IElementState = {
    elements: [],
    selectedObjects: [],
    hideSelection: false,
    selectedBounds: null,
    selectedTool: EditorToolType.SELECTOR_TOOL
}

export const INITIAL_EDITING_STATE: IEditingState = {
    isEditing: false,
    previewElements: []
}

export const INITIAL_STATE: IDrawerAppState = {
    elementState: {
        past: [],
        present: INITIAL_ELEMENT_STATE,
        future: []
    },
    editingState: {
        isEditing: false,
        previewElements: []
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
        case SET_PREVIEW_ELEMENTS:
            return Object.assign({}, state, {
                previewElements: action.elements ? action.elements.slice(0) : []
            });
        case CHANGE_PREVIEW_STYLES:
            return Object.assign({}, state, {
                previewElements: findAndSetNestedChanges(state.previewElements, action.changes)
            });
            
            
    }
    
    return state;
}

export const elementsReducer: Reducer<IElementState> = (state: IElementState = INITIAL_ELEMENT_STATE, action: any) => {
    switch(action.type) {
        case INIT_ELEMENTS: {
            return Object.assign({}, state, {
                elements: action.elements ? action.elements.slice(0) : []
            });
        }
        case SET_ELEMENTS: {
            return Object.assign({}, state, {
                elements: action.elements ? action.elements.slice(0) : []
            });
        }
        case OVERWRITE_OBJECT: {
            return Object.assign({}, state, {
                elements: findAndReplaceNestedItems(state.elements, [{ id: action.newObject.id, changes: action.newObject }])
            });
        }
        case CHANGE_OBJECTS_PROPERTIES: {
            
            
            return Object.assign({}, state, {
                elements: findAndReplaceNestedItems(state.elements, action.changes)
            });
        }
        case SET_INITIAL_URLS: {
            return Object.assign({}, state, {
                elements: findAndReplaceNestedItems(state.elements, action.changes)
            });
        }
        case ADD_OBJECTS: {
            return Object.assign({}, state, {
                elements: [
                  ...state.elements,
                  ...action.newItems.map((x: DrObject) => cloneDeep(x))
                ]
              });

        }
        case ADD_TEMP_OBJECTS: {
            return Object.assign({}, state, {
                elements: [
                  ...state.elements,
                  ...action.newItems.map((x: DrObject) => cloneDeep(x))
                ]
              });

        }
        case REMOVE_OBJECTS: {
            return Object.assign({}, state, {
                elements: findAndRemoveNestedObjects(state.elements, action.ids)
            });
        }
        case REMOVE_TEMP_OBJECTS: {
            return Object.assign({}, state, {
                elements: findAndRemoveNestedObjects(state.elements, action.ids)
            });
        }
        case REPLACE_OBJECTS: {
            let newElements: DrObject[] = [
                ...state.elements.slice(0, action.zIndex),
                ...action.itemsToAdd,
                ...state.elements.slice(action.zIndex)
            ];
            let idsToRemove: number[] = action.itemsToRemove.map((x: DrObject) => x.id);
            let filteredElements: DrObject[] = newElements.filter((x: DrObject) => idsToRemove.indexOf(x.id) < 0);
            console.log(idsToRemove);
            console.log(filteredElements);
            return  Object.assign({}, state, {
                elements: filteredElements
            });
        }
        case SELECT_OBJECTS: {
            return Object.assign({}, state, {
                selectedBounds: null !== action.selectedBounds ? Object.assign({}, action.selectedBounds) : null,
                selectedObjects: action.items.map(x => Object.assign({}, x))
            });
        }
        case CLEAR_OBJECTS: {
            return Object.assign({}, state, {
                elements: []
            });
        }
        case SET_TOOL: {
            return  Object.assign({}, state, {
                selectedTool: action.tool
            });
        }
        case SET_HIDE_SELECTION: {
            return Object.assign({}, state, {
                hideSelection: action.hideSelection
            });
        }
        default:
            return state;
    }
}

function findAndRemoveNestedObjects(items: DrObject[], ids: number[]): DrObject[] {
    let returnValue: DrObject[] = [];

    for(let o of items) {
        if (ids.indexOf(o.id) < 0) {
            if (DrType.GROUPED_OBJECT === o.drType) {
                returnValue.push(Object.assign({}, o, { objects: findAndRemoveNestedObjects((o as DrGroupedObject).objects, ids) }));
            }
            else {
                returnValue.push(o);
            }
        }
    }

    return returnValue;
}


function findAndReplaceNestedItems(items: DrObject[], changes: any[]): DrObject[] {
    let newArray: DrObject[] = [];
    let newItem: DrObject;
    let itemChanges: any;
    let selectedItem: DrObject;
    let selectedIndex: number;
    for(let i of items) {
        itemChanges = changes.find((t: any) => t.id === i.id);
        if (itemChanges) {
            newItem = Object.assign({}, cloneDeep(i), itemChanges.changes);
        }
        else {
            if (DrType.GROUPED_OBJECT === i.drType) {
                newItem = Object.assign({}, cloneDeep(i));
                Object.assign(newItem, { objects: findAndReplaceNestedItems((newItem as DrGroupedObject).objects, changes) });
            }
            else {
                newItem = i;
            }
        }

        newArray.push(newItem);
    }
    return newArray;
}   

function findAndSetNestedChanges(items: DrObject[], changes: any): DrObject[] {
    let newArray: DrObject[] = [];
    let newItem: DrObject;
    let itemChanges: any;
    let selectedItem: DrObject;
    let selectedIndex: number;
    for(let i of items) {
        if (DrType.GROUPED_OBJECT === i.drType) {
            newItem = Object.assign({}, cloneDeep(i));
            Object.assign(newItem, { objects: findAndSetNestedChanges((newItem as DrGroupedObject).objects, changes) });
        }
        else {
            newItem = Object.assign(cloneDeep(i), changes);
        }

        newArray.push(newItem);
    }
    return newArray;
}  

const ACTIONS_TO_IGNORE = [
    INIT_ELEMENTS, 
    SELECT_OBJECTS, 
    BEGIN_EDIT, 
    END_EDIT, 
    SET_TOOL, 
    SET_PREVIEW_ELEMENTS, 
    CHANGE_PREVIEW_STYLES, 
    SET_HIDE_SELECTION, 
    REMOVE_TEMP_OBJECTS,
    SET_INITIAL_URLS,
    OVERWRITE_OBJECT
];

export const undoableElementsReducer: any = undoable(elementsReducer, {
    filter: excludeAction(ACTIONS_TO_IGNORE),
    limit: 10
});



export const rootReducer: Reducer<IDrawerAppState> = combineReducers({
    elementState: undoableElementsReducer,
    editingState: editingReducer
});
