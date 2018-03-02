import { Component, OnInit } from '@angular/core';
import { DrObjectComponent } from '../dr-object/dr-object.component';
import { DrPolygon } from '../../models/dr-polygon';
import { DrPoint } from '../../models/dr-point';

@Component({
  selector: 'dr-polygon',
  template: "\n    <ng-template #elementTemplate>\n        <svg:polygon *ngIf=\"data && visualData\" \n          [ngClass]=\"visualData.clickable ? hoverClass : ''\"\n          (click)=\"onClick($event, data)\"\n          (mousedown)=\"onMouseDown($event, data)\"\n          (mousemove)=\"onMouseMove($event, data)\"\n          (mouseup)=\"onMouseUp($event, data)\"\n          [id]=\"data.id\"\n          [attr.points]=\"getPoints()\"\n          [attr.stroke-dasharray]=\"visualData.dashedLine ? '10 10' : ''\"\n          [attr.fill]=\"visualData.showFill ? visualData.fill : 'transparent'\"\n          [attr.stroke]=\"visualData.showStroke ? visualData.stroke : 'transparent'\"\n          [attr.stroke-width]=\"visualData.strokeWidth\"\n          [attr.opacity]=\"visualData.opacity\">\n      \n        </svg:polygon>\n    </ng-template>\n  ",
  styles: ["\n\n  "]
})
export class DrPolygonComponent extends DrObjectComponent {

  constructor() {
    super();


  }

  getPoints(): string {
    let returnValue: string = "";
    let r: DrPolygon = this.visualData as DrPolygon;
    let p: DrPoint;

    for(p of r.points) {
      returnValue += p.x + " " + p.y + " ";
    }

    return returnValue.trim();
  }

  ngOnInit() {
  }

}
