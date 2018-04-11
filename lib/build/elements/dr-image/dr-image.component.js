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
var DrImageComponent = /** @class */ (function (_super) {
    __extends(DrImageComponent, _super);
    function DrImageComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DrImageComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-dr-image',
                    template: "\n    <ng-template #elementTemplate>\n      <ng-container *ngIf=\"data && visualData\">\n        <svg:g \n            [attr.transform]=\"visualData.rotation > 0 ? 'rotate(' + visualData.rotation + ',' + (visualData.x + visualData.width / 2 )+ ',' + (visualData.y + visualData.height / 2) + ')' : ''\">\n            <svg:rect\n            [ngClass]=\"(visualData.clickable ? hoverClass : '') + (!canInteract ? ' no-interact' : '')\"\n            (click)=\"onClick($event, data)\"\n            (mousedown)=\"onMouseDown($event, data)\"\n            (mousemove)=\"onMouseMove($event, data)\"\n            (mouseup)=\"onMouseUp($event, data)\"\n            [id]=\"elementId\" \n            [attr.x]=\"data.x\"\n            [attr.y]=\"data.y\"\n            [attr.width]=\"data.width\"\n            [attr.height]=\"data.height\"\n            [attr.fill]=\"visualData.showFill ? visualData.fill : 'transparent'\"\n            [attr.opacity]=\"visualData.opacity\">\n          </svg:rect>\n          <svg:image \n          [ngClass]=\"(visualData.clickable ? hoverClass : '') + (!canInteract ? ' no-interact' : '')\"\n              (click)=\"onClick($event, data)\"\n              (mousedown)=\"onMouseDown($event, data)\"\n              (mousemove)=\"onMouseMove($event, data)\"\n              (mouseup)=\"onMouseUp($event, data)\"\n              [attr.x]=\"data.x\"\n              [attr.y]=\"data.y\"\n              [attr.width]=\"data.width\"\n              [attr.height]=\"data.height\"\n              [attr.xlink:href]=\"visualData.url\"\n              [attr.opacity]=\"visualData.opacity\">\n            </svg:image>\n          <svg:rect\n          [ngClass]=\"(visualData.clickable ? hoverClass : '') + (!canInteract ? ' no-interact' : '')\"\n            (click)=\"onClick($event, data)\"\n            (mousedown)=\"onMouseDown($event, data)\"\n            (mousemove)=\"onMouseMove($event, data)\"\n            (mouseup)=\"onMouseUp($event, data)\"\n            [id]=\"data.id\"\n            [attr.x]=\"data.x\"\n            [attr.y]=\"data.y\"\n            [attr.stroke-dasharray]=\"visualData.dashedLine ? '10 10' : ''\"\n            [attr.width]=\"data.width\"\n            [attr.height]=\"data.height\"\n            [attr.stroke]=\"visualData.showStroke ? visualData.stroke : 'transparent'\"\n            [attr.fill]=\"'transparent'\"\n            [attr.stroke-width]=\"visualData.strokeWidth\"\n            [attr.opacity]=\"visualData.opacity\">\n          </svg:rect>\n        </svg:g>\n      \n      </ng-container>\n    \n    \n    \n    </ng-template>\n  ",
                    styles: ["\n\n  "]
                },] },
    ];
    return DrImageComponent;
}(dr_object_component_1.DrObjectComponent));
exports.DrImageComponent = DrImageComponent;
//# sourceMappingURL=dr-image.component.js.map