import { Component, OnInit, OnDestroy, ElementRef, HostListener } from '@angular/core';

import { DataStoreService } from '../../services/data-store.service';
import { DrObject } from '../../models/dr-object';
import { select } from '@angular-redux/store';
import { createDrRect, DrRect } from '../../models/dr-rect';
import { DynamicSvgDirective } from '../../dynamic-svg/dynamic-svg.directive';
import { DrawerObjectHelperService } from '../../services/drawer-object-helper.service';
import { BoundingBox } from '../../models/bounding-box';
import { MouseEventData } from '../../models/mouse-event-data';
import { DrPoint } from '../../models/dr-point';
import { ChangeHelperService } from '../../services/change-helper.service';
import { DrType, EditorToolType } from '../../models/enums';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';

const SIZER_SIZE: number = 8;
const HALF_SIZER: number = 4;
const ROTATE_SPACING: number = 40;

const SNAP_ANGLES: number[] = [0, 45, 90, 135, 180, 225, 270, 315, 360];
const DOUBLE_CLICK_TIME: number = 250;

const SELECTION_STYLE: any = {
  showFill: true,
  fill: "rgba(255, 0, 0, 0.3)",
  dashedLine: false,
  showStroke: true,
  stroke: 'red',
  strokeWidth: 1,
  showText: false
};

const INVISIBLE_STYLE: any = {
  showFill: false,
  showStroke: false,
  showText: false
};

@Component({
  selector: 'app-selector-tool',
  template: "\n\n\n    <app-drawer [overrideProperties]=\"invisibleStyle\"  [hoverClass]=\"'clickable'\"\n      (mouseDownObject)=\"onMouseDown($event)\"\n      (mouseMoveObject)=\"onMouseMove($event)\"\n      (mouseUpObject)=\"onMouseUp($event)\"\n      >\n    </app-drawer>\n\n    <svg *ngIf=\"cssBounds\" [ngStyle]=\"pixelizeBounds(cssBounds)\" [ngClass]=\"{ 'no-interact': mouseDown }\"\n      \n      xmlns=\"http://www.w3.org/2000/svg\"\n      (mousedown)=\"onBackgroundMouseDown($event)\"\n      (mousemove)=\"onBackgroundMouseMove($event)\"\n      (mouseup)=\"onBackgroundMouseUp($event)\"\n      [ngClass]=\"cursor\"\n      >\n      <svg:g [attr.transform]=\"selectionTransform\">\n    \n        <svg:g>\n          <ng-container \n            *ngIf=\"(elementState | async)?.present.selectedBounds && boundingBoxObject\" dynamic-svg \n            [elementId]=\"1000001\"\n            [componentData]=\"boundingBoxObject\"\n            [hoverClass]=\"cursor\" \n  \n            (mouseDown)=\"onBoundsMouseDown($event)\"\n            (mouseMove)=\"onBoundsMouseMove($event)\"\n            (mouseUp)=\"onBoundsMouseUp($event)\">\n          </ng-container>\n        </svg:g>\n   \n        <ng-container  *ngFor=\"let s of selectedObjects\" dynamic-svg [componentData]=\"s\" [overrideProperties]=\"selectionStyle\" [elementId]=\"s.id\"\n          (mouseDown)=\"onSelectionMouseDown($event)\"\n          (mouseMove)=\"onSelectionMouseMove($event)\"\n          (mouseUp)=\"onSelectionMouseUp($event)\"\n          [hoverClass]=\"cursor\"\n        ></ng-container>\n\n        <ng-container *ngFor=\"let s of sizers; let i = index;\">\n            <rect [id]=\"'resizer-' + i\"  *ngIf=\"(i % 2 === 0 || !shouldPreserveAspectRatio()) &&\n                                                (elementState | async)?.present.selectedBounds && \n                                                boundingBoxObject && \n                                                canResize && \n                                                mouseDownRotator < 0 &&\n                                                ((!mouseDown && !keyDown) || mouseDownSizer >= 0)\"\n            (mousedown)=\"onResizerMouseDown($event, i)\" \n            (mousemove)=\"onResizerMouseMove($event, i)\"\n            (mouseup)=\"onResizerMouseUp($event, i)\"\n            [ngClass]=\"getResizerCursor(i)\"\n            [attr.width]=\"SIZER_SIZE\" \n            [attr.height]= \"SIZER_SIZE\" fill=\"green\" \n            [attr.x]=\"getResizerX(i)\" \n            [attr.y]=\"getResizerY(i)\"></rect>\n        </ng-container>\n      </svg:g>\n    </svg>\n\n    <svg xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"canRotate && mouseDownSizer < 0 && ((!mouseDown && !keyDown) || mouseDownRotator >= 0)\"\n      [ngStyle]=\"pixelizeBounds(rotateRightBounds)\" fill=\"green\"[ngClass]=\"{ 'no-interact': mouseDown }\">\n       <rect id='rotate-right'\n            class='crosshair'\n            (mousedown)=\"onRotateMouseDown($event, 0)\" \n            (mousemove)=\"onRotateMouseMove($event, 0)\"\n            (mouseup)=\"onRotateMouseUp($event, 0)\"\n            [attr.width]=\"SIZER_SIZE\" \n            [attr.height]= \"SIZER_SIZE\" \n            [attr.rx]= \"HALF_SIZER\" \n            [attr.rx]= \"HALF_SIZER\" \n            fill=\"red\">\n        </rect>\n    </svg>\n    <svg xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"canRotate && mouseDownSizer < 0 && ((!mouseDown && !keyDown) || mouseDownRotator >= 0)\"\n      [ngStyle]=\"pixelizeBounds(rotateBottomBounds)\" fill=\"green\"[ngClass]=\"{ 'no-interact': mouseDown }\">\n      <rect id='rotate-bottom'\n            class='crosshair'\n            (mousedown)=\"onRotateMouseDown($event, 1)\" \n            (mousemove)=\"onRotateMouseMove($event, 1)\"\n            (mouseup)=\"onRotateMouseUp($event, 1)\"\n            [attr.width]=\"SIZER_SIZE\" \n            [attr.height]= \"SIZER_SIZE\" \n            [attr.rx]= \"HALF_SIZER\" \n            [attr.rx]= \"HALF_SIZER\"\n            fill=\"red\">\n        </rect>\n    </svg>\n  ",
  styles: ["\n\n  "]
})
export class SelectorToolComponent implements OnInit, OnDestroy {

  @select() elementState;

  SIZER_SIZE: number = SIZER_SIZE;
  HALF_SIZER: number = HALF_SIZER;

  //Dummy array to use in the ngFor
  sizers: number[] = [0,1,2,3,4,5,6,7];

  boundingBoxObjectUniqueId: number = 1000000;

  canResize: boolean = false;
  canRotate: boolean = false;
  boundingBoxObject: DrRect = null;
  selectedObjects: DrObject[] = [];
  selectionTransform: string = null;
  cssBounds: any = null;
  rotateRightBounds: any = null;
  rotateBottomBounds: any = null;
  cursor: string = 'grabber';
  rotation: number = 0;
  mouseDownSizer: number = -1;
  mouseDownRotator: number = -1;
  mouseDown: boolean = false;

  keyDown: boolean = false;
  
  selectionStyle: any;
  invisibleStyle: any = INVISIBLE_STYLE;
  



  private _location: DrPoint;

  private _subRedid: any;
  private _subUndid: any;
  private _subSelectionChanged: any;
  private _subSelectedBoundsChanged: any;

  private _cornerDistance: number = 0;
  private _originalBounds: BoundingBox;
  private _originX: number;
  private _originY: number;

  private _mouseDownClones: DrObject[] = null;
  private _mouseDownLocation: DrPoint = null;
  private _mouseDownCentroid: DrPoint = null;
  private _modifierKeys: any = {
    shift: false,
    alt: false,
    control: false
  };
  private _lastEvent: any = null;

  //DOUBLE CLICK STUFF
  private _clickPt = null;
  private _delay: any;

  constructor(
    private _dataStoreService: DataStoreService,
    private _objectHelperService: DrawerObjectHelperService,
    private _changeService: ChangeHelperService,
    private _elementRef: ElementRef) { }

  ngOnInit() {
    let b: any = this._elementRef.nativeElement.getBoundingClientRect();

    this._location = {
      x: b.left,
      y: b.top
    };

    this._subRedid = this._dataStoreService.redid.subscribe(() => {
      this.setupBounds();  
    });

    this._subUndid = this._dataStoreService.undid.subscribe(() => {
      this.setupBounds();
    });

    this._subSelectionChanged = this._dataStoreService.selectionChanged.subscribe((selectedObjects:DrObject[]) => {
      this.setupBounds();
    });
    this._subSelectedBoundsChanged = this._dataStoreService.selectedBoundsChanged.subscribe((selectedBounds: BoundingBox) => {
      this.setupBounds();
    })
    this.setupBounds();
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(evt): void {
    if ((EditorToolType.SELECTOR_TOOL === this._dataStoreService.selectedTool)) {
      switch(evt.key) {
        case "Shift":
        case "Control":
        case "Alt":
          this._modifierKeys[evt.key.toLowerCase()] = true;
          this.onMouseMove(this._lastEvent);

          break;
        case "ArrowUp":
          this.keyDown = true;
          this.microMoveObjects(0, this.isShiftDown() ? -10 : -1);
          evt.stopPropagation();
          evt.preventDefault();
          break;
        case "ArrowDown":
          this.keyDown = true;
          this.microMoveObjects(0, this.isShiftDown() ? 10 : 1);
          evt.stopPropagation();
          evt.preventDefault();
          break;
        case "ArrowLeft":
          this.keyDown = true;
          this.microMoveObjects(this.isShiftDown() ? -10 : -1, 0);
          evt.stopPropagation();
          evt.preventDefault();
          break;
        case "ArrowRight":
          this.keyDown = true;
          this.microMoveObjects(this.isShiftDown() ? 10 : 1, 0);
          evt.stopPropagation();
          evt.preventDefault();
          break;
      }
    }
    
  }

  @HostListener('window:keyup', ['$event'])
  onKeyUp(evt): void {
    if ((EditorToolType.SELECTOR_TOOL === this._dataStoreService.selectedTool)) {
      switch(evt.key) {
        case "Shift":
        case "Control":
        case "Alt":
          this._modifierKeys[evt.key.toLowerCase()] = false;
          this.onMouseMove(this._lastEvent);
          break;
        case "ArrowUp":
        case "ArrowDown":
        case "ArrowLeft":
        case "ArrowRight":
          this._dataStoreService.moveObjects(this._dataStoreService.selectedObjects, {
            x: this.cssBounds.left + HALF_SIZER,
            y: this.cssBounds.top + HALF_SIZER,
            width: this.cssBounds.width - SIZER_SIZE,
            height: this.cssBounds.height - SIZER_SIZE
          });
          evt.stopPropagation();
          this.keyDown = false;
          break;
      }
    }
  }

  isShiftDown(): boolean {
    return this._modifierKeys.shift;
  }

  onBackgroundMouseDown(evt): void {
    evt.preventDefault();
    evt.stopPropagation();
    if (this.cssBounds && this._originalBounds) {
      let pt: DrPoint = this.getRotatedPoint(
        { x: this.cssBounds.left + evt.offsetX,
          y: this.cssBounds.top + evt.offsetY }, this._originalBounds.x + this._originalBounds.width / 2, 
                                                 this._originalBounds.y + this._originalBounds.height / 2, this.rotation);
      this.onMouseDown({ 
        location: pt, 
        data: null,
        shiftKey: evt.shiftKey,
        ctrlKey: evt.ctrlKey,
        altKey: evt.altKey
      });
    }
    
  }

  onBackgroundMouseMove(evt): void {
    evt.preventDefault();
    evt.stopPropagation();
    if (this.cssBounds && this._originalBounds) {
      let pt: DrPoint = this.getRotatedPoint(
        { x: this.cssBounds.left + evt.offsetX,
          y: this.cssBounds.top + evt.offsetY }, this._originalBounds.x + this._originalBounds.width / 2, 
                                                 this._originalBounds.y + this._originalBounds.height / 2, this.rotation);
  
      this.onMouseMove({ 
        location: pt,
        data: null,
        shiftKey: evt.shiftKey,
        ctrlKey: evt.ctrlKey,
        altKey: evt.altKey
      });
    }
    
  }

  onBackgroundMouseUp(evt): void {
    evt.preventDefault();
    evt.stopPropagation();

    if (this.cssBounds && this._originalBounds) {
      let pt: DrPoint = this.getRotatedPoint(
        { x: this.cssBounds.left + evt.offsetX,
          y: this.cssBounds.top + evt.offsetY }, this._originalBounds.x + this._originalBounds.width / 2, 
                                                 this._originalBounds.y + this._originalBounds.height / 2, this.rotation);
  
      this.onMouseUp({ 
        location: pt,
        data: null,
        shiftKey: evt.shiftKey,
        ctrlKey: evt.ctrlKey,
        altKey: evt.altKey
      });
    }
    
  }

  onBoundsMouseDown(data: MouseEventData): void {
    data.location.x -= this._location.x;
    data.location.y -= this._location.y;
    this.onMouseDown(data);
  }

  onBoundsMouseMove(data: MouseEventData): void {

  }

  onBoundsMouseUp(data: MouseEventData): void {

  }

  onSelectionMouseDown(data: MouseEventData): void {
    data.location.x -= this._location.x;
    data.location.y -= this._location.y;
    this.onMouseDown(data);
  }

  onSelectionMouseMove(data: MouseEventData): void {

  }

  onSelectionMouseUp(data: MouseEventData): void {

  }

  onMouseDown(data: MouseEventData): void {

    if (null === data.data || !data.data.clickable) {
      this._dataStoreService.selectObjects([]);
      this.setupBounds();
    }
    else if (data.data) {
      if (data.data.id !== this.boundingBoxObjectUniqueId) {
        //Not the selected bounds object
        let selected: DrObject = this._dataStoreService.selectedObjects.find((t: any) => t.id === data.data.id);
        if (selected) {
          let index: number = this._dataStoreService.selectedObjects.indexOf(selected);
          if (this._modifierKeys.shift) {
            //Remove from selection
            this._dataStoreService.selectObjects([
              ...this._dataStoreService.selectedObjects.slice(0, index),
              ...this._dataStoreService.selectedObjects.slice(index + 1)
            ]);
          }
        }
        else {
          if (this._modifierKeys.shift) {
            //Add to selection.
            this._dataStoreService.selectObjects([
              ...this._dataStoreService.selectedObjects,
              data.data
            ]);
          }
          else {
            //Select new
            this._dataStoreService.selectObjects([data.data]);
          }
        }
      }
    }
    
    this.setupBounds();
    if (this._dataStoreService.selectedObjects.length > 0) {
      this._dataStoreService.beginEdit();
      
      let b: BoundingBox = this._objectHelperService.getBoundingBox(this.selectedObjects);
      this._mouseDownCentroid = { x: b.x + b.width / 2, y: b.y + b.height / 2};
      this._mouseDownLocation = data.location;

      this.mouseDown = true;
      this.mouseDownSizer = this.mouseDownRotator = -1;
      this.cursor = "grabbing";
    }
    
  }

  onMouseMove(data: MouseEventData): void {
    this._lastEvent = data; 
    if (this.mouseDown && this._dataStoreService.selectedObjects.length > 0) {
      if (this.mouseDownSizer < 0 && this.mouseDownRotator < 0) {
        //Moving objects
        Object.assign(this.cssBounds, {
          left: this.boundingBoxObject.x - HALF_SIZER + (data.location.x - this._mouseDownLocation.x),
          top: this.boundingBoxObject.y - HALF_SIZER + (data.location.y - this._mouseDownLocation.y)
        });
      }
      else {
        if (this.mouseDownSizer >= 0) {
          //Resizing objects
          this.resizeObjects(data.location, this.shouldPreserveAspectRatio());
        }
        else {
          this.rotateObject(data.location, this._modifierKeys.shift);
        }
      }
      
    }
  }

  onMouseUp(data: MouseEventData): void {
    if (this.mouseDown && this._dataStoreService.selectedObjects.length > 0) {
      if (this.mouseDownSizer < 0 && this.mouseDownRotator < 0) {
        //Moving objects

        if (Math.abs(data.location.x - this._mouseDownLocation.x) < 2 &&
            Math.abs(data.location.y - this._mouseDownLocation.y) < 2) {
            
          //Click
          if (this._delay) {
            //Double click
            this._delay.unsubscribe();
            this._delay = null;
            this._dataStoreService.doubleClickObjects(this._dataStoreService.selectedObjects);
          }
          else {
            this._clickPt = data.location;
            this._delay = Observable.of(null).delay(DOUBLE_CLICK_TIME).subscribe(() => {
              if (this._delay) {
                this._delay.unsubscribe();
                this._delay = null;
                this._dataStoreService.clickObjects(this._dataStoreService.selectedObjects);
              }
            });
          }
        }
        else {
          Object.assign(this.cssBounds, {
            left: this.boundingBoxObject.x - HALF_SIZER + (data.location.x - this._mouseDownLocation.x),
            top: this.boundingBoxObject.y - HALF_SIZER + (data.location.y - this._mouseDownLocation.y)
          });
  
          this._dataStoreService.moveObjects(this._dataStoreService.selectedObjects, {
            x: this.cssBounds.left + HALF_SIZER,
            y: this.cssBounds.top + HALF_SIZER,
            width: this.cssBounds.width - SIZER_SIZE,
            height: this.cssBounds.height - SIZER_SIZE
          });
        }
        
      }
      else {
        if (this.mouseDownSizer >= 0) {
          //Resizing Objects
          this.resizeObjects(data.location, this.shouldPreserveAspectRatio());

          if (this.rotation > 0) {
            let rotationPoint: DrPoint = { 
              x: this.cssBounds.left + HALF_SIZER + this._originX,
              y: this.cssBounds.top + HALF_SIZER + this._originY
            };
    
            let ul: DrPoint = this.getRotatedPoint(
              { x: this.cssBounds.left + HALF_SIZER, y: this.cssBounds.top + HALF_SIZER }, 
              rotationPoint.x,
              rotationPoint.y,
              this.rotation);
            let lr: DrPoint = this.getRotatedPoint(
              { 
                x: this.cssBounds.left + this.cssBounds.width - HALF_SIZER, 
                y: this.cssBounds.top + this.cssBounds.height - HALF_SIZER, 
              }, 
              rotationPoint.x,
              rotationPoint.y,
              this.rotation);

              //reset rotation point
              rotationPoint = { x: (ul.x + lr.x) / 2, y: (ul.y + lr.y) / 2 };

            ul = this.getRotatedPoint(
              ul, 
              rotationPoint.x,
              rotationPoint.y,
              -this.rotation);
            lr = this.getRotatedPoint(
              lr,
              rotationPoint.x,
              rotationPoint.y,
              -this.rotation);


              this._dataStoreService.moveObjects(this._dataStoreService.selectedObjects, {
                x: ul.x,
                y: ul.y,
                width: lr.x - ul.x,
                height: lr.y - ul.y
              });
          }
          else {
            this._dataStoreService.moveObjects(this._dataStoreService.selectedObjects, {
              x: this.cssBounds.left + HALF_SIZER,
              y: this.cssBounds.top + HALF_SIZER,
              width: this.cssBounds.width - SIZER_SIZE,
              height: this.cssBounds.height - SIZER_SIZE
            });
          }
          
        }
        else {
          this.rotateObject(data.location, this._modifierKeys.shift);
          if (this._dataStoreService.selectedObjects.length > 0) {
            this._dataStoreService.setRotation(this.selectedObjects[0], this.rotation);
          }

        }
        
      }
      this.setupBounds();

      this.cursor = "grabber";
      this.mouseDown = false;
      this.mouseDownSizer = -1;
      this.mouseDownRotator = -1;
      this._dataStoreService.endEdit();
    }
    
  }

  onResizerMouseDown(evt: any, index: number): void {
    evt.stopPropagation();
    evt.preventDefault();

    this._dataStoreService.beginEdit();

    let pt: DrPoint = this.getRelativeChildPointFromEvent(evt);

    this._lastEvent = {
      location: pt,
      data: null,
      shiftKey: evt.shiftKey,
      ctrlKey: evt.ctrlKey,
      altKey: evt.altKey
    };

    
    this._mouseDownLocation = pt;

    this.mouseDown = true;
    this.mouseDownSizer = index;
    this.cursor = this.getResizerCursor(index);
    this._mouseDownClones = this._dataStoreService.selectedObjects.map((x) => Object.assign({}, x));

    this._originalBounds = Object.assign({}, this._dataStoreService.selectedBounds);
    this._originX = this._originalBounds.width / 2;
    this._originY = this._originalBounds.height / 2;
    this._cornerDistance = this.getDistanceBetweenTwoPoints(
      { 
        x: this._dataStoreService.selectedBounds.x,
        y: this._dataStoreService.selectedBounds.y,
      },
      {
        x: this._dataStoreService.selectedBounds.x + this._dataStoreService.selectedBounds.width,
        y: this._dataStoreService.selectedBounds.y + this._dataStoreService.selectedBounds.height
      }
    );
  }

  onResizerMouseMove(evt: any, index: number): void {
    evt.preventDefault();
    evt.stopPropagation();
  }

  onResizerMouseUp(evt: any, index: number): void {
    evt.preventDefault();
    evt.stopPropagation();
  }

  onRotateMouseDown(evt: any, index: number): void {
    evt.preventDefault();
    evt.stopPropagation();

    this.cursor = "crosshair";

    this._dataStoreService.beginEdit();


    this._mouseDownLocation = this.getRelativePointFromEvent(evt);

    let b: BoundingBox = this._objectHelperService.getBoundingBox(this.selectedObjects);
    this._mouseDownCentroid = { x: b.x + b.width / 2, y: b.y + b.height / 2};
    this.mouseDown = true;
    this.mouseDownRotator = index;
  }

  onRotateMouseMove(evt: any, index: number): void {
    evt.preventDefault();
    evt.stopPropagation();
  }

  onRotateMouseUp(evt: any, index: number): void {
    evt.preventDefault();
    evt.stopPropagation();

  }


  getResizerX(index: number): number {
    switch(index) {
      case 0:
      case 1:
      case 2:
        return this.boundingBoxObject.x - HALF_SIZER;
      case 3:
      case 7:
        return this.boundingBoxObject.x + this.boundingBoxObject.width / 2 - HALF_SIZER
      case 4:
      case 5: 
      case 6:
        return  this.boundingBoxObject.x + this.boundingBoxObject.width - HALF_SIZER;
    }
  }

  getResizerY(index: number): number {
    switch(index) {
      case 0:
      case 6:
      case 7:
        return this.boundingBoxObject.y - HALF_SIZER;
      case 1:
      case 5:
        return this.boundingBoxObject.y + this.boundingBoxObject.height / 2 - HALF_SIZER;
      case 2:
      case 3:
      case 4:
        return  this.boundingBoxObject.y + this.boundingBoxObject.height - HALF_SIZER;
    }
  }

  getResizerCursor(index: number): string {
    switch(index) {
      case 0:
      case 4:
        return 'resizer-diagonal-2';
      case 2:
      case 6:
        return 'resizer-diagonal-1';
      case 1:
      case 5:
        return 'resizer-left-right';
      case 3:
      case 7:
        return 'resizer-top-bottom';
    }
  }

  shouldPreserveAspectRatio(): boolean {
    return this.isShiftDown() || this._dataStoreService.selectedObjects.filter((d) => d.drType === DrType.IMAGE).length > 0;
  }

  pixelizeBounds(bounds): any {
    let returnValue: any = Object.assign({}, bounds);

    if (bounds.left) {
      returnValue.left = bounds.left + "px";
    }
    if (bounds.top) {
      returnValue.top = bounds.top + "px";
    }
    if (bounds.width) {
      returnValue.width = bounds.width + "px";
    }
    if (bounds.height) {
      returnValue.height = bounds.height + "px";
    }

    return returnValue;
  }

  private microMoveObjects(diffX: number, diffY: number) {
    Object.assign(this.cssBounds, {
      left: this.cssBounds.left + diffX,
      top: this.cssBounds.top + diffY
    });
  }

  private getDistanceBetweenTwoPoints(point1: DrPoint, point2: DrPoint): number {
    let a: number = point1.x - point2.x;
    let b: number = point1.y - point2.y;

    return Math.sqrt( a*a + b*b );
  }

  private getRelativeChildPointFromEvent(evt): DrPoint {
    return {
      x: evt.clientX - this._location.x,
      y: evt.clientY - this._location.y
    }
  }

  private getRelativePointFromEvent(evt): DrPoint {
    let clientBounds: any = evt.target.getBoundingClientRect();
    return {
      x: clientBounds.x + evt.offsetX - this._location.x,
      y: clientBounds.y + evt.offsetY - this._location.y
    }
  }

  private canAllResize(objects: DrObject[]): boolean {
    let returnValue: boolean = true;

    for(let o of objects) {
      if (!this._objectHelperService.canResize(o, true)) {
        returnValue = false;
        break;
      }
    }

    return returnValue;
  }

  private setupBounds(): void {
    if (null !== this._dataStoreService.selectedBounds && this._dataStoreService.selectedObjects.length > 0) {
      let objs: DrObject[] = this._objectHelperService.getObjects(this._dataStoreService.selectedObjects.map((d) => d.id), this._dataStoreService.elements);
      this.rotation = objs.length === 1 ? objs[0].rotation : 0;

      this.selectedObjects = this._dataStoreService.selectedObjects.map(x => Object.assign({}, x));
      let b: BoundingBox = this._dataStoreService.selectedBounds;
      this.boundingBoxObject = createDrRect({
        id: this.boundingBoxObjectUniqueId,
        x: b.x,
        y: b.y,
        width: b.width,
        height: b.height,
        showFill: false,
        showStroke: true,
        stroke: 'red',
        dashedLine: false
      });
      this.selectionTransform = "translate(" + (b.x * -1 + HALF_SIZER) + " " + (b.y * -1 + HALF_SIZER) + ")";
      this.cssBounds = {
        left: b.x - HALF_SIZER,
        top: b.y - HALF_SIZER,
        width: b.width + SIZER_SIZE,
        height: b.height + SIZER_SIZE,
        transform: 'rotate(' + this.rotation  + 'deg)'
      };

      let left: number =  b.x + b.width + ROTATE_SPACING - HALF_SIZER;
      let top: number = b.y + b.height / 2 - HALF_SIZER;

      

      this.rotateRightBounds = {
        left: left,
        top: top,
        width: SIZER_SIZE,
        height: SIZER_SIZE,
        transform: 'rotate(' + this.rotation + 'deg)',
        "transform-origin": ((this.cssBounds.left + this.cssBounds.width / 2) - 
                             (left + SIZER_SIZE / 2))  + "px " + 
                             (SIZER_SIZE / 2) + "px"
      };

      top = b.y + b.height + ROTATE_SPACING - HALF_SIZER;

      this.rotateBottomBounds = {
        left: b.x + b.width / 2 - HALF_SIZER,
        top: top,
        width: SIZER_SIZE,
        height: SIZER_SIZE,
        transform: 'rotate(' + this.rotation + 'deg)',
        "transform-origin": (SIZER_SIZE / 2) + "px " + ((this.cssBounds.top + this.cssBounds.height / 2) - 
                                                        (top + SIZER_SIZE / 2)) + "px"
      };

      this.canResize = 1 === this.selectedObjects.length ? this._objectHelperService.canResize(this.selectedObjects[0], false) :
                       this.canAllResize(this.selectedObjects);
      this.canRotate = 1 === this.selectedObjects.length && DrType.GROUPED_OBJECT !== this.selectedObjects[0].drType && DrType.CALLOUT !== this.selectedObjects[0].drType;

      if (this.selectedObjects.length > 1) {
        this.selectionStyle = Object.assign({}, SELECTION_STYLE, { drawPointer: false });
      }
      else {
        this.selectionStyle = Object.assign({}, SELECTION_STYLE, { rotation: 0, drawPointer: false });
      }
      
    }
    else {
      this.selectedObjects = [];
      this.boundingBoxObject = null;
      this.selectionTransform = "translate(0 0)";
      this.cssBounds = this.rotateRightBounds = this.rotateBottomBounds = null;
      this.canResize = this.canRotate = false;
      this.rotation = 0;
    }
    
  }

  private rotateObject(location: DrPoint, shiftKey: boolean): void {
    let rotation = (360 + this.getRotationAngleFromMouseDownPoint(location) - (0 === this.mouseDownRotator ? 0 : 90)) % 360;

    if (shiftKey) {
      let snapped: number[] = SNAP_ANGLES.slice(0);
      this.rotation = snapped.sort((a, b) => {
        return Math.abs(rotation - a) - Math.abs(rotation - b)
      })[0] % 360;
    }
    else {
      this.rotation = rotation;
    }

    Object.assign(this.rotateRightBounds, { transform: 'rotate(' + this.rotation + 'deg)' });
    Object.assign(this.rotateBottomBounds, { transform: 'rotate(' + this.rotation + 'deg)' });
    Object.assign(this.cssBounds, { transform: 'rotate(' + this.rotation + 'deg)' });
  }

  private getRotationAngle(a: DrPoint, b: DrPoint): number {
    return Math.round(Math.atan2(a.y - b.y, a.x - b.x) * 180 / Math.PI);
  }

  private getRotationAngleFromMouseDownPoint(location: DrPoint): number {
    return this.getRotationAngle(location, this._mouseDownCentroid);
  }

  private resizeObjects(location: DrPoint, preserveAspectRatio: boolean): void {
    let b: BoundingBox = this._dataStoreService.selectedBounds;

    let hChanges = null;
    let vChanges = null;

    if (this.rotation > 0) {
      location = this.getRotatedPoint(location, this._originalBounds.x + this._originalBounds.width / 2, 
                                                this._originalBounds.y + this._originalBounds.height / 2, -this.rotation);
    }


    switch(this.mouseDownSizer){
      case 0: {
      let quadrant: number = 0;
        if (location.x > b.x + b.width) {
          if (location.y > b.y) {
            quadrant = 4;
          }
          else {
            quadrant = 1;
          }
        }
        else {
          if (location.y > b.y + b.height) {
            quadrant = 3;
          }
          else {  
            quadrant = 2;
          }
        }

        hChanges = this.resizeH(b, location, false, preserveAspectRatio, { x: b.x + b.width, y: b.y + b.height }, quadrant === 1 ? -1 : 1);
        vChanges = this.resizeV(b, location, false, preserveAspectRatio, { x: b.x + b.width, y: b.y + b.height }, quadrant === 3 ? -1 : 1);
        break;
      }
      case 1: 
        hChanges = this.resizeH(b, location, false, preserveAspectRatio, null, 1);
        break;
      case 2: {
        let quadrant: number = 0;
        if (location.x > b.x + b.width) {
          if (location.y > b.y) {
            quadrant = 4;
          }
          else {
            quadrant = 1;
          }
        }
        else {
          if (location.y > b.y) {
            quadrant = 3;
          }
          else {  
            quadrant = 2;
          }
        }

        hChanges = this.resizeH(b, location, false, preserveAspectRatio, { x: b.x + b.width, y: b.y }, quadrant === 4 ? -1 : 1);
        vChanges = this.resizeV(b, location, true, preserveAspectRatio, { x: b.x + b.width, y: b.y }, quadrant === 2 ? -1 : 1);
        break;
      }
      case 3:
        vChanges = this.resizeV(b, location, true, preserveAspectRatio, null, 1);
        break;
      case 4: {
          
        let quadrant: number = 0;
        if (location.x > b.x) {
          if (location.y > b.y) {
            quadrant = 4;
          }
          else {
            quadrant = 1;
          }
        }
        else {
          if (location.y > b.y) {
            quadrant = 3;
          }
          else {  
            quadrant = 2;
          }
        }

        hChanges = this.resizeH(b, location, true, preserveAspectRatio, { x: b.x, y: b.y }, quadrant === 3 ? -1 : 1);
        vChanges = this.resizeV(b, location, true, preserveAspectRatio, { x: b.x, y: b.y }, quadrant === 1 ? -1 : 1);
        break;
      }
      case 5: 
        hChanges = this.resizeH(b, location, true, preserveAspectRatio, null, 1);
        break;
      case 6: {
        let quadrant: number = 0;
        if (location.x > b.x) {
          if (location.y > b.y + b.height) {
            quadrant = 4;
          }
          else {
            quadrant = 1;
          }
        }
        else {
          if (location.y > b.y + b.height) {
            quadrant = 3;
          }
          else {  
            quadrant = 2;
          }
        }

        hChanges = this.resizeH(b, location, true, preserveAspectRatio, { x: b.x, y: b.y + b.height }, quadrant === 2 ? -1 : 1);
        vChanges = this.resizeV(b, location, false, preserveAspectRatio, { x: b.x, y: b.y + b.height }, quadrant === 4 ? -1 : 1);
        break;
      }
      case 7:
        vChanges = this.resizeV(b, location, false, preserveAspectRatio, null, 1);
        break;
    }

    if (vChanges && vChanges.cssBounds && vChanges.cssBounds.top) {
      this._originY = this._originalBounds.y + this._originalBounds.height / 2 - vChanges.cssBounds.top - HALF_SIZER;
    }

    if (hChanges && hChanges.cssBounds && hChanges.cssBounds.left) {
      this._originX = this._originalBounds.x + this._originalBounds.width / 2 - hChanges.cssBounds.left - HALF_SIZER;
    }

    Object.assign(this.cssBounds,
      null !== hChanges && null !== hChanges.cssBounds ? hChanges.cssBounds : {},
      null !== vChanges && null !== vChanges.cssBounds ? vChanges.cssBounds : {},
      { 
        "transform-origin": (this._originX + HALF_SIZER) + "px " + (this._originY + HALF_SIZER) + "px"
      }
    );
    Object.assign(this.boundingBoxObject,
      null !== hChanges && null !== hChanges.boundingBoxObject ? hChanges.boundingBoxObject : {},
      null !== vChanges && null !== vChanges.boundingBoxObject ? vChanges.boundingBoxObject : {}
    );
    this.applyResizeChanges();


  }

  private resizeH(b: BoundingBox, location: DrPoint, opposite: boolean, shiftKey: boolean, stationaryPt: DrPoint, quadrantMultiplier: number): any {

    let returnValue: any = null;
    let newLocation: DrPoint = location;
    let left: number = 0;
    let width: number = 0;
    let elementWidth: number = 0
    let threshold: number = opposite ? b.x : b.x + b.width;
  
    

    if (newLocation.x < threshold) {
      if (shiftKey && null !== stationaryPt) {
        let mouseDistance = this.getDistanceBetweenTwoPoints(newLocation, stationaryPt);
        let scale = mouseDistance / this._cornerDistance;

        newLocation = Object.assign({}, newLocation, {
          x: threshold - this._originalBounds.width * scale * quadrantMultiplier
        });
      }
 
      
      if (shiftKey && -1 === quadrantMultiplier) {
        left = threshold - HALF_SIZER;
        width = newLocation.x + HALF_SIZER - left;
        elementWidth = newLocation.x - threshold;
      }
      else {
        left = newLocation.x - HALF_SIZER;
        width = threshold + HALF_SIZER - left;
        elementWidth = threshold - newLocation.x;
      }
      
    }
    else {
      if (shiftKey && null !== stationaryPt) {
        let mouseDistance = this.getDistanceBetweenTwoPoints(newLocation, stationaryPt);
        let scale = mouseDistance / this._cornerDistance;

        newLocation = Object.assign({}, newLocation, {
          x: threshold + this._originalBounds.width * scale * quadrantMultiplier
        });
        
      }


      if (shiftKey && -1 === quadrantMultiplier) {
        left = newLocation.x - HALF_SIZER;
        width = threshold + HALF_SIZER - left;
        elementWidth = threshold - newLocation.x;
      }
      else {
        left = threshold - HALF_SIZER;
        width = newLocation.x + HALF_SIZER - left;
        elementWidth = newLocation.x - threshold;
      }

      
    }
    
    if (width > 0 && elementWidth > 0) {
      returnValue = {
        cssBounds: {
          left: left,
          width: width
        },
        boundingBoxObject: {
          width: elementWidth
        }
      }
    }

    return returnValue;
  }

  private resizeV(b: BoundingBox, location: DrPoint, opposite: boolean, shiftKey: boolean, stationaryPt: DrPoint, quadrantMultiplier: number): any {
    let returnValue: any = null;
    let top: number = 0;
    let newLocation: DrPoint = location;
    let height: number = 0;
    let elementHeight: number = 0;
    let threshold: number = opposite ? b.y : b.y + b.height;
    
    
    if (newLocation.y < threshold) {
      
      if (shiftKey && null !== stationaryPt) {
        let mouseDistance = this.getDistanceBetweenTwoPoints(newLocation, stationaryPt);
        let scale = mouseDistance / this._cornerDistance;

        newLocation = Object.assign({}, newLocation, {
          y: threshold - this._originalBounds.height * scale * quadrantMultiplier
        });
      }

      if (shiftKey && quadrantMultiplier === -1) {
        top = threshold - HALF_SIZER;
        height = newLocation.y + HALF_SIZER - top;
        elementHeight = newLocation.y - threshold;
      }
      else {
        top = newLocation.y - HALF_SIZER;
        height = threshold + HALF_SIZER - top;
        elementHeight = threshold - newLocation.y;
      }

      
    }
    else {
      if (shiftKey && null !== stationaryPt) {
        let mouseDistance = this.getDistanceBetweenTwoPoints(newLocation, stationaryPt);
        let scale = mouseDistance / this._cornerDistance;

        newLocation = Object.assign({}, newLocation, {
          y: threshold + this._originalBounds.height * scale * quadrantMultiplier
        });
        
      }

      if (shiftKey && quadrantMultiplier === -1) {
        top = newLocation.y - HALF_SIZER;
        height = threshold + HALF_SIZER - top;
        elementHeight = threshold - newLocation.y;
      }
      else {
        top = threshold - HALF_SIZER;
        height = newLocation.y + HALF_SIZER - top;
        elementHeight = newLocation.y - threshold;
      }
      
    }
    
    if (height > 0 && elementHeight > 0) {
      returnValue = {
        cssBounds: {
          top: top,
          height: height
        },
        boundingBoxObject: {
          height: elementHeight
        }
      }
    }

    return returnValue;
  }

  private getRotatedPoint(point: DrPoint, originX: number, originY: number, angle: number): DrPoint {
    let radians = angle * Math.PI / 180;
    let newX = Math.cos(radians) * (point.x - originX) - Math.sin(radians) * (point.y - originY) + originX;
    let newY = Math.sin(radians) * (point.x - originX) + Math.cos(radians) * (point.y - originY) + originY;
    return {
      x: newX,
      y: newY
    };
  }

  private applyResizeChanges(): void {
    let clone: DrObject;
    for(let s of this.selectedObjects) {
      clone = this._mouseDownClones.find((t: any) => t.id === s.id);

      Object.assign(s, this._changeService.getBoundsChanges(
        clone,
        this._objectHelperService.getBoundingBox([this.boundingBoxObject]), 
        this._dataStoreService.selectedBounds
      ));
    }
  }

  ngOnDestroy() {

    if (this._subRedid) {
      this._subRedid.unsubscribe();
    }
    if (this._subUndid) {
      this._subUndid.unsubscribe();
    }
    if (this._subSelectionChanged){
      this._subSelectionChanged.unsubscribe();
    }
    if (this._subSelectedBoundsChanged) {
      this._subSelectedBoundsChanged.unsubscribe();
    }

  }
}
