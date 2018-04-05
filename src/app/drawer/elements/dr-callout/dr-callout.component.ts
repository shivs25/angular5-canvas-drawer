import { Component, OnInit } from '@angular/core';
import { DrObjectComponent } from '../dr-object/dr-object.component';
import { DrCallout } from '../../models/dr-callout';

@Component({
  selector: 'app-dr-callout',
  templateUrl: './dr-callout.component.html',
  styleUrls: ['./dr-callout.component.scss']
})
export class DrCalloutComponent extends DrObjectComponent {

  getPoints(): string {
    let returnValue: string = "";
    let r: DrCallout = this.data as DrCallout;
    let p: DrCallout;

    returnValue += r.basePoint1.x + " " + r.basePoint1.y + " ";
    returnValue += r.basePoint2.x + " " + r.basePoint2.y + " ";
    returnValue += r.pointerLocation.x + " " + r.pointerLocation.y;

    return returnValue.trim();
  }

  getBoundsX(): number {
    let r: DrCallout = this.data as DrCallout;
    return  Math.min(r.x, r.pointerLocation.x);
  }

  getBoundsY(): number {
    let r: DrCallout = this.data as DrCallout;
    return  Math.min(r.y, r.pointerLocation.y);
  }

  getBoundsWidth(): number {
    let r: DrCallout = this.data as DrCallout;
    let left: number = Math.min(r.x, r.pointerLocation.x);
    let right: number = Math.max(r.x + r.width, r.pointerLocation.x);
    return right - left;
  }

  getBoundsHeight(): number {
    let r: DrCallout = this.data as DrCallout;
    let top: number = Math.min(r.y, r.pointerLocation.y);
    let bottom: number = Math.max(r.y + r.height, r.pointerLocation.y);
    return bottom - top;
  }
}
