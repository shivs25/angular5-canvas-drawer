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
var d3Plus = require("d3plus-text");
exports.TEXT_PADDING = 4;
exports.SPACE_PLACEHOLDER = "~";
function replaceSpaces(s) {
    var normalSplit = s.split(" ");
    var newSentence = "";
    for (var _i = 0, normalSplit_1 = normalSplit; _i < normalSplit_1.length; _i++) {
        var n = normalSplit_1[_i];
        newSentence += n.length > 0 ? (n + " ") : exports.SPACE_PLACEHOLDER + " ";
    }
    return newSentence.trim();
}
exports.replaceSpaces = replaceSpaces;
var DrTextComponent = /** @class */ (function (_super) {
    __extends(DrTextComponent, _super);
    function DrTextComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.TEXT_PADDING = exports.TEXT_PADDING;
        _this.lineData = null;
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
                this.lineData = d3Plus.textWrap()
                    .fontFamily(d.fontFamily)
                    .fontSize(d.size)
                    .fontWeight(d.bold ? 'bold' : 'normal')
                    .width(d.width - 2 * exports.TEXT_PADDING)(replaceSpaces(value.text));
                this._data = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    DrTextComponent.prototype.redoSpaces = function (l) {
        var exp = new RegExp(exports.SPACE_PLACEHOLDER + " ", "g");
        return l.replace(exp, " ");
    };
    DrTextComponent.prototype.getTextX = function () {
        var o = this.data;
        switch (o.hAlignment) {
            case dr_text_alignment_enum_1.DrTextAlignment.NEAR:
                return o.x + exports.TEXT_PADDING;
            case dr_text_alignment_enum_1.DrTextAlignment.CENTER:
                return o.x + o.width / 2;
            case dr_text_alignment_enum_1.DrTextAlignment.FAR:
                return o.x + o.width - exports.TEXT_PADDING;
        }
    };
    DrTextComponent.prototype.getTextY = function () {
        var o = this.data;
        switch (o.vAlignment) {
            case dr_text_alignment_enum_1.DrTextAlignment.NEAR:
                return o.y + exports.TEXT_PADDING;
            case dr_text_alignment_enum_1.DrTextAlignment.CENTER:
                return o.y + o.height / 2;
            case dr_text_alignment_enum_1.DrTextAlignment.FAR:
                return o.y + o.height - exports.TEXT_PADDING;
        }
    };
    DrTextComponent.prototype.getMultiLineTextY = function () {
        var o = this.visualData;
        switch (o.vAlignment) {
            case dr_text_alignment_enum_1.DrTextAlignment.NEAR:
                return o.y + o.size + exports.TEXT_PADDING;
            case dr_text_alignment_enum_1.DrTextAlignment.CENTER:
                return (o.y + o.height / 2) - //center y of box
                    //center y of box
                    ((this.lineData.lines.length - 1) * (o.size + exports.TEXT_PADDING) / 2 - //total lines
                        //total lines
                        ((o.size) / 2) //Half a line because v alignment doesnt apply
                    );
            case dr_text_alignment_enum_1.DrTextAlignment.FAR:
                return o.y + o.height - (this.lineData.lines.length - 1) * (o.size + exports.TEXT_PADDING) - exports.TEXT_PADDING;
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
                    template: "\n    <ng-template #elementTemplate>\n      <ng-container *ngIf=\"data && visualData\">\n        <svg:g\n          [attr.transform]=\"visualData.rotation > 0 ? 'rotate(' + visualData.rotation + ',' + (visualData.x + visualData.width / 2 )+ ',' + (visualData.y + visualData.height / 2) + ')' : ''\">\n            >\n            <svg:clipPath [id]=\"'clip_' + elementId\">\n                <svg:rect\n                  [attr.x]=\"data.x\"\n                  [attr.y]=\"data.y\"\n                  [attr.width]=\"data.width\"\n                  [attr.height]=\"data.height\">\n                </svg:rect>\n              </svg:clipPath>\n      \n              <svg:rect\n              [ngClass]=\"(visualData.clickable ? hoverClass : '') + (!canInteract ? ' no-interact' : '')\"\n                (click)=\"onClick($event, data)\"\n                (mousedown)=\"onMouseDown($event, data)\"\n                (mousemove)=\"onMouseMove($event, data)\"\n                (mouseup)=\"onMouseUp($event, data)\"\n            \n                [id]=\"'bounds_' + elementId\" \n            \n                [attr.x]=\"data.x\"\n                [attr.y]=\"data.y\"\n                [attr.stroke-dasharray]=\"visualData.dashedLine ? '10 10' : ''\"\n                [attr.width]=\"data.width\"\n                [attr.height]=\"data.height\"\n                [attr.fill]=\"visualData.showFill ? visualData.fill : 'transparent'\"\n                [attr.stroke]=\"visualData.showStroke ? visualData.stroke : 'transparent'\"\n                [attr.stroke-width]=\"visualData.strokeWidth\"\n                [attr.opacity]=\"visualData.opacity\">\n              </svg:rect>\n              <svg:g [id]=\"'g_' + elementId\" [attr.clip-path]=\"'url(#clip_' + elementId + ')'\">\n                <ng-container *ngIf=\"lineData && lineData.lines && lineData.lines.length === 1\">\n                  <svg:text\n\n                    [id]=\"'text_' + elementId\" \n                    (click)=\"onClick($event, data)\"\n                    (mousedown)=\"onMouseDown($event, data)\"\n                    (mousemove)=\"onMouseMove($event, data)\"\n                    (mouseup)=\"onMouseUp($event, data)\"\n                    [attr.x]=\"getTextX()\" \n                    [attr.y]=\"getTextY()\"\n                    [attr.fill]=\"visualData.fontColor\"\n                    [attr.font-size]=\"visualData.size + 'px'\"\n                    [attr.font-family]=\"visualData.fontFamily\"\n                    [attr.font-weight]=\"visualData.bold ? 'bold' : 'normal'\"\n                    [attr.font-style]=\"visualData.italic ? 'italic' : 'normal'\"\n                    [attr.alignment-baseline]=\"getVAlignment()\"\n                    [attr.text-anchor]=\"getHAlignment()\"\n                    [ngClass]=\"'noselect ' + (visualData.clickable ? hoverClass : '') + (!canInteract ? ' no-interact' : '')\">\n                \n                    <tspan class=\"preserve-white-space\" [attr.x]=\"getTextX()\">{{ redoSpaces(lineData.lines[0]) }}</tspan>\n                \n              \n              \n                  </svg:text>\n                </ng-container>\n                <ng-container *ngIf=\"lineData && lineData.lines && lineData.lines.length > 1\">\n                  <svg:text\n                    [id]=\"'text_' + elementId\" \n                    (click)=\"onClick($event, data)\"\n                    (mousedown)=\"onMouseDown($event, data)\"\n                    (mousemove)=\"onMouseMove($event, data)\"\n                    (mouseup)=\"onMouseUp($event, data)\"\n                    [attr.fill]=\"visualData.showText ? visualData.fontColor : 'transparent'\"\n                    [attr.font-size]=\"visualData.size + 'px'\"\n                    [attr.font-family]=\"visualData.fontFamily\"\n                    [attr.font-weight]=\"visualData.bold ? 'bold' : 'normal'\"\n                    [attr.font-style]=\"visualData.italic ? 'italic' : 'normal'\"\n                    [attr.text-anchor]=\"getHAlignment()\"\n                    [ngClass]=\"'noselect ' + (visualData.clickable ? hoverClass : '') + (!canInteract ? ' no-interact' : '')\">\n                \n                \n                    <tspan class=\"preserve-white-space\" [attr.x]=\"getTextX()\" [attr.y]=\"i === 0 ? getMultiLineTextY() : ''\" [attr.dy]=\"i !== 0 ? visualData.size + TEXT_PADDING : ''\" *ngFor=\"let l of lineData.lines; let i = index;\">{{ redoSpaces(l) }}</tspan>\n             \n              \n              \n                  </svg:text>\n                </ng-container>\n            \n              </svg:g>\n        </svg:g>\n      \n      </ng-container>\n    </ng-template>\n  ",
                    styles: ["\n\n  "]
                },] },
    ];
    /** @nocollapse */
    DrTextComponent.ctorParameters = function () { return []; };
    return DrTextComponent;
}(dr_object_component_1.DrObjectComponent));
exports.DrTextComponent = DrTextComponent;
//# sourceMappingURL=dr-text.component.js.map