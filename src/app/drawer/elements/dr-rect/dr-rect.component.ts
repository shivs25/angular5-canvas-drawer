import { Component, OnInit, Input } from '@angular/core';
import { DrRect } from '../../models/dr-rect';
import { DrObjectComponent } from '../dr-object/dr-object.component';

@Component({
  selector: 'dr-rect',
  templateUrl: './dr-rect.component.html',
  styleUrls: ['./dr-rect.component.scss']
})
export class DrRectComponent extends DrObjectComponent {


  ngOnInit() {
  }

}
