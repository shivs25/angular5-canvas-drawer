"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dr_polygon_1 = require("../../models/dr-polygon");
var data_store_service_1 = require("../../services/data-store.service");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/delay");
require("rxjs/add/observable/of");
var enums_1 = require("../../models/enums");
var SIZER_SIZE = 8;
var HALF_SIZER = 4;
var DOUBLE_CLICK_TIME = 250;
var SNAP_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315, 360];
var PenToolComponent = /** @class */ (function () {
    function PenToolComponent(_dataService) {
        this._dataService = _dataService;
        this.currentObject = null;
        this.objectStyle = {
            showFill: true,
            fill: "rgba(255, 0, 0, 0.3)",
            dashedLine: false,
            showStroke: true,
            stroke: 'red',
            strokeWidth: 1
        };
        this._currentPt = null;
        this._clickPt = null;
        this._lastEvent = null;
        this._modifierKeys = {
            shift: false,
            alt: false,
            control: false
        };
    }
    PenToolComponent.prototype.ngOnInit = function () {
    };
    PenToolComponent.prototype.onKeyDown = function (evt) {
        if ((enums_1.EditorToolType.PEN_TOOL === this._dataService.selectedTool)) {
            switch (evt.key) {
                case "Shift":
                case "Control":
                case "Alt":
                    this._modifierKeys[evt.key.toLowerCase()] = true;
                    this.onBackgroundMouseMove(this._lastEvent);
                    break;
            }
        }
    };
    PenToolComponent.prototype.onKeyUp = function (evt) {
        if ((enums_1.EditorToolType.PEN_TOOL === this._dataService.selectedTool)) {
            switch (evt.key) {
                case "Shift":
                case "Control":
                case "Alt":
                    this._modifierKeys[evt.key.toLowerCase()] = false;
                    this.onBackgroundMouseMove(this._lastEvent);
                    break;
                case "Escape":
                    this.reset();
                    break;
            }
        }
    };
    PenToolComponent.prototype.onBackgroundMouseMove = function (evt) {
        if (this.currentObject) {
            this._lastEvent = evt;
            if (this._delay) {
                this.handleClick(this._clickPt.x, this._clickPt.y);
            }
            else {
                if (this._currentPt) {
                    var pt = this.getActivePoint(evt.offsetX, evt.offsetY);
                    Object.assign(this._currentPt, {
                        x: pt.x,
                        y: pt.y
                    });
                }
                else {
                    this._currentPt = this.getActivePoint(evt.offsetX, evt.offsetY);
                    this.currentObject.points.push(this._currentPt);
                }
            }
        }
    };
    PenToolComponent.prototype.onBackgroundClick = function (evt) {
        var _this = this;
        if (this._delay) {
            this.currentObject.points.push(this.getActivePoint(evt.offsetX, evt.offsetY));
            this.completeObject();
        }
        else {
            this._clickPt = this.getActivePoint(evt.offsetX, evt.offsetY);
            ;
            this._delay = Observable_1.Observable.of(null).delay(DOUBLE_CLICK_TIME).subscribe(function () {
                if (_this._delay) {
                    _this.handleClick(_this._clickPt.x, _this._clickPt.y);
                }
            });
        }
    };
    PenToolComponent.prototype.onResizerClick = function (evt) {
        evt.stopPropagation();
        this.completeObject();
    };
    PenToolComponent.prototype.getResizerX = function () {
        return this.currentObject.points[0].x - HALF_SIZER;
    };
    PenToolComponent.prototype.getResizerY = function () {
        return this.currentObject.points[0].y - HALF_SIZER;
    };
    PenToolComponent.prototype.handleClick = function (x, y) {
        if (this._delay) {
            this._delay.unsubscribe();
            this._delay = null;
        }
        if (this.currentObject) {
            if (!this._currentPt) {
                this.currentObject.points.push({ x: x, y: y });
            }
            this._currentPt = null;
        }
        else {
            this.currentObject = dr_polygon_1.createDrPolygon({
                id: 1000000,
                name: this._dataService.getUniqueName("Polygon"),
                points: [{ x: x, y: y }]
            });
        }
    };
    PenToolComponent.prototype.getActivePoint = function (x, y) {
        var returnValue = { x: x, y: y };
        if (this._modifierKeys.shift && this.currentObject.points.length > 1) {
            var lastPoint = this.currentObject.points[this.currentObject.points.length - 2];
            var angle_1 = (360 + this.getRotationAngle(lastPoint, returnValue)) % 360;
            var snapped = SNAP_ANGLES.slice(0);
            var snappedAngle = snapped.sort(function (a, b) {
                return Math.abs(angle_1 - a) - Math.abs(angle_1 - b);
            })[0];
            var dist = Math.sqrt(Math.pow(Math.abs(returnValue.x - lastPoint.x), 2) +
                Math.pow(Math.abs(returnValue.y - lastPoint.y), 2));
            returnValue = this.pointOnLine(lastPoint.x, lastPoint.y, snappedAngle, dist);
        }
        return returnValue;
    };
    PenToolComponent.prototype.pointOnLine = function (x, y, angle, distance) {
        return {
            x: Math.round(Math.cos(angle * Math.PI / 180) * distance + x),
            y: Math.round(Math.sin(angle * Math.PI / 180) * distance + y)
        };
    };
    PenToolComponent.prototype.getRotationAngle = function (a, b) {
        return Math.round(Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI);
    };
    PenToolComponent.prototype.completeObject = function () {
        if (this.currentObject &&
            null !== this.currentObject &&
            this.currentObject.points.length > 2) {
            ;
            var newObject = dr_polygon_1.createDrPolygon({ points: this.currentObject.points, name: this.currentObject.name });
            this._dataService.addObjects([
                newObject
            ]);
            this._dataService.selectObjects([newObject]);
        }
        this.reset();
    };
    PenToolComponent.prototype.reset = function () {
        this.currentObject = null;
        this._currentPt = null;
        this._clickPt = null;
        if (this._delay) {
            this._delay.unsubscribe();
            this._delay = null;
        }
    };
    PenToolComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-pen-tool',
                    template: "\n    <div class=\"absolute-position fill-parent\">\n    \n      <svg (click)=\"onBackgroundClick($event)\" (mousemove)=\"onBackgroundMouseMove($event)\" \n            [ngClass]=\"'crosshair'\"\n            class=\"absolute-position fill-parent\" xmlns=\"http://www.w3.org/2000/svg\">\n          <ng-container *ngIf=\"currentObject && currentObject.points.length > 1\" dynamic-svg \n            [componentData]=\"currentObject\" \n            [overrideProperties]=\"objectStyle\" \n            [canInteract]=\"false\" elementId=\"1000000\">\n          </ng-container>\n\n          <rect [id]=\"'resizer-pen'\" \n            *ngIf=\"currentObject && currentObject.points.length > 1\"\n            (click)=\"onResizerClick($event)\"\n            width=\"8\" height= \"8\" fill=\"green\" [attr.x]=\"getResizerX()\" [attr.y]=\"getResizerY()\"></rect>\n      </svg>\n\n     </div>\n  ",
                    styles: ["\n\n  "]
                },] },
    ];
    /** @nocollapse */
    PenToolComponent.ctorParameters = function () { return [
        { type: data_store_service_1.DataStoreService, },
    ]; };
    PenToolComponent.propDecorators = {
        "onKeyDown": [{ type: core_1.HostListener, args: ['window:keydown', ['$event'],] },],
        "onKeyUp": [{ type: core_1.HostListener, args: ['window:keyup', ['$event'],] },],
    };
    return PenToolComponent;
}());
exports.PenToolComponent = PenToolComponent;
//# sourceMappingURL=pen-tool.component.js.map