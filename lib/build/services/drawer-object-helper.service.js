"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dr_type_enum_1 = require("../models/dr-type.enum");
var bounding_box_1 = require("../models/bounding-box");
var DrawerObjectHelperService = (function () {
    function DrawerObjectHelperService() {
    }
    DrawerObjectHelperService.prototype.canResize = function (element, checkRotation) {
        var returnValue = true;
        if (dr_type_enum_1.DrType.GROUPED_OBJECT === element.drType) {
            for (var _i = 0, _a = element.objects; _i < _a.length; _i++) {
                var o = _a[_i];
                if (!this.canResize(o, true)) {
                    returnValue = false;
                    break;
                }
            }
        }
        else {
            if (checkRotation) {
                returnValue = 0 === element.rotation;
            }
        }
        return returnValue;
    };
    DrawerObjectHelperService.prototype.getObjects = function (ids, availableElements) {
        var objs = [];
        for (var i = 0; i < availableElements.length; i++) {
            if (ids.indexOf(availableElements[i].id) > -1) {
                objs.push(availableElements[i]);
            }
            if (availableElements[i].drType === dr_type_enum_1.DrType.GROUPED_OBJECT) {
                var g = availableElements[i];
                var childObjs = this.getObjects(ids, g.objects);
                for (var j = 0; j < childObjs.length; j++) {
                    objs.push(childObjs[j]);
                }
            }
        }
        return objs;
    };
    DrawerObjectHelperService.prototype.projectObject = function (item, bounds, offsetX, offsetY) {
        switch (item.drType) {
            case dr_type_enum_1.DrType.IMAGE:
            case dr_type_enum_1.DrType.RECTANGLE:
            case dr_type_enum_1.DrType.TEXT:
                var r = item;
                r.x -= (bounds.x - offsetX);
                r.y -= (bounds.y - offsetY);
                break;
            case dr_type_enum_1.DrType.ELLIPSE:
                var e = item;
                r.x -= (bounds.x - offsetX);
                r.y -= (bounds.y - offsetY);
                break;
            case dr_type_enum_1.DrType.POLYGON:
                var p = item;
                var pts = [];
                for (var _i = 0, _a = p.points; _i < _a.length; _i++) {
                    var i = _a[_i];
                    pts.push({ x: i.x - (bounds.x - offsetX), y: i.y - (bounds.y - offsetY) });
                }
                p.points = pts;
                break;
        }
    };
    DrawerObjectHelperService.prototype.getBoundingBoxForBounds = function (boundingBoxes) {
        var left = Math.min.apply(Math, boundingBoxes.map(function (b) { return b.x; }));
        var right = Math.max.apply(Math, boundingBoxes.map(function (b) { return b.x + b.width; }));
        var top = Math.min.apply(Math, boundingBoxes.map(function (b) { return b.y; }));
        var bottom = Math.max.apply(Math, boundingBoxes.map(function (b) { return b.y + b.height; }));
        return {
            x: left,
            y: top,
            width: right - left,
            height: bottom - top
        };
    };
    DrawerObjectHelperService.prototype.getBoundingBox = function (drObjs) {
        var boundingBox = bounding_box_1.createBoundingBox();
        var boundingBoxes = [];
        for (var i = 0; i < drObjs.length; i++) {
            boundingBoxes.push(this.getBoundingBoxForObject(drObjs[i]));
        }
        if (boundingBoxes.length === 1) {
            boundingBox.y = boundingBoxes[0].y;
            boundingBox.x = boundingBoxes[0].x;
            boundingBox.height = boundingBoxes[0].height;
            boundingBox.width = boundingBoxes[0].width;
        }
        else if (boundingBoxes.length > 1) {
            var minX = 0;
            var minY = 0;
            var maxX = 0;
            var maxY = 0;
            //Current logic just adds total width height together, it does not take into account the top or left values....
            for (var j = 0; j < boundingBoxes.length; j++) {
                if (j === 0) {
                    minX = boundingBoxes[j].x;
                    minY = boundingBoxes[j].y;
                    maxY = boundingBoxes[j].y + boundingBoxes[j].height;
                    maxX = boundingBoxes[j].x + boundingBoxes[j].width;
                }
                else {
                    if (minX > boundingBoxes[j].x) {
                        minX = boundingBoxes[j].x;
                    }
                    if (maxX < (boundingBoxes[j].x + boundingBoxes[j].width)) {
                        maxX = boundingBoxes[j].x + boundingBoxes[j].width;
                    }
                    if (minY > boundingBoxes[j].y) {
                        minY = boundingBoxes[j].y;
                    }
                    if (maxY < (boundingBoxes[j].y + boundingBoxes[j].height)) {
                        maxY = boundingBoxes[j].y + boundingBoxes[j].height;
                    }
                }
            }
            boundingBox.y = minY;
            boundingBox.x = minX;
            boundingBox.height = maxY - minY;
            boundingBox.width = maxX - minX;
        }
        return boundingBox;
    };
    //currently set to any because when trying to access individual items it errored on compilation
    //currently set to any because when trying to access individual items it errored on compilation
    DrawerObjectHelperService.prototype.getBoundingBoxForObject = 
    //currently set to any because when trying to access individual items it errored on compilation
    function (drObj) {
        var boundingBox = bounding_box_1.createBoundingBox();
        switch (drObj.drType) {
            case (dr_type_enum_1.DrType.ELLIPSE):
                boundingBox.y = drObj.y - drObj.ry;
                boundingBox.x = drObj.x - drObj.rx;
                boundingBox.height = drObj.ry * 2;
                boundingBox.width = drObj.rx * 2;
                break;
            case (dr_type_enum_1.DrType.POLYGON):
                var minX = 0;
                var minY = 0;
                var maxX = 0;
                var maxY = 0;
                for (var k = 0; k < drObj.points.length; k++) {
                    if (k === 0) {
                        minX = drObj.points[k].x;
                        minY = drObj.points[k].y;
                        maxY = drObj.points[k].y;
                        maxX = drObj.points[k].x;
                    }
                    else {
                        if (minX > drObj.points[k].x) {
                            minX = drObj.points[k].x;
                        }
                        if (maxX < drObj.points[k].x) {
                            maxX = drObj.points[k].x;
                        }
                        if (minY > drObj.points[k].y) {
                            minY = drObj.points[k].y;
                        }
                        if (maxY < drObj.points[k].y) {
                            maxY = drObj.points[k].y;
                        }
                    }
                }
                boundingBox.y = minY;
                boundingBox.x = minX;
                boundingBox.height = maxY - minY;
                boundingBox.width = maxX - minX;
                break;
            case (dr_type_enum_1.DrType.IMAGE):
            case (dr_type_enum_1.DrType.TEXT):
            case (dr_type_enum_1.DrType.RECTANGLE):
                boundingBox.y = drObj.y;
                boundingBox.x = drObj.x;
                boundingBox.width = drObj.width;
                boundingBox.height = drObj.height;
                break;
            case (dr_type_enum_1.DrType.GROUPED_OBJECT): {
                boundingBox = this.getBoundingBox(drObj.objects);
                break;
            }
        }
        return boundingBox;
    };
    DrawerObjectHelperService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    DrawerObjectHelperService.ctorParameters = function () { return []; };
    return DrawerObjectHelperService;
}());
exports.DrawerObjectHelperService = DrawerObjectHelperService;
//# sourceMappingURL=drawer-object-helper.service.js.map