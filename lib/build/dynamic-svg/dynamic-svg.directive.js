"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dr_object_1 = require("../models/dr-object");
var dr_rect_1 = require("../models/dr-rect");
var dr_ellipse_1 = require("../models/dr-ellipse");
var dr_rect_component_1 = require("../elements/dr-rect/dr-rect.component");
var dr_ellipse_component_1 = require("../elements/dr-ellipse/dr-ellipse.component");
var dr_polygon_1 = require("../models/dr-polygon");
var dr_polygon_component_1 = require("../elements/dr-polygon/dr-polygon.component");
var DynamicSvgDirective = (function () {
    function DynamicSvgDirective(_viewContainerRef, _resolver) {
        this._viewContainerRef = _viewContainerRef;
        this._resolver = _resolver;
        this._currentComponent = null;
        this.click = new core_1.EventEmitter();
    }
    DynamicSvgDirective.prototype.ngOnInit = function () {
    };
    Object.defineProperty(DynamicSvgDirective.prototype, "componentData", {
        set: function (data) {
            var _this = this;
            if (!data || data.id === this._currentId) {
                return;
            }
            // We create an injector out of the data we want to pass down and this components injector
            var injector = core_1.ReflectiveInjector.fromResolvedProviders([], this._viewContainerRef.parentInjector);
            // We create a factory out of the component we want to create
            var factory = this._resolver.resolveComponentFactory(this.buildComponent(data));
            // We create the component using the factory and the injector
            var component = factory.create(injector);
            // We insert the component into the dom container
            var c = component.instance;
            c.data = data;
            c.click.subscribe(function (s) {
                _this.click.emit(s);
            });
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
        var returnValue = null;
        if (data instanceof dr_rect_1.DrRect) {
            returnValue = dr_rect_component_1.DrRectComponent;
        }
        else if (data instanceof dr_ellipse_1.DrEllipse) {
            returnValue = dr_ellipse_component_1.DrEllipseComponent;
        }
        else if (data instanceof dr_polygon_1.DrPolygon) {
            returnValue = dr_polygon_component_1.DrPolygonComponent;
        }
        return returnValue;
    };
    DynamicSvgDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[dynamic-svg]'
                },] },
    ];
    /** @nocollapse */
    DynamicSvgDirective.ctorParameters = function () { return [
        { type: core_1.ViewContainerRef, },
        { type: core_1.ComponentFactoryResolver, },
    ]; };
    DynamicSvgDirective.propDecorators = {
        "click": [{ type: core_1.Output },],
        "componentData": [{ type: core_1.Input },],
    };
    return DynamicSvgDirective;
}());
exports.DynamicSvgDirective = DynamicSvgDirective;
//# sourceMappingURL=dynamic-svg.directive.js.map