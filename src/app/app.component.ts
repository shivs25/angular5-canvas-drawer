import { Component, OnInit } from '@angular/core';

import { DrEllipse } from './drawer/models/dr-ellipse';
import { DrObject, DEFAULT_OBJECT } from './drawer/models/dr-object';
import { DrRect, DEFAULT_RECT, createDrRect } from './drawer/models/dr-rect';
import { DrPolygon } from './drawer/models/dr-polygon';
import { DrPoint } from './drawer/models/dr-point';
import { DrText } from './drawer/models/dr-text';
import { DrTextAlignment, DrImage, DrType, DrawerObjectHelperService } from './drawer/drawer-library.module';


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
  viewWidth: string = "1000";


  constructor(private drawerObjHelper: DrawerObjectHelperService) {
  }

  ngOnInit() {
    /*let r = this._renderer.createElement('rect', 'svg',);
    this._renderer.setAttribute(r, 'x', '0');
    this._renderer.setAttribute(r, 'y', '0');
    this._renderer.setAttribute(r, 'width', '100');
    this._renderer.setAttribute(r, 'height', '100');

    this._renderer.appendChild(this.container.nativeElement, r);*/

    let elements = [];

    let r: DrRect = createDrRect({
      id: 1,
      x: 10,
      y: 10,
      width: 40,
      height: 40,
      stroke: 'red',
      fill: 'yellow',
      strokeWidth: 3,
      drType: DrType.RECTANGLE
    });
    elements.push(r);

    
    this.elements = elements;
  }

  testService(evt: DrObject){
    console.log(evt);
    console.log(this.drawerObjHelper.getBoundingBox([evt]));
  }
}