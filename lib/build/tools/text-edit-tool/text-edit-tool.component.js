"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var data_store_service_1 = require("../../services/data-store.service");
var enums_1 = require("../../models/enums");
var TextEditToolComponent = /** @class */ (function () {
    function TextEditToolComponent(_dataService) {
        this._dataService = _dataService;
        this.currentObject = null;
        this.cssBounds = null;
        this.selectionTransform = null;
        this.selectionStyle = {
            showFill: false,
            dashedLine: false,
            showStroke: true,
            stroke: 'red',
            strokeWidth: 1
        };
    }
    TextEditToolComponent.prototype.onInput = function (evt) {
        console.log(evt);
    };
    TextEditToolComponent.prototype.onClick = function () {
        this._dataService.selectedTool = enums_1.EditorToolType.SELECTOR_TOOL;
    };
    TextEditToolComponent.prototype.ngOnInit = function () {
        this.currentObject = Object.assign({}, this._dataService.selectedObjects[0]);
        this.selectionTransform = "translate(" + (this.currentObject.x * -1) + " " + (this.currentObject.y * -1) + ")";
        this.cssBounds = {
            left: this.currentObject.x,
            top: this.currentObject.y,
            width: this.currentObject.width,
            height: this.currentObject.height
        };
    };
    TextEditToolComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-text-edit-tool',
                    template: "\n    <div class=\"absolute-position fill-parent\" contenteditable=\"true\" (input)=\"onInput($event)\" (click)=\"onClick()\">\n    \n      <svg *ngIf=\"cssBounds\" [ngStyle]=\"cssBounds\"\n            [ngClass]=\"'text'\"\n            class=\"absolute-position\" xmlns=\"http://www.w3.org/2000/svg\" >\n      \n          <svg:g [attr.transform]=\"selectionTransform\">\n            <ng-container \n              dynamic-svg \n              [elementId]=\"100000\"\n              [componentData]=\"currentObject\"\n              [overrideProperties]=\"selectionStyle\"\n              [hoverClass]=\"'text'\" \n\n            ></ng-container>\n          </svg:g>\n      \n\n      </svg>\n    </div>\n  ",
                    styles: ["\n\n  "]
                },] },
    ];
    /** @nocollapse */
    TextEditToolComponent.ctorParameters = function () { return [
        { type: data_store_service_1.DataStoreService, },
    ]; };
    return TextEditToolComponent;
}());
exports.TextEditToolComponent = TextEditToolComponent;
//# sourceMappingURL=text-edit-tool.component.js.map