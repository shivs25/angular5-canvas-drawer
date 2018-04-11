import { TestBed, inject } from '@angular/core/testing';

import { ChangeHelperService } from './change-helper.service';
import { DrPolygon, createDrPolygon } from '../models/dr-polygon';
import { DrPoint } from '../models/dr-point';
import { BoundingBox } from '../models/bounding-box';
import { createDrCallout, DrCallout } from '../models/dr-callout';

describe('ChangeHelperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChangeHelperService]
    });
  });

  it('should be created', inject([ChangeHelperService], (service: ChangeHelperService) => {
    expect(service).toBeTruthy();
  }));

  it('should return a bigger polgon from right resizer', inject([ChangeHelperService], (service: ChangeHelperService) => {
 
    let pts: DrPoint[] = [
      { x: 100, y: 100 },
      { x: 200, y: 100 },
      { x: 150, y: 200 }
    ];

    let oldBounds: BoundingBox = {
      x: 100,
      y: 100,
      width: 100,
      height: 100
     };

     let newBounds: BoundingBox = {
      x: 100,
      y: 100,
      width: 200,
      height: 100
     };

    let p: DrPolygon = createDrPolygon({
      points: pts,
      id: 1
    });

    let changes: any = service.getBoundsChanges(p, newBounds, oldBounds);

    expect(changes.points).toBeDefined();
    expect(changes.points[0].x).toEqual(100);
    expect(changes.points[0].y).toEqual(100);
    expect(changes.points[1].x).toEqual(300);
    expect(changes.points[1].y).toEqual(100);
    expect(changes.points[2].x).toEqual(200);
    expect(changes.points[2].y).toEqual(200);
  }));

  it('should return a new callout box', inject([ChangeHelperService], (service: ChangeHelperService) => {
    let oldBounds: BoundingBox = {
      x: 100,
      y: 100,
      width: 100,
      height: 150
     };

     let newBounds: BoundingBox = {
      x: 100,
      y: 100,
      width: 200,
      height: 150
     };

    let c: DrCallout = createDrCallout({
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      basePoint1: { x: 140, y: 150 },
      basePoint2: { x: 160, y: 150 },
      pointerLocation: { x: 150, y: 250 },
      pointerLocked: true
    });

    let changes: any = service.getBoundsChanges(c, newBounds, oldBounds);

    expect(changes.basePoint1).toBeDefined();
    expect(changes.basePoint2).toBeDefined();
    expect(changes.x).toEqual(100);
    expect(changes.y).toEqual(100);
    expect(changes.width).toEqual(200);
    expect(changes.height).toEqual(100);
    expect(changes.basePoint1.x).toEqual(180);
    expect(changes.basePoint2.x).toEqual(220);
  }));
});
