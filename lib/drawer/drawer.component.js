"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DrawerComponent = /** @class */ (function () {
    //constructor(private _componentFactoryResolver: ComponentFactoryResolver) { }
    function DrawerComponent() {
        this.elements = null;
    }
    DrawerComponent.prototype.ngOnInit = function () {
    };
    DrawerComponent.prototype.onRectClick = function () {
        console.log("CLICK");
    };
    DrawerComponent.prototype.onClick = function (data) {
        console.log(data);
    };
    DrawerComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-drawer',
                    template: "\n\n    <svg #container xmlns=\"http://www.w3.org/2000/svg\" width=\"400\" height=\"400\" viewBox=\"0 0 400 400\">\n      <ng-container *ngFor=\"let s of elements\">\n        <ng-container dynamic-svg [componentData]=\"s\" (click)=\"onClick($event)\"></ng-container>\n      </ng-container>\n    </svg>\n  ",
                    styles: ["\n\n  "]
                },] },
    ];
    /** @nocollapse */
    DrawerComponent.ctorParameters = function () { return []; };
    DrawerComponent.propDecorators = {
        "container": [{ type: core_1.ViewChild, args: ['container',] },],
        "elements": [{ type: core_1.Input },],
    };
    return DrawerComponent;
}());
exports.DrawerComponent = DrawerComponent;
//# sourceMappingURL=drawer.component.js.map