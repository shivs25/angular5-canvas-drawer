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
var store_1 = require("@angular-redux/store");
var enums_1 = require("../models/enums");
var data_store_service_1 = require("../services/data-store.service");
var EditorToolComponent = /** @class */ (function () {
    function EditorToolComponent(_dataService) {
        this._dataService = _dataService;
        this.SELECTOR_TOOL = enums_1.EditorToolType.SELECTOR_TOOL;
        this.PEN_TOOL = enums_1.EditorToolType.PEN_TOOL;
        this.TEXT_EDIT_TOOL = enums_1.EditorToolType.TEXT_EDIT_TOOL;
        this.TEXT_CREATION_TOOL = enums_1.EditorToolType.TEXT_CREATION_TOOL;
    }
    EditorToolComponent.prototype.ngOnInit = function () {
    };
    EditorToolComponent.prototype.shouldShowCreationTool = function () {
        switch (this._dataService.selectedTool) {
            case enums_1.EditorToolType.ELLIPSE_TOOL:
            case enums_1.EditorToolType.RECTANGLE_TOOL:
            case enums_1.EditorToolType.IMAGE_TOOL:
            case enums_1.EditorToolType.TEXT_TOOL:
            case enums_1.EditorToolType.TRIANGLE_TOOL:
            case enums_1.EditorToolType.STAR_TOOL:
            case enums_1.EditorToolType.ARROW_TOOL:
            case enums_1.EditorToolType.ROUNDED_RECTANGLE_TOOL:
            case enums_1.EditorToolType.CALLOUT_SQUARE_TOOL:
                return true;
        }
        return false;
    };
    EditorToolComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-editor-tool',
                    template: "\n    <app-selector-tool *ngIf=\"SELECTOR_TOOL === (elementState | async)?.present.selectedTool\"></app-selector-tool>\n    <app-pen-tool *ngIf=\"PEN_TOOL === (elementState | async)?.present.selectedTool\"></app-pen-tool>\n    <app-object-creation-tool *ngIf=\"shouldShowCreationTool()\"></app-object-creation-tool>\n    <app-text-edit-tool *ngIf=\"TEXT_EDIT_TOOL === (elementState | async)?.present.selectedTool ||\n                               TEXT_CREATION_TOOL === (elementState | async)?.present.selectedTool\"></app-text-edit-tool>\n  ",
                    styles: ["\n\n  "]
                },] },
    ];
    /** @nocollapse */
    EditorToolComponent.ctorParameters = function () { return [
        { type: data_store_service_1.DataStoreService, },
    ]; };
    __decorate([
        store_1.select(),
        __metadata("design:type", Object)
    ], EditorToolComponent.prototype, "elementState", void 0);
    return EditorToolComponent;
}());
exports.EditorToolComponent = EditorToolComponent;
//# sourceMappingURL=editor-tool.component.js.map