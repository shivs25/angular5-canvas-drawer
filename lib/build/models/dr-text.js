"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dr_rect_1 = require("./dr-rect");
var dr_text_alignment_enum_1 = require("./dr-text-alignment.enum");
var dr_type_enum_1 = require("./dr-type.enum");
exports.DEFAULT_TEXT = Object.assign({}, dr_rect_1.DEFAULT_RECT, {
    text: "TEXT",
    bold: false,
    italic: false,
    showFill: false,
    showStroke: false,
    size: 16,
    fontFamily: 'Verdana',
    fontColor: 'black',
    hAlignment: dr_text_alignment_enum_1.DrTextAlignment.NEAR,
    vAlignment: dr_text_alignment_enum_1.DrTextAlignment.NEAR,
    drType: dr_type_enum_1.DrType.TEXT
});
function createDrText(properties) {
    return Object.assign({}, exports.DEFAULT_TEXT, properties);
}
exports.createDrText = createDrText;
//# sourceMappingURL=dr-text.js.map