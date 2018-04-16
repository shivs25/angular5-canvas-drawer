import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrTextComponent } from './dr-text.component';
import { DrawerObjectHelperService } from '../../services/drawer-object-helper.service';
import { TextRenderingService } from '../../services/text-rendering.service';
import { TextInfo } from '../../models/text-info';
import { DrText, createDrText } from '../../models/dr-text';
import { MockTextRenderingService } from '../../helpers/mocks';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { DynamicSvgDirective } from '../../dynamic-svg/dynamic-svg.directive';

@Component({
  template: `
  <ng-container dynamic-svg [componentData]="data">
</ng-container>`,
  entryComponents:[DrTextComponent]
})
class TestHostComponent {
  data: DrText;

}

describe('DrTextComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let objectService: any = {};
  let textRenderingService: MockTextRenderingService;

  beforeEach(async(() => {
    textRenderingService = new MockTextRenderingService();

    TestBed.configureTestingModule({
      declarations: [ DrTextComponent, TestHostComponent, DynamicSvgDirective ],
      providers: [
        { provide: DrawerObjectHelperService, useValue: objectService },
        { provide: TextRenderingService, useValue: textRenderingService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
  });


  it('should have 2 lines of text with second having y value', () => {

    let d: DrText = createDrText({ id: 1, x: 100, y: 100, width: 100, height: 100,  text: "\n" + "Text"});

    component.data = d;
    fixture.detectChanges();
    let textSpans = fixture.debugElement.queryAll(By.css("tspan"));
    expect(textSpans.length).toEqual(2);
    expect(textSpans[1].attributes.y).toBeTruthy();
  });

  it('should have 3 lines of text with second having y value', () => {

    let d: DrText = createDrText({ id: 1, x: 100, y: 100, width: 100, height: 100, text: "Text\n\nText"});

    component.data = d;
    fixture.detectChanges();
    let textSpans = fixture.debugElement.queryAll(By.css("tspan"));
    expect(textSpans.length).toEqual(3);
  });

  it('should have 2 because ran out of room', () => {

    let d: DrText = createDrText({ id: 1, x: 100, y: 100, width: 100, height: 100, text: "Billy Shivers"});

    component.data = d;
    fixture.detectChanges();
    let textSpans = fixture.debugElement.queryAll(By.css("tspan"));
    expect(textSpans.length).toEqual(2);
  });
});
