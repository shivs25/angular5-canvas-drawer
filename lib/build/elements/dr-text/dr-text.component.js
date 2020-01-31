"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dr_object_component_1 = require("../dr-object/dr-object.component");
var dr_text_alignment_enum_1 = require("../../models/dr-text-alignment.enum");
var drawer_object_helper_service_1 = require("../../services/drawer-object-helper.service");
var text_rendering_service_1 = require("../../services/text-rendering.service");
var DrTextComponent = /** @class */ (function (_super) {
    __extends(DrTextComponent, _super);
    function DrTextComponent(_textService, _objectHelperService) {
        var _this = _super.call(this, _objectHelperService) || this;
        _this._textService = _textService;
        _this.TEXT_PADDING = text_rendering_service_1.TEXT_PADDING;
        _this.LINE_HEIGHT_RATIO = text_rendering_service_1.LINE_HEIGHT_RATIO;
        _this.MATH = Math;
        _this.lineData = null;
        _this.firstLine = 0;
        _this._data = null;
        return _this;
    }
    Object.defineProperty(DrTextComponent.prototype, "visualData", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            if (this._data !== value) {
                var d = value;
                var ti = this._textService.getSvgText(d);
                this.firstLine = ti.findIndex(function (t) { return t.text.length > 0; });
                this.lineData = ti;
                this._data = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    DrTextComponent.prototype.getTextX = function () {
        var o = this.data;
        switch (o.hAlignment) {
            case dr_text_alignment_enum_1.DrTextAlignment.NEAR:
                return o.x + text_rendering_service_1.TEXT_PADDING;
            case dr_text_alignment_enum_1.DrTextAlignment.CENTER:
                return o.x + o.width / 2;
            case dr_text_alignment_enum_1.DrTextAlignment.FAR:
                return o.x + o.width - text_rendering_service_1.TEXT_PADDING;
        }
    };
    DrTextComponent.prototype.getTextY = function () {
        var o = this.data;
        switch (o.vAlignment) {
            case dr_text_alignment_enum_1.DrTextAlignment.NEAR:
                return o.y + text_rendering_service_1.TEXT_PADDING;
            case dr_text_alignment_enum_1.DrTextAlignment.CENTER:
                return o.y + o.height / 2;
            case dr_text_alignment_enum_1.DrTextAlignment.FAR:
                return o.y + o.height - text_rendering_service_1.TEXT_PADDING;
        }
    };
    DrTextComponent.prototype.getMultiLineTextY = function () {
        var o = this.visualData;
        switch (o.vAlignment) {
            case dr_text_alignment_enum_1.DrTextAlignment.NEAR:
                return o.y + this._textService.getLineHeight(o) - this._textService.getAscent(o) + text_rendering_service_1.TEXT_PADDING;
            case dr_text_alignment_enum_1.DrTextAlignment.CENTER:
                return (o.y + o.height / 2) - //center y of box
                    ((this.lineData.length * this._textService.getLineHeight(o)) / 2) + this._textService.getLineHeight(o) - this._textService.getAscent(o) / 2;
            case dr_text_alignment_enum_1.DrTextAlignment.FAR:
                return o.y + o.height - text_rendering_service_1.TEXT_PADDING;
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
    DrTextComponent = __decorate([
        core_1.Component({
            selector: 'dr-text',
            template: "\n    <ng-template #elementTemplate>\n      <ng-container *ngIf=\"data && visualData\">\n        <svg:g\n          [attr.transform]=\"visualData.rotation > 0 ? 'rotate(' + visualData.rotation + ',' + (visualData.x + visualData.width / 2 )+ ',' + (visualData.y + visualData.height / 2) + ')' : ''\">\n            >\n            <svg:clipPath [id]=\"'clip_' + elementId\">\n                <svg:rect\n                  [attr.x]=\"data.x\"\n                  [attr.y]=\"data.y\"\n                  [attr.width]=\"data.width\"\n                  [attr.height]=\"data.height\">\n                </svg:rect>\n              </svg:clipPath>\n      \n              <svg:rect\n              [ngClass]=\"(visualData.clickable ? hoverClass : '') + (!canInteract ? ' no-interact' : '')\"\n                (click)=\"onClick($event, data)\"\n                (mousedown)=\"onMouseDown($event, data)\"\n                (mousemove)=\"onMouseMove($event, data)\"\n                (mouseup)=\"onMouseUp($event, data)\"\n            \n                [id]=\"'bounds_' + elementId\" \n            \n                [attr.x]=\"data.x\"\n                [attr.y]=\"data.y\"\n                [attr.stroke-dasharray]=\"visualData.dashedLine ? '10 10' : ''\"\n                [attr.width]=\"data.width\"\n                [attr.height]=\"data.height\"\n                [attr.fill]=\"visualData.showFill ? visualData.fill : 'transparent'\"\n                [attr.stroke]=\"visualData.showStroke ? visualData.stroke : 'transparent'\"\n                [attr.stroke-width]=\"visualData.strokeWidth\"\n                [attr.opacity]=\"visualData.opacity\">\n              </svg:rect>\n              <svg:g [id]=\"'g_' + elementId\" [attr.clip-path]=\"'url(#clip_' + elementId + ')'\">\n                <ng-container *ngIf=\"lineData && lineData.length === 1\">\n                  <svg:text\n\n                    [id]=\"'text_' + elementId\" \n                    (click)=\"onClick($event, data)\"\n                    (mousedown)=\"onMouseDown($event, data)\"\n                    (mousemove)=\"onMouseMove($event, data)\"\n                    (mouseup)=\"onMouseUp($event, data)\"\n                    [attr.y]=\"getMultiLineTextY()\"\n                    [attr.fill]=\"visualData.showText ? visualData.fontColor : 'transparent'\"\n                    [attr.font-size]=\"visualData.size + 'pt'\"\n                    [attr.font-family]=\"visualData.fontFamily\"\n                    [attr.font-weight]=\"visualData.bold ? 'bold' : 'normal'\"\n                    [attr.font-style]=\"visualData.italic ? 'italic' : 'normal'\"\n                    [attr.text-anchor]=\"getHAlignment()\"\n                    [ngClass]=\"'noselect ' + (visualData.clickable ? hoverClass : '') + (!canInteract ? ' no-interact' : '')\">\n                \n                    <tspan class=\"preserve-white-space\" [attr.x]=\"getTextX()\">{{ lineData[0].text }}</tspan>\n                \n              \n              \n                  </svg:text>\n                </ng-container>\n                <ng-container *ngIf=\"lineData && lineData.length > 1\">\n                  <svg:text\n                    [id]=\"'text_' + elementId\" \n                    (click)=\"onClick($event, data)\"\n                    (mousedown)=\"onMouseDown($event, data)\"\n                    (mousemove)=\"onMouseMove($event, data)\"\n                    (mouseup)=\"onMouseUp($event, data)\"\n                    [attr.fill]=\"visualData.showText ? visualData.fontColor : 'transparent'\"\n                    [attr.font-size]=\"visualData.size + 'pt'\"\n                    [attr.font-family]=\"visualData.fontFamily\"\n                    [attr.font-weight]=\"visualData.bold ? 'bold' : 'normal'\"\n                    [attr.font-style]=\"visualData.italic ? 'italic' : 'normal'\"\n                    [attr.text-anchor]=\"getHAlignment()\"\n                    [ngClass]=\"'noselect ' + (visualData.clickable ? hoverClass : '') + (!canInteract ? ' no-interact' : '')\">\n                \n                \n                    <tspan class=\"preserve-white-space\" [attr.x]=\"getTextX()\" \n                          [attr.y]=\"i === firstLine ? getMultiLineTextY() : ''\" \n                          [attr.dy]=\"i !== 0 ? (MATH.round(visualData.size * (LINE_HEIGHT_RATIO)) * l.lineHeightMultiplier) : ''\" \n                          *ngFor=\"let l of lineData; let i = index;\">{{ l.text}}</tspan>\n             \n              \n              \n                  </svg:text>\n                </ng-container>\n            \n              </svg:g>\n        </svg:g>\n      \n      </ng-container>\n    </ng-template>\n  ",
            styles: ["\n\n  "]
        }),
        __metadata("design:paramtypes", [text_rendering_service_1.TextRenderingService,
            drawer_object_helper_service_1.DrawerObjectHelperService])
    ], DrTextComponent);
    return DrTextComponent;
}(dr_object_component_1.DrObjectComponent));
exports.DrTextComponent = DrTextComponent;
//# sourceMappingURL=dr-text.component.js.map