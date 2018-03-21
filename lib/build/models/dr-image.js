"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dr_rect_1 = require("./dr-rect");
var dr_type_enum_1 = require("./dr-type.enum");
exports.DEFAULT_IMAGE = Object.assign({}, dr_rect_1.DEFAULT_RECT, {
    url: "/assets/image-placeholder-dark.png",
    showStroke: false,
    showFill: false,
    stroke: "#000000",
    fill: "#ffffff",
    drType: dr_type_enum_1.DrType.IMAGE
});
function createDrImage(properties) {
    return Object.assign({}, exports.DEFAULT_IMAGE, properties);
}
exports.createDrImage = createDrImage;
//# sourceMappingURL=dr-image.js.map