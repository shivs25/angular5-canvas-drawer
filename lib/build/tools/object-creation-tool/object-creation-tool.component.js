"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var data_store_service_1 = require("../../services/data-store.service");
var enums_1 = require("../../models/enums");
var dr_rect_1 = require("../../models/dr-rect");
var dr_ellipse_1 = require("../../models/dr-ellipse");
var dr_text_1 = require("../../models/dr-text");
var dr_image_1 = require("../../models/dr-image");
var ObjectCreationToolComponent = (function () {
    function ObjectCreationToolComponent(_dataService) {
        this._dataService = _dataService;
        this.currentObject = null;
        this._mouseDown = false;
        this._mouseDownLocation = null;
    }
    ObjectCreationToolComponent.prototype.ngOnInit = function () {
    };
    ObjectCreationToolComponent.prototype.onBackgroundClick = function (evt) {
    };
    ObjectCreationToolComponent.prototype.onBackgroundMouseDown = function (evt) {
        this._mouseDown = true;
        this._mouseDownLocation = {
            x: evt.offsetX,
            y: evt.offsetY
        };
    };
    ObjectCreationToolComponent.prototype.onBackgroundMouseMove = function (evt) {
        if (this._mouseDown) {
            if (Math.abs(evt.offsetX - this._mouseDownLocation.x) > 2 &&
                Math.abs(evt.offsetY - this._mouseDownLocation.y) > 2) {
                if (null === this.currentObject) {
                    switch (this._dataService.selectedTool) {
                        case enums_1.EditorToolType.IMAGE_TOOL:
                        case enums_1.EditorToolType.TEXT_TOOL:
                        case enums_1.EditorToolType.RECTANGLE_TOOL:
                            this.createRect(evt);
                            break;
                        case enums_1.EditorToolType.ELLIPSE_TOOL:
                            this.createEllipse(evt);
                            break;
                    }
                }
                else {
                    switch (this._dataService.selectedTool) {
                        case enums_1.EditorToolType.IMAGE_TOOL:
                        case enums_1.EditorToolType.TEXT_TOOL:
                        case enums_1.EditorToolType.RECTANGLE_TOOL:
                            Object.assign(this.currentObject, {
                                x: this._mouseDownLocation.x < evt.offsetX ? this._mouseDownLocation.x : evt.offsetX,
                                y: this._mouseDownLocation.y < evt.offsetY ? this._mouseDownLocation.y : evt.offsetY,
                                width: Math.abs(this._mouseDownLocation.x - evt.offsetX),
                                height: Math.abs(this._mouseDownLocation.y - evt.offsetY)
                            });
                            break;
                        case enums_1.EditorToolType.ELLIPSE_TOOL:
                            {
                                var w = Math.abs(this._mouseDownLocation.x - evt.offsetX);
                                var h = Math.abs(this._mouseDownLocation.y - evt.offsetY);
                                Object.assign(this.currentObject, {
                                    x: Math.round((this._mouseDownLocation.x < evt.offsetX ? this._mouseDownLocation.x : evt.offsetX) + w / 2),
                                    y: Math.round((this._mouseDownLocation.y < evt.offsetY ? this._mouseDownLocation.y : evt.offsetY) + h / 2),
                                    rx: Math.round(w / 2),
                                    ry: Math.round(h / 2)
                                });
                            }
                            break;
                    }
                }
            }
            else {
                this.currentObject = null;
            }
        }
    };
    ObjectCreationToolComponent.prototype.onBackgroundMouseUp = function (evt) {
        if (this._mouseDown) {
            if (null !== this.currentObject) {
                var objectToAdd = null;
                switch (this._dataService.selectedTool) {
                    case enums_1.EditorToolType.IMAGE_TOOL:
                    case enums_1.EditorToolType.TEXT_TOOL:
                    case enums_1.EditorToolType.RECTANGLE_TOOL: {
                        Object.assign(this.currentObject, {
                            x: this._mouseDownLocation.x < evt.offsetX ? this._mouseDownLocation.x : evt.offsetX,
                            y: this._mouseDownLocation.y < evt.offsetY ? this._mouseDownLocation.y : evt.offsetY,
                            width: Math.abs(this._mouseDownLocation.x - evt.offsetX),
                            height: Math.abs(this._mouseDownLocation.y - evt.offsetY)
                        });
                        var r = this.currentObject;
                        switch (this._dataService.selectedTool) {
                            case enums_1.EditorToolType.IMAGE_TOOL:
                                {
                                    objectToAdd = dr_image_1.createDrImage({
                                        id: this.getNextId(),
                                        x: r.x,
                                        y: r.y,
                                        width: r.width,
                                        height: r.height
                                    });
                                }
                                break;
                            case enums_1.EditorToolType.TEXT_TOOL:
                                {
                                    objectToAdd = dr_text_1.createDrText({
                                        id: this.getNextId(),
                                        x: r.x,
                                        y: r.y,
                                        width: r.width,
                                        height: r.height
                                    });
                                }
                                break;
                            case enums_1.EditorToolType.RECTANGLE_TOOL:
                                {
                                    objectToAdd = dr_rect_1.createDrRect({
                                        id: this.getNextId(),
                                        x: r.x,
                                        y: r.y,
                                        width: r.width,
                                        height: r.height
                                    });
                                }
                                break;
                        }
                        break;
                    }
                    case enums_1.EditorToolType.ELLIPSE_TOOL:
                        {
                            var w = Math.abs(this._mouseDownLocation.x - evt.offsetX);
                            var h = Math.abs(this._mouseDownLocation.y - evt.offsetY);
                            Object.assign(this.currentObject, {
                                x: Math.round((this._mouseDownLocation.x < evt.offsetX ? this._mouseDownLocation.x : evt.offsetX) + w / 2),
                                y: Math.round((this._mouseDownLocation.y < evt.offsetY ? this._mouseDownLocation.y : evt.offsetY) + h / 2),
                                rx: Math.round(w / 2),
                                ry: Math.round(h / 2)
                            });
                            var r = this.currentObject;
                            objectToAdd = dr_ellipse_1.createDrEllipse({
                                id: this.getNextId(),
                                x: r.x,
                                y: r.y,
                                rx: r.rx,
                                ry: r.ry
                            });
                        }
                        break;
                }
                this._dataService.addObjects([objectToAdd]);
                this._dataService.selectObjects([objectToAdd]);
            }
            this.currentObject = null;
            this._mouseDown = false;
            this._mouseDownLocation = null;
        }
    };
    ObjectCreationToolComponent.prototype.getNextId = function () {
        return 0 === this._dataService.elements.length ? 1 :
            Math.max.apply(Math, this._dataService.elements.map(function (o) { return o.id; })) + 1;
    };
    ObjectCreationToolComponent.prototype.createRect = function (evt) {
        this.currentObject = dr_rect_1.createDrRect({
            id: 1000000,
            showFill: true,
            showStroke: true,
            fill: 'rgba(255,0,0,0.3)',
            stroke: 'red',
            x: this._mouseDownLocation.x < evt.offsetX ? this._mouseDownLocation.x : evt.offsetX,
            y: this._mouseDownLocation.y < evt.offsetY ? this._mouseDownLocation.y : evt.offsetY,
            width: Math.abs(this._mouseDownLocation.x - evt.offsetX),
            height: Math.abs(this._mouseDownLocation.y - evt.offsetY)
        });
    };
    ObjectCreationToolComponent.prototype.createEllipse = function (evt) {
        var w = Math.abs(this._mouseDownLocation.x - evt.offsetX);
        var h = Math.abs(this._mouseDownLocation.y - evt.offsetY);
        this.currentObject = dr_ellipse_1.createDrEllipse({
            id: 1000000,
            showFill: true,
            showStroke: true,
            fill: 'rgba(255,0,0,0.3)',
            stroke: 'red',
            x: Math.round((this._mouseDownLocation.x < evt.offsetX ? this._mouseDownLocation.x : evt.offsetX) + w / 2),
            y: Math.round((this._mouseDownLocation.y < evt.offsetY ? this._mouseDownLocation.y : evt.offsetY) + h / 2),
            rx: Math.round(w / 2),
            ry: Math.round(h / 2)
        });
    };
    ObjectCreationToolComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-object-creation-tool',
                    template: "\n\n    <div class=\"absolute-position fill-parent\">\n    \n        <svg (click)=\"onBackgroundClick($event)\" \n              [ngClass]=\"'crosshair'\"\n              (mousedown)=\"onBackgroundMouseDown($event)\"\n              (mousemove)=\"onBackgroundMouseMove($event)\" \n              (mouseup)=\"onBackgroundMouseUp($event)\"\n              class=\"absolute-position fill-parent\" xmlns=\"http://www.w3.org/2000/svg\">\n            <ng-container *ngIf=\"currentObject\" dynamic-svg [componentData]=\"currentObject\" [canInteract]=\"false\" elementId=\"1000000\">\n            </ng-container>\n        </svg>\n    </div>\n  ",
                    styles: ["\n\n  "]
                },] },
    ];
    /** @nocollapse */
    ObjectCreationToolComponent.ctorParameters = function () { return [
        { type: data_store_service_1.DataStoreService, },
    ]; };
    return ObjectCreationToolComponent;
}());
exports.ObjectCreationToolComponent = ObjectCreationToolComponent;
//# sourceMappingURL=object-creation-tool.component.js.map