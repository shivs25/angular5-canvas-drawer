import { Injectable } from '@angular/core';
import { DrObject } from '../models/dr-object';
import { BoundingBox } from '../models/bounding-box';
import { DrType } from '../models/enums';
import { DrPoint } from '../models/dr-point';
import { DrPolygon } from '../models/dr-polygon';

@Injectable()
export class ChangeHelperService {

  constructor() { }

  getBoundsChanges(item: DrObject, newBounds: BoundingBox, oldBounds: BoundingBox): any {
    switch(item.drType) {
      case DrType.IMAGE:
      case DrType.TEXT:
      case DrType.RECTANGLE:
        return {
          x: newBounds.x,
          y: newBounds.y,
          width: newBounds.width,
          height: newBounds.height
        };
      case DrType.ELLIPSE:
        return {
          x: newBounds.x + newBounds.width / 2,
          y: newBounds.y + newBounds.height / 2,
          rx: newBounds.width / 2,
          ry: newBounds.height / 2
        };
      case DrType.POLYGON:
        let scaleX: number = newBounds.width / oldBounds.width;
        let scaleY: number = newBounds.height / oldBounds.height;

        let pts: DrPoint[] = [];
        let p: DrPoint;

        for(let pt of (item as DrPolygon).points) {
          p = { x: 0, y: 0 };

          p.x = pt.x - (oldBounds.x + oldBounds.width / 2);
          p.x = p.x * scaleX;
          p.x = p.x + newBounds.x + newBounds.width / 2;

          p.y = pt.y - (oldBounds.y + oldBounds.height / 2);
          p.y = p.y * scaleY;
          p.y = p.y + newBounds.y + newBounds.height / 2;

          pts.push(p);
        }
        return  {
          points: pts
        };
    }
  }
}
