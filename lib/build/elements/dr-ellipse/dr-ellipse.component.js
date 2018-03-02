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
var DrEllipseComponent = /** @class */ (function (_super) {
    __extends(DrEllipseComponent, _super);
    function DrEllipseComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DrEllipseComponent.prototype.ngOnInit = function () {
    };
    DrEllipseComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'dr-ellipse',
                    template: "\n    <ng-template #elementTemplate>\n        <svg:ellipse *ngIf=\"data && visualData\" \n          [ngClass]=\"visualData.clickable ? hoverClass : ''\"\n          (click)=\"onClick($event, data)\"\n          (mousedown)=\"onMouseDown($event, data)\"\n          (mousemove)=\"onMouseMove($event, data)\"\n          (mouseup)=\"onMouseUp($event, data)\"\n          [id]=\"data.id\" \n          [attr.stroke-dasharray]=\"visualData.dashedLine ? '10 10' : ''\"\n          [attr.cx]=\"visualData.x\"\n          [attr.cy]=\"visualData.y\" \n          [attr.rx]=\"visualData.rx\" \n          [attr.ry]=\"visualData.ry\"\n          [attr.fill]=\"visualData.showFill ? visualData.fill : 'transparent'\"\n          [attr.stroke]=\"visualData.showStroke ? visualData.stroke : 'transparent'\"\n          [attr.stroke-width]=\"visualData.strokeWidth\"\n          [attr.opacity]=\"visualData.opacity\">\n        </svg:ellipse>\n    </ng-template>\n  ",
                    styles: ["\n\n  "]
                },] },
    ];
    /** @nocollapse */
    DrEllipseComponent.ctorParameters = function () { return []; };
    return DrEllipseComponent;
}(dr_object_component_1.DrObjectComponent));
exports.DrEllipseComponent = DrEllipseComponent;
//# sourceMappingURL=dr-ellipse.component.js.map