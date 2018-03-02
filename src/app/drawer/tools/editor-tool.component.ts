import { Component, OnInit, Input } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { EditorToolType } from '../models/enums';

@Component({
  selector: 'app-editor-tool',
  templateUrl: './editor-tool.component.html',
  styleUrls: ['./editor-tool.component.scss']
})
export class EditorToolComponent implements OnInit {

  SELECTOR_TOOL: EditorToolType = EditorToolType.SELECTOR_TOOL;

  @select() elementState;

  constructor() { }

  ngOnInit() {
    
  }

}
