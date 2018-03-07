"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var store_1 = require("@angular-redux/store");
var actions_1 = require("../actions");
var redux_undo_1 = require("redux-undo");
var drawer_object_helper_service_1 = require("../services/drawer-object-helper.service");
var change_helper_service_1 = require("./change-helper.service");
var dr_grouped_object_1 = require("../models/dr-grouped-object");
var utilities_1 = require("../utilities");
var DUPLICATE_OFFSET_AMOUNT = 10;
var DataStoreService = /** @class */ (function () {
    function DataStoreService(_ngRedux, _objectHelperService, _changeService) {
        this._ngRedux = _ngRedux;
        this._objectHelperService = _objectHelperService;
        this._changeService = _changeService;
        this.undid = new core_1.EventEmitter();
        this.redid = new core_1.EventEmitter();
        this.selectionChanged = new core_1.EventEmitter();
        this.selectedBoundsChanged = new core_1.EventEmitter();
        this.editingChanged = new core_1.EventEmitter();
        this.objectsAdded = new core_1.EventEmitter();
        this._duplicateOffset = 1;
    }
    Object.defineProperty(DataStoreService.prototype, "elements", {
        //=========State=========
        get: 
        //=========State=========
        function () {
            return this._ngRedux.getState().elementState.present.elements;
        },
        set: function (elements) {
            this._ngRedux.dispatch({ type: actions_1.INIT_ELEMENTS, elements: elements });
            this._ngRedux.dispatch({ type: actions_1.SELECT_OBJECTS, items: [], selectedBounds: null });
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
    DataStoreService.prototype.alignObjectsLeft = 
    //=========Actions=========
    function (items) {
        if (items.length > 1) {
            this.alignObjects(items, 0);
        }
    };
    DataStoreService.prototype.alignObjectsRight = function (items) {
        if (items.length > 1) {
            this.alignObjects(items, 2);
        }
    };
    DataStoreService.prototype.alignObjectsCenter = function (items) {
        if (items.length > 1) {
            this.alignObjects(items, 1);
        }
    };
    DataStoreService.prototype.alignObjectsTop = function (items) {
        if (items.length > 1) {
            this.alignObjects(items, 3);
        }
    };
    DataStoreService.prototype.alignObjectsMiddle = function (items) {
        if (items.length > 1) {
            this.alignObjects(items, 4);
        }
    };
    DataStoreService.prototype.alignObjectsBottom = function (items) {
        if (items.length > 1) {
            this.alignObjects(items, 5);
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
                type: actions_1.CHANGE_OBJECTS_PROPERTIES,
                changes: changes
            });
            this.resetSelection();
        }
        this._duplicateOffset = 1;
    };
    DataStoreService.prototype.setStyles = function (items, newStyle) {
        this._ngRedux.dispatch({
            type: actions_1.CHANGE_OBJECTS_PROPERTIES,
            changes: items.map(function (x) {
                return { id: x.id, changes: Object.assign({}, newStyle) };
            })
        });
        this.resetSelection();
        this._duplicateOffset = 1;
    };
    DataStoreService.prototype.moveObjectsDown = function (items) {
        var indices = [];
        for (var _i = 0, items_2 = items; _i < items_2.length; _i++) {
            var o = items_2[_i];
            indices.push({
                id: o.id,
                index: this.getObjectIndex(o),
                item: o
            });
        }
        var min = Math.min.apply(Math, indices.map(function (b) { return b.index; })) - 1;
        if (min < 0) {
            min = 0;
        }
        ;
        var idsToExclude = indices.map(function (x) { return x.id; });
        var elements = this.elements.slice(0, min).filter(function (x) { return idsToExclude.indexOf(x.id) < 0; }).concat(indices.sort(function (a, b) { return a.index - b.index; }).map(function (x) { return x.item; }), this.elements.slice(min).filter(function (x) { return idsToExclude.indexOf(x.id) < 0; }));
        if (!this.areElementArraysTheSameOrder(elements, this.elements)) {
            this._ngRedux.dispatch({
                type: actions_1.SET_ELEMENTS,
                elements: elements
            });
        }
        this._duplicateOffset = 1;
    };
    DataStoreService.prototype.moveObjectsUp = function (items) {
        var indices = [];
        for (var _i = 0, items_3 = items; _i < items_3.length; _i++) {
            var o = items_3[_i];
            indices.push({
                id: o.id,
                index: this.getObjectIndex(o),
                item: o
            });
        }
        var max = Math.max.apply(Math, indices.map(function (b) { return b.index; })) + 1;
        if (max > this.elements.length - 1) {
            max = this.elements.length - 1;
        }
        var idsToExclude = indices.map(function (x) { return x.id; });
        var elements = this.elements.slice(0, max + 1).filter(function (x) { return idsToExclude.indexOf(x.id) < 0; }).concat(indices.sort(function (a, b) { return a.index - b.index; }).map(function (x) { return x.item; }), this.elements.slice(max + 1).filter(function (x) { return idsToExclude.indexOf(x.id) < 0; }));
        if (!this.areElementArraysTheSameOrder(elements, this.elements)) {
            this._ngRedux.dispatch({
                type: actions_1.SET_ELEMENTS,
                elements: elements
            });
        }
        this._duplicateOffset = 1;
    };
    DataStoreService.prototype.addObjects = function (items) {
        this._ngRedux.dispatch({
            type: actions_1.ADD_OBJECTS,
            newItems: items
        });
        this.objectsAdded.emit(items);
        this._duplicateOffset = 1;
    };
    DataStoreService.prototype.removeObjects = function (items) {
        var ids = items.map(function (x) { return x.id; });
        var newSelectedObjects = this.selectedObjects.filter(function (x) { return ids.indexOf(x.id) < 0; });
        var b = newSelectedObjects.length > 0 ? this._objectHelperService.getBoundingBox(newSelectedObjects) : null;
        this._ngRedux.dispatch({
            type: actions_1.REMOVE_OBJECTS,
            ids: items.map(function (x) { return x.id; })
        });
        this.selectObjects(newSelectedObjects);
        this._duplicateOffset = 1;
    };
    DataStoreService.prototype.groupObjects = function (items) {
        var itemToAdd = dr_grouped_object_1.createDrGroupedObject({
            id: this.getNextId(),
            objects: items
        });
        var groupedObject;
        var highZIndex = 0;
        var indexOf;
        var _loop_1 = function (i) {
            groupedObject = this_1.elements.find(function (t) { return i.id === t.id; });
            if (groupedObject) {
                indexOf = this_1.elements.indexOf(groupedObject);
                if (indexOf > highZIndex) {
                    highZIndex = indexOf;
                }
            }
        };
        var this_1 = this;
        for (var _i = 0, items_4 = items; _i < items_4.length; _i++) {
            var i = items_4[_i];
            _loop_1(i);
        }
        this._ngRedux.dispatch({
            type: actions_1.REPLACE_OBJECTS,
            itemsToRemove: items,
            itemsToAdd: [itemToAdd],
            zIndex: highZIndex
        });
        this.selectObjects([itemToAdd]);
        this._duplicateOffset = 1;
    };
    DataStoreService.prototype.ungroupObject = function (item) {
        this._ngRedux.dispatch({
            type: actions_1.REPLACE_OBJECTS,
            itemsToRemove: [item],
            itemsToAdd: item.objects,
            zIndex: this.elements.indexOf(item)
        });
        this.selectObjects(item.objects);
        this._duplicateOffset = 1;
    };
    DataStoreService.prototype.duplicateObjects = function (items) {
        var newItems = [];
        var b;
        var newB;
        var nextId = this.getNextId();
        var newItem;
        var i;
        for (var _i = 0, items_5 = items; _i < items_5.length; _i++) {
            i = items_5[_i];
            b = this._objectHelperService.getBoundingBox([i]);
            newB = Object.assign({}, b, {
                x: b.x + (this._duplicateOffset * DUPLICATE_OFFSET_AMOUNT),
                y: b.y + (this._duplicateOffset * DUPLICATE_OFFSET_AMOUNT)
            });
            newItem = Object.assign({}, utilities_1.cloneDeep(i), this._changeService.getBoundsChanges(i, newB, b), { id: nextId++ });
            nextId = utilities_1.updateChildItemIds(newItem, nextId);
            newItems.push(newItem);
        }
        this._ngRedux.dispatch({ type: actions_1.ADD_OBJECTS, newItems: newItems });
        this._duplicateOffset++;
    };
    DataStoreService.prototype.clearObjects = function () {
        this._ngRedux.dispatch({ type: actions_1.CLEAR_OBJECTS });
        this.selectObjects([]);
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
    DataStoreService.prototype.areElementArraysTheSameOrder = function (arr1, arr2) {
        var returnValue = true;
        if (arr1.length === arr2.length) {
            for (var i = 0; i < arr1.length; i++) {
                if (arr1[i].id !== arr2[i].id) {
                    returnValue = false;
                    break;
                }
            }
        }
        else {
            returnValue = false;
        }
        return returnValue;
    };
    DataStoreService.prototype.alignObjects = function (items, alignment) {
        var boundingBoxes = [];
        for (var _i = 0, items_6 = items; _i < items_6.length; _i++) {
            var i = items_6[_i];
            boundingBoxes.push({
                item: i,
                bounds: this._objectHelperService.getBoundingBox([i])
            });
        }
        var changes = [];
        switch (alignment) {
            case 0:
                {
                    var left = Math.min.apply(Math, boundingBoxes.map(function (b) { return b.bounds.x; }));
                    for (var _a = 0, boundingBoxes_1 = boundingBoxes; _a < boundingBoxes_1.length; _a++) {
                        var o = boundingBoxes_1[_a];
                        o.newBounds = Object.assign({}, o.bounds, { x: left });
                    }
                }
                break;
            case 1:
                {
                    var left = Math.min.apply(Math, boundingBoxes.map(function (b) { return b.bounds.x; }));
                    var right = Math.max.apply(Math, boundingBoxes.map(function (b) { return b.bounds.x + b.bounds.width; }));
                    var middle = (left + right) / 2;
                    for (var _b = 0, boundingBoxes_2 = boundingBoxes; _b < boundingBoxes_2.length; _b++) {
                        var o = boundingBoxes_2[_b];
                        o.newBounds = Object.assign({}, o.bounds, { x: middle - o.bounds.width / 2 });
                    }
                }
                break;
            case 2:
                {
                    var right = Math.max.apply(Math, boundingBoxes.map(function (b) { return b.bounds.x + b.bounds.width; }));
                    for (var _c = 0, boundingBoxes_3 = boundingBoxes; _c < boundingBoxes_3.length; _c++) {
                        var o = boundingBoxes_3[_c];
                        o.newBounds = Object.assign({}, o.bounds, { x: right - o.bounds.width });
                    }
                }
                break;
            case 3:
                {
                    var top_1 = Math.min.apply(Math, boundingBoxes.map(function (b) { return b.bounds.y; }));
                    for (var _d = 0, boundingBoxes_4 = boundingBoxes; _d < boundingBoxes_4.length; _d++) {
                        var o = boundingBoxes_4[_d];
                        o.newBounds = Object.assign({}, o.bounds, { y: top_1 });
                    }
                }
                break;
            case 4:
                {
                    var top_2 = Math.min.apply(Math, boundingBoxes.map(function (b) { return b.bounds.y; }));
                    var bottom = Math.max.apply(Math, boundingBoxes.map(function (b) { return b.bounds.y + b.bounds.height; }));
                    var middle = (top_2 + bottom) / 2;
                    for (var _e = 0, boundingBoxes_5 = boundingBoxes; _e < boundingBoxes_5.length; _e++) {
                        var o = boundingBoxes_5[_e];
                        o.newBounds = Object.assign({}, o.bounds, { y: middle - o.bounds.height / 2 });
                    }
                }
                break;
            case 5:
                {
                    var bottom = Math.max.apply(Math, boundingBoxes.map(function (b) { return b.bounds.y + b.bounds.height; }));
                    for (var _f = 0, boundingBoxes_6 = boundingBoxes; _f < boundingBoxes_6.length; _f++) {
                        var o = boundingBoxes_6[_f];
                        o.newBounds = Object.assign({}, o.bounds, { y: bottom - o.bounds.height });
                    }
                }
                break;
        }
        for (var _g = 0, boundingBoxes_7 = boundingBoxes; _g < boundingBoxes_7.length; _g++) {
            var o = boundingBoxes_7[_g];
            changes.push({
                id: o.item.id,
                changes: this._changeService.getBoundsChanges(o.item, o.newBounds, o.bounds)
            });
        }
        var newBounds = this._objectHelperService.getBoundingBoxForBounds(boundingBoxes.map(function (x) { return x.newBounds; }));
        this._ngRedux.dispatch({
            type: actions_1.CHANGE_OBJECTS_PROPERTIES,
            changes: changes
        });
        this.resetSelection();
        this._duplicateOffset = 1;
    };
    DataStoreService.prototype.resetSelection = function () {
        var newArray = [];
        var _loop_2 = function (o) {
            newArray.push(this_2.elements.find(function (t) { return t.id === o.id; }));
        };
        var this_2 = this;
        for (var _i = 0, _a = this.selectedObjects; _i < _a.length; _i++) {
            var o = _a[_i];
            _loop_2(o);
        }
        this._ngRedux.dispatch({
            type: actions_1.SELECT_OBJECTS,
            items: newArray,
            selectedBounds: this._objectHelperService.getBoundingBox(newArray)
        });
        this.selectedBoundsChanged.emit(this.selectedBounds);
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