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
var EditableTextAreaComponent = /** @class */ (function () {
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
        //Hack to get the update of dom outside of the change detection loop.
        var _this = this;
        setTimeout(function () {
            _this.dataInput.emit({
                event: evt,
                height: _this._textArea.nativeElement.offsetHeight,
                width: _this._textArea.nativeElement.offsetWidth
            });
        }, 1);
    };
    EditableTextAreaComponent.prototype.finalize = function () {
        //Not Implemented
    };
    __decorate([
        core_1.ViewChild('textArea', { static: true }),
        __metadata("design:type", core_1.ElementRef)
    ], EditableTextAreaComponent.prototype, "_textArea", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], EditableTextAreaComponent.prototype, "border", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], EditableTextAreaComponent.prototype, "textAreaStyle", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], EditableTextAreaComponent.prototype, "text", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], EditableTextAreaComponent.prototype, "load", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], EditableTextAreaComponent.prototype, "dataInput", void 0);
    EditableTextAreaComponent = __decorate([
        core_1.Component({
            selector: 'app-editable-text-area',
            template: "\n    <div #textArea (input)=\"onInput($event)\" \n                  [ngClass]=\"{ \n                    'absolute-position': true, \n                    'border-red': border, \n                    'border-invisible': !border,\n                    'text-area': true\n                  }\" contenteditable [ngStyle]=\"textAreaStyle\" [innerHTML]=\"text\"></div>\n  \n  ",
            styles: ["\n\n  "]
        }),
        __metadata("design:paramtypes", [])
    ], EditableTextAreaComponent);
    return EditableTextAreaComponent;
}());
exports.EditableTextAreaComponent = EditableTextAreaComponent;
//# sourceMappingURL=editable-text-area.component.js.map