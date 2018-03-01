import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';

@Component({
  selector: 'app-editor-tool',
  templateUrl: './editor-tool.component.html',
  styleUrls: ['./editor-tool.component.scss']
})
export class EditorToolComponent implements OnInit {

  @select() elementState;
  
  constructor() { }

  ngOnInit() {
  }

}
