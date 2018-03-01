"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dr_type_enum_1 = require("../models/dr-type.enum");
var bounding_box_1 = require("../models/bounding-box");
var DrawerObjectHelperService = (function () {
    function DrawerObjectHelperService() {
    }
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