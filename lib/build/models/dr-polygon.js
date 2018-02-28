"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dr_object_1 = require("./dr-object");
var dr_type_enum_1 = require("./dr-type.enum");
exports.DEFAULT_POLYGON = Object.assign({}, dr_object_1.DEFAULT_OBJECT, {
    points: [],
    drType: dr_type_enum_1.DrType.POLYGON
});
function createDrPolygon(properties) {
    return Object.assign({}, exports.DEFAULT_POLYGON, properties);
}
exports.createDrPolygon = createDrPolygon;
//# sourceMappingURL=dr-polygon.js.map