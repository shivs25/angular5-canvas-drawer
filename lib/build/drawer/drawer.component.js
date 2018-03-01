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
var DrawerComponent = (function () {
    function DrawerComponent(_dataService, _componentFactoryResolver) {
        this._dataService = _dataService;
        this._componentFactoryResolver = _componentFactoryResolver;
        this.clickedObject = new core_1.EventEmitter();
        this.t = null;
    }
    DrawerComponent.prototype.ngOnInit = function () {
    };
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
    DrawerComponent.prototype.onClick = function (data) {
        if (data !== null && typeof data !== 'undefined') {
            this.clickedObject.emit(data);
        }
    };
    DrawerComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-drawer',
                    template: "\n\n    <div class=\"absolute-position fill-parent\">\n        <app-editor-tool></app-editor-tool>\n        <svg class=\"absolute-position fill-parent\" xmlns=\"http://www.w3.org/2000/svg\">\n          <ng-container *ngFor=\"let s of (elementState | async)?.present.elements\">\n            <ng-container *ngIf=\"s.visible\" dynamic-svg [componentData]=\"s\" (click)=\"onClick($event)\"></ng-container>\n          </ng-container>\n        </svg>\n    </div>\n  ",
                    styles: ["\n\n  "],
                    entryComponents: []
                },] },
    ];
    /** @nocollapse */
    DrawerComponent.ctorParameters = function () { return [
        { type: data_store_service_1.DataStoreService, },
        { type: core_1.ComponentFactoryResolver, },
    ]; };
    DrawerComponent.propDecorators = {
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