import { Component, OnInit } from '@angular/core';
import { DrPolygon, createDrPolygon } from '../../models/dr-polygon';
import { DataStoreService } from '../../services/data-store.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';

const SIZER_SIZE: number = 8;
const HALF_SIZER: number = 4;
const DOUBLE_CLICK_TIME: number = 250;

@Component({
  selector: 'app-pen-tool',
  templateUrl: './pen-tool.component.html',
  styleUrls: ['./pen-tool.component.scss']
})
export class PenToolComponent implements OnInit {


  currentObject: DrPolygon = null;
  objectStyle: any = {
    showFill: true,
    fill: "rgba(255, 0, 0, 0.3)",
    dashedLine: false,
    showStroke: true,
    stroke: 'red',
    strokeWidth: 1

  };

  private _currentPt = null;
  private _clickPt = null;
  private _delay: any;

  constructor(private _dataService: DataStoreService) { }

  ngOnInit() {
  }

  onBackgroundMouseMove(evt): void {
    if(this.currentObject) {
      if (this._delay) {
        this.handleClick(this._clickPt.x, this._clickPt.y);
      }
      else {
        if (this._currentPt) {
          this._currentPt.x = evt.offsetX;
          this._currentPt.y = evt.offsetY;
        }
        else {
          this._currentPt = { x: evt.offsetX, y: evt.offsetY };
          this.currentObject.points.push(this._currentPt);
        }
      }
      
    }
  }

  onBackgroundClick(evt): void {
    if (this._delay) {
      this.currentObject.points.push({ x: evt.offsetX, y: evt.offsetY })
      this.completeObject();
      
    }
    else {
      this._clickPt = { x: evt.offsetX, y: evt.offsetY };
      this._delay = Observable.of(null).delay(DOUBLE_CLICK_TIME).subscribe(() => {
        if (this._delay) {
          this.handleClick(evt.offsetX, evt.offsetY);
        }
        
      });
    }
    
  }

  onResizerClick(evt): void {
    evt.stopPropagation();
    this.completeObject();
  }

  getResizerX(): number {
    return this.currentObject.points[0].x - HALF_SIZER;
  }

  getResizerY(): number {
    return this.currentObject.points[0].y - HALF_SIZER;
  }

  private handleClick(x: number, y: number): void {
    if (this._delay) {
      this._delay.unsubscribe();
      this._delay = null;
    }
    
    if (this.currentObject) {
      
      if (!this._currentPt) {
        this.currentObject.points.push({ x: x, y: y });
      }
      
      this._currentPt = null;
    }
    else {
      this.currentObject = createDrPolygon({
        id: 1000000,
        name: this._dataService.getUniqueName("Polygon"),
        points: [{ x: x, y:y }]
      });
    }
  }

  private completeObject(): void {
    if(this.currentObject &&
      null !== this.currentObject &&
      this.currentObject.points.length > 2) {;
       let newObject: DrPolygon = createDrPolygon({ points: this.currentObject.points, name: this.currentObject.name });
       this._dataService.addObjects([
          newObject
        ]);
       this._dataService.selectObjects([newObject]);
       
   }
   this.currentObject = null;
   this._currentPt = null;
   this._clickPt = null;
   if (this._delay) {
    this._delay.unsubscribe();
    this._delay = null;
    
   }
  }
}
