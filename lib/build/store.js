"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("./actions");
var dr_type_enum_1 = require("./models/dr-type.enum");
exports.INITIAL_STATE = {
    elements: []
};
function rootReducer(state, action) {
    switch (action.type) {
        case actions_1.SET_ELEMENTS:
            return Object.assign({}, state, {
                elements: action.elements.slice(0)
            });
        case actions_1.MOVE_OBJECT:
            var item = state.elements.find(function (t) { return t.id === action.id; });
            var index = state.elements.indexOf(item);
            if (dr_type_enum_1.DrType.IMAGE === item.drType) {
                var i = Object.assign({}, item);
                i.x += action.delta.x;
                i.y += action.delta.y;
                console.log(i);
                return Object.assign({}, state, {
                    elements: state.elements.slice(0, index).concat([
                        i
                    ], state.elements.slice(index + 1))
                });
            }
    }
    return state;
}
exports.rootReducer = rootReducer;
//# sourceMappingURL=store.js.map