"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var data_store_service_1 = require("../../services/data-store.service");
var enums_1 = require("../../models/enums");
var HALF_SIZER = 4;
var CalloutPointToolComponent = /** @class */ (function () {
    function CalloutPointToolComponent(dataService) {
        this.dataService = dataService;
        this.SIZER_SIZE = HALF_SIZER * 2;
        this.sizerOffsetX = 0;
        this.sizerOffsetY = 0;
        this.mouseDown = false;
        this.sizer = -1;
        this.point1Bounds = null;
        this.point2Bounds = null;
        this.pointerBounds = null;
        this.points = [];
        this.polyBounds = null;
        this.objectBounds = null;
    }
    CalloutPointToolComponent.prototype.ngOnInit = function () {
        var c = this.dataService.selectedObjects[0];
        this.objectBounds = {
            x: c.x,
            y: c.y,
            width: c.width,
            height: c.height
        };
        this.points = [
            Object.assign({}, c.basePoint1),
            Object.assign({}, c.basePoint2),
            Object.assign({}, c.pointerLocation)
        ];
        this.point1Bounds = {
            left: c.basePoint1.x - HALF_SIZER,
            top: c.basePoint1.y - HALF_SIZER,
            width: HALF_SIZER * 2,
            height: HALF_SIZER * 2
        };
        this.point2Bounds = {
            left: c.basePoint2.x - HALF_SIZER,
            top: c.basePoint2.y - HALF_SIZER,
            width: HALF_SIZER * 2,
            height: HALF_SIZER * 2
        };
        this.pointerBounds = {
            left: c.pointerLocation.x - HALF_SIZER,
            top: c.pointerLocation.y - HALF_SIZER,
            width: HALF_SIZER * 2,
            height: HALF_SIZER * 2
        };
        this.polyBounds = this.getPolyBounds();
    };
    CalloutPointToolComponent.prototype.getPolyBounds = function () {
        var left = Math.min.apply(Math, this.points.map(function (b) { return b.x; }));
        var right = Math.max.apply(Math, this.points.map(function (b) { return b.x; }));
        var top = Math.min.apply(Math, this.points.map(function (b) { return b.y; }));
        var bottom = Math.max.apply(Math, this.points.map(function (b) { return b.y; }));
        return {
            left: left,
            top: top,
            width: right - left,
            height: bottom - top
        };
    };
    CalloutPointToolComponent.prototype.getPoints = function () {
        return (this.points[0].x - this.polyBounds.left) + " " +
            (this.points[0].y - this.polyBounds.top) + " " +
            (this.points[1].x - this.polyBounds.left) + " " +
            (this.points[1].y - this.polyBounds.top) + " " +
            (this.points[2].x - this.polyBounds.left) + " " +
            (this.points[2].y - this.polyBounds.top);
    };
    CalloutPointToolComponent.prototype.onSizerMouseDown = function (evt, index) {
        evt.stopPropagation();
        evt.preventDefault();
        this.sizerOffsetX = evt.offsetX - HALF_SIZER;
        this.sizerOffsetY = evt.offsetY - HALF_SIZER;
        this.mouseDown = true;
        this.sizer = index;
    };
    CalloutPointToolComponent.prototype.onBackgroundMouseDown = function (evt) {
        this.dataService.selectedTool = enums_1.EditorToolType.SELECTOR_TOOL;
    };
    CalloutPointToolComponent.prototype.onBackgroundMouseMove = function (evt) {
        if (this.mouseDown) {
            var valid = false;
            switch (this.sizer) {
                case 0:
                    if (this.isInBounds(evt.offsetX, evt.offsetY)) {
                        valid = true;
                        Object.assign(this.point1Bounds, {
                            left: evt.offsetX - this.sizerOffsetX - HALF_SIZER,
                            top: evt.offsetY - this.sizerOffsetY - HALF_SIZER
                        });
                    }
                    break;
                case 1:
                    if (this.isInBounds(evt.offsetX, evt.offsetY)) {
                        valid = true;
                        Object.assign(this.point2Bounds, {
                            left: evt.offsetX - this.sizerOffsetX - HALF_SIZER,
                            top: evt.offsetY - this.sizerOffsetY - HALF_SIZER
                        });
                    }
                    break;
                case 2:
                    if (!this.isInBounds(evt.offsetX, evt.offsetY)) {
                        valid = true;
                        Object.assign(this.pointerBounds, {
                            left: evt.offsetX - this.sizerOffsetX - HALF_SIZER,
                            top: evt.offsetY - this.sizerOffsetY - HALF_SIZER
                        });
                    }
                    break;
            }
            if (valid) {
                this.points[this.sizer].x = evt.offsetX - this.sizerOffsetX;
                this.points[this.sizer].y = evt.offsetY - this.sizerOffsetY;
                this.polyBounds = this.getPolyBounds();
            }
        }
    };
    CalloutPointToolComponent.prototype.onBackgroundMouseUp = function (evt) {
        if (this.mouseDown) {
            this.mouseDown = false;
            this.dataService.setCalloutPointer(this.dataService.selectedObjects[0], this.points[0], this.points[1], this.points[2]);
        }
    };
    CalloutPointToolComponent.prototype.pixelizeBounds = function (bounds) {
        var returnValue = Object.assign({}, bounds);
        if (bounds.left) {
            returnValue.left = bounds.left + "px";
        }
        if (bounds.top) {
            returnValue.top = bounds.top + "px";
        }
        if (bounds.width) {
            returnValue.width = bounds.width + "px";
        }
        if (bounds.height) {
            returnValue.height = bounds.height + "px";
        }
        return returnValue;
    };
    CalloutPointToolComponent.prototype.isInBounds = function (x, y) {
        if (x >= this.objectBounds.x && x <= this.objectBounds.x + this.objectBounds.width &&
            y >= this.objectBounds.y && y <= this.objectBounds.y + this.objectBounds.height) {
            return true;
        }
        return false;
    };
    CalloutPointToolComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-callout-point-tool',
                    template: "\n    <div class=\"absolute-position fill-parent\"\n      (mousedown)=\"onBackgroundMouseDown($event)\"\n      (mousemove)=\"onBackgroundMouseMove($event)\"\n      (mouseup)=\"onBackgroundMouseUp($event)\">\n\n      <svg xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"polyBounds && point1Bounds && point2Bounds && pointerBounds\"\n        [ngStyle]=\"pixelizeBounds(polyBounds)\" class=\"no-interact\">\n        <svg:polygon\n          [attr.points]=\"getPoints()\"\n          fill=\"transparent\"\n          stroke=\"red\"\n          stroke-width=\"1\">\n        </svg:polygon>\n      </svg>\n\n        <svg xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"point1Bounds && (!mouseDown || sizer === 0)\"\n          [ngStyle]=\"pixelizeBounds(point1Bounds)\" [ngClass]=\"{ 'no-interact': mouseDown }\">\n           <rect id='point1'\n                class='crosshair'\n                (mousedown)=\"onSizerMouseDown($event, 0)\" \n                [attr.width]=\"SIZER_SIZE\" \n                [attr.height]= \"SIZER_SIZE\" \n                fill=\"green\">\n            </rect>\n        </svg>\n        <svg xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"point2Bounds && (!mouseDown || sizer === 1)\"\n          [ngStyle]=\"pixelizeBounds(point2Bounds)\" [ngClass]=\"{ 'no-interact': mouseDown }\">\n           <rect id='point2'\n                class='crosshair'\n                (mousedown)=\"onSizerMouseDown($event, 1)\" \n                [attr.width]=\"SIZER_SIZE\" \n                [attr.height]= \"SIZER_SIZE\" \n                fill=\"green\">\n            </rect>\n        </svg>\n        <svg xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"pointerBounds && (!mouseDown || sizer === 2)\"\n          [ngStyle]=\"pixelizeBounds(pointerBounds)\" [ngClass]=\"{ 'no-interact': mouseDown }\">\n           <rect id='pointer'\n                class='crosshair'\n                (mousedown)=\"onSizerMouseDown($event, 2)\" \n                [attr.width]=\"SIZER_SIZE\" \n                [attr.height]= \"SIZER_SIZE\" \n                fill=\"green\">\n            </rect>\n        </svg>\n    </div>\n  ",
                    styles: ["\n\n  "]
                },] },
    ];
    /** @nocollapse */
    CalloutPointToolComponent.ctorParameters = function () { return [
        { type: data_store_service_1.DataStoreService, },
    ]; };
    return CalloutPointToolComponent;
}());
exports.CalloutPointToolComponent = CalloutPointToolComponent;
//# sourceMappingURL=callout-point-tool.component.js.map