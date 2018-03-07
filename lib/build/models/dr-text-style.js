"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dr_style_1 = require("./dr-style");
var enums_1 = require("./enums");
exports.DEFAULT_TEXT_STYLE = Object.assign({}, dr_style_1.DEFAULT_STYLE, {
    bold: false,
    italic: false,
    size: 16,
    fontFamily: 'Verdana',
    fontColor: '#000000',
    hAlignment: enums_1.DrTextAlignment.NEAR,
    vAlignment: enums_1.DrTextAlignment.NEAR
});
function createDrTextStyle(properties) {
    return Object.assign({}, exports.DEFAULT_TEXT_STYLE, properties);
}
exports.createDrTextStyle = createDrTextStyle;
//# sourceMappingURL=dr-text-style.js.map