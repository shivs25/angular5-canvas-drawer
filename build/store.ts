import { DrObject } from './models/dr-object';

import { SET_ELEMENTS, SELECT_OBJECTS, BEGIN_EDIT, END_EDIT, CHANGE_Z_INDEX, SET_TOOL, GROUP_OBJECTS, UNGROUP_OBJECT, REMOVE_OBJECTS, CHANGE_OBJECTS_PROPERTIES, ADD_OBJECTS, CLEAR_OBJECTS } from './actions';
import { DrImage } from './models/dr-image';
import { DrType } from './models/dr-type.enum';
import { DrRect } from './models/dr-rect';

import undoable, { distinctState, excludeAction } from 'redux-undo';
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
        case SET_ELEMENTS: {
            return Object.assign({}, state, {
                elements: action.elements ? action.elements.slice(0) : [],
                selectedObjects: [],
                selectedBounds: null
            });
        }
        case CHANGE_OBJECTS_PROPERTIES: {
            
            let newArray: DrObject[] = [];
            let newItem: DrObject;
            let newSelectedObjects: DrObject[] = state.selectedObjects.slice(0);
            let changes: any;
            let selectedItem: DrObject;
            let selectedIndex: number;
            for(let i of state.elements) {
                changes = action.changes.find((t: any) => t.id === i.id);
                if (changes) {
                    newItem = Object.assign({}, cloneDeep(i), changes.changes);
                }
                else {
                    newItem = i;
                }

                newArray.push(newItem);

                selectedItem = newSelectedObjects ? newSelectedObjects.find((t: any) => t.id === newItem.id) : null;
                if (selectedItem && null !== selectedItem) {
                    //item was in the selection
                    selectedIndex = newSelectedObjects.indexOf(selectedItem);
                    newSelectedObjects = [
                        ...newSelectedObjects.slice(0, selectedIndex),
                        cloneDeep(newItem),
                        ...newSelectedObjects.slice(selectedIndex + 1)
                    ];
                }
            }


            return Object.assign({}, state, {
                elements: newArray,
                selectedBounds: Object.assign({}, action.newBounds),
                selectedObjects: newSelectedObjects ? newSelectedObjects : state.selectedObjects
            });
        }
        case CHANGE_Z_INDEX: {
            return Object.assign({}, state, {
                elements: action.elements.slice(0)
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
        case REMOVE_OBJECTS: {
            
            return Object.assign({}, state, {
                elements: state.elements.filter((t: any) => action.ids.indexOf(t.id) < 0),
                selectedBounds: null !== action.newBounds ? Object.assign({}, action.newBounds) : null,
                selectedObjects: action.selectedObjects.slice(0)
            });
        }
        case GROUP_OBJECTS: {
            let groupedArray: DrObject[] = [];
            let newElements: DrObject[] = [];

            let groupedObject: DrObject;
            let highZIndex: number = 0;
            for(let i of state.elements) {
                groupedObject = action.items.find((t: any) => i.id === t.id);
                if (groupedObject) {
                    highZIndex = newElements.length;
                    groupedArray.push(cloneDeep(i));
                }
                else {
                    newElements.push(i);
                }
            }

            let newItem: DrGroupedObject = createDrGroupedObject({
                id: action.nextId,
                objects: groupedArray
            });
            return Object.assign({}, state, {
                elements: [
                    ...newElements.slice(0, highZIndex),
                    newItem,
                    ...newElements.slice(highZIndex + 1)
                ],
                selectedObjects: [cloneDeep(newItem)]
            });
        }
        case UNGROUP_OBJECT: {
            let item: DrObject = state.elements.find((t: any) => t.id === action.item.id);
            let index: number = state.elements.indexOf(item);

            let elements: DrObject[] = [
                ...state.elements.slice(0, index),
                ...(action.item as DrGroupedObject).objects.map((x: any) => cloneDeep(x)),
                ...state.elements.slice(index + 1),
            ];

            return Object.assign({}, state, {
                elements: elements,
                selectedObjects: (action.item as DrGroupedObject).objects.map((x: any) => cloneDeep(x))
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
        default:
            return state;
    }
}

const ACTIONS_TO_IGNORE = [SET_ELEMENTS, SELECT_OBJECTS, BEGIN_EDIT, END_EDIT, SET_TOOL];
export const undoableElementsReducer: any = undoable(elementsReducer, {
    filter: excludeAction(ACTIONS_TO_IGNORE),
    limit: 10,
    
});



export const rootReducer: Reducer<IDrawerAppState> = combineReducers({
    elementState: undoableElementsReducer,
    editingState: editingReducer
});


