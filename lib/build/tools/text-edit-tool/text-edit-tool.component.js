"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var data_store_service_1 = require("../../services/data-store.service");
var enums_1 = require("../../models/enums");
var editable_text_area_component_1 = require("../editable-text-area/editable-text-area.component");
var text_rendering_service_1 = require("../../services/text-rendering.service");
var TextEditToolComponent = (function () {
    function TextEditToolComponent(_dataService, _textRenderingService, _elementRef) {
        this._dataService = _dataService;
        this._textRenderingService = _textRenderingService;
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
        var changes = {};
        if (enums_1.DrTextAlignment.CENTER === this.currentObject.vAlignment) {
            Object.assign(changes, this.textAreaStyle, {
                "margin-top": this.getMarginTop(evt.height)
            });
        }
        if (enums_1.DrTextAlignment.CENTER === this.currentObject.hAlignment && !this.currentObject.fitText) {
            Object.assign(changes, this.textAreaStyle, {
                "margin-left": this.getMarginLeft(evt.width)
            });
        }
        if (Object.keys(changes).length > 0) {
            Object.assign(this.textAreaStyle, changes);
        }
    };
    TextEditToolComponent.prototype.onTextAreaLoaded = function (evt) {
        var changes = {};
        if (enums_1.DrTextAlignment.CENTER === this.currentObject.vAlignment) {
            Object.assign(changes, this.textAreaStyle, {
                "margin-top": this.getMarginTop(evt.height),
            });
        }
        if (enums_1.DrTextAlignment.CENTER === this.currentObject.hAlignment && !this.currentObject.fitText) {
            Object.assign(changes, this.textAreaStyle, {
                "margin-left": this.getMarginLeft(evt.width),
            });
        }
        if (Object.keys(changes).length > 0) {
            Object.assign(this.textAreaStyle, changes);
        }
        Object.assign(this.textAreaStyle, {
            "opacity": 1
        });
    };
    TextEditToolComponent.prototype.onClick = function () {
        var newText = this._textRenderingService.undoHtmlText(this._textArea.newText);
        if (this.currentObject.fitText) {
            this._dataService.setText(this._dataService.selectedObjects, newText);
        }
        else {
            var bounds = {
                x: this.currentObject.x,
                y: this.currentObject.y,
                width: this.currentObject.width,
                height: this.currentObject.height
            };
            var textAreaHeight = this._textArea.newHeight;
            var textAreaWidth = this._textArea.newWidth;
            switch (this.currentObject.vAlignment) {
                case enums_1.DrTextAlignment.CENTER:
                    bounds.y = bounds.y + bounds.height / 2 - textAreaHeight / 2;
                    break;
                case enums_1.DrTextAlignment.FAR:
                    bounds.y = bounds.y + bounds.height - textAreaHeight;
                    break;
            }
            bounds.height = textAreaHeight;
            switch (this.currentObject.hAlignment) {
                case enums_1.DrTextAlignment.CENTER:
                    bounds.x = bounds.x + bounds.width / 2 - textAreaWidth / 2;
                    break;
                case enums_1.DrTextAlignment.FAR:
                    bounds.x = bounds.x + bounds.width - textAreaWidth;
                    break;
            }
            bounds.width = textAreaWidth;
            this._dataService.setTextAndBounds(this._dataService.selectedObjects, newText, bounds);
        }
        this._dataService.selectedTool = enums_1.EditorToolType.SELECTOR_TOOL;
        this._dataService.onTextObjectsChanged(this._dataService.selectedObjects);
    };
    TextEditToolComponent.prototype.pixelizeBounds = function (bounds) {
        var returnValue = Object.assign({}, bounds);
        if (bounds.left) {
            returnValue.left = bounds.left + "px";
        }
        if (bounds.top) {
            returnValue.top = bounds.top + "px";
        }
        if (bounds.width) {
            returnValue.width = bounds.width + "px";
        }
        if (bounds.height) {
            returnValue.height = bounds.height + "px";
        }
        return returnValue;
    };
    TextEditToolComponent.prototype.divify = function () {
        return this._textRenderingService.getDivText(this.currentObject);
    };
    TextEditToolComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._offset = this._elementRef.nativeElement.getBoundingClientRect();
        this.rotation = this._dataService.selectedObjects[0].rotation;
        this.currentObject = Object.assign({}, this._dataService.selectedObjects[0]);
        this.selectionTransform = "translate(" + (this.currentObject.x * -1) + " " + (this.currentObject.y * -1) + ")";
        this.cssBounds = {
            left: (this.currentObject.x - 1) + "px",
            top: (this.currentObject.y - 1) + "px",
            width: this.currentObject.fitText ? (this.currentObject.width + 2) + "px" : "",
            "min-width": !this.currentObject.fitText ? (this.currentObject.width + 2) + "px" : "",
            "min-height": (this.currentObject.height + 2) + "px",
            "overflow": "visible",
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
            "font-size": this.currentObject.size + "pt",
            "line-height": (this.currentObject.size * text_rendering_service_1.LINE_HEIGHT_RATIO) + "px",
            "font-family": this.currentObject.fontFamily,
            "font-weight": this.currentObject.bold ? "bold" : "normal",
            "text-align": this.getHAlign(),
            "white-space": this.currentObject.fitText ? "normal" : "nowrap",
            padding: text_rendering_service_1.TEXT_PADDING + "px",
            left: this.getLeft(),
            right: this.getRight(),
            top: this.getTop(),
            bottom: this.getBottom()
        };
        setTimeout(function () {
            var ta = _this._elementRef.nativeElement.querySelector(".text-area");
            ta.focus();
            var selection = window.getSelection();
            var range = document.createRange();
            range.selectNodeContents(ta);
            selection.removeAllRanges();
            selection.addRange(range);
        }, 1);
    };
    TextEditToolComponent.prototype.getTop = function () {
        switch (this.currentObject.vAlignment) {
            case enums_1.DrTextAlignment.NEAR:
                return -(this._textRenderingService.getAscent(this.currentObject) / 2) + "px";
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
                return -(this._textRenderingService.getAscent(this.currentObject) / 2) + "px";
        }
    };
    TextEditToolComponent.prototype.getLeft = function () {
        switch (this.currentObject.hAlignment) {
            case enums_1.DrTextAlignment.NEAR:
                return "-1px";
            case enums_1.DrTextAlignment.CENTER:
                return this.currentObject.fitText ? "-1px" : "50%";
            case enums_1.DrTextAlignment.FAR:
                return this.currentObject.fitText ? "-1px" : "";
        }
    };
    TextEditToolComponent.prototype.getRight = function () {
        switch (this.currentObject.hAlignment) {
            case enums_1.DrTextAlignment.NEAR:
                return this.currentObject.fitText ? "-1px" : "";
            case enums_1.DrTextAlignment.CENTER:
                return this.currentObject.fitText ? "-1px" : "";
            case enums_1.DrTextAlignment.FAR:
                return "-1px";
        }
    };
    TextEditToolComponent.prototype.getMarginTop = function (offsetHeight) {
        switch (this.currentObject.vAlignment) {
            case enums_1.DrTextAlignment.NEAR:
                return "0";
            case enums_1.DrTextAlignment.CENTER:
                return "-" + Math.round((offsetHeight / 2)) + "px";
            case enums_1.DrTextAlignment.FAR:
                return "0";
        }
    };
    TextEditToolComponent.prototype.getMarginLeft = function (offsetWidth) {
        switch (this.currentObject.hAlignment) {
            case enums_1.DrTextAlignment.NEAR:
                return "0";
            case enums_1.DrTextAlignment.CENTER:
                return "-" + Math.round((offsetWidth / 2)) + "px";
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
    TextEditToolComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-text-edit-tool',
                    template: "\n    <div class=\"absolute-position fill-parent\" (click)=\"onClick()\">\n      <div (click)=\"$event.stopPropagation()\" *ngIf=\"currentObject && cssBounds\" #container [ngStyle]=\"cssBounds\"\n      [ngClass]='{\n        \"absolute-position\": true,\n        \"border-red\": !inputBorder && currentObject.fitText,\n        \"border-invisible\": inputBorder || !currentObject.fitText }'>\n          <app-editable-text-area #textArea [border]=\"inputBorder && currentObject.fitText\" (dataInput)=\"onTextAreaInput($event)\" (load)=\"onTextAreaLoaded($event)\" \n                                  [textAreaStyle]=\"textAreaStyle\" [text]=\"divify()\"></app-editable-text-area>\n    \n      </div>\n    </div>\n  ",
                    styles: ["\n\n  "]
                },] },
    ];
    /** @nocollapse */
    TextEditToolComponent.ctorParameters = function () { return [
        { type: data_store_service_1.DataStoreService, },
        { type: text_rendering_service_1.TextRenderingService, },
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