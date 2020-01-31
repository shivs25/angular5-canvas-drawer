"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
                    pct = (pt.x - oldBounds.x) / (oldBounds.width === 0 ? 1 : oldBounds.width);
                    p.x = newBounds.x + (newBounds.width * pct);
                    pct = (pt.y - oldBounds.y) / (oldBounds.height === 0 ? 1 : oldBounds.height);
                    p.y = newBounds.y + (newBounds.height * pct);
                    pts.push(p);
                }
                return {
                    points: pts
                };
            }
            case enums_1.DrType.CALLOUT: {
                var c = item;
                var pctX = (c.x - oldBounds.x) / oldBounds.width;
                var pctY = (c.y - oldBounds.y) / oldBounds.height;
                var pctWidth = c.width / oldBounds.width;
                var pctHeight = c.height / oldBounds.height;
                var pctBaseX1 = (c.basePoint1.x - c.x) / c.width;
                var pctBaseY1 = (c.basePoint1.y - c.y) / c.height;
                var pctBaseX2 = (c.basePoint2.x - c.x) / c.width;
                var pctBaseY2 = (c.basePoint2.y - c.y) / c.height;
                var newX = newBounds.x + newBounds.width * pctX;
                var newY = newBounds.y + newBounds.height * pctY;
                var newWidth = newBounds.width * pctWidth;
                var newHeight = newBounds.height * pctHeight;
                var r = {
                    x: newX,
                    y: newY,
                    width: newWidth,
                    height: newHeight,
                    basePoint1: { x: newX + newWidth * pctBaseX1, y: newY + newHeight * pctBaseY1 },
                    basePoint2: { x: newX + newWidth * pctBaseX2, y: newY + newHeight * pctBaseY2 }
                };
                if (!c.pointerLocked) {
                    var pctPointerX = (c.pointerLocation.x - oldBounds.x) / oldBounds.width;
                    var pctPointerY = (c.pointerLocation.y - oldBounds.y) / oldBounds.height;
                    r.pointerLocation = {
                        x: newBounds.x + newBounds.width * pctPointerX,
                        y: newBounds.y + newBounds.height * pctPointerY
                    };
                }
                return r;
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
    ChangeHelperService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], ChangeHelperService);
    return ChangeHelperService;
}());
exports.ChangeHelperService = ChangeHelperService;
//# sourceMappingURL=change-helper.service.js.map