import { TestBed, inject } from '@angular/core/testing';

import { DrawerObjectHelperService } from './drawer-object-helper.service';
import { DrEllipse, DEFAULT_ELLIPSE } from '../models/dr-ellipse';
import { DrImage, DEFAULT_IMAGE } from '../models/dr-image';
import { DrObject } from '../models/dr-object';
import { DrPoint } from '../models/dr-point';
import { DrPolygon, DEFAULT_POLYGON } from '../models/dr-polygon';
import { DrRect, DEFAULT_RECT } from '../models/dr-rect';
import { DrText, DEFAULT_TEXT } from '../models/dr-text';
import { DrType } from '../models/dr-type.enum';
import { BoundingBox } from '../models/bounding-box';
import { BoundDirectivePropertyAst } from '@angular/compiler';
import { DrTextAlignment } from '../models/dr-text-alignment.enum';

describe('DrawerObjectHelperService', () => {
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DrawerObjectHelperService]
    });
  });

  it('should be created', inject([DrawerObjectHelperService], (service: DrawerObjectHelperService) => {
    expect(service).toBeTruthy();
  }));

  it('should return a squares bounding box', inject([DrawerObjectHelperService], (service: DrawerObjectHelperService) => {
    let r: DrRect = Object.assign({}, DEFAULT_RECT, {
      id: 1,
      x: 15,
      y: 10,
      width: 40,
      height: 75,
      stroke: 'red',
      fill: 'yellow',
      strokeWidth: 3,
      showStroke: true,
      showFill: true,
      clickable: true,
      drType: DrType.RECTANGLE
    });

    let bb: BoundingBox = service.getBoundingBox([r]);

    expect(bb.y).toEqual(10);
    expect(bb.x).toEqual(15);
    expect(bb.height).toEqual(75);
    expect(bb.width).toEqual(40);
  }));

  it('should return a text bounding box', inject([DrawerObjectHelperService], (service: DrawerObjectHelperService) => {
    let t:DrText = Object.assign({}, DEFAULT_TEXT, {
      x: 300,
      y: 10,
      width: 100,
      height: 40,

    });

    let bb: BoundingBox = service.getBoundingBox([t]);

    expect(bb.y).toEqual(10);
    expect(bb.x).toEqual(300);
    expect(bb.height).toEqual(40);
    expect(bb.width).toEqual(100);
  }));

  it('should return a ellipse bounding box', inject([DrawerObjectHelperService], (service: DrawerObjectHelperService) => {
    let c: DrEllipse = Object.assign({}, DEFAULT_ELLIPSE, {
      x: 200,
      y: 500,
      rx: 25,
      ry: 50
    });

    let bb: BoundingBox = service.getBoundingBox([c]);

    expect(bb.y).toEqual(450);
    expect(bb.x).toEqual(175);
    expect(bb.height).toEqual(100);
    expect(bb.width).toEqual(50);
  }));

  it('should return a polygon bounding box', inject([DrawerObjectHelperService], (service: DrawerObjectHelperService) => {
    
    let pts: DrPoint[] = [];
    pts.push({ x: 100, y: 100 });
    pts.push({ x: 200, y: 100 });
    pts.push({ x: 300, y: 200 });
    pts.push({ x: 350, y: 300 });

    let p: DrPolygon = Object.assign({}, DEFAULT_POLYGON, {
      points: pts
    });
   
    let bb: BoundingBox = service.getBoundingBox([p]);

    expect(bb.y).toEqual(100);
    expect(bb.x).toEqual(100);
    expect(bb.height).toEqual(200);
    expect(bb.width).toEqual(250);
  }));

  it('should return an image bounding box', inject([DrawerObjectHelperService], (service: DrawerObjectHelperService) => {
    let i: DrImage = Object.assign({}, DEFAULT_IMAGE, {
      x: 400,
      y: 200,
      width: 320,
      height: 213
    });

    let bb: BoundingBox = service.getBoundingBox([i]);

    expect(bb.y).toEqual(200);
    expect(bb.x).toEqual(400);
    expect(bb.height).toEqual(213);
    expect(bb.width).toEqual(320);
  }));

  it('should return the boudning box of a group of images', inject([DrawerObjectHelperService], (service: DrawerObjectHelperService) => {
    let t = Object.assign({}, DEFAULT_TEXT, {
      x: 300,
      y: 10,
      width: 100,
      height: 10
    });
    

    let c: DrEllipse = Object.assign({}, DEFAULT_ELLIPSE, {
      x: 200,
      y: 500,
      rx: 25,
      ry: 50
    });
    
    let pts: DrPoint[] = [];
    pts.push({ x: 100, y: 100 });
    pts.push({ x: 200, y: 100 });
    pts.push({ x: 300, y: 200 });
    pts.push({ x: 350, y: 300 });

    let p: DrPolygon = Object.assign({}, DEFAULT_POLYGON, {
      points: pts

    });

    let i: DrImage = Object.assign({}, DEFAULT_IMAGE, {
      x: 400,
      y: 200,
      width: 320,
      height: 213

    });
    
    let r: DrRect = Object.assign({}, DEFAULT_RECT, {
      x: 15,
      y: 10,
      width: 40,
      height: 75
    });
   

    let bb: BoundingBox = service.getBoundingBox([i, r, c, p, t]);
    
    expect(bb.y).toEqual(10);
    expect(bb.x).toEqual(15);
    expect(bb.height).toEqual(540);
    expect(bb.width).toEqual(705);
  }));
});
