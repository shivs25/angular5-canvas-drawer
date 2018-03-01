import { Component, OnInit } from '@angular/core';

import { DrEllipse, createDrEllipse } from './drawer/models/dr-ellipse';
import { DrObject, DEFAULT_OBJECT } from './drawer/models/dr-object';
import { DrRect, DEFAULT_RECT, createDrRect } from './drawer/models/dr-rect';
import { DrPolygon, createDrPolygon } from './drawer/models/dr-polygon';
import { DrPoint } from './drawer/models/dr-point';
import { DrText, createDrText } from './drawer/models/dr-text';
import { DrTextAlignment, DrImage, DrType, DrawerObjectHelperService } from './drawer/drawer-library.module';
import { DataStoreService } from './drawer/services/data-store.service';


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


  constructor(private drawerObjHelper: DrawerObjectHelperService, private dataStoreService: DataStoreService) {
  }

  ngOnInit() {
    let elements = [];

    let r: DrPolygon = createDrPolygon({
      id: 1,
      stroke: 'red',
      fill: 'white',
      showFill: false,
      strokeWidth: 3,
      points: [
        { x: 100, y: 100 },
        { x: 200, y: 100 },
        { x: 150, y: 200 }
      ]
    });
    elements.push(r);

    let t: DrRect = createDrRect({
      id: 2,
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      strokeWidth: 5,
      showFill: false
    });
    elements.push(t);

    let t2: DrRect = createDrRect({
      id: 3,
      x: 100,
      y: 100,
      width: 200,
      height: 200,
      strokeWidth: 5,
      showFill: false
    });
    elements.push(t2);

    this.elements = elements;

    /*let r = this._renderer.createElement('rect', 'svg',);
    this._renderer.setAttribute(r, 'x', '0');
    this._renderer.setAttribute(r, 'y', '0');
    this._renderer.setAttribute(r, 'width', '100');
    this._renderer.setAttribute(r, 'height', '100');

    this._renderer.appendChild(this.container.nativeElement, r);*/

    /*let elements = [];

    let r: DrText = createDrText({
      id: 1,
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      text: "Billy",
      stroke: 'red',
      fill: 'white',
      showFill: false,
      strokeWidth: 3,
      vAlignment: DrTextAlignment.CENTER
    });

    let t: DrRect = createDrRect({
        x: 200,
        y: 400,
        width: 200,
        height: 200,
        fill: 'Yellow',
        id: 2
    });
    elements.push(t);
    elements.push(r);

    this.elements = elements;

    setTimeout(() => {
      this.dataStoreService.moveObject(r, { 
        x: 200,
        y: 400,
        width: 200,
        height: 200
       });

     }, 5000);

     setTimeout(() => {
      this.dataStoreService.undo();
     }, 10000);

     setTimeout(() => {
      this.dataStoreService.redo();
     }, 12000);*/

     setTimeout(() => {
      this.dataStoreService.moveObject(r, { 
        x: 100,
        y: 100,
        width: 200,
        height: 200
       });

     }, 2000);

     /*setTimeout(() => {
      this.dataStoreService.undo();
     }, 4000);*/
/*
     setTimeout(() => {
      this.dataStoreService.undo();
     }, 6000);
     setTimeout(() => {
      this.dataStoreService.redo();

      let t: DrText = this.dataStoreService.elements[0] as DrText;
      t.width = 300;
     }, 8000);*/

     
  }

  testService(evt: DrObject){
    console.log(evt);
    console.log(this.drawerObjHelper.getBoundingBox([evt]));
  }
}