"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("./actions");
var redux_undo_1 = require("redux-undo");
var redux_1 = require("redux");
var enums_1 = require("./models/enums");
exports.INITIAL_ELEMENT_STATE = {
    elements: [],
    selectedObjects: [],
    selectedBounds: null,
    selectedTool: enums_1.EditorToolType.SELECTOR_TOOL
};
exports.INITIAL_EDITING_STATE = {
    isEditing: false
};
exports.INITIAL_STATE = {
    elementState: {
        past: [],
        present: exports.INITIAL_ELEMENT_STATE,
        future: []
    },
    editingState: {
        isEditing: false
    }
};
exports.editingReducer = function (state, action) {
    if (state === void 0) { state = exports.INITIAL_EDITING_STATE; }
    switch (action.type) {
        case actions_1.BEGIN_EDIT:
            return Object.assign({}, state, {
                isEditing: true
            });
        case actions_1.END_EDIT:
            return Object.assign({}, state, {
                isEditing: false
            });
    }
    return state;
};
exports.elementsReducer = function (state, action) {
    if (state === void 0) { state = exports.INITIAL_ELEMENT_STATE; }
    switch (action.type) {
        case actions_1.SET_ELEMENTS:
            return Object.assign({}, state, {
                elements: action.elements ? action.elements.slice(0) : [],
                selectedObject: [],
                selectedBounds: null
            });
        case actions_1.CHANGE_OBJECT_BOUNDS:
            var item = state.elements.find(function (t) { return t.id === action.id; });
            var index = state.elements.indexOf(item);
            var newItem = Object.assign({}, item, action.changes);
            var newSelectedObjects = null;
            var selectedItem = state.selectedObjects ? state.selectedObjects.find(function (t) { return t.id === action.id; }) : null;
            if (null !== selectedItem) {
                //item was in the selection
                var selectedIndex = state.selectedObjects.indexOf(selectedItem);
                newSelectedObjects = state.selectedObjects.slice(0, selectedIndex).concat([
                    Object.assign({}, newItem)
                ], state.selectedObjects.slice(selectedIndex + 1));
            }
            return Object.assign({}, state, {
                elements: state.elements.slice(0, index).concat([
                    newItem
                ], state.elements.slice(index + 1)),
                selectedBounds: Object.assign({}, action.newBounds),
                selectedObjects: newSelectedObjects ? newSelectedObjects : state.selectedObjects
            });
        case actions_1.SELECT_OBJECTS:
            return Object.assign({}, state, {
                selectedBounds: Object.assign({}, action.selectedBounds),
                selectedObjects: action.items.map(function (x) { return Object.assign({}, x); })
            });
        default:
            return state;
    }
};
var ACTIONS_TO_IGNORE = [actions_1.SET_ELEMENTS, actions_1.SELECT_OBJECTS, actions_1.BEGIN_EDIT, actions_1.END_EDIT];
exports.undoableElementsReducer = redux_undo_1.default(exports.elementsReducer, {
    filter: redux_undo_1.excludeAction(ACTIONS_TO_IGNORE),
    limit: 10,
});
exports.rootReducer = redux_1.combineReducers({
    elementState: exports.undoableElementsReducer,
    editingState: exports.editingReducer
});
//# sourceMappingURL=store.js.map