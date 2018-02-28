import { Injectable } from '@angular/core';
import { DrEllipse } from '../models/dr-ellipse';
import { DrImage } from '../models/dr-image';
import { DrObject } from '../models/dr-object';
import { DrPoint } from '../models/dr-point';
import { DrPolygon } from '../models/dr-polygon';
import { DrRect } from '../models/dr-rect';
import { DrText } from '../models/dr-text';
import { DrType } from '../models/dr-type.enum';
import { BoundingBox } from '../models/bounding-box';
import { BoundDirectivePropertyAst } from '@angular/compiler';

@Injectable()
export class DrawerObjectHelperService {

  constructor() { }

  public getBoundingBox(drObjs: DrObject[]): BoundingBox {
    let boundingBox: BoundingBox = new BoundingBox();
    boundingBox.top = 0;
    boundingBox.left = 0;
    boundingBox.height = 0;
    boundingBox.width = 0;

    let boundingBoxes: BoundingBox[] = [];
    for(let i = 0; i < drObjs.length; i++){
      boundingBoxes.push(this.getBoundingBoxForObject(drObjs[i]));
    }

    if(boundingBoxes.length === 1){
      boundingBox.top = boundingBoxes[0].top;
      boundingBox.left = boundingBoxes[0].left;
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
          minX = boundingBoxes[j].left;
          minY = boundingBoxes[j].top;
          maxY = boundingBoxes[j].top + boundingBoxes[j].height;
          maxX = boundingBoxes[j].left + boundingBoxes[j].width;
        } else {
          if(minX > boundingBoxes[j].left){
            minX = boundingBoxes[j].left;
          }
          if(maxX < (boundingBoxes[j].left + boundingBoxes[j].width)){
            maxX = boundingBoxes[j].left + boundingBoxes[j].width;
          }
          if(minY > boundingBoxes[j].top){
            minY = boundingBoxes[j].top;
          }
          if(maxY < (boundingBoxes[j].top + boundingBoxes[j].height)){
            maxY = boundingBoxes[j].top + boundingBoxes[j].height;
          }
        }
      }

      boundingBox.top = minY;
      boundingBox.left = minX;
      boundingBox.height = maxY - minY;
      boundingBox.width = maxX - minX;
    }

    return boundingBox;
  }
                                //currently set to any because when trying to access individual items it errored on compilation
  private getBoundingBoxForObject(drObj: any): BoundingBox {
    let boundingBox: BoundingBox = new BoundingBox();
    switch(drObj.drType){
      case(DrType.ELLIPSE):
        boundingBox.top = drObj.y - drObj.ry;
        boundingBox.left = drObj.x - drObj.rx;
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

      boundingBox.top = minY;
      boundingBox.left = minX;
      boundingBox.height = maxY - minY;
      boundingBox.width = maxX - minX;
      break;
      case(DrType.IMAGE):
      case(DrType.TEXT):
      case(DrType.RECTANGLE):
        boundingBox.top = drObj.y;
        boundingBox.left = drObj.x;
        boundingBox.width = drObj.width;
        boundingBox.height = drObj.height;
      break;
    }


    return boundingBox;
  }

  
  

}
