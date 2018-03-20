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
var enums_1 = require("../../models/enums");
var SIZER_SIZE = 8;
var HALF_SIZER = 4;
var ROTATE_SPACING = 40;
var SelectorToolComponent = /** @class */ (function () {
    function SelectorToolComponent(_dataStoreService, _objectHelperService, _changeService, _elementRef) {
        this._dataStoreService = _dataStoreService;
        this._objectHelperService = _objectHelperService;
        this._changeService = _changeService;
        this._elementRef = _elementRef;
        this.SIZER_SIZE = SIZER_SIZE;
        this.HALF_SIZER = HALF_SIZER;
        //Dummy array to use in the ngFor
        this.sizers = [0, 1, 2, 3, 4, 5, 6, 7];
        this.boundingBoxObjectUniqueId = 1000000;
        this.canResize = false;
        this.canRotate = false;
        this.boundingBoxObject = null;
        this.selectedObjects = [];
        this.selectionTransform = null;
        this.cssBounds = null;
        this.rotateRightBounds = null;
        this.rotateBottomBounds = null;
        this.cursor = 'grabber';
        this.rotation = 0;
        this.mouseDownSizer = -1;
        this.mouseDownRotator = -1;
        this.mouseDown = false;
        this.invisibleStyle = {
            showFill: false,
            showStroke: false,
            showText: false
        };
        this.selectionStyle = {
            showFill: true,
            fill: "rgba(255, 0, 0, 0.3)",
            dashedLine: false,
            showStroke: true,
            stroke: 'red',
            strokeWidth: 1,
            rotation: 0,
            showText: false
        };
        this._mouseDownClones = null;
        this._mouseDownLocation = null;
        this._mouseDownCentroid = null;
    }
    SelectorToolComponent.prototype.ngOnInit = function () {
        var _this = this;
        var b = this._elementRef.nativeElement.getBoundingClientRect();
        this._location = {
            x: b.left,
            y: b.top
        };
        this._subRedid = this._dataStoreService.redid.subscribe(function () {
            _this.setupBounds();
        });
        this._subUndid = this._dataStoreService.undid.subscribe(function () {
            _this.setupBounds();
        });
        this._subSelectionChanged = this._dataStoreService.selectionChanged.subscribe(function (selectedObjects) {
            _this.setupBounds();
        });
        this._subSelectedBoundsChanged = this._dataStoreService.selectedBoundsChanged.subscribe(function (selectedBounds) {
            _this.setupBounds();
        });
        this.setupBounds();
    };
    SelectorToolComponent.prototype.onBackgroundMouseDown = function (evt) {
        this.onMouseDown({
            location: {
                x: this.cssBounds.left + evt.offsetX,
                y: this.cssBounds.top + evt.offsetY
            },
            data: null,
            shiftKey: evt.shiftKey,
            ctrlKey: evt.ctrlKey,
            altKey: evt.altKey
        });
    };
    SelectorToolComponent.prototype.onBackgroundMouseMove = function (evt) {
        this.onMouseMove({
            location: {
                x: this.cssBounds.left + evt.offsetX,
                y: this.cssBounds.top + evt.offsetY
            },
            data: null,
            shiftKey: evt.shiftKey,
            ctrlKey: evt.ctrlKey,
            altKey: evt.altKey
        });
    };
    SelectorToolComponent.prototype.onBackgroundMouseUp = function (evt) {
        this.onMouseUp({
            location: {
                x: this.cssBounds.left + evt.offsetX,
                y: this.cssBounds.top + evt.offsetY
            },
            data: null,
            shiftKey: evt.shiftKey,
            ctrlKey: evt.ctrlKey,
            altKey: evt.altKey
        });
    };
    SelectorToolComponent.prototype.onBoundsMouseDown = function (data) {
        data.location.x -= this._location.x;
        data.location.y -= this._location.y;
        this.onMouseDown(data);
    };
    SelectorToolComponent.prototype.onBoundsMouseMove = function (data) {
        data.location.x -= this._location.x;
        data.location.y -= this._location.y;
        this.onMouseMove(data);
    };
    SelectorToolComponent.prototype.onBoundsMouseUp = function (data) {
        data.location.x -= this._location.x;
        data.location.y -= this._location.y;
        this.onMouseUp(data);
    };
    SelectorToolComponent.prototype.onSelectionMouseDown = function (data) {
        data.location.x -= this._location.x;
        data.location.y -= this._location.y;
        this.onMouseDown(data);
    };
    SelectorToolComponent.prototype.onSelectionMouseMove = function (data) {
        data.location.x -= this._location.x;
        data.location.y -= this._location.y;
        this.onMouseMove(data);
    };
    SelectorToolComponent.prototype.onSelectionMouseUp = function (data) {
        data.location.x -= this._location.x;
        data.location.y -= this._location.y;
        this.onMouseUp(data);
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
            var b = this._objectHelperService.getBoundingBox(this.selectedObjects);
            this._mouseDownCentroid = { x: b.x + b.width / 2, y: b.y + b.height / 2 };
            this._mouseDownLocation = data.location;
            this.mouseDown = true;
            this.mouseDownSizer = this.mouseDownRotator = -1;
            this.cursor = "grabbing";
        }
    };
    SelectorToolComponent.prototype.onMouseMove = function (data) {
        if (this.mouseDown && this._dataStoreService.selectedObjects.length > 0) {
            if (this.mouseDownSizer < 0 && this.mouseDownRotator < 0) {
                //Moving objects
                Object.assign(this.cssBounds, {
                    left: this.boundingBoxObject.x - HALF_SIZER + (data.location.x - this._mouseDownLocation.x),
                    top: this.boundingBoxObject.y - HALF_SIZER + (data.location.y - this._mouseDownLocation.y)
                });
            }
            else {
                if (this.mouseDownSizer >= 0) {
                    //Resizing objects
                    this.resizeObjects(data.location, data.shiftKey);
                }
                else {
                    this.rotateObject(data.location, data.shiftKey);
                }
            }
        }
    };
    SelectorToolComponent.prototype.onMouseUp = function (data) {
        if (this.mouseDown && this._dataStoreService.selectedObjects.length > 0) {
            if (this.mouseDownSizer < 0 && this.mouseDownRotator < 0) {
                //Moving objects
                Object.assign(this.cssBounds, {
                    left: this.boundingBoxObject.x - HALF_SIZER + (data.location.x - this._mouseDownLocation.x),
                    top: this.boundingBoxObject.y - HALF_SIZER + (data.location.y - this._mouseDownLocation.y)
                });
                this._dataStoreService.moveObjects(this._dataStoreService.selectedObjects, {
                    x: this.cssBounds.left + HALF_SIZER,
                    y: this.cssBounds.top + HALF_SIZER,
                    width: this.cssBounds.width - SIZER_SIZE,
                    height: this.cssBounds.height - SIZER_SIZE
                });
            }
            else {
                if (this.mouseDownSizer >= 0) {
                    //Resizing Objects
                    this.resizeObjects(data.location, data.shiftKey);
                    this._dataStoreService.moveObjects(this._dataStoreService.selectedObjects, {
                        x: this.cssBounds.left + HALF_SIZER,
                        y: this.cssBounds.top + HALF_SIZER,
                        width: this.cssBounds.width - SIZER_SIZE,
                        height: this.cssBounds.height - SIZER_SIZE
                    });
                }
                else {
                    this.rotateObject(data.location, data.shiftKey);
                    if (this._dataStoreService.selectedObjects.length > 0) {
                        this._dataStoreService.setRotation(this.selectedObjects[0], this.rotation);
                    }
                }
            }
            this.setupBounds();
            this.cursor = "grabber";
            this.mouseDown = false;
            this.mouseDownSizer = -1;
            this.mouseDownRotator = -1;
            this._dataStoreService.endEdit();
        }
    };
    SelectorToolComponent.prototype.onResizerMouseDown = function (evt, index) {
        evt.stopPropagation();
        this._dataStoreService.beginEdit();
        var pt = {
            x: evt.offsetX + this.cssBounds.left,
            y: evt.offsetY + this.cssBounds.top
        };
        this._mouseDownLocation = pt;
        this.mouseDown = true;
        this.mouseDownSizer = index;
        this.cursor = this.getResizerCursor(index);
        this._mouseDownClones = this._dataStoreService.selectedObjects.map(function (x) { return Object.assign({}, x); });
    };
    SelectorToolComponent.prototype.onResizerMouseMove = function (evt, index) {
        evt.stopPropagation();
        if (this.mouseDownSizer >= 0 &&
            this.mouseDown) {
            this.resizeObjects({
                x: evt.offsetX + this.cssBounds.left,
                y: evt.offsetY + this.cssBounds.top
            }, evt.shiftKey);
        }
    };
    SelectorToolComponent.prototype.onResizerMouseUp = function (evt, index) {
        evt.stopPropagation();
        this.resizeObjects({
            x: evt.offsetX + this.cssBounds.left,
            y: evt.offsetY + this.cssBounds.top
        }, evt.shiftKey);
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
        this.mouseDownSizer = -1;
        this.mouseDownRotator = -1;
        this.mouseDown = false;
        this._dataStoreService.endEdit();
    };
    SelectorToolComponent.prototype.onRotateMouseDown = function (evt, index) {
        evt.stopPropagation();
        this.cursor = "crosshair";
        this._dataStoreService.beginEdit();
        this._mouseDownLocation = this.getRelativePointFromEvent(evt);
        var b = this._objectHelperService.getBoundingBox(this.selectedObjects);
        this._mouseDownCentroid = { x: b.x + b.width / 2, y: b.y + b.height / 2 };
        this.mouseDown = true;
        this.mouseDownRotator = index;
    };
    SelectorToolComponent.prototype.onRotateMouseMove = function (evt, index) {
        evt.stopPropagation();
        if (this.mouseDownRotator >= 0 &&
            this.mouseDown) {
            this.rotateObject(this.getRelativePointFromEvent(evt), evt.shiftKey);
        }
    };
    SelectorToolComponent.prototype.onRotateMouseUp = function (evt, index) {
        evt.stopPropagation();
        var pt = this.getRelativePointFromEvent(evt);
        this.rotateObject(pt, evt.shiftKey);
        if (this._dataStoreService.selectedObjects.length > 0) {
            this._dataStoreService.setRotation(this.selectedObjects[0], this.rotation);
            this.setupBounds();
        }
        this.cursor = "grabber";
        this.mouseDownSizer = -1;
        this.mouseDownRotator = -1;
        this.mouseDown = false;
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
    SelectorToolComponent.prototype.getRelativePointFromEvent = function (evt) {
        var clientBounds = evt.target.getBoundingClientRect();
        return {
            x: clientBounds.x + evt.offsetX - this._location.x,
            y: clientBounds.y + evt.offsetY - this._location.y
        };
    };
    SelectorToolComponent.prototype.canAllResize = function (objects) {
        var returnValue = true;
        for (var _i = 0, objects_1 = objects; _i < objects_1.length; _i++) {
            var o = objects_1[_i];
            if (!this._objectHelperService.canResize(o, true)) {
                returnValue = false;
                break;
            }
        }
        return returnValue;
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
                height: b.height + SIZER_SIZE,
                transform: 'rotate(' + this.rotation + 'deg)'
            };
            var left = b.x + b.width + ROTATE_SPACING - HALF_SIZER;
            var top_1 = b.y + b.height / 2 - HALF_SIZER;
            this.rotation = this.selectedObjects.length === 1 ? this.selectedObjects[0].rotation : 0;
            this.rotateRightBounds = {
                left: left,
                top: top_1,
                width: SIZER_SIZE,
                height: SIZER_SIZE,
                transform: 'rotate(' + this.rotation + 'deg)',
                "transform-origin": ((this.cssBounds.left + this.cssBounds.width / 2) -
                    (left + SIZER_SIZE / 2)) + "px " +
                    (SIZER_SIZE / 2) + "px"
            };
            top_1 = b.y + b.height + ROTATE_SPACING - HALF_SIZER;
            this.rotateBottomBounds = {
                left: b.x + b.width / 2 - HALF_SIZER,
                top: top_1,
                width: SIZER_SIZE,
                height: SIZER_SIZE,
                transform: 'rotate(' + this.rotation + 'deg)',
                "transform-origin": (SIZER_SIZE / 2) + "px " + ((this.cssBounds.top + this.cssBounds.height / 2) -
                    (top_1 + SIZER_SIZE / 2)) + "px"
            };
            this.canResize = 1 === this.selectedObjects.length ? this._objectHelperService.canResize(this.selectedObjects[0], true) :
                this.canAllResize(this.selectedObjects);
            this.canRotate = 1 === this.selectedObjects.length && enums_1.DrType.GROUPED_OBJECT !== this.selectedObjects[0].drType;
        }
        else {
            this.selectedObjects = [];
            this.boundingBoxObject = null;
            this.selectionTransform = "translate(0 0)";
            this.cssBounds = this.rotateRightBounds = this.rotateBottomBounds = null;
            this.canResize = this.canRotate = false;
            this.rotation = 0;
        }
    };
    SelectorToolComponent.prototype.rotateObject = function (location, shiftKey) {
        this.rotation = (360 + this.getRotationAngle(location, shiftKey) - (0 === this.mouseDownRotator ? 0 : 90)) % 360;
        Object.assign(this.rotateRightBounds, { transform: 'rotate(' + this.rotation + 'deg)' });
        Object.assign(this.rotateBottomBounds, { transform: 'rotate(' + this.rotation + 'deg)' });
        Object.assign(this.cssBounds, { transform: 'rotate(' + this.rotation + 'deg)' });
    };
    SelectorToolComponent.prototype.getRotationAngle = function (location, shiftKey) {
        return Math.round(Math.atan2(location.y - this._mouseDownCentroid.y, location.x - this._mouseDownCentroid.x) * 180 / Math.PI);
    };
    SelectorToolComponent.prototype.resizeObjects = function (location, shiftKey) {
        var b = this._dataStoreService.selectedBounds;
        var hChanges = null;
        var vChanges = null;
        switch (this.mouseDownSizer) {
            case 0:
                hChanges = this.resizeH(b, location, false);
                vChanges = this.resizeV(b, location, false);
                break;
            case 1:
                hChanges = this.resizeH(b, location, false);
                break;
            case 2:
                hChanges = this.resizeH(b, location, false);
                vChanges = this.resizeV(b, location, true);
                break;
            case 3:
                vChanges = this.resizeV(b, location, true);
                break;
            case 4:
                hChanges = this.resizeH(b, location, true);
                vChanges = this.resizeV(b, location, true);
                break;
            case 5:
                hChanges = this.resizeH(b, location, true);
                break;
            case 6:
                hChanges = this.resizeH(b, location, true);
                vChanges = this.resizeV(b, location, false);
                break;
            case 7:
                vChanges = this.resizeV(b, location, false);
                break;
        }
        Object.assign(this.cssBounds, null !== hChanges && null !== hChanges.cssBounds ? hChanges.cssBounds : {}, null !== vChanges && null !== vChanges.cssBounds ? vChanges.cssBounds : {});
        Object.assign(this.boundingBoxObject, null !== hChanges && null !== hChanges.boundingBoxObject ? hChanges.boundingBoxObject : {}, null !== vChanges && null !== vChanges.boundingBoxObject ? vChanges.boundingBoxObject : {});
        this.applyResizeChanges();
    };
    SelectorToolComponent.prototype.resizeH = function (b, location, opposite) {
        var returnValue = null;
        var left = 0;
        var width = 0;
        var elementWidth = 0;
        var threshold = opposite ? b.x : b.x + b.width;
        if (location.x < threshold) {
            left = location.x - HALF_SIZER;
            width = threshold + HALF_SIZER - left;
            elementWidth = threshold - location.x;
        }
        else {
            left = threshold - HALF_SIZER;
            width = location.x + HALF_SIZER - left;
            elementWidth = location.x - threshold;
        }
        if (width > 0 && elementWidth > 0) {
            returnValue = {
                cssBounds: {
                    left: left,
                    width: width
                },
                boundingBoxObject: {
                    width: elementWidth
                }
            };
        }
        return returnValue;
    };
    SelectorToolComponent.prototype.resizeV = function (b, location, opposite) {
        var returnValue = null;
        var top = 0;
        var height = 0;
        var elementHeight = 0;
        var threshold = opposite ? b.y : b.y + b.height;
        if (location.y < threshold) {
            top = location.y - HALF_SIZER;
            height = threshold + HALF_SIZER - top;
            elementHeight = threshold - location.y;
        }
        else {
            top = threshold - HALF_SIZER;
            height = location.y + HALF_SIZER - top;
            elementHeight = location.y - threshold;
        }
        if (height > 0 && elementHeight > 0) {
            returnValue = {
                cssBounds: {
                    top: top,
                    height: height
                },
                boundingBoxObject: {
                    height: elementHeight
                }
            };
        }
        return returnValue;
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
        if (this._subSelectionChanged) {
            this._subSelectionChanged.unsubscribe();
        }
        if (this._subSelectedBoundsChanged) {
            this._subSelectedBoundsChanged.unsubscribe();
        }
    };
    SelectorToolComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-selector-tool',
                    template: "\n\n\n    <app-drawer [overrideProperties]=\"invisibleStyle\"  [hoverClass]=\"'clickable'\"\n      (mouseDownObject)=\"onMouseDown($event)\"\n      (mouseMoveObject)=\"onMouseMove($event)\"\n      (mouseUpObject)=\"onMouseUp($event)\"\n      >\n    </app-drawer>\n\n    <svg *ngIf=\"cssBounds\" [ngStyle]=\"cssBounds\"\n      \n      xmlns=\"http://www.w3.org/2000/svg\"\n      (mousedown)=\"onBackgroundMouseDown($event)\"\n      (mousemove)=\"onBackgroundMouseMove($event)\"\n      (mouseup)=\"onBackgroundMouseUp($event)\"\n      [ngClass]=\"cursor\"\n      >\n      <svg:g [attr.transform]=\"selectionTransform\">\n    \n        <svg:g>\n          <ng-container \n            *ngIf=\"(elementState | async)?.present.selectedBounds && boundingBoxObject\" dynamic-svg \n            [elementId]=\"1000001\"\n            [componentData]=\"boundingBoxObject\"\n            [hoverClass]=\"cursor\" \n  \n            (mouseDown)=\"onBoundsMouseDown($event)\"\n            (mouseMove)=\"onBoundsMouseMove($event)\"\n            (mouseUp)=\"onBoundsMouseUp($event)\">\n          </ng-container>\n        </svg:g>\n   \n        <ng-container  *ngFor=\"let s of selectedObjects\" dynamic-svg [componentData]=\"s\" [overrideProperties]=\"selectionStyle\" [elementId]=\"s.id\"\n          (mouseDown)=\"onSelectionMouseDown($event)\"\n          (mouseMove)=\"onSelectionMouseMove($event)\"\n          (mouseUp)=\"onSelectionMouseUp($event)\"\n          [hoverClass]=\"cursor\"\n        ></ng-container>\n\n        <ng-container *ngFor=\"let s of sizers; let i = index;\">\n            <rect [id]=\"'resizer-' + i\"  *ngIf=\"(elementState | async)?.present.selectedBounds && \n                                                boundingBoxObject && \n                                                canResize && \n                                                mouseDownRotator < 0 &&\n                                                (!mouseDown || mouseDownSizer >= 0)\"\n            (mousedown)=\"onResizerMouseDown($event, i)\" \n            (mousemove)=\"onResizerMouseMove($event, i)\"\n            (mouseup)=\"onResizerMouseUp($event, i)\"\n            [ngClass]=\"getResizerCursor(i)\"\n            [attr.width]=\"SIZER_SIZE\" \n            [attr.height]= \"SIZER_SIZE\" fill=\"green\" \n            [attr.x]=\"getResizerX(i)\" \n            [attr.y]=\"getResizerY(i)\"></rect>\n        </ng-container>\n      </svg:g>\n    </svg>\n\n    <svg xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"canRotate && mouseDownSizer < 0 && (!mouseDown || mouseDownRotator >= 0)\"\n      [ngStyle]=\"rotateRightBounds\" fill=\"green\">\n       <rect id='rotate-right'\n            class='crosshair'\n            (mousedown)=\"onRotateMouseDown($event, 0)\" \n            (mousemove)=\"onRotateMouseMove($event, 0)\"\n            (mouseup)=\"onRotateMouseUp($event, 0)\"\n            [attr.width]=\"SIZER_SIZE\" \n            [attr.height]= \"SIZER_SIZE\" \n            [attr.rx]= \"HALF_SIZER\" \n            [attr.rx]= \"HALF_SIZER\" \n            fill=\"red\">\n        </rect>\n    </svg>\n    <svg xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"canRotate && mouseDownSizer < 0 && (!mouseDown || mouseDownRotator >= 0)\"\n      [ngStyle]=\"rotateBottomBounds\" fill=\"green\">\n      <rect id='rotate-bottom'\n            class='crosshair'\n            (mousedown)=\"onRotateMouseDown($event, 1)\" \n            (mousemove)=\"onRotateMouseMove($event, 1)\"\n            (mouseup)=\"onRotateMouseUp($event, 1)\"\n            [attr.width]=\"SIZER_SIZE\" \n            [attr.height]= \"SIZER_SIZE\" \n            [attr.rx]= \"HALF_SIZER\" \n            [attr.rx]= \"HALF_SIZER\"\n            fill=\"red\">\n        </rect>\n    </svg>\n  ",
                    styles: ["\n\n  "]
                },] },
    ];
    /** @nocollapse */
    SelectorToolComponent.ctorParameters = function () { return [
        { type: data_store_service_1.DataStoreService, },
        { type: drawer_object_helper_service_1.DrawerObjectHelperService, },
        { type: change_helper_service_1.ChangeHelperService, },
        { type: core_1.ElementRef, },
    ]; };
    __decorate([
        store_1.select(),
        __metadata("design:type", Object)
    ], SelectorToolComponent.prototype, "elementState", void 0);
    return SelectorToolComponent;
}());
exports.SelectorToolComponent = SelectorToolComponent;
//# sourceMappingURL=selector-tool.component.js.map