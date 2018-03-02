import { Injectable } from '@angular/core';
import { DrEllipse } from '../models/dr-ellipse';
import { DrImage } from '../models/dr-image';
import { DrObject } from '../models/dr-object';
import { DrPoint } from '../models/dr-point';
import { DrPolygon } from '../models/dr-polygon';
import { DrRect } from '../models/dr-rect';
import { DrText } from '../models/dr-text';
import { DrType } from '../models/dr-type.enum';
import { BoundingBox, DEFAULT_BOUNDING_BOX, createBoundingBox } from '../models/bounding-box';
import { BoundDirectivePropertyAst } from '@angular/compiler';

@Injectable()
export class DrawerObjectHelperService {

  constructor() { }

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
    }


    return boundingBox;
  }

  
  

}
