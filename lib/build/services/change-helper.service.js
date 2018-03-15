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
            case enums_1.DrType.RECTANGLE: {
                var r = item;
                var pctX = (r.x - oldBounds.x) / oldBounds.width;
                var pctY = (r.y - oldBounds.y) / oldBounds.height;
                var pctWidth = r.width / oldBounds.width;
                var pctHeight = r.height / oldBounds.height;
                return {
                    x: newBounds.x + newBounds.width * pctX,
                    y: newBounds.y + newBounds.height * pctY,
                    width: newBounds.width * pctWidth,
                    height: newBounds.height * pctHeight
                };
            }
            case enums_1.DrType.ELLIPSE: {
                var e = item;
                var pctX = (e.x - oldBounds.x) / oldBounds.width;
                var pctY = (e.y - oldBounds.y) / oldBounds.height;
                var pctWidth = e.rx * 2 / oldBounds.width;
                var pctHeight = e.ry * 2 / oldBounds.height;
                return {
                    x: newBounds.x + newBounds.width * pctX,
                    y: newBounds.y + newBounds.height * pctY,
                    rx: newBounds.width * pctWidth / 2,
                    ry: newBounds.height * pctHeight / 2
                };
            }
            case enums_1.DrType.POLYGON: {
                var pts = [];
                var p = void 0;
                var pct = void 0;
                for (var _i = 0, _a = item.points; _i < _a.length; _i++) {
                    var pt = _a[_i];
                    p = { x: 0, y: 0 };
                    pct = (pt.x - oldBounds.x) / (oldBounds.width);
                    p.x = newBounds.x + (newBounds.width * pct);
                    pct = (pt.y - oldBounds.y) / (oldBounds.height);
                    p.y = newBounds.y + (newBounds.height * pct);
                    pts.push(p);
                }
                return {
                    points: pts
                };
            }
            case enums_1.DrType.GROUPED_OBJECT: {
                var newObjects = [];
                for (var _b = 0, _c = item.objects; _b < _c.length; _b++) {
                    var o = _c[_b];
                    newObjects.push(Object.assign({}, o, this.getBoundsChanges(o, newBounds, oldBounds)));
                }
                return {
                    objects: newObjects
                };
            }
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