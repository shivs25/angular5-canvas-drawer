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
var DrGroupedObjectComponent = /** @class */ (function (_super) {
    __extends(DrGroupedObjectComponent, _super);
    function DrGroupedObjectComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DrGroupedObjectComponent.prototype.onChildMouseDown = function (data) {
        this.mouseDown.emit(Object.assign(data, { data: this.data }));
    };
    DrGroupedObjectComponent.prototype.onChildMouseMove = function (data) {
        this.mouseMove.emit(Object.assign(data, { data: this.data }));
    };
    DrGroupedObjectComponent.prototype.onChildMouseUp = function (data) {
        this.mouseUp.emit(Object.assign(data, { data: this.data }));
    };
    DrGroupedObjectComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-dr-grouped-object',
                    template: "\n    <ng-template #elementTemplate>\n        <ng-container *ngIf=\"data && visualData\">\n          <svg:g\n          [attr.transform]=\"data.visualData > 0 ? 'rotate(' + data.visualData + ',' + getRotationCenterX() + ',' + getRotationCenterY() + ')' : ''\"\n          >\n            <ng-container *ngFor=\"let s of data.objects; let i = index\">\n                <ng-container *ngIf=\"s.visible\" dynamic-svg [componentData]=\"s\" [overrideProperties]=\"overrideProperties\" [elementId]=\"i + 1\"\n                  [hoverClass]=\"hoverClass\"\n                  (mouseDown)=\"onChildMouseDown($event)\"\n                  (mouseMove)=\"onChildMouseMove($event)\"\n                  (mouseUp)=\"onChildMouseUp($event)\"\n                  >\n                </ng-container>\n              </ng-container>\n          </svg:g>\n        </ng-container>\n      </ng-template>\n  ",
                    styles: ["\n\n  "]
                },] },
    ];
    /** @nocollapse */
    DrGroupedObjectComponent.ctorParameters = function () { return []; };
    return DrGroupedObjectComponent;
}(dr_object_component_1.DrObjectComponent));
exports.DrGroupedObjectComponent = DrGroupedObjectComponent;
//# sourceMappingURL=dr-grouped-object.component.js.map