"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dr_object_component_1 = require("../dr-object/dr-object.component");
var DrCalloutComponent = /** @class */ (function (_super) {
    __extends(DrCalloutComponent, _super);
    function DrCalloutComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DrCalloutComponent.prototype.getPoints = function () {
        var returnValue = "";
        var r = this.data;
        var p;
        returnValue += r.basePoint1.x + " " + r.basePoint1.y + " ";
        returnValue += r.basePoint2.x + " " + r.basePoint2.y + " ";
        returnValue += r.pointerLocation.x + " " + r.pointerLocation.y;
        return returnValue.trim();
    };
    DrCalloutComponent.prototype.getBoundsX = function () {
        var r = this.data;
        return Math.min(r.x, r.pointerLocation.x);
    };
    DrCalloutComponent.prototype.getBoundsY = function () {
        var r = this.data;
        return Math.min(r.y, r.pointerLocation.y);
    };
    DrCalloutComponent.prototype.getBoundsWidth = function () {
        var r = this.data;
        var left = Math.min(r.x, r.pointerLocation.x);
        var right = Math.max(r.x + r.width, r.pointerLocation.x);
        return right - left;
    };
    DrCalloutComponent.prototype.getBoundsHeight = function () {
        var r = this.data;
        var top = Math.min(r.y, r.pointerLocation.y);
        var bottom = Math.max(r.y + r.height, r.pointerLocation.y);
        return bottom - top;
    };
    DrCalloutComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-dr-callout',
                    template: "\n    <ng-template #elementTemplate>\n      <!--<svg:ellipse *ngIf=\"data && visualData\" \n        [ngClass]=\"(visualData.clickable ? hoverClass : '') + (!canInteract ? ' no-interact' : '')\"\n        (click)=\"onClick($event, data)\"\n        (mousedown)=\"onMouseDown($event, data)\"\n        (mousemove)=\"onMouseMove($event, data)\"\n        (mouseup)=\"onMouseUp($event, data)\"\n        [id]=\"elementId\"\n        [attr.transform]=\"visualData.rotation > 0 ? 'rotate(' + visualData.rotation + ',' + (visualData.x)+ ',' + (visualData.y) + ')' : ''\"\n        [attr.stroke-dasharray]=\"visualData.dashedLine ? '10 10' : ''\"\n        [attr.fill]=\"visualData.showFill ? visualData.fill : 'transparent'\"\n        [attr.stroke]=\"visualData.showStroke ? visualData.stroke : 'transparent'\"\n        [attr.stroke-width]=\"visualData.strokeWidth\"\n        [attr.opacity]=\"visualData.opacity\"\n    \n    \n        >\n      </svg:ellipse>-->\n\n      <ng-container *ngIf=\"data && visualData\">\n        <svg:g [id]=\"elementId\">\n          <defs>\n            <clipPath [id]=\"'union_' + elementId\">\n              <svg:rect \n                [attr.x]=\"data.x\" \n                [attr.y]=\"data.y\"\n                [attr.width]=\"data.width\" \n                [attr.height]=\"data.height\">\n              </svg:rect>\n              <svg:polygon\n                [attr.points]=\"getPoints()\"\n                >\n              </svg:polygon>\n            </clipPath>\n          </defs>\n\n          <svg:rect\n            [ngClass]=\"(visualData.clickable ? hoverClass : '') + (!canInteract ? ' no-interact' : '')\"\n            (click)=\"onClick($event, data)\"\n            (mousedown)=\"onMouseDown($event, data)\"\n            (mousemove)=\"onMouseMove($event, data)\"\n            (mouseup)=\"onMouseUp($event, data)\"\n            [attr.opacity]=\"visualData.opacity\"\n            [attr.clip-path]=\"'url(#union_' + elementId + ')'\"\n            [attr.x]=\"getBoundsX()\"\n            [attr.y]=\"getBoundsY()\"\n            [attr.width]=\"getBoundsWidth()\"\n            [attr.height]=\"getBoundsHeight()\"\n       \n            [attr.stroke-dasharray]=\"visualData.dashedLine ? '10 10' : ''\"\n            [attr.fill]=\"visualData.showFill ? visualData.fill : 'transparent'\"\n            [attr.stroke]=\"visualData.showStroke ? visualData.stroke : 'transparent'\"\n            [attr.stroke-width]=\"visualData.strokeWidth\"\n            >\n        \n          </svg:rect>\n\n      \n        </svg:g>\n      </ng-container>\n    </ng-template>\n  ",
                    styles: ["\n\n  "]
                },] },
    ];
    /** @nocollapse */
    DrCalloutComponent.ctorParameters = function () { return []; };
    return DrCalloutComponent;
}(dr_object_component_1.DrObjectComponent));
exports.DrCalloutComponent = DrCalloutComponent;
//# sourceMappingURL=dr-callout.component.js.map