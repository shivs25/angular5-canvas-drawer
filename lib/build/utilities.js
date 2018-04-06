"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enums_1 = require("./models/enums");
function cloneDeep(item) {
    var returnValue = Object.assign({}, item);
    if (enums_1.DrType.GROUPED_OBJECT === returnValue.drType) {
        returnValue.objects = returnValue.objects.map(function (x) { return cloneDeep(x); });
    }
    return returnValue;
}
exports.cloneDeep = cloneDeep;
function updateChildItemIds(newItem, nextId) {
    if (enums_1.DrType.GROUPED_OBJECT === newItem.drType) {
        for (var _i = 0, _a = newItem.objects; _i < _a.length; _i++) {
            var o = _a[_i];
            o.id = nextId++;
            updateChildItemIds(o, nextId);
        }
    }
    return nextId;
}
exports.updateChildItemIds = updateChildItemIds;
//# sourceMappingURL=utilities.js.map