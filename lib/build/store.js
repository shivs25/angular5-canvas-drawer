"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("./actions");
var dr_type_enum_1 = require("./models/dr-type.enum");
var redux_undo_1 = require("redux-undo");
var redux_1 = require("redux");
var drawer_object_helper_service_1 = require("./services/drawer-object-helper.service");
var enums_1 = require("./models/enums");
exports.INITIAL_ELEMENT_STATE = {
    elements: [],
    selectedIds: [],
    selectedTool: enums_1.EditorToolType.SELECTOR_TOOL
};
exports.INITIAL_STATE = {
    elementState: {
        past: [],
        present: exports.INITIAL_ELEMENT_STATE,
        future: []
    }
};
exports.elementsReducer = function (state, action) {
    if (state === void 0) { state = exports.INITIAL_ELEMENT_STATE; }
    switch (action.type) {
        case actions_1.SET_ELEMENTS:
            return Object.assign({}, state, {
                elements: action.elements ? action.elements.map(function (x) { return Object.assign({}, x); }) : [],
                selectedIds: [],
                selectedTool: state.selectedTool
            });
        case actions_1.CHANGE_OBJECT_BOUNDS:
            var item = state.elements.find(function (t) { return t.id === action.id; });
            var index = state.elements.indexOf(item);
            var i = void 0;
            switch (item.drType) {
                case dr_type_enum_1.DrType.RECTANGLE:
                case dr_type_enum_1.DrType.TEXT:
                case dr_type_enum_1.DrType.IMAGE:
                    i = Object.assign({}, item, {
                        x: action.newBounds.x,
                        y: action.newBounds.y,
                        width: action.newBounds.width,
                        height: action.newBounds.height
                    });
                    break;
                case dr_type_enum_1.DrType.ELLIPSE:
                    i = Object.assign({}, item, {
                        x: action.newBounds.x + action.newBounds.width / 2,
                        y: action.newBounds.y + action.newBounds.height / 2,
                        rx: action.newBounds.width / 2,
                        ry: action.newBounds.height / 2
                    });
                    break;
                case dr_type_enum_1.DrType.POLYGON:
                    var helper = new drawer_object_helper_service_1.DrawerObjectHelperService();
                    var bounds = helper.getBoundingBox([item]);
                    var r = Object.assign({}, item);
                    var scaleX = action.newBounds.width / bounds.width;
                    var scaleY = action.newBounds.height / bounds.height;
                    for (var _i = 0, _a = r.points; _i < _a.length; _i++) {
                        var pt = _a[_i];
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
                elements: state.elements.slice(0, index).concat([
                    i
                ], state.elements.slice(index + 1)),
                selectedIds: state.selectedIds,
                selectedTool: state.selectedTool
            });
        default:
            return state;
    }
};
exports.undoableElementsReducer = redux_undo_1.default(exports.elementsReducer, {
    filter: redux_undo_1.distinctState(),
    limit: 10
});
exports.rootReducer = redux_1.combineReducers({
    elementState: exports.undoableElementsReducer
});
//# sourceMappingURL=store.js.map