import { Component, OnInit } from '@angular/core';
import { DrObjectComponent } from '../dr-object/dr-object.component';
import { DrPolygon } from '../../models/dr-polygon';
import { DrPoint } from '../../models/dr-point';

@Component({
  selector: 'dr-polygon',
  template: "\n    <ng-template #elementTemplate>\n        <svg:polygon *ngIf=\"data\" \n          [ngClass]=\"{ clickable: data.clickable }\"\n          (click)=\"onClick(data)\"\n          [id]=\"data.id\"\n          [attr.points]=\"getPoints()\"\n          [attr.fill]=\"data.showFill ? data.fill : 'transparent'\"\n          [attr.stroke]=\"data.showStroke ? data.stroke : 'transparent'\"\n          [attr.stroke-width]=\"data.strokeWidth\"\n          [attr.opacity]=\"data.opacity\">\n        </svg:polygon>\n    </ng-template>\n  ",
  styles: ["\n\n  "]
})
export class DrPolygonComponent extends DrObjectComponent {

  getPoints(): string {
    let returnValue: string = "";
    let r: DrPolygon = <DrPolygon>this.data;
    let p: DrPoint;
    for(p of r.points) {
      returnValue += p.x + " " + p.y + " ";
    }

    return returnValue.trim();
  }

  ngOnInit() {
  }

}
