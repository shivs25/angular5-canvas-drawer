"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_STYLE = {
    showFill: true,
    showStroke: true,
    fill: "#ffffff",
    stroke: "#000000",
    strokeWidth: 1,
    opacity: 1
};
function createDrStyle(properties) {
    return Object.assign({}, exports.DEFAULT_STYLE, properties);
}
exports.createDrStyle = createDrStyle;
//# sourceMappingURL=dr-style.js.map