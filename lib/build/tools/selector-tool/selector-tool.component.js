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
var SelectorToolComponent = /** @class */ (function () {
    function SelectorToolComponent(_dataStoreService, _objectHelperService) {
        this._dataStoreService = _dataStoreService;
        this._objectHelperService = _objectHelperService;
        this.boundingBoxObjectUniqueId = 1000000;
        this.boundingBoxObject = null;
        this.selectionTransform = null;
        this.cssBounds = null;
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
        this._mouseDownLocation = null;
        this._mouseDown = false;
    }
    SelectorToolComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._subClicked = this._dataStoreService.clickedObject.subscribe(function (data) { });
        this._subMouseDown = this._dataStoreService.mouseDownObject.subscribe(function (data) { return _this.onMouseDown(data); });
        this._subMouseMove = this._dataStoreService.mouseMoveObject.subscribe(function (data) { return _this.onMouseMove(data); });
        this._subMouseUp = this._dataStoreService.mouseUpObject.subscribe(function (data) { return _this.onMouseUp(data); });
        this._subRedid = this._dataStoreService.redid.subscribe(function () {
            _this.setupBounds();
        });
        this._subUndid = this._dataStoreService.undid.subscribe(function () {
            _this.setupBounds();
        });
    };
    SelectorToolComponent.prototype.onMouseDown = function (data) {
        if (null === data.data || !data.data.clickable) {
            this._dataStoreService.selectObjects([]);
            this.setupBounds();
        }
        else {
            if (data.data.id !== this.boundingBoxObjectUniqueId) {
                //Not the selected bounds object
                if (1 === this._dataStoreService.selectedObjects.length) {
                    if (this._dataStoreService.selectedObjects[0].id !== data.data.id) {
                        this._dataStoreService.selectObjects([data.data]);
                    }
                }
                else {
                    this._dataStoreService.selectObjects([data.data]);
                }
                if (null !== this._dataStoreService.selectedBounds) {
                    this.setupBounds();
                }
            }
        }
        this._dataStoreService.beginEdit();
        this._mouseDownLocation = data.location;
        this._mouseDown = true;
    };
    SelectorToolComponent.prototype.onMouseMove = function (data) {
        if (this._mouseDown && this._dataStoreService.selectedObjects.length > 0) {
            //Moving objects
            Object.assign(this.cssBounds, {
                left: this.boundingBoxObject.x + (data.location.x - this._mouseDownLocation.x),
                top: this.boundingBoxObject.y + (data.location.y - this._mouseDownLocation.y)
            });
        }
    };
    SelectorToolComponent.prototype.onMouseUp = function (data) {
        if (this._mouseDown && this._dataStoreService.selectedObjects.length > 0) {
            //Moving objects
            Object.assign(this.cssBounds, {
                left: this.boundingBoxObject.x + (data.location.x - this._mouseDownLocation.x),
                top: this.boundingBoxObject.y + (data.location.y - this._mouseDownLocation.y)
            });
            if (1 === this._dataStoreService.selectedObjects.length) {
                this._dataStoreService.moveObject(this._dataStoreService.selectedObjects[0], {
                    x: this.cssBounds.left,
                    y: this.cssBounds.top,
                    width: this.cssBounds.width,
                    height: this.cssBounds.height
                });
                this.setupBounds();
            }
            this._mouseDown = false;
            this._dataStoreService.endEdit();
        }
    };
    SelectorToolComponent.prototype.setupBounds = function () {
        if (null !== this._dataStoreService.selectedBounds) {
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
            this.selectionTransform = "translate(" + (b.x * -1) + " " + (b.y * -1) + ")";
            this.cssBounds = {
                left: b.x,
                top: b.y,
                width: b.width,
                height: b.height
            };
        }
        else {
            this.boundingBoxObject = null;
            this.selectionTransform = "translate(0 0)";
            this.cssBounds = null;
        }
    };
    SelectorToolComponent.prototype.ngOnDestroy = function () {
        if (this._subClicked) {
            this._subClicked.unsubscribe();
        }
        if (this._subMouseDown) {
            this._subMouseDown.unsubscribe();
        }
        if (this._subMouseMove) {
            this._subMouseMove.unsubscribe();
        }
        if (this._subMouseUp) {
            this._subMouseUp.unsubscribe();
        }
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
                    template: "\n\n\n    <app-drawer [overrideProperties]=\"invisibleStyle\"  [hoverClass]=\"'clickable'\"></app-drawer>\n\n    <svg *ngIf=\"cssBounds\" [ngStyle]=\"cssBounds\"\n      xmlns=\"http://www.w3.org/2000/svg\">\n      <svg:g [attr.transform]=\"selectionTransform\">\n        <ng-container *ngFor=\"let s of (elementState | async)?.present.selectedObjects\">\n          <ng-container dynamic-svg [componentData]=\"s\" [overrideProperties]=\"selectionStyle\" (click)=\"onClick($event)\"></ng-container>\n        </ng-container>\n        <ng-container \n          *ngIf=\"(elementState | async)?.present.selectedBounds && boundingBoxObject\" dynamic-svg \n          [componentData]=\"boundingBoxObject\"\n          [hoverClass]=\"'clickable'\" \n\n          (mouseDown)=\"onMouseDown($event)\"\n          (mouseMove)=\"onMouseMove($event)\"\n          (mouseUp)=\"onMouseUp($event)\"\n\n          ></ng-container>\n      </svg:g>\n    </svg>\n  ",
                    styles: ["\n\n  "]
                },] },
    ];
    /** @nocollapse */
    SelectorToolComponent.ctorParameters = function () { return [
        { type: data_store_service_1.DataStoreService, },
        { type: drawer_object_helper_service_1.DrawerObjectHelperService, },
    ]; };
    __decorate([
        store_1.select(),
        __metadata("design:type", Object)
    ], SelectorToolComponent.prototype, "elementState", void 0);
    return SelectorToolComponent;
}());
exports.SelectorToolComponent = SelectorToolComponent;
//# sourceMappingURL=selector-tool.component.js.map