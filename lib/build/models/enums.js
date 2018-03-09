"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DrType;
(function (DrType) {
    DrType[DrType["INVALID"] = -1] = "INVALID";
    DrType[DrType["RECTANGLE"] = 1] = "RECTANGLE";
    DrType[DrType["POLYGON"] = 2] = "POLYGON";
    DrType[DrType["ELLIPSE"] = 3] = "ELLIPSE";
    DrType[DrType["TEXT"] = 4] = "TEXT";
    DrType[DrType["IMAGE"] = 5] = "IMAGE";
    DrType[DrType["GROUPED_OBJECT"] = 100] = "GROUPED_OBJECT";
})(DrType = exports.DrType || (exports.DrType = {}));
var DrTextAlignment;
(function (DrTextAlignment) {
    DrTextAlignment[DrTextAlignment["NEAR"] = 1] = "NEAR";
    DrTextAlignment[DrTextAlignment["CENTER"] = 2] = "CENTER";
    DrTextAlignment[DrTextAlignment["FAR"] = 3] = "FAR";
})(DrTextAlignment = exports.DrTextAlignment || (exports.DrTextAlignment = {}));
var EditorToolType;
(function (EditorToolType) {
    EditorToolType[EditorToolType["NONE"] = -1] = "NONE";
    EditorToolType[EditorToolType["SELECTOR_TOOL"] = 1] = "SELECTOR_TOOL";
    EditorToolType[EditorToolType["RECTANGLE_TOOL"] = 2] = "RECTANGLE_TOOL";
    EditorToolType[EditorToolType["ELLIPSE_TOOL"] = 3] = "ELLIPSE_TOOL";
    EditorToolType[EditorToolType["IMAGE_TOOL"] = 4] = "IMAGE_TOOL";
    EditorToolType[EditorToolType["TEXT_TOOL"] = 5] = "TEXT_TOOL";
    EditorToolType[EditorToolType["PEN_TOOL"] = 6] = "PEN_TOOL";
    EditorToolType[EditorToolType["ARROW_TOOL"] = 7] = "ARROW_TOOL";
    EditorToolType[EditorToolType["STAR_TOOL"] = 8] = "STAR_TOOL";
    EditorToolType[EditorToolType["CALLOUT_SQUARE_TOOL"] = 9] = "CALLOUT_SQUARE_TOOL";
    EditorToolType[EditorToolType["CALLOUT_ROUNDED_TOOL"] = 10] = "CALLOUT_ROUNDED_TOOL";
    EditorToolType[EditorToolType["TRIANGLE_TOOL"] = 11] = "TRIANGLE_TOOL";
    EditorToolType[EditorToolType["ROUNDED_RECTANGLE_TOOL"] = 12] = "ROUNDED_RECTANGLE_TOOL";
    EditorToolType[EditorToolType["TEXT_EDIT_TOOL"] = 13] = "TEXT_EDIT_TOOL";
})(EditorToolType = exports.EditorToolType || (exports.EditorToolType = {}));
//# sourceMappingURL=enums.js.map