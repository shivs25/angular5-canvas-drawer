import { TestBed, inject } from '@angular/core/testing';

import { DrawerObjectHelperService } from './drawer-object-helper.service';
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
    let r: DrRect = new DrRect();
    r.id = 1;
    r.x = 15;
    r.y = 10;
    r.width = 40;
    r.height = 75;
    r.stroke = "red";
    r.fill = "yellow";
    r.strokeWidth = 3;
    r.showStroke = r.showFill = true;
    r.clickable = true;
    r.drType = DrType.RECTANGLE; 

    let bb: BoundingBox = service.getBoundingBox([r]);

    expect(bb.top).toEqual(10);
    expect(bb.left).toEqual(15);
    expect(bb.height).toEqual(75);
    expect(bb.width).toEqual(40);
  }));

  it('should return a text bounding box', inject([DrawerObjectHelperService], (service: DrawerObjectHelperService) => {
    let t = new DrText();
    t.id = 10;
    t.x = 300;
    t.y = 10;
    t.width = 100;
    t.height = 40;
    t.stroke = 'purple';
    t.strokeWidth = 1;
    t.size = 16;
    t.text = 'I Love You';
    t.fill = 'transparent';
    t.fontColor = 'red';
    t.fontFamily = 'Courier';
    t.italic = false;
    t.bold = true;
    t.clickable = true;
    t.showStroke = t.showFill = true;
    t.hAlignment = DrTextAlignment.CENTER;
    t.vAlignment = DrTextAlignment.CENTER;
    t.drType = DrType.TEXT; 

    let bb: BoundingBox = service.getBoundingBox([t]);

    expect(bb.top).toEqual(10);
    expect(bb.left).toEqual(300);
    expect(bb.height).toEqual(40);
    expect(bb.width).toEqual(100);
  }));

  it('should return a ellipse bounding box', inject([DrawerObjectHelperService], (service: DrawerObjectHelperService) => {
    let c: DrEllipse = new DrEllipse();
    c.id = 3;
    c.x = 200;
    c.y = 500;
    c.rx = 25;
    c.ry = 50;
    c.fill = 'blue';
    c.showStroke = c.showFill = true;
    c.clickable = true;
    c.drType = DrType.ELLIPSE;

    let bb: BoundingBox = service.getBoundingBox([c]);

    expect(bb.top).toEqual(450);
    expect(bb.left).toEqual(175);
    expect(bb.height).toEqual(100);
    expect(bb.width).toEqual(50);
  }));

  it('should return a polygon bounding box', inject([DrawerObjectHelperService], (service: DrawerObjectHelperService) => {
    let p: DrPolygon = new DrPolygon();
    p.id = 5;
    let pts: DrPoint[] = [];
    let pt: DrPoint;
    pt = new DrPoint();
    pt.x = 100;
    pt.y = 100;
    pts.push(pt);

    pt = new DrPoint();
    pt.x = 200;
    pt.y = 100;
    pts.push(pt);

    pt = new DrPoint();
    pt.x = 300;
    pt.y = 200;
    pts.push(pt);

    pt = new DrPoint();
    pt.x = 350;
    pt.y = 300;
    pts.push(pt);

    p.points = pts;

    p.strokeWidth = 3;
    p.clickable = true;
    p.fill = "red";
    p.showStroke = p.showFill = true;
    p.opacity = 0.8;
    p.visible =true;
    p.drType = DrType.POLYGON;

    let bb: BoundingBox = service.getBoundingBox([p]);

    expect(bb.top).toEqual(100);
    expect(bb.left).toEqual(100);
    expect(bb.height).toEqual(200);
    expect(bb.width).toEqual(250);
  }));

  it('should return an image bounding box', inject([DrawerObjectHelperService], (service: DrawerObjectHelperService) => {
    let i: DrImage = new DrImage();
    i.id = 100;
    i.x = 400;
    i.y = 200;
    i.width = 320;
    i.height = 213;
    i.strokeWidth = 5;
    i.stroke="green";
    i.clickable = true;
    i.showStroke = true;
    i.opacity = 1;
    i.url = 'https://static.pexels.com/photos/34676/pexels-photo.jpg';
    i.drType = DrType.IMAGE; 

    let bb: BoundingBox = service.getBoundingBox([i]);

    expect(bb.top).toEqual(200);
    expect(bb.left).toEqual(400);
    expect(bb.height).toEqual(213);
    expect(bb.width).toEqual(320);
  }));

  it('should return the boudning box of a group of images', inject([DrawerObjectHelperService], (service: DrawerObjectHelperService) => {
    let t = new DrText();
    t.id = 10;
    t.x = 300;
    t.y = 10;
    t.width = 100;
    t.height = 40;
    t.stroke = 'purple';
    t.strokeWidth = 1;
    t.size = 16;
    t.text = 'I Love You';
    t.fill = 'transparent';
    t.fontColor = 'red';
    t.fontFamily = 'Courier';
    t.italic = false;
    t.bold = true;
    t.clickable = true;
    t.showStroke = t.showFill = true;
    t.hAlignment = DrTextAlignment.CENTER;
    t.vAlignment = DrTextAlignment.CENTER;
    t.drType = DrType.TEXT; 

    let c: DrEllipse = new DrEllipse();
    c.id = 3;
    c.x = 200;
    c.y = 500;
    c.rx = 25;
    c.ry = 50;
    c.fill = 'blue';
    c.showStroke = c.showFill = true;
    c.clickable = true;
    c.drType = DrType.ELLIPSE;

    let p: DrPolygon = new DrPolygon();
    p.id = 5;
    let pts: DrPoint[] = [];
    let pt: DrPoint;
    pt = new DrPoint();
    pt.x = 100;
    pt.y = 100;
    pts.push(pt);

    pt = new DrPoint();
    pt.x = 200;
    pt.y = 100;
    pts.push(pt);

    pt = new DrPoint();
    pt.x = 300;
    pt.y = 200;
    pts.push(pt);

    pt = new DrPoint();
    pt.x = 350;
    pt.y = 300;
    pts.push(pt);

    p.points = pts;

    p.strokeWidth = 3;
    p.clickable = true;
    p.fill = "red";
    p.showStroke = p.showFill = true;
    p.opacity = 0.8;
    p.visible =true;
    p.drType = DrType.POLYGON;
    
    let i: DrImage = new DrImage();
    i.id = 100;
    i.x = 400;
    i.y = 200;
    i.width = 320;
    i.height = 213;
    i.strokeWidth = 5;
    i.stroke="green";
    i.clickable = true;
    i.showStroke = true;
    i.opacity = 1;
    i.url = 'https://static.pexels.com/photos/34676/pexels-photo.jpg';
    i.drType = DrType.IMAGE; 

    let r: DrRect = new DrRect();
    r.id = 1;
    r.x = 15;
    r.y = 10;
    r.width = 40;
    r.height = 75;
    r.stroke = "red";
    r.fill = "yellow";
    r.strokeWidth = 3;
    r.showStroke = r.showFill = true;
    r.clickable = true;
    r.drType = DrType.RECTANGLE; 

    let bb: BoundingBox = service.getBoundingBox([i, r, c, p, t]);
    
    expect(bb.top).toEqual(10);
    expect(bb.left).toEqual(15);
    expect(bb.height).toEqual(540);
    expect(bb.width).toEqual(705);
  }));
});
