"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var store_1 = require("@angular-redux/store");
var actions_1 = require("../actions");
var redux_undo_1 = require("redux-undo");
var DataStoreService = (function () {
    function DataStoreService(ngRedux) {
        this.ngRedux = ngRedux;
    }
    Object.defineProperty(DataStoreService.prototype, "elements", {
        get: function () {
            return this.ngRedux.getState().elementState.present.elements;
        },
        set: function (elements) {
            this.ngRedux.dispatch({ type: actions_1.SET_ELEMENTS, elements: elements });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataStoreService.prototype, "selectedIds", {
        get: function () {
            return this.ngRedux.getState().elementState.present.selectedIds;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataStoreService.prototype, "selectedTool", {
        get: function () {
            return this.ngRedux.getState().elementState.present.selectedTool;
        },
        enumerable: true,
        configurable: true
    });
    DataStoreService.prototype.moveObject = function (item, newBounds) {
        this.ngRedux.dispatch({ type: actions_1.CHANGE_OBJECT_BOUNDS, id: item.id, newBounds: newBounds });
    };
    DataStoreService.prototype.undo = function () {
        this.ngRedux.dispatch(redux_undo_1.ActionCreators.undo());
    };
    DataStoreService.prototype.redo = function () {
        this.ngRedux.dispatch(redux_undo_1.ActionCreators.redo());
    };
    DataStoreService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    DataStoreService.ctorParameters = function () { return [
        { type: store_1.NgRedux, },
    ]; };
    return DataStoreService;
}());
exports.DataStoreService = DataStoreService;
//# sourceMappingURL=data-store.service.js.map