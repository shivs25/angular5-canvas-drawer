import { Component, OnInit } from '@angular/core';

import { DrEllipse, createDrEllipse } from './drawer/models/dr-ellipse';
import { DrObject, DEFAULT_OBJECT } from './drawer/models/dr-object';
import { DrRect, DEFAULT_RECT, createDrRect } from './drawer/models/dr-rect';
import { DrPolygon, createDrPolygon } from './drawer/models/dr-polygon';
import { DrPoint } from './drawer/models/dr-point';
import { DrText, createDrText } from './drawer/models/dr-text';
import { DrTextAlignment, DrImage, DrType, DrawerObjectHelperService, EditorToolType } from './drawer/drawer-library.module';
import { DataStoreService } from './drawer/services/data-store.service';
import { DEFAULT_STYLE } from './drawer/models/dr-style';
import { createDrTextStyle } from './drawer/models/dr-text-style';
import { select } from '@angular-redux/store';

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

  @select() elementState;


  constructor(private drawerObjHelper: DrawerObjectHelperService, private dataStoreService: DataStoreService) {
  }

  selector(): void {
    this.dataStoreService.selectedTool = EditorToolType.SELECTOR_TOOL;
  }

  ellipse(): void {
    this.dataStoreService.selectedTool = EditorToolType.ELLIPSE_TOOL;
  }

  rectangle(): void {
    this.dataStoreService.selectedTool = EditorToolType.RECTANGLE_TOOL;
  }

  image(): void {
    this.dataStoreService.selectedTool = EditorToolType.IMAGE_TOOL;
  }

  text(): void {
    this.dataStoreService.selectedTool = EditorToolType.TEXT_TOOL;
  }

  

  undo(): void {
    this.dataStoreService.undo();
  }

  redo(): void {
    this.dataStoreService.redo();
  }

  up(): void {
    if (this.dataStoreService.selectedObjects.length > 0) {
      this.dataStoreService.moveObjectUp(this.dataStoreService.selectedObjects[0]);
    }
  }

  down(): void {
    if (this.dataStoreService.selectedObjects.length > 0) {
      this.dataStoreService.moveObjectDown(this.dataStoreService.selectedObjects[0]);
    }
  }

  ngOnInit() {
    let elements = [];

    

    let t: DrRect = createDrRect({
      id: 2,
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      strokeWidth: 5,
      showFill: false
    });

    let text: DrText = createDrText({
      x: 0, 
      y: 0,
      width: 200,
      height: 100,
      vAlignment: DrTextAlignment.CENTER,
      hAlignment:  DrTextAlignment.CENTER, 
      text: "Boom SHAKA-laka",
      id: 6
    });
    elements.push(text);
    
    let e: DrEllipse = createDrEllipse({
      id: 4,
      x: 400,
      y: 400,
      rx: 100,
      ry: 50,
      showFill: true,
      fill: 'rgba(0,0,255,0.5)',
      stroke: 'black',
      strokeWidth: 3
    });
    elements.push(e);
    let t2: DrRect = createDrRect({
      id: 3,
      x: 100,
      y: 100,
      width: 200,
      height: 200,
      strokeWidth: 5,
      showFill: false,
      clickable: false
    });
    elements.push(t2);
    elements.push(t);
    let r: DrPolygon = createDrPolygon({
      id: 1,
      stroke: 'green',
      fill: 'white',
      showFill: false,
      strokeWidth: 3,
      points: [
        { x: 110, y: 100 },
        { x: 210, y: 100 },
        { x: 160, y: 200 }
      ]
    });
    elements.push(r);

    this.elements = [];

    this.dataStoreService.selectedTool = EditorToolType.SELECTOR_TOOL;


    

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