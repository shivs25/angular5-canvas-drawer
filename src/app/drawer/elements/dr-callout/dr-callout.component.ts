import { Component, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { DrObjectComponent } from '../dr-object/dr-object.component';
import { DrCallout } from '../../models/dr-callout';
import { Observable } from 'rxjs';
import { DrawerObjectHelperService } from '../../services/drawer-object-helper.service';
import { DrPoint } from '../../models/dr-point';


@Component({
  selector: 'app-dr-callout',
  templateUrl: './dr-callout.component.html',
  styleUrls: ['./dr-callout.component.scss']
})
export class DrCalloutComponent extends DrObjectComponent {

  getPath(): string {
    //let r: DrCallout = this.data as DrCallout;
    let v: DrCallout = this.visualData as DrCallout;

    return this._objectHelperService.getCalloutPath(v);
  }
    
}
