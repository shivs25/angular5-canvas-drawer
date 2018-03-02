"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var data_store_service_1 = require("../services/data-store.service");
var EditableDrawerComponent = /** @class */ (function () {
    function EditableDrawerComponent(_dataService) {
        this._dataService = _dataService;
        this.selectionChanged = new core_1.EventEmitter();
        this.editingChanged = new core_1.EventEmitter();
    }
    Object.defineProperty(EditableDrawerComponent.prototype, "elements", {
        get: function () {
            return this._dataService.elements;
        },
        set: function (elements) {
            this._dataService.elements = elements;
        },
        enumerable: true,
        configurable: true
    });
    EditableDrawerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._dataService.selectionChanged.subscribe(function (selectedObjects) {
            _this.selectionChanged.emit(selectedObjects);
        });
        this._dataService.editingChanged.subscribe(function (isEditing) {
            _this.editingChanged.emit(isEditing);
        });
    };
    EditableDrawerComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-editable-drawer',
                    template: "\n    <app-drawer [handleMouseEvents]=\"false\">\n\n    </app-drawer>\n    <app-editor-tool>\n\n    </app-editor-tool>\n  ",
                    styles: ["\n\n  "]
                },] },
    ];
    /** @nocollapse */
    EditableDrawerComponent.ctorParameters = function () { return [
        { type: data_store_service_1.DataStoreService, },
    ]; };
    EditableDrawerComponent.propDecorators = {
        "selectionChanged": [{ type: core_1.Output },],
        "editingChanged": [{ type: core_1.Output },],
        "elements": [{ type: core_1.Input },],
    };
    return EditableDrawerComponent;
}());
exports.EditableDrawerComponent = EditableDrawerComponent;
//# sourceMappingURL=editable-drawer.component.js.map