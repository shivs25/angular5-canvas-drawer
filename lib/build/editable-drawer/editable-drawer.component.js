"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var data_store_service_1 = require("../services/data-store.service");
var EditableDrawerComponent = /** @class */ (function () {
    function EditableDrawerComponent(_dataService) {
        this._dataService = _dataService;
        this.itemViewBox = null;
        this.selectionChanged = new core_1.EventEmitter();
        this.editingChanged = new core_1.EventEmitter();
        this.objectsAdded = new core_1.EventEmitter();
    }
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
    EditableDrawerComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-editable-drawer',
                    template: "\n    <app-drawer [handleMouseEvents]=\"false\" [viewBox]=\"itemViewBox\">\n\n    </app-drawer>\n    <app-editor-tool>\n\n    </app-editor-tool>\n  ",
                    styles: ["\n\n  "]
                },] },
    ];
    /** @nocollapse */
    EditableDrawerComponent.ctorParameters = function () { return [
        { type: data_store_service_1.DataStoreService }
    ]; };
    EditableDrawerComponent.propDecorators = {
        itemViewBox: [{ type: core_1.Input }],
        selectionChanged: [{ type: core_1.Output }],
        editingChanged: [{ type: core_1.Output }],
        objectsAdded: [{ type: core_1.Output }]
    };
    return EditableDrawerComponent;
}());
exports.EditableDrawerComponent = EditableDrawerComponent;
//# sourceMappingURL=editable-drawer.component.js.map