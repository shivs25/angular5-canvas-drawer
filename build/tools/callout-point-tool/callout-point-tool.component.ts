import { Component, OnInit } from '@angular/core';
import { DrPoint } from '../../models/dr-point';
import { DataStoreService } from '../../services/data-store.service';
import { DrawerObjectHelperService} from '../../services/drawer-object-helper.service';

import { DrCallout } from '../../models/dr-callout';
import { BoundingBox } from '../../models/bounding-box';
import { EditorToolType } from '../../models/enums';

const HALF_SIZER: number = 4;
@Component({
  selector: 'app-callout-point-tool',
  template: "\n    <div class=\"absolute-position fill-parent\"\n      (mousedown)=\"onBackgroundMouseDown($event)\"\n      (mousemove)=\"onBackgroundMouseMove($event)\"\n      (mouseup)=\"onBackgroundMouseUp($event)\">\n\n      <svg xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"polyBounds && point1Bounds && point2Bounds && pointerBounds\"\n        [ngStyle]=\"pixelizeBounds(polyBounds)\" class=\"no-interact\">\n        <svg:polygon\n          [attr.points]=\"getPoints()\"\n          fill=\"transparent\"\n          stroke=\"red\"\n          stroke-width=\"1\">\n        </svg:polygon>\n      </svg>\n\n        <svg xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"point1Bounds && (!mouseDown || sizer === 0)\"\n          [ngStyle]=\"pixelizeBounds(point1Bounds)\" [ngClass]=\"{ 'no-interact': mouseDown }\">\n           <rect id='point1'\n                class='crosshair'\n                (mousedown)=\"onSizerMouseDown($event, 0)\" \n                [attr.width]=\"SIZER_SIZE\" \n                [attr.height]= \"SIZER_SIZE\" \n                fill=\"green\">\n            </rect>\n        </svg>\n        <svg xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"point2Bounds && (!mouseDown || sizer === 1)\"\n          [ngStyle]=\"pixelizeBounds(point2Bounds)\" [ngClass]=\"{ 'no-interact': mouseDown }\">\n           <rect id='point2'\n                class='crosshair'\n                (mousedown)=\"onSizerMouseDown($event, 1)\" \n                [attr.width]=\"SIZER_SIZE\" \n                [attr.height]= \"SIZER_SIZE\" \n                fill=\"green\">\n            </rect>\n        </svg>\n        <svg xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"pointerBounds && (!mouseDown || sizer === 2)\"\n          [ngStyle]=\"pixelizeBounds(pointerBounds)\" [ngClass]=\"{ 'no-interact': mouseDown }\">\n           <rect id='pointer'\n                class='crosshair'\n                (mousedown)=\"onSizerMouseDown($event, 2)\" \n                [attr.width]=\"SIZER_SIZE\" \n                [attr.height]= \"SIZER_SIZE\" \n                fill=\"green\">\n            </rect>\n        </svg>\n    </div>\n  ",
  styles: ["\n\n  "]
})
export class CalloutPointToolComponent implements OnInit {

  SIZER_SIZE: number = HALF_SIZER * 2;

  sizerOffsetX: number = 0;
  sizerOffsetY: number = 0;

  mouseDown: boolean = false;
  sizer: number = -1;
  point1Bounds: any = null;
  point2Bounds: any = null;
  pointerBounds: any = null;
  points: DrPoint[] = [];
  polyBounds: any = null;

  private objectBounds: BoundingBox = null;

  constructor(private dataService: DataStoreService) { }

  ngOnInit() {
    let c: DrCallout = <DrCallout>this.dataService.selectedObjects[0];

    this.objectBounds = {
      x: c.x,
      y: c.y,
      width: c.width,
      height: c.height
    };

    this.points = [
      Object.assign({}, c.basePoint1),
      Object.assign({}, c.basePoint2),
      Object.assign({}, c.pointerLocation)
    ]

    this.point1Bounds = {
      left: c.basePoint1.x - HALF_SIZER,
      top: c.basePoint1.y - HALF_SIZER,
      width: HALF_SIZER * 2,
      height: HALF_SIZER * 2 
    }

    this.point2Bounds = {
      left: c.basePoint2.x - HALF_SIZER,
      top: c.basePoint2.y - HALF_SIZER,
      width: HALF_SIZER * 2,
      height: HALF_SIZER * 2 
    }

    this.pointerBounds = {
      left: c.pointerLocation.x - HALF_SIZER,
      top: c.pointerLocation.y - HALF_SIZER,
      width: HALF_SIZER * 2,
      height: HALF_SIZER * 2 
    }

    this.polyBounds = this.getPolyBounds();
  }

  getPolyBounds() {
    let left: number = Math.min(...this.points.map((b: any) => b.x));
    let right: number = Math.max(...this.points.map((b: any) => b.x));
    let top: number = Math.min(...this.points.map((b: any) => b.y));
    let bottom: number = Math.max(...this.points.map((b: any) => b.y));

    return  {
      left: left,
      top: top,
      width: right - left,
      height: bottom - top
    };
  }

  getPoints(): string {
    return (this.points[0].x - this.polyBounds.left) + " " +
           (this.points[0].y - this.polyBounds.top) + " " +
           (this.points[1].x - this.polyBounds.left) + " " +
           (this.points[1].y - this.polyBounds.top) + " " +
           (this.points[2].x - this.polyBounds.left) + " " +
           (this.points[2].y - this.polyBounds.top);
  }

  onSizerMouseDown(evt, index): void {
    evt.stopPropagation();
    evt.preventDefault();
    this.sizerOffsetX = evt.offsetX - HALF_SIZER;
    this.sizerOffsetY = evt.offsetY - HALF_SIZER;

    this.mouseDown = true;
    this.sizer = index;
  }

  onBackgroundMouseDown(evt): void { 
    this.dataService.selectedTool = EditorToolType.SELECTOR_TOOL;
  }

  onBackgroundMouseMove(evt): void { 
    if (this.mouseDown) {
      let valid: boolean = false;

      switch(this.sizer) {
        case 0:
          if (this.isInBounds(evt.offsetX, evt.offsetY)) {
            valid = true;
            Object.assign(this.point1Bounds, {
              left: evt.offsetX - this.sizerOffsetX - HALF_SIZER,
              top: evt.offsetY - this.sizerOffsetY - HALF_SIZER
            });
          }
          
          break;
        case 1:
          if (this.isInBounds(evt.offsetX, evt.offsetY)) {
            valid = true;
            Object.assign(this.point2Bounds, {
              left: evt.offsetX - this.sizerOffsetX - HALF_SIZER,
              top: evt.offsetY - this.sizerOffsetY - HALF_SIZER
            });
          }
          
          break;
        case 2:
          if (!this.isInBounds(evt.offsetX, evt.offsetY)) {
            valid = true;
            Object.assign(this.pointerBounds, {
              left: evt.offsetX - this.sizerOffsetX - HALF_SIZER,
              top: evt.offsetY - this.sizerOffsetY - HALF_SIZER
            });
          }
          
          break;
      }

      if (valid) {
        this.points[this.sizer].x = evt.offsetX - this.sizerOffsetX;
        this.points[this.sizer].y = evt.offsetY - this.sizerOffsetY;
  
        this.polyBounds = this.getPolyBounds();
      }
      
    }
  }

  onBackgroundMouseUp(evt): void { 
    if (this.mouseDown) {
      this.mouseDown = false;
      this.dataService.setCalloutPointer(this.dataService.selectedObjects[0], 
        this.points[0],
        this.points[1],
        this.points[2]
      );
    }
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

  
  private isInBounds(x: number, y: number):boolean {
    if (x >= this.objectBounds.x && x <= this.objectBounds.x + this.objectBounds.width &&
        y >= this.objectBounds.y && y <= this.objectBounds.y + this.objectBounds.height) {
          return true;
        }
    return false;
  }
}
