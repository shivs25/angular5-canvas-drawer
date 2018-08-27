"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dr_rect_component_1 = require("../elements/dr-rect/dr-rect.component");
var dr_ellipse_component_1 = require("../elements/dr-ellipse/dr-ellipse.component");
var dr_polygon_component_1 = require("../elements/dr-polygon/dr-polygon.component");
var dr_text_component_1 = require("../elements/dr-text/dr-text.component");
var dr_image_component_1 = require("../elements/dr-image/dr-image.component");
var dr_type_enum_1 = require("../models/dr-type.enum");
var dr_grouped_object_component_1 = require("../elements/dr-grouped-object/dr-grouped-object.component");
var dr_callout_component_1 = require("../elements/dr-callout/dr-callout.component");
var custom_component_resolver_service_1 = require("../services/custom-component-resolver.service");
var DynamicSvgDirective = /** @class */ (function () {
    function DynamicSvgDirective(_viewContainerRef, _resolver, _customComponentResolver) {
        this._viewContainerRef = _viewContainerRef;
        this._resolver = _resolver;
        this._customComponentResolver = _customComponentResolver;
        this._currentComponent = null;
        this.allowCustomComponents = true;
        this.hoverClass = 'pointer';
        this.canInteract = true;
        this.click = new core_1.EventEmitter();
        this.mouseDown = new core_1.EventEmitter();
        this.mouseMove = new core_1.EventEmitter();
        this.mouseUp = new core_1.EventEmitter();
    }
    DynamicSvgDirective.prototype.ngOnInit = function () {
    };
    Object.defineProperty(DynamicSvgDirective.prototype, "currentComponent", {
        get: function () {
            return this._currentComponent ? this._currentComponent.instance : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DynamicSvgDirective.prototype, "componentData", {
        set: function (data) {
            /*if (!data || data.id === this._currentId) {
                return;
            }*/
            var _this = this;
            //Cant get this to work
            /*let providers = [
              { provide: 'visualData', useValue: Object.assign({}, data, this.overrideProperties ? this.overrideProperties : {}) },
              { provide: 'data', useValue: data },
              { provide: 'hoverClass', useValue: this.hoverClass },
              { provide: 'canInteract', useValue: this.canInteract },
              { provide: 'elementId', useValue: this.elementId }
            ];*/
            var injector = core_1.Injector.create([], this._viewContainerRef.parentInjector);
            // We create an injector out of the data we want to pass down and this components injector
            //let injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this._viewContainerRef.parentInjector);
            // We create a factory out of the component we want to create
            var factory = this._resolver.resolveComponentFactory(this.buildComponent(data));
            // We create the component using the factory and the injector
            var component = factory.create(injector);
            // We insert the component into the dom container
            var c = component.instance;
            c.visualData = Object.assign({}, data, this.overrideProperties ? this.overrideProperties : {});
            c.data = data;
            c.overrideProperties = this.overrideProperties;
            c.hoverClass = this.hoverClass;
            c.canInteract = this.canInteract;
            c.elementId = this.elementId;
            c.click.subscribe(function (s) {
                _this.click.emit(s);
            });
            c.mouseDown.subscribe(function (s) {
                _this.mouseDown.emit(s);
            });
            c.mouseMove.subscribe(function (s) {
                _this.mouseMove.emit(s);
            });
            c.mouseUp.subscribe(function (s) {
                _this.mouseUp.emit(s);
            });
            c.ngOnInit();
            this._viewContainerRef.clear();
            this._viewContainerRef.createEmbeddedView(c.elementTemplate);
            // We can destroy the old component is we like by calling destroy
            if (this._currentComponent) {
                this._currentComponent.destroy();
            }
            this._currentId = data.id;
            this._currentComponent = component;
        },
        enumerable: true,
        configurable: true
    });
    DynamicSvgDirective.prototype.buildComponent = function (data) {
        if (!this.allowCustomComponents || null === data.customType || 0 === data.customType.length) {
            switch (data.drType) {
                case dr_type_enum_1.DrType.TEXT:
                    return dr_text_component_1.DrTextComponent;
                case dr_type_enum_1.DrType.IMAGE:
                    return dr_image_component_1.DrImageComponent;
                case dr_type_enum_1.DrType.ELLIPSE:
                    return dr_ellipse_component_1.DrEllipseComponent;
                case dr_type_enum_1.DrType.POLYGON:
                    return dr_polygon_component_1.DrPolygonComponent;
                case dr_type_enum_1.DrType.RECTANGLE:
                    return dr_rect_component_1.DrRectComponent;
                case dr_type_enum_1.DrType.CALLOUT:
                    return dr_callout_component_1.DrCalloutComponent;
                case dr_type_enum_1.DrType.GROUPED_OBJECT:
                    return dr_grouped_object_component_1.DrGroupedObjectComponent;
            }
        }
        else {
            return this._customComponentResolver.buildComponent(data);
        }
        return null;
    };
    DynamicSvgDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[dynamic-svg]'
                },] },
    ];
    /** @nocollapse */
    DynamicSvgDirective.ctorParameters = function () { return [
        { type: core_1.ViewContainerRef },
        { type: core_1.ComponentFactoryResolver },
        { type: custom_component_resolver_service_1.CustomComponentResolverService }
    ]; };
    DynamicSvgDirective.propDecorators = {
        allowCustomComponents: [{ type: core_1.Input }],
        hoverClass: [{ type: core_1.Input }],
        overrideProperties: [{ type: core_1.Input }],
        elementId: [{ type: core_1.Input }],
        canInteract: [{ type: core_1.Input }],
        click: [{ type: core_1.Output }],
        mouseDown: [{ type: core_1.Output }],
        mouseMove: [{ type: core_1.Output }],
        mouseUp: [{ type: core_1.Output }],
        componentData: [{ type: core_1.Input }]
    };
    return DynamicSvgDirective;
}());
exports.DynamicSvgDirective = DynamicSvgDirective;
//# sourceMappingURL=dynamic-svg.directive.js.map