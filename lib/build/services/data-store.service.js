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
        this.selectionChanged = new core_1.EventEmitter();
        this.editingChanged = new core_1.EventEmitter();
        this.objectsAdded = new core_1.EventEmitter();
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
        set: function (tool) {
            this._ngRedux.dispatch({ type: actions_1.SET_TOOL, tool: tool });
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
    //=========Actions=========
    //=========Actions=========
    DataStoreService.prototype.moveObject = 
    //=========Actions=========
    function (item, newBounds) {
        var b = this.selectedBounds;
        if (null === b || (b.x !== newBounds.x ||
            b.y !== newBounds.y ||
            b.width !== newBounds.width ||
            b.height !== newBounds.height)) {
            this._ngRedux.dispatch({
                type: actions_1.CHANGE_OBJECT_BOUNDS,
                id: item.id,
                changes: this._changeService.getBoundsChanges(item, newBounds, this.selectedBounds),
                newBounds: newBounds
            });
        }
    };
    DataStoreService.prototype.moveObjects = function (items, newBounds) {
        var b = this.selectedBounds;
        if (null === b || (b.x !== newBounds.x ||
            b.y !== newBounds.y ||
            b.width !== newBounds.width ||
            b.height !== newBounds.height)) {
            var changes = [];
            for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                var i = items_1[_i];
                changes.push({ id: i.id, changes: this._changeService.getBoundsChanges(i, newBounds, this.selectedBounds) });
            }
            this._ngRedux.dispatch({
                type: actions_1.CHANGE_OBJECTS_BOUNDS,
                changes: changes,
                newBounds: newBounds
            });
        }
    };
    DataStoreService.prototype.setStyle = function (item, newStyle) {
        this._ngRedux.dispatch({
            type: actions_1.CHANGE_STYLE,
            id: item.id,
            newStyle: newStyle
        });
    };
    DataStoreService.prototype.moveObjectDown = function (item) {
        var index = this.getObjectIndex(item);
        if (index > 0) {
            this._ngRedux.dispatch({
                type: actions_1.CHANGE_Z_INDEX,
                id: item.id,
                newIndex: index - 1
            });
        }
    };
    DataStoreService.prototype.moveObjectUp = function (item) {
        var index = this.getObjectIndex(item);
        if (index < this.elements.length - 1) {
            this._ngRedux.dispatch({
                type: actions_1.CHANGE_Z_INDEX,
                id: item.id,
                newIndex: index + 1
            });
        }
    };
    DataStoreService.prototype.addObject = function (item) {
        this._ngRedux.dispatch({
            type: actions_1.ADD_OBJECT,
            newItem: item
        });
        this.objectsAdded.emit([item]);
    };
    DataStoreService.prototype.groupObjects = function (items) {
        this._ngRedux.dispatch({
            type: actions_1.GROUP_OBJECTS,
            items: items,
            selectedBounds: this._objectHelperService.getBoundingBox(items),
            nextId: this.getNextId()
        });
        this.selectionChanged.emit(this.selectedObjects);
    };
    DataStoreService.prototype.ungroupObject = function (item) {
        this._ngRedux.dispatch({
            type: actions_1.UNGROUP_OBJECT,
            item: item,
            selectedBounds: this._objectHelperService.getBoundingBox(item.objects)
        });
        this.selectionChanged.emit(this.selectedObjects);
    };
    DataStoreService.prototype.getObjectIndex = function (item) {
        var i = this.elements.find(function (t) { return t.id === item.id; });
        var index = this.elements.indexOf(i);
        return index;
    };
    DataStoreService.prototype.getNextId = function () {
        return 0 === this.elements.length ? 1 :
            Math.max.apply(Math, this.elements.map(function (o) { return o.id; })) + 1;
    };
    //=========Selection========
    //=========Selection========
    DataStoreService.prototype.selectObjects = 
    //=========Selection========
    function (items) {
        this._ngRedux.dispatch({
            type: actions_1.SELECT_OBJECTS,
            items: items,
            selectedBounds: items.length > 0 ? this._objectHelperService.getBoundingBox(items) : null
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