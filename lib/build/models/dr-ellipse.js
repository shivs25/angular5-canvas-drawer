"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dr_type_enum_1 = require("./dr-type.enum");
var dr_styled_object_1 = require("./dr-styled-object");
exports.DEFAULT_ELLIPSE = Object.assign({}, dr_styled_object_1.DEFAULT_STYLED_OBJECT, {
    x: 0,
    y: 0,
    rx: 0,
    ry: 0,
    drType: dr_type_enum_1.DrType.ELLIPSE
});
function createDrEllipse(properties) {
    return Object.assign({}, exports.DEFAULT_ELLIPSE, properties);
}
exports.createDrEllipse = createDrEllipse;
//# sourceMappingURL=dr-ellipse.js.map