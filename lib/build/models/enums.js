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
})(EditorToolType = exports.EditorToolType || (exports.EditorToolType = {}));
//# sourceMappingURL=enums.js.map