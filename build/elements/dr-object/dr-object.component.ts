import { Component, OnInit, Input, TemplateRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { DrObject } from '../../models/dr-object';
import { select } from '@angular-redux/store';

@Component({
  selector: 'app-dr-object',
  template: "\n    <p>\n      dr-object works!\n    </p>\n  ",
  styles: ["\n\n  "]
})
export class DrObjectComponent implements OnInit {

  @ViewChild('elementTemplate')
  public elementTemplate: TemplateRef<any>;

  @Input()
  public data: DrObject;

  //@select()
  @Output()
  public click: EventEmitter<DrObject> = new EventEmitter<DrObject>();

  onClick(data:DrObject): void {
    if (data.clickable) {
      this.click.emit(data);
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
