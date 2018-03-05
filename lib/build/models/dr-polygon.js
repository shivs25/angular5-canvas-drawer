"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dr_type_enum_1 = require("./dr-type.enum");
var dr_styled_object_1 = require("./dr-styled-object");
exports.DEFAULT_POLYGON = Object.assign({}, dr_styled_object_1.DEFAULT_STYLED_OBJECT, {
    points: [],
    drType: dr_type_enum_1.DrType.POLYGON
});
function createDrPolygon(properties) {
    return Object.assign({}, exports.DEFAULT_POLYGON, properties);
}
exports.createDrPolygon = createDrPolygon;
//# sourceMappingURL=dr-polygon.js.map