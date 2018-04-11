import { Component, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { DrObjectComponent } from '../dr-object/dr-object.component';
import { DrCallout } from '../../models/dr-callout';
import { Observable } from 'rxjs';
import { DrawerObjectHelperService } from '../../services/drawer-object-helper.service';
import { DrPoint } from '../../models/dr-point';

const RADIUS: number = 16;

@Component({
  selector: 'app-dr-callout',
  template: "\n    <ng-template #elementTemplate>\n      <ng-container *ngIf=\"data && visualData\">\n        <svg:path\n          [id]=\"elementId\"\n          [ngClass]=\"(visualData.clickable ? hoverClass : '') + (!canInteract ? ' no-interact' : '')\"\n          (click)=\"onClick($event, data)\"\n          (mousedown)=\"onMouseDown($event, data)\"\n          (mousemove)=\"onMouseMove($event, data)\"\n          (mouseup)=\"onMouseUp($event, data)\"\n          [attr.opacity]=\"visualData.opacity\"\n          [attr.d]=\"getPath()\"\n          [attr.fill]=\"visualData.showFill ? visualData.fill : 'transparent'\"\n          [attr.stroke]=\"visualData.showStroke ? visualData.stroke : 'transparent'\"\n          [attr.stroke-width]=\"visualData.strokeWidth\"\n          [attr.stroke-dasharray]=\"visualData.dashedLine ? '10 10' : ''\"\n          >      \n        </svg:path>\n      </ng-container>\n    </ng-template>\n  ",
  styles: ["\n\n  "]
})
export class DrCalloutComponent extends DrObjectComponent {

  getPath(): string {
    let r: DrCallout = this.data as DrCallout;
    let v: DrCallout = this.visualData as DrCallout;

    let b: DrPoint[] = [
      { x: r.x, y: r.y },
      { x: r.x, y: r.y + r.height },
      { x: r.x + r.width, y: r.y + r.height },
      { x: r.x + r.width, y: r.y }
    ];

    let points: DrPoint[];
    
    if (v.drawPointer || !v.pointerLocked) {
      try {
        points = this._objectHelperService.getUnionOfShapes(b, [
          r.basePoint1,
          r.basePoint2,
          r.pointerLocation
        ]);
      }
      catch(e) {
        points = [b[2],b[1],b[0],b[3]]; 
      }
    } 
    else {
      points = [b[2],b[1],b[0],b[3]];  //Points have to be in this order for the for loop below to work.
    }
    let returnValue: string = "";
    if (null !== points) {
      if (r.rounded && r.width > 32 && r.height > 32) {
        let p: DrPoint;
        let c: number;
      
        let d: string[] = [];

        for(let i: number = 0; i < points.length; i++) {
          p = points[i];
          c = this.getCorner(b, p);
          switch(c) {
            case 0:
              if (i === 0) {
                d.push("M");
              }
              else {
                d.push("L");
              }
              d.push(...[
                p.x.toString(),
                (p.y + 16).toString(),
                "A",RADIUS.toString(),RADIUS.toString(),"0","0","1",(p.x + RADIUS).toString(),p.y.toString()
              ]);
              break;
            case 1:
              if (i === 0) {
                d.push("M");
              }
              else {
                d.push("L");
              }
              d.push(...[
                (p.x + RADIUS).toString(),
                p.y.toString(),
                "A",RADIUS.toString(),RADIUS.toString(),"0","0","1",p.x.toString(),(p.y - RADIUS).toString()
              ]);
              break;
            case 2:
              if (i === 0) {
                d.push("M");
              }
              else {
                d.push("L");
              }
              d.push(...[
                p.x.toString(),
                (p.y - RADIUS).toString(),
                "A",RADIUS.toString(),RADIUS.toString(),"0","0","1",(p.x - RADIUS).toString(),p.y.toString()
              ]);
              break;
            case 3:
              if (i === 0) {
                d.push("M");
              }
              else {
                d.push("L");
              }
              d.push(...[
                (p.x - RADIUS).toString(),
                p.y.toString(),
                "A",RADIUS.toString(),RADIUS.toString(),"0","0","1",p.x.toString(),(p.y + RADIUS).toString()
              ]);
              break;
            default:
              if (i === 0) {
                d.push("M");
              }
              else {
                d.push("L");
              }

              d.push(...[
                p.x.toString(),
                p.y.toString()
              ]);
              break;
          }
        }
        d.push("Z");
        
        returnValue = d.join(" ");
  
      }
      else {
        for(let i: number = 0; i < points.length; i++) {
          if (0 === i) {
            returnValue += "M" + points[i].x + "," + points[i].y + " ";
          }
          else {
            returnValue += "L" + points[i].x + "," + points[i].y + " ";
          }
          
        }
        returnValue += "Z";
      }
    }
    
    return returnValue;
  }

  private getCorner(b: DrPoint[], p: DrPoint): number {
    return b.findIndex((d) => Math.abs(d.x - p.x) < 1 && Math.abs(d.y - p.y) < 1);
  }
}
