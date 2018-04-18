"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("./actions");
var dr_type_enum_1 = require("./models/dr-type.enum");
var redux_undo_1 = require("redux-undo");
var redux_1 = require("redux");
var enums_1 = require("./models/enums");
var utilities_1 = require("./utilities");
exports.INITIAL_ELEMENT_STATE = {
    elements: [],
    selectedObjects: [],
    hideSelection: false,
    selectedBounds: null,
    selectedTool: enums_1.EditorToolType.SELECTOR_TOOL
};
exports.INITIAL_EDITING_STATE = {
    isEditing: false,
    previewElements: []
};
exports.INITIAL_STATE = {
    elementState: {
        past: [],
        present: exports.INITIAL_ELEMENT_STATE,
        future: []
    },
    editingState: {
        isEditing: false,
        previewElements: []
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
        case actions_1.SET_PREVIEW_ELEMENTS:
            return Object.assign({}, state, {
                previewElements: action.elements ? action.elements.slice(0) : []
            });
        case actions_1.CHANGE_PREVIEW_STYLES:
            return Object.assign({}, state, {
                previewElements: findAndSetNestedChanges(state.previewElements, action.changes)
            });
    }
    return state;
};
exports.elementsReducer = function (state, action) {
    if (state === void 0) { state = exports.INITIAL_ELEMENT_STATE; }
    switch (action.type) {
        case actions_1.INIT_ELEMENTS: {
            return Object.assign({}, state, {
                elements: action.elements ? action.elements.slice(0) : []
            });
        }
        case actions_1.SET_ELEMENTS: {
            return Object.assign({}, state, {
                elements: action.elements ? action.elements.slice(0) : []
            });
        }
        case actions_1.CHANGE_OBJECTS_PROPERTIES: {
            return Object.assign({}, state, {
                elements: findAndReplaceNestedItems(state.elements, action.changes)
            });
        }
        case actions_1.ADD_OBJECTS: {
            return Object.assign({}, state, {
                elements: state.elements.concat(action.newItems.map(function (x) { return utilities_1.cloneDeep(x); }))
            });
        }
        case actions_1.ADD_TEMP_OBJECTS: {
            return Object.assign({}, state, {
                elements: state.elements.concat(action.newItems.map(function (x) { return utilities_1.cloneDeep(x); }))
            });
        }
        case actions_1.REMOVE_OBJECTS: {
            return Object.assign({}, state, {
                elements: findAndRemoveNestedObjects(state.elements, action.ids)
            });
        }
        case actions_1.REMOVE_TEMP_OBJECTS: {
            return Object.assign({}, state, {
                elements: findAndRemoveNestedObjects(state.elements, action.ids)
            });
        }
        case actions_1.REPLACE_OBJECTS: {
            var newElements = state.elements.slice(0, action.zIndex).concat(action.itemsToAdd, state.elements.slice(action.zIndex));
            var idsToRemove_1 = action.itemsToRemove.map(function (x) { return x.id; });
            return Object.assign({}, state, {
                elements: newElements.filter(function (x) { return idsToRemove_1.indexOf(x.id) < 0; })
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
        case actions_1.SET_HIDE_SELECTION: {
            return Object.assign({}, state, {
                hideSelection: action.hideSelection
            });
        }
        default:
            return state;
    }
};
function findAndRemoveNestedObjects(items, ids) {
    var returnValue = [];
    for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
        var o = items_1[_i];
        if (ids.indexOf(o.id) < 0) {
            if (dr_type_enum_1.DrType.GROUPED_OBJECT === o.drType) {
                returnValue.push(Object.assign({}, o, { objects: findAndRemoveNestedObjects(o.objects, ids) }));
            }
            else {
                returnValue.push(o);
            }
        }
    }
    return returnValue;
}
function findAndReplaceNestedItems(items, changes) {
    var newArray = [];
    var newItem;
    var itemChanges;
    var selectedItem;
    var selectedIndex;
    var _loop_1 = function (i) {
        itemChanges = changes.find(function (t) { return t.id === i.id; });
        if (itemChanges) {
            newItem = Object.assign({}, utilities_1.cloneDeep(i), itemChanges.changes);
        }
        else {
            if (dr_type_enum_1.DrType.GROUPED_OBJECT === i.drType) {
                newItem = Object.assign({}, utilities_1.cloneDeep(i));
                Object.assign(newItem, { objects: findAndReplaceNestedItems(newItem.objects, changes) });
            }
            else {
                newItem = i;
            }
        }
        newArray.push(newItem);
    };
    for (var _i = 0, items_2 = items; _i < items_2.length; _i++) {
        var i = items_2[_i];
        _loop_1(i);
    }
    return newArray;
}
function findAndSetNestedChanges(items, changes) {
    var newArray = [];
    var newItem;
    var itemChanges;
    var selectedItem;
    var selectedIndex;
    for (var _i = 0, items_3 = items; _i < items_3.length; _i++) {
        var i = items_3[_i];
        if (dr_type_enum_1.DrType.GROUPED_OBJECT === i.drType) {
            newItem = Object.assign({}, utilities_1.cloneDeep(i));
            Object.assign(newItem, { objects: findAndSetNestedChanges(newItem.objects, changes) });
        }
        else {
            newItem = Object.assign(utilities_1.cloneDeep(i), changes);
        }
        newArray.push(newItem);
    }
    return newArray;
}
var ACTIONS_TO_IGNORE = [
    actions_1.INIT_ELEMENTS,
    actions_1.SELECT_OBJECTS,
    actions_1.BEGIN_EDIT,
    actions_1.END_EDIT,
    actions_1.SET_TOOL,
    actions_1.SET_PREVIEW_ELEMENTS,
    actions_1.CHANGE_PREVIEW_STYLES,
    actions_1.SET_HIDE_SELECTION,
    //ADD_TEMP_OBJECTS, 
    actions_1.REMOVE_TEMP_OBJECTS
];
exports.undoableElementsReducer = redux_undo_1.default(exports.elementsReducer, {
    filter: redux_undo_1.excludeAction(ACTIONS_TO_IGNORE),
    limit: 10
});
exports.rootReducer = redux_1.combineReducers({
    elementState: exports.undoableElementsReducer,
    editingState: exports.editingReducer
});
//# sourceMappingURL=store.js.map