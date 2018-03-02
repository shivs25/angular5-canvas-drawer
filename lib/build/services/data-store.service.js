"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var store_1 = require("@angular-redux/store");
var actions_1 = require("../actions");
var redux_undo_1 = require("redux-undo");
var drawer_object_helper_service_1 = require("../services/drawer-object-helper.service");
var change_helper_service_1 = require("./change-helper.service");
var DataStoreService = /** @class */ (function () {
    function DataStoreService(_ngRedux, _objectHelperService, _changeService) {
        this._ngRedux = _ngRedux;
        this._objectHelperService = _objectHelperService;
        this._changeService = _changeService;
        this.undid = new core_1.EventEmitter();
        this.redid = new core_1.EventEmitter();
        this.clickedObject = new core_1.EventEmitter();
        this.mouseDownObject = new core_1.EventEmitter();
        this.mouseMoveObject = new core_1.EventEmitter();
        this.mouseUpObject = new core_1.EventEmitter();
        this.selectionChanged = new core_1.EventEmitter();
        this.editingChanged = new core_1.EventEmitter();
    }
    Object.defineProperty(DataStoreService.prototype, "elements", {
        //=========State=========
        get: 
        //=========State=========
        function () {
            return this._ngRedux.getState().elementState.present.elements;
        },
        set: function (elements) {
            this._ngRedux.dispatch({ type: actions_1.SET_ELEMENTS, elements: elements });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataStoreService.prototype, "selectedObjects", {
        get: function () {
            return this._ngRedux.getState().elementState.present.selectedObjects;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataStoreService.prototype, "selectedBounds", {
        get: function () {
            return this._ngRedux.getState().elementState.present.selectedBounds;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataStoreService.prototype, "selectedTool", {
        get: function () {
            return this._ngRedux.getState().elementState.present.selectedTool;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataStoreService.prototype, "isEditing", {
        get: function () {
            return this._ngRedux.getState().editingState.isEditing;
        },
        enumerable: true,
        configurable: true
    });
    //=========Events=========
    //=========Events=========
    DataStoreService.prototype.handleClickedObject = 
    //=========Events=========
    function (clickedObject) {
        this.clickedObject.emit(clickedObject);
    };
    DataStoreService.prototype.handleMouseDownObject = function (clickedObject) {
        this.mouseDownObject.emit(clickedObject);
    };
    DataStoreService.prototype.handleMouseMoveObject = function (clickedObject) {
        this.mouseMoveObject.emit(clickedObject);
    };
    DataStoreService.prototype.handleMouseUpObject = function (clickedObject) {
        this.mouseUpObject.emit(clickedObject);
    };
    //=========Actions=========
    //=========Actions=========
    DataStoreService.prototype.moveObject = 
    //=========Actions=========
    function (item, newBounds) {
        this._ngRedux.dispatch({
            type: actions_1.CHANGE_OBJECT_BOUNDS,
            id: item.id,
            changes: this._changeService.getBoundsChanges(item, newBounds, this.selectedBounds),
            newBounds: newBounds
        });
    };
    //=========Selection========
    //=========Selection========
    DataStoreService.prototype.selectObjects = 
    //=========Selection========
    function (items) {
        this._ngRedux.dispatch({
            type: actions_1.SELECT_OBJECTS,
            items: items,
            selectedBounds: this._objectHelperService.getBoundingBox(items)
        });
        this.selectionChanged.emit(this.selectedObjects);
    };
    DataStoreService.prototype.beginEdit = function () {
        this._ngRedux.dispatch({ type: actions_1.BEGIN_EDIT });
        this.editingChanged.emit(this.isEditing);
    };
    DataStoreService.prototype.endEdit = function () {
        this._ngRedux.dispatch({ type: actions_1.END_EDIT });
        this.editingChanged.emit(this.isEditing);
    };
    //=========History=========
    //=========History=========
    DataStoreService.prototype.undo = 
    //=========History=========
    function () {
        this._ngRedux.dispatch(redux_undo_1.ActionCreators.undo());
        this.undid.emit();
    };
    DataStoreService.prototype.redo = function () {
        this._ngRedux.dispatch(redux_undo_1.ActionCreators.redo());
        this.redid.emit();
    };
    DataStoreService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    DataStoreService.ctorParameters = function () { return [
        { type: store_1.NgRedux, },
        { type: drawer_object_helper_service_1.DrawerObjectHelperService, },
        { type: change_helper_service_1.ChangeHelperService, },
    ]; };
    return DataStoreService;
}());
exports.DataStoreService = DataStoreService;
//# sourceMappingURL=data-store.service.js.map