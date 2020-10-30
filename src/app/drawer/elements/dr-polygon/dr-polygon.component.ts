import { Component, OnInit } from '@angular/core';
import { DrObjectComponent } from '../dr-object/dr-object.component';
import { DrPolygon } from '../../models/dr-polygon';
import { DrPoint } from '../../models/dr-point';

@Component({
  selector: 'dr-polygon',
  templateUrl: './dr-polygon.component.html',
  styleUrls: ['./dr-polygon.component.scss']
})
export class DrPolygonComponent extends DrObjectComponent {


  getPoints(): string {
    let returnValue: string = "";
    let r: DrPolygon = this.data as DrPolygon;
    let p: DrPoint;

    for (p of r.points) {
      if (p) {
        returnValue += p.x + " " + p.y + " ";
      }
    }

    return returnValue.trim();
  }


}
