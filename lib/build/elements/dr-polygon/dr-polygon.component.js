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
var DrPolygonComponent = (function (_super) {
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
    DrPolygonComponent.prototype.ngOnInit = function () {
    };
    DrPolygonComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'dr-polygon',
                    template: "\n    <ng-template #elementTemplate>\n        <svg:polygon *ngIf=\"data\" \n          [ngClass]=\"{ clickable: data.clickable }\"\n          (click)=\"onClick(data)\"\n          [id]=\"data.id\"\n          [attr.points]=\"getPoints()\"\n          [attr.fill]=\"data.fill\"\n          [attr.stroke]=\"data.stroke\"\n          [attr.stroke-width]=\"data.strokeWidth\"\n          [attr.opacity]=\"data.opacity\">\n        </svg:polygon>\n    </ng-template>\n  ",
                    styles: ["\n\n  "]
                },] },
    ];
    /** @nocollapse */
    DrPolygonComponent.ctorParameters = function () { return []; };
    return DrPolygonComponent;
}(dr_object_component_1.DrObjectComponent));
exports.DrPolygonComponent = DrPolygonComponent;
//# sourceMappingURL=dr-polygon.component.js.map