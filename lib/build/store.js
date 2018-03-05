"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("./actions");
var redux_undo_1 = require("redux-undo");
var redux_1 = require("redux");
var enums_1 = require("./models/enums");
var dr_grouped_object_1 = require("./models/dr-grouped-object");
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
        case actions_1.CHANGE_OBJECT_BOUNDS: {
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
        }
        case actions_1.CHANGE_OBJECTS_BOUNDS: {
            var newArray = [];
            var newItem_1;
            var newSelectedObjects = state.selectedObjects.slice(0);
            var changes = void 0;
            var selectedItem = void 0;
            var selectedIndex = void 0;
            var _loop_1 = function (i) {
                changes = action.changes.find(function (t) { return t.id === i.id; });
                if (changes) {
                    newItem_1 = Object.assign({}, i, changes.changes);
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
                        Object.assign({}, newItem_1)
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
        case actions_1.CHANGE_STYLE: {
            var item = state.elements.find(function (t) { return t.id === action.id; });
            var index = state.elements.indexOf(item);
            var newItem = Object.assign({}, item, action.newStyle);
            return Object.assign({}, state, {
                elements: state.elements.slice(0, index).concat([
                    newItem
                ], state.elements.slice(index + 1))
            });
        }
        case actions_1.CHANGE_Z_INDEX: {
            var item = state.elements.find(function (t) { return t.id === action.id; });
            var index = state.elements.indexOf(item);
            var items = state.elements.slice(0);
            items.splice(index, 1);
            items.splice(action.newIndex, 0, item);
            return Object.assign({}, state, {
                elements: items
            });
        }
        case actions_1.ADD_OBJECT: {
            return Object.assign({}, state, {
                elements: state.elements.concat([
                    action.newItem
                ])
            });
        }
        case actions_1.REMOVE_OBJECT: {
            var item = state.elements.find(function (t) { return t.id === action.id; });
            var index = state.elements.indexOf(item);
            return Object.assign({}, state, {
                elements: state.elements.slice(0, index).concat(state.elements.slice(index + 1))
            });
        }
        case actions_1.GROUP_OBJECTS: {
            var groupedArray = [];
            var newElements = [];
            var groupedObject = void 0;
            var _loop_2 = function (i) {
                groupedObject = action.items.find(function (t) { return i.id === t.id; });
                if (groupedObject) {
                    groupedArray.push(i);
                }
                else {
                    console.log(i);
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
                elements: newElements.concat([
                    newItem
                ]),
                selectedBounds: null !== action.selectedBounds ? Object.assign({}, action.selectedBounds) : null,
                selectedObjects: [Object.assign(newItem)]
            });
        }
        case actions_1.UNGROUP_OBJECT: {
            var item = state.elements.find(function (t) { return t.id === action.item.id; });
            var index = state.elements.indexOf(item);
            return Object.assign({}, state, {
                elements: state.elements.slice(0, index).concat(state.elements.slice(index + 1), action.item.objects.slice(0)),
                selectedBounds: null !== action.selectedBounds ? Object.assign({}, action.selectedBounds) : null,
                selectedObjects: action.item.objects.map(function (x) { return Object.assign({}, x); })
            });
        }
        case actions_1.SELECT_OBJECTS: {
            return Object.assign({}, state, {
                selectedBounds: null !== action.selectedBounds ? Object.assign({}, action.selectedBounds) : null,
                selectedObjects: action.items.map(function (x) { return Object.assign({}, x); })
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