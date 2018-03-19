"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var data_store_service_1 = require("../../services/data-store.service");
var enums_1 = require("../../models/enums");
var dr_text_component_1 = require("../../elements/dr-text/dr-text.component");
var editable_text_area_component_1 = require("../editable-text-area/editable-text-area.component");
var d3Plus = require("d3plus-text");
var TextEditToolComponent = /** @class */ (function () {
    function TextEditToolComponent(_dataService, _elementRef) {
        this._dataService = _dataService;
        this._elementRef = _elementRef;
        this.currentObject = null;
        this.cssBounds = null;
        this.textAreaStyle = null;
        this.selectionTransform = null;
        this.rotation = 0;
        this.inputBorder = false;
        this.selectionStyle = {
            showFill: false,
            dashedLine: false,
            showStroke: true,
            stroke: 'red',
            strokeWidth: 1,
            rotation: 0,
            showText: false
        };
        this._offset = null;
    }
    TextEditToolComponent.prototype.onTextAreaInput = function (evt) {
        if (enums_1.DrTextAlignment.CENTER === this.currentObject.vAlignment) {
            Object.assign(this.textAreaStyle, {
                "margin-top": this.getMarginTop(evt.height)
            });
        }
        var newVal = evt.height >= this._container.nativeElement.offsetHeight;
        if (newVal !== this.inputBorder) {
            this.inputBorder = newVal;
        }
    };
    TextEditToolComponent.prototype.onTextAreaLoaded = function (evt) {
        if (enums_1.DrTextAlignment.CENTER === this.currentObject.vAlignment) {
            Object.assign(this.textAreaStyle, {
                "margin-top": this.getMarginTop(evt),
            });
        }
        Object.assign(this.textAreaStyle, {
            "opacity": 1
        });
    };
    TextEditToolComponent.prototype.onClick = function () {
        var newText = this._textArea.newText
            .replace(/<div>/g, "\n")
            .replace(/<br>/g, "\r\n")
            .replace(/<\/div>/g, "")
            .replace(/&nbsp;/g, " ");
        var bounds = {
            x: this.currentObject.x,
            y: this.currentObject.y,
            width: this.currentObject.width,
            height: this.currentObject.height
        };
        var textAreaSize = this._textArea.newHeight;
        if (textAreaSize > this.currentObject.height) {
            switch (this.currentObject.vAlignment) {
                case enums_1.DrTextAlignment.CENTER:
                    bounds.y -= textAreaSize / 2;
                    break;
                case enums_1.DrTextAlignment.FAR:
                    bounds.y -= textAreaSize;
                    break;
            }
            bounds.height = textAreaSize;
        }
        this._dataService.setTextAndBounds(this._dataService.selectedObjects, newText, bounds);
        this._dataService.selectedTool = enums_1.EditorToolType.SELECTOR_TOOL;
    };
    TextEditToolComponent.prototype.ngOnInit = function () {
        this._offset = this._elementRef.nativeElement.getBoundingClientRect();
        this.rotation = this._dataService.selectedObjects[0].rotation;
        this.currentObject = Object.assign({}, this._dataService.selectedObjects[0]);
        this.selectionTransform = "translate(" + (this.currentObject.x * -1) + " " + (this.currentObject.y * -1) + ")";
        this.cssBounds = {
            left: (this.currentObject.x - 1) + "px",
            top: (this.currentObject.y - 1) + "px",
            width: (this.currentObject.width + 2) + "px",
            "min-height": (this.currentObject.height + 2) + "px",
            transform: "rotate(" + this.rotation + "deg)"
        };
        this.textAreaStyle = {
            resize: "none",
            "background-color": "transparent",
            "-webkit-box-shadow": "none",
            "-moz-box-shadow": "none",
            "box-shadow": "none",
            "outline": "none",
            "opacity": "0",
            "color": this.currentObject.fontColor,
            "font-size": this.currentObject.size + "px",
            "line-height": (this.currentObject.size + dr_text_component_1.TEXT_PADDING) + "px",
            "font-family": this.currentObject.fontFamily,
            "text-align": this.getHAlign(),
            padding: dr_text_component_1.TEXT_PADDING + "px",
            left: "-1px",
            right: "-1px",
            top: this.getTop(),
            bottom: this.getBottom()
        };
    };
    TextEditToolComponent.prototype.getTop = function () {
        switch (this.currentObject.vAlignment) {
            case enums_1.DrTextAlignment.NEAR:
                return "-1px";
            case enums_1.DrTextAlignment.CENTER:
                return "50%";
            case enums_1.DrTextAlignment.FAR:
                return "";
        }
    };
    TextEditToolComponent.prototype.getBottom = function () {
        switch (this.currentObject.vAlignment) {
            case enums_1.DrTextAlignment.NEAR:
                return "";
            case enums_1.DrTextAlignment.CENTER:
                return "";
            case enums_1.DrTextAlignment.FAR:
                return "-1px";
        }
    };
    TextEditToolComponent.prototype.getMarginTop = function (offsetHeight) {
        switch (this.currentObject.vAlignment) {
            case enums_1.DrTextAlignment.NEAR:
                return "0";
            case enums_1.DrTextAlignment.CENTER:
                return "-" + (offsetHeight / 2) + "px";
            case enums_1.DrTextAlignment.FAR:
                return "0";
        }
    };
    TextEditToolComponent.prototype.getHAlign = function () {
        switch (this.currentObject.hAlignment) {
            case enums_1.DrTextAlignment.NEAR:
                return "left";
            case enums_1.DrTextAlignment.CENTER:
                return "center";
            case enums_1.DrTextAlignment.FAR:
                return "right";
        }
    };
    TextEditToolComponent.prototype.divify = function () {
        var d = this.currentObject;
        var lineData = d3Plus.textWrap()
            .fontFamily(d.fontFamily)
            .fontSize(d.size)
            .fontWeight(d.bold ? 'bold' : 'normal')
            .width(d.width - 2 * dr_text_component_1.TEXT_PADDING)(dr_text_component_1.replaceSpaces(d.text));
        var returnValue = lineData.lines[0];
        var exp = new RegExp(dr_text_component_1.SPACE_PLACEHOLDER + " ", "g");
        for (var i = 1; i < lineData.lines.length; i++) {
            returnValue += "<div>" + lineData.lines[i].replace(exp, "&nbsp;") + "</div>";
        }
        return returnValue;
    };
    TextEditToolComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-text-edit-tool',
                    template: "\n    <div class=\"absolute-position fill-parent\" (click)=\"onClick()\">\n      <div (click)=\"$event.stopPropagation()\" *ngIf=\"currentObject && cssBounds\" #container [ngStyle]=\"cssBounds\"\n      [ngClass]='{\n        \"absolute-position\": true,\n        \"border-red\": !inputBorder,\n        \"border-invisible\": inputBorder }'>\n          <app-editable-text-area #textArea [border]=\"inputBorder\" (dataInput)=\"onTextAreaInput($event)\" (load)=\"onTextAreaLoaded($event)\" \n                                  [textAreaStyle]=\"textAreaStyle\" [text]=\"divify()\"></app-editable-text-area>\n    \n      </div>\n    </div>\n  ",
                    styles: ["\n\n  "]
                },] },
    ];
    /** @nocollapse */
    TextEditToolComponent.ctorParameters = function () { return [
        { type: data_store_service_1.DataStoreService, },
        { type: core_1.ElementRef, },
    ]; };
    TextEditToolComponent.propDecorators = {
        "_container": [{ type: core_1.ViewChild, args: ['container',] },],
        "_textArea": [{ type: core_1.ViewChild, args: ['textArea',] },],
    };
    return TextEditToolComponent;
}());
exports.TextEditToolComponent = TextEditToolComponent;
//# sourceMappingURL=text-edit-tool.component.js.map