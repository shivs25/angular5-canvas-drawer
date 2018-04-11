"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dr_type_enum_1 = require("../models/dr-type.enum");
var bounding_box_1 = require("../models/bounding-box");
var clipperLib = require("js-angusj-clipper");
var RADIUS = 16;
var DrawerObjectHelperService = /** @class */ (function () {
    function DrawerObjectHelperService() {
        this.clipper = null;
        this.clipperRequested = false;
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
    DrawerObjectHelperService.prototype.getBoundingBoxForPoints = function (points) {
        var left = Math.min.apply(Math, points.map(function (b) { return b.x; }));
        var right = Math.max.apply(Math, points.map(function (b) { return b.x; }));
        var top = Math.min.apply(Math, points.map(function (b) { return b.y; }));
        var bottom = Math.max.apply(Math, points.map(function (b) { return b.y; }));
        return {
            x: left,
            y: top,
            width: right - left,
            height: bottom - top
        };
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
    DrawerObjectHelperService.prototype.getRotatedPoint = function (x, y, originX, originY, angle) {
        var radians = angle * Math.PI / 180;
        var newX = Math.cos(radians) * (x - originX) - Math.sin(radians) * (y - originY) + originX;
        var newY = Math.sin(radians) * (x - originX) + Math.cos(radians) * (y - originY) + originY;
        return {
            x: newX,
            y: newY
        };
    };
    DrawerObjectHelperService.prototype.getRotatedBounds = function (item) {
        return this.getRotatedBoundingBox(this.getBoundingBox([item]), item.rotation);
    };
    DrawerObjectHelperService.prototype.getRotatedBoundingBox = function (bb, rotation) {
        var returnValue = bounding_box_1.createBoundingBox();
        //top left
        var x1 = bb.x;
        var y1 = bb.y;
        //bottom left
        var x2 = bb.x;
        var y2 = bb.y + bb.height;
        //top right
        var x3 = bb.x + bb.width;
        var y3 = bb.y;
        //bottom right
        var x4 = bb.x + bb.width;
        var y4 = bb.y + bb.height;
        //Center of boundingbox
        var centerX = bb.x + (bb.width / 2);
        var centerY = bb.y + (bb.height / 2);
        var point1 = this.getRotatedPoint(x1, y1, centerX, centerY, rotation);
        var point2 = this.getRotatedPoint(x2, y2, centerX, centerY, rotation);
        var point3 = this.getRotatedPoint(x3, y3, centerX, centerY, rotation);
        var point4 = this.getRotatedPoint(x4, y4, centerX, centerY, rotation);
        var points = [point1, point2, point3, point4];
        var minX = 0;
        var minY = 0;
        var maxX = 0;
        var maxY = 0;
        for (var k = 0; k < points.length; k++) {
            if (k === 0) {
                minX = points[k].x;
                minY = points[k].y;
                maxY = points[k].y;
                maxX = points[k].x;
            }
            else {
                if (minX > points[k].x) {
                    minX = points[k].x;
                }
                if (maxX < points[k].x) {
                    maxX = points[k].x;
                }
                if (minY > points[k].y) {
                    minY = points[k].y;
                }
                if (maxY < points[k].y) {
                    maxY = points[k].y;
                }
            }
        }
        returnValue.y = minY;
        returnValue.x = minX;
        returnValue.height = maxY - minY;
        returnValue.width = maxX - minX;
        return returnValue;
    };
    DrawerObjectHelperService.prototype.getRotatedPoints = function (drObj) {
        var returnValue = [];
        switch (drObj.drType) {
            case (dr_type_enum_1.DrType.ELLIPSE):
                var e = drObj;
                returnValue.push(this.getRotatedPoint(e.x - e.rx, e.y - e.ry, e.x, e.y, e.rotation));
                returnValue.push(this.getRotatedPoint(e.x + e.rx, e.y + e.ry, e.x, e.y, e.rotation));
                returnValue.push(this.getRotatedPoint(e.x - e.rx, e.y + e.ry, e.x, e.y, e.rotation));
                returnValue.push(this.getRotatedPoint(e.x + e.rx, e.y - e.ry, e.x, e.y, e.rotation));
                break;
            case (dr_type_enum_1.DrType.POLYGON):
                var p = drObj;
                var b = this.getBoundingBox([drObj]);
                for (var k = 0; k < p.points.length; k++) {
                    returnValue.push(this.getRotatedPoint(p.points[k].x, p.points[k].y, b.x + b.width / 2, b.y + b.height / 2, p.rotation));
                }
                break;
            case (dr_type_enum_1.DrType.IMAGE):
            case (dr_type_enum_1.DrType.TEXT):
            case (dr_type_enum_1.DrType.RECTANGLE):
                var r = drObj;
                returnValue.push(this.getRotatedPoint(r.x, r.y, r.x + r.width / 2, r.y + r.height / 2, r.rotation));
                returnValue.push(this.getRotatedPoint(r.x + r.width, r.y, r.x + r.width / 2, r.y + r.height / 2, r.rotation));
                returnValue.push(this.getRotatedPoint(r.x, r.y + r.height, r.x + r.width / 2, r.y + r.height / 2, r.rotation));
                returnValue.push(this.getRotatedPoint(r.x + r.width, r.y + r.height, r.x + r.width / 2, r.y + r.height / 2, r.rotation));
                break;
            case (dr_type_enum_1.DrType.CALLOUT):
                var c = drObj;
                returnValue = [
                    { x: c.x, y: c.y },
                    { x: c.x + c.width, y: c.y },
                    { x: c.x, y: c.y + c.height },
                    { x: c.x + c.width, y: c.y + c.height },
                    c.basePoint1,
                    c.basePoint2,
                    c.pointerLocation
                ];
                break;
            case (dr_type_enum_1.DrType.GROUPED_OBJECT): {
                var pts = void 0;
                var g = drObj;
                for (var i = 0; i < g.objects.length; i++) {
                    returnValue = returnValue.concat(this.getRotatedPoints(g.objects[i]));
                }
                break;
            }
        }
        return returnValue;
    };
    DrawerObjectHelperService.prototype.getUnionOfShapes = function (shape1, shape2) {
        var _this = this;
        if (null === this.clipper && !this.clipperRequested) {
            this.clipperRequested = true;
            clipperLib.loadNativeClipperLibInstanceAsync(clipperLib.NativeClipperLibRequestedFormat.WasmWithAsmJsFallback).then(function (val) {
                _this.clipper = val;
            });
        }
        var polyResult = null !== this.clipper ? this.clipper.clipToPaths({
            clipType: clipperLib.ClipType.Union,
            subjectInputs: [
                { data: shape1 }
            ],
            clipInputs: [
                { data: shape2 }
            ],
            subjectFillType: clipperLib.PolyFillType.EvenOdd
        }) : null;
        return null !== polyResult ? polyResult[0] : null;
    };
    DrawerObjectHelperService.prototype.getCalloutPath = function (v) {
        var b = [
            { x: v.x, y: v.y },
            { x: v.x, y: v.y + v.height },
            { x: v.x + v.width, y: v.y + v.height },
            { x: v.x + v.width, y: v.y }
        ];
        var points;
        if (v.drawPointer || !v.pointerLocked) {
            try {
                points = this.getUnionOfShapes(b, [
                    v.basePoint1,
                    v.basePoint2,
                    v.pointerLocation
                ]);
            }
            catch (e) {
                points = [b[2], b[1], b[0], b[3]];
            }
        }
        else {
            points = [b[2], b[1], b[0], b[3]]; //Points have to be in this order for the for loop below to work.
        }
        var returnValue = "";
        if (null !== points) {
            if (v.rounded && v.width > 32 && v.height > 32) {
                var p = void 0;
                var c = void 0;
                var d = [];
                for (var i = 0; i < points.length; i++) {
                    p = points[i];
                    c = this.getCorner(b, p);
                    switch (c) {
                        case 0:
                            if (i === 0) {
                                d.push("M");
                            }
                            else {
                                d.push("L");
                            }
                            d.push.apply(d, [
                                p.x.toString(),
                                (p.y + 16).toString(),
                                "A", RADIUS.toString(), RADIUS.toString(), "0", "0", "1", (p.x + RADIUS).toString(), p.y.toString()
                            ]);
                            break;
                        case 1:
                            if (i === 0) {
                                d.push("M");
                            }
                            else {
                                d.push("L");
                            }
                            d.push.apply(d, [
                                (p.x + RADIUS).toString(),
                                p.y.toString(),
                                "A", RADIUS.toString(), RADIUS.toString(), "0", "0", "1", p.x.toString(), (p.y - RADIUS).toString()
                            ]);
                            break;
                        case 2:
                            if (i === 0) {
                                d.push("M");
                            }
                            else {
                                d.push("L");
                            }
                            d.push.apply(d, [
                                p.x.toString(),
                                (p.y - RADIUS).toString(),
                                "A", RADIUS.toString(), RADIUS.toString(), "0", "0", "1", (p.x - RADIUS).toString(), p.y.toString()
                            ]);
                            break;
                        case 3:
                            if (i === 0) {
                                d.push("M");
                            }
                            else {
                                d.push("L");
                            }
                            d.push.apply(d, [
                                (p.x - RADIUS).toString(),
                                p.y.toString(),
                                "A", RADIUS.toString(), RADIUS.toString(), "0", "0", "1", p.x.toString(), (p.y + RADIUS).toString()
                            ]);
                            break;
                        default:
                            if (i === 0) {
                                d.push("M");
                            }
                            else {
                                d.push("L");
                            }
                            d.push.apply(d, [
                                p.x.toString(),
                                p.y.toString()
                            ]);
                            break;
                    }
                }
                d.push("Z");
                returnValue = d.join(" ");
            }
            else {
                for (var i = 0; i < points.length; i++) {
                    if (0 === i) {
                        returnValue += "M" + points[i].x + "," + points[i].y + " ";
                    }
                    else {
                        returnValue += "L" + points[i].x + "," + points[i].y + " ";
                    }
                }
                returnValue += "Z";
            }
        }
        return returnValue;
    };
    DrawerObjectHelperService.prototype.getCorner = function (b, p) {
        return b.findIndex(function (d) { return Math.abs(d.x - p.x) < 1 && Math.abs(d.y - p.y) < 1; });
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
            case (dr_type_enum_1.DrType.CALLOUT):
                var c = drObj;
                if (c.pointerLocked) {
                    boundingBox.y = drObj.y;
                    boundingBox.x = drObj.x;
                    boundingBox.width = drObj.width;
                    boundingBox.height = drObj.height;
                }
                else {
                    boundingBox.x = Math.min(c.x, c.pointerLocation.x);
                    boundingBox.y = Math.min(c.y, c.pointerLocation.y);
                    boundingBox.width = Math.max(c.x + c.width, c.pointerLocation.x) - boundingBox.x;
                    boundingBox.height = Math.max(c.y + c.height, c.pointerLocation.y) - boundingBox.y;
                }
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