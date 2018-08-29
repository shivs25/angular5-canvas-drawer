"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dr_type_enum_1 = require("./dr-type.enum");
var dr_object_1 = require("./dr-object");
exports.DEFAULT_GROUPED_OBJECT = Object.assign({}, dr_object_1.DEFAULT_OBJECT, {
    objects: [],
    drType: dr_type_enum_1.DrType.GROUPED_OBJECT
});
function createDrGroupedObject(properties) {
    return Object.assign({}, exports.DEFAULT_GROUPED_OBJECT, properties);
}
exports.createDrGroupedObject = createDrGroupedObject;
//# sourceMappingURL=dr-grouped-object.js.map