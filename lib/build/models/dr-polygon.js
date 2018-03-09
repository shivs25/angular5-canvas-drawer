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
function createDrPolygonStar(x, y, width, height, properties) {
    return Object.assign({}, exports.DEFAULT_POLYGON, properties, {
        points: [
            { x: x + width * 0.5, y: y },
            //Top of star
            { x: x + width * 0.624, y: y + height * 0.373 },
            { x: x + width, y: x + height * 0.382 },
            { x: x + width * 0.701, y: y + height * 0.621 },
            { x: x + width * 0.809, y: y + height },
            { x: x + width * 0.5, y: y + height * 0.774 },
            { x: x + width * 0.191, y: y + height },
            { x: x + width * 0.299, y: y + height * 0.621 },
            { x: x, y: y + height * 0.382 },
            { x: x + width * 0.376, y: y + height * 0.373 }
        ]
    });
}
exports.createDrPolygonStar = createDrPolygonStar;
function createDrPolygonTriangle(x, y, width, height, properties) {
    return Object.assign({}, exports.DEFAULT_POLYGON, properties, {
        points: [
            { x: x + width * 0.5, y: y },
            //Top of triangle
            { x: x + width, y: y + height },
            { x: x, y: y + height }
        ]
    });
}
exports.createDrPolygonTriangle = createDrPolygonTriangle;
function createDrPolygonCallout(x, y, width, height, properties) {
    return Object.assign({}, exports.DEFAULT_POLYGON, properties, {
        points: [
            { x: x + width * 1, y: y + height * 0.08 },
            { x: x + width * 0, y: y + height * 0.08 },
            { x: x + width * 0, y: y + height * 0.688 },
            { x: x + width * 0.619, y: y + height * 0.688 },
            { x: x + width * 0.619, y: y + height * 0.912 },
            { x: x + width * 0.753, y: y + height * 0.688 },
            { x: x + width * 1, y: y + height * 0.688 }
        ]
    });
}
exports.createDrPolygonCallout = createDrPolygonCallout;
function createDrPolygonArrow(x, y, width, height, properties) {
    return Object.assign({}, exports.DEFAULT_POLYGON, properties, {
        points: [
            { x: x + width * 0.526, y: y + height * 0.112 },
            { x: x + width, y: y + height * 0.5 },
            { x: x + width * 0.526, y: y + height * 0.888 },
            { x: x + width * 0.522, y: y + height * 0.688 },
            { x: x, y: y + height * 0.688 },
            { x: x, y: y + height * 0.312 },
            { x: x + width * 0.526, y: y + height * 0.312 }
        ]
    });
}
exports.createDrPolygonArrow = createDrPolygonArrow;
//# sourceMappingURL=dr-polygon.js.map