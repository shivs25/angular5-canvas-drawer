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
var data_store_service_1 = require("../services/data-store.service");
var EditableDrawerComponent = /** @class */ (function () {
    function EditableDrawerComponent(_dataService) {
        this._dataService = _dataService;
        this.pointStyle = null;
        this.polygonStyle = null;
        this.lineStyle = null;
        this.itemViewBox = null;
        this.penDblClick = "";
        this.selectionChanged = new core_1.EventEmitter();
        this.editingChanged = new core_1.EventEmitter();
        this.objectsAdded = new core_1.EventEmitter();
    }
    EditableDrawerComponent.prototype.getSvgAsText = function () {
        return this.drawer.getSvgAsText();
    };
    EditableDrawerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._dataService.selectionChanged.subscribe(function (selectedObjects) {
            _this.selectionChanged.emit(selectedObjects);
        });
        this._dataService.editingChanged.subscribe(function (isEditing) {
            _this.editingChanged.emit(isEditing);
        });
        this._dataService.objectsAdded.subscribe(function (addedObjects) {
            _this.objectsAdded.emit(addedObjects);
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], EditableDrawerComponent.prototype, "pointStyle", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], EditableDrawerComponent.prototype, "polygonStyle", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], EditableDrawerComponent.prototype, "lineStyle", void 0);
    __decorate([
        core_1.ViewChild('drawer', { static: true }),
        __metadata("design:type", Object)
    ], EditableDrawerComponent.prototype, "drawer", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], EditableDrawerComponent.prototype, "itemViewBox", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], EditableDrawerComponent.prototype, "penDblClick", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], EditableDrawerComponent.prototype, "selectionChanged", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], EditableDrawerComponent.prototype, "editingChanged", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], EditableDrawerComponent.prototype, "objectsAdded", void 0);
    EditableDrawerComponent = __decorate([
        core_1.Component({
            selector: 'app-editable-drawer',
            template: "\n    <app-drawer #drawer [handleMouseEvents]=\"false\" [viewBox]=\"itemViewBox\">\n\n    </app-drawer>\n    <app-editor-tool [pointStyle]=\"pointStyle\" [polygonStyle]=\"polygonStyle\" [lineStyle]=\"lineStyle\" [penDblClick]=\"penDblClick\">\n\n    </app-editor-tool>\n  ",
            styles: ["\n\n  "]
        }),
        __metadata("design:paramtypes", [data_store_service_1.DataStoreService])
    ], EditableDrawerComponent);
    return EditableDrawerComponent;
}());
exports.EditableDrawerComponent = EditableDrawerComponent;
//# sourceMappingURL=editable-drawer.component.js.map