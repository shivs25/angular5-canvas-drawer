"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var EditableTextAreaComponent = (function () {
    function EditableTextAreaComponent() {
        this._text = null;
        this.border = false;
        this.textAreaStyle = null;
        this.text = null;
        this.load = new core_1.EventEmitter();
        this.dataInput = new core_1.EventEmitter();
    }
    Object.defineProperty(EditableTextAreaComponent.prototype, "newText", {
        get: function () {
            return this._textArea.nativeElement.innerHTML;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditableTextAreaComponent.prototype, "newHeight", {
        get: function () {
            return this._textArea.nativeElement.offsetHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditableTextAreaComponent.prototype, "newWidth", {
        get: function () {
            return this._textArea.nativeElement.offsetWidth;
        },
        enumerable: true,
        configurable: true
    });
    EditableTextAreaComponent.prototype.ngOnInit = function () {
        var _this = this;
        //Hack to get the update of dom outside of the change detection loop.
        setTimeout(function () {
            _this.load.emit({
                width: _this._textArea.nativeElement.offsetWidth,
                height: _this._textArea.nativeElement.offsetHeight,
            });
        }, 1);
    };
    EditableTextAreaComponent.prototype.onInput = function (evt) {
        var _this = this;
        //Hack to get the update of dom outside of the change detection loop.
        setTimeout(function () {
            _this.dataInput.emit({
                event: evt,
                height: _this._textArea.nativeElement.offsetHeight,
                width: _this._textArea.nativeElement.offsetWidth
            });
        }, 1);
    };
    EditableTextAreaComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-editable-text-area',
                    template: "\n    <div #textArea (input)=\"onInput($event)\" \n                  [ngClass]=\"{ \n                    'absolute-position': true, \n                    'border-red': border, \n                    'border-invisible': !border,\n                    'text-area': true\n                  }\" contenteditable [ngStyle]=\"textAreaStyle\" [innerHTML]=\"text\"></div>\n  \n  ",
                    styles: ["\n\n  "]
                },] },
    ];
    /** @nocollapse */
    EditableTextAreaComponent.ctorParameters = function () { return []; };
    EditableTextAreaComponent.propDecorators = {
        "_textArea": [{ type: core_1.ViewChild, args: ['textArea',] },],
        "border": [{ type: core_1.Input },],
        "textAreaStyle": [{ type: core_1.Input },],
        "text": [{ type: core_1.Input },],
        "load": [{ type: core_1.Output },],
        "dataInput": [{ type: core_1.Output },],
    };
    return EditableTextAreaComponent;
}());
exports.EditableTextAreaComponent = EditableTextAreaComponent;
//# sourceMappingURL=editable-text-area.component.js.map