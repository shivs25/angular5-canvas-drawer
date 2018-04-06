import { Injectable } from '@angular/core';
import { DrObject } from '../models/dr-object';
import { BoundingBox } from '../models/bounding-box';
import { DrType } from '../models/enums';
import { DrPoint } from '../models/dr-point';
import { DrPolygon } from '../models/dr-polygon';
import { DrRect } from '../models/dr-rect';
import { DrEllipse } from '../models/dr-ellipse';
import { DrGroupedObject } from '../models/dr-grouped-object';
import { DrCallout } from '../models/dr-callout';

@Injectable()
export class ChangeHelperService {

  constructor() { }

  getBoundsChanges(item: DrObject, newBounds: BoundingBox, oldBounds: BoundingBox): any {
    
    switch(item.drType) {
      case DrType.IMAGE:
      case DrType.TEXT:
      case DrType.RECTANGLE: {
        let r: DrRect = item as DrRect;

        let pctX = (r.x - oldBounds.x) / oldBounds.width;
        let pctY = (r.y - oldBounds.y) / oldBounds.height;
        let pctWidth = r.width / oldBounds.width;
        let pctHeight = r.height / oldBounds.height;

        return {
          x: newBounds.x + newBounds.width * pctX,
          y: newBounds.y + newBounds.height * pctY,
          width: newBounds.width * pctWidth,
          height: newBounds.height * pctHeight
        };
      }
      case DrType.ELLIPSE: {
        let e: DrEllipse = item as DrEllipse;

        let pctX = (e.x - oldBounds.x) / oldBounds.width;
        let pctY = (e.y - oldBounds.y) / oldBounds.height;
        let pctWidth = e.rx * 2 / oldBounds.width;
        let pctHeight = e.ry * 2 / oldBounds.height;

        return {
          x: newBounds.x + newBounds.width * pctX,
          y: newBounds.y + newBounds.height * pctY,
          rx: newBounds.width * pctWidth / 2,
          ry: newBounds.height * pctHeight / 2
        };
      }
      case DrType.POLYGON: {
        let pts: DrPoint[] = [];
        let p: DrPoint;
        let pct;

        for(let pt of (item as DrPolygon).points) {
          p = { x: 0, y: 0 };

          pct = (pt.x - oldBounds.x) / (oldBounds.width);
          p.x = newBounds.x + (newBounds.width * pct);

          pct = (pt.y - oldBounds.y) / (oldBounds.height);
          p.y = newBounds.y + (newBounds.height * pct);

          pts.push(p);
        }
        return  {
          points: pts
        };
      }
      case DrType.CALLOUT: {
        let c: DrCallout = <DrCallout>item;

        let pctX = (c.x - oldBounds.x) / oldBounds.width;
        let pctY = (c.y - oldBounds.y) / oldBounds.height;
        let pctWidth = c.width / oldBounds.width;
        let pctHeight = c.height / oldBounds.height;
        
        let pctBaseX1 = (c.basePoint1.x - c.x) / c.width;
        let pctBaseY1 = (c.basePoint1.y - c.y) / c.height;
        let pctBaseX2 = (c.basePoint2.x - c.x) / c.width;
        let pctBaseY2 = (c.basePoint2.y - c.y) / c.height;

        let newX: number = newBounds.x + newBounds.width * pctX;
        let newY: number = newBounds.y + newBounds.height * pctY;
        let newWidth: number = newBounds.width * pctWidth;
        let newHeight: number = newBounds.height * pctHeight;

        let r: any = {
          x: newX,
          y: newY,
          width: newWidth,
          height: newHeight,
          basePoint1: { x: newX + newWidth * pctBaseX1, y: newY + newHeight * pctBaseY1 },
          basePoint2: { x: newX + newWidth * pctBaseX2, y: newY + newHeight * pctBaseY2 }
        };

        if (!c.pointerLocked) {
          let pctPointerX = (c.pointerLocation.x - oldBounds.x) / oldBounds.width;
          let pctPointerY = (c.pointerLocation.y - oldBounds.y) / oldBounds.height;
          r.pointerLocation = {
            x: newBounds.x + newBounds.width * pctPointerX,
            y: newBounds.y + newBounds.height * pctPointerY
          };
        }

        return r;
      }
      case DrType.GROUPED_OBJECT: {
        let newObjects: DrObject[] = [];
        for(let o of (item as DrGroupedObject).objects) {
          newObjects.push(Object.assign({}, o, this.getBoundsChanges(o, newBounds, oldBounds)));
        }
        return  {
          objects: newObjects
        };
      }
      
    }
  }
}
