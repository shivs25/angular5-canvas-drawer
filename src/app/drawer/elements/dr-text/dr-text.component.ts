import { Component, OnInit } from '@angular/core';
import { DrObjectComponent } from '../dr-object/dr-object.component';
import { DrText } from '../../models/dr-text';
import { DrTextAlignment } from '../../models/dr-text-alignment.enum';

@Component({
  selector: 'dr-text',
  templateUrl: './dr-text.component.html',
  styleUrls: ['./dr-text.component.scss']
})

export class DrTextComponent extends DrObjectComponent {

  ngOnInit() {
  }

  getTextX(): number {
    let o: DrText = this.visualData as DrText;

    switch(o.hAlignment){
      case DrTextAlignment.NEAR:
        return o.x;
      case DrTextAlignment.CENTER:
        return o.x + o.width / 2;
      case DrTextAlignment.FAR:
        return o.x + o.width;

    }
  }

  getTextY(): number {
    let o: DrText = this.visualData as DrText;

    switch(o.vAlignment){
      case DrTextAlignment.NEAR:
        return o.y;
      case DrTextAlignment.CENTER:
        return o.y + o.height / 2;
      case DrTextAlignment.FAR:
        return o.y + o.height;

    }
  }

  getVAlignment(): string {
    let o: DrText = this.visualData as DrText;

    switch(o.vAlignment){
      case DrTextAlignment.NEAR:
        return 'hanging';
      case DrTextAlignment.CENTER:
        return 'middle';
      case DrTextAlignment.FAR:
        return  'alphabetical';

    }
  }

  getHAlignment(): string {
    let o: DrText = this.visualData as DrText;

    switch(o.hAlignment){
      case DrTextAlignment.NEAR:
        return 'start';
      case DrTextAlignment.CENTER:
        return 'middle';
      case DrTextAlignment.FAR:
        return  'end';

    }
  }
}
