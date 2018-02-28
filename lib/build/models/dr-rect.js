"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dr_object_1 = require("./dr-object");
var dr_type_enum_1 = require("./dr-type.enum");
exports.DEFAULT_RECT = Object.assign({}, dr_object_1.DEFAULT_OBJECT, {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    drType: dr_type_enum_1.DrType.RECTANGLE
});
function createDrRect(properties) {
    return Object.assign({}, exports.DEFAULT_RECT, properties);
}
exports.createDrRect = createDrRect;
//# sourceMappingURL=dr-rect.js.map