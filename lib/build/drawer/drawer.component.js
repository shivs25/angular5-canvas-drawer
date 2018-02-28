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
var actions_1 = require("../actions");
var DrawerComponent = /** @class */ (function () {
    function DrawerComponent(ngRedux, _componentFactoryResolver) {
        this.ngRedux = ngRedux;
        this._componentFactoryResolver = _componentFactoryResolver;
        this.widthValue = null;
        this.heightValue = null;
        this.viewBoxWidthValue = null;
        this.viewBoxHeightValue = null;
        this.viewBoxYValue = null;
        this.viewBoxXValue = null;
        this.preserveAspectRatioValue = null;
        this.clickedObject = new core_1.EventEmitter();
        this.t = null;
    }
    DrawerComponent.prototype.ngOnInit = function () {
    };
    Object.defineProperty(DrawerComponent.prototype, "elements", {
        set: function (elements) {
            this.ngRedux.dispatch({ type: actions_1.SET_ELEMENTS, elements: elements });
        },
        enumerable: true,
        configurable: true
    });
    DrawerComponent.prototype.onClick = function (data) {
        if (data !== null && typeof data !== 'undefined') {
            console.log(data);
            this.clickedObject.emit(data);
        }
    };
    DrawerComponent.prototype.getViewBoxValues = function () {
        var r = null;
        if (!this.isNullOrEmpty(this.viewBoxXValue) && !this.isNullOrEmpty(this.viewBoxXValue) && !this.isNullOrEmpty(this.viewBoxXValue) && !this.isNullOrEmpty(this.viewBoxXValue)) {
            r = this.viewBoxXValue + " " + this.viewBoxYValue + " " + this.viewBoxWidthValue + " " + this.viewBoxHeightValue;
        }
        return r;
    };
    DrawerComponent.prototype.isNullOrEmpty = function (s) {
        if (null !== s && s.length > 0) {
            return false;
        }
        else {
            return true;
        }
    };
    DrawerComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-drawer',
                    template: "\n\n    <ng-container>\n      <svg #container xmlns=\"http://www.w3.org/2000/svg\" \n        [attr.width]=\"widthValue !== null ? widthValue : null\" \n        [attr.height]=\"heightValue !== null ? heightValue : null\" \n        [attr.viewBox]=\"getViewBoxValues() !== null ? getViewBoxValues() : null\" \n        [attr.preserveAspectRatio]=\"preserveAspectRatioValue !== null ? preserveAspectRatioValue : null\">\n        <ng-container *ngFor=\"let s of items | async\">\n          <ng-container *ngIf=\"s.visible\" dynamic-svg [componentData]=\"s\" (click)=\"onClick($event)\"></ng-container>\n        </ng-container>\n      </svg>\n    </ng-container>\n  ",
                    styles: ["\n\n  "]
                },] },
    ];
    /** @nocollapse */
    DrawerComponent.ctorParameters = function () { return [
        { type: store_1.NgRedux, },
        { type: core_1.ComponentFactoryResolver, },
    ]; };
    DrawerComponent.propDecorators = {
        "container": [{ type: core_1.ViewChild, args: ['container',] },],
        "widthValue": [{ type: core_1.Input },],
        "heightValue": [{ type: core_1.Input },],
        "viewBoxWidthValue": [{ type: core_1.Input },],
        "viewBoxHeightValue": [{ type: core_1.Input },],
        "viewBoxYValue": [{ type: core_1.Input },],
        "viewBoxXValue": [{ type: core_1.Input },],
        "preserveAspectRatioValue": [{ type: core_1.Input },],
        "clickedObject": [{ type: core_1.Output },],
        "elements": [{ type: core_1.Input },],
    };
    __decorate([
        store_1.select('elements'),
        __metadata("design:type", Object)
    ], DrawerComponent.prototype, "items", void 0);
    return DrawerComponent;
}());
exports.DrawerComponent = DrawerComponent;
//# sourceMappingURL=drawer.component.js.map