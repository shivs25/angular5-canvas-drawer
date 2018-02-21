import { Component, OnInit } from '@angular/core';

import { DrEllipse } from './drawer/models/dr-ellipse';
import { DrObject } from './drawer/models/dr-object';
import { DrRect } from './drawer/models/dr-rect';
import { DrPolygon } from './drawer/models/dr-polygon';
import { Point } from './drawer/models/point';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  elements:DrObject[] = null;

  ngOnInit() {
    /*let r = this._renderer.createElement('rect', 'svg',);
    this._renderer.setAttribute(r, 'x', '0');
    this._renderer.setAttribute(r, 'y', '0');
    this._renderer.setAttribute(r, 'width', '100');
    this._renderer.setAttribute(r, 'height', '100');

    this._renderer.appendChild(this.container.nativeElement, r);*/

    let elements = [];

    let r: DrRect = new DrRect();
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

    r = new DrRect();
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

    let c = new DrEllipse();
    c.id = 3;
    c.x = 200;
    c.y = 200;
    c.rx = 25;
    c.ry = 50;
    c.fill = 'blue';
    c.clickable = true;

    elements.push(c);


    c = new DrEllipse();
    c.id = 4;
    c.x = 240;
    c.y = 200;
    c.rx = 100;
    c.ry = 50;
    c.opacity = 0.4
    
    c.clickable = true;

    elements.push(c);

    let p: DrPolygon = new DrPolygon();
    p.id = 5;
    let pts: Point[] = [];
    let pt: Point;
    pt = new Point();
    pt.x = 100;
    pt.y = 100;
    pts.push(pt);

    pt = new Point();
    pt.x = 200;
    pt.y = 100;
    pts.push(pt);

    pt = new Point();
    pt.x = 300;
    pt.y = 200;
    pts.push(pt);

    pt = new Point();
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
  }
}