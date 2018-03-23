import { Component, OnInit } from '@angular/core';

import { DrEllipse, createDrEllipse } from './drawer/models/dr-ellipse';
import { DrObject, DEFAULT_OBJECT } from './drawer/models/dr-object';
import { DrRect, DEFAULT_RECT, createDrRect } from './drawer/models/dr-rect';
import { DrPolygon, createDrPolygon } from './drawer/models/dr-polygon';
import { DrPoint } from './drawer/models/dr-point';
import { DrText, createDrText } from './drawer/models/dr-text';
import { DrTextAlignment, DrImage, DrType, DrawerObjectHelperService, EditorToolType, createDrImage } from './drawer/drawer-library.module';
import { DataStoreService } from './drawer/services/data-store.service';
import { DEFAULT_STYLE } from './drawer/models/dr-style';
import { createDrTextStyle } from './drawer/models/dr-text-style';
import { select } from '@angular-redux/store';
import { DrGroupedObject, createDrGroupedObject } from './drawer/models/dr-grouped-object';
import { createDrStyle } from '../../build/models/dr-style';
import { BoundingBox, createBoundingBox } from './drawer/models/bounding-box';
import { } from ''
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
  viewBoxItem: BoundingBox = null;
 

  @select() elementState;


  constructor(private drawerObjHelper: DrawerObjectHelperService, private dataStoreService: DataStoreService) {
  }
  
  selector(): void {
    this.dataStoreService.selectedTool = EditorToolType.SELECTOR_TOOL;
  }

  textEdit(): void {
    if (this.dataStoreService.selectedObjects.length > 0 && this.dataStoreService.selectedObjects[0].drType === DrType.TEXT) {
      this.dataStoreService.selectedTool = EditorToolType.TEXT_EDIT_TOOL;
    }
    
  }

  ellipse(): void {
    this.dataStoreService.selectedTool = EditorToolType.ELLIPSE_TOOL;
  }

  rectangle(): void {
    this.dataStoreService.selectedTool = EditorToolType.RECTANGLE_TOOL;
  }

  roundedRectangle(): void {
    this.dataStoreService.selectedTool = EditorToolType.ROUNDED_RECTANGLE_TOOL;
  }

  callout(): void {
    this.dataStoreService.selectedTool = EditorToolType.CALLOUT_SQUARE_TOOL;
  }

  image(): void {
    this.dataStoreService.selectedTool = EditorToolType.IMAGE_TOOL;
  }

  text(): void {
    this.dataStoreService.selectedTool = EditorToolType.TEXT_TOOL;
  }

  triangle(): void {
    this.dataStoreService.selectedTool = EditorToolType.TRIANGLE_TOOL;
  }

  star(): void {
    this.dataStoreService.selectedTool = EditorToolType.STAR_TOOL;
  }

  arrow(): void {
    this.dataStoreService.selectedTool = EditorToolType.ARROW_TOOL;
  }
  
  
  showPreview(): void {
    this.dataStoreService.setPreviewElements(this.dataStoreService.selectedObjects);

  }

  undo(): void {
    this.dataStoreService.undo();
  }

  redo(): void {
    this.dataStoreService.redo();
  }

  setTextStyleNC(): void {
    if (this.dataStoreService.selectedObjects[0].drType === DrType.TEXT) {
      this.dataStoreService.setStyles([this.dataStoreService.selectedObjects[0]], createDrTextStyle({
        vAlignment: DrTextAlignment.CENTER,
        hAlignment: DrTextAlignment.NEAR
      }));
    }
  }

  setTextStyleNF(): void {
    if (this.dataStoreService.selectedObjects[0].drType === DrType.TEXT) {
      this.dataStoreService.setStyles([this.dataStoreService.selectedObjects[0]], createDrTextStyle({
        vAlignment: DrTextAlignment.FAR,
        hAlignment: DrTextAlignment.NEAR
      }));
    }
  }

  setTextStyleCN(): void {
    if (this.dataStoreService.selectedObjects[0].drType === DrType.TEXT) {
      this.dataStoreService.setStyles([this.dataStoreService.selectedObjects[0]], createDrTextStyle({
        vAlignment: DrTextAlignment.NEAR,
        hAlignment: DrTextAlignment.CENTER
      }));
    }
  }

  setTextStyleCC(): void {
    if (this.dataStoreService.selectedObjects[0].drType === DrType.TEXT) {
      this.dataStoreService.setStyles([this.dataStoreService.selectedObjects[0]], createDrTextStyle({
        vAlignment: DrTextAlignment.CENTER,
        hAlignment: DrTextAlignment.CENTER
      }));
    }
  }

  setTextStyleCF(): void {
    if (this.dataStoreService.selectedObjects[0].drType === DrType.TEXT) {
      this.dataStoreService.setStyles([this.dataStoreService.selectedObjects[0]], createDrTextStyle({
        vAlignment: DrTextAlignment.FAR,
        hAlignment: DrTextAlignment.CENTER
      }));
    }
  }

  setTextStyleFN(): void {
    if (this.dataStoreService.selectedObjects[0].drType === DrType.TEXT) {
      this.dataStoreService.setStyles([this.dataStoreService.selectedObjects[0]], createDrTextStyle({
        vAlignment: DrTextAlignment.NEAR,
        hAlignment: DrTextAlignment.FAR
      }));
    }
  }

  setTextStyleFC(): void {
    if (this.dataStoreService.selectedObjects[0].drType === DrType.TEXT) {
      this.dataStoreService.setStyles([this.dataStoreService.selectedObjects[0]], createDrTextStyle({
        vAlignment: DrTextAlignment.CENTER,
        hAlignment: DrTextAlignment.FAR
      }));
    }
  }

  setTextStyleFF(): void {
    if (this.dataStoreService.selectedObjects[0].drType === DrType.TEXT) {
      this.dataStoreService.setStyles([this.dataStoreService.selectedObjects[0]], createDrTextStyle({
        vAlignment: DrTextAlignment.FAR,
        hAlignment: DrTextAlignment.FAR
      }));
    }
  }

  setPreviewStyle(): void {
    this.dataStoreService.setPreviewStyle(createDrStyle({
      fill: 'red',
      stroke: 'purple',
      strokeWidth: 5
    }));
  }

  setBoundingBox(): void {
    if(this.viewBoxItem === null) {
      this.viewBoxItem = createBoundingBox();
      this.viewBoxItem.x = 0;
      this.viewBoxItem.y = 0;
      this.viewBoxItem.height = 200;
      this.viewBoxItem.width = 100;
    } else {
      this.viewBoxItem = null;
    }
  }

  up(): void {
    if (this.dataStoreService.selectedObjects.length > 0) {
      this.dataStoreService.moveObjectsUp(this.dataStoreService.selectedObjects);
    }
  }

  down(): void {
    if (this.dataStoreService.selectedObjects.length > 0) {
      this.dataStoreService.moveObjectsDown(this.dataStoreService.selectedObjects);
    }
  }

  group(): void {
    if (this.dataStoreService.selectedObjects.length > 0) {
      this.dataStoreService.groupObjects(this.dataStoreService.selectedObjects);
    }
  }

  ungroup(): void {
    if (1 === this.dataStoreService.selectedObjects.length && DrType.GROUPED_OBJECT === this.dataStoreService.selectedObjects[0].drType) {
      this.dataStoreService.ungroupObject(this.dataStoreService.selectedObjects[0] as DrGroupedObject);
    }
  }

  remove(): void {
    if (this.dataStoreService.selectedObjects.length > 0) {
      this.dataStoreService.removeObjects(this.dataStoreService.selectedObjects);
    }
  }

  duplicate(): void {
    this.dataStoreService.duplicateObjects(this.dataStoreService.selectedObjects);
  }

  clear(): void {
    this.dataStoreService.clearObjects();
    this.dataStoreService.selectObjects([]);
  }

  alignLeft(): void {
    this.dataStoreService.alignObjectsLeft(this.dataStoreService.selectedObjects);

  }

  alignCenter(): void {
    this.dataStoreService.alignObjectsCenter(this.dataStoreService.selectedObjects);
    
  }

  alignRight(): void {
    this.dataStoreService.alignObjectsRight(this.dataStoreService.selectedObjects);
    
  }

  alignTop(): void {
    this.dataStoreService.alignObjectsTop(this.dataStoreService.selectedObjects);

  }

  alignMiddle(): void {
    this.dataStoreService.alignObjectsMiddle(this.dataStoreService.selectedObjects);
    
  }

  alignBottom(): void {
    this.dataStoreService.alignObjectsBottom(this.dataStoreService.selectedObjects);
    
  }

  imageUrl(): void {
    
    this.dataStoreService.setUrls(this.dataStoreService.selectedObjects, "https://static.pexels.com/photos/175718/pexels-photo-175718.jpeg");
  }

  setStyles(): void {
    this.dataStoreService.setStyles(this.dataStoreService.selectedObjects, {
      showFill: true,
      showStroke: true,
      fill: 'red',
      stroke: 'yellow',
      strokeWidth: 3,
      opacity: 1
    });
  }

  setInvisible(): void {
    this.dataStoreService.setVisibility(this.dataStoreService.selectedObjects, false);
  }

  pen(): void {
    this.dataStoreService.selectedTool = EditorToolType.PEN_TOOL;
  }

  ngOnInit() {
    let elements = [];
    
    this.dataStoreService.objectsAdded.subscribe(() => {
      console.log(this.dataStoreService.elements);
    });

    this.dataStoreService.objectsClicked.subscribe((items) => {
      console.log("SINGLE");
      console.log(items);
    });

    this.dataStoreService.objectsDoubleClicked.subscribe((items) => {
      console.log("DOUBLE");
      console.log(items);
    });

    let t: DrRect = createDrRect({
      id: 2,
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      strokeWidth: 5,
      showFill: false,
      showStroke: true
    });

    let text: DrText = createDrText({
      x: 100, 
      y: 100,
      width: 200,
      height: 100,
      vAlignment: DrTextAlignment.NEAR,
      hAlignment:  DrTextAlignment.NEAR, 
      text: "Text",
      id: 6,
      size: 16,
      fontFamily: 'Courier New',
      rotation: 0,
      italic: false,
      showStroke: true,
      stroke: 'black'
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
      strokeWidth: 3,
      rotation: 315
    });

    let i: DrImage = createDrImage({
      id: 4,
      x: 400,
      y: 400,
      width: 200,
      height: 200,
      showFill: true,
      fill: 'rgba(0,0,255,0.5)',
      stroke: 'black',
      strokeWidth: 3,
      url: '/assets/image-placeholder-dark.png',
      rotation: 180
    });
    //elements.push(i);
    //elements.push(e);
    let t2: DrRect = createDrRect({
      id: 3,
      x: 100,
      y: 100,
      width: 200,
      height: 200,
      strokeWidth: 5,
      showFill: true,
      fill: 'blue',
      clickable: true,
      rotation: 0
    });
    //elements.push(t2);

    let t3: DrRect = createDrRect({
      id: 3,
      x: 100,
      y: 100,
      width: 200,
      height: 200,
      strokeWidth: 1,
      showFill: false,
      fill: 'blue',
      clickable: true,
      rotation:0
    });
    //elements.push(t3);

    //elements.push(t);
    let r: DrPolygon = createDrPolygon({
      id: 1,
      stroke: 'green',
      fill: 'white',
      showFill: false,
      strokeWidth: 3,
      points: [
        { x: 110, y: 310 },
        { x: 210, y: 310 },
        { x: 160, y: 410 }
      ],
      rotation: 10
    });
    let r2: DrPolygon = createDrPolygon({
      id: 10,
      stroke: 'green',
      fill: 'white',
      showFill: false,
      strokeWidth: 3,
      points: [
        { x: 110, y: 310 },
        { x: 210, y: 310 },
        { x: 160, y: 410 }
      ],
      rotation: 0
    });

    //elements.push(r);
    //elements.push(r2);
    //elements.push(e);
    //let g: DrGroupedObject = createDrGroupedObject({ id: 5, objects: elements, rotation: 0 });
    this.elements = elements;

    this.dataStoreService.selectedTool = EditorToolType.SELECTOR_TOOL;

    this.dataStoreService.elements = this.elements;

    

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