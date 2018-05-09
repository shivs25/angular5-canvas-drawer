//Got a lot close to getting this test working, but something with the mocks is hosed
/* import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, EventEmitter } from '@angular/core';
import { TextEditToolComponent } from './text-edit-tool.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, ElementRef } from '@angular/core';
import { DataStoreService } from '../../services/data-store.service';
import { TextRenderingService } from '../../services/text-rendering.service';
import { NgRedux } from '@angular-redux/store';
import { DrawerObjectHelperService } from '../../services/drawer-object-helper.service';
import { ChangeHelperService } from '../../services/change-helper.service';
import { DrText, createDrText } from '../../models/dr-text';
import { DrObject } from '../../models/dr-object';
class elementRefMock {
  constructor() {}
  nativeElement: any = {
    querySelector(className: string): any {
      return { focus(): void { } };
    },
    getBoundingClientRect(): any {
      return { x: 100, y: 100 };
    }
  };

}

class dataStoreServiceMock {
  constructor() { } 
  selectedObjects: DrObject[] = [];
  selectedTool: number = 5;
  undid: EventEmitter<void> = new EventEmitter<void>();
  toolChanged: EventEmitter<void> = new EventEmitter<void>();

  setText(objs: DrObject[], textItem: string): void {

  }
  setTextAndBounds(objs: DrObject[], textItem: string, bounds: any): void {

  }
  onTextObjectsChanged(objs: DrObject[]): void {

  }
}

fdescribe('TextEditToolComponent', () => {
  let component: TextEditToolComponent;
  let fixture: ComponentFixture<TextEditToolComponent>;
  let fakeDataStoreService: dataStoreServiceMock = new dataStoreServiceMock();
  fakeDataStoreService.selectedObjects = [createDrText({text: 'Test',
                                                          x: 100,
                                                          y: 100 })];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextEditToolComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA,
                 NO_ERRORS_SCHEMA ],
        providers:[ { provide: DataStoreService, useClass: fakeDataStoreService },
                    TextRenderingService,
                    NgRedux,
                    DrawerObjectHelperService,
                    ChangeHelperService,
                    { provide: ElementRef, useClass: elementRefMock },
                  ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextEditToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    
    expect(component).toBeTruthy();
  });
});
 */