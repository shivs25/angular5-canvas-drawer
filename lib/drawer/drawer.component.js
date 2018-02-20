"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dr_ellipse_1 = require("../models/dr-ellipse");
var dr_rect_1 = require("../models/dr-rect");
var dr_polygon_1 = require("../models/dr-polygon");
var point_1 = require("../models/point");
var DrawerComponent = /** @class */ (function () {
    function DrawerComponent(_componentFactoryResolver) {
        this._componentFactoryResolver = _componentFactoryResolver;
        this.elements = null;
    }
    DrawerComponent.prototype.ngOnInit = function () {
        /*let r = this._renderer.createElement('rect', 'svg',);
            this._renderer.setAttribute(r, 'x', '0');
            this._renderer.setAttribute(r, 'y', '0');
            this._renderer.setAttribute(r, 'width', '100');
            this._renderer.setAttribute(r, 'height', '100');
        
            this._renderer.appendChild(this.container.nativeElement, r);*/
        var elements = [];
        var r = new dr_rect_1.DrRect();
        r.id = 1;
        r.x = 10;
        r.y = 10;
        r.width = 40;
        r.height = 40;
        r.stroke = "red";
        r.fill = "yellow";
        r.strokeWidth = 3;
        r.clickable = false;
        elements.push(r);
        r = new dr_rect_1.DrRect();
        r.id = 2;
        r.x = 90;
        r.y = 90;
        r.width = 5;
        r.height = 5;
        r.stroke = "black";
        r.fill = "blue";
        r.strokeWidth = 1;
        r.clickable = true;
        elements.push(r);
        var c = new dr_ellipse_1.DrEllipse();
        c.id = 3;
        c.x = 200;
        c.y = 200;
        c.rx = 25;
        c.ry = 50;
        c.fill = 'blue';
        c.clickable = true;
        elements.push(c);
        c = new dr_ellipse_1.DrEllipse();
        c.id = 4;
        c.x = 240;
        c.y = 200;
        c.rx = 100;
        c.ry = 50;
        c.opacity = 0.4;
        c.clickable = true;
        elements.push(c);
        var p = new dr_polygon_1.DrPolygon();
        p.id = 5;
        var pts = [];
        var pt;
        pt = new point_1.Point();
        pt.x = 100;
        pt.y = 100;
        pts.push(pt);
        pt = new point_1.Point();
        pt.x = 200;
        pt.y = 100;
        pts.push(pt);
        pt = new point_1.Point();
        pt.x = 300;
        pt.y = 200;
        pts.push(pt);
        pt = new point_1.Point();
        pt.x = 350;
        pt.y = 300;
        pts.push(pt);
        p.points = pts;
        p.strokeWidth = 3;
        p.clickable = true;
        p.fill = "red";
        p.opacity = 0.8;
        elements.push(p);
        this.elements = elements;
    };
    DrawerComponent.prototype.onRectClick = function () {
        console.log("CLICK");
    };
    DrawerComponent.prototype.onClick = function (data) {
        console.log(data);
    };
    DrawerComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'app-drawer',
                    template: "\n\n    <svg #container xmlns=\"http://www.w3.org/2000/svg\" width=\"400\" height=\"400\" viewBox=\"0 0 400 400\">\n      <ng-container *ngFor=\"let s of elements\">\n        <ng-container dynamic-svg [componentData]=\"s\" (click)=\"onClick($event)\"></ng-container>\n      </ng-container>\n    </svg>\n  ",
                    styles: ["\n\n  "]
                },] },
    ];
    /** @nocollapse */
    DrawerComponent.ctorParameters = function () { return [
        { type: core_1.ComponentFactoryResolver, },
    ]; };
    DrawerComponent.propDecorators = {
        "container": [{ type: core_1.ViewChild, args: ['container',] },],
    };
    return DrawerComponent;
}());
exports.DrawerComponent = DrawerComponent;
//# sourceMappingURL=drawer.component.js.map