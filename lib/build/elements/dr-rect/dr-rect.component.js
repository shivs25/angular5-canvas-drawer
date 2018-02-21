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
var DrRectComponent = (function (_super) {
    __extends(DrRectComponent, _super);
    function DrRectComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DrRectComponent.prototype.ngOnInit = function () {
    };
    DrRectComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'dr-rect',
                    template: "\n    <ng-template #elementTemplate>\n        <svg:rect *ngIf=\"data\" \n          [ngClass]=\"{ clickable: data.clickable }\"\n          (click)=\"onClick(data)\"\n          [id]=\"data.id\" \n          [attr.x]=\"data.x\" \n          [attr.y]=\"data.y\" \n          [attr.width]=\"data.width\" \n          [attr.height]=\"data.height\"\n          [attr.fill]=\"data.fill\"\n          [attr.stroke]=\"data.stroke\"\n          [attr.stroke-width]=\"data.strokeWidth\"\n          [attr.opacity]=\"data.opacity\">\n        </svg:rect>\n    </ng-template>\n  ",
                    styles: ["\n\n  "]
                },] },
    ];
    /** @nocollapse */
    DrRectComponent.ctorParameters = function () { return []; };
    return DrRectComponent;
}(dr_object_component_1.DrObjectComponent));
exports.DrRectComponent = DrRectComponent;
//# sourceMappingURL=dr-rect.component.js.map