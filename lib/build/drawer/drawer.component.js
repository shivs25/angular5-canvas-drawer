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
var store_1 = require("@angular-redux/store");
var data_store_service_1 = require("../services/data-store.service");
var DrawerComponent = /** @class */ (function () {
    function DrawerComponent(_dataService) {
        this._dataService = _dataService;
        this.overrideProperties = null;
        this.hoverClass = null;
        this.handleMouseEvents = true;
        this.clickedObject = new core_1.EventEmitter();
    }
    Object.defineProperty(DrawerComponent.prototype, "elements", {
        get: function () {
            return this._dataService.elements;
        },
        set: function (elements) {
            this._dataService.elements = elements;
        },
        enumerable: true,
        configurable: true
    });
    DrawerComponent.prototype.ngOnInit = function () {
    };
    DrawerComponent.prototype.onBackgroundClick = function (evt) {
        this.handleMouseEvents && this._dataService.handleClickedObject(null);
    };
    DrawerComponent.prototype.onBackgroundMouseDown = function (evt) {
        this.handleMouseEvents && this._dataService.handleMouseDownObject({ location: { x: evt.clientX, y: evt.clientY }, data: null });
    };
    DrawerComponent.prototype.onBackgroundMouseMove = function (evt) {
        this.handleMouseEvents && this._dataService.handleMouseMoveObject({ location: { x: evt.clientX, y: evt.clientY }, data: null });
    };
    DrawerComponent.prototype.onBackgroundMouseUp = function (evt) {
        this.handleMouseEvents && this._dataService.handleMouseUpObject({ location: { x: evt.clientX, y: evt.clientY }, data: null });
    };
    DrawerComponent.prototype.onClick = function (data) {
        if (this.handleMouseEvents && data !== null && typeof data !== 'undefined') {
            //this.clickedObject.emit(data);
            this._dataService.handleClickedObject(data);
        }
    };
    DrawerComponent.prototype.onMouseDown = function (data) {
        if (this.handleMouseEvents && data !== null && typeof data !== 'undefined') {
            //this.clickedObject.emit(data);
            this._dataService.handleMouseDownObject(data);
        }
    };
    DrawerComponent.prototype.onMouseMove = function (data) {
        if (this.handleMouseEvents && data !== null && typeof data !== 'undefined') {
            //this.clickedObject.emit(data);
            this._dataService.handleMouseMoveObject(data);
        }
    };
    DrawerComponent.prototype.onMouseUp = function (data) {
        if (data !== null && typeof data !== 'undefined') {
            //this.clickedObject.emit(data);
            this._dataService.handleMouseUpObject(data);
        }
    };
    DrawerComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-drawer',
                    template: "\n\n    <div class=\"absolute-position fill-parent\">\n    \n        <svg (click)=\"onBackgroundClick($event)\" \n              (mousedown)=\"onBackgroundMouseDown($event)\"\n              (mousemove)=\"onBackgroundMouseMove($event)\" \n              (mouseUp)=\"onBackgroundMouseUp($event)\"\n              class=\"absolute-position fill-parent\" xmlns=\"http://www.w3.org/2000/svg\">\n          <ng-container *ngFor=\"let s of (elementState | async)?.present.elements\">\n            <ng-container *ngIf=\"s.visible\" dynamic-svg [componentData]=\"s\" [overrideProperties]=\"overrideProperties\"\n              [hoverClass]=\"hoverClass\"\n              (click)=\"onClick($event)\"\n              (mouseDown)=\"onMouseDown($event)\"\n              (mouseMove)=\"onMouseMove($event)\"\n              (mouseUp)=\"onMouseUp($event)\"\n              >\n            </ng-container>\n          </ng-container>\n        </svg>\n    </div>\n  ",
                    styles: ["\n\n  "],
                    entryComponents: []
                },] },
    ];
    /** @nocollapse */
    DrawerComponent.ctorParameters = function () { return [
        { type: data_store_service_1.DataStoreService, },
    ]; };
    DrawerComponent.propDecorators = {
        "overrideProperties": [{ type: core_1.Input },],
        "hoverClass": [{ type: core_1.Input },],
        "handleMouseEvents": [{ type: core_1.Input },],
        "clickedObject": [{ type: core_1.Output },],
        "elements": [{ type: core_1.Input },],
    };
    __decorate([
        store_1.select(),
        __metadata("design:type", Object)
    ], DrawerComponent.prototype, "elementState", void 0);
    return DrawerComponent;
}());
exports.DrawerComponent = DrawerComponent;
//# sourceMappingURL=drawer.component.js.map