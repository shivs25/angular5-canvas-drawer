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
    function DrawerComponent(_dataService, _elementRef) {
        this._dataService = _dataService;
        this._elementRef = _elementRef;
        this.overrideProperties = null;
        this.hoverClass = '';
        this.handleMouseEvents = true;
        this.viewBox = null;
        this.clickedObject = new core_1.EventEmitter();
        this.mouseDownObject = new core_1.EventEmitter();
        this.mouseMoveObject = new core_1.EventEmitter();
        this.mouseUpObject = new core_1.EventEmitter();
        this._location = null;
    }
    DrawerComponent.prototype.ngOnInit = function () {
        var b = this._elementRef.nativeElement.getBoundingClientRect();
        this._location = {
            x: b.left,
            y: b.top
        };
    };
    DrawerComponent.prototype.isHiddenSelection = function (id) {
        return this._dataService.hideSelection && (this._dataService.selectedObjects.find(function (t) { return t.id === id; }));
    };
    DrawerComponent.prototype.onBackgroundClick = function (evt) {
        this.handleMouseEvents && this.clickedObject.emit(null);
    };
    DrawerComponent.prototype.onBackgroundMouseDown = function (evt) {
        this.handleMouseEvents && this.mouseDownObject.emit({
            location: {
                x: evt.offsetX, y: evt.offsetY
            },
            data: null,
            shiftKey: evt.shiftKey,
            ctrlKey: evt.ctrlKey,
            altKey: evt.altKey
        });
    };
    DrawerComponent.prototype.onBackgroundMouseMove = function (evt) {
        this.handleMouseEvents && this.mouseMoveObject.emit({
            location: {
                x: evt.offsetX, y: evt.offsetY
            },
            data: null,
            shiftKey: evt.shiftKey,
            ctrlKey: evt.ctrlKey,
            altKey: evt.altKey
        });
    };
    DrawerComponent.prototype.onBackgroundMouseUp = function (evt) {
        this.handleMouseEvents && this.mouseUpObject.emit({
            location: {
                x: evt.offsetX, y: evt.offsetY
            },
            data: null,
            shiftKey: evt.shiftKey,
            ctrlKey: evt.ctrlKey,
            altKey: evt.altKey
        });
    };
    DrawerComponent.prototype.onClick = function (data) {
        if (this.handleMouseEvents && data !== null && typeof data !== 'undefined') {
            this.clickedObject.emit(data);
        }
    };
    DrawerComponent.prototype.onMouseDown = function (data) {
        if (this.handleMouseEvents && data !== null && typeof data !== 'undefined') {
            data.location.x = data.location.x - this._location.x;
            data.location.y = data.location.y - this._location.y;
            this.mouseDownObject.emit(data);
        }
    };
    DrawerComponent.prototype.onMouseMove = function (data) {
        if (this.handleMouseEvents && data !== null && typeof data !== 'undefined') {
            data.location.x = data.location.x - this._location.x;
            data.location.y = data.location.y - this._location.y;
            this.mouseMoveObject.emit(data);
        }
    };
    DrawerComponent.prototype.onMouseUp = function (data) {
        if (data !== null && typeof data !== 'undefined') {
            data.location.x = data.location.x - this._location.x;
            data.location.y = data.location.y - this._location.y;
            this.mouseUpObject.emit(data);
        }
    };
    DrawerComponent.prototype.getViewBox = function () {
        if (null === this.viewBox || 'undefined' === typeof this.viewBox) {
            return null;
        }
        else {
            return this.viewBox.x + " " + this.viewBox.y + " " + this.viewBox.width + " " + this.viewBox.height;
        }
    };
    DrawerComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-drawer',
                    template: "\n\n    <div class=\"absolute-position fill-parent\">\n    \n        <svg \n              (mousedown)=\"onBackgroundMouseDown($event)\"\n              (mousemove)=\"onBackgroundMouseMove($event)\" \n              (mouseup)=\"onBackgroundMouseUp($event)\"\n              class=\"absolute-position fill-parent\" xmlns=\"http://www.w3.org/2000/svg\" version=\"1.2\" \n              [attr.viewBox]=\"getViewBox()\">\n          <ng-container *ngFor=\"let s of (elementState | async)?.present.elements; let i = index\">\n            <ng-container *ngIf=\"s.visible && !isHiddenSelection(s.id)\" dynamic-svg [componentData]=\"s\" [overrideProperties]=\"overrideProperties\" [elementId]=\"i + 1\"\n              [hoverClass]=\"hoverClass\"\n              (mouseDown)=\"onMouseDown($event)\"\n              (mouseMove)=\"onMouseMove($event)\"\n              (mouseUp)=\"onMouseUp($event)\"\n              >\n            </ng-container>\n          </ng-container>\n        </svg>\n    </div>\n  ",
                    styles: ["\n\n  "],
                    entryComponents: []
                },] },
    ];
    /** @nocollapse */
    DrawerComponent.ctorParameters = function () { return [
        { type: data_store_service_1.DataStoreService, },
        { type: core_1.ElementRef, },
    ]; };
    DrawerComponent.propDecorators = {
        "overrideProperties": [{ type: core_1.Input },],
        "hoverClass": [{ type: core_1.Input },],
        "handleMouseEvents": [{ type: core_1.Input },],
        "viewBox": [{ type: core_1.Input },],
        "clickedObject": [{ type: core_1.Output },],
        "mouseDownObject": [{ type: core_1.Output },],
        "mouseMoveObject": [{ type: core_1.Output },],
        "mouseUpObject": [{ type: core_1.Output },],
    };
    __decorate([
        store_1.select(),
        __metadata("design:type", Object)
    ], DrawerComponent.prototype, "elementState", void 0);
    return DrawerComponent;
}());
exports.DrawerComponent = DrawerComponent;
//# sourceMappingURL=drawer.component.js.map