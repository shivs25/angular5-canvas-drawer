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
    DrCalloutComponent.prototype.getPath = function () {
        //let r: DrCallout = this.data as DrCallout;
        var v = this.visualData;
        return this._objectHelperService.getCalloutPath(v);
    };
    DrCalloutComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-dr-callout',
                    template: "\n    <ng-template #elementTemplate>\n      <ng-container *ngIf=\"data && visualData\">\n        <svg:path\n          [id]=\"elementId\"\n          [ngClass]=\"(visualData.clickable ? hoverClass : '') + (!canInteract ? ' no-interact' : '')\"\n          (click)=\"onClick($event, data)\"\n          (mousedown)=\"onMouseDown($event, data)\"\n          (mousemove)=\"onMouseMove($event, data)\"\n          (mouseup)=\"onMouseUp($event, data)\"\n          [attr.opacity]=\"visualData.opacity\"\n          [attr.d]=\"getPath()\"\n          [attr.fill]=\"visualData.showFill ? visualData.fill : 'transparent'\"\n          [attr.stroke]=\"visualData.showStroke ? visualData.stroke : 'transparent'\"\n          [attr.stroke-width]=\"visualData.strokeWidth\"\n          [attr.stroke-dasharray]=\"visualData.dashedLine ? '10 10' : ''\"\n          >      \n        </svg:path>\n      </ng-container>\n    </ng-template>\n  ",
                    styles: ["\n\n  "]
                },] },
    ];
    return DrCalloutComponent;
}(dr_object_component_1.DrObjectComponent));
exports.DrCalloutComponent = DrCalloutComponent;
//# sourceMappingURL=dr-callout.component.js.map