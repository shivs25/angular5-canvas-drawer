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
var DrRectComponent = /** @class */ (function (_super) {
    __extends(DrRectComponent, _super);
    function DrRectComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DrRectComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'dr-rect',
                    template: "\n    <ng-template #elementTemplate>\n        <svg:rect *ngIf=\"data && visualData\" \n        [ngClass]=\"(visualData.clickable ? hoverClass : '') + (!canInteract ? ' no-interact' : '')\"\n          (click)=\"onClick($event, data)\"\n          (mousedown)=\"onMouseDown($event, data)\"\n          (mousemove)=\"onMouseMove($event, data)\"\n          (mouseup)=\"onMouseUp($event, data)\"\n          [id]=\"elementId\" \n          [attr.x]=\"data.x\" \n          [attr.y]=\"data.y\" \n          [attr.transform]=\"visualData.rotation > 0 ? 'rotate(' + visualData.rotation + ',' + (visualData.x + visualData.width / 2 )+ ',' + (visualData.y + visualData.height / 2) + ')' : ''\"\n          [attr.stroke-dasharray]=\"visualData.dashedLine ? '10 10' : ''\"\n          [attr.width]=\"data.width\" \n          [attr.height]=\"data.height\"\n          [attr.rx]=\"data.rounded ? 16 : 0\"\n          [attr.ry]=\"data.rounded ? 16 : 0\"\n          [attr.fill]=\"visualData.showFill ? visualData.fill : 'transparent'\"\n          [attr.stroke]=\"visualData.showStroke ? visualData.stroke : 'transparent'\"\n          [attr.stroke-width]=\"visualData.strokeWidth\"\n          [attr.opacity]=\"visualData.opacity\">\n        </svg:rect>\n    </ng-template>\n  ",
                    styles: ["\n\n  "]
                },] },
    ];
    /** @nocollapse */
    DrRectComponent.ctorParameters = function () { return []; };
    return DrRectComponent;
}(dr_object_component_1.DrObjectComponent));
exports.DrRectComponent = DrRectComponent;
//# sourceMappingURL=dr-rect.component.js.map