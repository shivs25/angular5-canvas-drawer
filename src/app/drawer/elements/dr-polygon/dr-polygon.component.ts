import { Component, OnInit } from '@angular/core';
import { DrObjectComponent } from '../dr-object/dr-object.component';
import { DrPolygon } from '../../models/dr-polygon';
import { Point } from '../../models/point';

@Component({
  selector: 'dr-polygon',
  templateUrl: './dr-polygon.component.html',
  styleUrls: ['./dr-polygon.component.scss']
})
export class DrPolygonComponent extends DrObjectComponent {

  getPoints(): string {
    let returnValue: string = "";
    let r: DrPolygon = <DrPolygon>this.data;
    let p: Point;
    for(p of r.points) {
      returnValue += p.x + " " + p.y + " ";
    }

    return returnValue.trim();
  }

  ngOnInit() {
  }

}
