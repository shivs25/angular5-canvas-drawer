"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dr_type_enum_1 = require("./dr-type.enum");
var dr_rect_1 = require("./dr-rect");
exports.DEFAULT_CALLOUT = Object.assign({}, dr_rect_1.DEFAULT_RECT, {
    pointerLocked: false,
    basePoint1: { x: 0, y: 0 },
    basePoint2: { x: 0, y: 0 },
    pointerLocation: { x: 0, y: 0 },
    drType: dr_type_enum_1.DrType.CALLOUT
});
function createDrCallout(properties) {
    return Object.assign({}, exports.DEFAULT_CALLOUT, properties);
}
exports.createDrCallout = createDrCallout;
//# sourceMappingURL=dr-callout.js.map