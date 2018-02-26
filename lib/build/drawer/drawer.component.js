"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DrawerComponent = /** @class */ (function () {
    function DrawerComponent(_componentFactoryResolver) {
        this._componentFactoryResolver = _componentFactoryResolver;
        this.elements = null;
        this.widthValue = null;
        this.heightValue = null;
        this.viewBoxWidthValue = null;
        this.viewBoxHeightValue = null;
        this.viewBoxYValue = null;
        this.viewBoxXValue = null;
        this.preserveAspectRatioValue = null;
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
                    template: "\n\n    <ng-container>\n      <svg #container xmlns=\"http://www.w3.org/2000/svg\" \n        [attr.width]=\"widthValue !== null ? widthValue : null\" \n        [attr.height]=\"heightValue !== null ? heightValue : null\" \n        [attr.viewBox]=\"getViewBoxValues() !== null ? getViewBoxValues() : null\" \n        [attr.preserveAspectRatio]=\"preserveAspectRatioValue !== null ? preserveAspectRatioValue : null\">\n        <ng-container *ngFor=\"let s of elements\">\n          <ng-container dynamic-svg [componentData]=\"s\" (click)=\"onClick($event)\"></ng-container>\n        </ng-container>\n      </svg>\n    </ng-container>\n  ",
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
        "viewBoxWidthValue": [{ type: core_1.Input },],
        "viewBoxHeightValue": [{ type: core_1.Input },],
        "viewBoxYValue": [{ type: core_1.Input },],
        "viewBoxXValue": [{ type: core_1.Input },],
        "preserveAspectRatioValue": [{ type: core_1.Input },],
        "clickedObject": [{ type: core_1.Output },],
    };
    return DrawerComponent;
}());
exports.DrawerComponent = DrawerComponent;
//# sourceMappingURL=drawer.component.js.map