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
var DrPolygonComponent = /** @class */ (function (_super) {
    __extends(DrPolygonComponent, _super);
    function DrPolygonComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DrPolygonComponent.prototype.getPoints = function () {
        var returnValue = "";
        var r = this.data;
        var p;
        for (var _i = 0, _a = r.points; _i < _a.length; _i++) {
            p = _a[_i];
            returnValue += p.x + " " + p.y + " ";
        }
        return returnValue.trim();
    };
    DrPolygonComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'dr-polygon',
                    template: "\n    <ng-template #elementTemplate>\n\n        <svg:polygon *ngIf=\"data && visualData && data.isClosed\" \n        [ngClass]=\"(visualData.clickable ? hoverClass : '') + (!canInteract ? ' no-interact' : '')\"\n          (click)=\"onClick($event, data)\"\n          (mousedown)=\"onMouseDown($event, data)\"\n          (mousemove)=\"onMouseMove($event, data)\"\n          (mouseup)=\"onMouseUp($event, data)\"\n          [id]=\"elementId\" \n          [attr.transform]=\"visualData.rotation > 0 ? 'rotate(' + visualData.rotation + ',' + getRotationCenterX() + ',' + getRotationCenterY() + ')' : ''\"\n          [attr.points]=\"getPoints()\"\n          [attr.stroke-dasharray]=\"visualData.dashedLine ? '10 10' : ''\"\n          [attr.fill]=\"visualData.showFill ? visualData.fill : 'transparent'\"\n          [attr.stroke]=\"visualData.showStroke ? visualData.stroke : 'transparent'\"\n          [attr.stroke-width]=\"visualData.strokeWidth\"\n          [attr.opacity]=\"visualData.opacity\">\n      \n        </svg:polygon>\n\n        <svg:polyline *ngIf=\"data && visualData && !data.isClosed\" \n        [ngClass]=\"(visualData.clickable ? hoverClass : '') + (!canInteract ? ' no-interact' : '')\"\n          (click)=\"onClick($event, data)\"\n          (mousedown)=\"onMouseDown($event, data)\"\n          (mousemove)=\"onMouseMove($event, data)\"\n          (mouseup)=\"onMouseUp($event, data)\"\n          [id]=\"elementId\" \n          [attr.transform]=\"visualData.rotation > 0 ? 'rotate(' + visualData.rotation + ',' + getRotationCenterX() + ',' + getRotationCenterY() + ')' : ''\"\n          [attr.points]=\"getPoints()\"\n          [attr.stroke-dasharray]=\"visualData.dashedLine ? '10 10' : ''\"\n          [attr.stroke]=\"visualData.showStroke ? visualData.stroke : 'transparent'\"\n          [attr.stroke-width]=\"visualData.strokeWidth\"\n          [attr.opacity]=\"visualData.opacity\"\n          [attr.fill]=\"'transparent'\">\n      \n        </svg:polyline>\n    </ng-template>\n  ",
                    styles: ["\n\n  "]
                },] },
    ];
    return DrPolygonComponent;
}(dr_object_component_1.DrObjectComponent));
exports.DrPolygonComponent = DrPolygonComponent;
//# sourceMappingURL=dr-polygon.component.js.map