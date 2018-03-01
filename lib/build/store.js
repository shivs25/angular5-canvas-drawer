"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("./actions");
var dr_type_enum_1 = require("./models/dr-type.enum");
var redux_undo_1 = require("redux-undo");
var redux_1 = require("redux");
exports.INITIAL_STATE = {
    elements: {
        past: [],
        present: [],
        future: []
    }
};
exports.elementsReducer = function (state, action) {
    if (state === void 0) { state = []; }
    switch (action.type) {
        case actions_1.SET_ELEMENTS:
            return action.elements.slice(0);
        case actions_1.CHANGE_OBJECT_BOUNDS:
            var item = state.find(function (t) { return t.id === action.id; });
            var index = state.indexOf(item);
            if (dr_type_enum_1.DrType.RECTANGLE === item.drType) {
                var i = Object.assign({}, item, {
                    x: action.newBounds.x,
                    y: action.newBounds.y,
                    width: action.newBounds.width,
                    height: action.newBounds.height
                });
                return state.slice(0, index).concat([
                    i
                ], state.slice(index + 1));
            }
        default:
            return state;
    }
};
exports.undoableElementsReducer = redux_undo_1.default(exports.elementsReducer, {
    filter: redux_undo_1.distinctState(),
    limit: 10
});
exports.rootReducer = redux_1.combineReducers({
    elements: exports.undoableElementsReducer
});
//# sourceMappingURL=store.js.map