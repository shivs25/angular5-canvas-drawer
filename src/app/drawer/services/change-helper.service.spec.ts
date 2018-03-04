import { TestBed, inject } from '@angular/core/testing';

import { ChangeHelperService } from './change-helper.service';
import { DrPolygon, createDrPolygon } from '../models/dr-polygon';
import { DrPoint } from '../models/dr-point';
import { BoundingBox } from '../models/bounding-box';

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
});
