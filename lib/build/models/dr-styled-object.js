"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dr_object_1 = require("./dr-object");
exports.DEFAULT_STYLED_OBJECT = Object.assign({}, dr_object_1.DEFAULT_OBJECT, {
    showFill: true,
    showStroke: true,
    fill: "#ffffff",
    stroke: "#000000",
    strokeWidth: 1,
    opacity: 1,
    dashedLine: false
});
function createDrStyledObject(properties) {
    return Object.assign({}, exports.DEFAULT_STYLED_OBJECT, properties);
}
exports.createDrStyledObject = createDrStyledObject;
//# sourceMappingURL=dr-styled-object.js.map