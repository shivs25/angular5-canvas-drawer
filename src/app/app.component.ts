import { Component, OnInit } from '@angular/core';

import { DrEllipse } from './drawer/models/dr-ellipse';
import { DrObject } from './drawer/models/dr-object';
import { DrRect } from './drawer/models/dr-rect';
import { DrPolygon } from './drawer/models/dr-polygon';
import { DrPoint } from './drawer/models/dr-point';
import { DrText } from './drawer/models/dr-text';
import { DrTextAlignment, DrImage } from './drawer/drawer/drawer.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  elements:DrObject[] = null;
  width: string = "100%";
  height: string = "100%";
  viewTop: string = "0";
  viewLeft: string = "0";
  viewHeight: string = "560";
  viewWidth: string = "1000"
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

    let t = new DrText();
    t.id = 10;
    t.x = 0;
    t.y = 10;
    t.width = 100;
    t.height = 40;
    t.stroke = 'purple';
    t.strokeWidth = 1;
    t.size = 16;
    t.text = 'I Love You';
    t.fill = 'transparent';
    t.fontColor = 'red';
    t.fontFamily = 'Courier';
    t.italic = false;
    t.bold = true;
    t.clickable = true;
    t.hAlignment = DrTextAlignment.CENTER;
    t.vAlignment = DrTextAlignment.CENTER;
    elements.push(t);
    
    let i = new DrImage();
    i.id = 100;
    i.x = 10;
    i.y = 10;
    i.width = 320;
    i.height = 213;
    i.strokeWidth = 5;
    i.stroke="green";
    i.clickable = true;
    i.opacity = 0.7;
    i.url = 'https://static.pexels.com/photos/34676/pexels-photo.jpg';
    elements.push(i);

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
    let pts: DrPoint[] = [];
    let pt: DrPoint;
    pt = new DrPoint();
    pt.x = 100;
    pt.y = 100;
    pts.push(pt);

    pt = new DrPoint();
    pt.x = 200;
    pt.y = 100;
    pts.push(pt);

    pt = new DrPoint();
    pt.x = 300;
    pt.y = 200;
    pts.push(pt);

    pt = new DrPoint();
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