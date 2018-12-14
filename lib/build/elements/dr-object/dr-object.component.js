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
var drawer_object_helper_service_1 = require("../../services/drawer-object-helper.service");
var DrObjectComponent = /** @class */ (function () {
    function DrObjectComponent(_objectHelperService) {
        this._objectHelperService = _objectHelperService;
        this.overrideProperties = null;
        this.hoverClass = 'pointer';
        this.canInteract = true;
        this.click = new core_1.EventEmitter();
        this.mouseDown = new core_1.EventEmitter();
        this.mouseMove = new core_1.EventEmitter();
        this.mouseUp = new core_1.EventEmitter();
    }
    DrObjectComponent.prototype.getRotationCenterX = function () {
        var b = this._objectHelperService.getBoundingBox([this.data]);
        return b.x + b.width / 2;
    };
    DrObjectComponent.prototype.getRotationCenterY = function () {
        var b = this._objectHelperService.getBoundingBox([this.data]);
        return b.y + b.height / 2;
    };
    DrObjectComponent.prototype.onClick = function (evt, data) {
        evt.stopPropagation();
        evt.preventDefault();
        this.click.emit(data);
    };
    DrObjectComponent.prototype.onMouseDown = function (evt, data) {
        evt.stopPropagation();
        evt.preventDefault();
        this.mouseDown.emit({
            location: {
                x: evt.clientX, y: evt.clientY
            },
            data: data,
            shiftKey: evt.shiftKey,
            ctrlKey: evt.ctrlKey,
            altKey: evt.altKey
        });
    };
    DrObjectComponent.prototype.onMouseMove = function (evt, data) {
        evt.stopPropagation();
        evt.preventDefault();
        this.mouseMove.emit({
            location: {
                x: evt.clientX, y: evt.clientY
            },
            data: data,
            shiftKey: evt.shiftKey,
            ctrlKey: evt.ctrlKey,
            altKey: evt.altKey
        });
    };
    DrObjectComponent.prototype.onMouseUp = function (evt, data) {
        evt.stopPropagation();
        evt.preventDefault();
        this.mouseUp.emit({
            location: {
                x: evt.clientX, y: evt.clientY
            },
            data: data,
            shiftKey: evt.shiftKey,
            ctrlKey: evt.ctrlKey,
            altKey: evt.altKey
        });
    };
    DrObjectComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.ViewChild('elementTemplate'),
        __metadata("design:type", core_1.TemplateRef)
    ], DrObjectComponent.prototype, "elementTemplate", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DrObjectComponent.prototype, "data", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DrObjectComponent.prototype, "overrideProperties", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DrObjectComponent.prototype, "hoverClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DrObjectComponent.prototype, "canInteract", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DrObjectComponent.prototype, "elementId", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DrObjectComponent.prototype, "click", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DrObjectComponent.prototype, "mouseDown", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DrObjectComponent.prototype, "mouseMove", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DrObjectComponent.prototype, "mouseUp", void 0);
    DrObjectComponent = __decorate([
        core_1.Component({
            selector: 'app-dr-object',
            template: "\n    <p>\n      dr-object works!\n    </p>\n  ",
            styles: ["\n\n  "]
        }),
        __metadata("design:paramtypes", [drawer_object_helper_service_1.DrawerObjectHelperService])
    ], DrObjectComponent);
    return DrObjectComponent;
}());
exports.DrObjectComponent = DrObjectComponent;
//# sourceMappingURL=dr-object.component.js.map