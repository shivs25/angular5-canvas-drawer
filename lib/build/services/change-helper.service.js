"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var enums_1 = require("../models/enums");
var ChangeHelperService = /** @class */ (function () {
    function ChangeHelperService() {
    }
    ChangeHelperService.prototype.getBoundsChanges = function (item, newBounds, oldBounds) {
        switch (item.drType) {
            case enums_1.DrType.IMAGE:
            case enums_1.DrType.TEXT:
            case enums_1.DrType.RECTANGLE:
                return {
                    x: newBounds.x,
                    y: newBounds.y,
                    width: newBounds.width,
                    height: newBounds.height
                };
            case enums_1.DrType.ELLIPSE:
                return {
                    x: newBounds.x + newBounds.width / 2,
                    y: newBounds.y + newBounds.height / 2,
                    rx: newBounds.width / 2,
                    ry: newBounds.height / 2
                };
            case enums_1.DrType.POLYGON:
                var scaleX = newBounds.width / oldBounds.width;
                var scaleY = newBounds.height / oldBounds.height;
                var pts = [];
                var p = void 0;
                for (var _i = 0, _a = item.points; _i < _a.length; _i++) {
                    var pt = _a[_i];
                    p = { x: 0, y: 0 };
                    p.x = pt.x - (oldBounds.x + oldBounds.width / 2);
                    p.x = p.x * scaleX;
                    p.x = p.x + newBounds.x + newBounds.width / 2;
                    p.y = pt.y - (oldBounds.y + oldBounds.height / 2);
                    p.y = p.y * scaleY;
                    p.y = p.y + newBounds.y + newBounds.height / 2;
                    pts.push(p);
                }
                return {
                    points: pts
                };
        }
    };
    ChangeHelperService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    ChangeHelperService.ctorParameters = function () { return []; };
    return ChangeHelperService;
}());
exports.ChangeHelperService = ChangeHelperService;
//# sourceMappingURL=change-helper.service.js.map