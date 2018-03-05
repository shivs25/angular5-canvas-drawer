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
var data_store_service_1 = require("../../services/data-store.service");
var store_1 = require("@angular-redux/store");
var dr_rect_1 = require("../../models/dr-rect");
var drawer_object_helper_service_1 = require("../../services/drawer-object-helper.service");
var change_helper_service_1 = require("../../services/change-helper.service");
var SIZER_SIZE = 8;
var HALF_SIZER = 4;
var SelectorToolComponent = /** @class */ (function () {
    function SelectorToolComponent(_dataStoreService, _objectHelperService, _changeService) {
        this._dataStoreService = _dataStoreService;
        this._objectHelperService = _objectHelperService;
        this._changeService = _changeService;
        //Dummy array to use in the ngFor
        this.sizers = [0, 1, 2, 3, 4, 5, 6, 7];
        this.boundingBoxObjectUniqueId = 1000000;
        this.boundingBoxObject = null;
        this.selectedObjects = [];
        this.selectionTransform = null;
        this.cssBounds = null;
        this.cursor = 'grabber';
        this.invisibleStyle = {
            showFill: false,
            showStroke: false
        };
        this.selectionStyle = {
            showFill: true,
            fill: "rgba(255, 0, 0, 0.3)",
            dashedLine: false,
            showStroke: true,
            stroke: 'red',
            strokeWidth: 1
        };
        this._mouseDownClones = null;
        this._mouseDownLocation = null;
        this._mouseDown = false;
        this._mouseDownSizer = -1;
    }
    SelectorToolComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._subRedid = this._dataStoreService.redid.subscribe(function () {
            _this.setupBounds();
        });
        this._subUndid = this._dataStoreService.undid.subscribe(function () {
            _this.setupBounds();
        });
        this.setupBounds();
    };
    SelectorToolComponent.prototype.onBackgroundMouseDown = function (evt) {
        this.onMouseDown({
            location: {
                x: evt.clientX, y: evt.clientY
            },
            data: this.boundingBoxObject,
            shiftKey: evt.shiftKey,
            ctrlKey: evt.ctrlKey,
            altKey: evt.altKey
        });
    };
    SelectorToolComponent.prototype.onBackgroundMouseMove = function (evt) {
        this.onMouseMove({
            location: {
                x: evt.clientX, y: evt.clientY
            },
            data: this.boundingBoxObject,
            shiftKey: evt.shiftKey,
            ctrlKey: evt.ctrlKey,
            altKey: evt.altKey
        });
    };
    SelectorToolComponent.prototype.onBackgroundMouseUp = function (evt) {
        this.onMouseUp({
            location: {
                x: evt.clientX, y: evt.clientY
            },
            data: this.boundingBoxObject,
            shiftKey: evt.shiftKey,
            ctrlKey: evt.ctrlKey,
            altKey: evt.altKey
        });
    };
    SelectorToolComponent.prototype.onMouseDown = function (data) {
        if (null === data.data || !data.data.clickable) {
            this._dataStoreService.selectObjects([]);
            this.setupBounds();
        }
        else if (data.data) {
            if (data.data.id !== this.boundingBoxObjectUniqueId) {
                //Not the selected bounds object
                var selected = this._dataStoreService.selectedObjects.find(function (t) { return t.id === data.data.id; });
                if (selected) {
                    var index = this._dataStoreService.selectedObjects.indexOf(selected);
                    if (data.shiftKey) {
                        //Remove from selection
                        this._dataStoreService.selectObjects(this._dataStoreService.selectedObjects.slice(0, index).concat(this._dataStoreService.selectedObjects.slice(index + 1)));
                    }
                }
                else {
                    if (data.shiftKey) {
                        //Add to selection.
                        this._dataStoreService.selectObjects(this._dataStoreService.selectedObjects.concat([
                            data.data
                        ]));
                    }
                    else {
                        //Select new
                        this._dataStoreService.selectObjects([data.data]);
                    }
                }
            }
        }
        this.setupBounds();
        if (this._dataStoreService.selectedObjects.length > 0) {
            this._dataStoreService.beginEdit();
            this._mouseDownLocation = data.location;
            this._mouseDown = true;
            this._mouseDownSizer = -1;
            this.cursor = "grabbing";
        }
    };
    SelectorToolComponent.prototype.onMouseMove = function (data) {
        if (this._mouseDown && this._dataStoreService.selectedObjects.length > 0) {
            if (this._mouseDownSizer < 0) {
                //Moving objects
                Object.assign(this.cssBounds, {
                    left: this.boundingBoxObject.x - HALF_SIZER + (data.location.x - this._mouseDownLocation.x),
                    top: this.boundingBoxObject.y - HALF_SIZER + (data.location.y - this._mouseDownLocation.y)
                });
            }
            else {
                //Resizing objects
                this.resizeObjects(data.location);
            }
        }
    };
    SelectorToolComponent.prototype.onMouseUp = function (data) {
        if (this._mouseDown && this._dataStoreService.selectedObjects.length > 0) {
            if (this._mouseDownSizer < 0) {
                //Moving objects
                Object.assign(this.cssBounds, {
                    left: this.boundingBoxObject.x - HALF_SIZER + (data.location.x - this._mouseDownLocation.x),
                    top: this.boundingBoxObject.y - HALF_SIZER + (data.location.y - this._mouseDownLocation.y)
                });
            }
            else {
                //Resizing Objects
                this.resizeObjects(data.location);
            }
            this._dataStoreService.moveObjects(this._dataStoreService.selectedObjects, {
                x: this.cssBounds.left + HALF_SIZER,
                y: this.cssBounds.top + HALF_SIZER,
                width: this.cssBounds.width - SIZER_SIZE,
                height: this.cssBounds.height - SIZER_SIZE
            });
            this.setupBounds();
            this.cursor = "grabber";
            this._mouseDown = false;
            this._mouseDownSizer = -1;
            this._dataStoreService.endEdit();
        }
    };
    SelectorToolComponent.prototype.onResizerMouseDown = function (evt, index) {
        evt.stopPropagation();
        this._dataStoreService.beginEdit();
        this._mouseDownLocation = { x: evt.clientX, y: evt.clientY };
        this._mouseDown = true;
        this._mouseDownSizer = index;
        this.cursor = this.getResizerCursor(index);
        this._mouseDownClones = this._dataStoreService.selectedObjects.map(function (x) { return Object.assign({}, x); });
    };
    SelectorToolComponent.prototype.onResizerMouseMove = function (evt, index) {
        evt.stopPropagation();
        if (this._mouseDownSizer >= 0 &&
            this._mouseDown) {
            this.resizeObjects({ x: evt.clientX, y: evt.clientY });
        }
    };
    SelectorToolComponent.prototype.onResizerMouseUp = function (evt, index) {
        evt.stopPropagation();
        this.resizeObjects({ x: evt.clientX, y: evt.clientY });
        if (this._dataStoreService.selectedObjects.length > 0) {
            this._dataStoreService.moveObjects(this._dataStoreService.selectedObjects, {
                x: this.cssBounds.left + HALF_SIZER,
                y: this.cssBounds.top + HALF_SIZER,
                width: this.cssBounds.width - SIZER_SIZE,
                height: this.cssBounds.height - SIZER_SIZE
            });
            this.setupBounds();
        }
        this.cursor = "grabber";
        this._mouseDownSizer = -1;
        this._mouseDown = false;
        this._dataStoreService.endEdit();
    };
    SelectorToolComponent.prototype.getResizerX = function (index) {
        switch (index) {
            case 0:
            case 1:
            case 2:
                return this.boundingBoxObject.x - HALF_SIZER;
            case 3:
            case 7:
                return this.boundingBoxObject.x + this.boundingBoxObject.width / 2 - HALF_SIZER;
            case 4:
            case 5:
            case 6:
                return this.boundingBoxObject.x + this.boundingBoxObject.width - HALF_SIZER;
        }
    };
    SelectorToolComponent.prototype.getResizerY = function (index) {
        switch (index) {
            case 0:
            case 6:
            case 7:
                return this.boundingBoxObject.y - HALF_SIZER;
            case 1:
            case 5:
                return this.boundingBoxObject.y + this.boundingBoxObject.height / 2 - HALF_SIZER;
            case 2:
            case 3:
            case 4:
                return this.boundingBoxObject.y + this.boundingBoxObject.height - HALF_SIZER;
        }
    };
    SelectorToolComponent.prototype.getResizerCursor = function (index) {
        switch (index) {
            case 0:
            case 4:
                return 'resizer-diagonal-2';
            case 2:
            case 6:
                return 'resizer-diagonal-1';
            case 1:
            case 5:
                return 'resizer-left-right';
            case 3:
            case 7:
                return 'resizer-top-bottom';
        }
    };
    SelectorToolComponent.prototype.setupBounds = function () {
        if (null !== this._dataStoreService.selectedBounds) {
            this.selectedObjects = this._dataStoreService.selectedObjects.map(function (x) { return Object.assign({}, x); });
            var b = this._dataStoreService.selectedBounds;
            this.boundingBoxObject = dr_rect_1.createDrRect({
                id: this.boundingBoxObjectUniqueId,
                x: b.x,
                y: b.y,
                width: b.width,
                height: b.height,
                showFill: false,
                showStroke: true,
                stroke: 'red',
                dashedLine: false
            });
            this.selectionTransform = "translate(" + (b.x * -1 + HALF_SIZER) + " " + (b.y * -1 + HALF_SIZER) + ")";
            this.cssBounds = {
                left: b.x - HALF_SIZER,
                top: b.y - HALF_SIZER,
                width: b.width + SIZER_SIZE,
                height: b.height + SIZER_SIZE
            };
        }
        else {
            this.selectedObjects = [];
            this.boundingBoxObject = null;
            this.selectionTransform = "translate(0 0)";
            this.cssBounds = null;
        }
    };
    SelectorToolComponent.prototype.resizeObjects = function (location) {
        var b = this._dataStoreService.selectedBounds;
        switch (this._mouseDownSizer) {
            case 0:
                break;
            case 1:
                this.resizeH(b, location, false);
                break;
            case 3:
                this.resizeV(b, location, true);
                break;
            case 5:
                this.resizeH(b, location, true);
                break;
            case 7:
                this.resizeV(b, location, false);
        }
    };
    SelectorToolComponent.prototype.resizeH = function (b, location, opposite) {
        var currentX = (opposite ? b.x + b.width : b.x) + (location.x - this._mouseDownLocation.x);
        var left = 0;
        var width = 0;
        var elementWidth = 0;
        var threshold = opposite ? b.x : b.x + b.width;
        if (location.x < threshold) {
            left = currentX - HALF_SIZER;
            width = threshold + HALF_SIZER - left;
            elementWidth = threshold - currentX;
        }
        else {
            left = threshold - HALF_SIZER;
            width = currentX + HALF_SIZER - left;
            elementWidth = currentX - threshold;
        }
        if (width > 0 && elementWidth > 0) {
            Object.assign(this.cssBounds, {
                left: left,
                width: width
            });
            Object.assign(this.boundingBoxObject, {
                width: elementWidth
            });
            this.applyResizeChanges();
        }
    };
    SelectorToolComponent.prototype.resizeV = function (b, location, opposite) {
        var currentY = (opposite ? b.y + b.height : b.y) + (location.y - this._mouseDownLocation.y);
        var top = 0;
        var height = 0;
        var elementHeight = 0;
        var threshold = opposite ? b.y : b.y + b.height;
        if (location.y < threshold) {
            top = currentY - HALF_SIZER;
            height = threshold + HALF_SIZER - top;
            elementHeight = threshold - currentY;
        }
        else {
            top = threshold - HALF_SIZER;
            height = currentY + HALF_SIZER - top;
            elementHeight = currentY - threshold;
        }
        if (height > 0 && elementHeight > 0) {
            Object.assign(this.cssBounds, {
                top: top,
                height: height
            });
            Object.assign(this.boundingBoxObject, {
                height: elementHeight
            });
            this.applyResizeChanges();
        }
    };
    SelectorToolComponent.prototype.applyResizeChanges = function () {
        var clone;
        var _loop_1 = function (s) {
            clone = this_1._mouseDownClones.find(function (t) { return t.id === s.id; });
            Object.assign(s, this_1._changeService.getBoundsChanges(clone, this_1._objectHelperService.getBoundingBox([this_1.boundingBoxObject]), this_1._dataStoreService.selectedBounds));
        };
        var this_1 = this;
        for (var _i = 0, _a = this.selectedObjects; _i < _a.length; _i++) {
            var s = _a[_i];
            _loop_1(s);
        }
    };
    SelectorToolComponent.prototype.ngOnDestroy = function () {
        if (this._subRedid) {
            this._subRedid.unsubscribe();
        }
        if (this._subUndid) {
            this._subUndid.unsubscribe();
        }
    };
    SelectorToolComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-selector-tool',
                    template: "\n\n\n    <app-drawer [overrideProperties]=\"invisibleStyle\"  [hoverClass]=\"'clickable'\"\n      (mouseDownObject)=\"onMouseDown($event)\"\n      (mouseMoveObject)=\"onMouseMove($event)\"\n      (mouseUpObject)=\"onMouseUp($event)\"\n      >\n    </app-drawer>\n\n    <svg *ngIf=\"cssBounds\" [ngStyle]=\"cssBounds\" style=\"border: blue 1px solid\"\n      xmlns=\"http://www.w3.org/2000/svg\"\n      (mousedown)=\"onBackgroundMouseDown($event)\"\n      (mousemove)=\"onBackgroundMouseMove($event)\"\n      (mouseup)=\"onBackgroundMouseUp($event)\"\n      [ngClass]=\"cursor\"\n      >\n      <svg:g [attr.transform]=\"selectionTransform\">\n    \n        <ng-container \n          *ngIf=\"(elementState | async)?.present.selectedBounds && boundingBoxObject\" dynamic-svg \n          [elementId]=\"1000001\"\n          [componentData]=\"boundingBoxObject\"\n          [hoverClass]=\"cursor\" \n\n          (mouseDown)=\"onMouseDown($event)\"\n          (mouseMove)=\"onMouseMove($event)\"\n          (mouseUp)=\"onMouseUp($event)\"\n\n          ></ng-container>\n        <ng-container  *ngFor=\"let s of selectedObjects\" dynamic-svg [componentData]=\"s\" [overrideProperties]=\"selectionStyle\" [elementId]=\"s.id\"\n          (mouseDown)=\"onMouseDown($event)\"\n          (mouseMove)=\"onMouseMove($event)\"\n          (mouseUp)=\"onMouseUp($event)\"\n        ></ng-container>\n    \n        <ng-container *ngIf=\"(elementState | async)?.present.selectedBounds && boundingBoxObject\">\n            <rect *ngFor=\"let s of sizers; let i = index;\" \n            (mousedown)=\"onResizerMouseDown($event, i)\" \n            (mousemove)=\"onResizerMouseMove($event, i)\"\n            (mouseup)=\"onResizerMouseUp($event, i)\"\n            [ngClass]=\"getResizerCursor(i)\"\n            width=\"8\" height= \"8\" fill=\"green\" [attr.x]=\"getResizerX(i)\" [attr.y]=\"getResizerY(i)\"></rect>\n        </ng-container>\n      </svg:g>\n    </svg>\n  ",
                    styles: ["\n\n  "]
                },] },
    ];
    /** @nocollapse */
    SelectorToolComponent.ctorParameters = function () { return [
        { type: data_store_service_1.DataStoreService, },
        { type: drawer_object_helper_service_1.DrawerObjectHelperService, },
        { type: change_helper_service_1.ChangeHelperService, },
    ]; };
    __decorate([
        store_1.select(),
        __metadata("design:type", Object)
    ], SelectorToolComponent.prototype, "elementState", void 0);
    return SelectorToolComponent;
}());
exports.SelectorToolComponent = SelectorToolComponent;
//# sourceMappingURL=selector-tool.component.js.map