"use strict";
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
var data_store_service_1 = require("../../services/data-store.service");
var enums_1 = require("../../models/enums");
var editable_text_area_component_1 = require("../editable-text-area/editable-text-area.component");
var text_rendering_service_1 = require("../../services/text-rendering.service");
var TextEditToolComponent = /** @class */ (function () {
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
        this._needsToFinalize = true;
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
        this._needsToFinalize = false;
        this._toolChangedEvent.unsubscribe();
        this._undoFired.unsubscribe();
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
        this._undoFired = this._dataService.undid.subscribe(function () {
            _this._toolChangedEvent.unsubscribe();
            _this._undoFired.unsubscribe();
        });
        this._toolChangedEvent = this._dataService.toolChanged.subscribe(function () {
            if (_this._dataService.selectedTool === enums_1.EditorToolType.TEXT_EDIT_TOOL) {
                if (_this._needsToFinalize) {
                    _this.finalize();
                }
            }
        });
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
    TextEditToolComponent.prototype.finalize = function () {
        var _this = this;
        if (this._dataService.selectedObjects.find(function (x) { return x.id === _this.currentObject.id; })) {
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
            this._dataService.onTextObjectsChanged(this._dataService.selectedObjects);
        }
        //Tell the tool to not reset any more
        this._needsToFinalize = false;
        this._toolChangedEvent.unsubscribe();
        this._undoFired.unsubscribe();
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
    __decorate([
        core_1.ViewChild('container', { static: true }),
        __metadata("design:type", core_1.ElementRef)
    ], TextEditToolComponent.prototype, "_container", void 0);
    __decorate([
        core_1.ViewChild('textArea', { static: true }),
        __metadata("design:type", editable_text_area_component_1.EditableTextAreaComponent)
    ], TextEditToolComponent.prototype, "_textArea", void 0);
    TextEditToolComponent = __decorate([
        core_1.Component({
            selector: 'app-text-edit-tool',
            template: "\n    <div class=\"absolute-position fill-parent\" (click)=\"onClick()\">\n      <div (click)=\"$event.stopPropagation()\" *ngIf=\"currentObject && cssBounds\" #container [ngStyle]=\"cssBounds\"\n      [ngClass]='{\n        \"absolute-position\": true,\n        \"border-red\": !inputBorder && currentObject.fitText,\n        \"border-invisible\": inputBorder || !currentObject.fitText }'>\n          <app-editable-text-area #textArea [border]=\"inputBorder && currentObject.fitText\" (dataInput)=\"onTextAreaInput($event)\" (load)=\"onTextAreaLoaded($event)\" \n                                  [textAreaStyle]=\"textAreaStyle\" [text]=\"divify()\"></app-editable-text-area>\n    \n      </div>\n    </div>\n  ",
            styles: ["\n\n  "]
        }),
        __metadata("design:paramtypes", [data_store_service_1.DataStoreService,
            text_rendering_service_1.TextRenderingService,
            core_1.ElementRef])
    ], TextEditToolComponent);
    return TextEditToolComponent;
}());
exports.TextEditToolComponent = TextEditToolComponent;
//# sourceMappingURL=text-edit-tool.component.js.map