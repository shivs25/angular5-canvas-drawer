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
        this.penDblClick = '';
        this.polygonStyle = null;
        this.lineStyle = null;
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
    PenToolComponent.prototype.onResizerMouseMove = function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
        if (this._currentPt) {
            var pt = this.getActivePoint(this.getResizerX() + HALF_SIZER, this.getResizerY() + HALF_SIZER);
            Object.assign(this._currentPt, {
                x: pt.x,
                y: pt.y
            });
        }
        else {
            this._currentPt = this.getActivePoint(this.getResizerX() + HALF_SIZER, this.getResizerY() + HALF_SIZER);
            this.currentObject.points.push(this._currentPt);
        }
    };
    PenToolComponent.prototype.onBackgroundMouseMove = function (evt) {
        if (this.currentObject) {
            this._lastEvent = evt;
            if (this._delay) {
                if (this._currentPt.x !== evt.offsetX && this._currentPt.y !== evt.offsetY) {
                    this.handleClick(this._clickPt.x, this._clickPt.y);
                }
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
        evt.stopPropagation();
        evt.preventDefault();
        if (this._delay) {
            //console.log('Double Click Action');
            if (this._delay) {
                //console.log('Unsubscribed!');
                this._delay.unsubscribe();
                this._delay = null;
            }
            this.currentObject.points.push(this.getActivePoint(evt.offsetX, evt.offsetY));
            if (this.penDblClick.toLowerCase().trim() === 'clear') {
                this.reset();
            }
            else if (this.penDblClick.toLowerCase().trim() === 'complete') {
                this.completeObject(true);
            }
            else {
                this.completeObject(false);
            }
        }
        else {
            this._clickPt = this.getActivePoint(evt.offsetX, evt.offsetY);
            ;
            this._delay = Observable_1.Observable.of(null).delay(DOUBLE_CLICK_TIME).subscribe(function () {
                if (_this._delay) {
                    //console.log('Single Click Action');
                    _this.handleClick(_this._clickPt.x, _this._clickPt.y);
                }
            });
        }
    };
    PenToolComponent.prototype.onResizerClick = function (evt) {
        evt.stopPropagation();
        this.completeObject(true);
    };
    PenToolComponent.prototype.getResizerX = function () {
        return this.currentObject.points[0].x - HALF_SIZER;
    };
    PenToolComponent.prototype.getResizerY = function () {
        return this.currentObject.points[0].y - HALF_SIZER;
    };
    PenToolComponent.prototype.finalize = function () {
        //Not Implemented
    };
    PenToolComponent.prototype.handleClick = function (x, y) {
        if (this._delay) {
            //console.log('Unsubscribed!');
            this._delay.unsubscribe();
            this._delay = null;
        }
        if (this.currentObject) {
            if (!this._currentPt) {
                //console.log('Adding Point!');
                this.currentObject.points.push({ x: x, y: y });
            }
            this._currentPt = null;
        }
        else {
            //console.log('Create new obj!');
            this.currentObject = dr_polygon_1.createDrPolyline({
                id: 1000000,
                name: this._dataService.getUniqueName("Polyline"),
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
    PenToolComponent.prototype.getNextId = function () {
        return 0 === this._dataService.elements.length ? 1 :
            Math.max.apply(Math, this._dataService.elements.map(function (o) { return o.id; })) + 1;
    };
    PenToolComponent.prototype.completeObject = function (isClosed) {
        if (this.currentObject.points[this.currentObject.points.length - 1].x === this.currentObject.points[this.currentObject.points.length - 2].x
            && this.currentObject.points[this.currentObject.points.length - 1].y === this.currentObject.points[this.currentObject.points.length - 2].y) {
            this.currentObject.points.splice(this.currentObject.points.length - 1, 1);
        }
        if (this.currentObject &&
            null !== this.currentObject &&
            this.currentObject.points.length > 1) {
            ;
            var newObject = void 0;
            if (this.currentObject.points.length > 3 && isClosed) {
                newObject = dr_polygon_1.createDrPolygon({ id: this.getNextId(), points: this.currentObject.points.slice(0, this.currentObject.points.length - 1), name: "Polygon" });
            }
            else {
                newObject = dr_polygon_1.createDrPolyline({ id: this.getNextId(), points: this.currentObject.points, name: "Polyline" });
            }
            this._dataService.addObjects([
                newObject
            ]);
            if (this.polygonStyle && isClosed) {
                this._dataService.setStyles([newObject], this.polygonStyle);
            }
            if (this.lineStyle && !isClosed) {
                this._dataService.setStyles([newObject], this.lineStyle);
            }
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
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], PenToolComponent.prototype, "penDblClick", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], PenToolComponent.prototype, "polygonStyle", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], PenToolComponent.prototype, "lineStyle", void 0);
    __decorate([
        core_1.HostListener('window:keydown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], PenToolComponent.prototype, "onKeyDown", null);
    __decorate([
        core_1.HostListener('window:keyup', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], PenToolComponent.prototype, "onKeyUp", null);
    PenToolComponent = __decorate([
        core_1.Component({
            selector: 'app-pen-tool',
            template: "\n    <div class=\"absolute-position fill-parent\">\n    \n      <svg (click)=\"onBackgroundClick($event)\" (mousemove)=\"onBackgroundMouseMove($event)\" \n            [ngClass]=\"'crosshair'\"\n            class=\"absolute-position fill-parent\" xmlns=\"http://www.w3.org/2000/svg\">\n          <ng-container *ngIf=\"currentObject && currentObject.points.length > 1\" dynamic-svg \n            [componentData]=\"currentObject\" \n            [overrideProperties]=\"objectStyle\" \n            [canInteract]=\"false\" elementId=\"1000000\">\n          </ng-container>\n\n          <rect [id]=\"'resizer-pen'\" \n            *ngIf=\"currentObject && currentObject.points.length > 1\"\n            (click)=\"onResizerClick($event)\"\n            (mousemove)=\"onResizerMouseMove($event)\"\n            width=\"8\" height= \"8\" fill=\"green\" [attr.x]=\"getResizerX()\" [attr.y]=\"getResizerY()\"></rect>\n      </svg>\n\n     </div>\n  ",
            styles: ["\n\n  "]
        }),
        __metadata("design:paramtypes", [data_store_service_1.DataStoreService])
    ], PenToolComponent);
    return PenToolComponent;
}());
exports.PenToolComponent = PenToolComponent;
//# sourceMappingURL=pen-tool.component.js.map