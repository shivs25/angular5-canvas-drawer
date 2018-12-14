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
var data_store_service_1 = require("../../services/data-store.service");
var enums_1 = require("../../models/enums");
var dr_rect_1 = require("../../models/dr-rect");
var dr_ellipse_1 = require("../../models/dr-ellipse");
var dr_text_1 = require("../../models/dr-text");
var dr_image_1 = require("../../models/dr-image");
var change_helper_service_1 = require("../../services/change-helper.service");
var drawer_object_helper_service_1 = require("../../services/drawer-object-helper.service");
var dr_polygon_1 = require("../../models/dr-polygon");
var dr_callout_1 = require("../../models/dr-callout");
var ObjectCreationToolComponent = /** @class */ (function () {
    function ObjectCreationToolComponent(_dataService, _changeService, _drawerObjectService) {
        this._dataService = _dataService;
        this._changeService = _changeService;
        this._drawerObjectService = _drawerObjectService;
        this.currentObject = null;
        this._mouseDown = false;
        this._mouseDownLocation = null;
        this._mouseDownClone = null;
        this._mouseDownBounds = null;
        this._modifierKeys = {
            shift: false,
            alt: false,
            control: false
        };
        this._lastEvent = null;
    }
    ObjectCreationToolComponent.prototype.ngOnInit = function () {
    };
    ObjectCreationToolComponent.prototype.onBackgroundClick = function (evt) {
    };
    ObjectCreationToolComponent.prototype.onKeyDown = function (evt) {
        switch (this._dataService.selectedTool) {
            case enums_1.EditorToolType.TRIANGLE_TOOL:
            case enums_1.EditorToolType.ARROW_TOOL:
            case enums_1.EditorToolType.CALLOUT_ROUNDED_TOOL:
            case enums_1.EditorToolType.CALLOUT_SQUARE_TOOL:
            case enums_1.EditorToolType.ELLIPSE_TOOL:
            case enums_1.EditorToolType.IMAGE_TOOL:
            case enums_1.EditorToolType.RECTANGLE_TOOL:
            case enums_1.EditorToolType.ROUNDED_RECTANGLE_TOOL:
            case enums_1.EditorToolType.STAR_TOOL:
                switch (evt.key) {
                    case "Shift":
                    case "Control":
                    case "Alt":
                        this._modifierKeys[evt.key.toLowerCase()] = true;
                        if (this._mouseDown && null !== this._lastEvent) {
                            this.onBackgroundMouseMove(this._lastEvent);
                        }
                        break;
                }
                break;
        }
    };
    ObjectCreationToolComponent.prototype.onKeyUp = function (evt) {
        switch (this._dataService.selectedTool) {
            case enums_1.EditorToolType.TRIANGLE_TOOL:
            case enums_1.EditorToolType.ARROW_TOOL:
            case enums_1.EditorToolType.CALLOUT_ROUNDED_TOOL:
            case enums_1.EditorToolType.CALLOUT_SQUARE_TOOL:
            case enums_1.EditorToolType.ELLIPSE_TOOL:
            case enums_1.EditorToolType.IMAGE_TOOL:
            case enums_1.EditorToolType.RECTANGLE_TOOL:
            case enums_1.EditorToolType.ROUNDED_RECTANGLE_TOOL:
            case enums_1.EditorToolType.STAR_TOOL:
                switch (evt.key) {
                    case "Shift":
                    case "Control":
                    case "Alt":
                        this._modifierKeys[evt.key.toLowerCase()] = false;
                        if (this._mouseDown && null !== this._lastEvent) {
                            this.onBackgroundMouseMove(this._lastEvent);
                        }
                        break;
                    case "Escape":
                        this.currentObject = null;
                        this._mouseDown = false;
                        this._mouseDownLocation = null;
                        break;
                }
                break;
        }
    };
    ObjectCreationToolComponent.prototype.onBackgroundMouseDown = function (evt) {
        this._mouseDown = true;
        this._mouseDownLocation = {
            x: evt.offsetX,
            y: evt.offsetY
        };
    };
    ObjectCreationToolComponent.prototype.onBackgroundMouseMove = function (evt) {
        this._lastEvent = evt;
        if (this._mouseDown) {
            if (Math.abs(evt.offsetX - this._mouseDownLocation.x) > 2 &&
                Math.abs(evt.offsetY - this._mouseDownLocation.y) > 2) {
                if (null === this.currentObject) {
                    switch (this._dataService.selectedTool) {
                        case enums_1.EditorToolType.IMAGE_TOOL:
                            this.createRect(evt, false, "Image");
                            break;
                        case enums_1.EditorToolType.TEXT_TOOL:
                            this.createRect(evt, false, "Text");
                            break;
                        case enums_1.EditorToolType.RECTANGLE_TOOL:
                            this.createRect(evt, false, "Rectangle");
                            break;
                        case enums_1.EditorToolType.ROUNDED_RECTANGLE_TOOL:
                            this.createRect(evt, true, "Rounded Rectangle");
                            break;
                        case enums_1.EditorToolType.ELLIPSE_TOOL:
                            this.createEllipse(evt);
                            break;
                        case enums_1.EditorToolType.STAR_TOOL:
                            this.createStar(evt);
                            this._mouseDownClone = Object.assign({}, this.currentObject);
                            this._mouseDownBounds = this._drawerObjectService.getBoundingBox([this._mouseDownClone]);
                            break;
                        case enums_1.EditorToolType.TRIANGLE_TOOL:
                            this.createTriangle(evt);
                            this._mouseDownClone = Object.assign({}, this.currentObject);
                            this._mouseDownBounds = this._drawerObjectService.getBoundingBox([this._mouseDownClone]);
                            break;
                        case enums_1.EditorToolType.ARROW_TOOL:
                            this.createArrow(evt);
                            this._mouseDownClone = Object.assign({}, this.currentObject);
                            this._mouseDownBounds = this._drawerObjectService.getBoundingBox([this._mouseDownClone]);
                            break;
                        case enums_1.EditorToolType.CALLOUT_SQUARE_TOOL:
                            this.createCallout(evt, false);
                            this._mouseDownClone = Object.assign({}, this.currentObject);
                            this._mouseDownBounds = this._drawerObjectService.getBoundingBox([this._mouseDownClone]);
                            break;
                        case enums_1.EditorToolType.CALLOUT_ROUNDED_TOOL:
                            this.createCallout(evt, true);
                            this._mouseDownClone = Object.assign({}, this.currentObject);
                            this._mouseDownBounds = this._drawerObjectService.getBoundingBox([this._mouseDownClone]);
                            break;
                    }
                }
                else {
                    var w = Math.abs(this._mouseDownLocation.x - evt.offsetX);
                    var h = Math.abs(this._mouseDownLocation.y - evt.offsetY);
                    if (this._modifierKeys.shift) {
                        if (w > h) {
                            h = w;
                        }
                        else {
                            w = h;
                        }
                    }
                    switch (this._dataService.selectedTool) {
                        case enums_1.EditorToolType.IMAGE_TOOL:
                        case enums_1.EditorToolType.TEXT_TOOL:
                        case enums_1.EditorToolType.RECTANGLE_TOOL:
                        case enums_1.EditorToolType.ROUNDED_RECTANGLE_TOOL:
                            Object.assign(this.currentObject, {
                                x: this._mouseDownLocation.x < evt.offsetX ? this._mouseDownLocation.x : this._mouseDownLocation.x - w,
                                y: this._mouseDownLocation.y < evt.offsetY ? this._mouseDownLocation.y : this._mouseDownLocation.y - h,
                                width: w,
                                height: h
                            });
                            break;
                        case enums_1.EditorToolType.ELLIPSE_TOOL:
                            {
                                Object.assign(this.currentObject, {
                                    x: Math.round((this._mouseDownLocation.x < evt.offsetX ? this._mouseDownLocation.x : this._mouseDownLocation.x - w) + w / 2),
                                    y: Math.round((this._mouseDownLocation.y < evt.offsetY ? this._mouseDownLocation.y : this._mouseDownLocation.y - h) + h / 2),
                                    rx: Math.round(w / 2),
                                    ry: Math.round(h / 2)
                                });
                            }
                            break;
                        case enums_1.EditorToolType.TRIANGLE_TOOL:
                        case enums_1.EditorToolType.STAR_TOOL:
                        case enums_1.EditorToolType.ARROW_TOOL:
                        case enums_1.EditorToolType.CALLOUT_SQUARE_TOOL:
                        case enums_1.EditorToolType.CALLOUT_ROUNDED_TOOL:
                            Object.assign(this.currentObject, this._changeService.getBoundsChanges(this._mouseDownClone, {
                                x: this._mouseDownLocation.x < evt.offsetX ? this._mouseDownLocation.x : this._mouseDownLocation.x - w,
                                y: this._mouseDownLocation.y < evt.offsetY ? this._mouseDownLocation.y : this._mouseDownLocation.y - h,
                                width: w,
                                height: h
                            }, this._mouseDownBounds));
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
                var w = Math.abs(this._mouseDownLocation.x - evt.offsetX);
                var h = Math.abs(this._mouseDownLocation.y - evt.offsetY);
                if (this._modifierKeys.shift) {
                    if (w > h) {
                        h = w;
                    }
                    else {
                        w = h;
                    }
                }
                switch (this._dataService.selectedTool) {
                    case enums_1.EditorToolType.IMAGE_TOOL:
                        {
                            var r = this.currentObject;
                            var image = dr_image_1.createDrImage({
                                id: this.getNextId(),
                                name: this._dataService.getUniqueName('Image'),
                                x: r.x,
                                y: r.y,
                                width: r.width,
                                height: r.height
                            });
                            image.name = this.currentObject.name;
                            this._dataService.addTempObjects([image]);
                            this._dataService.selectObjects([image]);
                        }
                        break;
                    case enums_1.EditorToolType.TEXT_TOOL:
                        {
                            var r = this.currentObject;
                            var text = dr_text_1.createDrText({
                                id: this.getNextId(),
                                name: this._dataService.getUniqueName('Text'),
                                x: r.x,
                                y: r.y,
                                width: r.width,
                                height: r.height,
                                hAlignment: enums_1.DrTextAlignment.CENTER
                            });
                            text.name = this.currentObject.name;
                            this._dataService.addTempObjects([text]);
                            this._dataService.selectObjects([text]);
                        }
                        break;
                    case enums_1.EditorToolType.RECTANGLE_TOOL:
                    case enums_1.EditorToolType.ROUNDED_RECTANGLE_TOOL: {
                        Object.assign(this.currentObject, {
                            x: this._mouseDownLocation.x < evt.offsetX ? this._mouseDownLocation.x : this._mouseDownLocation.x - w,
                            y: this._mouseDownLocation.y < evt.offsetY ? this._mouseDownLocation.y : this._mouseDownLocation.y - h,
                            width: w,
                            height: h
                        });
                        var r = this.currentObject;
                        switch (this._dataService.selectedTool) {
                            case enums_1.EditorToolType.RECTANGLE_TOOL:
                            case enums_1.EditorToolType.ROUNDED_RECTANGLE_TOOL:
                                {
                                    objectToAdd = dr_rect_1.createDrRect({
                                        id: this.getNextId(),
                                        x: r.x,
                                        y: r.y,
                                        width: r.width,
                                        height: r.height,
                                        rounded: enums_1.EditorToolType.ROUNDED_RECTANGLE_TOOL === this._dataService.selectedTool
                                    });
                                }
                                break;
                        }
                        break;
                    }
                    case enums_1.EditorToolType.ELLIPSE_TOOL:
                        {
                            Object.assign(this.currentObject, {
                                x: Math.round((this._mouseDownLocation.x < evt.offsetX ? this._mouseDownLocation.x : this._mouseDownLocation.x - w) + w / 2),
                                y: Math.round((this._mouseDownLocation.y < evt.offsetY ? this._mouseDownLocation.y : this._mouseDownLocation.y - h) + h / 2),
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
                    case enums_1.EditorToolType.TRIANGLE_TOOL:
                    case enums_1.EditorToolType.STAR_TOOL:
                    case enums_1.EditorToolType.ARROW_TOOL: {
                        Object.assign(this.currentObject, this._changeService.getBoundsChanges(this._mouseDownClone, {
                            x: this._mouseDownLocation.x < evt.offsetX ? this._mouseDownLocation.x : this._mouseDownLocation.x - w,
                            y: this._mouseDownLocation.y < evt.offsetY ? this._mouseDownLocation.y : this._mouseDownLocation.y - h,
                            width: w,
                            height: h
                        }, this._mouseDownBounds));
                        objectToAdd = dr_polygon_1.createDrPolygon({
                            id: this.getNextId(),
                            points: this.currentObject.points
                        });
                        break;
                    }
                    case enums_1.EditorToolType.CALLOUT_SQUARE_TOOL:
                    case enums_1.EditorToolType.CALLOUT_ROUNDED_TOOL:
                        {
                            var r = this.currentObject;
                            Object.assign(this.currentObject, this._changeService.getBoundsChanges(this._mouseDownClone, {
                                x: this._mouseDownLocation.x < evt.offsetX ? this._mouseDownLocation.x : this._mouseDownLocation.x - w,
                                y: this._mouseDownLocation.y < evt.offsetY ? this._mouseDownLocation.y : this._mouseDownLocation.y - h,
                                width: w,
                                height: h
                            }, this._mouseDownBounds));
                            objectToAdd = dr_callout_1.createDrCallout({
                                id: this.getNextId(),
                                x: r.x,
                                y: r.y,
                                width: r.width,
                                height: r.height,
                                basePoint1: r.basePoint1,
                                basePoint2: r.basePoint2,
                                pointerLocation: r.pointerLocation,
                                rounded: this._dataService.selectedTool === enums_1.EditorToolType.CALLOUT_ROUNDED_TOOL
                            });
                        }
                        break;
                }
                if (null !== objectToAdd) {
                    objectToAdd.name = this.currentObject.name;
                    this._dataService.addObjects([objectToAdd]);
                    this._dataService.selectObjects([objectToAdd]);
                }
            }
            else {
                if (enums_1.EditorToolType.TEXT_TOOL === this._dataService.selectedTool) {
                    var objectToAdd = dr_text_1.createDrText({
                        id: this.getNextId(),
                        name: this._dataService.getUniqueName('Text'),
                        x: this._mouseDownLocation.x,
                        y: this._mouseDownLocation.y,
                        width: 200,
                        height: 100,
                        hAlignment: enums_1.DrTextAlignment.NEAR
                    });
                    this._dataService.addTempObjects([objectToAdd]);
                    this._dataService.selectObjects([objectToAdd]);
                }
            }
            this.currentObject = null;
            this._mouseDown = false;
            this._mouseDownLocation = null;
        }
    };
    ObjectCreationToolComponent.prototype.finalize = function () {
        //Not Implemented
    };
    ObjectCreationToolComponent.prototype.getNextId = function () {
        return 0 === this._dataService.elements.length ? 1 :
            Math.max.apply(Math, this._dataService.elements.map(function (o) { return o.id; })) + 1;
    };
    ObjectCreationToolComponent.prototype.createStar = function (evt) {
        var b = {
            x: this._mouseDownLocation.x < evt.offsetX ? this._mouseDownLocation.x : evt.offsetX,
            y: this._mouseDownLocation.y < evt.offsetY ? this._mouseDownLocation.y : evt.offsetY,
            width: Math.abs(this._mouseDownLocation.x - evt.offsetX),
            height: Math.abs(this._mouseDownLocation.y - evt.offsetY)
        };
        //50,2.4 62.4,37.9 100,38.8 70.1,61.5 80.9,97.6 50,76.1 19.1,97.6 29.9,61.5 0,38.8
        this.currentObject = dr_polygon_1.createDrPolygon({
            id: 1000000,
            name: this._dataService.getUniqueName("Star"),
            showFill: true,
            showStroke: true,
            fill: 'rgba(255,0,0,0.3)',
            stroke: 'red',
            points: [
                { x: b.x + b.width * 0.5, y: b.y },
                { x: b.x + b.width * 0.624, y: b.y + b.height * 0.373 },
                { x: b.x + b.width, y: b.y + b.height * 0.382 },
                { x: b.x + b.width * 0.701, y: b.y + b.height * 0.621 },
                { x: b.x + b.width * 0.809, y: b.y + b.height },
                { x: b.x + b.width * 0.5, y: b.y + b.height * 0.774 },
                { x: b.x + b.width * 0.191, y: b.y + b.height },
                { x: b.x + b.width * 0.299, y: b.y + b.height * 0.621 },
                { x: b.x, y: b.y + b.height * 0.382 },
                { x: b.x + b.width * 0.376, y: b.y + b.height * 0.373 },
            ]
        });
    };
    ObjectCreationToolComponent.prototype.createArrow = function (evt) {
        var b = {
            x: this._mouseDownLocation.x < evt.offsetX ? this._mouseDownLocation.x : evt.offsetX,
            y: this._mouseDownLocation.y < evt.offsetY ? this._mouseDownLocation.y : evt.offsetY,
            width: Math.abs(this._mouseDownLocation.x - evt.offsetX),
            height: Math.abs(this._mouseDownLocation.y - evt.offsetY)
        };
        //52.6,11.2 100,50 52.6,88.8 52.2,68.8 0,68.8 0,31.2 52.6,31.2
        this.currentObject = dr_polygon_1.createDrPolygon({
            id: 1000000,
            name: this._dataService.getUniqueName("Arrow"),
            showFill: true,
            showStroke: true,
            fill: 'rgba(255,0,0,0.3)',
            stroke: 'red',
            points: [
                { x: b.x + b.width * 0.526, y: b.y + b.height * 0.112 },
                { x: b.x + b.width, y: b.y + b.height * 0.5 },
                { x: b.x + b.width * 0.526, y: b.y + b.height * 0.888 },
                { x: b.x + b.width * 0.522, y: b.y + b.height * 0.688 },
                { x: b.x, y: b.y + b.height * 0.688 },
                { x: b.x, y: b.y + b.height * 0.312 },
                { x: b.x + b.width * 0.526, y: b.y + b.height * 0.312 }
            ]
        });
    };
    ObjectCreationToolComponent.prototype.createCallout = function (evt, rounded) {
        //100,8.8 0,8.8 0,68.8 61.9,68.8 61.9,91.2 75.3,68.8 100,68.8
        var b = {
            x: this._mouseDownLocation.x < evt.offsetX ? this._mouseDownLocation.x : evt.offsetX,
            y: this._mouseDownLocation.y < evt.offsetY ? this._mouseDownLocation.y : evt.offsetY,
            width: Math.abs(this._mouseDownLocation.x - evt.offsetX),
            height: Math.abs(this._mouseDownLocation.y - evt.offsetY)
        };
        this.currentObject = dr_callout_1.createDrCallout({
            id: 1000000,
            name: this._dataService.getUniqueName("Callout"),
            showFill: true,
            showStroke: true,
            fill: 'rgba(255,0,0,0.3)',
            stroke: 'red',
            x: b.x,
            y: b.y,
            width: b.width,
            height: b.height * 0.688,
            basePoint1: { x: b.x + b.width / 2 - (b.width * 0.1), y: b.y + (b.height * 0.688) / 2 },
            basePoint2: { x: b.x + b.width / 2 + (b.width * 0.1), y: b.y + (b.height * 0.688) / 2 },
            pointerLocation: { x: b.x + b.width / 2, y: b.y + b.height },
            rounded: rounded
        });
    };
    ObjectCreationToolComponent.prototype.createTriangle = function (evt) {
        var b = {
            x: this._mouseDownLocation.x < evt.offsetX ? this._mouseDownLocation.x : evt.offsetX,
            y: this._mouseDownLocation.y < evt.offsetY ? this._mouseDownLocation.y : evt.offsetY,
            width: Math.abs(this._mouseDownLocation.x - evt.offsetX),
            height: Math.abs(this._mouseDownLocation.y - evt.offsetY)
        };
        this.currentObject = dr_polygon_1.createDrPolygon({
            id: 1000000,
            name: this._dataService.getUniqueName("Triangle"),
            showFill: true,
            showStroke: true,
            fill: 'rgba(255,0,0,0.3)',
            stroke: 'red',
            points: [
                { x: b.x + b.width * 0.5, y: b.y },
                { x: b.x + b.width, y: b.y + b.height },
                { x: b.x, y: b.y + b.height }
            ]
        });
    };
    ObjectCreationToolComponent.prototype.createRect = function (evt, rounded, name) {
        this.currentObject = dr_rect_1.createDrRect({
            id: 1000000,
            name: this._dataService.getUniqueName(name),
            showFill: true,
            showStroke: true,
            fill: 'rgba(255,0,0,0.3)',
            stroke: 'red',
            x: this._mouseDownLocation.x < evt.offsetX ? this._mouseDownLocation.x : evt.offsetX,
            y: this._mouseDownLocation.y < evt.offsetY ? this._mouseDownLocation.y : evt.offsetY,
            width: Math.abs(this._mouseDownLocation.x - evt.offsetX),
            height: Math.abs(this._mouseDownLocation.y - evt.offsetY),
            rounded: rounded
        });
    };
    ObjectCreationToolComponent.prototype.createEllipse = function (evt) {
        var w = Math.abs(this._mouseDownLocation.x - evt.offsetX);
        var h = Math.abs(this._mouseDownLocation.y - evt.offsetY);
        this.currentObject = dr_ellipse_1.createDrEllipse({
            id: 1000000,
            name: this._dataService.getUniqueName("Ellipse"),
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
    __decorate([
        core_1.HostListener('window:keydown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ObjectCreationToolComponent.prototype, "onKeyDown", null);
    __decorate([
        core_1.HostListener('window:keyup', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ObjectCreationToolComponent.prototype, "onKeyUp", null);
    ObjectCreationToolComponent = __decorate([
        core_1.Component({
            selector: 'app-object-creation-tool',
            template: "\n\n    <div class=\"absolute-position fill-parent\">\n    \n        <svg (click)=\"onBackgroundClick($event)\" \n              [ngClass]=\"'crosshair'\"\n              (mousedown)=\"onBackgroundMouseDown($event)\"\n              (mousemove)=\"onBackgroundMouseMove($event)\" \n              (mouseup)=\"onBackgroundMouseUp($event)\"\n              class=\"absolute-position fill-parent\" xmlns=\"http://www.w3.org/2000/svg\">\n            <ng-container *ngIf=\"currentObject\" dynamic-svg [componentData]=\"currentObject\" [canInteract]=\"false\" elementId=\"1000000\">\n            </ng-container>\n        </svg>\n    </div>\n  ",
            styles: ["\n\n  "]
        }),
        __metadata("design:paramtypes", [data_store_service_1.DataStoreService,
            change_helper_service_1.ChangeHelperService,
            drawer_object_helper_service_1.DrawerObjectHelperService])
    ], ObjectCreationToolComponent);
    return ObjectCreationToolComponent;
}());
exports.ObjectCreationToolComponent = ObjectCreationToolComponent;
//# sourceMappingURL=object-creation-tool.component.js.map