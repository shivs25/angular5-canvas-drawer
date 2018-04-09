import { Injectable } from '@angular/core';
import { DrEllipse } from '../models/dr-ellipse';
import { DrImage } from '../models/dr-image';
import { DrObject } from '../models/dr-object';
import { DrPoint } from '../models/dr-point';
import { DrPolygon } from '../models/dr-polygon';
import { DrRect } from '../models/dr-rect';
import { DrText } from '../models/dr-text';
import { DrGroupedObject } from '../models/dr-grouped-object';
import { DrType } from '../models/dr-type.enum';
import { BoundingBox, DEFAULT_BOUNDING_BOX, createBoundingBox } from '../models/bounding-box';
import { BoundDirectivePropertyAst, BoundElementPropertyAst } from '@angular/compiler';
import { DrCallout } from '../models/dr-callout';
import { Observable } from 'rxjs';
import * as clipperLib from 'js-angusj-clipper';

@Injectable()
export class DrawerObjectHelperService {

  private clipper: any = null;
  private clipperRequested: boolean = false;
  
  constructor() { 

  }

  public canResize(element: DrObject, checkRotation: boolean): boolean {
    let returnValue: boolean = true;

    if (DrType.GROUPED_OBJECT === element.drType) {
      for(let o of (element as DrGroupedObject).objects) {
        if (!this.canResize(o, true)) {
          returnValue = false;
          break;
        }
      }
    }
    else {
      if (checkRotation) {
        returnValue = 0 === element.rotation;
      }
    }

    return returnValue;
  }

  

  public getObjects(ids: number[],availableElements: DrObject[]): DrObject[]{
    let objs: DrObject[] = [];
    
    for(let i = 0; i < availableElements.length; i++){
      if(ids.indexOf(availableElements[i].id) > -1){
        objs.push(availableElements[i]);
      }
      if(availableElements[i].drType === DrType.GROUPED_OBJECT){
        let g: DrGroupedObject = availableElements[i] as DrGroupedObject;
        let childObjs: DrObject[] = this.getObjects(ids,g.objects);
        for(let j = 0; j < childObjs.length; j++){
          objs.push(childObjs[j]);
        }
      }
    }
    return objs;
  } 

  public projectObject(item: DrObject, bounds: BoundingBox, offsetX: number, offsetY: number): void {
    switch(item.drType) {
      case DrType.IMAGE:
      case DrType.RECTANGLE:
      case DrType.TEXT:
        let r: DrRect = item as DrRect;
        r.x -= (bounds.x - offsetX);
        r.y -= (bounds.y - offsetY);

        break;
      case DrType.ELLIPSE:
        let e: DrEllipse = item as DrEllipse;
        r.x -= (bounds.x - offsetX);
        r.y -= (bounds.y - offsetY);
        break;
      case DrType.POLYGON:
        let p: DrPolygon = item as DrPolygon;
        let pts: DrPoint[] = [];

        for(let i of p.points) {
          pts.push({ x: i.x - (bounds.x - offsetX), y: i.y - (bounds.y - offsetY)});
        }

        p.points = pts;
        break;
    }
  }

  public getBoundingBoxForPoints(points: DrPoint[]): BoundingBox {
    let left: number = Math.min(...points.map((b: any) => b.x));
    let right: number = Math.max(...points.map((b: any) => b.x));
    let top: number = Math.min(...points.map((b: any) => b.y));
    let bottom: number = Math.max(...points.map((b: any) => b.y));
    return {
      x: left,
      y: top,
      width: right - left,
      height: bottom - top
    }
  }


  public getBoundingBoxForBounds(boundingBoxes: BoundingBox[]) {

    let left: number = Math.min(...boundingBoxes.map((b: any) => b.x));
    let right: number = Math.max(...boundingBoxes.map((b: any) => b.x + b.width));
    let top: number = Math.min(...boundingBoxes.map((b: any) => b.y));
    let bottom: number = Math.max(...boundingBoxes.map((b: any) => b.y + b.height));

    return {
      x: left,
      y: top,
      width: right - left,
      height: bottom - top
    }
  }

  public getBoundingBox(drObjs: DrObject[]): BoundingBox {
    let boundingBox: BoundingBox = createBoundingBox();
    
    let boundingBoxes: BoundingBox[] = [];
    for(let i = 0; i < drObjs.length; i++){
      boundingBoxes.push(this.getBoundingBoxForObject(drObjs[i]));
    }
    
    if(boundingBoxes.length === 1){
      boundingBox.y = boundingBoxes[0].y;
      boundingBox.x = boundingBoxes[0].x;
      boundingBox.height = boundingBoxes[0].height;
      boundingBox.width = boundingBoxes[0].width;
    } else if (boundingBoxes.length > 1){
      let minX: number = 0;
      let minY: number = 0;
      let maxX: number = 0;
      let maxY: number = 0;
      //Current logic just adds total width height together, it does not take into account the top or left values....
      for(let j = 0; j < boundingBoxes.length; j++){
        if(j === 0){
          minX = boundingBoxes[j].x;
          minY = boundingBoxes[j].y;
          maxY = boundingBoxes[j].y + boundingBoxes[j].height;
          maxX = boundingBoxes[j].x + boundingBoxes[j].width;
        } else {
          if(minX > boundingBoxes[j].x){
            minX = boundingBoxes[j].x;
          }
          if(maxX < (boundingBoxes[j].x + boundingBoxes[j].width)){
            maxX = boundingBoxes[j].x + boundingBoxes[j].width;
          }
          if(minY > boundingBoxes[j].y){
            minY = boundingBoxes[j].y;
          }
          if(maxY < (boundingBoxes[j].y + boundingBoxes[j].height)){
            maxY = boundingBoxes[j].y + boundingBoxes[j].height;
          }
        }
      }

      boundingBox.y = minY;
      boundingBox.x = minX;
      boundingBox.height = maxY - minY;
      boundingBox.width = maxX - minX;
    }

    return boundingBox;
  }


  public getRotatedPoint(x: number, y: number, originX: number, originY: number, angle: number): DrPoint {
    let radians = angle * Math.PI / 180;
    let newX = Math.cos(radians) * (x - originX) - Math.sin(radians) * (y - originY) + originX;
    let newY = Math.sin(radians) * (x - originX) + Math.cos(radians) * (y - originY) + originY;
    return {
      x: newX,
      y: newY
    };
  }

  public getRotatedBounds(item: DrObject) {
    return  this.getRotatedBoundingBox(this.getBoundingBox([item]), item.rotation);
  }

  public getRotatedBoundingBox(bb: BoundingBox, rotation: number): BoundingBox {
    let returnValue: BoundingBox = createBoundingBox();
    //top left
    let x1: number = bb.x;
    let y1: number = bb.y;
    //bottom left
    let x2: number = bb.x;
    let y2: number = bb.y + bb.height;
    //top right
    let x3: number = bb.x + bb.width;
    let y3: number = bb.y;
    //bottom right
    let x4: number = bb.x + bb.width;
    let y4: number = bb.y + bb.height;
    //Center of boundingbox
    let centerX: number = bb.x + (bb.width / 2);
    let centerY: number = bb.y + (bb.height / 2);
    
    let point1: DrPoint = this.getRotatedPoint(x1,y1,centerX,centerY,rotation);
    let point2: DrPoint = this.getRotatedPoint(x2,y2,centerX,centerY,rotation);
    let point3: DrPoint = this.getRotatedPoint(x3,y3,centerX,centerY,rotation);
    let point4: DrPoint = this.getRotatedPoint(x4,y4,centerX,centerY,rotation);

    let points: DrPoint[] = [point1, point2, point3, point4];

    let minX: number = 0;
    let minY: number = 0;
    let maxX: number = 0;
    let maxY: number = 0;
    for(let k = 0; k < points.length; k++){
      if(k === 0){
        minX = points[k].x;
        minY = points[k].y;
        maxY = points[k].y;
        maxX = points[k].x;
      } else {
        if(minX > points[k].x){
          minX = points[k].x;
        }
        if(maxX < points[k].x){
          maxX = points[k].x;
        }
        if(minY > points[k].y){
          minY = points[k].y;
        }
        if(maxY < points[k].y){
          maxY = points[k].y;
        }
      }
    }

    returnValue.y = minY;
    returnValue.x = minX;
    returnValue.height = maxY - minY;
    returnValue.width = maxX - minX;
    return returnValue;
  }

  public getRotatedPoints(drObj: DrObject): DrPoint[] {
    let returnValue: DrPoint[] = [];

    switch(drObj.drType){
      case(DrType.ELLIPSE):
        let e: DrEllipse = <DrEllipse>drObj;

        returnValue.push(this.getRotatedPoint(e.x - e.rx, e.y - e.ry, e.x, e.y, e.rotation));
        returnValue.push(this.getRotatedPoint(e.x + e.rx, e.y + e.ry, e.x, e.y, e.rotation));
        returnValue.push(this.getRotatedPoint(e.x - e.rx, e.y + e.ry, e.x, e.y, e.rotation));
        returnValue.push(this.getRotatedPoint(e.x + e.rx, e.y - e.ry, e.x, e.y, e.rotation));
      break;
      case(DrType.POLYGON):
          let p: DrPolygon = <DrPolygon>drObj;
          let b: BoundingBox = this.getBoundingBox([drObj]);

          for(let k = 0; k < p.points.length; k++){
            returnValue.push(this.getRotatedPoint(p.points[k].x, p.points[k].y, b.x + b.width / 2, b.y + b.height / 2, p.rotation));
          }
      break;
      case(DrType.IMAGE):
      case(DrType.TEXT):
      case(DrType.RECTANGLE):
          let r: DrRect = <DrRect>drObj;

          returnValue.push(this.getRotatedPoint(r.x, r.y, r.x + r.width / 2, r.y + r.height / 2, r.rotation));
          returnValue.push(this.getRotatedPoint(r.x + r.width, r.y, r.x + r.width / 2, r.y + r.height / 2, r.rotation));
          returnValue.push(this.getRotatedPoint(r.x, r.y + r.height, r.x + r.width / 2, r.y + r.height / 2, r.rotation));
          returnValue.push(this.getRotatedPoint(r.x + r.width, r.y + r.height, r.x + r.width / 2, r.y + r.height / 2, r.rotation));
      break;
      case (DrType.CALLOUT):
          let c: DrCallout = <DrCallout>drObj;
          returnValue = [
            { x: c.x, y: c.y },
            { x: c.x + c.width, y: c.y },
            { x: c.x, y: c.y + c.height },
            { x: c.x + c.width, y: c.y + c.height },
            c.basePoint1,
            c.basePoint2,
            c.pointerLocation
          ];
          break;
      case (DrType.GROUPED_OBJECT): {
        let pts: DrPoint[];
        let g: DrGroupedObject = <DrGroupedObject>drObj;
        for(let i: number = 0; i < g.objects.length; i++) {
          returnValue = returnValue.concat(this.getRotatedPoints(g.objects[i]));
        }
        break;
      }
    }

    return returnValue;
  }

  getUnionOfShapes(shape1: DrPoint[], shape2: DrPoint[]): DrPoint[] {
    if (null === this.clipper && !this.clipperRequested) {
      this.clipperRequested = true;
      clipperLib.loadNativeClipperLibInstanceAsync(
        clipperLib.NativeClipperLibRequestedFormat.WasmWithAsmJsFallback
      ).then((val) => {
        this.clipper = val;
      });
    }
    

    let polyResult: any = null !== this.clipper ? this.clipper.clipToPaths({
      clipType: clipperLib.ClipType.Union,
      subjectInputs: [
        { data: shape1 }
      ],
      clipInputs: [
        { data: shape2 }
      ],
      subjectFillType: clipperLib.PolyFillType.EvenOdd
    }) : null;
    return null !== polyResult ? polyResult[0] : null;
  }


                                //currently set to any because when trying to access individual items it errored on compilation
  private getBoundingBoxForObject(drObj: any): BoundingBox {
    let boundingBox: BoundingBox =  createBoundingBox();
    switch(drObj.drType){
      case(DrType.ELLIPSE):
          boundingBox.y = drObj.y - drObj.ry;
          boundingBox.x = drObj.x - drObj.rx;
          boundingBox.height = drObj.ry * 2;
          boundingBox.width = drObj.rx * 2;
      break;
      case(DrType.POLYGON):
          let minX: number = 0;
          let minY: number = 0;
          let maxX: number = 0;
          let maxY: number = 0;
          for(let k = 0; k < drObj.points.length; k++){
            if(k === 0){
              minX = drObj.points[k].x;
              minY = drObj.points[k].y;
              maxY = drObj.points[k].y;
              maxX = drObj.points[k].x;
            } else {
              if(minX > drObj.points[k].x){
                minX = drObj.points[k].x;
              }
              if(maxX < drObj.points[k].x){
                maxX = drObj.points[k].x;
              }
              if(minY > drObj.points[k].y){
                minY = drObj.points[k].y;
              }
              if(maxY < drObj.points[k].y){
                maxY = drObj.points[k].y;
              }
            }
          }

          boundingBox.y = minY;
          boundingBox.x = minX;
          boundingBox.height = maxY - minY;
          boundingBox.width = maxX - minX;
      break;
      case(DrType.IMAGE):
      case(DrType.TEXT):
      case(DrType.RECTANGLE):
          boundingBox.y = drObj.y;
          boundingBox.x = drObj.x;
          boundingBox.width = drObj.width;
          boundingBox.height = drObj.height;
        break;
      case (DrType.CALLOUT):
          let c: DrCallout = <DrCallout>drObj;
          if (c.pointerLocked) {
            boundingBox.y = drObj.y;
            boundingBox.x = drObj.x;
            boundingBox.width = drObj.width;
            boundingBox.height = drObj.height;
          }
          else {
            boundingBox.x = Math.min(c.x, c.pointerLocation.x);
            boundingBox.y = Math.min(c.y, c.pointerLocation.y);
            boundingBox.width = Math.max(c.x + c.width, c.pointerLocation.x) - boundingBox.x;
            boundingBox.height = Math.max(c.y + c.height, c.pointerLocation.y) - boundingBox.y;
          }
          break;
      case (DrType.GROUPED_OBJECT): {
        boundingBox = this.getBoundingBox(drObj.objects);
        break;
      }
    }


    return boundingBox;
  }

}
