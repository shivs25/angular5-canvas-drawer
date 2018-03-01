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
var DrImageComponent = (function (_super) {
    __extends(DrImageComponent, _super);
    function DrImageComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DrImageComponent.prototype.ngOnInit = function () {
    };
    DrImageComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-dr-image',
                    template: "\n    <ng-template #elementTemplate>\n      <ng-container *ngIf=\"data\">\n          <svg:rect\n          [ngClass]=\"{ clickable: data.clickable }\"\n          (click)=\"onClick(data)\"\n          [id]=\"data.id\"\n          [attr.x]=\"data.x\"\n          [attr.y]=\"data.y\"\n          [attr.width]=\"data.width\"\n          [attr.height]=\"data.height\"\n          [attr.fill]=\"data.fill\"\n          [attr.opacity]=\"data.opacity\">\n        </svg:rect>\n        <svg:image \n            [ngClass]=\"{ clickable: data.clickable }\"\n            (click)=\"onClick(data)\"\n            [attr.x]=\"data.x\"\n            [attr.y]=\"data.y\"\n            [attr.width]=\"data.width\"\n            [attr.height]=\"data.height\"\n            [attr.href]=\"data.url\"\n            [attr.opacity]=\"data.opacity\">\n          </svg:image>\n        <svg:rect\n          [ngClass]=\"{ clickable: data.clickable }\"\n          (click)=\"onClick(data)\"\n          [id]=\"data.id\"\n          [attr.x]=\"data.x\"\n          [attr.y]=\"data.y\"\n          [attr.width]=\"data.width\"\n          [attr.height]=\"data.height\"\n          [attr.fill]=\"data.showFill ? data.fill : 'transparent'\"\n          [attr.stroke]=\"data.showStroke ? data.stroke : 'transparent'\"\n          [attr.stroke-width]=\"data.strokeWidth\"\n          [attr.opacity]=\"data.opacity\">\n        </svg:rect>\n      </ng-container>\n    \n    \n    \n    </ng-template>\n  ",
                    styles: ["\n\n  "]
                },] },
    ];
    /** @nocollapse */
    DrImageComponent.ctorParameters = function () { return []; };
    return DrImageComponent;
}(dr_object_component_1.DrObjectComponent));
exports.DrImageComponent = DrImageComponent;
//# sourceMappingURL=dr-image.component.js.map