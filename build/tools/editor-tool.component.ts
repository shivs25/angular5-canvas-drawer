import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';

@Component({
  selector: 'app-editor-tool',
  template: "\n    <ng-container>\n      <svg class=\"absolute-position fill-parent\"></svg>\n    </ng-container>\n  ",
  styles: ["\n\n  "]
})
export class EditorToolComponent implements OnInit {

  @select() elementState;
  
  constructor() { }

  ngOnInit() {
  }

}
