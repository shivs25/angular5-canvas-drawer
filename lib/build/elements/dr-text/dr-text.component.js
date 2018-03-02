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
var dr_text_alignment_enum_1 = require("../../models/dr-text-alignment.enum");
var DrTextComponent = /** @class */ (function (_super) {
    __extends(DrTextComponent, _super);
    function DrTextComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DrTextComponent.prototype.ngOnInit = function () {
    };
    DrTextComponent.prototype.getTextX = function () {
        var o = this.visualData;
        switch (o.hAlignment) {
            case dr_text_alignment_enum_1.DrTextAlignment.NEAR:
                return o.x;
            case dr_text_alignment_enum_1.DrTextAlignment.CENTER:
                return o.x + o.width / 2;
            case dr_text_alignment_enum_1.DrTextAlignment.FAR:
                return o.x + o.width;
        }
    };
    DrTextComponent.prototype.getTextY = function () {
        var o = this.visualData;
        switch (o.vAlignment) {
            case dr_text_alignment_enum_1.DrTextAlignment.NEAR:
                return o.y;
            case dr_text_alignment_enum_1.DrTextAlignment.CENTER:
                return o.y + o.height / 2;
            case dr_text_alignment_enum_1.DrTextAlignment.FAR:
                return o.x + o.height;
        }
    };
    DrTextComponent.prototype.getVAlignment = function () {
        var o = this.visualData;
        switch (o.vAlignment) {
            case dr_text_alignment_enum_1.DrTextAlignment.NEAR:
                return 'hanging';
            case dr_text_alignment_enum_1.DrTextAlignment.CENTER:
                return 'middle';
            case dr_text_alignment_enum_1.DrTextAlignment.FAR:
                return 'alphabetical';
        }
    };
    DrTextComponent.prototype.getHAlignment = function () {
        var o = this.visualData;
        switch (o.hAlignment) {
            case dr_text_alignment_enum_1.DrTextAlignment.NEAR:
                return 'start';
            case dr_text_alignment_enum_1.DrTextAlignment.CENTER:
                return 'middle';
            case dr_text_alignment_enum_1.DrTextAlignment.FAR:
                return 'end';
        }
    };
    DrTextComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'dr-text',
                    template: "\n    <ng-template #elementTemplate>\n      <ng-container *ngIf=\"data && visualData\">\n          <svg:clipPath [id]=\"data.id + 'clip'\">\n              <svg:rect\n                [attr.x]=\"visualData.x\"\n                [attr.y]=\"visualData.y\"\n                [attr.width]=\"visualData.width\"\n                [attr.height]=\"visualData.height\">\n              </svg:rect>\n            </svg:clipPath>\n    \n            <svg:rect\n              [ngClass]=\"visualData.clickable ? hoverClass : ''\"\n              (click)=\"onClick($event, data)\"\n              (mousedown)=\"onMouseDown($event, data)\"\n              (mousemove)=\"onMouseMove($event, data)\"\n              (mouseup)=\"onMouseUp($event, data)\"\n          \n              [id]=\"data.id\"\n              [attr.x]=\"visualData.x\"\n              [attr.y]=\"visualData.y\"\n              [attr.stroke-dasharray]=\"visualData.dashedLine ? '10 10' : ''\"\n              [attr.width]=\"visualData.width\"\n              [attr.height]=\"visualData.height\"\n              [attr.fill]=\"visualData.showFill ? data.fill : 'transparent'\"\n              [attr.stroke]=\"visualData.showStroke ? data.stroke : 'transparent'\"\n              [attr.stroke-width]=\"visualData.strokeWidth\"\n              [attr.opacity]=\"visualData.opacity\">\n            </svg:rect>\n            <svg:g [attr.clip-path]=\"'url(#' + data.id + 'clip)'\">\n              <svg:text \n                (click)=\"onClick($event, data)\"\n                (mousedown)=\"onMouseDown($event, data)\"\n                (mousemove)=\"onMouseMove($event, data)\"\n                (mouseup)=\"onMouseUp($event, data)\"\n\n                [attr.x]=\"getTextX()\" \n                [attr.y]=\"getTextY()\"\n                [attr.fill]=\"visualData.fontColor\"\n                [attr.font-size]=\"visualData.size + 'px'\"\n                [attr.font-family]=\"visualData.fontFamily\"\n                [attr.font-weight]=\"visualData.bold ? 'bold' : 'normal'\"\n                [attr.font-style]=\"visualData.italic ? 'italic' : 'normal'\"\n                [attr.alignment-baseline]=\"getVAlignment()\"\n                [attr.text-anchor]=\"getHAlignment()\">\n                {{ visualData.text }}\n            \n              </svg:text>\n            </svg:g>\n      </ng-container>\n    </ng-template>\n  ",
                    styles: ["\n\n  "]
                },] },
    ];
    /** @nocollapse */
    DrTextComponent.ctorParameters = function () { return []; };
    return DrTextComponent;
}(dr_object_component_1.DrObjectComponent));
exports.DrTextComponent = DrTextComponent;
//# sourceMappingURL=dr-text.component.js.map