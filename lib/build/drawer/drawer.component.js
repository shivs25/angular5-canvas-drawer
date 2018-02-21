"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DrawerComponent = /** @class */ (function () {
    function DrawerComponent(_componentFactoryResolver) {
        this._componentFactoryResolver = _componentFactoryResolver;
        this.elements = null;
        this.widthValue = null;
        this.heightValue = null;
        this.viewWidthValue = null;
        this.viewHeightValue = null;
        this.viewTopValue = null;
        this.viewLeftValue = null;
        this.clickedObject = new core_1.EventEmitter();
    }
    //constructor() {}
    //constructor() {}
    DrawerComponent.prototype.ngOnInit = 
    //constructor() {}
    function () {
    };
    DrawerComponent.prototype.onRectClick = function () {
        console.log("CLICK");
    };
    DrawerComponent.prototype.onClick = function (data) {
        if (data !== null && typeof data !== 'undefined') {
            console.log(data);
            this.clickedObject.emit(data);
        }
    };
    DrawerComponent.prototype.getViewBoxValues = function () {
        return this.viewTopValue + " " + this.viewLeftValue + " " + this.viewWidthValue + " " + this.viewHeightValue;
    };
    DrawerComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-drawer',
                    template: "\n\n    <ng-container *ngIf=\"widthValue !== null && heightValue !== null && viewTopValue !== null && viewWidthValue !== null && viewHeightValue !== null && viewLeftValue !== null\">\n      <svg #container xmlns=\"http://www.w3.org/2000/svg\"  attr.width=\"{{ widthValue }}\" attr.height=\"{{ heightValue }}\" attr.viewBox=\"{{ getViewBoxValues() }}\" preserveAspectRatio=\"xMinYMin meet\">\n        <ng-container *ngFor=\"let s of elements\">\n          <ng-container dynamic-svg [componentData]=\"s\" (click)=\"onClick($event)\"></ng-container>\n        </ng-container>\n      </svg>\n    </ng-container>\n  ",
                    styles: ["\n\n  "]
                },] },
    ];
    /** @nocollapse */
    DrawerComponent.ctorParameters = function () { return [
        { type: core_1.ComponentFactoryResolver, },
    ]; };
    DrawerComponent.propDecorators = {
        "container": [{ type: core_1.ViewChild, args: ['container',] },],
        "elements": [{ type: core_1.Input },],
        "widthValue": [{ type: core_1.Input },],
        "heightValue": [{ type: core_1.Input },],
        "viewWidthValue": [{ type: core_1.Input },],
        "viewHeightValue": [{ type: core_1.Input },],
        "viewTopValue": [{ type: core_1.Input },],
        "viewLeftValue": [{ type: core_1.Input },],
        "clickedObject": [{ type: core_1.Output },],
    };
    return DrawerComponent;
}());
exports.DrawerComponent = DrawerComponent;
//# sourceMappingURL=drawer.component.js.map