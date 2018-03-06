"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("./actions");
var redux_undo_1 = require("redux-undo");
var redux_1 = require("redux");
var enums_1 = require("./models/enums");
var dr_grouped_object_1 = require("./models/dr-grouped-object");
var utilities_1 = require("./utilities");
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
        case actions_1.SET_ELEMENTS: {
            return Object.assign({}, state, {
                elements: action.elements ? action.elements.slice(0) : [],
                selectedObjects: [],
                selectedBounds: null
            });
        }
        case actions_1.CHANGE_OBJECTS_PROPERTIES: {
            var newArray = [];
            var newItem_1;
            var newSelectedObjects = state.selectedObjects.slice(0);
            var changes = void 0;
            var selectedItem = void 0;
            var selectedIndex = void 0;
            var _loop_1 = function (i) {
                changes = action.changes.find(function (t) { return t.id === i.id; });
                if (changes) {
                    newItem_1 = Object.assign({}, utilities_1.cloneDeep(i), changes.changes);
                }
                else {
                    newItem_1 = i;
                }
                newArray.push(newItem_1);
                selectedItem = newSelectedObjects ? newSelectedObjects.find(function (t) { return t.id === newItem_1.id; }) : null;
                if (selectedItem && null !== selectedItem) {
                    //item was in the selection
                    selectedIndex = newSelectedObjects.indexOf(selectedItem);
                    newSelectedObjects = newSelectedObjects.slice(0, selectedIndex).concat([
                        utilities_1.cloneDeep(newItem_1)
                    ], newSelectedObjects.slice(selectedIndex + 1));
                }
            };
            for (var _i = 0, _a = state.elements; _i < _a.length; _i++) {
                var i = _a[_i];
                _loop_1(i);
            }
            return Object.assign({}, state, {
                elements: newArray,
                selectedBounds: Object.assign({}, action.newBounds),
                selectedObjects: newSelectedObjects ? newSelectedObjects : state.selectedObjects
            });
        }
        case actions_1.CHANGE_Z_INDEX: {
            return Object.assign({}, state, {
                elements: action.elements.slice(0)
            });
        }
        case actions_1.ADD_OBJECTS: {
            return Object.assign({}, state, {
                elements: state.elements.concat(action.newItems.map(function (x) { return utilities_1.cloneDeep(x); }))
            });
        }
        case actions_1.REMOVE_OBJECTS: {
            return Object.assign({}, state, {
                elements: state.elements.filter(function (t) { return action.ids.indexOf(t.id) < 0; }),
                selectedBounds: null !== action.newBounds ? Object.assign({}, action.newBounds) : null,
                selectedObjects: action.selectedObjects.slice(0)
            });
        }
        case actions_1.GROUP_OBJECTS: {
            var groupedArray = [];
            var newElements = [];
            var groupedObject = void 0;
            var highZIndex = 0;
            var _loop_2 = function (i) {
                groupedObject = action.items.find(function (t) { return i.id === t.id; });
                if (groupedObject) {
                    highZIndex = newElements.length;
                    groupedArray.push(utilities_1.cloneDeep(i));
                }
                else {
                    newElements.push(i);
                }
            };
            for (var _b = 0, _c = state.elements; _b < _c.length; _b++) {
                var i = _c[_b];
                _loop_2(i);
            }
            var newItem = dr_grouped_object_1.createDrGroupedObject({
                id: action.nextId,
                objects: groupedArray
            });
            return Object.assign({}, state, {
                elements: newElements.slice(0, highZIndex).concat([
                    newItem
                ], newElements.slice(highZIndex + 1)),
                selectedObjects: [utilities_1.cloneDeep(newItem)]
            });
        }
        case actions_1.UNGROUP_OBJECT: {
            var item = state.elements.find(function (t) { return t.id === action.item.id; });
            var index = state.elements.indexOf(item);
            var elements = state.elements.slice(0, index).concat(action.item.objects.map(function (x) { return utilities_1.cloneDeep(x); }), state.elements.slice(index + 1));
            return Object.assign({}, state, {
                elements: elements,
                selectedObjects: elements.map(function (t) { return utilities_1.cloneDeep(t); })
            });
        }
        case actions_1.SELECT_OBJECTS: {
            return Object.assign({}, state, {
                selectedBounds: null !== action.selectedBounds ? Object.assign({}, action.selectedBounds) : null,
                selectedObjects: action.items.map(function (x) { return Object.assign({}, x); })
            });
        }
        case actions_1.CLEAR_OBJECTS: {
            return Object.assign({}, state, {
                elements: []
            });
        }
        case actions_1.SET_TOOL: {
            return Object.assign({}, state, {
                selectedTool: action.tool
            });
        }
        default:
            return state;
    }
};
var ACTIONS_TO_IGNORE = [actions_1.SET_ELEMENTS, actions_1.SELECT_OBJECTS, actions_1.BEGIN_EDIT, actions_1.END_EDIT, actions_1.SET_TOOL];
exports.undoableElementsReducer = redux_undo_1.default(exports.elementsReducer, {
    filter: redux_undo_1.excludeAction(ACTIONS_TO_IGNORE),
    limit: 10,
});
exports.rootReducer = redux_1.combineReducers({
    elementState: exports.undoableElementsReducer,
    editingState: exports.editingReducer
});
//# sourceMappingURL=store.js.map